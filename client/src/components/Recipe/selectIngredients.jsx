import Select from "react-select";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export function ZutatenForm() {
  const { fetchData } = useFetch();
  const [ingredientsData, setIngredientsData] = useState([]);
  const [ingredientsArr, setIngredientsArr] = useState([{ ingredient: "" }]);
  const [ingredientObj, setIngredientObj] = useState({ ingredient: "" });

  // *** Daten für Kategorien und Zutaten laden ***
  useEffect(() => {
    async function loadFetch() {
      const data = await fetchData(`${API_URL}/ingredients`);
      setIngredientsData(data);
    }
    loadFetch();
  }, []);
  // ---------------------------

  useEffect(() => {
    console.debug("useEffect after ingredientObj has changed");
  }, [ingredientObj]);

  const handleAddIngredient = () => {
    setIngredientsArr([
      ...ingredientsArr,
      { ingredient: ingredientObj.ingredient },
    ]);
    setIngredientObj({ ingredient: "" });
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
      <div>{JSON.stringify(ingredientsArr)}</div>
      {ingredientsArr.map((ingredient, index) => (
        <div key={index} className="ingredient-row">
          <Select
            className="basic-single"
            // defaultInputValue={JSON.stringify(ingredient)}
            // value={ingredient.ingredient}
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
              console.log("--> obj", ingredientObj, "target value", e);
              console.log("--> Value:", e.value);
              setIngredientObj({
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
