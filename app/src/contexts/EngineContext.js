import { createContext, useState } from "react";

const EngineContext = createContext({});

const Provider = ({ children }) => {
  const [engines, setEngines] = useState([]);
  const [engine, setEngine] = useState({});

  const getAllEngines = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/engines`);
    const data = await response.json();

    setEngines(data);
  };

  const getOneEngine = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/engine/${id}`
    );
    const data = await response.json();

    setEngine(data);
  };

  return (
    <EngineContext.Provider
      value={{ getAllEngines, engines, getOneEngine, engine }}
    >
      {children}
    </EngineContext.Provider>
  );
};

export { Provider };
export default EngineContext;
