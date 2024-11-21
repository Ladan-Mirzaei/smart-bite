// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Zum Navigieren nach dem Logout
import "./home.css";
export default function Home() {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate(); // Hook für Navigation

  // useEffect(() => {
  //   const auth = getAuth();
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user); // Benutzer ist eingeloggt
  //     } else {
  //       setUser(null); // Benutzer ist nicht eingeloggt
  //     }
  //   });

  //   // Cleanup-Funktion: Abmelden vom Authentifizierungs-Listener
  //   return () => unsubscribe();
  // }, []);

  // // Logout - Funktion;
  // const handleLogout = async () => {
  //   const auth = getAuth();
  //   try {
  //     await signOut(auth); // Benutzer ausloggen
  //     navigate("/login"); // Nach dem Logout zur Login-Seite navigieren (optional)
  //   } catch (error) {
  //     console.error("Fehler beim Abmelden:", error.message);
  //   }
  // };

  // Wenn user null ist, zeige eine Ladeanzeige oder eine leere Seite
  // if (user === null) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="home-content">
      <section className="hero">
        <h1>Perfectly Light In Every Bite</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus
          libero tellus, sed eleifend augue.
        </p>
        <button className="cta-button">Get Started</button>
        <p className="cta-note">Daily Plan Daily PlanDaily Plan</p>
      </section>

      <section className="subscription">
        <form className="subscription-form">
          <input
            type="text"
            placeholder="Enter your name"
            className="input-name"
          />
          <input
            type="email"
            placeholder="Enter your email address"
            className="input-email"
          />
          <button type="submit" className="subscribe-button">
            SUBSCRIBE
          </button>
        </form>
      </section>
      {/* -------------------------- */}
      <div className="card-container">
        <div className="card">
          <div className="card-icon">
            <img src="../../../public/keto.png" alt="Keto" />
          </div>
          <div className="card-titel">Keto</div>
          <h2>Weight Loss</h2>
          <div className="card-bild">
            <img
              src="../../../public/gefuellte-zucchini-aus-dem-ofen.webp"
              alt="gefuellte-zucchini-aus-dem-ofen.webp"
            />
          </div>
          {/* <p>Orbi iaculis mattis diam, sit amet viverra ex scelerisque vel.</p> */}
          <a href="#" className="read-more">
            Read More
          </a>
        </div>
        <div className="card">
          <div className="card-icon">
            <img src="../../../public/vegetarian.png" alt="vegetarian" />
          </div>
          <div className="card-titel">Vegetarisch</div>
          <h3>Food Salads</h3>
          <h4>Daily Plan</h4>
          <p>
            Die Keto-Diät ist eine Ernährungsform, die sehr arm an
            Kohlenhydraten.
          </p>
          <a href="#" className="read-more">
            Read More
          </a>
        </div>
        <div className="card highlighted">
          <div className="card-icon">
            <img src="../../../public/Vegan.png" alt="Vegan" />
          </div>
          <div className="card-icon"></div>
          <div className="card-titel">Vegan</div>
          <h3>Food Sensitivities</h3>
          <h4>Daily Plan</h4>
          <p>
            Die Keto-Diät ist eine Ernährungsform, die sehr arm an
            Kohlenhydraten.
          </p>
          <a href="#" className="read-more">
            Read More
          </a>
        </div>
        <div className="card">
          <div className="card-icon">
            <img src="../../../public/glutenfrei.png" alt="glutenfrei" />
          </div>
          <div className="card-titel">Glutenfrei</div>
          <h3>Daily Plan</h3>
          <div className="card-icon">
            <img src="../../../public/glutenfrei.png" alt="glutenfrei" />
          </div>{" "}
          <p>
            Die Keto-Diät ist eine Ernährungsform, die sehr arm an
            Kohlenhydraten.
          </p>
          <a href="#" className="read-more">
            Read More
          </a>
        </div>
      </div>

      {/* <h2>Willkommen, {user.email}!</h2>
      <p>
        Dies ist die Home-Seite, die nur für angemeldete Benutzer zugänglich
        ist.
      </p>
      Button zeigt sich je nach Login-Status
      {user ? (
        <button onClick={handleLogout}>Logout</button> // Zeigt den Logout-Button, wenn der Benutzer eingeloggt ist
      ) : (
        <button onClick={() => navigate("/login")}>Login</button> // Zeigt den Login-Button, wenn der Benutzer nicht eingeloggt ist
      )} */}
    </div>
  );
}
