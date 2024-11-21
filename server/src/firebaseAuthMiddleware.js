//https://medium.com/@asatpathy314/implementing-authentication-middleware-with-firebase-and-express-f811754e815b
import admin from "./firebaseAdmin.js";

const FirebaseAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Füge den Benutzer zum Request-Objekt hinzu
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default FirebaseAuthMiddleware;
