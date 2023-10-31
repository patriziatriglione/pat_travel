import Header from "./components/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

function NewActivity() {
  const [show, setShow] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: "",
    city: "",
    nation: "",
    image: "",
    price: "",
    text: "",
    hours: ""
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewActivity({
      ...newActivity,
      [name]: newValue
    });
  }
  // add new activity
  const addActivity = () => {
    const newActivityData = {
      title: newActivity.title,
      city: newActivity.city,
      nation: newActivity.nation,
      image: newActivity.image,
      price: newActivity.price,
      text: newActivity.text,
      hours: newActivity.hours
    };
    setShow(true)
    axios.post(`https://pat-travel-api.vercel.app/api/activity`, newActivityData, { withCredentials: true })
      .then((response) => {
        console.log('Activity added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding Activity:', error);
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
        <h2 className="my-5">Add a new Activity</h2>
      </Row>
      <Row className="flex justify-content-center">
        <Col lg={4}>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Name of the activity
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="title"
                  value={newActivity.title}
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
                  value={newActivity.city}
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
                  value={newActivity.nation}
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
                  value={newActivity.image}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Price
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="price"
                  value={newActivity.price}
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
                  value={newActivity.text}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Hours
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="hours"
                  value={newActivity.hours}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-5">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" onClick={addActivity}>Add Activity</Button>
              </Col>
            </Form.Group>
          </Form>
          <Alert show={show} variant="primary">
            <Alert.Heading>Success</Alert.Heading>
            <p>
              Activity inserted successfully
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

export default NewActivity;