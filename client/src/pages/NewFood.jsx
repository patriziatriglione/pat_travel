import Header from "./components/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';


function NewFood() {
  const [show, setShow] = useState(false);
  const [newFood, setNewFood] = useState({
    title: "",
    city: "",
    nation: "",
    image: "",
    text: "",
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewFood({
      ...newFood,
      [name]: newValue
    });
  }
  // add new local food
  const addFood = (e) => {
    e.preventDefault();
    const newFoodData = {
      title: newFood.title,
      city: newFood.city,
      nation: newFood.nation,
      image: newFood.image,
      text: newFood.text,
    };
    setShow(true)
    axios.post(`https://pat-travel-api.vercel.app/api/food`, newFoodData, { withCredentials: true })
      .then((response) => {
        console.log('Food added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding food:', error);
      });
  };
  // theme
  const currentTheme = useSelector((state) => state.theme);
  return (
    <>
      <Row>
        <Header />
      </Row>
      <Row className="my-5">
        <h2 className="my-5">Add a new Food</h2>
      </Row>
      <Row className="flex justify-content-center">
        <Col lg={4}>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Name of the local dish
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="title"
                  value={newFood.title}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                City
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="city"
                  name="city"
                  value={newFood.city}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Nation
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="nation"
                  value={newFood.nation}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Image
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="image"
                  value={newFood.image}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Text
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="text"
                  value={newFood.text}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-5">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" onClick={addFood}>Add local dish</Button>
              </Col>
            </Form.Group>
          </Form>
          <Alert show={show} variant="primary">
            <Alert.Heading>Success</Alert.Heading>
            <p>
              Local dish inserted successfully
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShow(false)} variant="outline-success">
                Close me
              </Button>
            </div>
          </Alert>
        </Col>
      </Row>
    </>
  );
}

export default NewFood;