import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProfile } from './context/ProfileContext';
import api from './api/axios';

function JobPosts() {

  const {item} = useParams()
  const [jobData , setJobData] = useState(null)
  const [resumeData , setResumeData] = useState(null)
  const [userComment , setUserComment] = useState('')

  const [comments , setComments] = useState([])

  const {profile} = useProfile()

  useEffect(() => {

    const fetchData = async () => {
        const res = await api.get(`/${item}`)
        const commentsData = await api.get(`/${item}` )
        console.log(res);
        setJobData(res.data.jobData)
        setComments(commentsData?.data?.comments)
    }
    
    
    fetchData()
  } , [])

  function handleSubmitApp(e){

    e.preventDefault()

    const formData = new FormData()
    formData.append("file" , resumeData)

    setResumeData(null)
    
  }

  const handleAddComment = async() => {
    const res = await api.post('/addcomment' , {comment : userComment , username : profile?.userInfo?.username , postId : item} )
    setUserComment('')

  }

  return (
    <div>
      <div style={{fontWeight:'600' , marginBottom:'20px', marginLeft:'20px'}} >{jobData?.jobTitle}</div>
      <div style={{marginLeft:'20px'}} >{jobData?.jobDescription}</div>

      <div className='Apply' style={{border:'1px solid' , width:'40%' , margin:'auto'}} >
        <input type='text' placeholder='Apply with a Message' style={{display:'block' , margin:'10px', width:'70%' , height:'50px'}} />
        <span style={{marginLeft: '10px'}} >Attach Resume</span>
        <input type='file' style={{display:'block' , margin:'10px', marginBottom:'0px', width:'70%' , height:'30px'}}
          onChange={(e) => setResumeData(e.target.files[0])}
        />
        
        <button style={{margin: '10px', marginTop:'0px', padding:'10px 15px' }} onClick={handleSubmitApp}  >Submit My Application</button>
      </div>

      <div className='comments' >
        <div style={{margin:'20px 20px' , fontWeight:'600'}} >Comments About the Job Posting LOL</div>
        <input type='text' placeholder='Add Your Comment' 
          value={userComment} onChange={(e) => setUserComment(e.target.value)}
        style={{ margin:'20px', width:'50%' , height:'50px'}} />
        <button onClick={handleAddComment} >Submit >></button>
        {comments?.map((item) => {
          return(
            <div style={{margin:'10px 20px'}} >
              <span>{item?.createdAt} </span>
              <span style={{fontWeight:'600', marginRight:'12px', fontSize:'20px'}} >{item.username} :   </span>
              <span>{item.comment}</span>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default JobPosts