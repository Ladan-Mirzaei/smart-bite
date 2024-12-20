import { useState, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import "./RecipeSearch.css";
const API_KEY = "a53d79dfd8e247f89b7f18c62726465c";
const API_URL = "https://api.spoonacular.com/recipes/findByIngredients";

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detailedRecipes, setDetailedRecipes] = useState([]);
  // const [barcode, setBarcode] = useState("");
  const [productData, setProductData] = useState(null);
  const [barcodeScanner, setBarcodeScanner] = useState("");
  const [productName, setProductName] = useState("");

  /************** BARCODE Zutaten suchen openfoodfacts ***************/
  // const handleInputChange = (e) => {
  //   setBarcode(e.target.value);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!barcode) {
  //     setError("Bitte einen Barcode eingeben.");
  //     return;
  //   }

  //   setError("");

  //   try {
  //     const response = await fetch(
  //       `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  //     );
  //     const data = await response.json();

  //     if (data && data.product) {
  //       setProductData(data.product);
  //     } else {
  //       setError("Produkt nicht gefunden.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError("Fehler beim Abrufen der Daten. Bitte versuchen Sie es erneut.");
  //   }
  // };

  /************** API Spoonacular Rezept durch Zutaten suchen ***************/
  const fetchRecipes = async () => {
    console.log("productName-----", productName);
    if (!productName.trim()) return;

    setLoading(true);
    setError(null);

    const words = productName
      .split(/\s+/)
      .map((word) => word.trim().toLowerCase())
      .filter((word) => word);
    console.log("words<<<<<<", words);
    const ingredientsQuery = words.join(",");

    try {
      const response = await fetch(
        `${API_URL}?ingredients=${ingredientsQuery}&number=5&apiKey=${API_KEY}`
      );
      console.log(response);

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
        "Fehler beim Abrufen der Rezepte. Bitte versuche es später erneut.",
        err
      );
    } finally {
      setLoading(false);
    }
  };
  console.log(recipes);
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
          setProductName(data.product.categories);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "Fehler beim Abrufen der Daten. Bitte versuchen Sie es erneut."
        );
      }
    };

    fetchData();

    fetchRecipes();
  }, [barcodeScanner]);
  console.log("))))", productName);

  return (
    <div className="recipe-generator-container">
      <div className="recipe-generator-scanner-container">
        <p>
          Scanne den Barcode deines Produkts, um mehr Informationen zu erhalten.
        </p>
        <div className="barcode-scanner">
          <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={(err, result) => {
              if (result) setBarcodeScanner(result.text);
            }}
          />
        </div>
      </div>

      <div className="recipe-generator-info-container">
        {error && <p className="error-message">{error}</p>}

        {productData && (
          <div className="product-details">
            <div className="product-header">
              <h2>Produktdetails</h2>
              {productData.image_url && (
                <img
                  src={productData.image_url}
                  alt={productData.product_name}
                  className="product-image"
                />
              )}
            </div>

            <div className="recipe-generator-result-section">
              <div className="recipe-generator-item">
                <div className="recipe-generator-row">
                  <span>Produktname:</span>
                </div>
                <div className="recipe-generator-row">
                  {productData.product_name}
                </div>
              </div>
              <div className="recipe-generator-item">
                <div className="recipe-generator-row">
                  <span>Marke:</span>
                </div>
                <div className="recipe-generator-row">
                  {productData.origins}
                </div>
              </div>
              <div className="recipe-generator-item">
                <div className="recipe-generator-row">
                  <span>Kategorien:</span>
                </div>
                <div className="recipe-generator-row">
                  {productData.categories}
                </div>
              </div>
              <div className="recipe-generator-item">
                <div className="recipe-generator-row">
                  <span>Nährwert-Bewertung:</span>
                </div>
                <div className="recipe-generator-row">
                  {productData.nutrition_grades}
                </div>
              </div>
              <div className="recipe-generator-item">
                <div className="recipe-generator-row">
                  <span>Allergene:</span>
                </div>
                <div className="recipe-generator-row">
                  {productData.allergens}
                </div>
              </div>
              <div className="recipe-generator-item">
                <div className="recipe-generator-row">
                  <span>Herkunftsland:</span>
                </div>
                <div className="recipe-generator-row">
                  {productData.countries}
                </div>
              </div>{" "}
            </div>
          </div>
        )}

        <div className="recipe-generator-input">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Gib deine Zutaten ein"
          />
          <button onClick={fetchRecipes}>Rezepte suchen</button>
        </div>

        {recipes.length > 0 && (
          <div className="recipe-list">
            <h2>Gefundene Rezepte:</h2>
            <ul>
              {recipes.map((recipe, index) => (
                <li key={index}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{ width: "100px", marginRight: "15px" }}
                  />
                  <div>
                    <h3>{recipe.title}</h3>
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
    </div>
  );
};

export default RecipeSearch;
