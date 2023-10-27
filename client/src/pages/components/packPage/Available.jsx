import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";
import { useSelector } from 'react-redux';

function Available({ maxPeople, animals, childrenMax }) {
  // thema
  const currentTheme = useSelector((state) => state.theme);
  return (
    <Card className={currentTheme ? "tertiary_dark" : "tertiary "} style={{ width: '18rem' }}>
      <Card.Header>Available for:</Card.Header>
      <Card.Body>
        <ul style={{ fontSize: "17px" }}>
          <li>Peolpe: max {maxPeople} </li>
          {animals && <li>Animals</li>}
          {childrenMax !== 0 && <li>Children: max {childrenMax}</li>}
        </ul>
      </Card.Body>
    </Card>
  );
}
Available.propTypes = {
  maxPeople: PropTypes.number.isRequired,
  animals: PropTypes.bool,
  childrenMax: PropTypes.number.isRequired,
};

export default Available;
