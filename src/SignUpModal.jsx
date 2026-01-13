
import React, { useEffect, useRef, useState } from 'react'
import './SignUpModal.css'

function SignUpModal({setIsSignInOpen}) {

     const modalRef = useRef(null)
     

     const [username , setUsername] = useState('')
     const [password , setPassword] = useState('')
     const [email, setEmail] = useState('')
    
        useEffect(()=> {
    
            function handleClick(event){
                if(modalRef.current && !modalRef.current.contains(event.target)){
                    setIsSignInOpen(false)
                }
            }
    
            document.addEventListener('mousedown' , handleClick)
    
            return () => document.removeEventListener('mousedown' , handleClick)
    
        } , [setIsSignInOpen])

    function handleClose(){
        setIsSignInOpen(false)
    }

    const handleSignUp = async () => {

        const data = {
            username,
            password,
            email
        }

        try {
            const res = await fetch('https://backend-freelance-px5x.onrender.com/signup' , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

            const result = await res.json();
            console.log(result);

           setIsSignInOpen(false)
        }

        catch(err){
            console.log(err);
            
        }
    }

  return (
    <div  className='modal' ref={modalRef} >
        <button className='close'  onClick={handleClose} >X</button>
        <h3>Welcome !!</h3>
        <button>Continue with Google</button>
        <h3>---or---</h3>
        <input type='text' placeholder='Username' style={{display:'flex' , margin:'auto'}} value={username} 
            onChange={(e) => {setUsername(e.target.value)}}
        />
        <input type='text' placeholder='Email' style={{display:'flex' , margin:'auto'}} value={email} 
            onChange={(e) => {setEmail(e.target.value)}}
        />
        <input type='text' placeholder='Password' style={{display:'flex', margin:'auto'}}  value={password} 
            onChange={(e) => {setPassword(e.target.value)}}
        />
        <button onClick={handleSignUp} >Sign Up</button>
    </div>
  )
}

export default SignUpModal