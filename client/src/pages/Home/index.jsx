import "./home.css";
import RandomRecipe from "../../components/Home/randomRecipe.jsx";
import SelectMulti from "../../components/Select/selectMulti.jsx";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const [ingredientsData, setIngredientsData] = useState([]);
  const [dietData, setDietData] = useState([]);
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      diet_type_id: dietData || null,
      ingredient_id: ingredientsData || null,
      allergene_id: [],
      category_id: "",
      difficulty_level: "",
    };
    navigate("/recipeAll", { state: finalData });
  };
  return (
    <>
      <div className="home-content">
        <section className="hero">
          <p>
            <h1>Gesund essen mit Genuss</h1>
            Dein Körper ist dein Zuhause. Wenn du dich darin rundum wohlfühlen
            möchtest, versorgst du ihn am besten mit allem, was er braucht, um
            dich gesund und glücklich durch dein Leben zu tragen.
            <button className="cta-button">Mein Kalender</button>
          </p>
        </section>

        <section className="subscription">
          <form onSubmit={handleSubmit} className="subscription-form">
            <div>
              <SelectMulti
                setDataArray={setIngredientsData}
                route="ingredients"
                placeholder="Zutaten auswählen"
                style={{ width: "500px" }}
              />
            </div>
            <SelectMulti
              setDataArray={setDietData}
              route="diets"
              placeholder="Ernährungsform
 auswählen"
            />

            <button type="submit" className="subscribe-button">
              Rezepte suchen
            </button>
          </form>
        </section>
        {/* -------------------------- */}
        <div className="card-container">
          <RandomRecipe />
        </div>
        <div></div>
      </div>

      <div className="layout-container">
        <div className="layout-card">
          <div className="image-wrapper">
            <img
              src="https://res.cloudinary.com/dxneunm1q/image/upload/v1732794719/jo7qz6pny6xh0vzmtovt.avif"
              alt="Person enjoying salad"
              className="card-image"
            />
          </div>
          <div className="info-wrapper">
            <h2 className="title"> Gesund essen, besser leben</h2>
            <p className="description">
              Gesund essen, besser leben. Bei SmartBite glauben wir daran, dass
              Ernährung nicht kompliziert sein muss.s Eine ausgewogene Ernährung
              ist der Schlüssel zu einem aktiven, glücklichen Leben. Egal, ob du
              deine Leistungsfähigkeit steigern, deinen Stoffwechsel ankurbeln
              oder einfach nur neue, köstliche Mahlzeiten ausprobieren möchtest
              – wir haben alles, was du brauchst. Unser Ansatz ist individuell
              und flexibel: Passe deine Ernährung an deinen Alltag und deine
              Ziele an. Es geht nicht nur darum, Kalorien zu zählen, sondern
              darum, deinem Körper die Nährstoffe zu geben, die er wirklich
              braucht.
            </p>
            <div className="statistics">
              <div className="stat-block">
                <h3 className="stat-value">Kalender</h3>
                <p className="stat-label">Ernährungsplänen</p>
              </div>
              <div className="stat-block">
                <h3 className="stat-value">Rezepte </h3>
                <p className="stat-label"> individuell und flexibel</p>
              </div>
              <div className="stat-block">
                <h3 className="stat-value">BMI</h3>
                <p className="stat-label">Abschätzung des Körperfettanteils</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
