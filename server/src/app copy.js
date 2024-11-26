import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import usersRoutes from "./routes/users.js";
import recipesRoutes from "./routes/recipes.js";
import ingredientsRoutes from "./routes/ingredients.js";
import dietsRoutes from "./routes/diets.js";
import categoriesRoutes from "./routes/categories.js";
import allergeneRoutes from "./routes/allergene.js";
import fileUpload from "express-fileupload";
// import uploadRoutes from "./routes/uploadImage.js";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import Multer from "multer";
import bodyParser from "body-parser";
import { config as dotenvConfig } from "dotenv";

import admin from "firebase-admin"; //Firebase-Google
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(json());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true });
});
app.use("/users", usersRoutes);
app.use("/recipes", recipesRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/diets", dietsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/allergene", allergeneRoutes);
// app.use("/upload", uploadRoutes);
// app.use("/ingredients", ingredientsRoutes);

// // Configuration
// cloudinary.config({
//   cloud_name: "dxneunm1q",
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // let url = cloudinary.url("gefuellte-zucchini-aus-dem-ofen_u6glux");
// // console.log(url);
// (async function () {
//   try {
//     const results = await cloudinary.uploader.upload("./images/keto.png");
//     console.log(results);

//     const url = cloudinary.url(results.public_id, {
//       transformation: [
//         { quality: "auto", fetch_format: "auto" },
//         {
//           width: 1200,
//           height: 1200,
//           crop: "fill",
//           gravity: "auto",
//         },
//       ],
//     });

//     console.log("Generated URL:", url);
//   } catch (error) {
//     console.error("Error uploading or generating URL:", error);
//   }
// })();

dotenvConfig();

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
    const secureUrl = cldRes.secure_url;
    const public_id = cldRes.public_id;
    console.log(secureUrl);
    console.log(public_id);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});