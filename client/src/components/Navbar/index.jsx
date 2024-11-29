import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = { useNavigate };
  return (
    <header className="navbar">
      <div className="navbar-brand">SMARTBITE</div>
      <nav>
        <ul className="navbar-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/recipeAll">Rezepte</NavLink>
          </li>
          <li>
            <NavLink to="/BMI">BMI</NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/recipeform">Neue Rezepte</NavLink>
              </li>
              <li>
                {/* <button
                  onClick={() => {
                    signOut;
                    navigate("/");
                  }}
                > */}
                <button
                  onClick={() => {
                    signOut(), navigate("/");
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
