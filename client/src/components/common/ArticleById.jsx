import React, { useContext, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import '../allCSS/articlebyid.css'
import { UACobj } from '../../contexts/UserAuthorContext2';
import {FaEdit,} from 'react-icons/fa'
import {MdDelete,MdRestore} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {useAuth} from '@clerk/clerk-react'
import { GoArrowLeft } from "react-icons/go";

function ArticleById() {
  const {state}=useLocation();
  const {currentUser}=useContext(UACobj)
  const [editArticleStatus,seteditArticleStatus]=useState(false)
  //const { register, handleSubmit } = useForm();
   const { register, handleSubmit,reset,formState:{errors} } = useForm();
   const {getToken} = useAuth()
   const [currentarticle,setCurrentarticle]=useState(state)
   const [commentstatus,setcommentstatus]=useState('')
  const navigate=useNavigate()
  // console.log('state is :',state)

  // if (
  //   currentarticle.isArticleActive === false &&
  //   currentUser.role !== 'author'
  // ) {
  //   return (
  //     <div className="container">
  //       <h2 className="text-danger mt-5">This article is not available.</h2>
  //     </div>
  //   );
  // }


  //to enable edit mode when edit button is clicked
  function enableEdit(){
    seteditArticleStatus(true)

  }

  //to save the edited article 
  async function onSave(modifiedArticle){
    const articleAfterchanges={...state,...modifiedArticle}
    const currentDate =new Date()
    const token=await getToken()
    articleAfterchanges.dateOfModification=currentDate.getDate()+'-'+currentDate.getMonth()+'-'+currentDate.getFullYear()

    //make http request to save the edited article
    let res=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/author-api/article/${articleAfterchanges.articleId}`, 
      articleAfterchanges,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )

    if(res.data.message==="article modified"){
      //set editArticleStatus to false
      seteditArticleStatus(false)
      //navigate to articles page
      navigate(`/AuthorProfile/${currentUser.email}/${state.articleId}`,{state:res.data.payload});

    }

    

  }

  //to delete articles
  async function deleteArticle(){
    state.isArticleActive=false
    let res=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/author-api/articles/${state.articleId}`,state)
    if(res.data.message==='article deleted or restored'){
      setCurrentarticle(res.data.payload)
    }
  }

  //to restore articles
  async function restoreArticle(){
    state.isArticleActive=true
    let res=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/author-api/articles/${state.articleId}`,state)
    if(res.data.message==='article deleted or restored'){
      setCurrentarticle(res.data.payload)
    }
  }

  //add comments
  async function addComments(commentObj) {
    commentObj.nameOfUser=currentUser.firstName
    console.log('commentobj is :',commentObj)

    // http rewq
    let res = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/user-api/comment/${currentarticle.articleId}`,commentObj)
    if(res.data.message==='Comment added'){
      setcommentstatus(res.data.message)
      setCurrentarticle(res.data.payload); 
      reset(); 
    }
    
  }




  function backtoarticles(){
    if(currentUser.role==='author'){
       navigate(`/AuthorProfile/${currentUser.email}/Articles`);
    }
    else{
      navigate(`/UserProfile/${currentUser.email}/Articles`);
    }
    
  
  }
  return (
    <div className='container'>
      <button className='btn text-warning mx-1 mb-4 fs-5 fw-semibold' onClick={backtoarticles}><GoArrowLeft className='fs-4  text-center'/>Go to articles</button>
     {
      editArticleStatus === false ? <> <div className=" glass-box  article-page-container ">
     
      {/* Article Header */}
      <div className="article-header glass-box  d-flex justify-content-between align-items-center p-4 rounded-4 border-bottom border-end border-start">
        <div className="">
          <h2 className="gradient-title">{currentarticle.title}</h2>
          <p className="text-warning small mb-1 gap-4">
            <small className='text-warning small mb-1 me-2 '>Created on: {currentarticle.dateOfCreation}</small>
            <small className='text-info  small mb-1'>Updated on: {currentarticle.dateOfModification}</small>
          </p>
        </div>
        <div className="author-info text-end">
          <img
            src={currentarticle.authorData.profileImageUrl}
            alt="author"
            className="rounded-circle border border-light border-3"
            width="60"
            height="60"
          />
          <p className="text-light mt-2 me-2">{currentarticle.authorData.nameOfAuthor}</p>
        </div>
      </div>
      {/* edit and delete buttons */}
      {
        currentUser.role==='author' &&(
          <div className='  me-2 text-end mt-3'>
            <button className="btn btn-warning a-btn  rounded-3 " onClick={enableEdit}>
              <FaEdit className=''/>
            </button>

          {
              currentarticle.isArticleActive===true?(
              <button className="btn btn-danger delete-btn a-btn me-2   ms-2" onClick={deleteArticle}>
              <MdDelete className=''/>
            </button>
            ):(
              <button className="btn btn-info restore-btn a-btn  me-2" onClick={restoreArticle} >
              <MdRestore className=''/>
            </button>
            )
          }

          </div>
        )
      }
      
      

      {/* Article Content */}
      <div className=" p-4 pt-5  border-top rounded-4 mt-3 border-end border-start border-bottom">
        <p className="article-content text-light " >{currentarticle.content}</p>
      </div>

        {/* comments */}
       
        <div>
          <div className="comments my-4 glass-box2  rounded-3 mt-4 mx-1">
          
           
              
              <h4 className="text-gold mb-3 fs-3 fw-semibold   ">🗨️Comments</h4>
            
            {
               (!currentarticle.comments || currentarticle.comments.length === 0)
                      ? <p className='text-light fs-2'>No Comments yet</p>
                      : currentarticle.comments.map(commentObj => (
                        <div className='border-start border-3 rounded-1 mx-1 px-2 mt-0 w-25' key={commentObj._id}>
                          <p className='text-info  fw-semibold mt-2 mb-0'>{commentObj.nameOfUser}</p>
                          <p className='text-light fs-4 opacity-50 '>{commentObj.comment}</p>
                          
                          
                        </div>
                      ))
            }
            

          </div>
        </div>
        {commentstatus && (
         <p className=" rounded-1 text-center fw-semibold mb-3 " style={{backgroundColor:'#d1e7dd',color:'green',width:'180px',height:'25px'}}>{commentstatus}</p>
          )}
        {/* comments form */}
        
        {
          currentUser.role==='user' && <form onSubmit={handleSubmit(addComments)} >
            <input type="text" 
              name="" id="comment" 
              className='' 
              {...register("comment",{ required: "Comment cannot be empty" })} 
              placeholder='Write Comment here' 
              style={{height:'120px',width:'360px'}}
              
            />
            {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
            {errors.comment && (
              <p className="text-danger fw-semibold mt-2 mb-0">{errors.comment.message}</p>
            )}
            <div>
              <button className=" mt-1 btn btn-success">Add comment</button>
            </div>
           

          </form>
        }

  
    </div>


    </>:



    <div className="body">
  <div className="card1">
    <h1>✍️ Edit an Article</h1>
    <form onSubmit={handleSubmit(onSave)}>
      <input
        type="text"
        placeholder="Article Title"
        className=" bg-transparent text-warning"
        {...register('title')}
        defaultValue={currentarticle.title}
      />
       {/* title validation err msg */}

      <select className="custom-select" defaultValue={currentarticle.category}  {...register('category')}>
        <option className="cat" value="">Select Category</option>
        <option className="options" value="Programming">Programming</option>
        <option className="options" value="Web development">Web development</option>
        <option className="options" value="AI">AI</option>
        <option className="options" value="Education">Education</option>
      </select>
       {/* title validation err msg */}


      <textarea
        placeholder="Write your article description..."
        className=""
        rows="8"
        defaultValue={currentarticle.content}
         {...register('content')}
      ></textarea>
       {/* title validation err msg */}


      <button className="buttn " type="submit">
        Save
      </button>
    </form>
  </div>
</div>

     }
     
    </div>
  )
}

export default ArticleById