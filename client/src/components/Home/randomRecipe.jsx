import { useState, useEffect } from "react";
import { useFetch } from "../../hooks/fetch.jsx";

export default function RandomRecipe() {
  const { fetchData } = useFetch();
  const [recipesData, setRecipesData] = useState();

  let API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function loadFetch() {
      const recipe = await fetchData(`${API_URL}/recipes/random`);
      setRecipesData(recipe);
    }
    loadFetch(fetchData);
  }, []);

  if (!recipesData) {
    return <div>Loading...</div>;
  }

  const veganData = recipesData.vegan;
  const recipeKeys = Object.keys(recipesData);
  const recipeValue = Object.values(recipesData);

  console.log("recipeKeys", recipeKeys);
  console.log("recipeValue", recipeValue);
  return (
    <>
      {Object.values(recipesData).map((item, index) =>
        item && item.recipe_title ? (
          <>
            <div className="card">
              <div className="card-icon">
                <img src="../../../public/vegetarian.png" alt="vegetarian" />
              </div>

              <div className="card-titel" key={index}>
                {item.recipe_title}
              </div>
              <h3> {item.category_name}</h3>
              <h4></h4>
              <p>
                Die Keto-Diät ist eine Ernährungsform, die sehr arm an
                Kohlenhydraten.
              </p>
              <a href="#" className="read-more">
                Read More
              </a>
            </div>
          </>
        ) : null
      )}
    </>
  );
}

//const person = {
//   name: 'John Doe',
//   age: 30,
//   job: 'Developer'
//  };

//  const property = 'name';
//  console.log(person[property]); // Output: 'John Doe'
//  JavaScript

// const obj = { foo: "bar", baz: 42 };
// const map = new Map(Object.entries(obj));
// console.log(map); // Map(2) {"foo" => "bar", "baz" => 42}

// Using for...of loop
// const obj = { a: 5, b: 7, c: 9 };
// for (const [key, value] of Object.entries(obj)) {
//   console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
// }

// // Using array methods
// Object.entries(obj).forEach(([key, value]) => {
//   console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
// });

// a = {
//   a: 1,
//   b: 2,
//   c: 3
// }

// Object.entries(a).map(([key, value]) => {
//     // Pretty straightforward - use key for the key and value for the value.
//     // Just to clarify: unlike object destructuring, the parameter names don't matter here.
// })
