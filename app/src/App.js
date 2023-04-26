import "./App.css";
import { useContext, useEffect } from "react";
import UserContext from "./contexts/UserContext";
import LoginPage from "./containers/login-page/LoginPage";
import Home from "./containers/home/Home";
import Navbar from "./components/navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const { isConnected, getUser, userId, getToken } = useContext(UserContext);

  let location = useLocation();

  useEffect(() => {
    getUser(getToken());
    console.log(location);
  }, [userId]);

  return isConnected ? (
    <div className="App">
      <Navbar />
      {location.pathname === "/" ? <Home /> : <Outlet />}
    </div>
  ) : (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
