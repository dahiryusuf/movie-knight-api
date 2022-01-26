import axios from "axios";
import React from "react";
import { useContext,useState } from "react";
import { GlobalContext } from "../context/GlobalState";

// const addMovieToWatched = function(movie_id, user_id) {
//   axios.post(`http://localhost:3001/api/users/watchlist/${user_id}`, {
//     movie_id: movie_id}) 
//      .then(function (response) {
//      console.log(response);
//    })
//    .catch(function (error) {
//      console.log(error);
//    });
//  }




export const MovieControls = (props) => {


  const {
    removeFromWatched,
    addMovieToWatched,
    clearWatched,
    watched
  } = useContext(GlobalContext);

  const handleRemove = (event) => {
    event.preventDefault();
    removeFromWatched(props.movie)
    window.location.reload(true)
  }

return (
    <div className="inner-card-controls">
        <button className="btn btn-main2" onClick={handleRemove}>
           Remove Movie
          </button>
    </div>
  )};