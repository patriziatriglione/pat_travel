import PropTypes from "prop-types";
import Card2 from "./Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Delete from "./Delete";
import { useState } from "react";


function List({ news, section }) {
  const [filteredNews, setFilteredNews] = useState(news);
  //Remove the item from the filtered list
  const handleDelete = (itemId) => {
    setFilteredNews(filteredNews.filter((item) => item._id !== itemId));
  };
  return (
    <Row>
      {filteredNews.map((newsItem, index) => (
        <>
          <Card2
            key={index}
            text={newsItem.text}
            price={newsItem.price}
            hours={newsItem.hours}
            title={`${newsItem.title} - ${newsItem.city} - ${newsItem.nation} `}
            image={newsItem.image}
          />
          <Row className="flex justify-content-center mb-5">
            <Col lg={2}>
              <Delete section={section} _id={newsItem._id} onDelete={handleDelete} />
            </Col>
          </Row>
        </>
      ))}
    </Row>
  );
}
List.propTypes = {
  news: PropTypes.array,
  section: PropTypes.string,
};

export default List;
