const asyncHandler = require("express-async-handler")
const Exam = require("../models/Exam")
const UserAnswer = require("../models/UserAnswer")

exports.getExamPaper = asyncHandler(async (req, res) => {
    const result = await Exam.find()
    res.json({ message: "Paper Fetch Successfully", result })
})

exports.examPaperCreate = asyncHandler(async (req, res) => {

    const { question, firstoption, secondoption, thirdoption, fourthoption, correctAnswer } = req.body

    await Exam.create({ question, firstoption, secondoption, thirdoption, fourthoption, correctAnswer })

    res.status(201).json({ message: "Exam Create Successfully" })
})

exports.updateExamPaper = asyncHandler(async (req, res) => {
    await Exam.findByIdAndUpdate(req.params.eid, req.body)
    res.json({ message: "Paper Update Successfully" })
})

exports.deleteExamPaper = asyncHandler(async (req, res) => {
    const { eid } = req.params
    await Exam.findByIdAndDelete(eid)
    res.json({ message: "Paper Delete Successfully" })
})




/* ------------------- user exam -------------------------- */

exports.userExam = asyncHandler(async (req, res) => {
    const { answers, userId } = req.body;

    try {
        const savedAnswer = await UserAnswer.create({
            userId: userId,
            answers: answers
        });
        res.json({ message: "User Exam Submitted Successfully", result: savedAnswer });
    } catch (error) {
        console.error("Error saving answers:", error);
        res.status(500).json({ message: "Error saving answers", error: error.message });
    }
});
