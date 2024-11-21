import "./RecipeDetails.css";
const RecipeDetails = () => {
  return (
    <div className="recipedetails-container">
      <div className="recipedetails-header">
        <h1 className="recipedetails-title">Rice Noodle Bowl</h1>
        <button className="recipedetails-print">Print</button>
        <span className="recipedetails-meta-item">header</span>
      </div>
      <div className="recipedetails-row-first">
        <div className="recipedetails-column recipedetails-info">
          <section className="recipedetails-section">
            <h2>Instructions</h2>
          </section>
        </div>
        <div className="recipedetails-column recipedetails-image-container">
          <img
            src="../../../public/gefuellte-zucchini-aus-dem-ofen.webp"
            alt="Rice Noodle Bowl"
            className="recipedetails-image"
          />
        </div>
      </div>
      <div className="recipedetails-row">
        <div className="recipedetails-column recipedetails-info">
          <section className="recipedetails-section">
            <h2>Ingredients</h2>
            <ul>
              <li>
                <strong>For the dressing:</strong>
              </li>
              <li>2 limes</li>

              <li>
                <strong>For the noodles:</strong>
              </li>
              <li>150 grams rice noodles</li>
              <li>2 eggs</li>
            </ul>
          </section>
          <section className="recipedetails-section">
            <h2>Instructions</h2>
            <ol>
              <li>
                Cut the limes in half and squeeze the juice into a small bowl.
              </li>
              <li>Mix the lime juice with soy sauce, honey, and sesame oil.</li>
              <li>Cook the rice noodles according to package directions.</li>
              <li>Prepare the toppings and serve.</li>
            </ol>
          </section>
        </div>
        <div className="recipedetails-column recipedetails-image-container">
          hbhghj
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
