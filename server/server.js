const express = require("express")
const app = express()
const colors = require("colors")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

// Server Config
require('./config/config.js')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/index'))

mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {

    if (err) {
        return console.log(err)
    }

    console.log("Data base: ", "Online".green)
})

app.get("/", (req, res) => {
	res.send("Builded multiplayer database");
})

app.listen(process.env.PORT, () => {
    console.log("Listening port:", process.env.PORT.green);
})
