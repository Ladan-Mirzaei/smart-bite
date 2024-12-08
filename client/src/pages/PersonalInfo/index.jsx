import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import UserProfileForm from "../../components/PersonalInfo/index.jsx";
import { auth } from "../../firebaseConfig.js";
import "./personalInfo.css";

export default function UserProfile({ goToNextStep }) {
  const [userData, setUserData] = useState("null");
  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  async function onFormSubmit(formData) {
    try {
      if (!user) {
        console.error("User not logged in");
        return;
      }
      const token = await user.getIdToken();

      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // date_of_birth: formData.date_of_birth,
          // gender: formData.gender,
          // weight: formData.weight,
          // height: formData.height,
          // activity_level: formData.activity_level,
          ...formData,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch userProfile ");

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }
  // if (userData) {
  //   return <Navigate to="/home" />;
  // }
  return (
    <>
      {" "}
      <div className="personal-container">
        <h2>Persönliche Angaben!</h2>
        <UserProfileForm
          onFormSubmit={onFormSubmit}
          goToNextStep={goToNextStep}
        />
      </div>
    </>
  );
}
