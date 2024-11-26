import "./Profile.css";
import { useAuth } from "../../context/AuthContext";
import RecipePlanner from "../../components/Calendar/index.jsx";

const Profile = () => {
  const { user, userData } = useAuth();
  console.log("userdata", user, userData);
  // if (!userData) {
  //   return <div>Loading user data...</div>;
  // }

  return (
    <div className="profile-container">
      <div className="profile-privat">
        <div className="profile-info">
          <img src={user.photoURL || "default-avatar.jpg"} alt="Profile" />
        </div>
        <div className="profile-userInfo">
          <h3>Über mich</h3>
          <p>
            Welcome,
            {userData.firstName} {userData.lastName}!<p>{user.email} </p>
          </p>
        </div>
      </div>

      <div className="profile-categories-container">
        <div className="profile-category">
          <div className="profile-header">
            <h3>Meine Ernährungsweise</h3>
            <span>✏️ Edit</span>
          </div>
          <ul>
            <li>vegan</li>
          </ul>
        </div>
        <div className="profile-category">
          <div className="profile-header">
            <h3>Lieblingsküchen</h3>
            <span>✏️ Edit</span>
          </div>
          <ul>
            <li>chinisisch</li>
          </ul>
        </div>
        <div className="profile-category">
          <div className="profile-header">
            <h3>Allergien</h3>
            <span>✏️ Edit</span>
          </div>
          <ul>
            <li>Nüsse oder keine </li>
          </ul>
        </div>
      </div>

      <div className="profile-main-content">
        <div className="profile-todo-container">
          <div className="profile-recipe-container">
            Was koche ich heute! Rezepz hinzufügen ------ Meine Sammlungen
          </div>
          <div className="profile-tasks">
            <div className="profile-task">
              <img src="" alt="" />
              <p>test</p>
            </div>
          </div>
        </div>

        <div className="profile-calendar-container">
          <RecipePlanner />
        </div>
      </div>
    </div>
  );
};

export default Profile;

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
