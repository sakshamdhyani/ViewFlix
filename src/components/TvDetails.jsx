import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadtv, removetv } from '../store/actions/tvActions';
import Loading from "../components/Loading";
import HorizontailCards from "../components/templates/HorizontalCards"
import noimage from "/noimage.jpg"

const TvDetails = () => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {info} = useSelector((state) => state.tv);
  const {pathname} = useLocation();

  useEffect(() => {

    dispatch(asyncloadtv(id));

    return () => {
      dispatch(removetv());
    }
    
  },[id])



  return info ? (

    <div className='w-screen h-[210vh] px-[10%] relative'
      style={{
        background: `linear-gradient(rgba(0,0,0,.2) , rgba(0,0,0,.5), rgba(0,0,0,.8)) , 
        url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,

        backgroundPosition: 'center',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >

      {/* Part - 1 */}
      <nav className='h-[10vh] items-center w-full text-zinc-100 flex gap-10 text-xl'>

        <Link  
          onClick={() => navigate(-1)}
          className='hover:text-[#6556CD] ri-arrow-left-line'
        ></Link>

        <a target='_blank' href={info.detail.homepage}>
          <i className='ri-external-link-fill'></i>
        </a>

        <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
          <i className='ri-earth-fill'></i>
        </a>

        <a target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>
          <i className=''>imdb</i>
        </a>

      </nav>

      
      {/* Part - 2 */}
      <div className='w-full flex'>

        <img 
          className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5) h-[55vh] object-cover ]'
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`} alt="" 
        />

        <div className='content ml-[5%] text-white'>

          <h1 className='text-5xl font-black '>
            {info.detail.name ||
            info.detail.title ||
            info.detail.original_name ||
            info.detail.original_title}

            <small className='text-3xl font-bold text-zinc-200'>
              {" "} ({info.detail.first_air_date.split("-")[0] })
            </small>
          </h1>

                
          <div className='mt-3 mb-5 flex  items-center gap-x-3'>

            <span className='text-white text-xl font-semibold w-[5vh] h-[5vh] flex justify-center items-center
                 bg-yellow-600 rounded-full'>

                  {(info.detail.vote_average  * 10).toFixed()}
                  <sup>%</sup>
                
            </span>

            <h1 className='font-semibold text-2xl w-[60px] leading-6'>
              User Score
            </h1>

            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map(g => g.name).join(",")}</h1>

            <h1>{info.detail.runtime}min</h1>

          </div>

          <h1 className='text-2xl font-semibold italic text-zinc-200'>
            {info.detail.tagline}
          </h1>

          <h1 className='text-2xl mb-3 mt-5 font-semibold'>
            Overview
          </h1>

          <p>
            {info.detail.overview}
          </p>


          <h1 className='text-2xl mb-3 mt-5 font-semibold'>
            Tv Translated 
          </h1>

          <p className='mb-10'>
            {info.translations.join(", ")}
          </p>

          <Link
           className='p-5 bg-[#6556CD] rounded-lg '
           to={`trailer`} >
           
           <i className='text-xl ri-play-fill mr-3'></i>
           Play Trailer
          </Link>

        </div>

      </div>


      {/* Part - 3 */}
       <div className='w-[80%] flex flex-col gap-y-5 mt-10'>

              {info.watchproviders && 
                info.watchproviders.flatrate &&
                
                <div className='flex gap-x-10 items-center text-white'>

                  <h1>Available on Platform</h1>

                  {info.watchproviders.flatrate.map((w,i) => (
                    <img 
                      title={w.provider_name}
                      key={i}
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                      alt=""
                      className='w-[5vh] h-[5vh] object-cover rounded-md '
                    />
                  ))}

                </div>
              }



              {info.watchproviders && 
                info.watchproviders.rent &&
                
                <div className='flex gap-x-10 items-center text-white'>

                  <h1>Available on Rent</h1>

                  {info.watchproviders.rent.map((w,i) => (
                    <img 
                      title={w.provider_name}
                      key={i}
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                      alt=""
                      className='w-[5vh] h-[5vh] object-cover rounded-md '
                    />
                  ))}

                </div>
              }


              {info.watchproviders && 
                info.watchproviders.buy &&
                
                <div className='flex gap-x-10 items-center text-white'>

                  <h1>Available to Buy</h1>

                  {info.watchproviders.buy.map((w,i) => (
                    <img 
                      title={w.provider_name}
                      key={i}
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                      alt=""
                      className='w-[5vh] h-[5vh] object-cover rounded-md '
                    />
                  ))}

                </div>
              }


       </div>

      
      {/* Part - 4 */}
      
      <hr className='mt-5 border-none h-[2px] bg-zinc-500' />
      <h1 className='text-3xl font-bold mt-5 text-white'>
          Seasons
      </h1>

      <div className='flex gap-[2rem] w-[100%] overflow-x-auto mt-5 p-5'>

        {info.detail.seasons.length > 0 ? info.detail.seasons.map((s,i) => (

          <div className='min-w-[13vw]' key={i}>

              <img src={
                s.poster_path ?
                `https://image.tmdb.org/t/p/original/${s.poster_path}`
                :
                noimage
                } 
              alt="" 
              className='h-[40vh] w-[30vw] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]' 
            />
                    
            <h1 className='text-2xl text-zinc-400 mt-3 font-semibold'>
              {s.name || s.title || s.original_name || s.original_title}
            </h1>

          </div>
        ))
        :
          <h1 className='text-3xl text-white mt-5 font-black'>
            Nothing to show
          </h1>
        }

      </div>

      
      {/* Part - 5 */}
      
      <hr className='mt-5 border-none h-[2px] bg-zinc-500' />
      <h1 className='text-3xl font-bold mt-5 text-white'>
          Recommendations & Similar Stuff
      </h1>

      <HorizontailCards 

        data={info.recommendations.length > 0 ? 
          info.recommendations 
          : 
          info.similar}

        />

      <Outlet/>
      
    </div>
  )

  :

  <Loading/>

}

export default TvDetails