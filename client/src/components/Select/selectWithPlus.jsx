import Select from "react-select";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import "./select.css";
export default function SelectWithPlus({
  // dataArray = [],
  dataArray,
  setDataArray,
  route,
  placeholder,
}) {
  const [fetchSelectData, setFetchSelectData] = useState([]);
  const { fetchData } = useFetch();
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    if (dataArray.length === 0) {
      setDataArray([""]);
    }
  }, [dataArray]);
  useEffect(() => {
    async function loadData() {
      const data = await fetchData(`${API_URL}/${route}`, "GET");

      if (Array.isArray(data)) {
        setFetchSelectData(data);
      } else {
        console.log("Datenformat nicht erkannt", data);
        setFetchSelectData([]);
      }
    }

    loadData();
    if (dataArray.length === 0) {
      setDataArray([]);
    }
  }, []);

  const addSelect = (event) => {
    event.preventDefault();
    setDataArray([...dataArray, []]);
  };

  const removeSelect = (event, index) => {
    event.preventDefault();
    const updatedSelect = dataArray.filter((_, idx) => idx !== index);
    setDataArray(updatedSelect);
  };

  const handleOnSelect = (value, index) => {
    console.log("e.value", value);
    const updatedSelect = [...dataArray];
    updatedSelect[index] = value;
    setDataArray(updatedSelect);
  };

  const options = Array.isArray(fetchSelectData)
    ? fetchSelectData.map((ing) => ({
        value: ing.id,
        label: ing.name,
      }))
    : [];

  return (
    <div>
      {dataArray.map((_, index) => (
        <div key={index} className="select-container">
          <Select
            className="recipe-select-field"
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            placeholder={`${placeholder}`}
            name={`${route}-${index}`}
            options={options}
            onChange={(e) => handleOnSelect(e.value, index)}
          />
          <button
            className="recipe-select-button-filter "
            onClick={(e) => removeSelect(e, index)}
          >
            {" "}
            -{" "}
          </button>
        </div>
      ))}
      <button
        className="recipe-select-button-filter "
        onClick={(e) => addSelect(e)}
      >
        +
      </button>
    </div>
  );
}
