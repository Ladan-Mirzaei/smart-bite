import Home from "../Home";
import { useState } from "react";

export default function AllergyInfo() {
  const initialData = { allergy1: "", allergy2: "", allergy3: "" };
  const [formData, setFormData] = useState(initialData);
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Allergies submitted:", formData);

    <Home />;
  };
  return (
    <div className="form-container">
      <h2>Allergiezuordnung</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="Allergie">Allergie</label>
          <input
            type="text"
            id={initialData.allergy1}
            value={FormData.allergy1}
            onChange={{ handleFormChange }}
          />
        </div>
        <label htmlFor="Allergie">Allergie</label>
        <input
          type="text"
          id={initialData.allergy2}
          value={FormData.allergy2}
          onChange={{ handleFormChange }}
        />
        <label htmlFor="Allergie">Allergie</label>
        <input
          type="text"
          id={initialData.allergy1}
          value={FormData.allergy3}
          onChange={{ handleFormChange }}
        />
        <button type="submit">Speichern</button>
      </form>
    </div>
  );
}
