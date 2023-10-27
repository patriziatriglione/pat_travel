import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function Table2({ structure, priceStructure, rental, selectedPackage, orderData }) {
  // thema
  const currentTheme = useSelector((state) => state.theme);
  // calculation of days
  const checkInDate = new Date(orderData.checkIn);
  const checkOutDate = new Date(orderData.checkOut);
  const timeDifference = checkOutDate - checkInDate;
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  // total of the rental
  const totalRentalPrice = selectedPackage ? daysDifference * selectedPackage.toInclude[1].price : 0;
  // total of the structure plus calculation in case of addition of children or other adults
  let totalStructurePrice = priceStructure;
  let childrenDay = 5;
  let adultsDay = 30;
  let totalChildrenPriceDay = 0;
  let totalAdultsPriceDay = 0;
  if (orderData.children > 0) {
    totalChildrenPriceDay = orderData.children * childrenDay * daysDifference;
  }
  if (orderData.adults > 2) {
    totalAdultsPriceDay = (orderData.adults - 2) * adultsDay * daysDifference;
  }
  totalStructurePrice += totalChildrenPriceDay += totalAdultsPriceDay;
  // sum of the structure, rental and assistance
  let total = totalStructurePrice + (rental ? totalRentalPrice : 0) + 20;
  // package total
  if (selectedPackage) {
    total += selectedPackage.toInclude.slice(2).reduce((acc, includedItem) => acc + includedItem.price, 0);
  }
  return (
    <Table>
      <thead>
        <tr>
          <th colSpan={2} className={currentTheme ? "td_dark" : ""}>Price:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className={currentTheme ? "td_dark" : ""}>{structure}:</td>
          <td className={currentTheme ? "td_dark" : ""}>{totalStructurePrice} € </td>
        </tr>
        {rental && (
          <tr>
            <td className={currentTheme ? "td_dark" : ""}>Rental:</td>
            <td className={currentTheme ? "td_dark" : ""}>{totalRentalPrice} €</td>
          </tr>)}
        <tr>
          <td colSpan={2} className={currentTheme ? "td_dark" : ""}><strong>Other Service:</strong></td>
        </tr>
        {selectedPackage && selectedPackage.toInclude.slice(rental ? 2 : 1).map((includedItem, index) => (
          <tr key={index}>
            <td className={currentTheme ? "td_dark" : ""}>{includedItem.name}:</td>
            <td className={currentTheme ? "td_dark" : ""}>{includedItem.price} €</td>
          </tr>))}
        <tr>
          <td className={currentTheme ? "td_dark" : ""}>Assistance:</td>
          <td className={currentTheme ? "td_dark" : ""}>20 €</td>
        </tr>
        <tr>
          <td className={currentTheme ? "td_dark" : ""}>Total:</td>
          <td className={currentTheme ? "td_dark" : ""}>{total} €</td>
        </tr>
      </tbody>
    </Table>
  );
}
Table2.propTypes = {
  structure: PropTypes.string.isRequired,
  priceStructure: PropTypes.number.isRequired,
  rental: PropTypes.bool,
  selectedPackage: PropTypes.object,
  orderData: PropTypes.object,
};

export default Table2;