const mongoose = require('mongoose')

const adminSchema =new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        // required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profileImageUrl:{
        type:String,
        
    },
    isActive:{
        type:Boolean,
        default:true
    },
})

//create model
const admin = mongoose.model('admin',adminSchema)

//model export 
module.exports=admin;   