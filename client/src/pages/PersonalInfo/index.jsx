import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import UserProfileForm from "../../components/PersonalInfo/index.jsx";
import { auth } from "../../firebaseConfig.js";
import "./personalInfo.css";
import { Navigate } from "react-router-dom";

export default function UserProfile({ goToNextStep }) {
  const [userData, setUserData] = useState("null");
  const { user, loading, refreshUser } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  async function onFormSubmit(formData) {
    try {
      if (!user) {
        console.log("User not logged in");
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

      if (!response.ok) {
        console.log("Failed to fetch userProfile ");
      }

      const data = await response.json();
      setUserData(data);
      refreshUser();
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  }
  // if (loading) {
  //   console.log("user details loading");
  //   return <h2>Loading...</h2>;
  // }

  // if (user && user.signUpCompleted) {
  //   console.log("user details navigate home");
  //   return <Navigate to="/" />;
  // }

  // if (!user) {
  //   return <Navigate to="/login" />;
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
