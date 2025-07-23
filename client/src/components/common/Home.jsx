import { useContext, useEffect, useState } from "react";
import { UACobj } from "../../contexts/UserAuthorContext2";
import { useUser } from "@clerk/clerk-react";
import '../allCSS/home.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserProfileSidebar from "./UserProfileSidebar";
import { SiReact, SiMongodb, SiNodedotjs, SiExpress, SiBootstrap, SiGithub, SiClerk } from 'react-icons/si'


function Home() {
  const { currentUser, setcurrentUser } = useContext(UACobj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, seterror] = useState("");
  const [selectedRoleBox, setSelectedRoleBox] = useState(""); // New state for selected box
  const [issidebaropen,setissidebaropen]=useState(false)
  const navigate = useNavigate();

  async function getUserRole(role) { // Modified: directly pass role string

    seterror('') //clear error message
    // const selectedRole = e.target.value; // Removed, now 'role' is passed directly
    const selectedRole = role; // Use the passed role

    currentUser.role = selectedRole;

    let res = null;

    if (selectedRole === "author") {
      res = await axios
        .post("${import.meta.env.VITE_API_BASE_URL}/author-api/author", currentUser)
      let { message, payload } = res.data;
      if (message === 'author') {
        setcurrentUser({ ...currentUser, ...payload })
        localStorage.setItem('currentuser', JSON.stringify(payload))
        setSelectedRoleBox("author"); // Set selected role box
      }
      else {
        seterror(message);
      }
      console.log(currentUser)
    }
    if (selectedRole === 'user') {
      res = await axios
        .post("${import.meta.env.VITE_API_BASE_URL}/user-api/user", currentUser)
      let { message, payload } = res.data;
      if (message === 'user') {
        setcurrentUser({ ...currentUser, ...payload })
        localStorage.setItem('currentuser', JSON.stringify(payload))
        setSelectedRoleBox("user"); // Set selected role box
      }
      else {
        seterror(message)
      }

    }
    if (selectedRole === 'admin') {
      const allowedAdminEmails = ["23071a6927@vnrvjiet.in"];
      if (!allowedAdminEmails.includes(currentUser.email)) {
        seterror("You are not authorized as admin.");
        return;
      }

      res = await axios
        .post("${import.meta.env.VITE_API_BASE_URL}/admin-api/login", { email: currentUser.email })
      let { message, payload } = res.data;
      if (res.data.message === 'admin') {
        setcurrentUser({ ...currentUser, ...res.data.payload });
        localStorage.setItem('currentuser', JSON.stringify(res.data.payload));
        setSelectedRoleBox("admin"); // Set selected role box
        navigate(`/Adminprofile`);
      } else {
        seterror("Invalid admin credentials.");
      }
      return;
    }
  }


  useEffect(() => {
    setcurrentUser({
      ...currentUser,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.primaryEmailAddress?.emailAddress,
      profileImageUrl: user?.imageUrl,
    });

  }, [isLoaded,]);

  useEffect(() => {
    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/UserProfile/${currentUser.email}`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      navigate(`/AuthorProfile/${currentUser.email}`);
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const getstartedbutton = () => {
    navigate(`/Signin`) // Assuming '/sign-in' is your Clerk sign-in route
  }

  const toggleSidebar=()=>{
    setissidebaropen(!issidebaropen)
  }




  return <div className="container  ">
    {
      isSignedIn ? (
        <div className="  text-center  d-flex flex-column justify-content-around align-items-center  ">
          <div className=" glass-box w-50  mb-0 p-4">
            <h1 className="welcome-text tracking-in-contract-bck"> Welcome, {currentUser.firstName} {currentUser.lastName}!</h1>
            <img src={currentUser.profileImageUrl} 
            alt="Profile" 
            className="bg-light p-1 rounded-circle" 
            onClick={toggleSidebar}
            style={{cursor:'pointer'}}
            width="100" />
            <p className=" mt-3 emailinhome">Email: {currentUser.email}</p>
          </div>

          <h5 className="  text-warning text-center mt-1 mb-0 p-0">Select your role</h5>
          {error.length != 0 && (
            <p className="text-danger text-center m-0 p-0">{error}</p>
          )}
          <div className=" glass-boxa bg-transparent w-50 d-flex  justify-content-center mb-0 pt-4 pb-0 rounded-3 gap-5 "> {/* Added gap-3 for spacing */}
          
        
          

           {/* <div className="d-flex justify-content-center mt-0 pt-0 gap-5 w-100 "> */}
             {/* Author Box */}
            <div
              className={`glass-box1 d-flex flex-column align-items-center justify-content-center p-0 rounded-3  ${selectedRoleBox === "author" ? "border border-warning border-3" : ""}`}
              onClick={() => getUserRole("author")} // Call with role string
              style={{ minWidth: '150px', minHeight: '120px', cursor: 'pointer' }}
            >
              <h4 className="text-warning mb-2">✍️</h4>
              <p className="text-warning fw-bold">Author</p>
            </div>

            {/* User Box */}
            <div
              className={`role-box glass-box1 d-flex flex-column align-items-center justify-content-center p-3 rounded-3 shadow ${selectedRoleBox === "user" ? "border border-info border-3" : ""}`}
              onClick={() => getUserRole("user")} // Call with role string
              style={{ minWidth: '150px', minHeight: '120px', cursor: 'pointer' }}
            >
              <h4 className="text-info mb-2">📖</h4>
              <p className="text-info fw-bold">User</p>
            </div>

            {/* Admin Box */}
            <div
              className={`role-box glass-box1  d-flex flex-column align-items-center justify-content-center p-3 rounded-3 shadow ${selectedRoleBox === "admin" ? "border border-primary border-3" : ""}`}
              onClick={() => getUserRole("admin")} // Call with role string
              style={{ minWidth: '150px', minHeight: '120px', cursor: 'pointer' }}
            >
              <h4 className="text-primary mb-2">🔐</h4>
              <p className="text-primary fw-bold">Admin</p>
            </div>
           </div>
           {
            issidebaropen && (
              <UserProfileSidebar user={currentUser} onClose={toggleSidebar} />
            )
           }
          

        </div>
      ) : (
        <>
          <>
            <section className=" mt-5  mb-4  text-center py-5">
              <h5 className="hero-title fw-semibold mt-5 mb-5">
                Explore, write, and connect with a community of passionate authors.
              </h5>
              <p className="hero-subtitle fs-5  mb-4">
                Connect with talented writers, follow their work, and engage in meaningful discussions by commenting and sharing your thoughts.
              </p>
              <button className="btn btn-primary btn-lg px-4 py-2" onClick={getstartedbutton}>Get Started</button>
              <p className="mt-5 text-light">Scroll to explore</p>
              <span className="arrow-down fs-2 text-light" onClick={() => document.getElementById("platform").scrollIntoView({ behavior: "smooth" })}>▼</span>
            </section>

            <section id="platform" className="platform-feature glass-box text-center py-5 rounded-3 text-white">
              <h2 className="mb-3 fw-bold">Platform Features</h2>
              <p className="mb-5">Our platform offers specialized features for readers, writers, and administrators</p>
              <div className="row justify-content-center gap-4">
                <div className="col-md-3 p-4 glass-box1 rounded-4">
                  <h4 className="text-warning mb-2">✍️ For Authors</h4>
                  <p>Powerful writing tools with SEO optimization, analytics, and audience insights to help grow your readership.</p>
                </div>
                <div className="col-md-3 p-4 glass-box1 rounded-4">
                  <h4 className="text-info mb-2">📖 For Readers</h4>
                  <p>Personalized content recommendations, bookmarking features, and interactive discussions with your favorite authors.</p>
                </div>
                <div className="col-md-3 p-4 glass-box1 rounded-4">
                  <h4 className="text-primary mb-2">🔐 For Admins</h4>
                  <p>Comprehensive dashboard with user management, content moderation, and detailed platform analytics.</p>
                </div>
              </div>
            </section>

            <section className="tech-stac glass-box mb-5 text-center py-5">
              <h2 className="mb-3 fw-bold text-light">Our Tech Stack</h2>
              <p className=" text-light mb-4">Built with modern technologies for performance, scalability, and reliability</p>
              <div className=" d-flex justify-content-center flex-wrap gap-5 text-light">
                <div className="tech-icons-div"><p><SiReact className="tech-icons text-info" /></p> React</div>
                <div><p><SiNodedotjs className="tech-icons text-success " /></p> Node.js</div>
                <div><p><SiExpress className="tech-icons  " /></p> Express</div>
                <div><p><SiMongodb className="tech-icons bg-black" style={{ color: 'lightgreen' }} /></p> MongoDB</div>
                <div><p><SiBootstrap className="tech-icons " style={{ color: '#7952B3' }} /></p> Bootstrap</div>
                <div><p><SiClerk className="tech-icons p-2 rounded-4" style={{ background: '#784DF6' }} /></p> Clerk</div>
                <div><p><SiGithub className="tech-icons" /></p> GitHub</div>
              </div>
            </section>
          </>

        </>
      )
    }

  </div>;
}

export default Home;