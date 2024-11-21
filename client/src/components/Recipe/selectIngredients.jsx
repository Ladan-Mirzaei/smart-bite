import Select from "react-select";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export function ZutatenForm() {
  const { fetchData } = useFetch();
  const [ingredientsData, setIngredientsData] = useState([]);
  const [ingredientsArr, setIngredientsArr] = useState([{ ingredient: "" }]);

  // *** Daten für Kategorien und Zutaten laden ***
  useEffect(() => {
    async function loadFetch() {
      const data = await fetchData(`${API_URL}/ingredients`);
      setIngredientsData(data);
    }
    loadFetch();
  }, []);
  // ---------------------------

  const handleOnSelectIngredient = (selectedIndex, ingredientId) => {
    setIngredientsArr((prev) =>
      prev.map((item, index) =>
        selectedIndex === index ? { ingredient: ingredientId } : item
      )
    );
  };

  const handleAddIngredient = () => {
    setIngredientsArr((prev) => [...prev, { ingredient: "" }]);
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

  const options = Array.isArray(ingredientsData)
    ? ingredientsData.map((ing) => ({
        value: ing.id,
        label: ing.name,
      }))
    : [];

  return (
    <form onSubmit={handleSubmit}>
      <h1>Zutaten hinzufügen</h1>
      <div>{JSON.stringify(ingredientsArr)}</div>
      {ingredientsArr.map((ingredient, index) => (
        <div key={index} className="ingredient-row">
          <Select
            defaultInputValue={ingredient.ingredient}
            className="basic-single"
            classNamePrefix="select"
            isClearable="true"
            isSearchable="true"
            placeholder="Zutate auswählen"
            name={`ingredients_select_${index}`}
            options={options}
            onChange={(e) => handleOnSelectIngredient(index, e.value)}
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
