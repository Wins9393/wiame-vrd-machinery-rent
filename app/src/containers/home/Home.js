import { useContext, useEffect } from "react";
import EngineContext from "../../contexts/EngineContext";
import Engine from "../../components/engine/Engine";
import "./home.css";

const Home = () => {
  const { getAllEngines, engines } = useContext(EngineContext);

  useEffect(() => {
    getAllEngines();
  }, []);

  return engines.length ? (
    <div className="home__engine-container">
      {engines.map((engine) => (
        <Engine engine={engine} />
      ))}
    </div>
  ) : (
    "Chargement..."
  );
};

export default Home;
