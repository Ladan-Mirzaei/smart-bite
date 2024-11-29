import { useEffect, useState } from "react";
import "./sammlung.css";
import { useLocation } from "react-router-dom";
import SelectWithPlus from "../../components/Select/selectWithPlus.jsx";
import ZutatenForm from "../../components/Recipe/selectIngredients.jsx";
import { Link } from "react-router-dom";

export default function Sammlung() {
  const [recipesData, setRecipesData] = useState({});
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;
  const [ingredientsData, setIngredientsData] = useState([]);
  const [allergenData, setAllergenData] = useState([]);
  const [categoriesData, setCategoriesData] = useState("");
  const [dietData, setDietData] = useState([]);
  const [formData, setFormData] = useState();

  useEffect(() => {
    let finalData = {
      diet_type_id: [],
      ingredient_id: [],
    };

    if (formData) {
      finalData = formData;
    }

    const onSubmit = async () => {
      try {
        const response = await fetch(`${API_URL}/recipes/recipeFilter`, {
          method: "POST",
          headers: {
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
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFinalData = {
      diet_type_id: dietData || [],
      ingredient_id: ingredientsData || [],
    };

    if (ingredientsData[0] === "" && dietData[0] === "") {
      setFormData("");
    } else if (ingredientsData[0] === "") {
      setFormData({ diet_type_id: dietData, ingredient_id: [] });
    } else if (dietData[0] === "") {
      setFormData({ ingredient_id: ingredientsData, diet_type_id: [] });
    } else {
      setFormData(updatedFinalData);
    }
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
                  <input type="radio" name="difficulty" id="easy" />{" "}
                  <label htmlFor="easy">Einfach</label>
                </li>
                <li>
                  <input type="radio" name="difficulty" id="medium" />{" "}
                  <label htmlFor="medium">Mittel</label>
                </li>
                <li>
                  <input type="radio" name="difficulty" id="hard" />{" "}
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
