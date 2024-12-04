import "./Profile.css";
import { useAuth } from "../../context/AuthContext";
import RecipePlanner from "../../components/Calendar/index.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditForm from "./edit.jsx";
export default function Profile() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user, userData } = useAuth();
  const [profileData, setProfileData] = useState([]);
  const [userRecipe, setUserRecipe] = useState([]);
  const [showPopupDiet, setShowPopupDiet] = useState(false);
  const [showPopupCategory, setShowPopupCategory] = useState(false);
  const [showPopupAllergene, setShowPopupAllergene] = useState(false);

  useEffect(() => {
    async function loadUserData() {
      try {
        console.log("uid", user.uid);

        const token = await user.getIdToken();
        const response = await fetch(`${API_URL}/users/profile`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid: user.uid }),
        });
        if (!response.ok) {
          console.error("Data fetching error");
        }
        const userDataFetch = await response.json();
        setProfileData(userDataFetch);
        localStorage.setItem("profileData", profileData);
      } catch (err) {
        console.log(err);
      }
    }

    async function loadUserRecipes() {
      try {
        const token = await user.getIdToken();
        const response = await fetch(`${API_URL}/users/recipe`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid: user.uid }),
        });
        if (!response.ok) {
          console.error("Data fetching error");
        }
        const userRecipeFetch = await response.json();
        setUserRecipe(userRecipeFetch);

        console.log("Server Response:", userRecipeFetch);
      } catch (err) {
        console.log(err);
      }
    }
    loadUserRecipes();
    loadUserData();
  }, []);
  console.log(profileData);
  const handleOpenPopup = (showData) => {
    if (showData === "categories") {
      setShowPopupCategory(true);
    } else if (showData === "allergene") {
      setShowPopupAllergene(true);
    } else if (showData === "diets") {
      setShowPopupDiet(true);
    }
  };
  // const handleClosePopup = () => {
  //   setShowPopup(false);
  // };
  return (
    <div className="profile-container">
      <div className="profile-privat">
        <div className="profile-info">
          {Array.isArray(profileData) &&
            profileData.map((user) =>
              user.gender === "weiblich" ? (
                <img
                  key={user.uid}
                  src={
                    user.photoURL ||
                    "https://res.cloudinary.com/dxneunm1q/image/upload/v1732794719/matyiqf0yrfrdyxtcwyj.avif"
                  }
                  alt="Profile"
                />
              ) : (
                <img
                  key={user.uid}
                  src={
                    user.photoURL ||
                    "https://res.cloudinary.com/dxneunm1q/image/upload/v1732794719/qnqftwuedzuc5opwztlc.avif"
                  }
                  alt="Profile"
                />
              )
            )}
        </div>
        <div className="profile-userInfo">
          <h3>Über mich</h3>
          <p>
            Welcome,
            {userData?.firstName || "Gast"} {userData?.lastName || ""}!
            <p>{user?.email} </p>
            <Link to="/meine-favoriten">Meine Favoriten Rezepte</Link>
          </p>
        </div>
      </div>
      <div className="profile-categories-container">
        <div className="profile-category">
          {" "}
          <div className="profile-header">
            <h3>Meine Ernährungsweise </h3>
            <span>
              <button onClick={() => handleOpenPopup("diets")}>✏️ Edit</button>
            </span>
            {showPopupDiet && (
              <div
                style={{
                  position: "fixed",
                  top: "30%",
                  left: "50%",
                  background: "white",
                  padding: "20px",
                  border: "1px solid black",
                  zIndex: 1000,
                }}
              >
                <h2>Diets!</h2>
                {/* <button onClick={handleClosePopup}>speichern</button>  */}
                <EditForm
                  setShowPopupDiet={showPopupDiet}
                  route="diets"
                  placeholder="Diets"
                />
              </div>
            )}
          </div>
          <ul>
            {Array.isArray(profileData) &&
              profileData.map((user) => (
                <li key={user.uid}>{user.diet_type_name}</li>
              ))}
          </ul>
        </div>
        <div className="profile-category">
          <div className="profile-header">
            <h3>Lieblingsküchen</h3>
            <span>
              <button onClick={() => handleOpenPopup("categories")}>
                ✏️ Edit
              </button>
            </span>
            {showPopupCategory && (
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  background: "white",
                  padding: "20px",
                  border: "1px solid black",
                  zIndex: 1000,
                }}
              >
                {" "}
                <h2>Categories!</h2>
                <EditForm
                  setShowPopupCategory={showPopupCategory}
                  route="categories"
                  placeholder="categories"
                />
                {/* <button onClick={handleClosePopup}>speichern</button> */}
              </div>
            )}{" "}
          </div>
          <ul>
            {Array.isArray(profileData) &&
              profileData.map((user) => (
                <li key={user.uid}>{user.category_name}</li>
              ))}
          </ul>
        </div>
        <div className="profile-category">
          <div className="profile-header">
            <h3>Allergien</h3>
            <span>
              <button onClick={() => handleOpenPopup("allergene")}>
                ✏️ Edit
              </button>
            </span>
            all
            {showPopupAllergene && (
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "70%",
                  background: "white",
                  padding: "20px",
                  border: "1px solid black",
                  zIndex: 1000,
                }}
              >
                <h2>Allergien!</h2>
                <EditForm
                  setShowPopupAllergene={showPopupAllergene}
                  route="allergene"
                  placeholder="Allergene"
                />
              </div>
            )}{" "}
          </div>
          <ul>
            {Array.isArray(profileData) &&
              profileData.map((user) => (
                <li key={user.uid}>{user.allergene_name}</li>
              ))}
          </ul>
        </div>
      </div>

      <div className="profile-main-content">
        <div className="profile-todo-container">
          <div className="profile-recipe-container">
            Meine Rezepte! All Rezepte
          </div>{" "}
          <div className="profile-gallery">
            {Array.isArray(userRecipe) &&
              userRecipe.map((user) => (
                <div key={user.uid} className="profile-gallery-item">
                  <img src={user.image} alt={`Bild ${user.id}`} />
                  <h4>{user.title}</h4>
                  <p>Hello World</p>
                  <span className="profile-gallery-des">
                    {user.category_name}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="profile-calendar-container">
          <RecipePlanner />
        </div>
      </div>
    </div>
  );
}

// // Parent component
// function App() {
//   const name = "John";
//   return (
//     <ChildComponent name={name} />
//   );
// }

// // Child component
// function ChildComponent(props) {
//   return (
//     <h1>Hello, {props.name}!</h1>
//   );
// }

// --------------------

// 2. In the parent component, define a state variable and a function to update that variable. Pass the function as a prop to the child component:
// ```jsx
// // Parent component
// import React, { useState } from 'react';
// import ChildComponent from './ChildComponent';

// const ParentComponent = () => {
//   const [parentState, setParentState] = useState('');

//   const handleStateChange = (value) => {
//     setParentState(value);
//   };

//   return (
//     <div>
//       <p>Parent state: {parentState}</p>
//       <ChildComponent onStateChange={handleStateChange} />
//     </div>
//   );
// }

// export default ParentComponent;
