import Row from 'react-bootstrap/Row';
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { toggleTheme } from '../../features/themeSlice';
import { useDispatch, useSelector } from 'react-redux';

function Thema() {
    const dispatch = useDispatch();
    // Icon change based on the theme
    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    }
    const currentTheme = useSelector((state) => state.theme);
    return (
        <Row>
            {currentTheme ? (
                <BsSunFill onClick={handleToggleTheme} className=' text-white' />
            ) : (
                <BsFillMoonStarsFill onClick={handleToggleTheme} />
            )}
        </Row>
    )
}

export default Thema;