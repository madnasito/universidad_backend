// Register Users for DB

// Import
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

// API petition for create an user
app.post('/register', (req, res) => {

    // Create a variable for Form content
    let body = req.body;

    if (body.password == null) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No hay password"
            }
        })
    }

    // Create an user for save
    let user = new User({
        name: body.name,
        username: body.username,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    })

    // Save user
    user.save((err, userDB) => {

        // Verefy errors
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        //Create access Tokem
        let token = jwt.sign({ user: userDB }, process.env.SEED, { expiresIn: process.env.END_TOKEN })

        res.json({
            ok: true,
            user: userDB,
            token,
            message: "User created!"
        })
    })
})

// Export route
module.exports = app