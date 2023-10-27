import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';
import CarouselSignIn from './components/CarouselSignIn';
import Logo1 from "./../images/logo.png";
import LogoDark from "./../images/LogoDark.png";
import Thema from './components/Thema';
import { useSelector, useDispatch } from 'react-redux';
import Row from "react-bootstrap/Row";
import { fetchAuth } from './../features/autSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  // theme
  const currentTheme = useSelector((state) => state.theme);
  // user
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //login function
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(fetchAuth(credentials));
    if (res.payload) {
      // If the response contains valid data, the login is successful
      navigate('/');
    }
  }
  return (
    <>
      <Row className='pt-3'>
        <Thema />
      </Row>
      <MDBContainer className="my-3 p-5 ">
        <MDBCard className={currentTheme ? "back_opacity " : ""}>
          <MDBRow className='g-0'>
            <MDBCol md='6 mt-5'>
              <CarouselSignIn />
            </MDBCol>
            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column'>
                <div className='d-flex flex-row '>
                  <img src={currentTheme ? LogoDark : Logo1} alt="logo" className='w-100' />
                </div>
                <form>
                  <h5 className="fw-normal my-4 mt-5 pb-3" style={{ letterSpacing: '1px' }}>
                    Sign into your account
                  </h5>
                  <MDBInput className='my-3'
                    wrapperClass='mb-4'
                    label='Email address'
                    name='email'
                    type='email'
                    autoComplete='current-email'
                    size="lg"
                    onChange={handleChange} />
                  <MDBInput className='my-3'
                    wrapperClass='mb-4'
                    label='Password'
                    name='password'
                    type='password'
                    autoComplete="current-password"
                    size="lg"
                    onChange={handleChange} />
                  <MDBBtn
                    onClick={handleLogin}
                    className={`mb-4 my-2 px-5 ${currentTheme ? "back_primary_dark" : "back_primary"}`}
                    size='lg'>
                    Login
                  </MDBBtn>
                  {auth.error && <p className="text" style={{ color: "red" }}>{auth.error}</p>}
                </form>
                <p className="mb-5 pb-lg-2">Dont have an account? <a href="/register" >Register here</a></p>
                <div className='d-flex flex-row justify-content-start my-3'>
                  <a href="#!" className="small text-muted me-1">Terms of use.</a>
                  <a href="#!">Privacy policy</a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default Login;
