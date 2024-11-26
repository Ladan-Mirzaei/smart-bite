import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dxneunm1q",
});

const url = cloudinary.url("gefuellte-zucchini-aus-dem-ofen_u6glux");
console.log(url);
