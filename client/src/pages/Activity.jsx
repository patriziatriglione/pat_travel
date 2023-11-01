import Header from "./components/Header";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import { fetchNews } from "../features/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import List from "./components/List";
import Loading from "./components/Loading";
import Error from "./components/Error";
import PaginationComponent from "./components/Pagination";
import Col from "react-bootstrap/Col";
import Message from './components/MessageSearch';
import Button from "react-bootstrap/Button"

function Activity() {
  const [filteredNews, setFilteredNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchMode, setSearchMode] = useState(false); 
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const section = "activity";
  // call the data based on section = activity and filter
  useEffect(() => {
    dispatch(fetchNews(section));
  }, [dispatch, section]);
  useEffect(() => {
    setFilteredNews(news.data);
  }, [news.data]);
  // data with or without the filter
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
  // items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);
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
                <div className="my-5">
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
                <Button onClick={activateSearchMode} className="my-5">Search City/Nation</Button>
              )}
            </Col>
          </Row>
          <Row className="my-3">
            <h2>News</h2>
          </Row>
          <Row className="my-5">
        {filteredNews.length === 0  ? (
              <Error section={"activity"} />
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

export default Activity;
