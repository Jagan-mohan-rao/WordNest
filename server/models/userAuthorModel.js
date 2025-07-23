const mongoose = require('mongoose');
const userAuthorSchema= new mongoose.Schema({
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
},{"strict":"throw"})

//create model (which means creating a collection with name on lhs when connected to server)
const userauthor=mongoose.model('userauthor',userAuthorSchema)

//export
module.exports=userauthor;