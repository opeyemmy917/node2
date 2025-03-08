const express = require("express");
const app = express();
const PORT = 2345;
const cors = require("cors");
const mongoose = require("mongoose");
const userrouter = require("./routes/userroutes")
     require("dotenv").config()
app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/",userrouter)

// app.get("/datas", (req,res)=>{
//     res.json([
//         {name:"ope"},
//         {class:"ope"},
//         {Age:"10"}
//     ])
// })
// app.post("/receive",(req,res)=>{
//     console.log(req.body,"request received");
//     res.send("information received")
    
// })

   

app.post("/user/signup", async(req,res) =>{
try {
    console.log(req.body);
    if(req.body){
        const user = await usermodel.create(req.body)
        if (user) {
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

})

// app.post( "/user/login", async(req,res)=>{

//     try {
//         console.log(req.body);
//         const {email,password} = req.body
//         if (!email || !password) {
//            res.status(402).json({messages:"All fields are mandatory", status:false}) 
//         }else{
//             const existuser = await usermodel.findOne({email})
//             if (!existuser) {
//                 res.status(405).json({message:"This user does not exist,please Register!",status:false})
                
//             }else if( existuser.password  !== password) {
//                 res.status(407).json({message:"Incorrect password",status:false})
                
//             }else{
//                 res.status(200).json({message:"User login succesful", status:true})
//             }
//         }
     
//     } catch(error) {
//         res.staus(500).json({message:error.message,status:false})
//     }

// })
// app.get("/user/get-data", async(req,res)=>{
//   try {
//   const users =  await usermodel.find()
//   console.log(users);
//   if (users) {
//     res.status(200).json({message:"User fetched" ,users, status:true})
//   }
  
//   } catch (error) {
//     res.status(500).json({message:error.message ,status:false})
//   }
  
// })



// app.delete("/user/delete/:email", async(req,res)=>{
//     try {
//         console.log(req.params)
//         const {email} = req.params
//        const deleteuser = await usermodel.deleteOne({email})
//         console.log(deleteuser);
//         if (deleteuser.deletedCount == 0) {
//             res.status(400).json({message:"Unable to delete user"})
//         }else{
//             res.status(200).json({message:"User deleted successfully"})
//         }
       
//     } catch (error) {
//        console.log(error);
//        res.status(500).json({message:error.message})
//     }

// })



const uri ="mongodb+srv://olawunmiopeyemi19:LE38AxlDdbB6j9t3@project.bsl8s.mongodb.net/?retryWrites=true&w=majority&appName=Project"
 const connect = ()=>{
    try {
        const connection = mongoose.connect(uri)
        if(connection){
            console.log("connection to database successful");
        }
    } catch (error) {
       console.log(error);
        
    }
 }
 connect()

app.listen(PORT,()=>{
    console.log("app is listening "+ PORT);
    
})

