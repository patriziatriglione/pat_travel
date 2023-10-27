import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

function Error({section}) {
  return (
    <Row className="d-flex justify-content-center align-items-center vh-100">
      <h3>Oops! No {section}!<br />
        We are working on this discomfort!</h3>
    </Row>
  );
}
Error.propTypes = {
  section: PropTypes.string,
};
export default Error;