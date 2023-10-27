import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import { motion } from "framer-motion"

const imageAnimate = {
  offscreen: { x: "-100vw" },
  onscreen: {
    x: 0,
    transition: {
      type: "spring",
      duration: 3,
      bounce: 0.3
    }
  }
}
function Icon({ image, text }) {
  return (
    <>
      <Col lg={3}>
        <motion.div
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: false, amount: 0.5 }}>
          <motion.div variants={imageAnimate}>
            <Image fluid src={image} alt={text} />
            <h3>{text}</h3>
          </motion.div>
        </motion.div>
      </Col>
    </>
  );
}
Icon.propTypes = {
  image: PropTypes.string.isRequired, 
  text: PropTypes.string.isRequired,
};

export default Icon;