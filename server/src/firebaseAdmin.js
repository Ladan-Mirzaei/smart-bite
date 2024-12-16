import admin from "firebase-admin";
import { serviceAccount } from "./service-account-key.js";
// JSON-Datei lesen
try {
  // Firebase Admin SDK initialisieren
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error("Error: ", error);
}

export default admin;
