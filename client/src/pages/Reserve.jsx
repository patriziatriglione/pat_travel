import { useLocation } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "./components/Header";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStructure } from "../features/structureSlice";
import { fetchPack } from "../features/packSlice"
import Table1 from "./components/reserve/Table1";
import Table2 from "./components/reserve/Table2";
import Button from "react-bootstrap/Button"
import { useState } from "react";
import Payment from "./components/reserve/Payment";

function Reserve() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { orderData } = location.state;
  const packageId = orderData.package;
  const dispatch = useDispatch();
  const pack = useSelector((state) => state.pack);
  const structure = useSelector((state) => state.structure);
  // package Id
  useEffect(() => {
    dispatch(fetchPack(packageId));
  }, [dispatch, packageId]);
  const selectedPackage = pack.data.find((pack) => pack._id === packageId);
  // structure Id
  useEffect(() => {
    if (selectedPackage) {
      const structureId = selectedPackage.structure;
      if (structureId) {
        dispatch(fetchStructure(structureId));
      }
    }
  }, [dispatch, selectedPackage]);
  let selectedStructure;
  if (selectedPackage) {
    selectedStructure = structure.data.find((s) => s._id === selectedPackage.structure);
  }
  // open the payment form
  const handleClick = (e) => {
    e.preventDefault()
    setOpen(true)
  }
  return (
    selectedPackage && selectedStructure && (
      <>
        <Row className="mt-5">
          <Header />
        </Row>
        <Row className="my-5">
          <h2>Summary of Your Reservation</h2>
        </Row>
        <Row className="text flex justify-content-center">
          <p><strong>{selectedPackage.city} - Package: {selectedPackage.packageNumber}</strong></p>
          <p>{orderData.checkIn} / {orderData.checkOut}</p>
        </Row>
        <Row className="flex justify-content-center my-5">
          <Col lg={4}>
            <Table1
              adults={orderData.adults}
              childrenNumb={orderData.children}
              animals={orderData.animals}
              rental={orderData.rental} />
          </Col>
        </Row>
        <Row className="flex justify-content-center my-5">
          <Col lg={6}>
            <Table2
              structure={selectedStructure.title}
              priceStructure={orderData.price}
              rental={orderData.rental}
              selectedPackage={selectedPackage}
              orderData={orderData} />
          </Col>
        </Row>
        <Row className="flex justify-content-center mb-5">
          <Col lg={3}>
            <Button variant="primary" type="submit" className='my-3' onClick={handleClick}>
              Go to payment
            </Button>
          </Col>
        </Row>
        {open && (
          <Row>
            <Payment />
          </Row>)}
      </>
    )
  );
}

export default Reserve;
