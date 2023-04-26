import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import EngineContext from "../../contexts/EngineContext";
import { Row, Col } from "antd";

const EngineDetails = () => {
  const { getOneEngine, engine } = useContext(EngineContext);
  let { id } = useParams();

  useEffect(() => {
    getOneEngine(id);
  }, [id]);

  return engine ? (
    <>
      <Row style={{ width: "100%" }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <img src={engine.imageUrl} style={{ width: "100%" }} />
        </Col>
        <Col></Col>
      </Row>
      <Row></Row>
    </>
  ) : (
    "Chargement..."
  );
};

export default EngineDetails;
