import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
function App() {
  const location = useLocation();

  const isHome = location.pathname === "/" ? true : false;

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className={`root${isHome ? "home" : ""}`}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
