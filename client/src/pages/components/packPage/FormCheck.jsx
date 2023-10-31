import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios";

function FromCheck({ price, city, packNumber, animals, rental, adultsNumber, childrenNumber, packageId }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [animal, setAnimal] = useState(false);
  const [rentalService, setRentalService] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // User data
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // maximum number of adults and children
  const maxAdult = [];
  const maxChildren = [];
  for (let i = 0; i <= adultsNumber; i++) {
    maxAdult.push(
      <option key={i} value={i}>
        {i}
      </option>
    )
  }
  for (let i = 0; i <= childrenNumber; i++) {
    maxChildren.push(
      <option key={i} value={i}>
        {i}
      </option>
    )
  }
  // nights
  const calculateNights = (checkIn, checkOut) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffDays = Math.round(Math.abs((checkOutDate - checkInDate) / oneDay));
    return diffDays;
  };
  // submitting your order and navigating to the summary and payment page
  const handleClick = (e) => {
    e.preventDefault()
    if (auth.user) {
      const nights = calculateNights(checkIn, checkOut);
      const totalPrice = price * nights;
      const orderData = {
        user: auth.user._id,
        package: packageId,
        price: totalPrice,
        checkIn: checkIn,
        checkOut: checkOut,
        animals: animal,
        rental: rentalService,
        adults: adults,
        children: children,
      };
      // sending data for the order
      axios.post('https://pat-travel-api.vercel.app/api/order', orderData, { withCredentials: true })
        .then(() => {
          navigate("/reserve", {
            state: { orderData },
          });
        })
        .catch((error) => {
          if (error.response) {
            console.error('Error:', error.response.data);
            setErrorMessage("fill in all fields");
          }
        });
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="p-3 mt-5 border " style={{ width: '35rem' }}>
      <Form>
        <Row className="mb-3">
          <Row>
            <p className='text'>{price}€ night<span style={{ fontSize: "15px" }}> (structure)</span></p>
          </Row>
          <Form.Group as={Col}>
            <Form.Label>Destination</Form.Label>
            <Form.Control type="text" className='text-center' placeholder={city} readOnly />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Package number</Form.Label>
            <Form.Control type="text" className='text-center' placeholder={packNumber} readOnly />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className='mt-3'>
            <Form.Label>Check-In</Form.Label>
            <Form.Control type='date' onChange={(e) => setCheckIn(e.target.value)} />
          </Form.Group>
          <Form.Group as={Col} className='mt-3'>
            <Form.Label>Check-Out</Form.Label>
            <Form.Control type='date' onChange={(e) => setCheckOut(e.target.value)} />
          </Form.Group>
        </Row>
        <Row className='flex justify-content-center'>
          {animals && (<Col xs={3}>
            <Form.Group className='mt-3 ' >
              <Form.Check type="checkbox" label="Animals"
                checked={animal}
                onChange={(e) => setAnimal(e.target.checked)} />
            </Form.Group>
          </Col>)}
        </Row>
        <Row className='flex justify-content-center'>
          {rental && (<Col xs={3}>
            <Form.Group className='mt-3 ' >
              <Form.Check
                type="checkbox"
                label="Rental"
                checked={rentalService}
                onChange={(e) => setRentalService(e.target.checked)}
              />
            </Form.Group>
          </Col>)}
        </Row>
        <Row>
          <Form.Group className='mt-3'>
            <Form.Label>Adults:</Form.Label>
            <Form.Select value={adults} onChange={(e) => setAdults(parseInt(e.target.value))}>
              {maxAdult}
            </Form.Select>
          </Form.Group>
          {childrenNumber > 0 && (
            <Form.Group className='mt-3'>
              <Form.Label>Children(0-16):</Form.Label>
              <Form.Select value={children} onChange={(e) => setChildren(parseInt(e.target.value))}>
                {maxChildren}
              </Form.Select>
            </Form.Group>
          )}
        </Row>
        <Button variant="primary" type="submit" className='mt-3' onClick={handleClick}>
          Reserve
        </Button>
        {errorMessage && <p className="text-danger  mt-3">{errorMessage}</p>}
      </Form>
    </div>
  );
}
FromCheck.propTypes = {
  price: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  packNumber: PropTypes.string.isRequired,
  animals: PropTypes.bool,
  rental: PropTypes.bool,
  adultsNumber: PropTypes.number,
  childrenNumber: PropTypes.number,
  packageId: PropTypes.string
};

export default FromCheck;