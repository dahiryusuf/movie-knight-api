import axios from 'axios'
import { useEffect, useState } from 'react';
import './App.css';
import { Link, Routes, Route} from "react-router-dom"
import NewWatchParty from './components/NewWatchParty';
import { Header }  from './components/Header';
import {Carousal} from './components/Carousal';
import GenreTabs from './components/GenreTabs';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Signin from './components/Signin';
import WatchList from './components/WatchList';
import PickMovie from './components/PickMovie';
import MoviePicker from './components/MoviePicker';
import WatchParties from './components/WatchParties';
import { Search } from './components/Search';
import { GlobalProvider } from './context/GlobalState';
import { useCookies } from 'react-cookie';
// import useGenre from './hooks/useGenre';

import 'bootstrap/dist/css/bootstrap.min.css';
import LinkPage from './components/LinkPage';


function App() {
  const [movie, setMovie] = useState([]);
  const [movies, setMovies] = useState([]);
  const [action, setAction] = useState([]);
  const [adventure, setAdventure] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [crime, setCrime] = useState([]);
  const [documentary, setDocumentary] = useState([]);
  const [drama, setDrama] = useState([]);
  const [family, setFamily] = useState([]);
  const [fantasy, setFantasy] = useState([]);
  const [history, setHistory] = useState([]);
  const [mystery, setMystery] = useState([]);
  const [romance, setRomance] = useState([]);
  const [thriller, setThriller] = useState([]);
  const [cookies, setCookie] = useCookies(['user']);
  const ids = cookies.Name

  let array = [];

  useEffect(() => {
    axios.get(`http://localhost:3001/api/users/watchlist/${ids}`).then((res,req) => {
    for(let i of res.data) { 
      // console.log(i.movie_id);
    axios.get(`https://api.themoviedb.org/3/movie/${i.movie_id}?api_key=79ea73dd8ffddae85c10ba47e73e9093&language=en-US`).then((res,req) => {
    //  console.log(res.data) 
    array.push(res.data)
  })
}
setWatchlist(array)
}) 
  }, [])

  

  useEffect(() => {
    axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=79ea73dd8ffddae85c10ba47e73e9093").then((res,req) => {

    setMovie(res.data.results)})
  }, [])

  useEffect(() => {
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key=79ea73dd8ffddae85c10ba47e73e9093&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&with_watch_monetization_types=flatrate").then((res,req) => {
    setAction(res.data.results)})
  }, [])

  useEffect(() => {
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key=79ea73dd8ffddae85c10ba47e73e9093&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=12&with_watch_monetization_types=flatrate").then((res,req) => {
    setAdventure(res.data.results)})
  }, [])

  return (
    <div className="App">
      <GlobalProvider>
          <Routes>
            <Route path = "/newparty" element = {<div><Header/> <NewWatchParty></NewWatchParty></div>} >
            </Route>
            <Route path = "/home" element = {
              <div>
           <div>
    <Header/>
     <Carousal movie = {movie}></Carousal>
     <Search/>
       <GenreTabs movie = {movie} action ={action} adventure ={adventure} ></GenreTabs>
    </div>
);
         </div>} >
            </Route>
            <Route path = "/" element = { 
             <Landing></Landing> }
             ></Route>
             <Route path = "/signup" element = { 
             <Signup></Signup> }
             ></Route>
                 <Route path = "/link/:id" element = { 
             <LinkPage></LinkPage> }
             ></Route>
             <Route path = "/signin" element = { 
             <Signin></Signin> }
             ></Route>
             <Route path = "/watchlist" element = { 
             <WatchList movie = {movie}></WatchList> }
             ></Route>
              <Route path = "/pickmovie" element = { <>
            <PickMovie ></PickMovie>
            <GenreTabs movie = {movie} action ={action} adventure ={adventure} watchlist = {watchlist} page = {true} ></GenreTabs>
            </> }
             ></Route>
                  <Route path = "/moviepicker/:id" element = { 
            <MoviePicker movie = {movie} action ={action}></MoviePicker> }
            ></Route>
              <Route path = "/watchparties" element = { 
             <WatchParties ></WatchParties> }
             ></Route>
          </Routes>
          </GlobalProvider>
      </div>
  );
// import MovieList from './components/MovieList';
  }
export default App;