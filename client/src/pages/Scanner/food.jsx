import { useState } from "react";

const Food = () => {
  const [barcode, setBarcode] = useState("");
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setBarcode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!barcode) {
      setError("Bitte einen Barcode eingeben.");
      return;
    }

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = await response.json();

      if (data && data.product) {
        setProductData(data.product);
      } else {
        setError("Produkt nicht gefunden.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Fehler beim Abrufen der Daten. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Barcode eingeben"
          value={barcode}
          onChange={handleInputChange}
        />
        <button type="submit">Suche</button>
      </form>
      {productData && (
        <div>
          <p>Marke: {productData.brands}</p>
          <p>
            <strong>Nährwert-Bewertung:</strong> {productData.nutrition_grades}
          </p>
          <p>Allergene: {productData.allergens}</p>
          {productData.image_url && (
            <img src={productData.image_url} alt={productData.product_name} />
          )}
        </div>
      )}
    </div>
  );
};

export default Food;
