const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "exam", required: true },
    question: { type: String, required: true },
    selectedOption: { type: String, required: true },
    correctAnswer: { type: String },
    isCorrect: { type: Boolean, default: false }
});

const userAnswerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    userName: { type: String, required: true },
    userImage: { type: String, required: true },
    answers: [answerSchema]
}, { timestamps: true });

module.exports = mongoose.model("userAnswer", userAnswerSchema);
