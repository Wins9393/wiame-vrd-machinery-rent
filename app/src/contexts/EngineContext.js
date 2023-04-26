import { createContext, useState } from "react";

const EngineContext = createContext({});

const Provider = ({ children }) => {
  const [engines, setEngines] = useState([]);

  const getAllEngines = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/engines`);
    const data = await response.json();

    console.log(data);

    setEngines(data);
  };

  return (
    <EngineContext.Provider value={{ getAllEngines, engines }}>
      {children}
    </EngineContext.Provider>
  );
};

export { Provider };
export default EngineContext;
