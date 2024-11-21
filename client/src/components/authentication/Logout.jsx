import { logoutUser } from "./authService.js";

function Logout() {
  const handleLogout = async () => {
    try {
      await logoutUser();
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
