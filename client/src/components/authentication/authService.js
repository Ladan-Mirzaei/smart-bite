import { auth } from "../../firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Function to register a new user
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Fehler bei der Registrierung:", error.message);
    throw new Error("Fehler bei der Registrierung: " + error.message);
  }
};

// Function to log in an existing user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error.message); // Zeigt detaillierte Fehlermeldung an
    throw new Error("Fehler beim Anmelden: " + error.message);
  }
};
// Funktion zum Abmelden eines Benutzers
export const logoutUser = async () => {
  try {
    await signOut(auth); // Firebase signOut Funktion zum Abmelden
  } catch (error) {
    throw new Error("Fehler beim Abmelden: " + error.message);
  }
};
