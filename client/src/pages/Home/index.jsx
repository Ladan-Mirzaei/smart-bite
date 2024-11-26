import "./home.css";
import RandomRecipe from "../../components/Home/randomRecipe.jsx";
import SelectMulti from "../../components/Select/selectMulti.jsx";
import { useState } from "react";

export default function Home() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [ingredientsData, setIngredientsData] = useState([]);
  const [dietData, setDietData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      diet_type_id: dietData || null,
      ingredient_id: ingredientsData || null,
    };
    console.log("finalData", finalData);

    try {
      const response = await fetch(`${API_URL}/recipes/recipeFilter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });
      console.log("response", finalData);
      if (!response.ok) {
        console.error("Data fetching error");
      }
      const data = await response.json();
      console.log("Server Response:", data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="home-content">
      <section className="hero">
        <h1>REzept</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus
          libero tellus, sed eleifend augue.
        </p>
        <button className="cta-button">suche</button>
        <p className="cta-note">Zutaten</p>
      </section>

      <section className="subscription">
        <form onSubmit={handleSubmit} className="subscription-form">
          <SelectMulti setDataArray={setIngredientsData} route="ingredients" />
          <SelectMulti setDataArray={setDietData} route="diets" />

          <button type="submit" className="subscribe-button">
            SUBSCRIBE
          </button>
        </form>
      </section>
      {/* -------------------------- */}
      <div className="card-container">
        <RandomRecipe />
      </div>

      {/* <h2>Willkommen, {user.email}!</h2>
      <p>
        Dies ist die Home-Seite, die nur für angemeldete Benutzer zugänglich
        ist.
      </p>
      Button zeigt sich je nach Login-Status
      {user ? (
        <button onClick={handleLogout}>Logout</button> 
      ) : (
        <button onClick={() => navigate("/login")}>Login</button> 
      )} */}
    </div>
  );
}
