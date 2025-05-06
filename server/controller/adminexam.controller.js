const asyncHandler = require("express-async-handler")
const Exam = require("../models/Exam")
const UserAnswer = require("../models/UserAnswer")
const User = require("../models/User")
const Time = require("../models/Time")

exports.getExamPaper = asyncHandler(async (req, res) => {
    const result = await Exam.find()
    res.json({ message: "Paper Fetch Successfully", result })
})

exports.examPaperCreate = asyncHandler(async (req, res) => {

    const { question, firstoption, secondoption, thirdoption, fourthoption, correctAnswer, marks } = req.body

    const result = []

    result.push({ question, firstoption, secondoption, thirdoption, fourthoption, correctAnswer, marks })

    await Exam.create(result)

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

exports.getAllResults = asyncHandler(async (req, res) => {

    const userResult = await UserAnswer.find()

    res.json({ message: "User Result Fetch Successfully", userResult })
})

exports.createExamTime = asyncHandler(async (req, res) => {

    const { startTime, endTime, examDate, examName } = req.body

    if (!startTime || !endTime || !examDate || !examName) {
        res.status(400)
        throw new Error("Please provide startTime, endTime, examName and examDate");
    }

    const examTime = await Time.create({ startTime, endTime, examDate, examName })

    res.json({ message: "Exam Time Set Successfully", examTime })
})






