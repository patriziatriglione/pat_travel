import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { BsPaypal } from "react-icons/bs"
import { FaCcVisa, FaGooglePay } from "react-icons/fa"
import { useState } from "react";
import Alert from "react-bootstrap/Alert"

function Payment() {
  const [show, setShow] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  // user data
  const auth = useSelector((state) => state.auth)
  // show the alert
  const handleClick = (e) => {
    e.preventDefault()
    setShow(!show)
  }
  const selectMethod = (method) => {
    setSelectedMethod(method);
  };
  return (
    auth.user && (
      <>
        <Row>
          <h3>Payment</h3>
        </Row>
        <Form>
          <Row className="my-5 flex justify-content-center">
            <Col lg={3}>
              <h5>Date:</h5>
              <Form.Group className="my-3">
                <Form.Control type="text" className='text-center' placeholder={auth.user.firstName} readOnly />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Control type="text" className='text-center' placeholder={auth.user.lastName} readOnly />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Control type="text" className='text-center' placeholder={auth.user.address} readOnly />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Control type="text" className='text-center' placeholder={auth.user.city} readOnly />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Control type="text" className='text-center' placeholder={auth.user.zipCode} readOnly />
              </Form.Group>
              <p>In case the data does not match, please create an account with your data.</p>
            </Col>
          </Row>
          <Row className="flex justify-content-center">
            <Col lg={3}>
              <h6>Payment method:</h6>
              <div
                className={selectedMethod === 'paypal' ? 'selected' : ''}
                onClick={() => selectMethod('paypal')}
              >
                <BsPaypal size={30} className="my-2" />
              </div>
              <div
                className={selectedMethod === 'visa' ? 'selected' : ''}
                onClick={() => selectMethod('visa')}
              >
                <FaCcVisa size={30} className="my-2" />
              </div>
              <div
                className={selectedMethod === 'googlepay' ? 'selected' : ''}
                onClick={() => selectMethod('googlepay')}
              >
                <FaGooglePay size={30} className="my-2" />
              </div>
            </Col>
          </Row>
          <Row className="flex justify-content-center mb-5">
            <Col>
              <Button variant="primary" type="submit" className='my-3' size="lg" onClick={handleClick}>
                Pay
              </Button>
            </Col>
          </Row>
        </Form>
        {show && (
          <Row className="flex justify-content-center my-5">
            <Col lg={5}>
              <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Thank you!</Alert.Heading>
                <p>
                  this was just a handy site, thanks for coming this far
                </p>
              </Alert>
            </Col>
          </Row>
        )
        }
      </>
    )
  )
}

export default Payment;