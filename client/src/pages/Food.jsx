import Header from "./components/Header";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import { fetchNews } from "../features/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import List from "./components/List";
import Loading from "./components/Loading";
import Error from "./components/Error";
import SearchCityNation from "./components/Search";
import Col from "react-bootstrap/Col";
import PaginationComponent from "./components/Pagination";

function Food() {
  const [filteredNews, setFilteredNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const section = "food";
  // call the data based on section = food and filter
  useEffect(() => {
    dispatch(fetchNews(section));
  }, [dispatch, section]);
  useEffect(() => {
    setFilteredNews(news.data);
  }, [news.data]);
  // data with or without the filter
  const handleSearch = (query) => {
    if (query === "") {
      setFilteredNews();
    } else {
      const filteredData = news.data.filter((item) =>
        item.city.toLowerCase().includes(query.toLowerCase()) ||
        item.nation.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNews(filteredData);
    }
    setCurrentPage(1);
  };
  // items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems)
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Row>
        <Header />
      </Row>
      {news.isLoading ? (
        <Loading />
      ) : (
        <>
          <Row className="my-5 d-flex justify-content-center">
            <Col sm={3}>
              <SearchCityNation section={section} onSearch={handleSearch} />
            </Col>
          </Row>
          <Row className="my-3">
            <h2>News</h2>
          </Row>
          <Row className="my-5">
            {filteredNews.length === 0 ? (
              <Error section={"food"} />
            ) : (
              <>
                <List news={currentItems} section={section} />
                <PaginationComponent
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredNews.length}
                  onPageChange={paginate}
                />
              </>
            )}
          </Row>
        </>
      )}
    </>
  );
}

export default Food;
