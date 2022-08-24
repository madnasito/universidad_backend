// Creating a report for the user

// Importing
const express = require("express")
const app = express()
const Report = require("../models/report")
const { verifyToken } = require("../middleware/autentication")

app.post('/report', verifyToken, (req, res) => {

    let body = req.body

    let report = new Report({
        reporter: body.reporter,
        reported: body.reported,
        description: body.description
    })

    report.save((err, reportDB) => {

        // Verify errors
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
    })

})

module.exports = app