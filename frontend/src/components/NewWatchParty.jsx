import React from 'react'
import { useState,useContext,useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../NewWatchParty.css'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { GlobalContext } from "../context/GlobalState";
import { Link, useNavigate} from "react-router-dom"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MovieCard } from './MovieCard';
import Calendar from 'react-calendar';
import { padding } from '@mui/system';
import { DatePicker } from 'react-rainbow-components';
import Spinner from 'react-bootstrap/Spinner'
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';
import { withTheme } from '@emotion/react';
import { Textarea } from 'react-rainbow-components';

export default function NewWatchParty() {
  const generateRandomString = () => {
    let ranId = (Math.random() + 1).toString(36).substring(7);
    return ranId;
  };
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [value, onChange] = useState(new Date());
  const [link, setLink] = useState(generateRandomString());
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [message, setMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [cookies, setCookie] = useCookies(['user']);
  const [values, setValues] = useState('');
  const [loading, setLoading] = useState(true);
  const handleChange = (event) => {
    setValues(event.target.value);
  };
  const {
    watched,
    clearWatched
  } = useContext(GlobalContext);

  const isStepOptional = (step) => {
    return step === 10;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const containerStyles = {
    maxWidth: 400
};
const containerStyle = {
  maxWidth: 700,
};
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


const steps = ['Select Movies', 'Pick your date', 'Create your watch party'];

  let array =[]
  useEffect(() => {
    for(let i of watched) {
    axios.get(`https://api.themoviedb.org/3/movie/${i}?api_key=79ea73dd8ffddae85c10ba47e73e9093&language=en-US`).then((res,req) => {
   
    array.push(res.data)
  })
    }
    setMovies(array)
  }, [watched])

 const handleClick = (event) => {
  event.preventDefault();

 }

 const handleShow = (event) => {
  event.preventDefault();
  
 }


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(message, value)
    // clearWatched()
 let ids = 0
 setLoading(false);
 setTimeout(() => {
   setLoading(true);
 }, 3000);
 setTimeout(() => {
   setModalShow(true)
 }, 2700);

 
    
    axios.post('http://localhost:3001/api/newparty', {
      link,
      userId: cookies.Name,
      message: values,
      date: value
    })
    .then(function (response) {
      console.log(response);
      ids = response.data.id;
      for(let i of watched){
        axios.post(`http://localhost:3001/api/users/movielist/${ids}`, {
          movie_id: i
        })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    })
    .catch(function (error) {
      console.log(error);
    });
    clearWatched()
}
const parsedMovies = movies.map((movie,index) => <> <MovieCard key={index}
poster={movie.poster_path} 
 title={movie.title} 
 vote_average = {movie.vote_average}
 release_date = {movie.release_date}
 overview = {movie.overview}
 id = {movie.id}
 whole = {movie}
 pic = {true} 
 /></>);

  return (
    <div >
        <h1> Create A New Watch Party</h1>
     
 
    <Box sx={{padding: '40px',width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {activeStep === 0 && ( <><br/> {watched.length < 10 && (<h2> Pick the movies for your watch party</h2>)} {watched.length >= 10 && (<><h4>You picked:</h4> <div className="movie-grid">
    {parsedMovies}
    </div> </>)} <br/> <br/> {watched.length < 10 ? <Link  className="btn btn-primary" to= {`/pickmovie`} > Pick movies </Link>  : <Link  className="btn btn-primary" to= {`/pickmovie`} > Edit selected movies </Link> }<br/> </>)}
    {activeStep === 1 && ( <><br/> <h2> Pick the date and add a message to your watch party</h2>   <br/> <div style = {{ display: 'flex', flexDirection: 'row'}}>    <div
        className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
        style={containerStyles}
    >   <DatePicker
            value={value}
            minDate={new Date(2021, 0, 4)}
            label="Watch Party Date"
            onChange={onChange}
        /> 
        </div>   
    <div style = {{ paddingLeft: '250px'}}>
    <div
        className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
        style={containerStyle}
    >
          <Textarea
        id="example-textarea-1"
        label="Add your message"
        rows={4}
        placeholder="Bring your own popcorn"
        value={values}
        onChange={handleChange}
    /></div></div></div></>)}
         {activeStep === 2 && ( <><h2> Your all done click below to generate your link </h2> <br/> <br/> {loading ? <Button variant="contained" onClick={handleSubmit} size="lg" > 
  Generate Link </Button> : <Button variant="contained" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button>}  <MyVerticallyCenteredModal
        link = {link}
        show={modalShow}
        onHide={() => navigate("/watchparties")}
      />  </>)}
     
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit"  onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext} size = 'lg'>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
    </div>
  )
}
