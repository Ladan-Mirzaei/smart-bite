import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Filter from "../../components/Filter/filter.jsx";
import "./recipeAll.css";

export default function Recipe() {
  const [recipesData, setRecipesData] = useState([]);
  const [resetData, setResetData] = useState();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let finalData = {
      diet_type_id: [],
      ingredient_id: [],
      allergene_id: [],
      difficulty_level: "",
      category_id: "",
    };

    if (location.state) {
      finalData = location.state;
    }

    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${API_URL}/recipes/recipeFilter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        });

        if (!response.ok) {
          console.log("Data fetching error");
        }
        const data = await response.json();
        setRecipesData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, [location.state]);

  const handleFilterSubmit = async (filters) => {
    console.log("filter", filters);

    try {
      const response = await fetch(`${API_URL}/recipes/recipeFilter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        console.log("Data fetching error");
      }
      const data = await response.json();
      setRecipesData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetFilters = (resetFilters) => {
    setResetData(resetFilters);
    handleFilterSubmit(resetData);
  };
  return (
    <div className="page-layout">
      <div className="left-side">
        <h2>Filter</h2>
        <Filter
          onSubmitFilters={handleFilterSubmit}
          onResetFilters={handleResetFilters}
        />
      </div>
      <div className="right-side">
        <main className="recipe-container">
          {Array.isArray(recipesData) &&
            recipesData.map((recip, index) => (
              <div className="recipe-card" key={index}>
                <Link to={`/recipedetails/${recip.id}`}>
                  <div className="recipe-image">
                    <img
                      src={
                        recip.image
                          ? recip.image
                          : "https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/b8pb1rxbydxlrqnmg4fg.avif"
                      }
                      alt={recip.title || "Rezeptbild"}
                    />
                  </div>
                  <h3>{recip.title}</h3>
                  <div className="recipe-info-diet">
                    <span className="recipe-type">
                      {Array.isArray(recip.diet_types)
                        ? recip.diet_types.join(" | ")
                        : null}
                    </span>
                    <span className="recipe-type recipe-cat">
                      {recip.category_name}
                    </span>
                  </div>
                  <div className="recipe-info">
                    <span>⏱️ {recip.cooking_time} Min.</span>
                    <span>⭐ 4/9</span>
                    <span>{recip.difficulty_level}</span>
                  </div>
                </Link>
              </div>
            ))}
        </main>
      </div>
    </div>
  );
}
