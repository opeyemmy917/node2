
const usermodel = require("../models/usermodels")
const bcrypt = require("bcryptjs")
const jwt =require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")
const sendemail = require("../utils/mailer")
const sendotp = require("../utils/otp.mailer")
const generateotp = require("../utils/generator")
const otpmodel = require("../models/otp.model")
// const Product = require("../models/Product.model");

    const registeruser = async(req,res)=>{
        try {
            const {password ,email,name,age}= req.body
            console.log(req.body);
            if(req.body){
                const hasedpassword = await bcrypt.hash(password,10)
                console.log(hasedpassword);
                const user= await usermodel.create({
                    name,
                    age,
                    email,
                    password:hasedpassword
                })
                
                if (user) {
                    await sendemail(email,name)
                    res.status(201).json({message:"user created successfully"})
                    
                } else {
                    res.status(400).json({ message:"Failed to create user"})
                }
        
            } 
        } catch (error) {
            console.log(error);
            res.status(500).send({message: error.message})
            // res.status(500).json({message: error.message})  
        }
    }

    const loginuser = async(req,res)=>{
        try {
            console.log(req.body);
            const {email,password} = req.body
            if (!email || !password) {
               res.status(402).json({messages:"All fields are mandatory", status:false}) 
            }else{
                const existuser = await usermodel.findOne({email})
                console.log(existuser);
                
                if (!existuser) {
                return  res.status(405).json({message:"This user does not exist,please Register!",status:false})
                    
                }
                const ismatch = await bcrypt.compare(password,existuser.password)
                console.log(ismatch);
                
                if(!ismatch) {
                  return res.status(407).json({message:"Incorrect password",status:false})
                    
                }
                const token = await jwt.sign({email},process.env.SECRETKEY,{expiresIn:"1d"})
                 return  res.status(200).json({message:"User login succesful", status:true, token})
                
            }
         
        } catch(error) {
            res.status(500).json({message:error.message,status:false})
        }
    
    }

    
    const verifyuser = async(req,res)=>{
        try {
          const token = req.headers.authorization.split(" ")[1] 
          console.log(token);
          if(!token){
            res.status(400).json({message:"Invalid token",status:false})
          }else{
            const decodedtoken = await jwt.verify(token,process.env.SECRETKEY)
            console.log(decodedtoken);
            if(decodedtoken){
                res.status(200).json({message:"token verification successful",status:true})
            }else{

                res.status(405).json({message:"error veryfying token",status:false})
            }
            
          }
           
        } catch (error) {
            console.log(error);
            res.status(500).json({message:error.message,status:false})
            
            
        }

    }

    const uploadprofile = async (req,res) =>{
        try {
          const { image } = req.body
          console.log(image);
            
          const token = req.headers.authorization.split(" ")[1] 
          console.log(token);
          const decodedtoken = await jwt.verify(token, process.env.SECRETKEY)
          console.log(decodedtoken);
          if (!decodedtoken) {
            res.status(400).send({message:"invalid token",status:false})
            
          } else {
            const uploadedimage = await cloudinary.uploader.upload(image)
            console.log(uploadedimage.secure_url, "uploaded image");
            const updateimage = await usermodel.findOneAndUpdate(
                {email:decodedtoken.email},
                {$set:{profile:uploadedimage.secure_url}},
                {new:true}
            )
            console.log(updateimage, "profile update");
            
            if(updateimage){
                res.status(200).send({message:"profile updated successfully",status:true})
            }else{
            res.status(404).send({message:"error updating profile",status:false})
            }
            
          }     
        } catch (error) {
            console.log(error);
            res.status(500).send({message:error.message,status:false})
        }
    }


    const forgotpassword = async(req,res)=>{
        try {
            const {email} = req.body
            const user = await usermodel.findOne({email})
            console.log(user);
            if(!user){
                res.status(404).send({message:"user not found",status:false})
            }else{
                const otp = generateotp()
                await otpmodel.create({
                    otp,
                    email:user.email
                })
                const sentmail = await sendotp(user.email,user.name,otp)
                if(sentmail){
                    res.status(200).send({message:"otp has been sent to your mail",status:true})

                }  
            }   
        } catch (error) {
            res.status(500).send({message:error.message, stauts:false})
            
        }
    }
    const resetpassword = async(req,res)=>{
        try {
            console.log(req.body);
            const {otp,newpassword}=req.body
            const user = await otpmodel.findOne({otp})
            console.log(user);
            if (!user) {
              res.status(404).send({message:"otp is invalid",status:false})  
            } else {
               const hashpassword = await bcrypt.hash(newpassword,10)
               const updateuser = await usermodel.updateOne(
                {email:user.email},
                {$set:{password:hashpassword}}
               )
               if (updateuser){
                await otpmodel.deleteOne({otp})
                res.status(200).send({message:"password reset successfully", status:true})
               }
            }
        } catch (error) {
            res.status(500).send({message:error.message,status:false})
        }

    }
    const product = async(req,res)=>{
        try {
      const { productId, productName, productDescription } = req.body;
      if (!productId || !productName || !productDescription) {
        res.status(404).send({message:"All field is required",status:false})
      }
      const newProduct = new Product({
        productId:"",
        productName:"",
        productDescription:"",
        productPrice:""
      });

      const savedProduct = await newProduct.save();

        } catch (error) {
         console.error(error);
          res.status(500).send({ message:error.message,status:false }); 
        }
    }


   

    //  [
    //     { id: 1, name: 'Product A' },
    //     { id: 2, name: 'Product B' },
    //     { id: 3, name: 'Product C' },
    //   ];
      
     
      
    module.exports= {registeruser,loginuser,verifyuser,uploadprofile,forgotpassword,resetpassword,product}