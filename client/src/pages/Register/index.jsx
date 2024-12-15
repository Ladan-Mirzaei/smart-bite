import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

import { getFirestore, doc, setDoc } from "firebase/firestore";
import UploadImage from "../../components/UploadImage/index.jsx";

import "./Register.css";

import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { user, loading, signUp } = useContext(AuthContext);

  const [error, setError] = useState("");

  const db = getFirestore();
  const goToNextStep = () => {
    navigate("/register/userinfo");
  };

  const handleRegister = async () => {
    if (!firstName) {
      setError("Vorname darf nicht leer sein.");
      return;
    }
    if (loading) {
      return <h2>Loading...</h2>;
    }
    if (user) {
      if (user.signUpCompleted) {
        return <Navigate to="/" />;
      }
    }
    try {
      console.log("part1url", imageUrl);
      const registeredUser = await signUp({
        email,
        password,
        photoURL: imageUrl,
      });

      console.log(
        "Benutzer registriert und eingeloggt:",
        registeredUser.email,
        registeredUser
      );
      // Zusätzliche Benutzerdaten in Firestore speichern
      await setDoc(doc(db, "users", registeredUser.uid), {
        firstName: firstName,
        lastName: lastName,
      });

      goToNextStep();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-section">
          <h2>Neukunden:</h2>
          <div className="login-form">
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Vorname*"
              className="login-input-field"
            />
          </div>
          <div className="login-form">
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Nachname"
              className="login-input-field"
            />
          </div>
          <div className="login-form">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail*"
              className="login-input-field"
            />
          </div>
          <div className="login-form">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort*"
              className="login-input-field"
            />
          </div>

          <br />
          <div className="register-uploadImage">
            <UploadImage setImageUrl={setImageUrl} />
            {imageUrl.secure_url && (
              <p>Bild hochgeladen: {imageUrl.secure_url}</p>
            )}
          </div>

          <button onClick={handleRegister} className="btn-login">
            Registrieren
          </button>
          {/* <p className="forgot-password">Passwort vergessen?</p> */}
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="login-section-right">
          <h2>Ich habe bereits ein Konto:</h2>
          <button onClick={() => navigate("/Login")} className="btn-continue">
            Weiter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
