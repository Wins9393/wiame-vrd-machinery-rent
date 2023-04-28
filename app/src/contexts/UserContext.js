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

    if (response.ok) {
      verifyCredentials(infosUser.email, infosUser.password);
    }
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

    if (response.ok) {
      const data = await response.json();
      setUser(data);
      setIsConnected(true);
    }
  };

  const getToken = () => {
    if (sessionStorage.getItem("toto")) {
      const token = sessionStorage.getItem("toto");
      setUserId(token);
      return token;
    }
    return;
  };

  const logout = () => {
    sessionStorage.removeItem("toto");
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
        getToken,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { Provider };
export default UserContext;
