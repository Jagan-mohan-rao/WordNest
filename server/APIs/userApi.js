const exp = require('express');
const userApp=exp.Router();
const userauthor = require('../models/userAuthorModel');
const expressAsyncHandler = require('express-async-handler');
const createUserOrAuthor = require('./createUserOrAuthor');
const article = require('../models/articleModel');

//API
userApp.post('/user',expressAsyncHandler(createUserOrAuthor))

//add comment by author id
userApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
    const usercommentObj=req.body;
    console.log(usercommentObj)
    const articlewithcomments=await article.findOneAndUpdate({articleId:req.params.articleId},{$push:{comments:usercommentObj}},{returnOriginal:false})
    res.send({message:"Comment added",payload:articlewithcomments})
}))
module.exports=userApp;