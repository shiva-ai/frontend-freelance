import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Post.css'
import { useProfile } from './context/ProfileContext'
import { useNavigate } from 'react-router-dom'

function Post() {

  const [title , setTitle] = useState('')
  const [desc , setDesc] = useState('')
  const [cost , setCost] = useState('')
  const [tag , setTag] = useState('')
  const [tags , setTags] = useState([])

  const [posts , setPosts] = useState([])

  const {profile} = useProfile()
  const navigate =useNavigate()

  useEffect(() => {

    const fetchPostsByUser = async () => {
      const res = await axios.get('https://backend-freelance-px5x.onrender.com/jobsbyuser' , {withCredentials:true})
      setPosts( res.data.posts)
      console.log(posts);
      
    }

    fetchPostsByUser()
  } , [])

  const getProtectedData = async () => {

    const token = localStorage.getItem("token")

    const res = await axios.post('https://backend-freelance-px5x.onrender.com/postajob'  , {
      jobTitle : title,
      jobDesc : desc,
      cost,
      tags,
      email : profile.userInfo.email,
      username : profile.userInfo.username,

    } ,{withCredentials: true})

    // const data = await res.json()
    if(res?.err?.name === "TokenExpiredError"){
      localStorage.removeItem("token")
      localStorage.removeItem("username")
    }
    console.log(res);
    
  }

  function handleAddTag(){
    if(tag){
      setTags([...tags , tag])
      setTag('')
    }
    else{

    }
    
  }

  return (
    <div>
      <input type='text' placeholder='Title of the Job' value={title} onChange={(e) => {setTitle(e.target.value)}} className='input' />
      <input type='text' placeholder='Description of the Job' value={desc} onChange={(e) => {setDesc(e.target.value)}} className='input' />
      <input type='text' placeholder='Cost of the Job' value={cost} onChange={(e) => {setCost(e.target.value)}} className='input' />
      <input type='text' placeholder='Add a Tag' value={tag} onChange={(e) => {setTag(e.target.value)}}  className='input' />
      {tag === '' ? <></> : <button onClick={handleAddTag} >Add another Tag</button>}
      <div><button onClick={getProtectedData } >Post</button></div>

      <div className='createdPosts' >
        <div style={{fontWeight:'600', margin:'20px',}} >Posts Created By You Will Appear Below</div>
        {posts.length ? posts?.map((post) => {
          return(
            <div className='jobPost' style={{margin:'20px', border:'1px solid' , width:'40%', padding:'10px'}} key={post._id}
              onClick={() => {navigate(`/jobs/${post._id}`)}}
            >
              <div style={{fontWeight:'600', }} >{post.jobTitle}</div>
              <div >{post.jobDescription}</div>
              <div >Posted On : {post.createdAt}</div>
              <div >Cost : {post.cost}</div>
            </div>
          )
        }) : 
          <div style={{fontWeight:'600', margin:'20px',}}>No Jobs Posted Yet</div>
        }
      </div>


    </div>
  )
}

export default Post