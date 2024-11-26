import "./RecipeDetails.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import { useParams } from "react-router-dom";
import RecipePlanner from "../../components/Calendar/index.jsx";
const API_URL = import.meta.env.VITE_API_URL;

const RecipeDetails = () => {
  const { id } = useParams();
  const { fetchData } = useFetch();
  const [fetchRezeptData, setFetchRezeptData] = useState({
    ingredient_details: [],
  });
  const [totalNutrients, setTotalNutrients] = useState({});

  // const recipeId = 1;
  console.log("id");
  const contentRef = useRef(null);
  // console.log(contentRef);
  const handlePrint = useReactToPrint({
    contentRef,
  });
  useEffect(() => {
    async function loadFetch() {
      const data = await fetchData(`${API_URL}/recipes/${id}`);

      setFetchRezeptData(data);

      const totals = calculateRecipeNutrients(
        data.ingredient_details,
        data.portions
      );
      setTotalNutrients(totals);
    }
    loadFetch();
  }, []);
  if (!fetchRezeptData) {
    return <div>Lade Rezeptdaten...</div>;
  }

  function calculateRecipeNutrients(ingredients, portions) {
    const totalNutrients = {
      calories: 0,
      carbohydrates: 0,
      fats: 0,
      protein: 0,
    };
    if (!ingredients || ingredients.length === 0) {
      return totalNutrients;
    }
    ingredients.forEach((ing) => {
      let factor = 0;

      if (ing.unit === "kg") {
        factor = (ing.quantity * 1000) / 100;
      } else if (ing.unit === "g") {
        factor = ing.quantity / 100;
      } else if (ing.unit === "ml") {
        factor = ing.quantity / 100;
      } else if (ing.unit === "l") {
        factor = (ing.quantity * 1000) / 100;
      } else if (ing.unit === "stk") {
        factor = ing.quantity;
      }

      totalNutrients.calories += (factor * ing.calories) / portions;
      totalNutrients.carbohydrates += (factor * ing.carbohydrates) / portions;
      totalNutrients.fats += (factor * ing.fats) / portions;
      totalNutrients.protein += (factor * ing.protein) / portions;
    });
    return totalNutrients;
  }

  return (
    <>
      {" "}
      <div className="test" ref={contentRef}>
        <div className="p-15">
          <div className="p-15-header">
            <div className="p-15-title-section">
              <h2>{fetchRezeptData.title}</h2>
              <div className="p-15-icons">
                <button onClick={handlePrint}>
                  <i className="fa fa-print"></i>
                </button>
                <button>
                  <i className="fa fa-heart"></i>
                </button>
              </div>
            </div>{" "}
            <div className="p-15-tags">
              {fetchRezeptData.diet_types?.map((diet, index) => (
                <span key={index}>{diet}</span>
              ))}
            </div>
            <div className="p-15-details">
              <span>
                <i className="fa fa-clock"></i>{" "}
                {fetchRezeptData.preparation_time >= 60
                  ? `${Math.floor(fetchRezeptData.preparation_time / 60)} h ${
                      fetchRezeptData.preparation_time % 60
                    } min`
                  : `${fetchRezeptData.preparation_time} min`}{" "}
                Gesamtzeit
              </span>
              <span>
                <i className="fa fa-clock"></i>{" "}
                {fetchRezeptData.cooking_time >= 60
                  ? `${Math.floor(fetchRezeptData.cooking_time / 60)} h ${
                      fetchRezeptData.cooking_time % 60
                    } min`
                  : `${fetchRezeptData.cooking_time} min`}
              </span>
              <span>
                <i className="fas fa-utensils"></i>
                {fetchRezeptData.difficulty_level} für{" "}
                {fetchRezeptData.portions} personen
              </span>
              <div className="p-15-rating">★★★★☆ 19</div>
            </div>
          </div>
        </div>
        <div className="P-15-row">
          <div className="P-15-text-container">
            <h6> {fetchRezeptData.category_name}</h6>
            <h6> {fetchRezeptData.created_at}</h6>
            {/* <p>
           test
          </p> */}
            <ul className="ingredients-list">
              {fetchRezeptData.ingredient_details?.map((ing, index) => (
                <li
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px auto",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span>
                    {ing.quantity} {ing.unit} {ing.name}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Allergene: {ing.allergen_category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="P-15-image-container">
            <img src={fetchRezeptData.image} alt="Beispielbild" />
          </div>
        </div>
        <div className="P-15-row-h">
          <div className="P-15-text-container">
            <h3>Zubereitung</h3>
            <p>{fetchRezeptData.description}</p>
          </div>

          <div className="P-15-text-container">
            <RecipePlanner
              name={fetchRezeptData.title}
              link={`/recipedetails`}
              recipe_id={fetchRezeptData.id}
              uid={fetchRezeptData.uid}
            />

            <div className="nutritional-info">
              <div className="nutritional-header">
                <h2>Nährwerte pro Person:</h2>
                <div className="nutritional-score">
                  <span>4/10</span>
                  <div className="score-indicator"></div>
                </div>
              </div>
              <div className="nutritional-grid">
                <div
                  className="nutritional-item"
                  style={{ backgroundColor: "#fdece8" }}
                >
                  <h3>Energie</h3>
                  <p>
                    {" "}
                    {totalNutrients.calories
                      ? totalNutrients.calories.toFixed(2)
                      : "0.00"}{" "}
                    kcal
                  </p>
                </div>
                <div
                  className="nutritional-item"
                  style={{ backgroundColor: "#f2eef9" }}
                >
                  <h3>Kohlenhydrate</h3>
                  <p>
                    {" "}
                    {totalNutrients.carbohydrates
                      ? totalNutrients.carbohydrates.toFixed(2)
                      : "0.00"}{" "}
                  </p>
                </div>
                <div
                  className="nutritional-item"
                  style={{ backgroundColor: "#eaf4ec" }}
                >
                  <h3>Fett</h3>
                  {totalNutrients.fats
                    ? totalNutrients.fats.toFixed(2)
                    : "0.00"}
                </div>
                <div
                  className="nutritional-item"
                  style={{ backgroundColor: "#fbf4e7" }}
                >
                  <h3>Eiweiß</h3>
                  {totalNutrients.protein
                    ? totalNutrients.protein.toFixed(2)
                    : "0.00"}
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default RecipeDetails;
