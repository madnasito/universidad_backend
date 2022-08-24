const mongoose = require("mongoose")
let Schema = mongoose.Schema

var matchSchema = new Schema({
    name: {
        type: String
    },
    hoster: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    date: {
        type: Date
    }
})

module.exports = mongoose.model("Match", matchSchema)