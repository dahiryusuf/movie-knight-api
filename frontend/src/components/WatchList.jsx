import {React, useEffect, useState} from "react";
import { MovieCard } from "./MovieCardWatchlist";
import { Header } from "./Header";
import axios from "axios";
import { useCookies } from 'react-cookie';

export default function WatchList(props) {
  const [watchlist, setWatchlist] = useState([]);
  const [cookies, setCookie] = useCookies(['user']);
  const id = cookies.Name

  useEffect(() => {
    axios.get(`http://localhost:3001/api/users/watchlist/${id}`).then((res,req) => {
    setWatchlist(res.data)
  })
  }, [])

 


  const parsedMovies = watchlist.map(movie => <MovieCard key={movie.id}
   poster={movie.poster_path} 
    title={movie.title} 
    id = {movie.id}
    />);
  return (

<div className="movie-page">
<Header /> 
<div className="container">
  <div className="header">
    <h1 className="heading">Dahir's Watchlist</h1>

  </div>
  
    <div className="movie-grid">
    {parsedMovies}
    </div>
    

</div>
</div>)
}
