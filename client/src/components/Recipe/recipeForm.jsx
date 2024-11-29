import "../../pages/PersonalInfo/style.css";
import "./style.css";
import { useState } from "react";
// import { useFetch } from "../../hooks/fetch.jsx";
import ZutatenForm from "./selectIngredients.jsx";
import UploadImage from "../UploadImage/index.jsx";

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
  const [imgUrl, setImgUrl] = useState({});
  const [ingredientsArr, setIngredientsArr] = useState([
    { ingredient: "", quantity: "", unit: "" },
  ]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    console.log("ww", e.target);

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

  console.log(formData);

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
  return (
    <div className="form-container">
      <h1>Neues Rezept erstellen</h1>
      <form onSubmit={handleSubmit}>
        <label>Rezepttitel</label>
        <input
          placeholder="Wie heißt dein Rezept"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
        />
        <label>Aufwand</label>
        <input
          type="radio"
          name="difficulty_level"
          value="einfach"
          onChange={handleFormChange}
          id="einfach"
        />
        <label htmlFor="einfach">Einfach</label>
        <input
          type="radio"
          name="difficulty_level"
          value="mittel"
          onChange={handleFormChange}
          id="mittel"
        />
        <label htmlFor="mittel">Mittel</label>
        <input
          type="radio"
          name="difficulty_level"
          value="schwer"
          onChange={handleFormChange}
          id="schwer"
        />
        <label htmlFor="schwer">Schwer</label>
        <label htmlFor="portions">Portionsgröße:</label>
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, portions: prev.portions - 1 }))
          }
        >
          -
        </button>
        <span>Für {formData.portions} Portionen</span>
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, portions: prev.portions + 1 }))
          }
        >
          +
        </button>
        <div className="ingredients-container">
          <h3 className="ingredients-header">Zutaten</h3>
          <ZutatenForm
            dataArray={ingredientsArr}
            setDataArray={setIngredientsArr}
            route="ingredients"
            hasIngredients={true}
          />{" "}
        </div>
        <label htmlFor="description">Zubereitung</label>
        <textarea
          placeholder="- schritt 1
                      -schritt2"
          name="description"
          value={formData.description}
          onChange={handleFormChange}
        />
        <label htmlFor="preparationTime">Vorbereitungszeit </label>
        <input
          type="number"
          name="preparation_time_hours"
          placeholder="Stunden"
          value={formData.preparation_time_hours}
          onChange={handleFormChange}
          min="0"
          max="24"
          style={{ width: "80px" }}
          onKeyDown={(e) => e.preventDefault()}
        />
        <span>Stunden</span>
        <input
          type="number"
          name="preparation_time_minutes"
          placeholder="Minuten"
          value={formData.preparation_time_minutes}
          onChange={handleFormChange}
          min="0"
          max="59"
          style={{ width: "80px" }}
          onKeyDown={(e) => e.preventDefault()}
        />{" "}
        <span>Minuten</span>
        <label htmlFor="preparationTime">Koch-/Backzeit </label>
        <input
          type="number"
          min="0"
          max="24"
          name="cooking_time_hours"
          placeholder="Stunden"
          value={formData.cooking_time_hours}
          onChange={handleFormChange}
          style={{ width: "80px" }}
          onKeyDown={(e) => e.preventDefault()}
        />
        <span>Stunden</span>
        <input
          type="number"
          name="cooking_time_minutes"
          placeholder="Minuten"
          value={formData.cooking_time_minutes}
          onChange={handleFormChange}
          style={{ width: "80px" }}
          min="0"
          max="59"
          onKeyDown={(e) => e.preventDefault()}
        />
        <span>Minuten</span>
        <ZutatenForm
          dataArray={diet}
          setDataArray={setDiet}
          route="diets"
          hasIngredients={true}
        />
        <ZutatenForm
          dataArray={categoriesData}
          setDataArray={setCategoriesData}
          route="categories"
          hasIngredients={false}
        />
        <label htmlFor="imageFile">Rezeptbild</label>
        <UploadImage imageUrl={imgUrl} setImageUrl={setImgUrl} />
        {/* <Link to={`/recipeDetails/${recipeID}`}> */}
        <button type="submit">Rezept hinzufügen</button>
        {/* </Link> */}
      </form>
    </div>
  );
}
