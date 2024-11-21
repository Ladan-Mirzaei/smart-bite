// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
// import Login from "./components/authentication/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Register from "./components/authentication/Register.jsx";
// import Logout from "./components/authentication/Logout.jsx";
// import { AuthProvider } from "./context/AuthContext"; // AuthProvider
import Recipe from "./components/Recipe";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "login",
      //   element: <Login />,
      // },
      // {
      //   path: "register",
      //   element: <Register />,
      // },
      // {
      //   path: "logout",
      //   element: <Logout />,
      // },
      // {
      //   path: "recipe",
      //   element: <Recipe />,
      // },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    <RouterProvider router={router} />
    {/* </AuthProvider> */}
  </React.StrictMode>
);
