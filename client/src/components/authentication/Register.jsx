import { useState } from "react";
import { registerUser } from "./authService.js";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import PersonalInfo from "../../pages/PersonalInfo/index.jsx";
import AllergenInfo from "../../pages/PersonalInfo/allergenInfo.jsx";
import UploadImage from "../UploadImage/index.jsx";

import "./Login.css";
import "./Register.css";

import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const auth = getAuth();
  const db = getFirestore();
  const goToNextStep = () =>
    setStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));

  const handleRegister = async () => {
    if (!firstName) {
      setError("Vorname darf nicht leer sein.");
      return;
    }

    try {
      const registeredUser = await registerUser(
        email,
        password,
        displayName,
        photoURL.secure_url
      );

      console.log("Benutzer registriert und eingeloggt:", registeredUser.email);

      // Zusätzliche Benutzerdaten in Firestore speichern
      await setDoc(doc(db, "users", registeredUser.uid), {
        firstName: firstName,
        lastName: lastName,
      });
      console.log("firstname", firstName);
      alert(
        "Willkommen",
        { firstName },
        "Registrierung erfolgreich! Bitte bestätigen Sie Ihre E-Mail, bevor Sie fortfahren."
      );
      const checkEmailVerification = async () => {
        await auth.currentUser.reload(); // Benutzerstatus aktualisieren
        if (auth.currentUser.emailVerified) {
          console.log("E-Mail ist verifiziert.");
          goToNextStep(); // Weiter zu Schritt 2
        } else {
          alert(
            "E-Mail ist nicht verifiziert. Bitte überprüfen Sie Ihre E-Mails."
          );
        }
      };

      // Verifizierungsprüfung starten
      const interval = setInterval(async () => {
        await checkEmailVerification();
        if (auth.currentUser && auth.currentUser.emailVerified) {
          clearInterval(interval); // Intervall stoppen, wenn verifiziert
        }
      }, 5000); // Alle 5 Sekunden prüfen
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(firstName);
  return (
    <div>
      <div className="progress-bar">
        <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`step ${step >= 3 ? "active" : ""}`}>3</div>
      </div>
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
                placeholder="E-Mail"
                className="login-input-field"
              />
            </div>
            <div className="login-form">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort"
                className="login-input-field"
              />
            </div>

            <div className="login-form">
              <label htmlFor="url">Photo URL</label>
              {/* <input
                id="url"
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Photo"
                className="login-input-field"
              /> */}
              <UploadImage setImageUrl={setPhotoURL} />
              {photoURL.secure_url && (
                <p>Bild hochgeladen: {photoURL.secure_url}</p>
              )}
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
