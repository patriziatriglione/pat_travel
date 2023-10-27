import Row from "react-bootstrap/Row"
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Card2({ title, text, image, price, hours }) {
  const currentTheme = useSelector((state) => state.theme);
  return (
    <Row className="d-flex justify-content-center my-4" >
      <div className={`card mb-3 ${currentTheme ? "back_opacity" : ""}`} style={{ maxWidth: "900px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={image}
              alt={title}
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className={`card-title ${currentTheme ? "on_tertiary_dark" : "on_tertiary"}`}>{title}</h5>
              <p className="card-text mt-5">{text}</p>
              <small className="text-muted">{price}</small><br />
              <small className="text-muted">{hours}</small>
            </div>
          </div>
        </div>
      </div>
    </Row>
  )
}
Card2.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string.isRequired,
  price: PropTypes.string,
  hours: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Card2;