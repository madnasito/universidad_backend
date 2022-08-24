// Creating a match for game

// Importing
const express = require("express")
const app = express()
const Match = require('../models/match')
const User = require('../models/user')
const { verifyToken } = require("../middleware/autentication")

app.post('/match', verifyToken, (req, res) => {

    let body = req.body

    let id = req.user._id

    let match = new Match({
        name: body.name,
        hoster: body.hoster,
        players: body.players
    })

    match.save((err, matchDB) => {

        // Verify errors
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        User.findByIdAndUpdate(id, { $push: { matches: matchDB._id } }, { new: true }, (err) => {

            // Verify errors
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                matchDB
            })
        })

    })

})

module.exports = app