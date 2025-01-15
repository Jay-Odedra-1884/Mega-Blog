import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home /> 
      }
    ]
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </StrictMode>
);
