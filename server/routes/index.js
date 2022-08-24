const express = require("express")
const app = express()

app.use(require('./register'))
app.use(require('./user'))
app.use(require('./match'))
app.use(require('./report'))

module.exports = app