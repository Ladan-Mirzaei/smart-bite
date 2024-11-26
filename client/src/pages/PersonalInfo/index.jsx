import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import UserProfileForm from "../../components/PersonalInfo/index.jsx";
import { auth } from "../../firebaseConfig.js";
import "./style.css";

export default function UserProfile({ goToNextStep }) {
  const [userData, setUserData] = useState("null");
  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  async function onFormSubmit(formData) {
    console.log("1", formData);
    try {
      if (!user) {
        console.error("User not logged in");
        return;
      }
      const token = await user.getIdToken();
      console.log("token", token);

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
          uid: user.uid,
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
      <h2>Hello!</h2>
      <div>
        <UserProfileForm
          onFormSubmit={onFormSubmit}
          goToNextStep={goToNextStep}
        />
      </div>
    </>
  );
}
