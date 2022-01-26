import {React,useState, useEffect, useContext} from "react";
import {MovieControls} from "./MovieControls";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { GlobalContext } from "../context/GlobalState";

export const MovieCard = (props) => {
  const [show, setShow]=useState(false);
  const [cookies, setCookie] = useCookies(['user']);
  const id = cookies.Name






   const handleRemove = (event) => {
    event.preventDefault();
    const movie_id = props.id
    console.log(movie_id);
    axios.post(`http://localhost:3001/api/users/watchlist/delete`, {
      movie_id: movie_id
    })
    .then(function (response) {
      console.log(response);
      window.location.reload(true)
    })
    .catch(function (error) {
      console.log(error);
    });

  }



   
  return (
    <>
    <div className="movie-card" >
    <div className="overlay">

<img
  src={`https://image.tmdb.org/t/p/w200/${props.poster}`}
  alt={`${props.title} Poster`}
/>
<div className="inner-card-controls">
        <button className="btn btn-main2" onClick={handleRemove}>
           Remove 
          </button>
    </div>

{props.pick ? <MovieControls movie = {props.id} /> : <></>}
</div>
<img
        src={`https://image.tmdb.org/t/p/w200${props.poster}`}
        alt={`${props.title} Poster`}
      />
      
    </div>

     


   
    </>
  )};

