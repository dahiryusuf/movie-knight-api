import * as React from 'react';
import { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button} from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import axios from 'axios';





const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));







export default function WatchPartiesItem(props ) {
  const [expanded, setExpanded] = React.useState(false);
  const [image, setImage] = useState('');
  const [cookies, setCookie] = useCookies(['user']);
  const id = cookies.Name
useEffect(() => {
  setImage('https://github.com/dahiryusuf/final_project/blob/hufan/frontend/public/shutterstock_1074043505.jpg?raw=true')
}, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleRemove = (event) => {
    event.preventDefault();
    const movie_id = props.id

    axios.post(`http://localhost:3001/api/users/watchpartiess/delete`, {
      movie_id: movie_id
    })
    .then(function (response) {
      console.log(response.data);
      window.location.reload(true)
    })
    .catch(function (error) {
      console.log(error);
    });
  
  }
let topMovie = 0


  const handleSubmit = (event) => {
    event.preventDefault();
    const movie_id = props.id
  
    axios.get(`http://localhost:3001/api/users/moviepicks/${movie_id}`, {
      movie_id,
    
    })
    .then(function (response) {
   topMovie = response.data[0].movie_id;

   axios.get(`https://api.themoviedb.org/3/movie/${topMovie}?api_key=79ea73dd8ffddae85c10ba47e73e9093&language=en-US`).then((res,req) => { 

console.log(res.data.poster_path)
 
  const id = props.id
   const poster_path = `'https://image.tmdb.org/t/p/w200/${res.data.poster_path }'`
   console.log(poster_path)
  axios.post(`http://localhost:3001/api/users/watchparties/${id}` , {
    poster_path : poster_path
    
  }).then((res,req) => {
    console.log(res)
    window.location.reload(true)
 })
    })
    .catch(function (error) {
      console.log(error);
    });
  })
  
  
  }
 
  return (
  
    <Card  sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Dahirs Watch Party"
        subheader={props.party_date}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.poster_path}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.messages}
          <Button variant="primary" 
          type="button" 
          className="delete button"
          onClick={handleSubmit}
          // onClick={() => {
          //   const confirmBox = window.confirm(
          //     "You can only do this once. Are you sure all your guests have responded?"
          //   )
          //   if (confirmBox === true) {
          //     handleSubmit()
            
          //   
        // }
        //   }}
          >Generate Movie</Button>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="delete">
        <DeleteForeverIcon onClick={handleRemove} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Movies Selected</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
   

  )}
