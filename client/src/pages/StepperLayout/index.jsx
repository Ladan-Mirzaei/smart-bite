import "./StepperLayout.css";
import { Outlet, useLocation } from "react-router-dom";

export default function StepperLayout() {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <>
      <div className="progress-bar">
        <div className={`step ${pathname === "/register" ? "active" : ""}`}>
          1
        </div>
        <div
          className={`step ${
            pathname === "/register/userinfo" ? "active" : ""
          }`}
        >
          2
        </div>
        <div
          className={`step ${
            pathname === "/register/allergene" ? "active" : ""
          }`}
        >
          3
        </div>
      </div>
      <div className="progress-labels">
        <span>Registrierung</span>
        <span>Persönliche Informationen</span>
        <span>Allergiezuordnung</span>
      </div>
      <Outlet />
    </>
  );
}
