import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function SearchCityNation({ onSearch }) {
  const currentTheme = useSelector((state) => state.theme);
  // search for the entered value
  const handleSearchChange = (e) => {
    const query = e.target.value;
    onSearch(query);
  };
  return (
    <Form>
      <Form.Control
        type="search"
        placeholder="Search city/country"
        className={`mt-5 ${currentTheme ? "back_opacity" : "bg-white"}`}
        aria-label="Search"
        onChange={handleSearchChange}
        name="search"
      />
    </Form>
  );
}
SearchCityNation.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchCityNation;



