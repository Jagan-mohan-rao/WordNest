import React,{useContext} from 'react'
import { NavLink,Outlet } from 'react-router-dom'
import { UACobj } from '../../contexts/UserAuthorContext2'


function UserProfile() {
  const {currentUser}= useContext(UACobj);
  // Check if the current user is blocked
  if (currentUser && !currentUser.isActive) { // Check if isActive is false
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-danger">Your Account Has Been Blocked</h2>
        <p className="text-light">Please contact Admin for more information
          <a href="mailto:support@example.com?subject=Account Unblock Request&body=Dear Support Team,%0D%0A%0D%0AI am writing to request the unblocking of my account.%0D%0A%0D%0AUser Email: [Your Email Here]%0D%0AReason for unblock (if any):%0D%0A%0D%0AThank you." 
          className="btn btn-primary mt-3   py-0 px-2  ">
            Request Unblock
          </a>
        </p>
      </div>
    );
  }


  return (
    
     <div className='container author-profile ' >
      
          <ul className='d-flex justify-content-between list-unstyled fs-5   ' >
           
    
    
    
    
          </ul>
          <div className="mt-5">
            <Outlet/>
          </div>
        </div>
  )
}

export default UserProfile

