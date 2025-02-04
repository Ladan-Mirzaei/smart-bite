import "./navBar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

import { useState } from "react";

export default function Navbar({ homeOnly = false }) {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const closeMenu = () => setMenuOpen(false);
  console.log(homeOnly);
  return (
    <header className="navbar">
      <div className="navbar-logo">SMARTBITE</div>
      <nav className="normal-menu">
        <ul className="navbar-links">
          {/* {homeOnly && ( */}
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/recipeAll">Rezepte</NavLink>
            </li>
            <li>
              <NavLink to="/recipe-search">Barcode suchen</NavLink>
            </li>

            <li>
              <NavLink to="/BMI">BMI</NavLink>
            </li>
          </>
          {/* )} */}

          {user && user.signUpCompleted ? (
            <>
              <li>
                <NavLink to="/profile" onClick={closeMenu}>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/recipeform">Neue Rezepte</NavLink>
              </li>
              <li>
                <NavLink to="/meine-favoriten">
                  <img
                    className="navbar-herz"
                    src="/icons8-herz-48.png"
                    alt="Herz-Icon"
                  />{" "}
                  Rezepte
                </NavLink>
              </li>
              <li>
                <button
                  onClick={async () => {
                    await signOut();
                    navigate("/");
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
      <Menu
        isOpen={menuOpen}
        onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
      >
        <NavLink className="menu-item" to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink className="menu-item" to="/recipeAll" onClick={closeMenu}>
          Rezepte
        </NavLink>
        <NavLink className="menu-item" to="/recipe-search" onClick={closeMenu}>
          Barcode suchen
        </NavLink>
        <NavLink className="menu-item" to="/BMI" onClick={closeMenu}>
          BMI
        </NavLink>
        {user ? (
          <>
            <NavLink className="menu-item" to="/profile" onClick={closeMenu}>
              Profile
            </NavLink>
            <NavLink className="menu-item" to="/recipeform" onClick={closeMenu}>
              Neue Rezepte
            </NavLink>
            <NavLink
              className="menu-item"
              to="/meine-favoriten"
              onClick={closeMenu}
            >
              <img
                className="navbar-herz"
                src="/icons8-herz-48.png"
                alt="Herz-Icon"
              />{" "}
              Rezepte
            </NavLink>
            <button
              className="menu-item-logout"
              onClick={async () => {
                await logoutUser();
                closeMenu();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink className="menu-item" to="/login" onClick={closeMenu}>
            Login
          </NavLink>
        )}
      </Menu>

      {/* <Menu>
        <div className="burger-menu">
          <NavLink className="menu-item" to="/" onClick={closeMenu}> */}
    </header>
  );
}
