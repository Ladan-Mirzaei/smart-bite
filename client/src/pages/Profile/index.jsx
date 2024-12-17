import "./profile.css";
import { useAuth } from "../../context/AuthContext";
import RecipePlanner from "../../components/Calendar/index.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditForm from "./edit.jsx";
import QRCode from "react-qr-code";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;
const VERCEL_URL = "https://smart-bite-amber.vercel.app";
export default function Profile() {
  const { userData } = useAuth();
  const { user } = useContext(AuthContext);

  const [profileData, setProfileData] = useState([]);
  const [userRecipe, setUserRecipe] = useState([]);
  const [showPopupDiet, setShowPopupDiet] = useState(false);
  const [showPopupCategory, setShowPopupcategory] = useState(false);
  const [showPopupAllergene, setShowPopupAllergene] = useState(false);
  const shoppingListUrl = `${VERCEL_URL}/shoppinglist?user_uid=${user.uid}`;
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
        if (!response.ok) {
          console.log("Data fetching error");
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
          console.log("Data fetching error");
        }
        const userRecipeFetch = await response.json();
        setUserRecipe(userRecipeFetch);

        console.log("Server Response:", userRecipeFetch);
      } catch (err) {
        console.log(err);
      }
    }
    if (!showPopupCategory && !showPopupAllergene && !showPopupDiet) {
      loadUserRecipes();
      loadUserData();
    }
  }, [showPopupCategory, showPopupAllergene, showPopupDiet]);
  console.log(userRecipe);
  const handleOpenPopup = (showData) => {
    if (showData === "categories") {
      setShowPopupcategory(true);
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
            profileData.map((item) =>
              item.gender === "weiblich" ? (
                <img
                  key={user.uid}
                  src={
                    user.photoURL /***Firbase */
                      ? user.photoURL
                      : "/avatar-677865778.jpeg"
                  }
                  alt="Profile"
                />
              ) : (
                <img
                  key={user.uid}
                  src={user.photoURL || "../../../public/avatar-17214950.jpg"}
                  alt="Profile"
                />
              )
            )}
        </div>
        <div className="profile-userInfo">
          {/* <h3>Über mich</h3> */}
          {/* <p>  //änderung */}
          <h3>
            Willkommen,
            {userData?.firstName} {userData?.lastName || ""}!
          </h3>
          {/* </p> */}
          <p>{user?.email} </p>
        </div>
        {/* QR-Code für die Einkaufsliste */}
        <div className="week-list">
          <p>Deine Einkaufsliste für diese Woche</p>
          <QRCode value={shoppingListUrl} size={80} viewBox={`0 0 256 256`} />
        </div>
      </div>
      <div className="profile-categories-container">
        <div className="profile-category">
          {" "}
          <div className="profile-header">
            <h3>Meine Ernährungsweise </h3>
            <button className="profile-btn-ellipse ">
              <Link to="/userDietInfo"> Nährstoffbedarf</Link>
            </button>
            <span>
              <button
                className="profile-edit-btn"
                onClick={() => handleOpenPopup("diets")}
              >
                ✏️
              </button>
            </span>
            {showPopupDiet && (
              <div
                style={{
                  position: "fixed",
                  top: "48%",
                  left: "25%",
                  background: "white",
                  padding: "10px 30px",
                  border: "1px solid black",
                  zIndex: 1000,
                }}
              >
                <h2>Diets!</h2>
                <EditForm
                  setShowPopupDiet={setShowPopupDiet}
                  route="diets"
                  placeholder="Diets"
                />
              </div>
            )}
          </div>
          <ul>
            {profileData.map((user) => (
              <li key={user.uid}>
                <ul className="profile-horizontal-list">
                  {user.diet_type_name.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="profile-category">
          <div className="profile-header">
            <h3>Lieblingsküchen</h3>
            <span>
              <button
                className="profile-edit-btn"
                onClick={() => handleOpenPopup("categories")}
              >
                ✏️
              </button>
            </span>
            {showPopupCategory && (
              <div
                style={{
                  position: "fixed",
                  top: "48%",
                  left: "50%",
                  background: "white",
                  padding: "10px 30px",
                  border: "1px solid black",
                  zIndex: 1000,
                }}
              >
                {" "}
                <h2>Categories!</h2>
                <EditForm
                  setShowPopupcategory={setShowPopupcategory}
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
              <button
                className="profile-edit-btn"
                onClick={() => handleOpenPopup("allergene")}
              >
                ✏️
              </button>
            </span>
            {showPopupAllergene && (
              <div
                style={{
                  position: "fixed",
                  top: "48%",
                  left: "75%",
                  background: "white",
                  padding: "10px 30px",
                  border: "1px solid black",
                  zIndex: 1000,
                }}
              >
                <h2>Allergien!</h2>
                <EditForm
                  setShowPopupAllergene={setShowPopupAllergene}
                  route="allergene"
                  placeholder="Allergene"
                />
              </div>
            )}
          </div>

          <ul>
            {profileData.map((user) => (
              <li key={user.uid}>
                <ul className="profile-horizontal-list">
                  {user.allergene_name.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="profile-main-content">
        <div className="profile-todo-container">
          <div className="profile-recipe-container">Meine Rezepte!</div>
          <div className="profile-gallery">
            {Array.isArray(userRecipe) &&
              userRecipe.map((user) => (
                <div key={user.uid} className="profile-gallery-item">
                  <Link to={`/recipedetails/${user.id}`}>
                    <img src={user.image} alt={`Bild ${user.id}`} />
                    <h4>{user.title}</h4>{" "}
                  </Link>
                  <span className="profile-gallery-cat">
                    {user.category_name}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="profile-calendar-container">
          <RecipePlanner link={`/recipedetails`} />
        </div>
      </div>
    </div>
  );
}
