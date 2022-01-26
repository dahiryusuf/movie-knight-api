import axios from 'axios'
import { useEffect, useState } from 'react';


const [movie, setMovie] = useState({});

  useEffect(() => {
    axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=79ea73dd8ffddae85c10ba47e73e9093").then((res,req) => {
     console.log(res.data) 
    setMovie(res.data)})
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1> Test Movie</h1>
         </header>
         <h1>{movie.title}</h1>
         <img src= {`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Die Hard"/>
         <h3>{movie.overview}</h3>
      </div>
  );
export default App;