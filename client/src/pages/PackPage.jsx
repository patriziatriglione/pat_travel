import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import Header from "./components/Header";
import { fetchPack } from "../features/packSlice";
import TitleImage from "./components/packPage/TitleImage";
import Include from "./components/packPage/Include";
import CrazyFor from "./components/packPage/CrazyFor";
import Text from "./components/packPage/Text";
import { fetchStructure } from "../features/structureSlice";
import Available from "./components/packPage/Available";
import OtherText from "./components/packPage/OtherText";
import FromCheck from "./components/packPage/FormCheck";

function PackPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pack = useSelector((state) => state.pack);
  const structure = useSelector((state) => state.structure);
  useEffect(() => {
    // the package ID to get the data
    dispatch(fetchPack(id));
  }, [dispatch, id]);
  const selectedPackage = pack.data.find((pack) => pack._id === id);
  // the structure ID
  useEffect(() => {
    if (selectedPackage) {
      const structureId = selectedPackage.structure;
      if (structureId) {
        dispatch(fetchStructure(structureId));
      }
    }
  }, [dispatch, selectedPackage]);
  let selectedStructure;
  if (selectedPackage) {
    selectedStructure = structure.data.find((s) => s._id === selectedPackage.structure);
  }
  if (!selectedPackage) {
    return (
      <Row>
        <Header />
        <p>Package not found.</p>
      </Row>
    );
  }
  return (
    <>
      <Row>
        <Header />
      </Row>
      <Row className="my-5">
        <TitleImage
          city={selectedPackage.city}
          nation={selectedPackage.nation}
          packageNumber={selectedPackage.packageNumber}
          images={selectedPackage.image}
        />
      </Row>
      <Row className="d-flex justify-content-center p-3 my-5">
        <Col md={6} className="my-2">
          <CrazyFor
            crazyFors={selectedPackage.crazyFor}
            icons={selectedPackage.icon}
          />
        </Col>
      </Row>
      {selectedStructure && (
        <Row className="flex justify-content-between my-5">
          <Col md={6}>
            <Text
              title={selectedStructure.title}
              text={selectedStructure.desc}
              services={selectedStructure.service}

            />
            <OtherText data={selectedPackage.toInclude} />
          </Col>
          <Col lg={6} md={6}>
            <Row className="flex justify-content-center">
              <Include includes={selectedPackage.toInclude} />
            </Row>
            <Row className="my-5 flex justify-content-center">
              <Available
                maxPeople={selectedStructure.maxPeople}
                childrenMax={selectedStructure.children}
                animals={selectedStructure.animals}
              />
            </Row>
            <Row className="flex justify-content-center m-1">
              <FromCheck packageId={selectedPackage._id}
                price={selectedStructure.price}
                city={selectedPackage.city}
                packNumber={selectedPackage.packageNumber}
                animals={selectedStructure.animals}
                rental={selectedPackage.rental}
                adultsNumber={selectedStructure.maxPeople}
                childrenNumber={selectedStructure.children} />
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
}

export default PackPage;
