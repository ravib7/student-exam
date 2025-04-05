const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const { UserProfile } = require("../utils/uploader")
const cloud = require("../utils/cloudinary")
const path = require("path")
const { OAuth2Client } = require("google-auth-library")

exports.UserRegister = asyncHandler(async (req, res) => {

    UserProfile(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "multer Error" })
        }

        const { email, password, name, mobile } = req.body

        const result = await User.findOne({ email })

        if (result) {
            return res.status(401).json({ message: "Email Already Exist" })
        }

        const hash = await bcrypt.hash(password, 10)
        // console.log(req.file);
        // console.log(req.body);

        const { secure_url } = await cloud.uploader.upload(req.file.path)

        await User.create({ name, email, mobile, password: hash, picture: secure_url })

        res.status(201).json({ message: "User Register Successfully" })
    })
})

// exports.UserLoginWithGoogle = asyncHandler(async (req, res) => {

//     const { credential } = req.body

//     const client = new OAuth2Client({ clientId: process.env.GOOGLE_CLIENT_ID })

//     const data = await client.verifyIdToken({ idToken: credential })

//     if (!data) {
//         return res.status(401).json({ message: "unable to process" })
//     }

//     const { payload } = data

//     const result = await User.findOne({ email: payload.email })

//     if (!result) {
//         useroauth = await User.create({
//             name: payload.name,
//             email: payload.email,
//             picture: payload.picture,
//         })
//     }

//     const token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)

//     res.cookie("USER", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: false })

//     res.json({
//         message: "User Login Successfully",
//         name: result.name,
//         email: result.email,
//         picture: result.picture
//     })
// })

exports.UserLogin = asyncHandler(async (req, res) => {

    const { email, password, credential } = req.body

    let result

    if (credential) {

        const client = new OAuth2Client({ clientId: process.env.GOOGLE_CLIENT_ID })

        const data = await client.verifyIdToken({ idToken: credential })

        if (!data) {
            return res.status(401).json({ message: "unable to process" })
        }

        const { payload } = data

        result = await User.findOne({ email: payload.email })

        if (!result) {
            result = await User.create({
                name: payload.name,
                email: payload.email,
                picture: payload.picture || "",
                mobile: "",
                password: null,
                authType: "google"
            })
        }
    }

    else {
        result = await User.findOne({ email })

        if (!result) {
            return res.status(401).json({ message: "Email Not Registered With Us" })
        }

        const verify = await bcrypt.compare(password, result.password)

        if (!verify) {
            return res.status(401).json({ message: "Invalid Password" })
        }
    }

    const token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)

    res.cookie("USER", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: false })

    res.json({
        message: "User Login Successfully",
        name: result.name,
        email: result.email,
        picture: result.picture
    })
})



exports.UserLogout = asyncHandler(async (req, res) => {
    res.clearCookie("USER")
    res.json({ message: "User Logout Successfully" })
})