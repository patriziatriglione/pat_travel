import Row from "react-bootstrap/Row";
import PropTypes from 'prop-types';

function OtherText({ data }) {
  const itemsText = data.slice(1);
  return (
    <Row className="text-start m-2">
      {itemsText.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          <p className="text">{item.description}</p>
        </div>
      ))}
    </Row>
  );
}
OtherText.propTypes = {
  data: PropTypes.array
};

export default OtherText;