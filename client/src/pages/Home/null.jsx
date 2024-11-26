import { createRef } from "react";

function FileUploadForm() {
  const fileInput = createRef();
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("pic", fileInput.current.files[0]);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert("Upload erfolgreich!");
      } else {
        alert("Upload error!");
      }
    } catch (error) {
      console.error("Fehler beim Hochladen:", error);
    }
  };
  console.log("formData");

  return (
    <div>
      <h1>Datei hochladen</h1>
      <form onSubmit={onSubmit}>
        <input type="file" name="pic" ref={fileInput} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUploadForm;
