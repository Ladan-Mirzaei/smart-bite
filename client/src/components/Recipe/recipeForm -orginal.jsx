import Select from "react-select";
import "../../pages/PersonalInfo/style.css";
import "./style.css";

import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import ZutatenForm from "./selectIngredients.jsx";

export default function Recipe({ onFormSubmit }) {
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
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientDetails, setIngredientDetails] = useState({});
  const [categoriesData, setCategoriesData] = useState([]);
  // const [ingredientsData, setIngredientsData] = useState([]);
  const [ingredientsArr, setIngredientsArr] = useState([
    { ingredient: "", quantity: "", unit: "" },
  ]);

  let API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function loadFetch() {
      const categories = await fetchData(`${API_URL}/categories`);
      const ingredients = await fetchData(`${API_URL}/ingredients`);
      setCategoriesData(categories);
      setIngredientsData(ingredients);
    }
    loadFetch();
  }, [fetchData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormChangeCat = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      category_id: selectedOption.value,
    }));
  };

  const handleIngredientChange = (event) => {
    const ingredientIds = event.map((item) => item.value);
    setSelectedIngredients(ingredientIds);
  };

  const handleDetailChange = (ingredientId, field, value) => {
    setIngredientDetails((prevDetails) => ({
      ...prevDetails,
      [ingredientId]: {
        ...prevDetails[ingredientId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      ingredients: selectedIngredients.map((id) => ({
        id,
        quantity: ingredientDetails[id]?.quantity || 0,
        unit: ingredientDetails[id]?.unit || "",
      })),
    };
    onFormSubmit(finalData);
  };

  return (
    <div className="form-container">
      <h1>Neues Rezept erstellen</h1>
      <form onSubmit={handleSubmit}>
        <label>Titel:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
        />
        <br />
        <label htmlFor="description">Beschreibung:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleFormChange}
        />
        <br />
        <label htmlFor="preparationTime">Vorbereitungszeit (Minuten):</label>
        <input
          type="number"
          name="preparation_time"
          value={formData.preparation_time}
          onChange={handleFormChange}
        />
        <br />
        <label htmlFor="cookingTime">Kochzeit (Minuten):</label>
        <input
          type="number"
          name="cooking_time"
          value={formData.cooking_time}
          onChange={handleFormChange}
        />
        <br />
        <label htmlFor="portions">Portionen:</label>
        <input
          type="number"
          name="portions"
          value={formData.portions}
          onChange={handleFormChange}
        />
        <Select
          placeholder="Kategorie auswählen"
          name="category_id"
          value={categoriesData.find((cat) => cat.id === formData.category_id)}
          options={
            Array.isArray(categoriesData)
              ? categoriesData.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                }))
              : []
          }
          className="basic-single"
          classNamePrefix="select"
          isSearchable={true}
          onChange={handleFormChangeCat}
        />
        <label htmlFor="difficultyLevel">Schwierigkeitsgrad:</label>
        <select
          name="difficulty_level"
          value={formData.difficulty_level}
          onChange={handleFormChange}
        >
          <option value="">Schwierigkeitsgrad auswählen</option>
          <option value="einfach">Einfach</option>
          <option value="mittel">Mittel</option>
          <option value="schwer">Schwer</option>
        </select>
        <br />
        <label htmlFor="instructions">Anleitung:</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleFormChange}
        />
        <div className="ingredients-container">
          <h3 className="ingredients-header">Zutaten</h3>
          <ZutatenForm
            dataArray={ingredientsArr}
            setDataArray={setIngredientsArr}
            fetchedData={ingredientsData}
            setFetchedData={setIngredientsData}
            route="ingredients"
            hasQuantity={true}
            hasUnit={true}
          />{" "}
        </div>
        <label htmlFor="diet_type">Diät-Typ:</label>
        <select
          name="diet_type"
          value={formData.diet_type}
          onChange={handleFormChange}
        >
          <option value="">Diät-Typ auswählen</option>
          <option value="1">Vegan</option>
          <option value="2">Vegetarisch</option>
          <option value="3">Glutenfrei</option>
          <option value="4">Keto</option>
          <option value="5">Paleo</option>
          <option value="6">Low-Carb</option>
          <option value="7">Pescatarian</option>
          <option value="8">Dairy-Free</option>
          <option value="9">Fleisch</option>
          <option value="10">Fisch</option>
        </select>
        <br />
        <label htmlFor="imageFile">Upload a photo:</label>
        <input type="file" id="imageFile" capture="user" accept="image/*" />
        <br />
        <button type="submit">Rezept hinzufügen</button>
      </form>
    </div>
  );
}
