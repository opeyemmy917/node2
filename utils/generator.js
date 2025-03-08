const generator = require("otp-generator")

const generateotp =()=>{
    const newotp = generator.generate(6,
        {
            digits:true,
            lowerCaseAlphabets:false,
            upperCaseAlphabets:true,
            specialChars:false,
        }

    )
    return newotp
}
module.exports= generateotp