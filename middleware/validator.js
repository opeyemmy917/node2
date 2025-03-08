const validateform = (schema)=> async(req,res,next)=>{
    try {
        const validated = await schema.validate(req.body)
    if (validated) {
        next()
    } 
    } catch (error) {
       res.status(500).send({message:error.message,status:false}) 
    }
   
};

module.exports= validateform