import { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function BScanner() {
  const [barcode, setBarcode] = useState("");
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState("");
  const [barcodeScanner, setBarcodeScanner] = useState("");

  const handleInputChange = (e) => {
    setBarcode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!barcode) {
      setError("Bitte einen Barcode eingeben.");
      return;
    }

    setError("");

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

  useEffect(() => {
    const fetchData = async () => {
      setProductData(null);

      try {
        const response = await fetch(
          `https://world.openfoodfacts.org/api/v0/product/${barcodeScanner}.json`
        );
        const data = await response.json();

        if (data) {
          setProductData(data.product);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "Fehler beim Abrufen der Daten. Bitte versuchen Sie es erneut."
        );
      }
    };

    fetchData();
  }, [barcodeScanner]);

  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setBarcodeScanner(result.text);
        }}
      />
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        {productData && (
          <div>
            <h2>Produktdetails</h2>
            <p>Produktname: {productData.product_name}</p>
            <p>Marke: {productData.origins}</p>
            <p>Kategorien: {productData.categories}</p>
            <p>Verfügbare Geschäfte: {productData.stores}</p>
            <p>Labels: {productData.labels}</p>
            <p>
              <strong>Nährwert-Bewertung:</strong>{" "}
              {productData.nutrition_grades}
            </p>
            <p>Allergene: {productData.allergens}</p>
            <p>Herkunftsland: {productData.countries}</p>
            <p>
              Verfügbare Sprachen:{" "}
              {Object.keys(productData.languages).join(", ")}
            </p>
            {productData.image_url && (
              <img src={productData.image_url} alt={productData.product_name} />
            )}

            <h3>Zutaten:</h3>
            {productData.ingredients_text && (
              <p>
                <strong>Zutatenliste:</strong> {productData.ingredients_text}
              </p>
            )}

            {productData.ingredients && (
              <div>
                <h4>Details zu den Zutaten:</h4>
                <ul>
                  {productData.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.text}{" "}
                      {ingredient.percent_estimate && (
                        <>({ingredient.percent_estimate}%)</>
                      )}
                      {ingredient.vegan && ` - Vegan: ${ingredient.vegan}`}
                      {ingredient.vegetarian &&
                        ` - Vegetarisch: ${ingredient.vegetarian}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <h3>Nährwertangaben (pro 100g):</h3>
            {productData.nutriments && (
              <ul>
                <li>
                  Kalorien: {productData.nutriments["energy-kcal_100g"]} kcal
                </li>
                <li>Fett: {productData.nutriments.fat_100g} g</li>
                <li>
                  Gesättigte Fettsäuren:{" "}
                  {productData.nutriments["saturated-fat_100g"]} g
                </li>
                <li>
                  Kohlenhydrate: {productData.nutriments.carbohydrates_100g} g
                </li>
                <li>Zucker: {productData.nutriments.sugars_100g} g</li>
                <li>Ballaststoffe: {productData.nutriments.fiber_100g} g</li>
                <li>Eiweiß: {productData.nutriments.proteins_100g} g</li>
                <li>Salz: {productData.nutriments.salt_100g} g</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default BScanner;
