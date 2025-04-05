const { UserRegister, UserLogin, UserLogout, UserLoginWithGoogle } = require("../controller/auth.controller")

const router = require("express").Router()

router
    .post("/user-register", UserRegister)
    .post("/user-login", UserLogin)
    .post("/user-logout", UserLogout)
// .post("/user-google", UserLoginWithGoogle)

module.exports = router