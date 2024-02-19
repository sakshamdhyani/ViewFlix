import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';
import Dropdown from './templates/Dropdown';
import Topnav from './templates/Topnav';


const People = () => {

    document.title = "ViewFlix | People"


    const navigate = useNavigate();
    const [category, setcategory] = useState("popular");
    const [person, settv] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);


    const GetPerson = async () => {

        try {
            const {data} = await axios.get(`/person/${category}?page=${page}`);
    
            if(data.results.length > 0){
              settv((prevState) => [...prevState , ...data.results]);
              setpage(page+1);
            }
            else{
              sethasMore(false);
            }
    
        } 
        catch (error) {
            console.log("Error : " , error)
        }
    
      }
    
    
      const refreshHandler = () => {
    
        if(person.length === 0){
          GetPerson();
        }
        else{
          setpage(1);
          settv([]);
          GetPerson();
        }
    
      }
    
    
      useEffect(() => {
        
        refreshHandler();
    
      }, [category]);

  


      return person.length > 0 ?  (

        <div className=' w-screen h-screen'>
    
          <div className='px-[3%] w-full flex items-center justify-between'> 
    
                <h1 className='text-2xl font-semibold text-zinc-400'>
                  <i onClick={() => navigate(-1)} className='cursor-pointer hover:text-[#6556CD] ri-arrow-left-line'></i>  {" "}
                   People 
                </h1>
    
    
                <div className='flex items-center w-[80%]'>
                  <Topnav/>
                </div>
    
          </div>
    
          <InfiniteScroll
            dataLength={person.length}
            next={GetPerson}
            hasMore={hasMore}
            loader={<h1 className='text-white text-center'>Loading..</h1>}
          >
            
            <Cards data={person} title="people" />
          </InfiniteScroll>
    
          
          
        </div>
      )
    
      :
    
      <Loading/>
    
}

export default People