import PropTypes from "prop-types";
import CardTravel from "./CardTravel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Delete from "./Delete";
import { useState } from "react";

function NewsList({ news, section }) {
  const [filteredNews, setFilteredNews] = useState(news);
  // Remove the item from the filtered list
  const handleDelete = (itemId) => {
    setFilteredNews(filteredNews.filter((item) => item._id !== itemId));
  };
  return (
    <Row>
      {filteredNews.map((newsItem, index) => (
        <>
          <CardTravel
            key={index}
            text={newsItem.toInclude.map((item, index) => (
              <p key={index}>{item.name}</p>
            ))}
            title={`${newsItem.city} - ${newsItem.nation} #${newsItem.packageNumber}`}
            image={newsItem.image[0]}
            id={newsItem._id}
          />
          <Row className="flex justify-content-center">
            <Col lg={2}>
              <Delete section={section} _id={newsItem._id} onDelete={handleDelete} />
            </Col>
          </Row>
        </>
      ))}
    </Row>
  );
}
NewsList.propTypes = {
  news: PropTypes.array.isRequired,
  section: PropTypes.string,
};

export default NewsList;
