import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import "./recipeAll.css";
export default function Recipe() {
  const { fetchData } = useFetch();
  const [recipesData, setRecipesData] = useState({});

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function loadFetch() {
      const response = await fetchData(`${API_URL}/recipes`);
      setRecipesData(response);
    }
    loadFetch();
  }, []);
  console.log("recipesData", recipesData);

  return (
    <>
      <div className="page-layout">
        <div className="left-side">
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
        </div>
        <div className="right-side">
          <main className="recipe-container">
            {Array.isArray(recipesData) &&
              recipesData.map((recip, index) => (
                <div className="recipe-card" key={index}>
                  <div className="recipe-image">
                    <img src={recip.image} alt={recip.title || "Rezeptbild"} />
                  </div>
                  <span className="recipe-type">
                    {recip.diet_types?.join(" | ") || "N/A"}
                  </span>
                  <h3>{recip.title}</h3>
                  <div className="recipe-info">
                    <p>
                      <span>⏱️ {recip.prep_time} Min.</span> |{" "}
                      <span>⭐ {recip.rating}</span> |{" "}
                      <span>{recip.difficulty || ""}</span>
                    </p>
                  </div>
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
