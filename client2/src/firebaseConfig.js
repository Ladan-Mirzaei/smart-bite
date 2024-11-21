// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase-Konfiguration aus der Firebase-Konsole
const firebaseConfig = {
  apiKey: "1R9_OmIeXZJQ7AIzaSyAHELzl3-1R9_OmIeXZJQ7-5pcl0IvGo8s",
  authDomain: "smartbite-48376.firebaseapp.com",
  projectId: "smartbite-48376",
  storageBucket: "smartbite-48376.firebasestorage.app",
  messagingSenderId: "747414528072",
  appId: "1:747414528072:web:d68afaf259564a4443387d",
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);

// Exportiere die Instanzen von Auth und Firestore, um sie in anderen Dateien zu verwenden
export const auth = getAuth(app); // Für Authentifizierung
