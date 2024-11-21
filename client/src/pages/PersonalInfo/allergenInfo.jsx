import Home from "../Home";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import Select from "react-select";
import "./style.css";
export default function AllergyInfo() {
  const [allergenData, setAllergenData] = useState([]);
  const [allergen, setAllergen] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const { fetchData } = useFetch();

  const handelAllChange = (event) => {
    const allergenIds = event.map((item) => item.value);
    setAllergen(allergenIds);
  };
  console.log(allergen);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected allergens:", allergen);
  };
  // Get-Anfrage-
  useEffect(() => {
    async function loadAllergens() {
      const allergens = await fetchData(`${API_URL}/allergene`, "GET"); // API-Aufruf mit fetchData
      setAllergenData(allergens || []);
    }

    loadAllergens();
  }, [fetchData]);

  return (
    <div className="form-container">
      <h2>Allergiezuordnung</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <Select
            placeholder="Allergie auswählen"
            name="allergene"
            options={allergenData.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            isMulti
            onChange={handelAllChange}
          />
        </div>

        <button type="submit">Speichern</button>
      </form>
    </div>
  );
}
