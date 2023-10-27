import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

function InputWithList({ value, onChange, onAdd, items, placeholder, label, currentTheme }) {
  return (
    <>
      <Form.Control
        type="text"
        className={currentTheme ? "darkTheme" : "bg-white"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Button type="button" onClick={onAdd} className="my-3">
        Add {label}
      </Button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.startsWith('htt') ? "added item" : item}
          </li>
        ))}
      </ul>
    </>
  );
}
InputWithList.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  currentTheme: PropTypes.bool.isRequired,
};

export default InputWithList;
