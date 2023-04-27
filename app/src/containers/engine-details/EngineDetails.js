import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import EngineContext from "../../contexts/EngineContext";
import { Row, Col, Badge, Button } from "antd";
import "./engine-details.css";

const EngineDetails = () => {
  const { getOneEngine, engine } = useContext(EngineContext);
  let { id } = useParams();

  useEffect(() => {
    getOneEngine(id);
  }, [id]);

  return engine ? (
    <>
      <Row style={{ width: "100%" }}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <img src={engine.imageUrl} style={{ width: "100%" }} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className="engine-details__container">
            <div className="engine-details__titles-container">
              <div>
                <p style={{ color: "#666" }}>{engine.name}</p>
              </div>
              <div>
                <h2 style={{ fontSize: "4rem" }}>{engine.reference}</h2>
              </div>
            </div>
            <div className="engine-details__infos-container">
              <div>
                <p>{engine.description}</p>
              </div>
              <div className="engine-details__availability-price-container">
                <span className="engine-details__availability">
                  {engine.availability ? (
                    <Badge
                      key={"green"}
                      color={"green"}
                      text={
                        <span className="engine-details__availability--text">
                          Available
                        </span>
                      }
                    />
                  ) : (
                    <Badge
                      key={"red"}
                      color={"red"}
                      text={
                        <span className="engine-details__availability--text">
                          Not Available
                        </span>
                      }
                    />
                  )}
                </span>
                <span className="engine-details__price">{engine.price}€</span>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className="engine-details__rent-bouton-container">
            <button className="engine-details__rent-btn">Louez</button>
          </div>
        </Col>
      </Row>
      <Row></Row>
    </>
  ) : (
    "Chargement..."
  );
};

export default EngineDetails;
