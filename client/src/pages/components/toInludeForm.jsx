import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ToInclude({ onUpdateToInclude }) {
  const [toInclude, setToInclude] = useState([
    {
      name: '',
      description: '',
      price: '',
    },
  ]);
  const [savedToInclude, setSavedToInclude] = useState([]);
  const currentTheme = useSelector((state) => state.theme);
  // update the toInclude data
  const updateToInclude = (index, field, value) => {
    const updatedToInclude = [...toInclude];
    updatedToInclude[index][field] = value;
    setToInclude(updatedToInclude);
  };
  // save data
  const handleSaveToInclude = () => {
    const updatedToInclude = toInclude.map((item) => {
      return {
        name: item.name,
        description: item.description,
        price: item.price,
      };
    });
    setSavedToInclude([...savedToInclude, ...updatedToInclude]);
    onUpdateToInclude(updatedToInclude);
    setToInclude([
      {
        name: '',
        description: '',
        price: '',
      },
    ]);
  };
  return (
    <>
      {toInclude.map((item, index) => (
        <div key={index}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Service
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={item.name}
                onChange={(e) => updateToInclude(index, 'name', e.target.value)}
                className={currentTheme ? 'darkTheme' : 'bg-white'}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={item.description}
                onChange={(e) =>
                  updateToInclude(index, 'description', e.target.value)
                }
                className={currentTheme ? 'darkTheme' : 'bg-white'}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Price
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={item.price}
                onChange={(e) =>
                  updateToInclude(index, 'price', e.target.value)
                }
                className={currentTheme ? 'darkTheme' : 'bg-white'}
              />
            </Col>
          </Form.Group>
        </div>
      ))}
      <Row className="flex justify-content-end">
        <Col sm={10}>
          <Button
            type="button"
            onClick={handleSaveToInclude}
            className="my-2"
          >
            Save
          </Button>
        </Col>
      </Row>
      <ul>
        {savedToInclude.map((item, index) => (
          <li key={index}>
            Service: {item.name}, Description: {item.description}, Price: {item.price}
          </li>
        ))}
      </ul>
    </>
  );
}
ToInclude.propTypes = {
  onUpdateToInclude: PropTypes.func,
};

export default ToInclude;