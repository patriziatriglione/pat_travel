import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhotoTravel from "./../../../images/photoTravel.png"
import PhotoTravel2 from "./../../../images/photoTravel_02.png"
import Eco from "./../../../images/eco.png"
import PublicTrasport from "./../../../images/publicTrasport.png"
import LocalTraditions from "./../../../images/localTraditions.png"
import Icon from "./Icon";
import { motion } from "framer-motion";
import Image from 'react-bootstrap/Image';

function SecondPart() {
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
                    <Col className="text-start px-5  " lg={4}>
                        <motion.h2 variants={textAnimate}>What is Pat_Travel?</motion.h2>
                        <motion.p variants={textAnimate} className="text">
                            Pat_travel was born with the idea of being able to offer completely green trips and experiences that try to emit as little CO2 as possible.
                            On the one hand you will visit new places, on the other you will respect the environment around you
                        </motion.p>
                    </Col>
                    <Col lg={4} className="text-end">
                        <motion.div variants={imageAnimate}>
                            <Image fluid src={PhotoTravel} alt="travel" />
                        </motion.div>
                    </Col>
                    <Col lg={4}>
                        <motion.div variants={imageAnimate}>
                            <Image fluid src={PhotoTravel2} alt="travel" />
                        </motion.div>
                    </Col>
                </Row>
                <Row className="my-5 d-flex justify-content-center">
                    <Icon image={Eco} text="Travel in eco-sustainable accommodation" />
                    <Icon image={PublicTrasport} text="Take public transport" />
                    <Icon image={LocalTraditions} text="Respect local traditions" />
                </Row>
            </motion.div>
        </>
    );
}

export default SecondPart;