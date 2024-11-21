import RecipeForm from "../../components/Recipe/recipeForm.jsx";
import { useFetch } from "../../hooks/fetch.jsx";

export default function Recipe() {
  const API_URL = import.meta.env.VITE_API_URL;

  const { fetchData } = useFetch();

  const onFormSubmit = async (formData) => {
    console.log("Form Data:", formData);

    try {
      const response = await fetchData(`${API_URL}/recipes`, "POST", formData);
      console.log("formData:", formData);

      console.error("Keine gültige Recipe-ID erhalten.");

      console.log("Rezept erfolgreich erstellt:", response);
    } catch (error) {
      console.error("Fehler beim Erstellen des Rezepts:", error);
    }
  };
  // if (userData) {
  //   return <Navigate to="/home" />;
  // }

  return (
    <>
      <h2>Neues Rezept erstellen</h2>
      <div>
        <RecipeForm onFormSubmit={onFormSubmit} />
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
