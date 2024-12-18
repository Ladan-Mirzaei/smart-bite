import { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const API_KEY = "a53d79dfd8e247f89b7f18c62726465c";
const API_URL = "https://api.spoonacular.com/recipes/findByIngredients";

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detailedRecipes, setDetailedRecipes] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [productData, setProductData] = useState(null);
  const [barcodeScanner, setBarcodeScanner] = useState("");

  /************** BARCODE Zutaten suchen openfoodfacts ***************/
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

  /************** API Spoonacular Rezept durch Zutaten suchen ***************/
  const fetchRecipes = async () => {
    if (!ingredients.trim()) return;

    setLoading(true);
    setError(null);

    const words = ingredients
      .split(/\s+/)
      .map((word) => word.trim().toLowerCase())
      .filter((word) => word);

    const formattedIngredients = words.join(",");

    try {
      const response = await fetch(
        `${API_URL}?ingredients=${formattedIngredients}&number=5&apiKey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Fehler beim Abrufen der Rezepte");
      }

      const data = await response.json();
      setRecipes(data);
      const detailedUrls = [];
      for (let i = 0; i < data.length; i++) {
        const recipe = data[i];

        const detailsResponse = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}&language=de`
        );

        const details = await detailsResponse.json();

        detailedUrls.push(details.sourceUrl);
      }
      setDetailedRecipes(detailedUrls);
    } catch (err) {
      setError(
        "Fehler beim Abrufen der Rezepte. Bitte versuche es später erneut."
      );
    } finally {
      setLoading(false);
    }
  };

  /************** React Barcode Scanner ***************/
  useEffect(() => {
    const fetchData = async () => {
      if (!barcodeScanner) return;

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
      {/* *********Barcode Scanner********** */}
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setBarcodeScanner(result.text);
        }}
      />
      {/* /************************API FOOD  */}
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
            <strong>Nährwert-Bewertung:</strong> {productData.nutrition_grades}
          </p>
          <p>Allergene: {productData.allergens}</p>
          <p>Herkunftsland: {productData.countries}</p>
          <p>
            Verfügbare Sprachen: {Object.keys(productData.languages).join(", ")}
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
      <div>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button onClick={fetchRecipes}>Rezepte suchen</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {recipes.length > 0 && (
          <div>
            <h2>Gefundene Rezepte:</h2>
            <ul>
              {recipes.map((recipe, index) => (
                <li key={index}>
                  <h3>{recipe.title}</h3>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{ width: "100px" }}
                  />
                  <div>
                    <strong>Verwendete Zutaten:</strong>
                    <ul>
                      {recipe.usedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>
                          <img
                            src={ingredient.image}
                            alt={ingredient.name}
                            style={{ width: "30px", marginRight: "8px" }}
                          />
                          {ingredient.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <strong>Fehlende Zutaten:</strong>
                    <ul>
                      {recipe.missedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>
                          <img
                            src={ingredient.image}
                            alt={ingredient.name}
                            style={{ width: "30px", marginRight: "8px" }}
                          />
                          {ingredient.original}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p>
                    <a
                      href={detailedRecipes[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Rezept ansehen
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeSearch;
