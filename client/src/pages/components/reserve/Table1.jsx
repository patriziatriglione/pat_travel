import Table from "react-bootstrap/Table"
import { useSelector } from "react-redux";
import { FcCheckmark } from "react-icons/fc";
import PropTypes from 'prop-types';

function Table1({ adults, childrenNumb, animals, rental }) {
  const currentTheme = useSelector((state) => state.theme);
  return (
    <Table>
      <tbody>
        <tr >
          <td className={currentTheme ? "td_dark" : ""}  >Adults:</td>
          <td className={currentTheme ? "td_dark" : ""} >{adults}</td>
        </tr>
        <tr>
          <td className={currentTheme ? "td_dark" : ""}>Children:</td>
          <td className={currentTheme ? "td_dark" : ""}>{childrenNumb}</td>
        </tr>
        {animals && (
          <tr>
            <td className={currentTheme ? "td_dark" : ""}>Animals:</td>
            <td className={currentTheme ? "td_dark" : ""}><FcCheckmark /></td>
          </tr>)}
        {rental && (
          <tr>
            <td className={currentTheme ? "td_dark" : ""}>Rental:</td>
            <td className={currentTheme ? "td_dark" : ""}><FcCheckmark /></td>
          </tr>)}
      </tbody>
    </Table>
  );
}
Table1.propTypes = {
  adults: PropTypes.number.isRequired,
  childrenNumb: PropTypes.number,
  animals: PropTypes.bool,
  rental: PropTypes.bool,
};

export default Table1;