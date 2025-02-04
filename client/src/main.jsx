import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
// import Recipe from "./pages/recipe/index.jsx";
import RecipeAll from "./pages/Recipes/recipeAll.jsx";
import Allergen from "./pages/UserInfo/AllergyInfo.jsx";
import UserInfo from "./pages/UserInfo/index.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/index.jsx";
import Profile from "./pages/Profile/index.jsx";
import EditForm from "./pages/Profile/edit.jsx";
import RecipeForm from "./pages/Recipes/CreateRecipeForm.jsx";
import { RequireAuth } from "./context/RequireAuth";
import { AuthProvider } from "./context/AuthContext";
import RecipeDetails from "./pages/Recipes/recipeDetails.jsx";
import Select from "./components/Select/selectIngredients.jsx";
import BMI from "./pages/BMI/index.jsx";
import Scanner from "./pages/Scanner/index.jsx";
import FavoriteRecipes from "./pages/FavoriteRecipes";
import ShoppingList from "./components/Calendar/shoppingList.jsx";
import UserDietInfo from "./pages/UserDietInfo/UserDietInfo.jsx";
import RecipeSearch from "./pages/RecipeSearch/RecipeSearch.jsx";
import AuthLayout from "./AuthLayout.jsx";
import StepperLayout from "./pages/StepperLayout";
import UpdateRecipeForm from "./pages/Recipes/UpdateRecipeForm.jsx";
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
        path: "/recipe-search",
        element: <RecipeSearch />,
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
