import axios from "axios";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/esm/Button";

function Delete({ section, _id, onDelete }) {
    // account deletion
    const deleteData = () => {
        axios.delete(`/api/${section}/${_id}`)
            .then(() => {
                console.log("deletion successful")
                if (onDelete) {
                    onDelete(_id);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <>
            <Button variant="danger" onClick={deleteData} >Delete </Button>
        </>
    )
}
Delete.propTypes = {
    section: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
};

export default Delete;