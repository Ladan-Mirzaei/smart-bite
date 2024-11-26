import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import "./recipeAll.css";
import { useLocation } from "react-router-dom";
import SelectWithPlus from "../../components/Select/selectWithPlus.jsx";
import ZutatenForm from "../../components/Recipe/selectIngredients.jsx";
import { Link } from "react-router-dom";

export default function Recipe() {
  const { fetchData } = useFetch();
  const [recipesData, setRecipesData] = useState({});
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;
  const [ingredientsData, setIngredientsData] = useState([null]);
  const [allergenData, setAllergenData] = useState([""]);
  const [categoriesData, setCategoriesData] = useState(null);
  const [dietData, setDietData] = useState([null]);
  const [formData, setFormData] = useState();

  // useEffect(() => {
  //   async function loadFetch() {
  //     const response = await fetchData(`${API_URL}/recipes`);
  //     setRecipesData(response);
  //   }
  //   loadFetch();
  // }, []);

  useEffect(() => {
    let finalData = {
      diet_type_id: [],
      ingredient_id: [],
    };
    if (location.state) {
      console.log("location.state", location.state);

      finalData = location.state;
    }

    if (formData) {
      console.log("formDataddddd", formData);

      finalData = formData;
    }
    console.log("FinalData:", finalData);

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
  }, [formData, location.state]);
  // useEffect(() => {
  //   onSubmit();
  // }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFinalData = {
      diet_type_id: dietData || [],
      ingredient_id: ingredientsData || [],
      // allergenData,categoriesData
    };
    setFormData(updatedFinalData);
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
                      {/* const fruits = ["Apple", "Banana", "Cherry"];
                  console.log(fruits.join(" | ")); // Output: "Apple | Banana | Cherry" */}
                      {/* const urlSegments = ["https:", "", "www.example.com", "products"];
                  console.log(urlSegments.join("/")); // Output: "https://www.example.com/products" */}
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
                        <span>⏱️ {recip.prep_time} Min.</span> |{" "}
                        <span>⭐ {recip.rating}</span> |{" "}
                        <span>{recip.difficulty || ""}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </main>
        </div>
      </div>

      {/* <div className="page-layout">
        <aside className="filter-menu">
          <h2>Filter</h2>
          <div className="filter-group">
            <h3>Categories</h3>
            <ul>
              <li>
                <input type="checkbox" id="category1" />{" "}
                <label htmlFor="category1">Vegan</label>
              </li>
              <li>
                <input type="checkbox" id="category2" />{" "}
                <label htmlFor="category2">Vegetarian</label>
              </li>
              <li>
                <input type="checkbox" id="category3" />{" "}
                <label htmlFor="category3">Keto</label>
              </li>
            </ul>
          </div>
          <div className="filter-group">
            <h3>Diet Type</h3>
            <ul>
              <li>
                <input type="checkbox" id="diet1" />{" "}
                <label htmlFor="diet1">Low Carb</label>
              </li>
              <li>
                <input type="checkbox" id="diet2" />{" "}
                <label htmlFor="diet2">High Protein</label>
              </li>
            </ul>
          </div>
          <div className="filter-group">
            <h3>Difficulty</h3>
            <ul>
              <li>
                <input type="radio" name="difficulty" id="easy" />{" "}
                <label htmlFor="easy">Easy</label>
              </li>
              <li>
                <input type="radio" name="difficulty" id="medium" />{" "}
                <label htmlFor="medium">Medium</label>
              </li>
              <li>
                <input type="radio" name="difficulty" id="hard" />{" "}
                <label htmlFor="hard">Hard</label>
              </li>
            </ul>
          </div>
          <button className="filter-button">Apply Filters</button>
        </aside>
        <main className="recipe-container">
          <div className="recipe-card">
            <div className="recipe-image">
              <img
                src="gefuellte-zucchini-aus-dem-ofen.webp"
                alt="Hähnchenschnitzel mit Cornflakes-Panade"
              />
            </div>
            <h3>Hähnchenschnitzel mit Cornflakes-Panade</h3>
            <div className="recipe-info">
              <p>
                <span>⏱️ 35 Min.</span> | <span>⭐ 5,0</span> |{" "}
                <span>Easy</span>
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* <ul>
          {" "}
          {recipesData &&
            recipesData.map((item, index) => <li key={index}>{item.titel}</li>)}
        </ul> */}
    </>
  );
}
