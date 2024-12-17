import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import { Link } from "react-router-dom";
export default function RandomRecipe() {
  const { fetchData } = useFetch();
  const [recipesData, setRecipesData] = useState();

  let API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function loadFetch() {
      const recipe = await fetchData(`${API_URL}/recipes/random`);
      if (recipe) {
        setRecipesData(recipe);
        console.log("recipe", recipe);
      }
    }
    loadFetch(fetchData);
  }, []);

  if (!recipesData) {
    return <div>Loading...</div>;
  }

  const images = {
    vegan: "/vegan.png",
    keto: "/keto.png",
    vegetarisch: "/vegetarian.png",
    glutenfrei: "/glutenfrei.png",
  };

  return (
    <>
      {Object.entries(recipesData).map(([key, value]) =>
        value ? (
          <div className="randomcard" key={key}>
            <img src={images[key]} alt={key} className="randomcard-icon" />
            <div className="randomcard-content">
              <div className="randomcard-icon-titel"> {value.diet_type}</div>
              <Link to={`/recipedetails/${value.recipeID}`}>
                <div className="randomcard-title">{value.recipe_title}</div>{" "}
              </Link>
            </div>{" "}
            <div className="randomcard-subtitel">
              <h4>{value.category_name}</h4>
            </div>
            <Link to={`/recipedetails/${value.recipeID}`}>
              <img
                className="randomcard-image"
                src={
                  value.image
                    ? value.image
                    : "https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/b8pb1rxbydxlrqnmg4fg.avif"
                }
                alt={key}
              />{" "}
            </Link>
          </div>
        ) : null
      )}
    </>
  );
}
