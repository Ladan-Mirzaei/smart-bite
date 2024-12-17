import { useState } from "react";
import "./uploadImage.css";
export default function UploadImage({ setImageUrl }) {
  const [_, setResponseMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleInputChange = async (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(`${API_URL}/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        setResponseMessage("Bild-Upload erfolgreich!");

        setImageUrl(data.secure_url);
        setPreviewImage(data.secure_url);
      } catch (error) {
        console.error("Fehler beim Bild-Upload:", error);
        setResponseMessage("Fehler beim Upload.");
      }
    }
  };

  return (
    <div className="upload-container">
      <input
        className="upload-input"
        type="file"
        name="image"
        onChange={handleInputChange}
      />
      {previewImage && (
        <div className="preview-image-container">
          <img
            src={previewImage}
            alt="Hochgeladenes Bild"
            className="preview-image"
          />
        </div>
      )}
    </div>
  );
}
