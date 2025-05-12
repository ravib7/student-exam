const exam = require("../controller/adminexam.controller")

const router = require("express").Router()

router
    .get("/exam-fetch", exam.getExamPaper)
    .get("/exam-name", exam.getExamName)
    .post("/exam-create", exam.examPaperCreate)
    .patch("/exam-update/:eid", exam.updateExamPaper)
    .delete("/exam-delete/:eid", exam.deleteExamPaper)

    .get("/get-user-result", exam.getAllResults)
    .post("/exam-time", exam.createExamTime)



module.exports = router