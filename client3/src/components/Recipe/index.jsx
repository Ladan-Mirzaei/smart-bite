import { useState, useEffect, useContext } from "react";
import "../../pages/PersonalInfo/style.css";
import { AuthContext } from "../../context/AuthContext.jsx";
import Select from "react-select";
import "../../pages/PersonalInfo/style.css";
import { useFetch } from "../../hooks/fetch.jsx";

export default function UserProfileForm({ recipeFetch }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    preparationTime: "",
    cookingTime: "",
    portions: "",
    categoryId: "",
    difficultyLevel: "",
    instructions: "",
    diet_type: "",
    quantity: "",
    unit: "",
  });
  const [selectIngredient, setSelectIngredient] = useState({
    recipeId: "",
    ingredientId: [],
    quantity: "",
    unit: "",
  });

  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const { user } = useContext(AuthContext);

  let API_URL = import.meta.env.VITE_API_URL;
  const { data, isLoading } = useFetch(`${API_URL}/categories`);
  const { data, isLoading } = useFetch(`${API_URL}/ingredients`);

  useEffect(() => {
    if (data) {
      setCategories(data.newCategory);
    }
  }, [data]);

  console.log("data von rezept", data);
  console.log("categories ", categories);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const responseCat = await fetch(`${API_URL}/categories`);
  //       const responseIng = await fetch(`${API_URL}/ingredients`);

  //       if (!responseCat.ok && !responseIng.ok) {
  //         throw new Error("Failed to fetch Categories or ingredients");
  //       }
  //       const dataCat = data;
  //       console.log("dataCat von rezept2", dataCat);

  //       const dataIng = await responseIng.json();
  //       // console.log(dataIng);

  //       setCategories(data.newCategory || []);
  //       setIngredients(dataIng.newIngredient || []);
  //       console.log(categories);
  //     } catch (error) {
  //       console.error("Error fetching Categories or ingredients:", error);
  //     }
  //   };

  //   fetchData();
  // });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log("diet_type", formData.diet_type);

    console.log("formData in formcahnge", formData);
  };

  const handleIngredientChange = (event) => {
    console.log(event);
    // (2) [{…}, {…}]
    // 0: {value: 2, label: 'Gurke'}
    const ingredientId = event ? event.map((item) => item.value) : [];
    setSelectIngredient((prevData) => ({
      ...prevData,
      ingredientId: ingredientId,
    }));
    console.log("SelectIngredient", selectIngredient);
  };
  // const handelAmountChange = (event) => {
  //   const { name, value } = event.target;
  //   setSelectIngredient((prev) => ({ ...prev, [name]: value }));
  //   console.log("SelectIngredient", selectIngredient);
  // };
  const handleCategoryChange = (e) => {
    const categoryId = e ? e.value : ""; // Directly get selected value
    setFormData((prevData) => ({ ...prevData, categoryId }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    recipeFetch(formData);
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
          required
        />
        <br />
        <label htmlFor="description">Beschreibung:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          required
        />
        <br />
        <label htmlFor="preparationTime">Vorbereitungszeit (Minuten):</label>
        <input
          type="number"
          name="preparationTime"
          value={formData.preparationTime}
          onChange={handleFormChange}
          required
        />
        <br />
        <label htmlFor="cookingTime">Kochzeit (Minuten):</label>
        <input
          type="number"
          name="cookingTime"
          value={formData.cookingTime}
          onChange={handleFormChange}
          required
        />
        <br />
        <label htmlFor="portions">Portionen:</label>
        <input
          type="number"
          name="portions"
          value={formData.portions}
          onChange={handleFormChange}
          required
        />
        <br />
        <label htmlFor="category">Kategorie:</label>
        <Select
          placeholder="Kategorie auswählen"
          name="category"
          options={categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          className="basic-single"
          classNamePrefix="select"
          isSearchable={true} // Ermöglicht die Suche innerhalb der Auswahl
          onChange={handleCategoryChange}
        />
        <br />
        <label htmlFor="difficultyLevel">Schwierigkeitsgrad:</label>
        <select
          name="difficultyLevel"
          value={formData.difficultyLevel}
          onChange={handleFormChange}
          required
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
          required
        />
        <br />
        <h3>Zutaten</h3>
        <label htmlFor="ingredient_id">Zutat:</label>[
        {/* { value: 1, label: 'Salz' },
  { value: 2, label: 'Pfeffer' } */}
        ]
        <Select
          placeholder="Zutaten auswählen"
          isMulti
          name="ingredients"
          options={ingredients.map((ing) => ({
            value: ing.id,
            label: ing.name,
          }))}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleIngredientChange}
        />
        <label htmlFor="quantity">Menge:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Menge (z.B. 100)"
          onChange={handleFormChange}
          required
        />
        <br />
        <label htmlFor="unit">Einheit:</label>
        <select id="unit" name="unit" onChange={handleFormChange} required>
          <option value="">Einheit auswählen</option>
          <option value="g">Gramm (g)</option>
          <option value="kg">Kilogramm (kg)</option>
          <option value="ml">Milliliter (ml)</option>
          <option value="l">Liter (l)</option>
          <option value="stueck">Stück</option>
          <option value="prise">Prise</option>
          <option value="tl">Teelöffel (TL)</option>
          <option value="el">Esslöffel (EL)</option>
          <option value="bund">Bund</option>
          <option value="scheibe">Scheibe</option>
          <option value="zehe">Zehe</option>
        </select>
        <label htmlFor="diet_type">Diät-Typ:</label>
        <select
          name="diet_type"
          value={formData.diet_type}
          onChange={handleFormChange}
          required
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
