import React, { useState, useEffect, useRef } from 'react'
// import TinderCard from '../react-tinder-card/index'
import axios from 'axios'
import TinderCard from 'react-tinder-card'
import { useParams} from "react-router-dom"
import '../MoviePicker.css'

export default function MoviePicker() {
  const [ip, setIP] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState();
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState();
  const movi = [];

  let { id } = useParams();
  //creating function to load ip address from the API
  const getinfo = () => {
    axios.get('https://geolocation-db.com/json/').then((res,req) => {
    // console.log(res.data);
    setIP(res.data.IPv4)
  })
  }
  let urls = 0
  console.log(id);
  useEffect(() => {
    axios.get(`http://localhost:3001/api/users/moviepicker/${id}`).then((res,req) => {
    console.log("data",res.data[0]);
    urls = res.data[0].id
    setIndex(res.data[0].id)
    axios.get(`http://localhost:3001/api/users/movielist/${urls}`).then((res,req) => {
    for(let i of res.data) {
    axios.get(`https://api.themoviedb.org/3/movie/${i.movie_id}?api_key=79ea73dd8ffddae85c10ba47e73e9093&language=en-US`).then((res,req) => {
    //  console.log(res.data) 
    movi.push(res.data)
  })
  
}
setMovies(movi)
})
})
  }, [])
  // const getData = () => {
  //   console.log("i",index);
  //   axios.get(`http://localhost:3001/api/users/watchparties/${index}`).then((res,req) => {
  //   // console.log(res.data);
  //   setMessage(res.data)
  //   setDate(res.data.date)
  // })
  // }
  useEffect( () => {
    //passing getData method to the lifecycle method
    // getData()
    getinfo()
    
  }, [])
  console.log("message",message);
  const characters = movies
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    if(direction === "right"){
      axios.post(`http://localhost:3001/api/users/moviepicks/${index}`, {
        movie_id: nameToDelete
      })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div className = 'root'>
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>Movie Picker</h1>
      <h2>Swipe right if you want to watch the movie</h2>
      <h2>Swipe left if you don't</h2>
      <br/>
      <div className='cardContainers'>
        {characters.map((character) =>
          <TinderCard className='swipe' key={character.id} onSwipe={(dir) => swiped(dir, character.id)} onCardLeftScreen={() => outOfFrame(character.original_title)}>
            <div style={{backgroundImage: `url('https://image.tmdb.org/t/p/w200${character.poster_path}')`}} className='cards'>
            <h3 className = 'h3'>{character.original_title}</h3>
            </div>
          </TinderCard>
          
        )}
      </div>
    
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
    </div>
  )
}
  
