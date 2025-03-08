const mongoose = require("mongoose")

const otpschem = new mongoose.Schema({
    otp:{ type: String, required:true},
    email:{ type: String, required:true}
})

const otpmodel = mongoose.model("otp_collection",otpschem)

module.exports = otpmodel;