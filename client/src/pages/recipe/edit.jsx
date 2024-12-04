import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import { useAuth } from "../../context/AuthContext";
import SelectWithPlus from "../../components/Select/selectWithPlus.jsx";
import { updateUserInfo } from "../../functions/updateUserInfo.js";

export default function EditForm({ setShowPopup, route }) {
  const { fetchData } = useFetch();

  const [fetchSelectData, setFetchSelectData] = useState([]);
  const { user } = useAuth();
  const [categoriesData, setCategoriesData] = useState(null);
  const [dietsData, setDietsData] = useState([]);
  const [allergeneData, setAllergeneData] = useState([]);
  const [userUpdateData, SetUserUpdateData] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  // const route = "diets";
  // Fetch data for select options categories/updatecategories
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchData(`${API_URL}/${route}`, "GET");
        setFetchSelectData(data);
      } catch (err) {
        console.error("Error fetching diet data:", err);
      }
    }
    loadData();
  }, []);
  console.log("route444444", route);

  async function handleSubmit(e, route, dataArray) {
    e.preventDefault();
    const token = await user.getIdToken();
    const result = await updateUserInfo(token, route, dataArray);
    SetUserUpdateData(result);
    setShowPopup(false);
  }

  // const handleClosePopup = () => {
  //   setShowPopup(false);
  // };
  console.log("category", categoriesData);
  console.log("diet", dietsData);
  console.log("allergene", allergeneData);
  console.log("route", route);

  return (
    <div>
      {route === "diets" && (
        <form onSubmit={(e) => handleSubmit(e, "diets", dietsData)}>
          <SelectWithPlus
            dataArray={dietsData || []}
            setDataArray={setDietsData}
            route={route}
            placeholder="Diet-type"
          />
          <button type="submit">speichern</button>
        </form>
      )}
      {route === "categories" && (
        <form onSubmit={(e) => handleSubmit(e, "categories", categoriesData)}>
          <SelectWithPlus
            dataArray={categoriesData || []}
            setDataArray={setCategoriesData}
            route={route}
            placeholder="Category"
          />
          <button type="submit">speichern</button>
        </form>
      )}
      {route === "allergene" && (
        <form onSubmit={(e) => handleSubmit(e, "allergene", allergeneData)}>
          <SelectWithPlus
            dataArray={allergeneData || []}
            setDataArray={setAllergeneData}
            route={route}
            placeholder="Allergene"
          />
          <button type="submit">speichern</button>
        </form>
      )}
    </div>
  );
}
