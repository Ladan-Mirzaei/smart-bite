// import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import { useState } from "react"; // Falls du useState verwendest

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <h1>Hello, World!</h1>
      <button onClick={() => setCount(count + 1)}>Click me!</button>
    </div>
  );
}

export default App;
