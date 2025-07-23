const exp = require('express');
const authorApp=exp.Router();
const userauthor = require('../models/userAuthorModel');
const expressAsyncHandler = require('express-async-handler');
const createUserOrAuthor = require('./createUserOrAuthor');
const article = require('../models/articleModel');
const {requireAuth}= require('@clerk/express')
require('dotenv').config()

//API
authorApp.post('/author',expressAsyncHandler(createUserOrAuthor))

//create article api
authorApp.post('/article',expressAsyncHandler(async(req,res)=>{
    const articledata= req.body;
    const newarticle = new article(articledata);
    const articleobj=await newarticle.save();
    res.status(201).send({message:"article published",payload:articleobj})
}))


//read all articles
authorApp.get('/articles',requireAuth({signInUrl:'unauthorized'}),expressAsyncHandler(async(req,res)=>{
    const allarticles = await article.find({isArticleActive:true});
    res.status(200).send({message:'articles',payload:allarticles})
}))

authorApp.get('/unauthorized',(req,res)=>{
    res.send({message:'unauthorised req  '})
})

//edit article by id
authorApp.put('/article/:articleId',requireAuth({signInUrl:'unauthorized'}),expressAsyncHandler(async(req,res)=>{
    const modifiedArticle= req.body;
    const dbRes= await article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
    res.status(200).send({message:"article modified",payload:dbRes})

}))

//delete article by id
authorApp.put('/articles/:articleId',expressAsyncHandler(async(req,res)=>{
    const modifiedArticle= req.body;
    const dbRes= await article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
    res.send({message:"article deleted or restored",payload:dbRes})

}))



module.exports=authorApp;