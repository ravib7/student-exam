const { examPaperCreate, getExamPaper, deleteExamPaper, updateExamPaper, userExam, userExamChecking, getUsersResults } = require("../controller/exam.controller")

const router = require("express").Router()

router
    .get("/exam-fetch", getExamPaper)
    .post("/exam-create", examPaperCreate)
    .patch("/exam-update/:eid", updateExamPaper)
    .delete("/exam-delete/:eid", deleteExamPaper)

    .post("/user-exam-check", userExamChecking)
    .get("/user-results", getUsersResults)

module.exports = router