// components/common/UserProfileSidebar.jsx
import React from 'react';
import { SignedOut, SignInButton, SignOutButton } from '@clerk/clerk-react';
import { FaUserCircle, FaEnvelope, FaImage } from 'react-icons/fa'; // Example icons
import { MdEmail, MdPerson2, MdPerson3, MdRadar } from 'react-icons/md';

function UserProfileSidebar({ user, onClose }) {
  if (!user) return null; // Don't render if no user data
  async function handleSignOut() {
      await signOut();
      setcurrentUser(null);
      localStorage.removeItem("currentuser");
      navigate('/');
    
  }

  return (
    <div className="user-sidebar-overlay " onClick={onClose}>
      <div className="user-sidebar " onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside from closing */}
        <button className="close-sidebar-btn" onClick={onClose}>&times;</button>
        <div className="sidebar-content ">
          <h4 className=" text-center ms-2 mb-4 text-info fs-2 text-decoration-underline">User Details</h4>
          <div className=" sidebar-profile-image-container mb-3">
            <img src={user.profileImageUrl} className="sidebar-profile-image" alt="Profile" />
          </div>
          <p><MdPerson3 className="me-2 strong" /> <strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><MdEmail className="me-2 strong" /> <strong>Email:</strong> {user.email}</p>
          <p><MdRadar className="me-2 strong" /> <strong>Role:</strong> {user.role || 'Not Set'}</p> {/* Display role if available */}
          <p><MdRadar className="me-2 strong" /> <strong>isActive:</strong> {user.isActive?'true':'Blocked' }</p> {/* Display role if available */}
          {/* <SignOutButton afterSignOutUrl='/Signin' className='btn btn-danger justify-content-center'/> */}
          
            {/* <button className='btn  btn-danger text-center ' >signout</button> */}
          <div className="mt-4 text-center">
            {/* You can add more actions here if needed */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn btn-outline-light">Sign In</button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileSidebar;