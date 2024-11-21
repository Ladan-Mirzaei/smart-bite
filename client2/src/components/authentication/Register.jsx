// src/components/Register.js
import { useState } from "react";
import { registerUser } from "./authService.js"; // Importiere die Login-Funktion
// Importiere die Registrierungs-Funktion

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleRegister = async () => {
    try {
      const registeredUser = await registerUser(email, password); // Benutzer registrieren
      setUser(registeredUser); // Benutzerstatus speichern
      console.log("Erfolgreich registriert:", registeredUser.email);
    } catch (error) {
      setError(error.message); // Fehler anzeigen
    }
  };

  return (
    <div>
      <h2>Registrierung</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-Mail"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Passwort"
      />
      <button onClick={handleRegister}>Registrieren</button>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Fehler anzeigen */}
      {user && <p>Willkommen, {user.email}!</p>}{" "}
      {/* Erfolgreiche Registrierung */}
    </div>
  );
}

export default Register;
