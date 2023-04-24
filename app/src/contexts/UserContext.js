import { createContext, useState } from "react";

const UserContext = createContext({});

const Provider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  const verifyCredentials = async (email, password) => {
    console.log("email: ", email, "password :", password);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("toto", data.token);
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  };

  const createUser = async (infosUser) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: infosUser.firstName,
        lastName: infosUser.lastName,
        email: infosUser.email,
        password: infosUser.password,
      }),
    });
    const data = await response.json();

    console.log(data);
  };

  return (
    <UserContext.Provider
      value={{ user, verifyCredentials, createUser, isConnected }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { Provider };
export default UserContext;
