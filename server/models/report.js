const mongoose = require("mongoose")
let Schema = mongoose.Schema

var reportSchema = new Schema({
    reporter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reported: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model("Report", reportSchema)