import { useState, useEffect } from "react";
import axios from "axios";
import "../allCSS/articles.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { BookOpen } from "lucide-react";
import { MdArrowDropDown, MdMoveDown } from "react-icons/md";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    getArticles();
  }, []);

  // Fetch articles from backend
  async function getArticles() {
    try {
      const token = await getToken();
      const res = await axios.get("${import.meta.env.VITE_API_BASE_URL}/author-api/articles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.message === "articles") {
        setArticles(res.data.payload);
        setFilteredArticles(res.data.payload);
        setError("");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Error fetching articles.");
    }
  }

  // Navigate to article page
  function gotoarticle(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  // Restore article function
  async function restoreArticle(articleObj) {
    try {
      const token = await getToken();
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/author-api/restore-article/${articleObj.articleId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.message === "article restored") {
        getArticles(); // Refresh list
      }
    } catch (error) {
      console.error("Error restoring article:", error);
    }
  }

  // Filter articles based on category
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === "") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) => article.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredArticles(filtered);
    }
  };

  return (
    <div className="articles-container">
      {error.length !== 0 && (
        <p className="text-danger text-center fs-1">{error}</p>
      )}

<div className="d-flex justify-content-between align-items-center    pt-3 ">
  {/* Left Section: Heading */}
  <div className="d-flex align-items-center gap-2">
    <i className="bi bi-journal-bookmark-fill fs-3 text-light"></i>
    
    <h1 className="text-info fw-bold "><BookOpen className=" text-warning " size={40}/> Articles Explorer</h1>
    
    
    
  </div>
  

  {/* Right Section: Dropdown */}
  <div>
    
    <select
      className=" shadow-sm category-dropdown "
      value={selectedCategory}
      onChange={handleCategoryChange}
      
    >
      
       <option className='op' value="" >Select Category </option>
        <option className='op' value="Programming">Programming</option>
        <option className='op' value="Web development">Web development</option>
        <option className='op' value="AI">AI</option>
        <option className='op' value="Education">Education</option>

    </select>
  </div>
</div>
<div className="d-block  ms-2  mb-4  rounded-5" style={{width:'150px',height:'5px', background: 'linear-gradient(90deg, #0b1d42, #ffc800)'}} ></div>


      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {filteredArticles.map((articleObj) => (
          <div className="col" key={articleObj.articleId}>
            <div
              className={`card travel-card h-100 ${
                articleObj.status === "deleted" ? "faded" : ""
              }`}
            >
              <div className="card-body">
                {/* Author Info */}
                <div className="author-details d-flex flex-column align-items-end mb-2">
                  <img
                    src={articleObj.authorData.profileImageUrl}
                    alt="author-profile"
                    className="rounded-4"
                    width="43px"
                  />
                  <p>
                    <small>{articleObj.authorData.nameOfAuthor}</small>
                  </p>
                </div>

                {/* Article Content */}
                <h5 className="card-title text-truncate text-uppercase gradient-title1">
                  {articleObj.title}
                </h5>
                <p className="card-text text-justify text-light">
                  {articleObj.content.substring(0, 80) + "...."}
                </p>

                {articleObj.status === "deleted" ? (
                  <button
                    className="btn btn-outline-success mt-2"
                    onClick={() => restoreArticle(articleObj)}
                  >
                    Restore
                  </button>
                ) : (
                  <button
                    className="btn travel-btn mt-2"
                    onClick={() => gotoarticle(articleObj)}
                  >
                    Read More
                  </button>
                )}

                <div className="card-footer footart border-top-1 mt-4">
                  <small className="text-secondary fst-italic">
                    last updated on : {articleObj.dateOfModification}
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;
