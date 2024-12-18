import { useState } from "react";

function BarcodeToRecipe() {
  const [barcode, setBarcode] = useState("");
  const [productData, setProductData] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const EDAMAM_APP_ID = "d3877bd5"; // Ersetzen Sie dies durch Ihre Edamam App ID
  const EDAMAM_APP_KEY = "9f69838dd745f41a99de1b2358160900"; // Ersetzen Sie dies durch Ihren Edamam API-Schlüssel

  const fetchProductData = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Schritt 1: Barcode-Daten von OpenFoodFacts abrufen
      const productResponse = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const productJson = await productResponse.json();
      console.log();
      if (
        productJson &&
        productJson.product &&
        productJson.product.ingredients_text
      ) {
        setProductData(productJson.product);
        const ingredients = productJson.product.ingredients_text;

        // Schritt 2: Rezepte von Edamam basierend auf Zutaten abrufen
        const recipesResponse = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredients}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`
        );
        const recipesJson = await recipesResponse.json();

        setRecipes(recipesJson.hits || []);
        console.log(recipes);
      } else {
        setError("Keine Zutaten gefunden für diesen Barcode.");
      }
    } catch (err) {
      console.error("Fehler:", err);
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!barcode.trim()) {
      setError("Bitte geben Sie einen Barcode ein.");
      return;
    }
    fetchProductData();
  };

  return (
    <div>
      <h1>Barcode zu Rezepten</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Barcode:
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Geben Sie einen Barcode ein"
          />
        </label>
        <button type="submit">Suchen</button>
      </form>
      {isLoading && <p>Daten werden geladen...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {productData && (
        <div>
          <h2>Produktinformationen:</h2>
          <p>
            <strong>Produktname:</strong> {productData.product_name}
          </p>
          <p>
            <strong>Marke:</strong> {productData.brands}
          </p>
          <p>
            <strong>Zutaten:</strong> {productData.ingredients_text}
          </p>
        </div>
      )}
      {recipes.length > 0 && (
        <div>
          <h2>Rezepte:</h2>
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
                Rezept anzeigen
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BarcodeToRecipe;
