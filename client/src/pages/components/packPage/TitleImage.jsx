import Row from "react-bootstrap/Row"
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function TitleImage({ nation, city, images, packageNumber }) {
  // thema
  const currentTheme = useSelector((state) => state.theme);
  return (
    <>
      <Row className="my-5">
        <h2 className={`mt-5 ${currentTheme ? "on_tertiary_dark" : "on_tertiary"}`}>
          {city} - {nation} #{packageNumber}
        </h2>
      </Row>
      <Row>
        <Col lg={12}>
          {images.map((image, index) => (
            <Image fluid
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="m-2"
            />
          ))}
        </Col>
      </Row>
    </>
  );
}
TitleImage.propTypes = {
  nation: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  packageNumber: PropTypes.string.isRequired,
};

export default TitleImage;
