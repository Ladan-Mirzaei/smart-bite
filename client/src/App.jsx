import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <div>
        DEVELOPMENT: <a href="/scanner">Scanner</a>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
