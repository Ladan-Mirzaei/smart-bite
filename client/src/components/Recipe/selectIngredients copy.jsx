import Select from "react-select";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";

export function ZutatenForm() {
  const { fetchData } = useFetch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    preparation_time: null,
    cooking_time: null,
    portions: null,
    category_id: null,
    difficulty_level: "",
    instructions: "",
    diet_type: "",
  });
  const [ingredientsData, setIngredientsData] = useState([]);

  const [categoriesData, setCategoriesData] = useState([]);
  let API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function loadFetch() {
      const categories = await fetchData(`${API_URL}/categories`);
      setCategoriesData(categories);
      const ingredients = await fetchData(`${API_URL}/ingredients`);
      setIngredientsData(ingredients);
    }
    loadFetch();
  }, [fetchData]);
  // ---------------------------
  const [ingredients, setIngredients] = useState([
    { ingredient: "", quantity: "", unit: "" },
  ]);
  const [newIngredient, setNewIngredient] = useState({
    ingredient: "",
    quantity: "",
    unit: "",
  });
  const handleFormChangeCat = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      category_id: e.value,
    }));
  };
  console.log(formData);
  const handleAddIngredient = (ingredient, quantity, unit) => {
    setIngredients([...ingredients, { ingredient, quantity, unit }]);
    console.log(ingredients);
    console.log("quantity", quantity);

    setNewIngredient({ ingredient: "", quantity: "", unit: "" });
  };
  console.log(ingredients);
  const handleRemoveIngredient = (array, index) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setIngredients(newArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(ingredients);
    alert("Rezept gespeichert");
  };
  console.log("itge", ingredients);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Zutaten hinzufügen</h1>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient-row">
          <div>{ingredient.quantity}</div>
          <Select
            className="basic-single"
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
            onChange={(e) =>
              setNewIngredient({
                ...newIngredient,
                ingredient: e.target.value,
              })
            }
          />

          <input
            type="number"
            value={ingredient.quantity}
            onChange={(e) =>
              setNewIngredient({
                ...newIngredient,
                quantity: e.target.value,
              })
            }
            placeholder="Menge"
            required
          />
          <select
            value={ingredient.unit}
            onChange={(e) =>
              setNewIngredient({
                ...newIngredient,
                unit: e.target.value,
              })
            }
            required
          >
            <option value="" disabled>
              Einheit
            </option>
            <option value="g">g</option>
            <option value="ml">ml</option>
            <option value="stk">Stück</option>
          </select>
          {ingredients.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => handleRemoveIngredient(ingredients, index)}
              >
                -
              </button>
            </>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          handleAddIngredient(
            ingredients.ingredient,
            ingredients.quantity,
            ingredients.unit
          )
        }
        style={{ marginTop: "10px" }}
      >
        +
      </button>

      <Select
        className="basic-single"
        classNamePrefix="select"
        isClearable="true"
        isSearchable="true"
        placeholder="Kategorie auswählen"
        name="category_id"
        options={
          Array.isArray(categoriesData)
            ? categoriesData.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))
            : []
        }
        onChange={handleFormChangeCat}
      />
      <button type="submit">Rezept speichern</button>
    </form>
  );
}

export default ZutatenForm;

{
  /* <select
name={`ingredients_select_${index}`}
value={ingredients.ingredient}
onChange={(e) =>
  setNewIngredient({
    ...newIngredient,
    ingredient: e.target.value,
  })
}
>
<option value="">Zutat auswählen</option>
<option value="mehl">Mehl</option>
<option value="zucker">Zucker</option>
<option value="milch">Milch</option>
<option value="eier">Eier</option>
</select> */
}
