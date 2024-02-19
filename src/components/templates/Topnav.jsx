import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios';
import noimage from "/noimage.jpg"

const Topnav = () => {

    const [query, setquery] = useState("");
    const [searches, setsearches] = useState([])

    const GetSearches = async () => {

        try {
            const {data} = await axios.get(`/search/multi?query=${query}`);
            
            setsearches(data.results);

        } 
        catch (error) {
            console.log("Error : " , error)
        }
    }

    useEffect(() => {
      
        GetSearches();

    }, [query])

    

  return (

    <div className='w-[80%] h-[10vh] relative flex mx-auto items-center'>

        <i className='text-zinc-400 text-3xl ri-search-line'></i>

        <input type="text" placeholder='Search anything...' 
            className='w-[50%] mx-10 p-5 text-xl outline-none border-none
            bg-transparent text-zinc-200'
            onChange={(e) => setquery(e.target.value)}
            value={query}
        />
        
        {query.length > 0 && 
            <i className='text-zinc-400 text-3xl ri-close-fill cursor-pointer' onClick={() => setquery("")}></i>
        }

        <div className='z-[100] w-[50%] max-h-[50vh] bg-zinc-200 absolute top-[100%] left-[5%] overflow-auto rounded'>

            {searches.map((s , i) => (

                <Link to={`/${s.media_type}/details/${s.id}`} key={i} className='hover:text-black hover:bg-zinc-300 font-semibold text-zinc-600 flex w-[100%] p-10 justify-start items-center border-b-2 border-zinc-100'>
                
                <img 
                    className='w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg'
                    src={ 
                        s.backdrop_path || s.profile_path  ? 
                        `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path }`
                        :
                        noimage
                    } 
                    alt="" 
                />

                <span> {
                    s.name || 
                    s.title || 
                    s.original_name || 
                    s.original_title 
                } </span>

            </Link>
            ))}

            


        </div>

    </div>
  )
}

export default Topnav