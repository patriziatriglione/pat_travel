import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiFillGithub, AiFillLinkedin, AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import { GoProjectSymlink } from "react-icons/go";
import { GiTigerHead } from "react-icons/gi";

function Footer() {
    return (
        <>
            <Row className='text-start my-5'>
                <Col className='mx-5'>
                    <h5>Inforamtion</h5>
                    <p>
                        This site was created as a final project for the Full Stack Developer course for Start2Impact.
                        The content is pure fantasy, the only true things concern information and curiosities, local food and activities to do.
                        The hotels, apartments, rentals etc. are invented for the sole purpose of showing the functionality of the site and letting you try everything for yourself.
                    </p>
                </Col>
                <Col>
                    <h5>Pages</h5>
                    <p><a href='/greenPack'>Green packages</a></p>
                    <p><a href='/food'>Local Food</a></p>
                    <p><a href='/activity'>Activities</a></p>
                </Col>
                <Col>
                    <h5>My Projects</h5>
                    <p><a href='https://patriziatriglione.github.io/patriziatriglione/index.html'><GiTigerHead size={25} /></a> Portfolio</p>
                    <p><a href='https://github.com/patriziatriglione'><AiFillGithub size={25} /></a> Github</p>
                    <p><a href='https://patriziatriglione.github.io/patriziatriglione/websites.html'><GoProjectSymlink size={25} /></a>Projects</p>
                </Col>
                <Col>
                    <h5>Social</h5>
                    <p><a href='https://www.linkedin.com/in/patriziatriglione/'><AiFillLinkedin size={25} /></a> LinkedIn</p>
                    <p><a href='https://www.instagram.com/patrizia_triglione_/'><AiFillInstagram size={25} /></a> Instagram</p>
                    <p><a href='https://www.facebook.com/patrizia.triglione'><AiFillFacebook size={25} /></a> Facebook</p>
                </Col>
            </Row>
            <Row>
                <p>
                    © Pat-Travel - Triglione Patrizia | Tutti i diritti riservati </p>

            </Row>
        </>
    );
}

export default Footer;