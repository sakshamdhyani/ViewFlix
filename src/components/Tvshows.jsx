import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';
import Dropdown from './templates/Dropdown';
import Topnav from './templates/Topnav';


const Tvshows = () => {

    document.title = "ViewFlix | Tv Shows"


    const navigate = useNavigate();
    const [category, setcategory] = useState("airing_today");
    const [tv, settv] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);


    const GetTv = async () => {

        try {
            const {data} = await axios.get(`/tv/${category}?page=${page}`);
    
            if(data.results.length > 0){
              settv((prevState) => [...prevState , ...data.results]);
              setpage(page+1);
            }
            else{
              sethasMore(false);
            }
    
            console.log(data);
        } 
        catch (error) {
            console.log("Error : " , error)
        }
    
      }
    
    
      const refreshHandler = () => {
    
        if(tv.length === 0){
          GetTv();
        }
        else{
          setpage(1);
          settv([]);
          GetTv();
        }
    
      }
    
    
      useEffect(() => {
        
        refreshHandler();
    
      }, [category]);

  


      return tv.length > 0 ?  (

        <div className=' w-screen h-screen'>
    
          <div className='px-[3%] w-full flex items-center justify-between'> 
    
                <h1 className='text-2xl font-semibold text-zinc-400'>
                  <i onClick={() => navigate(-1)} className='cursor-pointer hover:text-[#6556CD] ri-arrow-left-line'></i>  {" "}
                  Tv Shows <small className='text-sm text-zinc-600 ml-2'>({category})</small>
                </h1>
    
    
                <div className='flex items-center w-[80%]'>
                  <Topnav/>
    
                  <Dropdown 
                    title="Category" 
                    options={["on_the_air" , "top_rated" , "popular" , "airing_today"]} 
                    func = {(e) => setcategory(e.target.value)}
                    />
    
                </div>
    
          </div>
    
          <InfiniteScroll
            dataLength={tv.length}
            next={GetTv}
            hasMore={hasMore}
            loader={<h1 className='text-white text-center'>Loading..</h1>}
          >
            
            <Cards data={tv} title="tv" />
          </InfiniteScroll>
    
          
          
        </div>
      )
    
      :
    
      <Loading/>
    
}

export default Tvshows