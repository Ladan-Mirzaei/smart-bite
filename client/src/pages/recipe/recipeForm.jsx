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
        body: JSON.stringify({ ...finalData }),
      });
      if (!response.ok) {
        console.error("Data fetching error");
      }
      const data = await response.json();
      setRecipeID(data);
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
      <div className="       personal-container">
        <h2>Neues Rezept erstellen</h2>
        <RecipeForm onFormSubmit={onFormSubmit} recipeID={recipeID} />
      </div>
    </>
  );
}
