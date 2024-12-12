import { useState, useContext } from "react";
import { loginUser } from "./authService.js";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      console.log("Erfolgreich eingeloggt:", user.email);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (user) {
    if (user.signUpCompleted) {
      return <Navigate to="/" />;
    } else {
      return <Navigate to="/register/userinfo" />;
    }
  }
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-columns">
          <form onSubmit={handleLogin} className="login-section">
            <h2>Ich habe ein Konto:</h2>
            <div className="login-form">
              <input
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input-field"
              />
            </div>
            <div className="login-form">
              <input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input-field"
              />
            </div>
            <button onClick={handleLogin} className="btn-login">
              Anmelden
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
          <div className="login-section-right">
            <h2>Neukunden:</h2>
            <button
              onClick={() => navigate("/register")}
              className="btn-continue"
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

// src/components/Login.js
// import { useState } from "react";
// import { loginUser } from "./authService.js";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const user = await loginUser(email, password);
//       console.log("Erfolgreich eingeloggt:", user.email);
//       navigate("/");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="email"
//         placeholder="E-Mail"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Passwort"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Anmelden</button>
//       {error && <p>{error}</p>}
//     </div>
//   );
// }

// export default Login;
