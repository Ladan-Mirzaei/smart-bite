import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function NavBar() {
  const { user, signOut } = useAuth();

  return (
    <nav>
      <ul>
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
      </ul>
    </nav>
  );
}
