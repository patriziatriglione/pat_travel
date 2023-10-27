import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';
import Photo1 from "./../../images/photo1_signIn.png";
import Photo2 from "./../../images/photo2_signIn.png";
import Photo3 from "./../../images/photo3_signIn.png";

function CarouselSignIn() {
  return (
    <MDBCarousel fade >
      <MDBCarouselItem
        className=' w-100 d-block'
        itemId={1}
        src={Photo1}
        alt='...'
      >
        <h4>Hotels, B&Bs, rentals, means of transport and advice for your trip, putting our environment first</h4>
      </MDBCarouselItem>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src={Photo2}
        alt='...'
      >
        <h4>We focus on structures able to promote their local products, which use sustainable resources and put the well-being of the customers at the centre</h4>
      </MDBCarouselItem>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src={Photo3}
        alt='...'
      >
        <h4>Our tips will help you visit the most beautiful cities in the world while emitting as little CO2 as possible</h4>
      </MDBCarouselItem>
    </MDBCarousel>
  );
}

export default CarouselSignIn;