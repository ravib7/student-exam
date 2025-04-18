const asyncHandler = require("express-async-handler")
const Exam = require("../models/Exam")
const UserAnswer = require("../models/UserAnswer")
const User = require("../models/User")

exports.getExamPaper = asyncHandler(async (req, res) => {
    const result = await Exam.find()
    res.json({ message: "Paper Fetch Successfully", result })
})

exports.examPaperCreate = asyncHandler(async (req, res) => {

    const { question, firstoption, secondoption, thirdoption, fourthoption, correctAnswer, marks } = req.body

    await Exam.create({ question, firstoption, secondoption, thirdoption, fourthoption, correctAnswer, marks })

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

exports.getUsersResults = asyncHandler(async (req, res) => {

    const userResult = await UserAnswer.find()

    res.json({ message: "User Result Fetch Successfully", userResult })
})




/* ------------------- user exam -------------------------- */

exports.userExamChecking = asyncHandler(async (req, res) => {

    const { answers, userId } = req.body

    const user = await User.findById(userId)

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const userName = user.name
    const userEmail = user.email
    const userMobile = user.mobile
    const userImage = user.picture

    const result = []

    for (let data of answers) {
        const question = await Exam.findById(data.questionId)

        if (question) {
            const isCorrect = data.selectedOption === question.correctAnswer

            result.push({
                questionId: data.questionId,
                question: question.question,
                selectedOption: data.selectedOption,
                correctAnswer: question.correctAnswer,
                isCorrect: isCorrect,
                marks: question.marks
            })
        }
    }

    const savedAnswer = await UserAnswer.create({
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        userMobile: userMobile,
        userImage: userImage,
        answers: result,
    })

    res.json({ message: "Exam results", result, savedAnswer })
})


