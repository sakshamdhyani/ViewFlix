import React from 'react'
import { Link } from 'react-router-dom'
import noimage from "/noimage.jpg"

const Cards = ({data , title}) => {
  return (

    <div className='flex flex-wrap w-full px-[3%] bg-[#1F1E24]'>

        {data.map ((c,i) => (

            <Link to={`/${c.media_type || title}/details/${c.id}`} key={i} className='relative w-[25vh] mr-[4%] mb-[5%] '> 

                <img src={
                  c.poster_path || c.backdrop_path || c.profile_path ?
                  `https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path}`
                  :
                  noimage
                  } 
                alt="" 
                className='h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]' 
                />
                
                <h1 className='text-2xl text-zinc-400 mt-3 font-semibold'>
                    {c.name || c.title || c.original_name || c.original_title}
                </h1>


                {c.vote_average &&
                
                  <div className='text-white text-xl font-semibold w-[5vh] h-[5vh] flex justify-center items-center
                   bg-yellow-600 rounded-full absolute right-[-10%] bottom-[25%]'>

                    {(c.vote_average * 10).toFixed()}
                    <sup>%</sup>
                  
                  </div>
                }

            </Link>

        ))}
    </div>
  )
}

export default Cards