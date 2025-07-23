const mongoose = require('mongoose');

//authorDataschema
const authorDataSchema = mongoose.Schema({
    nameOfAuthor:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
        required:true
    }
})

//comments schema
const commentsSchema = mongoose.Schema({
    nameOfUser:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
})


//article schema
const ArticleSchema = new mongoose.Schema({
    authorData:authorDataSchema,
    articleId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true

    },
    dateOfCreation:{
        type:String,
        required:true
    },
    dateOfModification:{
        type:String,
        required:true
    },
    comments:[commentsSchema],
    isArticleActive:{
        type:Boolean,
        default:true
    }
    

})

//create model for article
const article=mongoose.model('article',ArticleSchema);

//export
module.exports=article;