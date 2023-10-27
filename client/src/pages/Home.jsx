import Header from "./components/Header";
import Row from "react-bootstrap/Row";
import FirstPart from "./components/home/FirstPart";
import SecondPart from "./components/home/SecondPart";
import ThirdPart from "./components/home/ThirdPart";
import FourthPart from "./components/home/FourthPart";
import { useSelector } from "react-redux";
import Loading from "./components/Loading";

function Home() {
  const auth = useSelector((state) => state.auth);
  if (auth.isLoading) return <Loading />;
  return (
    <div>
      <Header />
      <>
        <Row>
          <FirstPart />
        </Row>
        <Row>
          <SecondPart />
        </Row>
        <Row>
          <ThirdPart />
        </Row>
        <Row>
          <FourthPart />
        </Row>
      </>
    </div>
  );
}

export default Home;
