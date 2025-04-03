const multer = require("multer")

const UserProfile = multer({ storage: multer.diskStorage({}) }).single("picture")

module.exports = { UserProfile }
