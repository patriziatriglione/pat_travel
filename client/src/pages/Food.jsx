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

function Food() {
  const [filteredNews, setFilteredNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchMode, setSearchMode] = useState(false); // Stato per gestire la modalità di ricerca
  const [searchQuery, setSearchQuery] = useState(''); // Stato per la query di ricerca
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const section = "food";

  useEffect(() => {
    dispatch(fetchNews(section));
  }, [dispatch, section]);

  useEffect(() => {
    setFilteredNews(news.data);
  }, [news.data]);

  // Funzione per gestire la ricerca
  const handleSearch = () => {
    if (searchQuery === "") {
      setFilteredNews([news.data]);
    } else {
      const filteredData = news.data.filter((item) =>
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nation.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNews(filteredData);
      setSearchMode(false); // Nasconde la barra di ricerca
    }
    setCurrentPage(1);
  };

  // Funzione per attivare la modalità di ricerca
  const activateSearchMode = () => {
    setSearchMode(true);
    setFilteredNews([]);
  };

  // Funzione per gestire la paginazione
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
                    placeholder="Cerca città/nazione"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button onClick={handleSearch}>Cerca</button>
                </div>
              ) : (
                <button onClick={activateSearchMode}>Cerca città/nazione</button>
              )}
            </Col>
          </Row>
          <Row className="my-3">
            <h2>News</h2>
          </Row>
          <Row className="my-5">
        {filteredNews.length === 0 && setSearchMode(false) ? (
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

