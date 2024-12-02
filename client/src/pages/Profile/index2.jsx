import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formular wurde abgesendet!");
    setShowModal(false); 

  return (
    <div className="App">
      <button onClick={() => setShowModal(true)}>Formular anzeigen</button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h2>Formular</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div>
                <label htmlFor="email">E-Mail:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div>
                <label htmlFor="message">Nachricht:</label>
                <textarea id="message" name="message" required></textarea>
              </div>
              <div>
                <button type="submit">Absenden</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div>
        <label htmlFor="email">E-Mail:</label>
        <input type="email" id="email" name="email" required />
      </div>
    </div>
  );
}

export default App;
