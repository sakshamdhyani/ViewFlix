import axios from "axios";

const instance = axios.create({
    
    baseURL : "https://api.themoviedb.org/3",

    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2NlODg4ZGI5ODkzNDA0YmViMTVhZGYxN2VmZTY1MiIsInN1YiI6IjY0ZGI2Mjg1NzcxOWQ3MDBjODYwNWIzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tEFMctIDRrOtSLTMOMHwQcoQIwMQjnIerWivOFy8d5I'
      }

})

export default instance;