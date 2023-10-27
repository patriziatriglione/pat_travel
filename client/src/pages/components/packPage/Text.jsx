import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from 'prop-types';

function Text({ title, text, services }) {
  return (
    <>
      <Row className=" m-2">
        <Col className="text-start">
          <h2>{title}</h2>
          <p className="text">{text}</p>
          {services && (
            <ul style={{ fontSize: "17px" }}>
              {services.map((service, index) => {
                return <li key={index} className="my-3">{service}</li>
              })}
            </ul>
          )}
        </Col>
      </Row>
    </>
  );
}
Text.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  services: PropTypes.array
};

export default Text;