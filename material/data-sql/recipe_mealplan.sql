

DROP TABLE IF EXISTS recipe_mealplan;

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

INSERT INTO recipe_mealplan (user_id, recipe_id, quantity, unit, calories, protein, carbohydrates, fats, date, meal_type) VALUES
(1, 1, 200, 'grams', 350, 20, 50, 10, '2024-10-26', 'Frühstück'),
(2, 1, 1, 'piece', 95, 0.5, 25, 0.3, '2024-10-27', 'Mittagsessen'),
(3, 3, 150, 'grams', 400, 30, 60, 15, '2024-10-28', 'Mittagsessen'),
(1, 2, 1, 'piece', 105, 1.3, 27, 0.3, '2024-10-29', 'snack');

