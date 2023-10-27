import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhotoTravel3 from "./../../../images/photoTravel3.png";
import Icon from "./Icon";
import Local from "./../../../images/local.png";
import Plastic from "./../../../images/plastic.png";
import Food from "./../../../images/food.png";
import Image from "react-bootstrap/esm/Image";
import { motion } from "framer-motion";

function ThirdPart() {
  const imageAnimate = {
    offscreen: { x: "-100vw" },
    onscreen: {
      x: 0,
      transition: {
        duration: 1,
        bounce: 0.3
      }
    }
  }
  const textAnimate = {
    offscreen: { opacity: 0 },
    onscreen: {
      opacity: 1,
      transition: {
        duration: 1
      }
    }
  }
  return (
    <>
      <motion.div
        initial={"offscreen"}
        whileInView={"onscreen"}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ staggerChildren: 0.5 }}>
        <Row className=" my-5">
          <Col className="text-start px-5" lg={7}>
            <motion.h2 variants={textAnimate}>What will I find?</motion.h2>
            <motion.p variants={textAnimate} className="text">
              you will find green packages for every part of the world with various services including:<br /><br />
            </motion.p>
            <motion.ul variants={textAnimate} className="text text-decoration-none">
              <li>Sleeping structure (hotel, b&b, apartments etc...);</li>
              <li>Information on means of transport;</li>
              <li>Car rent;</li>
              <li>Excursions/visits;</li>
              <li>Tasting typical dishes;</li>
              <li>Coupons/discounts for restaurants, museums etc.</li>
              <li> ...  and more!</li>
            </motion.ul>
            <motion.p>
              N.B. Each package is unique and includes only some of the services listed (one package may have included only the hotel and an excursion while another package also includes car rental).
            </motion.p>
          </Col>
          <Col>
            <motion.div variants={imageAnimate}>
              <Image fluid src={PhotoTravel3} alt="travel" />
            </motion.div>
          </Col>
        </Row>
        <Row className="my-5 d-flex justify-content-center">
          <Icon image={Local} text="Support local businesses" />
          <Icon image={Plastic} text="No to single-use plastic" />
          <Icon image={Food} text="Eat local food" />
        </Row>
      </motion.div>
    </>
  );
}

export default ThirdPart;