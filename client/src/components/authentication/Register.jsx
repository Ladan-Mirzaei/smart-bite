import { useState } from "react";
import { registerUser } from "./authService.js";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import PersonalInfo from "../../pages/PersonalInfo/index.jsx";
import AllergenInfo from "../../pages/PersonalInfo/allergenInfo.jsx";
import "./Login.css";
import "./Register.css";

import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const auth = getAuth();
  const db = getFirestore();
  // Function to advance the step
  const goToNextStep = () =>
    setStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));

  const handleRegister = async () => {
    if (!firstName) {
      setError("Vorname darf nicht leer sein.");
      return;
    }

    try {
      const registeredUser = await registerUser(email, password);

      // Store additional user information in Firestore
      console.log("Benutzer registriert und eingeloggt:", registeredUser.email);

      // Schritt 2: Zusätzliche Benutzerdaten in Firestore speichern
      await setDoc(doc(db, "users", registeredUser.uid), {
        firstName: firstName,
        lastName: lastName,
      });
      console.log("firstname", firstName);
      console.log("Erfolgreich registriert:", registeredUser.email);
      goToNextStep();
    } catch (error) {
      setError(error.message);
    }
  };
  console.log(firstName);
  return (
    <div>
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`step ${step >= 3 ? "active" : ""}`}>3</div>
      </div>
      {/* Steps Labels */}
      <div className="progress-labels">
        <span>Registrierung</span>
        <span>Persönliche Informationen</span>
        <span>Allergiezuordnung</span>
      </div>
      <div className="login-container">
        {step === 1 && (
          <div className="login-section">
            <h2>Neukunden:</h2>
            <div className="login-form">
              <label htmlFor="firstName">Vorname</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Vorname"
                className="login-input-field"
              />
            </div>
            <div className="login-form">
              <label htmlFor="lastName">Nachname</label>
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
              <label htmlFor="email">E-Mail-Adresse</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-Mail"
                className="login-input-field"
              />
            </div>
            <div className="login-form">
              <label htmlFor="password">Passwort</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort"
                className="login-input-field"
              />
            </div>
            <button onClick={handleRegister} className="btn-login">
              Registrieren
            </button>
            <p className="forgot-password">Passwort vergessen?</p>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
        {step === 1 && (
          <div className="login-section-right">
            <h2>Ich habe bereits ein Konto:</h2>
            <button onClick={() => navigate("/Login")} className="btn-continue">
              Weiter
            </button>
          </div>
        )}
      </div>

      {step === 2 && <PersonalInfo goToNextStep={goToNextStep} />}

      {step === 3 && <AllergenInfo />}
    </div>
  );
}

export default Register;
