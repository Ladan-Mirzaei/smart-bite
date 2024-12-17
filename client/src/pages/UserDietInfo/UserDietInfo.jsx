import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import "./UserDietInfo.css";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function UserDietInfo() {
  const [fetchDietsData, setFetchDietsData] = useState(null);
  const { user } = useContext(AuthContext);

  const API_URL = import.meta.env.VITE_API_URL;
  const { fetchData } = useFetch();
  useEffect(() => {
    const loadFetch = async () => {
      try {
        const token = await user.getIdToken();

        const response = await fetch(`${API_URL}/diets/getuserdiets`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,

            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          console.log("Data fetching error");
        }
        const data = await response.json();
        setFetchDietsData(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadFetch();
  }, []);
  // if (!fetchDietsData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="dietinfo-container">
      <div className="dietinfo-image-section">
        <img
          src="/nielsen-food.jpg"
          alt="Healthy food "
          className="dietinfo-image"
        />
      </div>
      <div className="dietinfo-content-section">
        <h2>Der Nährstoffbedarf ist individuell!</h2>
        <p>
          Der Nährstoffbedarf ist sehr individuell und hängt von mehreren
          Faktoren ab, wie zum Beispiel deiner körperlichen Aktivität, Größe,
          Alter und deinem Gewicht. Im Durchschnitt benötigst du täglich,
          abhängig von diesen Faktoren, eine bestimmte Menge an Kalorien,
          Kohlenhydraten, Fetten und Eiweiß, die zu deiner Diät passt. Die
          folgende Tabelle zeigt die empfohlenen Werte entsprechend deiner
          gewählten Diät:
        </p>

        <div className="dietinfo-result-section">
          <h2>Dein Tagesbedarf</h2>
          <div className="dietinfo-result">
            <div className="dietinfo-header">
              <div className="table-cell">
                <span>Ernährungsweise</span>
              </div>
              <div className="table-cell">
                <span>Kalorien</span>
              </div>
              <div className="table-cell">
                <span>Kohlenhydrate</span>
              </div>
              <div className="table-cell">
                <span>Fette</span>
              </div>
              <div className="table-cell">
                <span>Eiweiß</span>
              </div>
            </div>
            <div className="dietinfo-section">
              {fetchDietsData &&
                fetchDietsData.map((item, index) => (
                  <div key={index} className="dietinfo-item">
                    <div className="diet-row">
                      <span>{item.diet_name}</span>
                    </div>
                    <div className="diet-row">
                      <span>{item.daily_calories} g</span>
                    </div>
                    <div className="diet-row">
                      <span>{item.daily_carbohydrates} g</span>
                    </div>
                    <div className="diet-row">
                      <span>{item.daily_fats} g</span>
                    </div>
                    <div className="diet-row">
                      <span>{item.daily_protein} g</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
