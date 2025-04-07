const asyncHandler = require("express-async-handler")
const Exam = require("../models/Exam")

exports.getExamPaper = asyncHandler(async (req, res) => {
    const result = await Exam.find()
    res.json({ message: "Paper Fetch Successfully", result })
})

exports.examPaperCreate = asyncHandler(async (req, res) => {

    const { question, firstoption, secondoption, thirdoption, fourthoption } = req.body

    await Exam.create({ question, firstoption, secondoption, thirdoption, fourthoption })

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