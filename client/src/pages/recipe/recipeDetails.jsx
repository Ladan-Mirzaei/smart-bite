import "./RecipeDetails.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
const RecipeDetails = () => {
  const contentRef = useRef(null);
  console.log(contentRef);

  const handlePrint = useReactToPrint({
    contentRef,
  });

  return (
    <>
      {" "}
      <div className="test" ref={contentRef}>
        <div className="p-15">
          <div className="p-15-header">
            <div className="p-15-title-section">
              <h2>Flammkuchen mit Räuchertofu</h2>
              <div className="p-15-icons">
                <button onClick={handlePrint}>
                  <i className="fa fa-print"></i>
                </button>
                <button>
                  <i className="fa fa-heart"></i>
                </button>
              </div>
            </div>{" "}
            <div className="p-15-tags">
              <span>Vegetarisch</span>
              <span>Vegan</span>
            </div>
            <div className="p-15-details">
              <span>
                <i className="fa fa-clock"></i> 45min Gesamtzeit
              </span>
              <span>
                <i className="fa fa-clock"></i> 30min Zubereitung
              </span>
              <span>
                <i className="fas fa-utensils"></i>
                Mittel
              </span>
              <div className="p-15-rating">★★★★☆ 19</div>
            </div>
          </div>
        </div>
        <div className="P-15-row">
          <div className="P-15-text-container">
            <h2>Gebratene Ravioli mit gemischten Pilzen</h2>
            {/* <p>
            Hier steht der Text für die zweite Zeile. Der Text befindet sich auf
            der linken Seite.
          </p> */}
            <ul className="ingredients-list">
              <li>1 Bund Lauchzwiebel(n) (Zwiebellauch)</li>
              <li>1 TL Ingwer, frisch geriebener</li>
              <li>½ TL Currypulver, rotes</li>
              <li>250 g Pilze, gemischt</li>
              <li>2 EL Öl zum Braten</li>
            </ul>
          </div>
          <div className="P-15-image-container">
            <img
              src="../../../public/gefuellte-zucchini-aus-dem-ofen.webp"
              alt="Beispielbild"
            />
          </div>
        </div>
        <div className="P-15-row-h">
          <div className="P-15-text-container">
            <h3>Zubereitung</h3>
            <p>
              Zwiebellauch putzen, waschen und in kleine Ringe schneiden. Ingwer
              schälen und fein reiben. Tomaten putzen, Strunk entfernen,
              -Kerngehäuse herausschneiden und das Fruchtfleisch würfeln. Linsen
              waschen.
            </p>
            <p>
              Zitronengras etwas anklopfen. Koriander zupfen und klein
              schneiden.
            </p>{" "}
            <p>
              Zwiebellauch in etwas Öl angehen lassen. Curry zugeben und kurz
              mit anschwitzenn, anschließend mit Gemüsebrühe auffüllen. Die
              Kokosmilch, Linsen, Ingwer und Kaffirblätter bzw. Zitronengras
              hinzufügen und aufkochen lassen.{" "}
            </p>{" "}
            <p>
              Die Suppe nun ca. 15 min -20 köcheln, bis die Linsen weich sind.
              Erst jetzt den geschnittenen Koriander und die Tomatenwürfel
              zufügen. Kurz in der Suppe erwärmen, anschließend sofort
              servieren.
            </p>
          </div>
          <div className="P-15-text-container">
            <div className="nutritional-info">
              <div className="nutritional-header">
                <h2>Nährwerte pro Person:</h2>
                <div className="nutritional-score">
                  <span>4/10</span>
                  <div className="score-indicator"></div>
                </div>
              </div>

              <div className="nutritional-grid">
                <div
                  className="nutritional-item"
                  style={{ backgroundColor: "#fdece8" }}
                >
                  <h3>Energie</h3>
                  <p>340 kcal</p>
                </div>
                <div
                  className="nutritional-item"
                  style={{ backgroundColor: "#f2eef9" }}
                >
                  <h3>Kohlenhydrate</h3>
                  <p>0 g</p>
                </div>
                <div
                  className="nutritional-item"
                  style={{ backgroundColor: "#eaf4ec" }}
                >
                  <h3>Fett</h3>
                  <p>12.8 g</p>
                </div>
                <div
                  className="nutritional-item"
                  style={{ backgroundColor: "#fbf4e7" }}
                >
                  <h3>Eiweiß</h3>
                  <p>56.1 g</p>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default RecipeDetails;
