// Delete(Desactive), Modify, Get
// User(s)

// Importing
const express = require("express")
const app = express()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { verifyToken } = require('../middleware/autentication')
const _ = require("underscore")
const bcrypt = require("bcrypt")

app.post("/login", (req, res) => {

    let body = req.body

    // Find user by email
    User.findOne({ email: body.email }, (err, userDB) => {

        //Verify Error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        // Verify if user exists on DB
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: "The user does not exists"
                }
            })
        }

        // Compare encrypt password with form password
        if (bcrypt.compareSync(body.password, userDB.password)) {

            if (!userDB.status) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Login error"
                    }
                })
            }

            //Create access Tokem
            let token = jwt.sign({ user: userDB }, process.env.SEED, { expiresIn: process.env.END_TOKEN })

            res.json({
                ok: true,
                user: userDB,
                token,
                message: "Login successfull"
            })

        } else {
            // Send Error message for incorrect password
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Incorrect Password"
                }
            })
        }

    })

})


app.get('/login/verify', verifyToken, (req, res) => {

    //Create access Tokem
    let token = jwt.sign({ user: req.user }, process.env.SEED, { expiresIn: process.env.END_TOKEN })

    res.json({
        ok: true,
        message: "User verified",
        user: req.user,
        token
    })

})


//Edit User
app.put("/:id", verifyToken, (req, res) => {

    // Receive user ID
    let id = req.params.id

    // Verify that the user for modify is the same of Token user
    if (req.user._id !== id) {
        return res.status(401).json({
            ok: false,
            err: {
                message: "Unauthorized"
            }
        })
    }

    // Pick form values using underscore
    let body = _.pick(req.body, ['name', 'password', 'email', 'username'])



    if (body.password) {
        body.password = bcrypt.hashSync(body.password, 10)
    }

    // Modify User
    User.findByIdAndUpdate(id, body, { new: true }, (err, userDB) => {

        // Verify Errors
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        // Create Token for new User
        let token = jwt.sign({ user: userDB }, process.env.SEED, { expiresIn: process.env.END_TOKEN })

        // User updated
        res.json({
            ok: true,
            user: userDB,
            token,
            message: "User updated!"
        })
    })

})

// Create victory
app.put("/:id/victory", verifyToken, (req, res) => {

    // Receive user ID
    let id = req.params.id

    // Verify that the user for modify is the same of Token user
    if (req.user._id !== id) {
        return res.status(401).json({
            ok: false,
            err: {
                message: "Unauthorized"
            }
        })
    }


    User.findByIdAndUpdate(id, { $inc: { 'victories': 1 } }, { new: true }, (err) => {

        // Verify Errors
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true
        })
    })

})

// Create Losser
app.put("/:id/loss", verifyToken, (req, res) => {

    // Receive user ID
    let id = req.params.id

    // Verify that the user for modify is the same of Token user
    if (req.user._id !== id) {
        return res.status(401).json({
            ok: false,
            err: {
                message: "Unauthorized"
            }
        })
    }


    User.findByIdAndUpdate(id, { $inc: { 'losses': 1 } }, { new: true }, (err) => {

        // Verify Errors
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true
        })
    })

})


// Create Match
app.put("/:id/match", verifyToken, (req, res) => {

    // Receive user ID
    let id = req.params.id

    // Verify that the user for modify is the same of Token user
    if (req.user._id !== id) {
        return res.status(401).json({
            ok: false,
            err: {
                message: "Unauthorized"
            }
        })
    }


    User.findByIdAndUpdate(id, { $inc: { 'match': 1 } }, { new: true }, (err) => {

        // Verify Errors
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true
        })
    })

})

// Delete (Desactive account usser)
app.delete("/:id", verifyToken, (req, res) => {

    // Receive user ID
    let id = req.params.id

    // Verify that the user for modify is the same of Token user
    if (req.user._id !== id) {
        return res.status(401).json({
            ok: false,
            err: {
                message: "Unauthorized"
            }
        })
    }

    // New value
    let changeStatus = {
        status: false
    }

    // Modifying user
    User.findByIdAndUpdate(id, changeStatus, { new: true, runValidators: true }, (err, userDB) => {

        // Verify errors
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        // Verify if user exists
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "The user does not exists"
                }
            })
        }

        // Send desactived user
        res.json({
            ok: true,
            user: userDB,
            message: "Deleted user"
        })
    })
})

module.exports = app