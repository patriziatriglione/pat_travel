import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';


function Include({ includes }) {
    // thema
    const currentTheme = useSelector((state) => state.theme);
    return (
        <Card className={currentTheme ? "tertiary_dark" : "tertiary "} style={{ width: '18rem' }}>
            <Card.Header>What it includes:</Card.Header>
            <Card.Body>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                    {includes.map((toInclude, index) => {
                        return <li key={index} className="my-3">{toInclude.name}</li>
                    })}
                </ul>
            </Card.Body>
        </Card>
    );
}
Include.propTypes = {
    includes: PropTypes.array.isRequired
};


export default Include;
