import admin from "firebase-admin";
import { readFileSync } from "fs";

// JSON-Datei lesen
const serviceAccount = JSON.parse(
  readFileSync(new URL("./service-account-key.json", import.meta.url))
);

// Firebase Admin SDK initialisieren
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
