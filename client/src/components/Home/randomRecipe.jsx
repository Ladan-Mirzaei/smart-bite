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
  // const veganData = recipesData.vegan;
  // const recipesData = {
  //   recipe1: "cake",
  //   recipe2: "Pasta",
  //   recipe3: "Salad"
  // };
  // const recipeKeys = Object.keys(recipesData);
  // // Output: ['recipe1', 'recipe2', 'recipe3']
  // const recipeKeys = Object.keys(recipesData);
  // const recipeValue = Object.values(recipesData);
  // console.log("recipesData-recipe-id", recipesData);
  const images = {
    vegan: "../../../public/vegan.png",
    keto: "../../../public/keto.png",
    vegetarisch: "../../../public/vegetarian.png",
    glutenfrei: "../../../public/glutenfrei.png",
  };

  return (
    <>
      {Object.entries(recipesData).map(([key, value]) =>
        value ? (
          <div className="randomcard" key={key}>
            <Link to={`/recipeDetails/${value.recipeID}`}>
              <div className="randomcard-icon">
                <img src={images[key]} alt={key} />
              </div>
              <div className="randomcard-icon-titel"> {value.diet_type}</div>

              <div className="randomcard-title">{value.recipe_title}</div>
              <div className="randomcard-subtitel">
                <h4>{value.category_name}</h4>
              </div>
              <div className="randomcard-icon2">
                {" "}
                <img
                  src={
                    value.image
                      ? value.image
                      : "https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/b8pb1rxbydxlrqnmg4fg.avif"
                  }
                  alt={key}
                />
              </div>
            </Link>
            {/* <div className="read-more">
              <Link to={`/recipeDetails/${value.recipeID}`}>Read More</Link>
            </div> */}
          </div>
        ) : null
      )}
    </>
  );
}
