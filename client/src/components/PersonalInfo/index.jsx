import { useState } from "react";
import "../../pages/PersonalInfo/style.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function UserProfileForm({ onFormSubmit, goToNextStep }) {
  console.log(goToNextStep);

  const [formData, setFormData] = useState({
    // date_of_birth: "",
    // gender: "",
    // weight: "",
    // height: "",
    // activity_level: "",
  });
  const { user } = useContext(AuthContext);
  console.log("user", user.email);

  const handleFormChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [id]: value }));
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData); //von hier schicke ich formData zu ./pages/personalInfo/index.jsx
    goToNextStep();
  };

  return (
    <div className="form-container">
      {/* <p>
        {user ? (
          <>
            <span>Willkommen{user.email}</span>
          </>
        ) : (
          <span>Willkommen{user.email}</span>
        )}
      </p> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="date_of_birth">Geburtsdatum</label>
        <input
          type="date"
          id="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleFormChange}
          required
        />

        <label htmlFor="gender">Geschlecht</label>
        <select
          id="gender"
          value={formData.gender}
          onChange={handleFormChange}
          required
        >
          <option value="">Bitte auswählen</option>
          <option value="männlich">Männlich</option>
          <option value="weiblich">Weiblich</option>
          <option value="divers">Divers</option>
        </select>

        <label htmlFor="weight">Gewicht (in kg)</label>
        <input
          type="number"
          id="weight"
          value={formData.weight}
          onChange={handleFormChange}
          step="0.1"
          required
        />

        <label htmlFor="height">Größe (in cm)</label>
        <input
          type="number"
          id="height"
          value={formData.height}
          onChange={handleFormChange}
          required
        />

        <label htmlFor="activity_level">Aktivitätslevel</label>
        <select
          id="activity_level"
          value={formData.activity_level}
          onChange={handleFormChange}
          required
        >
          <option value="">Bitte auswählen</option>
          <option value="niedrig">Niedrig</option>
          <option value="mittel">Mittel</option>
          <option value="hoch">Hoch</option>
        </select>

        <button type="submit">Registrieren</button>
      </form>
    </div>
  );
}
