import "./Navbar.css";

const Navbar = () => {
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
          <li>
            <a href="#nutrition">Ernährung</a>
          </li>
          <li>
            <a href="#recipes">Rezepte</a>
          </li>
          <li>
            <a href="#weekly-recipes">Wochenrezepte</a>
          </li>
          <li>
            <a href="#market">Markt finden</a>
          </li>
          <li>
            <a href="#search">SEARCH</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
