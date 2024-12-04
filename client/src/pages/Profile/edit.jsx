import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import { useAuth } from "../../context/AuthContext";
import SelectWithPlus from "../../components/Select/selectWithPlus.jsx";
import { updateUserInfo } from "../../functions/updateUserInfo.js";

export default function EditForm({
  setShowPopupDiet,
  setShowPopupcategory,
  setShowPopupAllergene,
  route,
  placeholder,
}) {
  const { fetchData } = useFetch();
  const [fetchSelectData, setFetchSelectData] = useState([]);
  const [resultData, setResultData] = useState();
  const { user } = useAuth();
  const [userUpdateData, SetUserUpdateData] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    async function loadData() {
      console.log("EditForm - useEffect: ", { API_URL, fetchData, route });
      try {
        const data = await fetchData(`${API_URL}/${route}`, "GET");
        setFetchSelectData(data);
      } catch (err) {
        console.error("Error fetching diet data:", err);
      }
    }
    loadData();
  }, [API_URL, route]);

  async function handleSubmit(e) {
    e.preventDefault();
    const token = await user.getIdToken();
    const result = await updateUserInfo(token, route, fetchSelectData);
    SetUserUpdateData(result);
    setShowPopupDiet(false),
      setShowPopupcategory(false),
      setShowPopupAllergene(false);
  }
  console.log("setResultData", setResultData);
  // const handleClosePopup = () => {
  //   setShowPopup(false);
  // };
  // console.log("category", categoriesData);
  // console.log("diet", dietsData);
  // console.log("allergene", allergeneData);
  console.log("route", route);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <SelectWithPlus
          dataArray={fetchSelectData}
          setDataArray={setResultData}
          route={route}
          placeholder={placeholder}
        />
        <button type="submit">speichern</button>
      </form>
    </div>
  );
}
