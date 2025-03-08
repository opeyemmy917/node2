const yup = require("yup")


const uservalidation = yup.object({
    name:yup.string().min(4,"name is too short").required("name cannot be empty"),
    email:yup.string().email("must be a valid email").required("email is required"),
    password:yup.string().min(8,"password must not be a minimum of 8 characters").required("password must not be empty")
})

module.exports=uservalidation