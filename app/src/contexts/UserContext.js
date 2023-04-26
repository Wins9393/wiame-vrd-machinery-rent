import { createContext, useState } from "react";

const UserContext = createContext({});

const Provider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
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
      getUser(data.token);

      sessionStorage.setItem("toto", data.token);
      setIsConnected(true);
      setUserId(data.token);
    } else {
      setIsConnected(false);
      setUserId(null);
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

  const getUser = async (token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/verify-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );
    const data = await response.json();
    setUser(data);

    console.log(data);
  };

  const logout = () => {
    setIsConnected(false);
    setUserId(null);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        getUser,
        user,
        verifyCredentials,
        createUser,
        isConnected,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { Provider };
export default UserContext;
