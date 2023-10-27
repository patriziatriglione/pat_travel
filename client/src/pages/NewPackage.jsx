import Header from "./components/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import ToInclude from "./components/toInludeForm";
import InputWithList from "./components/InputWithList";

function NewPackage() {
  const [toIncludeList, setToIncludeList] = useState([]);
  const [crazyFor, setCrazyFor] = useState([]);
  const [newCrazyFor, setNewCrazyFor] = useState('');
  const [image, setImage] = useState([]);
  const [newImage, setNewImage] = useState("");
  const [icon, setIcon] = useState([]);
  const [newIcon, setNewIcon] = useState("");
  const [show, setShow] = useState(false);
  const [newPackage, setNewPackage] = useState({
    city: "",
    nation: "",
    crazyFor: [],
    packageNumber: "",
    image: [],
    icon: [],
    rental: false,
    toInclude: []
  });
  // update toInclude
  const handleToIncludeUpdate = (toIncludeData) => {
    setToIncludeList([...toIncludeList, ...toIncludeData]);
  }
  // add more items for crazyFor
  const addCrazyFor = () => {
    if (newCrazyFor.trim() !== '') {
      setCrazyFor([...crazyFor, newCrazyFor]);
      setNewCrazyFor('');
    }
  };
  // add more items for Image
  const addImage = () => {
    if (newImage.trim() !== '') {
      setImage([...image, newImage]);
      setNewImage('');
    }
  };
  // add more items for Icon
  const addIcon = () => {
    if (newIcon.trim() !== '') {
      setIcon([...icon, newIcon]);
      setNewIcon('');
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewPackage({
      ...newPackage,
      [name]: newValue
    });
  }
  // add new Package
  const addPackage = () => {
    const toIncludeData = [...toIncludeList];
    setToIncludeList([]);
    const newPackageData = {
      city: newPackage.city,
      nation: newPackage.nation,
      crazyFor: crazyFor,
      packageNumber: newPackage.packageNumber,
      image: image,
      icon: icon,
      rental: newPackage.rental,
      toInclude: toIncludeData,
    };
    setShow(true)
    axios.post("/api/package", newPackageData)
      .then((response) => {
        console.log('Package added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding package:', error);
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
        <h2 className="my-5">Add a new package</h2>
      </Row>
      <Row className="flex justify-content-center">
        <Col lg={4}>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                City
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="city"
                  name="city"
                  value={newPackage.city}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Nation
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="nation"
                  value={newPackage.nation}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Package Number
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="packageNumber"
                  value={newPackage.packageNumber}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Image (3):
              </Form.Label>
              <Col sm={10}>
                <InputWithList
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  onAdd={addImage}
                  items={image}
                  placeholder="Url Image"
                  label="Url Image"
                  currentTheme={currentTheme}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label>
                To Include <br /> (first name of the structure ( description and location will be added later with the insertion of the structure), <br />
                then any rental with price and description and followed by the rest of the services with prices and description)
              </Form.Label>
              <ToInclude onUpdateToInclude={handleToIncludeUpdate} />
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Crazy For (6):
              </Form.Label>
              <Col sm={10}>
                <InputWithList
                  value={newCrazyFor}
                  onChange={(e) => setNewCrazyFor(e.target.value)}
                  onAdd={addCrazyFor}
                  items={crazyFor}
                  placeholder="Crazy For"
                  label="Crazy For"
                  currentTheme={currentTheme}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Icon (respects the CrazyFor element order):
              </Form.Label>
              <Col sm={10}>
                <InputWithList
                  value={newIcon}
                  onChange={(e) => setNewIcon(e.target.value)}
                  onAdd={addIcon}
                  items={icon}
                  placeholder=" Url Icon"
                  label="Url Icon"
                  currentTheme={currentTheme}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3 flex justify-content-center" as={Row}>
              <Col xs={3}>
                <Form.Check type="checkbox"
                  name="rental"
                  value={newPackage.rental}
                  onChange={handleChange}
                  label="Rental" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-5">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" onClick={addPackage}>Add Package</Button>
              </Col>
              <Alert show={show} variant="primary" className="mt-3">
                <Alert.Heading>Success</Alert.Heading>
                <p>
                  Package inserted successfully
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button onClick={() => setShow(false)} variant="outline-success">
                    Close me
                  </Button>
                </div>
              </Alert>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default NewPackage;
