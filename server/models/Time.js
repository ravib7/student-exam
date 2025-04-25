const mongoose = require("mongoose")

module.exports = mongoose.model("ExamTime", new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    examDate: { type: Date, required: true },
}, { timestamps: true }))