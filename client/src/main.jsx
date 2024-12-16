import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
// import Recipe from "./pages/recipe/index.jsx";
import RecipeAll from "./pages/recipe/recipeAll.jsx";
import Allergen from "./pages/UserInfo/AllergyInfo.jsx";
import UserInfo from "./pages/UserInfo/index.jsx";

import Login from "./pages/Login/Login.jsx";
import Register from "./Pages/Register/index.jsx";
import Profile from "./pages/Profile/index.jsx";
import EditForm from "./pages/Profile/edit.jsx";
import RecipeForm from "./pages/Recipe/CreateRecipeForm.jsx";
import { RequireAuth } from "./context/RequireAuth";
import { AuthProvider } from "./context/AuthContext";
import RecipeDetails from "./pages/Recipe/recipeDetails.jsx";
import Select from "./components/Select/selectIngredients.jsx";
import BMI from "./pages/BMI/index.jsx";
import Scanner from "./pages/Scanner/index.jsx";
import FavoriteRecipes from "./pages/FavoriteRecipes";
import ShoppingList from "./components/Calendar/shoppingList.jsx";
import UserDietInfo from "./pages/UserDietInfo/UserDietInfo.jsx";
import BScanner from "./pages/BarcodeRecipe/Bscanner.jsx";
import ApiFood from "./pages/Scanner/food.jsx";
import AuthLayout from "./AuthLayout.jsx";
import StepperLayout from "./pages/StepperLayout";
import UpdateRecipeForm from "./pages/Recipe/UpdateRecipeForm.jsx";
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
        path: "/food",
        element: <ApiFood />,
      },

      {
        path: "/bscanner",
        element: <BScanner />,
      },

      {
        path: "/editForm",
        element: <EditForm />,
      },

      {
        path: "/BMI",
        element: <BMI />,
      },
      {
        path: "/meine-favoriten",
        element: <FavoriteRecipes />,
      },

      {
        path: "/recipeform",
        element: <RecipeForm />,
      },
      {
        path: "/recipedetails/:id",
        element: <RecipeDetails />,
      },
      {
        path: "/userDietInfo",
        element: <UserDietInfo />,
      },
      {
        path: "/select",
        element: <Select />,
      },

      {
        path: "/edit-recipeform/:id",
        element: <UpdateRecipeForm />,
      },
      {
        path: "/recipeAll",
        element: <RecipeAll />,
      },
      {
        path: "/profile",
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
      {
        path: "register",
        element: <StepperLayout />,
        children: [
          {
            index: true,
            element: <Register />,
          },
          {
            path: "userinfo",
            element: <UserInfo />,
          },
          {
            path: "allergene",
            element: <Allergen />,
          },
        ],
      },

      { path: "scanner", element: <Scanner /> },
    ],
  },
  { path: "/ShoppingList", element: <ShoppingList /> },

  {
    path: "login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
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
