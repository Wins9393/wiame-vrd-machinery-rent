import "./App.css";
import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import LoginPage from "./containers/login-page/LoginPage";

function App() {
  const { isConnected } = useContext(UserContext);

  return isConnected ? (
    <div className="App">
      <h2>Bienvenue !</h2>
    </div>
  ) : (
    <LoginPage />
  );
}

export default App;
