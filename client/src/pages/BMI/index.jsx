import { useState } from "react";
import Calculator from "./components/BMI-Calculator.jsx";
import "./components/BMIStyle.css";
import BMIIMage from "./assets/BMI.jpg";

function App() {
  const [users, setUsers] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Willkommen zum BMI Rechner</h1>
        <div className="image-container">
          <img src={BMIIMage} alt="BMI Rechner" />
        </div>
      </header>
      <main>
        <Calculator users={users} setUsers={setUsers} />
      </main>
    </div>
  );
}

export default App;
