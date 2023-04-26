import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as UserProvider } from "./contexts/UserContext";
import { Provider as EngineContext } from "./contexts/EngineContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EngineDetails from "./containers/engine-details/EngineDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/engine/:id",
        element: <EngineDetails />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <EngineContext>
        {/* <App /> */}
        <RouterProvider router={router} />
      </EngineContext>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
