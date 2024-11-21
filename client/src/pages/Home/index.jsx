import "./home.css";
import RandomRecipe from "../../components/Home/randomRecipe.jsx";
export default function Home() {
  return (
    <div className="home-content">
      <section className="hero">
        <h1>REzept</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus
          libero tellus, sed eleifend augue.
        </p>
        <button className="cta-button">suche</button>
        <p className="cta-note">Zutaten</p>
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
        <RandomRecipe />
      </div>

      {/* <h2>Willkommen, {user.email}!</h2>
      <p>
        Dies ist die Home-Seite, die nur für angemeldete Benutzer zugänglich
        ist.
      </p>
      Button zeigt sich je nach Login-Status
      {user ? (
        <button onClick={handleLogout}>Logout</button> 
      ) : (
        <button onClick={() => navigate("/login")}>Login</button> 
      )} */}
    </div>
  );
}
