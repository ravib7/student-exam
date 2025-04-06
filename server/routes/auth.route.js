const { UserRegister, UserLogin, UserLogout, UserLoginWithGoogle, adminRegister, adminLogin, sendOTP, adminLogout } = require("../controller/auth.controller")

const router = require("express").Router()

router
    /* ------------- User Router --------------- */
    .post("/user-register", UserRegister)
    .post("/user-login", UserLogin)
    .post("/user-logout", UserLogout)

    /* ------------- Admin Router --------------- */
    // .post("/admin-register", adminRegister)
    // .post("/admin-sendotp", sendOTP)
    .post("/admin-login", adminLogin)
    .post("/admin-logout", adminLogout)

module.exports = router