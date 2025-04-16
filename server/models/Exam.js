const mongoose = require("mongoose")

module.exports = mongoose.model("exam", new mongoose.Schema({
    question: { type: String, required: true },
    firstoption: { type: String, required: true },
    secondoption: { type: String, required: true },
    thirdoption: { type: String, required: true },
    fourthoption: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    marks: { type: Number, required: true },
}))