const mongoose = require("mongoose")

module.exports = mongoose.model("exam", new mongoose.Schema({
    question: { type: String, required: true },
    firstoption: { type: String, required: true },
    secondoption: { type: String, required: true },
    thirdoption: { type: String, required: true },
    fourthoption: { type: String, required: true },
}))