 const mongoose = require("mongoose")

 const userschema = mongoose.Schema({
    name: {type:String, required:true},
    age:  {type:Number, required:true},
    email: {type:String, required:true,unique:true},
    password: {type:String, required:true}

})

  const usermodel = mongoose.model("user_collections",userschema)
  module.exports = usermodel