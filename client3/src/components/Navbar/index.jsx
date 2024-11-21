import "./navbar.css";
import { AuthContext } from "../../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // Logout-Funktion
  // const handleLogout = async () => {
  //   const auth = getAuth();
  //   try {
  //     await signOut(auth); // Benutzer abmelden
  //     console.log("Erfolgreich abgemeldet");
  //     navigate("/login"); // Nach dem Logout zur Login-Seite navigieren
  //   } catch (error) {
  //     console.error("Fehler beim Abmelden:", error.message);
  //   }
  // };
  return (
    <header className="navbar">
      <div className="navbar-brand">RECIPES</div>
      <nav>
        <ul className="navbar-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#my-recipes">Meine Rezepte</a>
          </li>
          {/* <li>
            {user ? (
              <>
                <span>
                  Willkommen{user.email}
                  <button onClick={handleLogout}>Logout</button>
                </span>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Register</button>
              </>
            )}
          </li> */}
          {/* <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {user ? (
          <>
            <li>
              <NavLink to="/recipe">Recipe</NavLink>
            </li>
            <li>
              <button onClick={signOut}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul> */}
        </ul>
      </nav>
    </header>
  );
}
