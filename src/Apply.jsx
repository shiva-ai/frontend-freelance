import React, { useEffect, useState } from 'react'
import './Apply.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Apply() {

  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    console.log("LOL Apply called");

    const fetchJobs = async () => {
      const res = await axios.get('https://backend-freelance-px5x.onrender.com//apply' , {withCredentials : true})
      setJobs(res.data)
      console.log(res.data);
      
    }

    fetchJobs()
    
  } , [])

  function handleJobClick (id){
    navigate(`/jobs/${id}`)
  }
  

  return (
    <div>
     

      {jobs?.data?.map((item) => {
        return (
          <div className='job'  onClick={() => {handleJobClick(item._id)}} >
            <div>
          <p className='heading'  style={{textDecoration:"none"}} >{item.jobTitle}</p>
          <div className='projDesc' >{item.jobDescription}</div>

          <div className='tags' >
          {item.tags.map((tag) => {
            return (
                 <a href='#' className='tag' >{tag}</a>
            )
          })}
          </div>

          <div className='username' >Posted By : {item.username}</div>

        </div>

        <div className='price' >
          <div className='avgPrice' >{item.cost}</div>
        </div>
          </div>
        )
      })}

    </div>
  )
}

export default Apply