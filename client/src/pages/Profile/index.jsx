import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome, {user ? user.email + user.uid : "Guest"}</p>
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
