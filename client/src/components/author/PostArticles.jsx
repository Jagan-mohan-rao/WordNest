import '../allCSS/postArticle.css'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UACobj } from '../../contexts/UserAuthorContext2';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { GoArrowLeft } from "react-icons/go";




function PostArticles() {
  const { register, handleSubmit,formState:{errors} } = useForm();
  const { currentUser }=useContext( UACobj )
  const navigate = useNavigate();
  // console.log(UACobj)
  // console.log(currentUser)

  //back to articles 
  function backtoarticles(){
    navigate(`/AuthorProfile/${currentUser.email}/Articles`);
    }
  async function postarticle(articleObj) {
    // Function to handle the article posting logic
    // console.log(currentUser)
    //create articleobj as per schema
    const authorData={
      nameOfAuthor:currentUser.firstName,
      email:currentUser.email,
      profileImageUrl:currentUser.profileImageUrl
    }
    articleObj.authorData=authorData;
    articleObj.articleId=Date.now();
    //add date of creation and date of modification
    let currentDate=new Date();
    articleObj.dateOfCreation=currentDate.getDate()+"-"+currentDate.getMonth()+"-"+currentDate.getFullYear()+" "+currentDate.toLocaleTimeString("en-US",{hour12:true})
    articleObj.dateOfModification=currentDate.getDate()+"-"+currentDate.getMonth()+"-"+currentDate.getFullYear()+" "+currentDate.toLocaleTimeString("en-US",{hour12:true})
    //add comments array
    articleObj.comments=[];
    //add article active state
    articleObj.isArticleActive=true;



    // This could involve sending the articleObj to a server or API
    console.log("Article posted:", articleObj);
    
    let res= await axios.post("${import.meta.env.VITE_API_BASE_URL}/author-api/article",articleObj);
    if(res.status===201){
      alert("Article posted successfully!");
      navigate(`/AuthorProfile/${currentUser.email}/Articles`);

    }
    else{
      //set error
      alert("failed to Post Article!!");
    }

    

      
    
  }
  return (

     <div className="body">
        <div className="d-flex justify-content-start">
      <button
        className="btn text-warning fs-5 fw-semibold mx-4 mb-4 align-self-start"
        style={{ position: "absolute", top: "190px", left: "110px", zIndex: 10 }}
        onClick={backtoarticles}
      >
        <GoArrowLeft className='fs-4 text-center'/> back to articles
      </button>
    </div>
      <div className="card1">
      <h1>✍️ Write an Article</h1>
    <form onSubmit={handleSubmit(postarticle)}>
      {/* <label htmlFor="title" className=' text-start ms-2  fs-5 text-warning'>Write Title</label> */}
      <input type="text" placeholder="Article Title" {...register('title')} required />
      <select className='custom-select' {...register('category')} required>
        <option className='cat' value="">Select Category</option>
        <option className='options' value="Programming">Programming</option>
        <option className='options' value="Web development">Web development</option>
        <option className='options' value="AI">AI</option>
        <option className='options' value="Education">Education</option>
      </select>
      <textarea placeholder="Write your article description..." {...register('content')} required></textarea>
      <button className='buttn' type="submit">Post Article</button>
    </form>
  </div>
     </div>
  )
}

export default PostArticles