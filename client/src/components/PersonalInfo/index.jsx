import { useState, useContext } from "react";
import "../../pages/PersonalInfo/personalInfo.css";
import { AuthContext } from "../../context/AuthContext";
import SelectArray from "../../components/Select/select.jsx";

export default function UserProfileForm({ onFormSubmit, goToNextStep }) {
  const [formData, setFormData] = useState({
    date_of_birth: "",
    gender: "",
    weight: "",
    height: "",
    activity_level: "",
  });

  const { user } = useContext(AuthContext);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleGenderChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: selectedOption?.value || "",
    }));
  };

  const handleActivityLevelChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      activity_level: selectedOption?.value || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Form Data:", formData);
    onFormSubmit(formData);
    goToNextStep();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="date_of_birth">Geburtsdatum*</label>
        <input
          type="date"
          id="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleFormChange}
        />

        <label htmlFor="gender">Geschlecht *</label>
        <br />
        <br />
        <SelectArray
          setSelectedOption={handleGenderChange}
          optionsName="gender"
        />

        <label htmlFor="weight">Gewicht (in kg)</label>
        <input
          type="number"
          id="weight"
          value={formData.weight}
          onChange={handleFormChange}
          step="0.1"
          min="30"
          max="250"
        />

        <label htmlFor="height">Größe (in cm)</label>
        <input
          type="number"
          id="height"
          value={formData.height}
          onChange={handleFormChange}
          min="30"
          max="250"
        />

        <label htmlFor="activity_level">Aktivitätslevel</label>
        <br />
        <br />
        <SelectArray
          setSelectedOption={handleActivityLevelChange}
          optionsName="activity_level"
        />

        <button type="submit">Registrieren</button>
      </form>
    </div>
  );
}
