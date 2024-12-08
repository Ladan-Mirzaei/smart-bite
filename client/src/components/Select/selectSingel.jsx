import Select from "react-select";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
// import "./recipeForm.css";
const API_URL = import.meta.env.VITE_API_URL;

export function SelectSingel({ dataArray, setDataArray, route }) {
  const { fetchData } = useFetch();
  const [fetchSelectData, setFetchSelectData] = useState([]);

  useEffect(() => {
    async function loadFetch() {
      const data = await fetchData(`${API_URL}/${route}`);
      setFetchSelectData(data);
    }
    loadFetch();
  }, []);

  const handleFormChangeCat = (e) => {
    setDataArray(e?.value || null);
  };

  const options = Array.isArray(fetchSelectData)
    ? fetchSelectData.map((ing) => ({
        value: ing.id,
        label: ing.name,
      }))
    : [];

  return (
    <>
      <div style={{ textAlign: "left" }}>
        {
          <Select
            // className="basic-single"
            className="recipeform-select-field"
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            placeholder="Gerichte"
            name={` ${route}`}
            options={options}
            onChange={handleFormChangeCat}
          ></Select>
        }
      </div>
    </>
  );
}

export default SelectSingel;
