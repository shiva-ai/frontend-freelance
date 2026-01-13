import React, { useEffect, useRef, useState } from 'react'
import api from './api/axios'

import './LoginModal.css'

function LoginModal({setIsOpen}) {

    const modalRef = useRef(null)
    const [password , setPassword] = useState('')
    const [email, setEmail] = useState('')

    useEffect(()=> {

        function handleClick(event){
            if(modalRef.current && !modalRef.current.contains(event.target)){
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown' , handleClick)

        return () => document.removeEventListener('mousedown' , handleClick)

    } , [setIsOpen])

    function handleClose(){
        setIsOpen(false)
    }

    const handleLogin = async () => {
        const data = {
            email,
            password,
        }

        try{
            const res = await api.post('/login' , {
            email , password
      })

            // const result = await res.json()
            console.log(res);
            setIsOpen(false)
            // window.location.href = '/'

        } catch(err){
            console.log(err);
            
        }
    }

    function handleGoogleLogin(){
        window.location.href = 'https://backend-freelance-px5x.onrender.com/google'
    }

  return (
    <div className='modal' ref={modalRef}>
        <button className='close'  onClick={handleClose} >X</button>
        <h3>Welcome Back</h3>
        <button onClick={handleGoogleLogin} >Continue with Google</button>
        <h3>---or---</h3>
        <input type='text' placeholder='Email' style={{display:'flex' , margin:'auto'}} value={email} 
            onChange={(e) => {setEmail(e.target.value)}} />
        <input type='text' placeholder='Password' style={{display:'flex', margin:'auto'}}  value={password} 
            onChange={(e) => {setPassword(e.target.value)}} />
        <button onClick={handleLogin} >Login</button>
    </div>
  )
}

export default LoginModal