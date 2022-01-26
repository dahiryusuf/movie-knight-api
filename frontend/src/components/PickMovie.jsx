import React from "react";
import { useContext,useState,useEffect } from "react";
import GenreTabs from "./GenreTabs";
import "react-tabs/style/react-tabs.css";
import { MovieCard } from "./MovieCard";
import ProgressBar from 'react-bootstrap/ProgressBar'
import { MovieControls } from "./MovieControls";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Modal,ListGroup} from 'react-bootstrap';
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import '../NewWatchParty.css'

export default function PickMovie(props) {
  const [show, setShow]=useState(false);
  const [movies, setMovies] = useState([]);
  const [m, setM] = useState([]);

  const handleShow=()=>setShow(true);
  const handleClose=()=>setShow(false);
  const {
    watched,
    clearWatched,
    removeFromWatched
  } = useContext(GlobalContext);
  
    let array = []
    let now = 0
    let index = 10 - watched.length
    let check = true
    if(watched.length >= 10){
      check = false
      now = 100
    }
    else{
      now = watched.length * 10;
    }
    
    useEffect(() => {
      for(let i of watched) {
      axios.get(`https://api.themoviedb.org/3/movie/${i}?api_key=79ea73dd8ffddae85c10ba47e73e9093&language=en-US`).then((res,req) => {
     
      array.push(res.data)
    })
      }
      setMovies(array)
    }, [watched])
  
    setTimeout(() => {
      setM(1)
     }, 200);

    const parsedMovies = movies.map((movie,index) => <> <MovieCard key={index}
      poster={movie.poster_path} 
       title={movie.title} 
       vote_average = {movie.vote_average}
       release_date = {movie.release_date}
       overview = {movie.overview}
       id = {movie.id}
       page = {props.page}
       pick = {true}
       pic = {true}
       whole = {movie} 
       /></>);
      
  return (
<>

<div className = 'carded'>
<Card>
  <Card.Header as="h5">MovieKnight</Card.Header>
  <Card.Body>
    <Card.Title>Pick Your Movies</Card.Title>
    <Card.Text>
      You have {index} movies to go
    </Card.Text>
    <ProgressBar  animated now={now} label={`${now}%`} />
    <br/>
    <Button variant="primary" href="/newparty" size="lg" disabled = {check}>
    Done
  </Button>{' '}
  <Button variant="primary" onClick={handleShow} size="lg" >
   Picked Movies
  </Button>{' '}
  <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Picked Movies</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {parsedMovies}
        </Offcanvas.Body>
      </Offcanvas>
  </Card.Body>

</Card>
</div>
  </>
);
}