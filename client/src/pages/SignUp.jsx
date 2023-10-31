import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
}
  from 'mdb-react-ui-kit';
import Photo from "./../images/photoSignUp.png"
import Thema from './components/Thema';
import { useSelector } from 'react-redux';
import Row from "react-bootstrap/Row"
import { useState } from 'react';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button"

function SignUp() {
  const [show, setShow] = useState(false);
  const [newAccount, setNewAccount] = useState({
    firstName: "",
    lastName: "",
    accountName: "",
    address: "",
    city: "",
    zipCode: "",
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewAccount({
      ...newAccount,
      [name]: newValue
    });
  }
  // function new account
  const addAccount = (e) => {
    e.preventDefault();
    const newAccountData = {
      firstName: newAccount.firstName,
      lastName: newAccount.lastName,
      accountName: newAccount.accountName,
      address: newAccount.address,
      city: newAccount.city,
      zipCode: newAccount.zipCode,
      email: newAccount.email,
      password: newAccount.password
    };
    setShow(true)
    setNewAccount({
      firstName: "",
      lastName: "",
      accountName: "",
      address: "",
      city: "",
      zipCode: "",
      email: "",
      password: ""
    });
    // call api for registration
    axios.post(`https://pat-travel-api.vercel.app/api/auth/register`, newAccountData, { withCredentials: true })
      .then((response) => {
        console.log('Account added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding account', error);
      });
  };
  // theme
  const currentTheme = useSelector((state) => state.theme);
  return (
    <>
      <Row className='pt-3'>
        <Thema />
      </Row>
      <MDBContainer className='mb-5' >
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol>
            <MDBCard className={`my-4 ${currentTheme ? "back_opacity " : ""}`}>
              <MDBRow className='g-0'>
                <MDBCol md='6' className="d-none d-md-block">
                  <MDBCardImage src={Photo} alt="travel photo" className="rounded-start" fluid />
                </MDBCol>
                <MDBCol md='6'>
                  <MDBCardBody className=' d-flex flex-column justify-content-center'>
                    <h3 className="mb-5 text-uppercase fw-bold">Sign Up</h3>
                    <form>
                      <MDBRow>
                        <MDBCol md='6'>
                          <MDBInput wrapperClass='mb-4'
                            label='First Name'
                            size='lg'
                            name='firstName'
                            value={newAccount.firstName}
                            onChange={handleChange}
                            type='text' />
                        </MDBCol>
                        <MDBCol md='6'>
                          <MDBInput wrapperClass='mb-4'
                            label='Last Name'
                            size='lg'
                            name='lastName'
                            value={newAccount.lastName}
                            onChange={handleChange}
                            type='text' />
                        </MDBCol>
                      </MDBRow>
                      <MDBInput wrapperClass='mb-4'
                        label='Account Name'
                        size='lg'
                        name='accountName'
                        value={newAccount.accountName}
                        onChange={handleChange}
                        type='text' />
                      <MDBInput wrapperClass='mb-4'
                        label='Address'
                        size='lg'
                        name='address'
                        value={newAccount.address}
                        onChange={handleChange}
                        type='text' />
                      <MDBInput wrapperClass='mb-4'
                        label='City'
                        size='lg'
                        name='city'
                        value={newAccount.city}
                        onChange={handleChange}
                        type='city' />
                      <MDBInput wrapperClass='mb-4'
                        label='Zip Code'
                        size='lg'
                        name='zipCode'
                        value={newAccount.zipCode}
                        onChange={handleChange}
                        type='text' />
                      <MDBInput wrapperClass='mb-4'
                        label='Email '
                        size='lg'
                        name='email'
                        value={newAccount.email}
                        onChange={handleChange}
                        type='text' />
                      <MDBInput wrapperClass='mb-4'
                        label='Password'
                        size='lg'
                        name='password'
                        value={newAccount.password}
                        onChange={handleChange}
                        autoComplete='password'
                        type='password' />
                      <div className="d-flex justify-content-end pt-3">
                        <MDBBtn color={currentTheme ? "dark" : "light"} size='lg' href='/login'>Login</MDBBtn>
                        <MDBBtn className={`ms-2  ${currentTheme ? "back_primary_dark" : "back_primary"}`}
                          size='lg' type='submit' onClick={addAccount}>Submit form</MDBBtn>
                      </div>
                    </form>
                  </MDBCardBody>
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
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default SignUp;