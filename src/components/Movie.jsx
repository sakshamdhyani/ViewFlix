import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';
import Dropdown from './templates/Dropdown';
import Topnav from './templates/Topnav';


const Movie = () => {
    document.title = "ViewFlix | Movies"


    const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing");
    const [movie, setmovie] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);


    const GetMovie = async () => {

        try {
            const {data} = await axios.get(`/movie/${category}?page=${page}`);
    
            if(data.results.length > 0){
              setmovie((prevState) => [...prevState , ...data.results]);
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
    
        if(movie.length === 0){
          GetMovie();
        }
        else{
          setpage(1);
          setmovie([]);
          GetMovie();
        }
    
      }
    
    
      useEffect(() => {
        
        refreshHandler();
    
      }, [category]);

  


      return movie.length > 0 ?  (

        <div className=' w-screen h-screen'>
    
          <div className='px-[3%] w-full flex items-center justify-between'> 
    
                <h1 className='text-2xl font-semibold text-zinc-400'>
                  <i onClick={() => navigate(-1)} className='cursor-pointer hover:text-[#6556CD] ri-arrow-left-line'></i>  {" "}
                  Movies <small className='text-sm text-zinc-600 ml-2'>({category})</small>
                </h1>
    
    
                <div className='flex items-center w-[80%]'>
                  <Topnav/>
    
                  <Dropdown 
                    title="Category" 
                    options={["popular" , "top_rated" , "upcoming" , "now_playing"]} 
                    func = {(e) => setcategory(e.target.value)}
                    />
    
                </div>
    
          </div>
    
          <InfiniteScroll
            dataLength={movie.length}
            next={GetMovie}
            hasMore={hasMore}
            loader={<h1 className='text-white text-center'>Loading..</h1>}
          >
            
            <Cards data={movie} title="movie" />
          </InfiniteScroll>
    
          
          
        </div>
      )
    
      :
    
      <Loading/>
    
}

export default Movie