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
            useroauth = await User.create({
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
            })
        } else {
            const token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)

            res.cookie("USER", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: false })

            res.json({
                message: "User Login Successfully",
                name: result.name,
                email: result.email,
                picture: result.picture
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












// exports.UserLogin = asyncHandler(async (req, res) => {

// const { email, password, credential } = req.body

// let result

// if (credential) {

//     const client = new OAuth2Client({ clientId: process.env.GOOGLE_CLIENT_ID })

//     const data = await client.verifyIdToken({ idToken: credential })

//     if (!data) {
//         return res.status(401).json({ message: "unable to process" })
//     }

//     const { payload } = data

//     result = await User.findOne({ email: payload.email })

//     if (!result) {
//         useroauth = await User.create({
//             name: payload.name,
//             email: payload.email,
//             picture: payload.picture,
//         })
//     }
// }
// else {
//     result = await User.findOne({ email })

//     if (!result) {
//         return res.status(401).json({ message: "Email Not Registered With Us" })
//     }

//     const verify = await bcrypt.compare(password, result.password)

//     if (!verify) {
//         return res.status(401).json({ message: "Invalid Password" })
//     }
// }

// const token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)

// res.cookie("USER", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: false })

// res.json({
//     message: "User Login Successfully",
//     name: result.name,
//     email: result.email,
//     picture: result.picture
// })
// })