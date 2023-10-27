import Row from "react-bootstrap/Row";
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <Row className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" variant="primary" className="my-5" />
    </Row>
  );
}

export default Loading;