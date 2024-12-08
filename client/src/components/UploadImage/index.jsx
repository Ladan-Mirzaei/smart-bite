import { useState } from "react";
import "./UploadImage.css";
export default function UploadImage({ setImageUrl, imageUrl }) {
  const [setResponseMessage] = useState("");

  const handleInputChange = async (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        setResponseMessage("Bild-Upload erfolgreich!");
        setImageUrl(data.secure_url);
      } catch (error) {
        console.error("Fehler beim Bild-Upload:", error);
        setResponseMessage("Fehler beim Upload.");
      }
    }
  };

  return (
    <div>
      <input
        className="upload-input"
        type="file"
        name="image"
        onChange={handleInputChange}
      />
    </div>
  );
}
