import { useState } from "react";

const IngredientsAPI = ({ setProductData }) => {
  const [barcode, setBarcode] = useState("");
  // const [productData, setProductData] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setBarcode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    </div>
  );
};

export default IngredientsAPI;
// Skyr
// Marke: Yoplait

// Barcode: 3329770073265
// 4056489389125
// Barista Hafer
// Marke: Oatly!

// Barcode: 7394376616501
// Alpro Joghurtalternative auf Sojabasis, Natur mit Mandeln, 500 g, 31
// Marke: Alpro

// Barcode: 5411188118961
// Unbekanntes Produkt
// Marke: Fruit d'Or

// Barcode: 8719200031449
// Penne Rigate N°73
// Marke: Barilla

// Barcode: 8076802085738
// Fermentiertes Sojaprodukt, Ungesüßt
// Marke: Alpro,Danone

// Barcode: 5411188118121
// Walnusskerne
// Marke: Alesto,Lidl

// Barcode: 20005733
// Ziegenfrischkäse Natur
// Marke: Zurück zum Ursprung

// Barcode: 4099200191041
// Olive oil spread
// Marke: Bertolli,

// Barcode: 8719200237902
// Philadelphia
// Marke: Mondelez International

// Barcode: 7622201693916
// 6 Wraps blé complet
// Marke: Old El Paso

// Barcode: 8410076470812
// Mayonnaise
// Marke: Hellmann's

// Barcode: 8718114724485
// Flora Vegan
// Marke: Flora

// Barcode: 8719200237872

// mozzarella
// Marke: Galbani

// Barcode: 8000430138719
// ------------------
// Soyamilch
// Marke: Danone

// Barcode: 5411188115472

// Bio Kokonuss mit Reis
// Marke: Vemondo,Lidl,Grønvang Food ApS

// Barcode: 4056489244707

// Arrabbiata
// Marke: Barilla

// Barcode: 8076809513388

// Cooked Chickpeas
// Marke: Freshona, Lidl

// Barcode: 20468583
