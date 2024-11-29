import { useState } from "react";

export default function UploadImage({ setImageUrl, imageUrl }) {
  const [responseMessage, setResponseMessage] = useState("");

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
      <input type="file" name="image" onChange={handleInputChange} />
      {/* {responseMessage && <p>{responseMessage}</p>} */}
    </div>
  );
}

// import { useState } from "react";

// function Upload({ setImageUrl }) {
//   const [file, setFile] = useState(null);
//   const [responseMessage, setResponseMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, files } = e.target;
//     if (name === "image") {
//       setFile(files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setResponseMessage("Bitte Rezeptname und Bild hochladen!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const response = await fetch("http://localhost:3000/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       setResponseMessage("Upload erfolgreich!");
//       console.log("Upload-Daten:", data);
//       setImageUrl(data);
//     } catch (error) {
//       console.error("Fehler beim Upload:", error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <input type="file" name="image" onChange={handleInputChange} required />
//         <button onClick={handleUpload}>Bild hochladen</button>
//       </div>
//       {responseMessage && <p>{responseMessage}</p>}
//     </div>
//   );
// }

// export default Upload;
