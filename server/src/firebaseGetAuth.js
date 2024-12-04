//https://medium.com/@asatpathy314/implementing-authentication-middleware-with-firebase-and-express-f811754e815b
import admin from "./firebaseAdmin.js";

const firebaseGetAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next();
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Füge den Benutzer zum Request-Objekt hinzu
    next();
  } catch (error) {
    next();
  }
};

export default firebaseGetAuth;
