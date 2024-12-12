import { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function BScanner() {
  const [barcode, setBarcode] = useState("");
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState("");
  const [barcodeScanner, setBarcodeScanner] = useState("");
  const [recipes, setRecipes] = useState([]);

  const EDAMAM_APP_ID = "d3877bd5"; // Ersetzen Sie dies durch Ihre Edamam App ID
  const EDAMAM_APP_KEY = "9f69838dd745f41a99de1b2358160900"; // Ersetzen Sie dies durch Ihren Edamam API-Schlüssel

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
        // Start Recipe Search
        fetchRecipes(data.product.product_name);
      } else {
        setError("Produkt nicht gefunden.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Fehler beim Abrufen der Daten. Bitte versuchen Sie es erneut.");
    }
  };
  console.log("vv");

  const fetchRecipes = async (productName) => {
    console.log("vv", productName);

    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${productName}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits || []);
    } catch (error) {
      console.error("Fehler beim Abrufen von Rezepten:", error);
      setError(
        "Fehler beim Abrufen der Rezepte. Bitte versuchen Sie es erneut."
      );
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
          // Start Recipe Search
          fetchRecipes(data.product.product_name);
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
            hvhvhnbnbnmvvvvvvvvvvvvvvvvvvvvvvvvvv
            <h2>Produktdetails</h2>
            <p>Produktname: {productData.product_name}</p>
            <p>Marke: {productData.origins}</p>
            <p>Kategorien: {productData.categories}</p>
            {productData.image_url && (
              <img src={productData.image_url} alt={productData.product_name} />
            )}
          </div>
        )}
        {recipes.length > 0 && (
          <div>
            <h2>Gefundene Rezepte</h2>
            {recipes.map((recipe, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  margin: "10px",
                  padding: "10px",
                }}
              >
                <h3>{recipe.recipe.label}</h3>
                <img
                  src={recipe.recipe.image}
                  alt={recipe.recipe.label}
                  style={{ width: "100px" }}
                />
                <p>
                  <strong>Zutaten:</strong>{" "}
                  {recipe.recipe.ingredientLines.join(", ")}
                </p>
                <a
                  href={recipe.recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zum Rezept
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default BScanner;
