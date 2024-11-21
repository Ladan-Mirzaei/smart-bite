import "./home.css"; // Import the CSS file for styling

const Home = () => {
  return (
    <>
      <section className="hero">
        <h1>Perfectly Light In Every Bite</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus
          libero tellus, sed eleifend augue.
        </p>
        <button className="cta-button">Get Started</button>
        <p className="cta-note">Get 3 Month Recipe Book For Free</p>
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
          <div className="card-icon">🍽️</div>
          <div className="card-number">01</div>
          <h3>Weight Loss</h3>
          <h4>Diet Plan</h4>
          <p>Orbi iaculis mattis diam, sit amet viverra ex scelerisque vel.</p>
          <a href="#" className="read-more">
            Read More
          </a>
        </div>
        <div className="card">
          <div className="card-icon">🥗</div>
          <div className="card-number">02</div>
          <h3>Food Salads</h3>
          <h4>Personalized Nutrition</h4>
          <p>Orbi iaculis mattis diam, sit amet viverra ex scelerisque vel.</p>
          <a href="#" className="read-more">
            Read More
          </a>
        </div>
        <div className="card highlighted">
          <div className="card-icon">🍏</div>
          <div className="card-number">03</div>
          <h3>Food Sensitivities</h3>
          <h4>Excess Weight</h4>
          <p>Orbi iaculis mattis diam, sit amet viverra ex scelerisque vel.</p>
          <a href="#" className="read-more">
            Read More
          </a>
        </div>
        <div className="card">
          <div className="card-icon">🏋️</div>
          <div className="card-number">04</div>
          <h3>Daily Exercise Plan</h3>
          <h4>Exercise Program</h4>
          <p>Orbi iaculis mattis diam, sit amet viverra ex scelerisque vel.</p>
          <a href="#" className="read-more">
            Read More
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
