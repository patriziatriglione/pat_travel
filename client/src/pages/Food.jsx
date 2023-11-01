import { useState } from 'react';
import Header from "./components/Header";
import Row from "react-bootstrap/Row";
import { useEffect } from "react";
import { fetchNews } from "../features/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import List from "./components/List";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Col from "react-bootstrap/Col";
import PaginationComponent from "./components/Pagination";
import Message from './components/MessageSearch';
import Button from "react-bootstrap/Button"

function Food() {
  const [filteredNews, setFilteredNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchMode, setSearchMode] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const section = "food";
  useEffect(() => {
    dispatch(fetchNews(section));
  }, [dispatch, section]);
  useEffect(() => {
    setFilteredNews(news.data);
  }, [news.data]);
  // Search input
  const handleSearch = () => {
    if (searchQuery === "") {
      setFilteredNews(news.data);
    } else {
      const filteredData = news.data.filter((item) =>
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nation.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNews(filteredData);
      setSearchMode(false); 
    }
    setCurrentPage(1);
  };
  // Search button
  const activateSearchMode = () => {
    setSearchMode(true);
    setFilteredNews([]);
  };
  // Pagination
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
              {searchMode ? (
                <div>
                  <input
                    type="text"
                    placeholder="Search City/nation"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <>
                  <Button onClick={handleSearch} >Search</Button>  
                  <Message />
                  </>
                </div>
              ) : (
                <Button onClick={activateSearchMode} className="my-3">Search City/Nation</Button>
              
              )}
            </Col>
          </Row>
          <Row className="my-3">
            <h2>News</h2>
          </Row>
          <Row className="my-5">
        {filteredNews.length === 0  ? (
              <Error section={"food"} />
            ) : (
              <>
                <List news={filteredNews} section={section} />
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

