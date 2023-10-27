import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhotoTravel4 from "./../../../images/travelPhoto4.png"
import PhotoTravel5 from "./../../../images/travelPhoto5.png"
import { motion } from "framer-motion";

import Image from 'react-bootstrap/Image';
function FourthPart() {
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
                    <Col className="text-start px-5  " lg={6}>
                        <motion.h2 variants={textAnimate}>Do you want to know more about your destination?</motion.h2>
                        <motion.p variants={textAnimate} className="text">
                            On our site you will find information about the countries you will visit, so you can have a clearer picture of your destination.
                            You will be able to read curiosities, information, places to absolutely visit and learn about typical local dishes
                        </motion.p>
                        <motion.h3 variants={textAnimate}>More Info</motion.h3>
                        <motion.p variants={textAnimate} className="text">
                            For more information about the packages you can visit the FAQ page or if you have any other questions or offer any services/facilities etc. that reflect our philosophy, contact us via this form.
                        </motion.p>
                    </Col>
                    <Col lg={3} className="text-end">
                        <motion.div variants={imageAnimate}>
                            <Image fluid src={PhotoTravel4} alt="travel" />
                        </motion.div>
                    </Col>
                    <Col lg={3}>
                        <motion.div variants={imageAnimate}>
                            <Image fluid src={PhotoTravel5} alt="travel" />
                        </motion.div>
                    </Col>
                </Row>
            </motion.div>
        </>
    );
}

export default FourthPart;