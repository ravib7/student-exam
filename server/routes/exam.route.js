const exam = require("../controller/exam.controller")

const router = require("express").Router()

router
    .get("/exam-fetch", exam.getExamPaper)
    .post("/exam-create", exam.examPaperCreate)
    .patch("/exam-update/:eid", exam.updateExamPaper)
    .delete("/exam-delete/:eid", exam.deleteExamPaper)

    .post("/user-exam-check", exam.userExamChecking)
    .get("/user-results", exam.getUsersResults)
    .post("/exam-time", exam.createExamTime)
    .get("/get-exam-time", exam.getExamTime)

module.exports = router