

DROP TABLE IF EXISTS recipe_mealplan CASCADE;

CREATE TABLE recipe_mealplan (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES recipe_user(id),
    recipe_id INT REFERENCES recipe(id),
    quantity FLOAT,
    unit VARCHAR(100),
    calories FLOAT,
    protein FLOAT,
    carbohydrates FLOAT,
    fats FLOAT,
    date DATE,
    meal_type VARCHAR(100) CHECK (meal_type IN ('Frühstück', 'Mittagsessen', 'Abendessen', 'Snack'))
);
