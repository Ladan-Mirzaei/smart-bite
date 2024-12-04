import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import { useAuth } from "../../context/AuthContext";
import SelectWithPlus from "../../components/Select/selectWithPlus.jsx";

export default function EditForm({ setShowPopup }) {
  const { fetchData } = useFetch();
  const [fetchSelectData, setFetchSelectData] = useState([]);
  const { user } = useAuth();
  const [dietsData, setDietsData] = useState([]);
  const [userUpdateData, SetUserUpdateData] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const route = "diets";
  // Fetch data for select options
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

  // const handleSelectChange = (e) => {
  //   const { name, value } = e.target;
  //   setSelectedValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: value,
  //   }));
  //   console.log("Updated Selected Values:", selectedValues);
  // };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = await user.getIdToken();
      const response = await fetch(`${API_URL}/${route}/update${route}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updateFields: `${route}Data` }),
      });
      if (!response.ok) {
        throw new Error("Data fetching error");
      }
      const data = await response.json();
      SetUserUpdateData(data);

      console.log("Server Response:", data);
      setShowPopup(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  // const handleClosePopup = () => {
  //   setShowPopup(false);
  // };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <SelectWithPlus
          dataArray={dietsData}
          setDataArray={setDietsData}
          route="diets"
          placeholder="Diet-type"
        />
        {/* <button type="submit">Submit</button> */}
        <button type="submit">speichern</button>
      </form>
    </div>
  );
}
