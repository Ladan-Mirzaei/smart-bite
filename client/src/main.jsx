import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
// import Recipe from "./pages/recipe/index.jsx";
import RecipeAll from "./pages/recipe/recipeAll.jsx";
import Allergen from "./pages/PersonalInfo/allergenInfo.jsx";
import Login from "./components/authentication/Login.jsx";
import Register from "./components/authentication/Register.jsx";
import Logout from "./components/authentication/Logout.jsx";
import Profile from "./pages/Profile/index.jsx";
import RecipeForm from "./pages/recipe/recipeform.jsx";
import { RequireAuth } from "./context/RequireAuth";
import { AuthProvider } from "./context/AuthContext";
import RecipeDetails from "./pages/recipe/recipeDetails.jsx";
import Upload from "./pages/Image/index.jsx";
import Select from "./components/Recipe/selectIngredients.jsx";
import BMI from "./components/BMI/BMI-Calculator.jsx";
import Scanner from "./pages/Scanner/index.jsx";
import Sammlung from "./pages/Sammlung/inden.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allergene",
        element: <Allergen />,
      },
      {
        path: "/BMI",
        element: <BMI />,
      },
      {
        path: "/sammlung",
        element: <Sammlung />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/recipeform",
        element: <RecipeForm />,
      },
      {
        path: "/recipeDetails/:id",
        element: <RecipeDetails />,
      },
      {
        path: "/select",
        element: <Select />,
      },
      {
        path: "/Upload",
        element: <Upload />,
      },
      // {
      //   path: "/recipe",
      //   element: (
      //     <RequireAuth>
      //       <Recipe />
      //     </RequireAuth>
      //   ),
      // },
      {
        path: "/recipeAll",
        element: <RecipeAll />,
      },
      // {
      //   path: "/profile",
      //   element: (
      //     // <RequireAuth>
      //     <Profile />
      //     // </RequireAuth>
      //   ),
      // },
      // {
      //   path: "/recipe",
      //   element: (
      //     <RequireAuth>
      //       <Recipe />
      //     </RequireAuth>
      //   ),
      // },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      { path: "scanner", element: <Scanner /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>{" "}
  </React.StrictMode>
);
