import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NotFound from '../NotFound';

const Trailer = () => {

    const navigate = useNavigate();
    const {pathname} = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo = useSelector((state) => state[category].info.videos);

  return ytvideo ? (
    
    <div className='absolute bg-[rgba(0,0,0,.9)] text-white z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center'>
        
        <Link  
          onClick={() => navigate(-1)}
          className='absolute text-3xl text-white right-[5%] top-[5%] hover:text-[#6556CD] ri-close-fill'
        ></Link>

        <ReactPlayer 
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`} 
            height={800}
            width={1500}
            controls
        />

    </div>
  ) : (
    <div className='absolute bg-[rgba(0,0,0,.9)] z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center'>
        <Link  
          onClick={() => navigate(-1)}
          className='absolute text-3xl text-white right-[5%] top-[5%] hover:text-[#6556CD] ri-close-fill'
        ></Link>
        <NotFound/>
    </div>
  )
}

export default Trailer