// In Parent seite

/* <SelectWithPlus setDataArray={setIngredients} route="ingredients" /> */
import Select from "react-select";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";

export default function SelectWithPlus({
  dataArray = [],
  setDataArray,
  route,
  placeholder,
}) {
  const [fetchSelectData, setFetchSelectData] = useState([]);
  const { fetchData } = useFetch();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function loadData() {
      const data = await fetchData(`${API_URL}/${route}`, "GET");

      if (Array.isArray(data)) {
        setFetchSelectData(data);
      } else {
        console.error("Unexpected data format", data);
        setFetchSelectData([]);
      }
    }

    loadData();
  }, []);

  const addSelect = () => {
    setDataArray([...dataArray, []]);
  };

  const removeSelect = (index) => {
    const updatedSelect = dataArray.filter((_, idx) => idx !== index);
    setDataArray(updatedSelect);
  };

  const handleOnSelect = (value, index) => {
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
        <div key={index}>
          <Select
            className="basic-single"
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            placeholder={`${placeholder}`}
            name={`${route}-${index}`}
            options={options}
            onChange={(e) => handleOnSelect(e.value, index)}
          />
          <button onClick={() => removeSelect(index)}> - </button>
        </div>
      ))}
      <button onClick={addSelect}>+</button>
    </div>
  );
}
