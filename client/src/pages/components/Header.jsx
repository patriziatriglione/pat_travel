import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logo2 from "./../../images/logo2.png";
import LogoDark2 from "./../../images/LogoDark2.png";
import { MdMenu, MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import Thema from './Thema';
import { logout } from "./../../features/autSlice";

function Header() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };
  // logout
  const handleLogout = () => {
    dispatch(logout());
  }
  // theme
  const currentTheme = useSelector((state) => state.theme);
  return (
    <>
      <Navbar fixed='top' expand="xl" className={` ${currentTheme ? "darkTheme " : "bg-body-tertiary"}`}>
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={currentTheme ? LogoDark2 : Logo2} alt="logo" width={60} />
          </Navbar.Brand>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleOffcanvas}
          >
            <MdMenu size={25} className={currentTheme ? "darkTheme" : ""} />
          </button>
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand"
            aria-labelledby="offcanvasNavbarLabel-expand"
            placement="end"
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
          >
            <Offcanvas.Header closeButton className={currentTheme ? "back_primary_dark" : "back_primary"} >
            </Offcanvas.Header>
            <Offcanvas.Body className={currentTheme ? "darkTheme" : ""}>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/greenPack">Green packages</Nav.Link>
                <Nav.Link href="/activity">Activity</Nav.Link>
                <Nav.Link href="/food">Local Food</Nav.Link>
              </Nav>
              <Nav className='justify-content-end flex-grow-1 pe-3'>
                {auth.user && <p className='m-2'>{auth.user.accountName}</p>}
                <NavDropdown
                  title={<MdAccountCircle size={25} />}
                  id="offcanvasNavbarDropdown-expand"
                  align={showOffcanvas ? "start" : "end"}
                >
                  <NavDropdown.Item href="/settings" className={currentTheme ? "darkTheme" : ""}>Settings</NavDropdown.Item>
                  {auth.user && auth.user.isAdmin && (
                    <>
                      <NavDropdown.Item href="/newPackage" className={currentTheme ? "darkTheme" : ""}>
                        New Package
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/newStructure" className={currentTheme ? "darkTheme" : ""}>
                        New Structure
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/newFood" className={currentTheme ? "darkTheme" : ""}>
                        New local dish
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/newActivity" className={currentTheme ? "darkTheme" : ""}>
                        New activity
                      </NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Item onClick={handleLogout} href="/login" className={currentTheme ? "darkTheme" : ""}>Logout</NavDropdown.Item>
                  <NavDropdown.Item className={currentTheme ? "darkTheme" : ""}>
                    <Thema />
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;


