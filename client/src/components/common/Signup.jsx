import React from 'react'
import '../allCSS/signin.css'
import { SignUp } from '@clerk/clerk-react'

function Signup() {
  return (
    <div  className='container d-flex justify-content-center align-items-center   'style={{marginTop:"150px"}}>
      
      <SignUp
       appearance={
        {
          elements: {
            card: ' cc',
            formFieldInput: 'signin-input',
            formButtonPrimary: 'signin-button',
            headerTitle: 'color-text-primary',
             socialButtonsBlockButton: 'google-btn-custom',
            
          },
          variables: {
            colorBackground:'#0b1d4240',
            colorText:'#fb8500',
            
            
              colorPrimary: '#f59e0b',
            colorTextPrimary: '#18053b',
            // colorBackground: '#18053b',
            // colorText: '#f59e0b',
            // formButtonPrimary:'#f59e0b',
            // // colorInputText:'#f59e0b',
            // transitionDuration: '0.3s',
            
            // colorTextOnPrimaryBackground: '#18053b',
          },
        }}
      />
      <div className='scale-in-hor-left ' style={{height:"320px", width:"220px",background:"var(--Ocol)" ,borderTopRightRadius:"20px",borderBottomRightRadius:"20px", padding:"20px"}}>
        <h1 className='text-center fw-semibold' style={{marginTop:"100px",color:"var(--navycol)",fontSize:"1.7rem"}}>Welcome to WordNest</h1>
        <p className="text-dark" style={{fontSize:'0.7rem',textAlign:'center',fontWeight:''}}>Create an account to Continue</p>

         
      </div>
    </div>
  )
}

export default Signup