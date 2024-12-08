import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import "./dietInfo.css";
export default function UserDietInfo() {
  const [fetchDietsData, setFetchDietsData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const { fetchData } = useFetch();

  useEffect(() => {
    async function loadFetch() {
      const data = await fetchData(`${API_URL}/diets/getuserdiets`);
      setFetchDietsData(data);
    }
    loadFetch();
  }, []);
  console.log("fetchDietsData", fetchDietsData);
  if (!fetchDietsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dietinfo-container">
      <div className="dietinfo-image-section">
        <img
          src="../../../public/nielsen-food.jpg"
          alt="Healthy food "
          className="dietinfo-image"
        />
        <div className="dietinfo-section"></div>
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

        <div className="dietinfo-result">
          <h2>Deine Tagesbedarf</h2>

          <div>
            {fetchDietsData.map((item, index) => (
              <li key={index}>
                <h3>Diät:{item.diet_name}</h3>
                <p>Tägliche Fette {item.daily_fats} g</p>
                <p>Tägliche Kohlenhydrate:{item.daily_carbohydrates} g</p>
                <p>Tägliches Protein: {item.daily_protein} g</p>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
