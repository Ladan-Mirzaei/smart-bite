
CREATE TABLE  recipe_diet_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    daily_calories INT,
    daily_fats FLOAT,
    daily_carbohydrates FLOAT,
    daily_protein FLOAT
);

INSERT INTO recipe_diet_type (name, daily_calories, daily_fats, daily_carbohydrates, daily_protein) VALUES
    ('Vegan', 2000, 70, 250, 50),
    ('Vegetarisch', 2200, 80, 270, 60),
    ('Glutenfrei', 2000, 75, 230, 55),
    ('keto', 1800, 150, 50, 70),
    ('paleo', 2100, 100, 150, 80),
    ('low-carb', 1900, 80, 100, 75),
    ('pescatarian', 2000, 70, 250, 60),
    ('dairy-free', 2000, 70, 250, 50),
    ('Fleisch', 2200, 90, 260, 70),
    ('Fisch', 2100, 85, 240, 65);
