import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./components/Header";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Delete from "./components/DeleteButtonAccount";

function Settings() {
  const [show, setShow] = useState(false);
  const auth = useSelector((state) => state.auth)
  const [userData, setUserData] = useState({
    firstName: auth.user.firstName,
    lastName: auth.user.lastName,
    accountName: auth.user.accountName,
    address: auth.user.address,
    city: auth.user.city,
    zipCode: auth.user.zipCode,
    email: auth.user.email,
    password: auth.user.password
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setUserData({
      ...userData,
      [name]: newValue
    });
  }
  // edit user data
  const patchData = (e) => {
    e.preventDefault();
    axios.patch(`https://pat-travel-api.vercel.app/api/user/${auth.user._id}`, userData)
      .then((response) => {
        setUserData(response.data);
        setShow(true);
      })
      .catch((error) => {
        console.error('Error saving changes', error);
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
        <h2 className="my-5">Settings</h2>
      </Row>
      <Row className="flex justify-content-center">
        <Col lg={4}>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                First Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Last Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Account Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="accountName"
                  value={userData.accountName}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Address
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="address"
                  value={userData.address}
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
                  value={userData.city}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Zip Code
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="zipCode"
                  value={userData.zipCode}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"}
                  autoComplete="email" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"}
                  autoComplete="current-password"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-5">
              <Col sm={{ span: 10, offset: 2 }}>
                <Alert show={show} variant="primary">
                  <Alert.Heading>Success</Alert.Heading>
                  <p>
                    Account ready for editing. You will be redirected to the Login page to complete the update.
                  </p>
                  <hr />
                  <div className="d-flex justify-content-end">
                    <Link to="/login">
                      <Button variant="outline-success">
                        Login Page
                      </Button>
                    </Link>
                  </div>
                </Alert>
                <Button type="submit" onClick={patchData}>Update</Button>
              </Col>
              <Col className="my-5" sm={{ span: 10, offset: 2 }}>
                <Delete /></Col>
            </Form.Group>
          </Form>

        </Col>
      </Row>
    </>
  )
}

export default Settings;