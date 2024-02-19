import React from 'react'
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'
import noimage from "/noimage.jpg"

const HorizontalCards = ({data}) => {



  return (

        <div className='w-[100%] flex h-[50vh]  overflow-y-auto mb-5 p-5'>

            {data.length > 0 ? data.map((d,i) => (

                <Link to={`/${d.media_type}/details/${d.id}`} key={i} className='min-w-[17%] mr-5 mb-5 bg-zinc-900'>

                    <img src={
                        d.backdrop_path || d.poster_path ?
                        `https://image.tmdb.org/t/p/original/${
                        d.backdrop_path || d.poster_path}`
                        :
                        noimage
                    } alt="" 
                    className='w-full h-[55%] object-cover' 
                    />

                    <div className='text-white p-3 h-[45%] mb-8 overflow-y-auto'>

                        <h1 className='text-xl font-semibold mb-5 whitespace-nowrap'>{
                            (d.name || 
                            d.title || 
                            d.original_name || 
                            d.original_title  ).slice(0,18)
                        }</h1>

                        <p className=' mb-5'>
                        {
                        d.overview.slice(0 ,50)
                        }... <span className='text-zink-500'>more</span>
                        </p>

                    </div>

                </Link>
            ))
            :
                <h1 className='text-3xl text-white mt-5 font-black'>
                    Nothing to show
                </h1>
            }

        </div>
  )
}

export default HorizontalCards