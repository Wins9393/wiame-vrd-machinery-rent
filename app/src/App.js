import "./App.css";
import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import LoginPage from "./containers/login-page/LoginPage";
import Home from "./containers/home/Home";

function App() {
  const { isConnected } = useContext(UserContext);

  return isConnected ? (
    <div className="App">
      <Home />
    </div>
  ) : (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
