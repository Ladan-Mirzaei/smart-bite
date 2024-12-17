import { useState } from "react";
import SelectWithPlus from "../Select/selectWithPlus.jsx";
import SelectSingel from "../Select/selectSingel.jsx";

export default function FilterComponent({ onSubmitFilters, onResetFilters }) {
  const [difficultyData, setDifficultyData] = useState("");
  const [dietData, setDietData] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [allergenData, setAllergenData] = useState([]);
  const [categoriesData, setCategoriesData] = useState("");

  const handleDifficultyChange = (e) => {
    setDifficultyData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {
      diet_type_id: dietData || [],
      ingredient_id: ingredientsData || [],
      allergene_id: allergenData || [],
      category_id: categoriesData || null,
      difficulty_level: difficultyData || null,
    };

    onSubmitFilters(filters);
  };

  const resetFilters = () => {
    const resetFilters = {
      diet_type_id: [],
      ingredient_id: [],
      allergene_id: [],
      category_id: "",
      difficulty_level: "",
    };
    onResetFilters(resetFilters);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="filter-group">
        <h3>Rezepte nach Zutaten</h3>
        <ul>
          <li>
            <SelectWithPlus
              dataArray={ingredientsData}
              setDataArray={setIngredientsData}
              route="ingredients"
              placeholder="Zutat auswählen"
            />
          </li>
        </ul>
      </div>
      <div className="filter-group">
        <h3>Ernährungsform auswählen</h3>
        <ul>
          <SelectWithPlus
            dataArray={dietData}
            setDataArray={setDietData}
            route="diets"
            placeholder="Ernährungsform"
          />
        </ul>
      </div>
      <div className="filter-group">
        <h3>Regionale Rezepte</h3>
        <ul style={{ width: "238px" }}>
          <SelectSingel
            dataArray={categoriesData}
            setDataArray={setCategoriesData}
            route="categories"
            hasIngredients={false}
          />
        </ul>
      </div>
      <div className="filter-group">
        <h3>Schwierigkeitsgrad</h3>
        <div className="recipeform-radio-group">
          {["einfach", "mittel", "schwer"].map((level) => (
            <label key={level} className="recipeform-radio-label">
              <input
                className="recipeform-radio-btn"
                type="radio"
                name="difficulty_level"
                value={level}
                onChange={handleDifficultyChange}
              />
              {level}
            </label>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <h3>Allergie</h3>
        <ul>
          <SelectWithPlus
            dataArray={allergenData}
            setDataArray={setAllergenData}
            route="allergene"
            placeholder="Allergie auswählen"
          />
        </ul>
      </div>
      <button type="submit" className="filter-button">
        Rezepte anzeigen
      </button>
      <button type="button" onClick={resetFilters} className="filter-button">
        Filter zurücksetzen
      </button>
    </form>
  );
}
