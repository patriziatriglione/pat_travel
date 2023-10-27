import Row from "react-bootstrap/Row"
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function CardTravel({ title, text, image, id }) {
  const currentTheme = useSelector((state) => state.theme);
  return (
    <Row className="d-flex my-4 justify-content-center">
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
              <Link to={`/greenPack/${id}`}>
                <h5 className={`card-title ${currentTheme ? "on_tertiary_dark" : "on_tertiary"}`}>{title}</h5>
              </Link>
              <p className="card-text mt-5">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </Row>
  );
}
CardTravel.propTypes = {
  image: PropTypes.string,
  text: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CardTravel;