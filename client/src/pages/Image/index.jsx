import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [recipeName, setRecipeName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    console.log("files", files, "value", value, name);
    if (name === "image") {
      setFile(files[0]);
      console.log("file", file);
    } else {
      setRecipeName(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !recipeName) {
      setResponseMessage("Bitte Rezeptname und Bild hochladen!");
      return;
    }

    console.log("file", file);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("recipeName", recipeName);

    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",

      body: formData,
    });

    const data = await response.json();
    console.log("image", data);
  };

  return (
    <div>
      <h1>Rezeptbild hochladen</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="recipeName"
          placeholder="Rezeptname"
          value={recipeName}
          onChange={handleInputChange}
          required
        />
        <input type="file" name="image" onChange={handleInputChange} required />
        <button type="submit">Hochladen</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default App;
