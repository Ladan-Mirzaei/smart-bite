import Select from "react-select";
import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { useFetch } from "../../hooks/fetch.jsx";

export default function SelectMulti({
  setDataArray,
  route,
  placeholder,
  style = {},
}) {
  const [fetchSelectData, setFetchSelectData] = useState([]);
  const { fetchData } = useFetch();

  useEffect(() => {
    async function loadData() {
      const data = await fetchData(`${API_URL}/${route}`, "GET");
      setFetchSelectData(data);
    }

    loadData();
  }, []);

  const handelAllChange = (event) => {
    const dataIds = event.map((item) => item.value);
    setDataArray(dataIds);
  };
  const options = Array.isArray(fetchSelectData)
    ? fetchSelectData.map((ing) => ({
        value: ing.id,
        label: ing.name,
      }))
    : [];
  return (
    <div style={{ ...style, textAlign: "left" }}>
      <Select
        className="recipeform-select-field"
        placeholder={placeholder}
        name="allergene"
        options={options}
        // className="basic-single"
        classNamePrefix="select"
        isSearchable={true}
        isMulti
        onChange={handelAllChange}
      />
    </div>
  );
}
