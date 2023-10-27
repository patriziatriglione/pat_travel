import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CrazyFor({ crazyFors, icons }) {
  // thema
  const currentTheme = useSelector((state) => state.theme);
  // number of entries per column
  const itemsPerColumn = Math.ceil(crazyFors.length / 2);
  const firstColumnItems = crazyFors.slice(0, itemsPerColumn);
  const secondColumnItems = crazyFors.slice(itemsPerColumn);
  return (
    <Card className={currentTheme ? 'tertiary_dark' : 'tertiary '}>
      <Card.Header>Guests go crazy for...</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {firstColumnItems.map((crazyFor, index) => (
                <li key={index} className="my-3 d-flex">
                  <img src={icons[index]} alt={`Icon for ${crazyFor}`} className="mx-3" />
                  {crazyFor}
                </li>
              ))}
            </ul>
          </Col>
          <Col>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {secondColumnItems.map((crazyFor, index) => (
                <li key={index} className="my-3 d-flex">
                  <img src={icons[index + itemsPerColumn]} alt={`Icon for ${crazyFor}`} className={"mx-3"} />
                  {crazyFor}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
CrazyFor.propTypes = {
  crazyFors: PropTypes.array.isRequired,
  icons: PropTypes.array,
};

export default CrazyFor;
