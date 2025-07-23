import React,{useContext} from 'react'
import { NavLink,Outlet } from 'react-router-dom'
import { BookOpen, Send } from 'lucide-react'
import { UACobj } from '../../contexts/UserAuthorContext2';




function AuthorProfile() {
  const {currentUser}= useContext(UACobj);
    // Check if the current user is blocked
    if (currentUser && !currentUser.isActive) { // Check if isActive is false
      return (
        <div className="container mt-5 text-center">
          <h2 className="text-danger">Your Account Has Been Blocked</h2>
          <p className="text-light">Please contact Admin for more information.</p>
        </div>
      );
    }

  return (
    <div className='container author-profile '>
      <ul className='d-flex justify-content-end list-unstyled fs-5   '>
        <div className='d-flex justify-content-end   w-100 ' >
          <li className="nav-item me-5">
         {/* <NavLink to="articles" 
         className="nav-link  text-decoration-none text-light border border-info rounded-2 p-1 px-4  " 
         style={{maxWidth:'500px',maxHeight:'40px'}}>
          Articles 
        </NavLink> */}
        </li>
          
       
          

        <li className="nav-item me-4 ">
         <NavLink to="article" className=" bg-info text-decoration-none   rounded-3  p-2 px-3 me-0  " 
         style={{
          maxWidth:'500px',
          maxHeight:'40px',
         
          color:'black',
          fontWeight:'bold'
          }}  >
            Post Article <Send className='mb-1' size={20} strokeWidth={3}/>
         </NavLink>
         
        </li>
        </div>
      </ul>
      {/* <hr className='text-light mt-4 mb-0' /> */}

      <div className="mt-1">
        <Outlet/>
      </div>
    </div>
  )
}

export default AuthorProfile