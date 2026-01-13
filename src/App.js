import {BrowserRouter as Router , Route, Routes , Link, BrowserRouter} from "react-router-dom"
import './App.css';
import Home from "./Home";
import Post from "./Post";
import Apply from "./Apply";
import {  useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import JobPosts from "./JobPosts";
import SignUpModal from "./SignUpModal";
import axios from "axios";
import { useProfile } from "./context/ProfileContext";

function App() {

  const [isOpen , setIsOpen] = useState(false)
  const [isSingInOpen , setIsSignInOpen] = useState(false)
  const [username , setUsername] = useState(null)
  const [email , setEmail] = useState('')

  const {profile , loading} = useProfile()

  function handleLogin(){
    setIsOpen(true)
  }

  function handleSignUp(){
    setIsSignInOpen(true)
  }

  const handleLogout = async() => {
   const res =  await axios.post('https://backend-freelance-px5x.onrender.com/logout' , {} , {
      withCredentials : true
    })
    localStorage.removeItem('username')
    window.location.href = '/'
  }

  useEffect(()=> {


    const fetchUsername = async () => {
      try{
        const res = await axios.get('https://backend-freelance-px5x.onrender.com/profile' , {withCredentials:true})
        setUsername(res.data.userInfo.username)   
        setEmail(res.data.userInfo.email)     
      } catch{
        setUsername(null)
        setEmail(null)
      }
      
    }

    fetchUsername()
  } , [])


  return (
    <div className={`App ${(isOpen || isSingInOpen)  ? "color" : ""}`}  >
      

    <Router>
      <div className="navBar" >
        <div className='leftBar' >
          <Link to='/' style={{marginRight:'10px', textDecoration:'none' , color:'black'}} >Yo Freelance !!</Link>
          <Link to='/postajob' style={{marginRight:'10px'}} >Post a Job</Link>
          <Link to='/apply'>Apply</Link>
          
        </div>
        <div className='rightBar' >
          {username ? <>
            <span> Hi {username}</span>
            <button className="logout" onClick={handleLogout} >Logout</button>
          </> : <> 
          {isOpen ? <LoginModal  setIsOpen={setIsOpen} /> : <button className="btn"  onClick={handleLogin} > Login</button> }
          {isSingInOpen ? <SignUpModal setIsSignInOpen={setIsSignInOpen} />  : <button className="btn"  onClick={handleSignUp} >Sign Up</button>}
            </>}
          </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/postajob" element={<Post />} ></Route>
        <Route path="/apply" element={<Apply />} ></Route>
        <Route path="/jobs/:item" element={<JobPosts />}></Route>
      </Routes>
    </Router>

   
      
    </div>
  );
}

export default App;
