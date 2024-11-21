import Select from "react-select";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";

export function ZutatenForm() {
  const { fetchData } = useFetch();

  const [ingredientsData, setIngredientsData] = useState([]);

  const [ingredientsArr, setIngredientsArr] = useState([{ ingredient: "" }]);
  const [ingredientObj, setingredientObj] = useState({
    ingredient: "",
  });

  let API_URL = import.meta.env.VITE_API_URL;

  // *** Daten für Kategorien und Zutaten laden ***
  useEffect(() => {
    async function loadFetch() {
      const data = await fetchData(`${API_URL}/ingredients`);
      setIngredientsData(data);
    }
    loadFetch();
  }, []);
  // ---------------------------

  const handleAddIngredient = () => {
    setIngredientsArr([
      ...ingredientsArr,
      { ingredient: ingredientObj.ingredient },
    ]);

    setingredientObj({ ingredient: "" });
  };

  const handleRemoveIngredient = (array, index) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setIngredientsArr(newArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Rezept gespeichert");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Zutaten hinzufügen</h1>
      {ingredientsArr.map((ingredient, index) => (
        <div key={index} className="ingredient-row">
          <Select
            className="basic-single"
            value={ingredient.ingredient}
            classNamePrefix="select"
            isClearable="true"
            isSearchable="true"
            placeholder="Zutate auswählen"
            name={`ingredients_select_${index}`}
            options={
              Array.isArray(ingredientsData)
                ? ingredientsData.map((ing) => ({
                    value: ing.id,
                    label: ing.name,
                  }))
                : []
            }
            onChange={(e) => {
              console.log("obj", ingredientObj, "target value", e);
              console.log("Value:", e.value);
              setingredientObj({
                ...ingredientObj,
                ingredient: e ? e.value : "",
              });
            }}
          />

          {ingredientsArr.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => handleRemoveIngredient(ingredientsArr, index)}
              >
                -
              </button>
            </>
          )}
        </div>
      ))}
      <button type="button" onClick={() => handleAddIngredient()}>
        +
      </button>

      <button type="submit">Rezept speichern</button>
    </form>
  );
}

export default ZutatenForm;
