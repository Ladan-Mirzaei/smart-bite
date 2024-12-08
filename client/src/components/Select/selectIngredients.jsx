import Select from "react-select";
import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import "./select.css";
import SelectArray from "./select.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export function ZutatenForm({ dataArray, setDataArray, route }) {
  const { fetchData } = useFetch();
  const [fetchSelectData, setFetchSelectData] = useState([]);
  // const [selectedOptionUnit, setSelectedOptionUnit] = useState(null);

  useEffect(() => {
    async function loadFetch() {
      const data = await fetchData(`${API_URL}/${route}`);
      setFetchSelectData(data);
    }
    loadFetch();
  }, []);
  const handleOnSelectIngredient = (selectedIndex, ingredientId) => {
    setDataArray((prev) =>
      prev.map((item, index) =>
        selectedIndex === index ? { ingredient: ingredientId } : item
      )
    );
  };

  // const handleOnSelectDiet = (event) => {
  //   if (event) {
  //     const dietsId = event.map((item) => item.value);
  //     setDataArray(dietsId);
  //   } else {
  //     setDataArray([]);
  //   }
  // };

  const handleChange = (index, key, value) => {
    setDataArray((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const handleFormChangeCat = (e) => {
    setDataArray(e?.value || null);
  };

  const handleAddIngredient = () => {
    setDataArray((prev) => [...prev, { ingredient: "" }]);
  };

  const handleRemoveIngredient = (array, index) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setDataArray(newArray);
  };

  const options = Array.isArray(fetchSelectData)
    ? fetchSelectData.map((ing) => ({
        value: ing.id,
        label: ing.name,
      }))
    : [];

  return (
    <>
      {" "}
      <div style={{ textAlign: "left" }}>
        {
          // route === "diets" ? (
          //   <Select
          //     // className="basic-multi-select"
          //     className="recipeform-select"
          //     classNamePrefix="select"
          //     isClearable={true}
          //     isSearchable={true}
          //     isMulti
          //     placeholder="Ernährungsform"
          //     name="diet_select"
          //     options={options}
          //     onChange={(event) => handleOnSelectDiet(event)}
          //   />
          // ) :
          route === "categories" ? (
            <Select
              // className="basic-single"
              className="recipeform-select "
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              placeholder="Gerichte"
              name={` ${route}`}
              options={options}
              onChange={handleFormChangeCat}
            />
          ) : (
            <>
              {/* <div>{JSON.stringify(dataArray)}</div> */}
              {dataArray.map((ingredient, index) => (
                <div
                  key={index}
                  style={{ textAlign: "left" }}
                  className="recipeform-ingredient-item"
                >
                  <Select
                    defaultInputValue={ingredient.ingredient}
                    // className="basic-single"
                    className="recipeform-select-field"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="Zutaten auswählen"
                    name={`ingredients_select_${index}`}
                    options={options}
                    onChange={(e) => handleOnSelectIngredient(index, e.value)}
                    required
                  />

                  <input
                    type="number"
                    value={ingredient.quantity || ""}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    placeholder="Menge"
                    className="recipeform-input-field"
                    required
                    min="0"
                  />
                  <select
                    className="recipeform-input-field"
                    placeholder="Einheit"
                    value={ingredient.unit || ""}
                    onChange={(e) =>
                      handleChange(index, "unit", e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Einheit
                    </option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="stk">Stück</option>
                  </select>
                  {/* <SelectArray
                    setSelectedOption={setSelectedOptionUnit}
                    optionsName="unit"
                  /> */}
                  {dataArray.length > 1 && (
                    <button
                      className="recipeform-input-field-btn"
                      type="button"
                      onClick={() => handleRemoveIngredient(dataArray, index)}
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
              <button
                className="recipeform-input-field-btn"
                type="button"
                onClick={handleAddIngredient}
              >
                + Zutat hinzufügen
              </button>
            </>
          )
        }
      </div>
    </>
  );
}

export default ZutatenForm;
