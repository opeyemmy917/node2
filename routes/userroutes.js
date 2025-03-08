const express = require ("express")
const userrouter = express.Router()
const {registeruser,loginuser,verifyuser,uploadprofile,forgotpassword,resetpassword} = require("../controllers/user.controller") 
const uservalidation = require("../middleware/uservalidation")
const validateform = require("../middleware/validator")



userrouter.post("/user/signup", validateform(uservalidation),registeruser)
userrouter.post ("/user/login",loginuser)
userrouter.get ("/user/verify",verifyuser)
userrouter.post ("/user/upload",uploadprofile)
userrouter.post ("/user/forgotpassword",forgotpassword)
userrouter.post ("/user/resetpassword",resetpassword)



module.exports = userrouter