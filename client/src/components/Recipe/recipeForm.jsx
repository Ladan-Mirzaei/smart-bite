// import "../../pages/PersonalInfo/style.css";
import "./RecipeForm.css";
import { useState } from "react";
// import { useFetch } from "../../hooks/fetch.jsx";
import ZutatenForm from "../Select/selectIngredients.jsx";
import UploadImage from "../UploadImage/index.jsx";
import SelectMulti from "../Select/selectMulti.jsx";
import SelectSingel from "../Select/selectSingel.jsx";

export default function Recipe({ onFormSubmit }) {
  // const { fetchData } = useFetch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    preparation_time: 0,
    preparation_time_hours: 0,
    preparation_time_minutes: 0,
    cooking_time_hours: 0,
    cooking_time_minutes: 0,
    cooking_time: 0,
    portions: 1,
    difficulty_level: "",
    instructions: "",
    category_id: null,
    ingredients: [],
    diet_types: [],
  });

  const [categoriesData, setCategoriesData] = useState(null);
  const [diet, setDiet] = useState([]);
  const [imgUrl, setImgUrl] = useState();
  const submitButtonDisabled = !imgUrl;
  const [ingredientsArr, setIngredientsArr] = useState([
    { ingredient: "", quantity: "", unit: "" },
  ]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (
        name === "preparation_time_hours" ||
        name === "preparation_time_minutes"
      ) {
        const hours = parseInt(updatedData.preparation_time_hours) || 0;
        const minutes = parseInt(updatedData.preparation_time_minutes) || 0;
        updatedData.preparation_time = hours * 60 + minutes;
      }

      if (name === "cooking_time_hours" || name === "cooking_time_minutes") {
        const hours = parseInt(updatedData.cooking_time_hours) || 0;
        const minutes = parseInt(updatedData.cooking_time_minutes) || 0;
        updatedData.cooking_time = hours * 60 + minutes;
      }

      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      ingredients: ingredientsArr.map((item) => ({
        ingredient_id: item.ingredient,
        quantity: item.quantity || 0,
        unit: item.unit || "",
      })),
      diet_types: diet ? diet : [],
      category_id: categoriesData || null,
      image_url: imgUrl, //wichtig füt register form
    };
    onFormSubmit(finalData);
    console.log("finalData", finalData);
  };
  console.log("imageURL", imgUrl);

  return (
    <div className="recipeform-container">
      <form id="recipeForm" onSubmit={handleSubmit}>
        {/* Rezeptname */}
        <label htmlFor="recipeName">Rezeptname*</label>
        <input
          placeholder="Wie heißt dein Rezept? "
          type="text"
          id="recipeName"
          name="title"
          className="recipeform-input-field"
          value={formData.title}
          onChange={handleFormChange}
          required
        />
        {/* Schwierigkeitsgrad */}
        <div className="recipeform-radio-group">
          <label>Schwierigkeitsgrad:*</label>

          {["einfach", "mittel", "schwer"].map((level) => (
            <label key={level} className="recipeform-radio-label">
              <input
                className="recipeform-radio-btn"
                type="radio"
                name="difficulty_level"
                value={level}
                onChange={handleFormChange}
                required
              />
              {level}
            </label>
          ))}
        </div>
        {/* Portionen */}
        <div className="recipeform-portion-group">
          <label htmlFor="portions">Das Rezept ist ausgelegt für:</label>
          <button
            type="button"
            className="recipeform-btn-minus"
            onClick={() =>
              formData.portions > 0 &&
              setFormData((prev) => ({
                ...prev,
                portions: prev.portions - 1,
              }))
            }
          >
            -
          </button>
          <span> {formData.portions} Personen / Portionen:</span>
          <button
            type="button"
            className="recipeform-btn-plus"
            onClick={() =>
              setFormData((prev) => ({ ...prev, portions: prev.portions + 1 }))
            }
          >
            +
          </button>
        </div>
        {/* Zutaten */}
        <div className="recipeform-ingredients-container">
          <h3>Zutaten und Mengenangaben*</h3>
          <ZutatenForm
            dataArray={ingredientsArr}
            setDataArray={setIngredientsArr}
            route="ingredients"
            hasIngredients={true}
          />
        </div>
        {/* Zubereitung */}
        <label htmlFor="description">Rezeptzubereitung*</label>
        <textarea
          placeholder="Hier kannst du die Schritte für die Zubereitung deines Rezepts eintragen."
          name="description"
          value={formData.description}
          className="recipeform-textarea"
          onChange={handleFormChange}
          required
        />
        {/* Zeiten */}
        <label>Vorbereitungszeit </label>
        <div className="recipeform-time-inputs">
          <input
            type="number"
            name="preparation_time_hours"
            placeholder="Stunden"
            value={formData.preparation_time_hours}
            onChange={handleFormChange}
            min="0"
            max="24"
            onKeyDown={(e) => e.preventDefault()}
            className="recipeform-input-field-time"
          />
          <span>Stunden</span>
          <input
            type="number"
            className="recipeform-input-field-time"
            name="preparation_time_minutes"
            placeholder="Minuten"
            value={formData.preparation_time_minutes}
            onChange={handleFormChange}
            min="0"
            max="59"
            onKeyDown={(e) => e.preventDefault()}
          />
          <span>Minuten</span>
        </div>
        <label style={{ marginRight: "10px" }}>Koch-/Backzeit*</label>
        <div className="recipeform-time-inputs">
          <input
            type="number"
            min="0"
            max="24"
            name="cooking_time_hours"
            placeholder="Stunden"
            value={formData.cooking_time_hours}
            onChange={handleFormChange}
            onKeyDown={(e) => e.preventDefault()}
            className="recipeform-input-field-time"
          />
          <span>Stunden</span>
          <input
            type="number"
            name="cooking_time_minutes"
            placeholder="Minuten"
            value={formData.cooking_time_minutes}
            onChange={handleFormChange}
            min="0"
            max="59"
            onKeyDown={(e) => e.preventDefault()}
            className="recipeform-input-field-time"
          />
          <span>Minuten</span>
        </div>
        <br />
        <label>
          {" "}
          Bitte wähle aus, welche Ernährungsweise deinem Rezept zugeordnet
          werden sollen.*
        </label>
        <SelectMulti
          setDataArray={setDiet}
          route="diets"
          placeholder="Ernährungsform
 auswählen"
        />{" "}
        <br />
        <span>
          Bitte wähle aus, welche Kategorien deinem Rezept zugeordnet werden
          sollen.
        </span>
        <SelectSingel
          dataArray={categoriesData}
          setDataArray={setCategoriesData}
          route="categories"
          hasIngredients={false}
        />{" "}
        <br />
        <label htmlFor="imageFile">
          Wähle die passende Datei auf deiner Festplatte aus.
        </label>
        <br />
        <br />
        <div className="recipeform-uploadImage">
          <UploadImage setImageUrl={setImgUrl} />
        </div>
        <button
          disabled={submitButtonDisabled}
          type="submit"
          className="recipeform-btn-submit"
        >
          Rezept hinzufügen
        </button>
      </form>
    </div>
  );
}
