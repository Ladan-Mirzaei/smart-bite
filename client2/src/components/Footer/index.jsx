import "./Footer.css"; // Import the CSS file for styling the footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>RECIPES</h3>
          <p>© COPYRIGHT 2022 HIZAM.PRO STUDIOS, ALL RIGHTS RESERVED</p>
        </div>
        <div className="footer-section">
          <h3>Recent Recipes</h3>
          <ul>
            <li>"Healthy Cooking Tips"</li>
            <li>"The Right Nutrition"</li>
            <li>"Fear Of Food"</li>
            <li>"What Should I Eat"</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>
            <strong>Address:</strong> 376 N 100th E Fairview, Utah(UT), 84629
          </p>
          <p>
            <strong>Email:</strong> Hizamm19@Gmail.Com
          </p>
        </div>
        <div className="footer-section">
          <h3>Need Help?</h3>
          <p>(808) 555-0111</p>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Company | Services | Terms Of Use | Media</p>
      </div>
    </footer>
  );
};

export default Footer;
