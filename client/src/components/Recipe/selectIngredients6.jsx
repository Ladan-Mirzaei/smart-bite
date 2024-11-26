import Select from "react-select";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export function ZutatenForm({
  dataArray,
  setDataArray,
  setFetchedData,
  route,
  hasQuantity,
  hasUnit,
}) {
  const { fetchData } = useFetch();
  useEffect(() => {
    async function loadFetch() {
      const data = await fetchData(`${API_URL}/${route}`);
      setFetchedData(data);
    }
    loadFetch();
  }, []);

  const handleOnSelect = (selectedIndex, ingredientId) => {
    setDataArray((prev) =>
      prev.map((item, index) =>
        selectedIndex === index ? { ingredient: ingredientId } : item
      )
    );
  };
  const handleFormChangeCat = (selectedOption) => {
    setDataArray((prevData) => ({
      ...prevData,
      category_id: selectedOption.value,
    }));
  };

  const handleFormChangeDiet = (selectedOption) => {
    setDataArray(
      selectedOption ? selectedOption.map((diet) => diet.value) : []
    );
  };
  const handleChange = (index, key, value) => {
    setDataArray((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };
  const handleAddIngredient = () => {
    setDataArray((prev) => [...prev, { ingredient: "" }]);
  };

  const handleRemoveIngredient = (array, index) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setDataArray(newArray);
  };

  const options = Array.isArray(fetchedData)
    ? fetchedData.map((ing) => ({
        value: ing.id,
        label: ing.name,
      }))
    : [];

  return (
    <div>
      <div>{JSON.stringify(dataArray)}</div>
      {dataArray.map((item, index) => (
        <div key={index} className="ingredient-row">
          <Select
            defaultInputValue={item.ingredient}
            className="basic-single"
            classNamePrefix="select"
            isClearable="true"
            isSearchable="true"
            placeholder={`Wählen Sie ein ${route}`}
            name={`ingredients_select_${index}`}
            options={options}
            onChange={(e) => handleOnSelect(index, e.value)}
          />
          <Select
            className="basic-single"
            classNamePrefix="select"
            isClearable="true"
            isSearchable="true"
            placeholder="Kategorie auswählen"
            name="category_id"
            options={options}
            onChange={handleFormChangeCat}
          />

          {hasQuantity ? (
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
              placeholder="Menge"
              required
            />
          ) : undefined}

          {hasUnit ? (
            <select
              value={item.unit}
              onChange={(e) => handleChange(index, "unit", e.target.value)}
            >
              <option value="" disabled>
                Einheit
              </option>
              <option value="g">g</option>
              <option value="ml">ml</option>
              <option value="stk">Stück</option>
            </select>
          ) : undefined}

          {dataArray.length > 1 && (
            <>
              {" "}
              {hasUnit ? (
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(dataArray, index)}
                >
                  -
                </button>
              ) : undefined}
            </>
          )}
        </div>
      ))}
      <button type="button" onClick={() => handleAddIngredient()}>
        +
      </button>{" "}
    </div>
  );
}

export default ZutatenForm;
