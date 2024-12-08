import { useState } from "react";
import "./BMI.css";

const BMIApp = () => {
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [inputValue, setInputValue] = useState({
    alter: "",
    weight: "",
    height: "",
    anrede: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value.slice(0, 3),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const weightInkg = parseFloat(inputValue.weight);
    const heightInMeter = parseFloat(inputValue.height) / 100;

    const bmi = (weightInkg / (heightInMeter * heightInMeter)).toFixed(2);

    setBmiResult(bmi);
    console.log(inputValue.anrede, bmi);
    if (inputValue.anrede === "m") {
      if (bmi < 20) setBmiCategory("Untergewicht");
      else if (bmi < 25) setBmiCategory("Normalgewicht");
      else if (bmi < 30) setBmiCategory("Übergewicht");
      else setBmiCategory("Adipositas");
    } else if (inputValue.anrede === "w") {
      if (bmi < 19) setBmiCategory("Untergewicht");
      else if (bmi < 24) setBmiCategory("Normalgewicht");
      else if (bmi < 29) setBmiCategory("Übergewicht");
      else setBmiCategory("Adipositas");
    }
  };

  return (
    <div className="bmi-container">
      <div className="bmi-image-section">
        <img
          src="../../../public/nielsen-food.jpg"
          alt="Healthy food "
          className="bmi-image"
        />
        <div className="bmi-input-section">
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="anrede">Geschlecht: </label>
            <div className="bmi-gender-container">
              <label className="bmi-radio-label">
                <input
                  required
                  className="bmi-radio-btn"
                  type="radio"
                  name="anrede"
                  value="w"
                  onChange={handleInputChange}
                />
                <span>weiblich</span>
              </label>
              <label className="bmi-radio-label">
                <input
                  required
                  className="bmi-radio-btn"
                  type="radio"
                  name="anrede"
                  value="m"
                  onChange={handleInputChange}
                />
                <span>männlich</span>
              </label>
            </div>

            <div className="bmi-input-field">
              <label htmlFor="alter">Alter: </label>
              <input
                type="number"
                required
                name="alter"
                min="18"
                max="120"
                value={inputValue.alter}
                onChange={handleInputChange}
              />
            </div>

            <div className="bmi-input-field">
              <label htmlFor="weight">Gewicht(in kg): </label>
              <input
                type="number"
                required
                name="weight"
                value={inputValue.weight}
                onChange={handleInputChange}
                min="30"
                max="300"
              />
            </div>
            <div className="bmi-input-field">
              <label htmlFor="height">Größe(in cm): </label>
              <input
                type="number"
                required
                name="height"
                value={inputValue.height}
                onChange={handleInputChange}
                min="30"
                max="250"
              />
            </div>
            <button className="bmi-btn-submit" type="submit">
              BMI Berechnen
            </button>
          </form>{" "}
        </div>
      </div>
      <div className="bmi-content-section">
        <h2>Was ist BMI?</h2>
        <p>
          Der BMI (Body-Mass-Index) ist ein hilfreiches Werkzeug, um das
          Körpergewicht objektiv zu beurteilen. Mit unserem BMI-Rechner können
          Sie schnell und einfach herausfinden, ob Sie im Normalgewicht liegen
          oder ob Sie unter- oder übergewichtig sind.
        </p>
        <p>
          Sie müssen dafür nur über 18 Jahre alt sein und Ihr Alter mithilfe des
          Schiebereglers „Alter in Jahren“ eingeben. Anschließend tragen Sie Ihr
          aktuelles Gewicht und Ihre Körpergröße ein – und schon liefert Ihnen
          unser Rechner die passende Auswertung.
        </p>

        <div className="bmi-result">
          <h2>Ihr BMI</h2>
          {bmiResult ? (
            <div>
              <h3>Dein BMI ist: {bmiResult}</h3>
              <h3>Deine Kategorie ist: {bmiCategory}</h3>
            </div>
          ) : (
            <div className="bmi-comment">Keine Angabe</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMIApp;
