
import { Link } from 'react-router-dom'
import "../allCSS/header.css"
import { UACobj } from '../../contexts/UserAuthorContext2'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import UserProfileSidebar from './UserProfileSidebar'


function Header() {
  const { signOut } = useClerk();
  const { isSignedIn, user, isLoaded } = useUser();
  const { currentUser, setcurrentUser } = useContext(UACobj);
  const [issidebaropen,setissidebaropen]=useState(false)
  const navigate = useNavigate();

  //function to handle sign out
  async function handleSignOut() {
      await signOut();
      setcurrentUser(null);
      localStorage.removeItem("currentuser");
      navigate('/');
    
  }

  const toggleSidebar=()=>{
    setissidebaropen(!issidebaropen)
  }
   

  return (
    <div className=' '>
      <nav className='header d-flex justify-content-between'>
        <div className=" logo d-flex justify-content-center text-decoration-none ">
    
          <Link to="/">
          <span className='logost'>
            <FontAwesomeIcon icon={faPenToSquare} size='lg' beatFade/>
            <span className='ms-2'>WordNest</span>
          </span>
          </Link>
        </div>
        <ul className='d-flex justify-content-around list-unstyled nav-header'>
        {isSignedIn ? (
            <div className='user-info '>
              <div className='d-flex' style={{position:""}}>
                <img src={user.imageUrl} 
                className='border border-2 rounded-circle justify-content-center ' 
                width="50px" 
                height="50px" 
                onClick={toggleSidebar}
                style={{cursor:'pointer'}}
                alt="" 
                />
                {
            issidebaropen && (
              <UserProfileSidebar user={currentUser} onClose={toggleSidebar} />
            )
           }
                {/* <p className="role text-info" style={{position:"absolute",top:"0px",right:"-20px"}}>{currentUser.role}</p> */}
              
                {/* <p className='mb-0 user-name text-warning' >{user.firstName} </p> */}
                 {/* <FaArrowRightFromBracket className='me-4'/> */}
               <button  className='btn  signout-btn ms-3 d-flex fs-5' onClick={handleSignOut}> <FaArrowRightFromBracket className='me-2 fs-3 signouticon'/>SignOut</button>
              </div>
            </div>
          ) : (
            <>
              <li>
                <Link to="">Home</Link>
              </li>
              <li>
                <Link to="Signin">SignIn</Link>
              </li>
              <li>
                <Link to="Signup" className='signup'>Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Header