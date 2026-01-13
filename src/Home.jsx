import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

function Home() {

    const [searchText , setSearchText] = useState('')
    const [jobsData , setJobsData] = useState(['web Development' , 'App Development' , 'web Design'])
    const [searchResultData , setSearchResultData] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            const result = jobsData.filter((item) => 
                (searchText !== '' && item.includes(searchText.toLowerCase()))
            )
            setSearchResultData(result)
        } , 2000)
        
    } , [searchText])

  return (
    <div>
        <h3>Browse by Category</h3>
        <div className='searchBar' >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            <input type='text' placeholder='Search for a category' 
            className='searchTag' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <div className='searchResult' >
            {searchResultData.map((item) => {
            return(
                <div className='searchResults' onClick={() => {navigate(`/jobs/${item}`)}} >
                    {item}
                </div>
            )
        })}
        </div>
        
    </div>
  )
}

export default Home