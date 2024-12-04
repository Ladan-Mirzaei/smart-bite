import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";
import { useAuth } from "../../context/AuthContext";

export default function EditForm() {
  const { fetchData } = useFetch();
  const [fetchSelectData, setFetchSelectData] = useState([]);
  const { user } = useAuth();
  const [profileData, setProfileData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [userUpdateData, SetUserUpdateData] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const route = "diets";

  useEffect(() => {
    async function loadUserData() {
      try {
        const token = await user.getIdToken();
        const response = await fetch(`${API_URL}/users/profile`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid: user.uid }),
        });

        const userDataFetch = await response.json();
        setProfileData(userDataFetch);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    }

    loadUserData();
  }, []);
  console.log("bbbbfsdfbb", profileData);
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
  console.log("FetchSelectDat", fetchSelectData);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    console.log("test33333333", selectedValues);
  };
  const updateFields = selectedValues;
  console.log("keys", updateFields);
  console.log("user.uid", user.uid);
  console.log("setSelectedValues", selectedValues);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = await user.getIdToken();

      const response = await fetch(`${API_URL}/diets/updatediets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updateFields }),
      });
      if (!response.ok) {
        console.error("Data fetching error");
      }
      const data = await response.json();
      SetUserUpdateData(data);

      console.log("Server Response:", userUpdateData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {Array.isArray(profileData) &&
          profileData.map((user, userIndex) => (
            <div key={user.uid}>
              {Array.isArray(user.diet_type_name) &&
                user.diet_type_name.map((dietType, dietIndex) => (
                  <div key={`${user.uid}-${dietIndex}`}>
                    <label htmlFor={`diet-type-${user.uid}-${dietIndex}`}>
                      {dietType}
                    </label>
                    {Array.isArray(fetchSelectData) && (
                      <select
                        id={`diet-type-${user.uid}-${dietIndex}`}
                        name={`Diet-Type-${user.uid}-${dietIndex}`}
                        value={
                          selectedValues[`${userIndex}-${dietIndex}`] || ""
                        }
                        onChange={(e) =>
                          handleSelectChange(userIndex, dietIndex, e)
                        }
                      >
                        <option value="">Select an option</option>
                        {fetchSelectData.map((optionItem) => (
                          <option key={optionItem.id} value={optionItem.id}>
                            {optionItem.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
            </div>
          ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
