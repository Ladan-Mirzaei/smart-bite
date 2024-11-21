import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import RecipeForm from "../../components/Recipe";
import { auth } from "../../firebaseConfig.js"; // Firebase-Konfigurationsdatei
import "./style.css";
export default function Recipe() {
  const [userData, setUserData] = useState("null");
  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  async function recipeFetch(formData) {
    try {
      if (!user) {
        console.error("User not logged in");
        return;
      }
      const token = await user.getIdToken(); //server-seite
      console.log("token", token);

      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, //server-seite
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          uid: user.uid,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch userProfile ");

      const data = await response.json();
      setUserData(data);
      console.log("3", userData);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }
  // if (userData) {
  //   return <Navigate to="/home" />;
  // }
  return (
    <>
      <h2>Neues Rezept erstellen</h2>
      <div>
        <RecipeForm recipeFetch={recipeFetch} />
      </div>
    </>
  );
}
