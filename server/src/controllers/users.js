import db from "../util/db-connect.js";
import admin from "firebase-admin";
/**
 * @api POST /users
 * {uid, gender, date_of_birth, weight, height, activity_level }
 *
 */
export async function creatUserProfile(req, res) {
  console.log(req.body);

  const { uid, gender, date_of_birth, weight, height, activity_level } =
    req.body;
  // const idToken = req.headers.authorization?.split("Bearer ")[1];
  // if (!idToken) {
  //   console.log("Unauthorized");

  //   return res.status(401).send("Unauthorized");
  // }
  try {
    // ID-Token verifizieren
    // const decodedToken = await admin.auth().verifyIdToken(idToken);
    // const tokenUid = decodedToken.uid;

    // // Überprüfen,  UID von client-body gleich wie tockenId
    // if (uid !== tokenUid) {
    //   return res.status(403).json({ msg: "Unauthorized: UID mismatch" });
    // }
    const users = await db("recipe_user").where({ uid: uid });
    if (users.length !== 0) {
      return res.status(400).json({ msg: "User exists", users });
    } else {
      const newUser = await db("recipe_user").insert({
        uid,
        gender,
        date_of_birth,
        weight,
        height,
        activity_level,
      });

      res
        .status(200)
        .json({ message: "User profile created successfully", newUser });
    }
  } catch (error) {
    console.error("Error fetching userprofile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// export async function creatUserAllergene(req, res) {

//   const { uid,...} =
//     req.body;
//   const idToken = req.headers.authorization?.split("Bearer ")[1];
//   if (!idToken) {
//     console.log("Unauthorized");

//     return res.status(401).send("Unauthorized");
//   }
//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     const tokenUid = decodedToken.uid;
//     if (uid !== tokenUid) {
//       return res.status(403).json({ msg: "Unauthorized: UID mismatch" });
//     }

//       const newUserAllergene = await db("....").insert({
//         uid,
//         ...
//       });
//       res
//         .status(200)
//         .json({ message: "User Allergen  created successfully",newUserAllergen });

//   } catch (error) {
//     console.error("Error fetching UserAllergen:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }
