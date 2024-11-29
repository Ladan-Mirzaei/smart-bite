import { logoutUser } from "./authService.js";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log("Erfolgreich abgemeldet");
      navigate("/");
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
