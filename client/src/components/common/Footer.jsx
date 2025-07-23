import React from 'react'
import "../allCSS/footer.css";
import { SiGithub, SiReact,SiLinkedin } from 'react-icons/si';
import { FaFacebook } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

function Footer() {
  return (
    
    <div className="footer  d-flex flex-column ">
     <div className=' container d-flex flex-row justify-align-align-content-around align-items-center mb-2 mt-4 '>
      <div className=" container  info">
        <h5 className='text-warning text-center w-50  fw-bold'>WordNest</h5>
        
          <p className='lead opacity-75 text-info text-center w-50' >A platform for writers, readers,and
               knowledge seekers to connect, share,
                 and grow together.</p>
        
      </div>
      <div className="">
        <div className="contact me-2">
          <p className='lead text-light fw-semibold text-center text-decoration-underline mb-0'>Contact</p>
          <a href="mailto:jaganrao.1008@gmail.com" className='d-flex gap-1 opacity-75  text-decoration-none text-light'><MdEmail className='mt-1 text-warning fs-5'/>jaganrao.1008@gmail.com</a>
        </div>
        <div className='d-flex justify-content-around'>
          
          
          <a href="https://github.com/Jagan-mohan-rao" className='text-decoration-none text-light mt-3 '><SiGithub className='fs-2'/></a>
          <a href="https://www.linkedin.com/in/jagan-mohan-j103/" className='text-decoration-none text-light mt-3 '><SiLinkedin  className='fs-2  text-info'/></a>
          <a href="https://www.facebook.com/" className='text-decoration-none text-light mt-3 '><FaFacebook  className='fs-2 bg-light text-primary rounded-circle'/></a>
          
        </div>
      </div>
    </div>
    <div className="text-center mt-auto mx-5">
      <hr className="border-top border-light w-100" />
        <p className="text-center small text-secondary">
          © {new Date().getFullYear()} WordNest. All rights reserved.
        </p>
      
    </div>
   
   </div>
  
  
  )
}

export default Footer