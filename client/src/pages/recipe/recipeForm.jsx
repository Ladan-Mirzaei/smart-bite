import RecipeForm from "../../components/Recipe/recipeForm.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Recipe() {
  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const [recipeID, setRecipeID] = useState();
  const navigate = useNavigate();
  const onFormSubmit = async (finalData) => {
    if (!user) {
      console.error("User not logged in");
      return;
    }
    const token = await user.getIdToken();
    try {
      const response = await fetch(`${API_URL}/recipes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...finalData, uid: user.uid }),
      });
      if (!response.ok) {
        console.error("Data fetching error");
      }
      const data = await response.json();
      setRecipeID(data);
      console.log("data", data);
      navigate(`/recipeDetails/${data}`);
    } catch (err) {
      console.log(err);
    }
  };
  // if (userData) {
  //   return <Navigate to="/home" />;
  // }
  console.log("data in Form", recipeID);

  return (
    <>
      <h2>Neues Rezept erstellen</h2>
      <div>
        <RecipeForm onFormSubmit={onFormSubmit} recipeID={recipeID} />
      </div>
    </>
  );
}
//
// useEffect(() => {
//   async function fetchRecipes() {
//     const recipeData = await triggerFetch(`${API_URL}/recipes`, "GET");
//     setRecipes(recipeData || []);
//   }

//   fetchRecipes();
// }, []);
//
//   const updatedRecipes = await triggerFetch(`${API_URL}/recipes`, "GET");
//   setRecipes(updatedRecipes || []);
// } catch (error) {
//   console.error("Fehler beim Erstellen des Rezepts:", error);
//   setResponseMessage("Fehler beim Hinzufügen des Rezepts.");
