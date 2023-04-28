import { createContext, useContext, useState } from "react";
import UserContext from "./UserContext";

const EngineContext = createContext({});

const Provider = ({ children }) => {
  const [engines, setEngines] = useState([]);
  const [engine, setEngine] = useState({});

  const { userId } = useContext(UserContext);

  const getAllEngines = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/engines`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userId}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setEngines(data);
  };

  const getOneEngine = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/engine/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userId}`,
          "Content-Type": "application/json",
        },
      }
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
