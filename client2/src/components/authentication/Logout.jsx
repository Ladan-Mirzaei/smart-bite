// src/components/Logout.js
import { logoutUser } from "./authService.js"; // Importiere die Login-Funktion

function Logout() {
  const handleLogout = async () => {
    try {
      await logoutUser(); // Benutzer abmelden
      console.log("Erfolgreich abgemeldet");
    } catch (error) {
      console.error("Fehler beim Abmelden:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Abmelden</button>
    </div>
  );
}

export default Logout;
