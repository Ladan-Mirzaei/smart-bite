DROP TABLE IF EXISTS recipe_user_sammlung CASCADE;
DROP TABLE IF EXISTS recipe_planner CASCADE;
DROP TABLE IF EXISTS recipe_mealplan CASCADE;
DROP TABLE IF EXISTS recipe_ingredient_details CASCADE;
DROP TABLE IF EXISTS recipe_feedback CASCADE;
DROP TABLE IF EXISTS recipe_diet CASCADE;
DROP TABLE IF EXISTS recipe_categories CASCADE;
DROP TABLE IF EXISTS recipe_allergene CASCADE; 
DROP TABLE IF EXISTS recipe_diet_type CASCADE;
DROP TABLE IF EXISTS recipe_ingredient CASCADE;
DROP TABLE IF EXISTS recipe CASCADE;
DROP TABLE IF EXISTS recipe_user_ingredient_allergene CASCADE;
DROP TABLE IF EXISTS recipe_user_diet_type CASCADE;
DROP TABLE IF EXISTS recipe_user_categories CASCADE;
DROP TABLE IF EXISTS recipe_user_allergene CASCADE;
DROP TABLE IF EXISTS recipe_user CASCADE;

CREATE TABLE recipe_user (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(250) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    weight FLOAT,
    height FLOAT,
    activity_level VARCHAR(100)
);

CREATE TABLE recipe_allergene (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) UNIQUE
);

INSERT INTO recipe_allergene (name)
VALUES 
    ('Nachtschattengewächse'),
    ('Milchprodukte'),
    ('Nüsse'),
    ('Meeresfrüchte'),
    ('Eier'),
    ('Gluten'),
    ('Hülsenfrüchte'),
    ('Honig');

CREATE TABLE recipe_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) UNIQUE
);

INSERT INTO recipe_categories (name) VALUES
    ('Mexikanisch'),
    ('Indisch'),
    ('Thailändisch'),
    ('Japanisch'),
    ('Französisch'),
    ('Griechisch'),
    ('Spanisch'),
    ('Koreanisch'),
    ('Vietnamesisch'),
    ('Türkisch'),
    ('Libanesisch'),
    ('Brasilianisch'),
    ('Marokkanisch'),
    ('Karibisch'),
    ('Äthiopisch'),
    ('Russisch'),
    ('Philippinisch'),
    ('Amerikanisch'),
    ('Mediterran'),
    ('Kubanisch'),
    ('Deutsch'),
    ('Britisch'),
    ('Portugiesisch'),
    ('Ägyptisch'),
    ('Argentinisch'),
    ('Polnisch'),
    ('Indonesisch'),
    ('Schwedisch'),
    ('Malaysisch'),
    ('Ungarisch');

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES recipe_user(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    preparation_time INT,
    cooking_time INT,
    portions INT,
    category_id INT REFERENCES recipe_categories(id), 
    difficulty_level VARCHAR(100),
    created_at DATE,
    image TEXT
);

CREATE TABLE recipe_diet_type (
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
    ('Keto', 1800, 150, 50, 70),
    ('Paleo', 2100, 100, 150, 80),
    ('Low-Carb', 1900, 80, 100, 75),
    ('Pescatarian', 2000, 70, 250, 60),
    ('Dairy-Free', 2000, 70, 250, 50),
    ('Fleisch', 2200, 90, 260, 70),
    ('Fisch', 2100, 85, 240, 65);

CREATE TABLE recipe_diet (
    recipe_id INT REFERENCES recipe(id),
    diet_type_id INT REFERENCES recipe_diet_type(id),
    PRIMARY KEY (recipe_id, diet_type_id)
);

CREATE TABLE recipe_feedback (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES recipe_user(id),
    recipe_id INT REFERENCES recipe(id),
    rating FLOAT,
    comments TEXT
);

CREATE TABLE recipe_ingredient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    calories FLOAT,
    protein FLOAT,
    carbohydrates FLOAT,
    fats FLOAT,
    allergene_id INT REFERENCES recipe_allergene(id)
);

INSERT INTO recipe_ingredient (name, calories, protein, carbohydrates, fats, allergene_id)
VALUES
    ('Tomate', 18, 0.9, 3.9, 0.2, 1),
    ('Gurke', 16, 0.7, 3.6, 0.1, NULL),
    ('Kartoffel', 77, 2.0, 17.0, 0.1, 1),
    ('Milch', 42, 3.4, 4.8, 1.0, 2),
    ('Erdnuss', 567, 25.8, 16.1, 49.2, 3),
    ('Mandeln', 579, 21.2, 21.6, 49.9, 3);

CREATE TABLE recipe_ingredient_details (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES recipe(id), 
    ingredient_id INT REFERENCES recipe_ingredient(id), 
    quantity FLOAT,
    unit VARCHAR(100)
);

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

CREATE TABLE recipe_planner (
    planner_id SERIAL PRIMARY KEY,       
    user_id INT REFERENCES recipe_user(id),
    recipe_id INT REFERENCES recipe(id),
    recipe_title VARCHAR(255) NOT NULL,  
    date DATE NOT NULL
);

CREATE TABLE recipe_user_allergene (
    user_id INT REFERENCES recipe_user(id),
    allergene_id INT REFERENCES recipe_allergene(id),
    PRIMARY KEY (user_id, allergene_id)
);

CREATE TABLE recipe_user_sammlung (
    user_id INT REFERENCES recipe_user(id),
    recipe_id INT REFERENCES recipe(id),
    PRIMARY KEY (user_id, recipe_id)
);

CREATE TABLE recipe_user_categories (
    user_id INT REFERENCES recipe_user(id),
    category_id INT REFERENCES recipe_categories(id),
    PRIMARY KEY (user_id, category_id)
);

CREATE TABLE recipe_user_diet_type (
    user_id INT REFERENCES recipe_user(id),
    diet_type_id INT REFERENCES recipe_diet_type(id),
    PRIMARY KEY (user_id, diet_type_id)
);

CREATE TABLE recipe_user_ingredient_allergene (
    user_id INT REFERENCES recipe_user(id),
    ingredient_id INT REFERENCES recipe_ingredient(id),
    PRIMARY KEY (user_id, ingredient_id)
);

