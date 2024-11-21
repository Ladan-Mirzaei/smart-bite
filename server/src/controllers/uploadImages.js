// import { v2 as cloudinary } from "cloudinary";
// import "dotenv/config";

// import db from "../util/db-connect.js";
// export async function uploadImages(req, res) {
//   const { name, data } = req.files.pic;
//   if (name && data) {
//     const images = await db("recipe").insert({
//       img_name: name,
//       img: data,
//     });
//     res.sendStatus(200);
//   } else {
//     res.sendStatus(400);
//   }
// }

// Configuration
// cloudinary.config({
//   cloud_name: "dxneunm1q",
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function uploadImages(req, res) {
//   console.log("req.files", req.body);
//   try {
//     const results = await cloudinary.uploader.upload("req.body");
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
// }
// ------------------------------
