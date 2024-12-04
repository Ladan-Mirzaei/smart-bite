import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import SelectWithPlus from "../../components/Select/selectWithPlus.jsx";
import ZutatenForm from "../../components/Recipe/selectIngredients.jsx";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Sammlung() {
  const [recipesData, setRecipesData] = useState({});
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;
  const [ingredientsData, setIngredientsData] = useState([]);
  const [allergenData, setAllergenData] = useState([]);
  const [categoriesData, setCategoriesData] = useState("");
  const [dietData, setDietData] = useState([]);
  const [formData, setFormData] = useState();
  const { user } = useContext(AuthContext);
  const [difficultyData, setDifficultyData] = useState("");

  useEffect(() => {
    let finalData = {
      diet_type_id: [],
      ingredient_id: [],
      allergene_id: [],
      difficulty_level: "",
      category_id: "",
    };

    if (formData) {
      finalData = formData;
    }
    console.log("body", user.uid);

    const onSubmit = async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch(`${API_URL}/recipes/recipeFilter`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        });
        if (!response.ok) {
          console.error("Data fetching error");
        }
        const data = await response.json();
        setRecipesData(data);
        finalData = {
          diet_type_id: [],
          ingredient_id: [],
          allergene_id: [],
          difficulty_level: null,
          category_id: null,
        };
      } catch (err) {
        console.log(err);
      }
    };
    onSubmit();
  }, [formData]);
  // useEffect(() => {
  //   onSubmit();
  // }, []);
  const handleDifficultyChange = (e) => {
    setDifficultyData(e.target.value);
    console.log(difficultyData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // const updatedFinalData = {
    //   diet_type_id: dietData || [],
    //   ingredient_id: ingredientsData || [],
    //   allergene_id: allergenData || [],
    // };
    const updatedFinalData = {
      diet_type_id: dietData ? dietData : [],
      ingredient_id: ingredientsData ? ingredientsData : [],
      allergene_id: allergenData ? allergenData : [],
      category_id: categoriesData ? categoriesData : null,
      difficulty_level: difficultyData ? difficultyData : null,
    };

    setFormData(updatedFinalData);

    console.log("Final Form Data:difficultydifficulty", updatedFinalData);
  };
  return (
    <>
      <div className="page-layout">
        <div className="left-side">
          <h2>Filter</h2>
          <form onSubmit={handleSubmit}>
            <div className="filter-group">
              <h3>Rezepte nach Zutat</h3>
              <ul>
                <li>
                  <SelectWithPlus
                    dataArray={ingredientsData}
                    setDataArray={setIngredientsData}
                    route="ingredients"
                    placeholder="a"
                  />
                </li>
              </ul>
            </div>
            <div className="filter-group">
              <h3>Ernährungsform</h3>
              <ul>
                <SelectWithPlus
                  dataArray={dietData}
                  setDataArray={setDietData}
                  route="diets"
                  placeholder="a"
                />
              </ul>
            </div>
            <div className="filter-group">
              <h3>Regionale Rezepte</h3>

              <ul>
                <ZutatenForm
                  dataArray={categoriesData}
                  setDataArray={setCategoriesData}
                  route="categories"
                  hasIngredients={false}
                />
              </ul>
            </div>

            <div className="filter-group">
              <h3>Aufwand</h3>
              <ul>
                <li>
                  <input
                    type="radio"
                    name="difficulty"
                    value="einfach"
                    id="einfach"
                    checked={difficultyData === "einfach"}
                    onChange={handleDifficultyChange}
                  />
                  <label htmlFor="easy">Einfach</label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="difficulty"
                    value="mittel"
                    id="mittel"
                    checked={difficultyData === "mittel"}
                    onChange={handleDifficultyChange}
                  />
                  <label htmlFor="medium">Mittel</label>
                </li>
                <li>
                  <input
                    type="radio"
                    name="difficulty"
                    value="schwer"
                    id="schwer"
                    checked={difficultyData === "schwer"}
                    onChange={handleDifficultyChange}
                  />
                  <label htmlFor="hard">Schwer</label>
                </li>
              </ul>
            </div>
            <div className="filter-group">
              <h3>Allergieneigung</h3>

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
              SUCHE
            </button>
          </form>
        </div>{" "}
        <div className="right-side">
          <h2>Meine Favoriten Rezepte‚</h2>
          <main className="recipe-container">
            {Array.isArray(recipesData) &&
              recipesData.map((recip, index) => (
                <div className="recipe-card" key={index}>
                  <Link to={`/recipeDetails/${recip.id}`}>
                    <div className="recipe-image">
                      <img
                        src={recip.image}
                        alt={recip.title || "Rezeptbild"}
                      />
                    </div>
                    <span className="recipe-type">
                      {Array.isArray(recip.idiet_types)
                        ? recip.diet_types.join(" | ") || "N/A"
                        : null}
                      {Array.isArray(recip.ingredients)
                        ? recip.ingredients.join(" | ") || "N/A"
                        : null}
                    </span>
                    <h3>{recip.title}</h3>
                    <div className="recipe-info">
                      <p>
                        <span>⏱️ {recip.prep_time} Min.</span> |
                        <span>⭐ {recip.rating}</span> |
                        <span>{recip.difficulty || ""}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </main>
        </div>
      </div>
    </>
  );
}
