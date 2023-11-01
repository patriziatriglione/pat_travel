import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function SearchCityNation({ onSearch }) {
  const currentTheme = useSelector((state) => state.theme);

  // Aggiungi una funzione per gestire la pressione del tasto "Invio"
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Esegui la ricerca quando il tasto "Invio" viene premuto
      onSearch(e.target.value);
    }
  };

  return (
    <Form>
      <Form.Control
        type="search"
        placeholder="Search city/country"
        className={`mt-5 ${currentTheme ? "back_opacity" : "bg-white"}`}
        aria-label="Search"
        onKeyPress={handleKeyPress} // Ascolta l'evento di pressione del tasto
        name="search"
      />
    </Form>
  );
}

SearchCityNation.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchCityNation;

