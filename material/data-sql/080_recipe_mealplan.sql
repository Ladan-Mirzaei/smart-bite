


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
    meal_type VARCHAR(100) 
);
