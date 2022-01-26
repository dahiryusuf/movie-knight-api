
import Carousel from 'react-bootstrap/Carousel'
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";



export const Carousal = (props) => {


  const trending = props.movie.slice(7, 10).map((item) => {   
 
    return (
  
      <Carousel.Item>
         
      <img 
       
        className="d-block w-100"
        style={{ height: 600 }}
        src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
        alt="First slide"
      />
    </Carousel.Item>
    );
  });
  

  return (
    <Carousel>
{trending}
</Carousel>

  )
}
