import "./App.css";
import { useContext, useEffect } from "react";
import UserContext from "./contexts/UserContext";
import LoginPage from "./containers/login-page/LoginPage";
import Home from "./containers/home/Home";
import Navbar from "./components/navbar/Navbar";

function App() {
  const { isConnected, getUser, userId, getToken } = useContext(UserContext);

  useEffect(() => {
    getUser(getToken());
  }, [userId]);

  return isConnected ? (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  ) : (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
