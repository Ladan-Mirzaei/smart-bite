import "./home.css";
import RandomRecipe from "../../components/Home/randomRecipe.jsx";
import SelectMulti from "../../components/Select/selectMulti.jsx";

import { useState } from "react";
import { useNavigate } from "react-router";

import QRCode from "react-qr-code";

export default function Home() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [ingredientsData, setIngredientsData] = useState([]);
  const [dietData, setDietData] = useState([]);
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      diet_type_id: dietData || null,
      ingredient_id: ingredientsData || null,
    };
    navigate("/recipeAll", { state: finalData });
    // console.log("finalData", finalData);

    // try {
    //   const response = await fetch(`${API_URL}/recipes/recipeFilter`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(finalData),
    //   });
    //   console.log("response", finalData);
    //   if (!response.ok) {
    //     console.error("Data fetching error");
    //   }
    //   const data = await response.json();
    //   console.log("Server Response:", data);
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <div className="home-content">
      <section className="hero">
        <h1>Gesund essen mit Genuss</h1>
        <p>
          Dein Körper ist dein Zuhause. Wenn du dich darin rundum wohlfühlen
          möchtest, versorgst du ihn am besten mit allem, was er braucht, um
          dich gesund und glücklich durch dein Leben zu tragen.
        </p>
        <button className="cta-button">Mein Kalender</button>
      </section>

      <section className="subscription">
        <form onSubmit={handleSubmit} className="subscription-form">
          <SelectMulti setDataArray={setIngredientsData} route="ingredients" />
          <SelectMulti setDataArray={setDietData} route="diets" />

          <button type="submit" className="subscribe-button">
            Rezepte SUCHEN
          </button>
        </form>
      </section>
      {/* -------------------------- */}
      <div className="card-container">
        <RandomRecipe />
      </div>
      <div></div>
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", padding: 30 }}
        value={"some data, a link or whatever"}
        viewBox={`0 0 256 256`}
      />
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
