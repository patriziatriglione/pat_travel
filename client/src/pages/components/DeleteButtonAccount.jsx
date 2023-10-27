import { useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";

function Delete() {
  // user data
  const auth = useSelector((state) => state.auth)
  // account deletion
  const deleteData = () => {
    axios.delete(`/api/user/${auth.user._id}`)
      .then(() => {
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <Button variant="danger" onClick={deleteData} >Delete account</Button>
    </>
  )
}

export default Delete;