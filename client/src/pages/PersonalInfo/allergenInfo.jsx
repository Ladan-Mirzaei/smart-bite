import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ZutatenForm from "../../components/Recipe/selectIngredients.jsx";
import SelectWithPlus from "../../components/Select/selectWithPlus.jsx";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function AllergyInfo() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AuthContext);
  const [allergenData, setAllergenData] = useState([""]);
  const [categoriesData, setCategoriesData] = useState(null);
  const [dietData, setDietData] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([""]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      category_id: categoriesData || null,
      diet_type_id: dietData || null,
      ingredient_id: ingredientsData || null,
      allergene_id: allergenData || null,
    };

    try {
      const token = await user.getIdToken();
      const response = await fetch(`${API_URL}/users/userallergene`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...finalData, uid: user.uid }),
      });
      if (!response.ok) {
        console.error("Data fetching error");
      }
      const data = await response.json();
      console.log("Server Response:", data);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => {
  //   async function loadAllergens() {
  //     const allergens = await fetchData(`${API_URL}/allergene`, "GET");
  //     const ingredient = await fetchData(`${API_URL}/ingredients`, "GET");
  //     setAllergenData(allergens || []);
  //     setFetchSelectData(ingredient || []);
  //   }

  //   loadAllergens();
  // }, [fetchData]);
  // console.log(Array.isArray(ingredientsSelect));

  // const addSelect = () => {
  //   setIngredientsSelect([...ingredientsSelect, { ingredient: "" }]);
  // };

  // const handleOnSelectIngredient = (value, index) => {
  //   const updatedSelect = [...ingredientsSelect];
  //   updatedSelect[index] = value;
  //   setIngredientsSelect(updatedSelect);
  // };
  // const handelAllChange = (event) => {
  //   const allergenIds = event.map((item) => item.value);
  //   setAllergen(allergenIds);
  // };
  // const options = Array.isArray(fetchSelectData)
  //   ? fetchSelectData.map((ing) => ({
  //       value: ing.id,
  //       label: ing.name,
  //     }))
  //   : [];
  return (
    <div className="form-container">
      <h2>Benutzerinformationen zu Ernährung und Allergien</h2>
      <h2>Persönliche Ernährungseinstellungen</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <ZutatenForm
            dataArray={dietData}
            setDataArray={setDietData}
            route="diets"
            hasIngredients={true}
          />
          <ZutatenForm
            dataArray={categoriesData}
            setDataArray={setCategoriesData}
            route="categories"
            hasIngredients={false}
          />
          {/* {ingredientsSelect.map((ing, index) => (
            <div key={index}>
              {" "}
              <Select
                // defaultInputValue={ing}
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                placeholder="Zutaten auswählen"
                name={`ingredient-${index}`}
                options={options}
                onChange={(e) => handleOnSelectIngredient(e.value, index)}
              />
            </div>
          ))} */}
          <SelectWithPlus
            dataArray={ingredientsData}
            setDataArray={setIngredientsData}
            route="ingredients"
            placeholder="Zutaten Allergie auswählen"
          />
        </div>
        oedr
        <SelectWithPlus
          dataArray={allergenData}
          setDataArray={setAllergenData}
          route="allergene"
          placeholder="Allergie auswählen"
        />
        {/* <Select
          placeholder="Allergie auswählen"
          name="allergene"
          options={options}
          className="basic-single"
          classNamePrefix="select"
          isSearchable={true}
          isMulti
          onChange={handelAllChange}
        /> */}
        <button type="submit">Speichern</button>
      </form>
    </div>
  );
}
