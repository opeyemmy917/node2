const nodemailer = require("nodemailer")

const sendemail = async(email,username)=>{
     const messageTemplate=`


     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //    <meta name="description" content="Welcome to our page">
    //    <meta name="keywords" content="welcome, page">
    //    <title>Welcome Page</title>
     </head>
     <body>
       <h1>Welcome to our page!</h1>
       <h1>Welcome to our service ${username}!</h1>
     </body>
     </html>
     
    `

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
          user:process.env.USER_EMAIL,
          pass:process.env.USER_PASS  
        }
    })
    const mailoptions = {
        from:process.env.USER_EMAIL,
        to:email,
        subject:"Welcome to our service",
        html:messageTemplate
    } 
    try {
       const forwardmail = await transporter.sendMail(mailoptions)
       if(forwardmail) {
        console.log("mai lsent");
        
       }
    } catch (error) {
        console.log(error);
        
        
    }
}
module.exports=sendemail