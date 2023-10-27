import Header from "./components/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchPack } from "../features/packSlice"
import { useEffect } from "react";
import Alert from 'react-bootstrap/Alert';
import InputWithList from "./components/InputWithList";

function NewStructure() {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [show, setShow] = useState(false);
  const [newService, setNewService] = useState('');
  const [newStructure, setNewStructure] = useState({
    title: "",
    desc: "",
    service: [],
    maxPeople: "",
    price: "",
    children: "",
    animals: false,
    remoteWork: false,
    packageId: "",
  });
  const packages = useSelector((state) => state.pack.data);
  // id of the package in which the structure will be inserted
  useEffect(() => {
    dispatch(fetchPack(newStructure.packageId));
  }, [dispatch, newStructure.packageId, packages]);
  function handlePackageChange(e) {
    const packageId = e.target.value;
    setNewStructure({
      ...newStructure,
      packageId,
    });
  }
  // add Service
  const addService = () => {
    if (newService.trim() !== '') {
      setServices([...services, newService]);
      setNewService('');

    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewStructure({
      ...newStructure,
      [name]: newValue
    });
  }
  // add structure
  const addStructure = () => {
    const newHotelData = {
      title: newStructure.title,
      desc: newStructure.desc,
      service: services,
      maxPeople: newStructure.maxPeople,
      price: newStructure.price,
      animals: newStructure.animals,
      children: newStructure.children,
      remoteWork: newStructure.remoteWork,
      packageId: newStructure.packageId,
    };
    setShow(true)
    axios.post(`/api/structure/${newStructure.packageId}`, newHotelData)
      .then((response) => {
        console.log('Structure successfully added:', response.data);
      })
      .catch((error) => {
        console.error('Error adding structure:', error);
        // Gestisci l'errore in base alle tue esigenze.
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
        <h2 className="my-5">Add a new structure</h2>
      </Row>
      <Row className="flex justify-content-center">
        <Col lg={4}>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Type structure
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="title"
                  value={newStructure.title}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label column sm={2}>
                Description
              </Form.Label>
              <Col sm={10}>
                <Form.Control as="textarea"
                  name="desc"
                  value={newStructure.desc}
                  onChange={handleChange}
                  rows={3}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                MaxPeople
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="number"
                  name="maxPeople"
                  value={newStructure.maxPeole}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Price
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="number"
                  name="price"
                  value={newStructure.price}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                MaxChildren
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="number"
                  name="children"
                  value={newStructure.children}
                  onChange={handleChange}
                  className={currentTheme ? "darkTheme" : "bg-white"} />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3 flex justify-content-center" as={Row}>
              <Col xs={3}>
                <Form.Check type="checkbox"
                  name="animals"
                  value={newStructure.animals}
                  onChange={handleChange}
                  label="Animals" />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3 flex justify-content-center" as={Row}>
              <Col xs={3}>
                <Form.Check type="checkbox"
                  name="remoteWork"
                  value={newStructure.remoteWork}
                  onChange={handleChange}
                  label="Remote Work" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Services
              </Form.Label>
              <Col sm={10}>
                <InputWithList
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  onAdd={addService}
                  items={services}
                  placeholder="Add a service"
                  label="Service"
                  currentTheme={currentTheme}
                />
              </Col>
            </Form.Group>
            <Form.Select aria-label="Package"
              value={newStructure.packageId}
              onChange={handlePackageChange}
              className={`my-5 ${currentTheme ? "darkTheme" : "bg-white"}`} >
              <option>select a package:</option>
              {packages
                .filter((packageId) => !packageId.structure)
                .map((packageId) => (
                  <option key={packageId._id} value={packageId._id}>
                    {packageId.city} - {packageId.packageNumber}
                  </option>
                ))}
            </Form.Select>
            <Form.Group as={Row} className="mb-5">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" onClick={addStructure}>Add Structure</Button>
              </Col>
            </Form.Group>
          </Form>
          <Alert show={show} variant="primary">
            <Alert.Heading>Success</Alert.Heading>
            <p>
              structure inserted successfully
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

export default NewStructure;
