import { useState } from "react";
import { useParams } from "react-router-dom";
import UploadImage from "../../components/UploadImage/index.jsx";

export default function UpdateRecipeImage() {
  const { id } = useParams();
  const [imgUrl, setImgUrl] = useState("");
  const submitButtonDisabled = !imgUrl;
  console.log("imgUrl", imgUrl, id);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_url: imgUrl }),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Failed to update image: ${errorDetails}`);
      }

      const result = await response.json();
      alert("Bild erfolgreich aktualisiert!");
    } catch (error) {
      console.error("Error updating recipe image:", error);
    }
  };

  return (
    <div className="recipeform-container">
      <h2>Rezeptbild aktualisieren</h2>
      <form onSubmit={handleSubmit}>
        <UploadImage setImageUrl={setImgUrl} />
        <button type="submit" disabled={submitButtonDisabled}>
          Bild aktualisieren
        </button>
      </form>
    </div>
  );
}
