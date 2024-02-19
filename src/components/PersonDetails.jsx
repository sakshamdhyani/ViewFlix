import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { asyncloadperson, removeperson } from '../store/actions/personActions';
import Loading from "../components/Loading";
import HorizontailCards from "../components/templates/HorizontalCards"
import Dropdown from './templates/Dropdown';


const PersonDetails = () => {

  
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {info} = useSelector((state) => state.person);
  const {pathname} = useLocation();

  const [category, setcategory] = useState("movie")


  useEffect(() => {

    dispatch(asyncloadperson(id));

    return () => {
      dispatch(removeperson(id));
    }
    
  },[id])

  return info ? (

    <div className='px-[10%] w-screen bg-[#1F1E24] h-[170vh]'>


      {/* Part - 1 */}
      <nav className='h-[10vh] items-center w-full text-zinc-100 flex gap-10 text-xl'>

        <Link  
          onClick={() => navigate(-1)}
          className='hover:text-[#6556CD] ri-arrow-left-line'
        ></Link>

      </nav>

      
      <div className='w-full flex '>
      {/* Part - 2 */}

        <div className='w-[20%]'>

          <img 
              className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover ]'
              src={`https://image.tmdb.org/t/p/original/${
                info.detail.profile_path
              }`} alt="" 
          />

          <hr className='mt-5 border-none h-[2px] bg-zinc-500' />

            {/* Social media */}
          <div className='text-2xl text-white flex gap-x-5 justify-between mt-2'>

            <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
              <i className='ri-earth-fill'></i>
            </a>

            <a target='_blank' href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
              <i className='ri-facebook-circle-fill'></i>
            </a>

            <a target='_blank' href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
              <i className='ri-instagram-fill'></i>
            </a>

            <a target='_blank' href={`https://www.twitter.com/${info.externalid.twitter_id}`}>
              <i className='ri-twitter-x-fill'></i>
            </a>

          </div>

          {/* Personal info */}
          <h1 className='text-2xl text-zinc-400 my-5 font-semibold'>
            Person Info
          </h1>

          <h1 className='text-lg text-zinc-400 my-5 font-semibold'>
            Known For 
          </h1>

          <h1 className=' text-zinc-400'>
            {info.detail.known_for_department }
          </h1>


          <h1 className='text-lg mt-3 text-zinc-400 font-semibold'>
            Gender 
          </h1>

          <h1 className=' text-zinc-400'>
            {info.detail.gender === 2 ? "Male" : "Female" }
          </h1>


          <h1 className='text-lg text-zinc-400 mt-3 font-semibold'>
            Birthday 
          </h1>

          <h1 className=' text-zinc-400'>
            {info.detail.birthday }
          </h1>


          <h1 className='text-lg text-zinc-400 mt-3 font-semibold'>
            Deathday 
          </h1>

          <h1 className=' text-zinc-400'>
            {info.detail.deathday ? info.detail.deathday : "Still Alive"  }
          </h1>

          <h1 className='text-lg text-zinc-400 mt-3 font-semibold'>
            Place of Birth 
          </h1>

          <h1 className=' text-zinc-400'>
            {info.detail.place_of_birth}
          </h1>

          <h1 className='text-lg text-zinc-400 mt-3 font-semibold'>
            Also Known As 
          </h1>

          <h1 className=' text-zinc-400'>
            {info.detail.also_known_as.join(", ") }
          </h1>
              
        </div>


        {/* Part 3 */}
        <div className='w-[80%] ml-[5%]'>

          <h1 className='text-6xl text-zinc-400 my-5 font-black'>
            {info.detail.name}
          </h1>

          <h1 className='text-xl text-zinc-400 my-5 font-semibold'>
            Biography
          </h1>

          <p className='text-zinc-400 mt-3'>
            {info.detail.biography}
          </p>
          
          <h1 className='text-xl mt-5 text-zinc-400  font-semibold'>
            Known For
          </h1>

          <HorizontailCards
            data={info.combinedCredits.cast}
          />

          <div className='w-full flex justify-between'>

            <h1 className='text-xl mt-5 text-zinc-400  font-semibold'>
              Acting
            </h1>

            <Dropdown 
              title="Category" 
              options={["tv" , "movie"]} 
              func={(e) => setcategory(e.target.value)} 
            />

          </div>

          <div className='w-full h-[50vh] overflow-x-hidden overflow-y-auto
          shadow-xl shadow-[rgba(255,255,255,.3)] mt-5 border-2 border-zinc-700
          p-5 list-disc text-zinc-400'>

              {info[category + "Credits"].cast.map((c,i) => (

                <li key={i} className='hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer'>

                  <Link to={`/${category}/details/${c.id}`}>
                    <span>
                      {" "}
                      {c.name || c.title || c.original_name || c.original_title}
                    </span>

                    <span className='block ml-5 mt-2'>
                      {c.character && 
                        `Character Name : ${c.character}`
                      }
                    </span>

                  </Link>
                
                </li>

              ))}


          </div>

        </div>

      </div>

    </div>

  )
  :
  <Loading/>
}

export default PersonDetails


        