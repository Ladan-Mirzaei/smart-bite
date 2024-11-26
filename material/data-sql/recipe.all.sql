DROP TABLE IF EXISTS recipe_user_allergene CASCADE;
DROP TABLE IF EXISTS recipe_user_diet_type CASCADE;
DROP TABLE IF EXISTS recipe_user_categories CASCADE;
DROP TABLE IF EXISTS recipe_diet CASCADE;
DROP TABLE IF EXISTS recipe CASCADE;
DROP TABLE IF EXISTS recipe_diet_type CASCADE;
DROP TABLE IF EXISTS recipe_user CASCADE;
DROP TABLE IF EXISTS recipe_categories CASCADE;
DROP TABLE IF EXISTS recipe_allergene CASCADE;

CREATE TABLE recipe_user (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(250) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('männlich', 'weiblich', 'divers')),
    weight FLOAT,
    height FLOAT,
    activity_level VARCHAR(10) CHECK (activity_level IN ('niedrig', 'mittel', 'hoch')) NOT NULL
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
    ('Low-carb', 1900, 80, 100, 75),
    ('Pescatarian', 2000, 70, 250, 60),
    ('Dairy-free', 2000, 70, 250, 50),
    ('Fleisch', 2200, 90, 260, 70),
    ('Fisch', 2100, 85, 240, 65),
    ('klassisch', 2100, 85, 240, 65);

-- Create recipe categories table
CREATE TABLE recipe_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) UNIQUE
);

INSERT INTO recipe_categories (name) VALUES
   ('Mexikanisch'), ('Indisch'), ('Thailändisch'), ('Japanisch'),
   ('Französisch'), ('Griechisch'), ('Spanisch'), ('Koreanisch'),
   ('Vietnamesisch'), ('Türkisch'), ('Libanesisch'), ('Brasilianisch'),
   ('Marokkanisch'), ('Karibisch'), ('Äthiopisch'), ('Russisch'),
   ('Philippinisch'), ('Amerikanisch'), ('Mediterran'), ('Kubanisch'),
   ('Deutsch'), ('Britisch'), ('Portugiesisch'), ('Ägyptisch'),
   ('Argentinisch'), ('Polnisch'), ('Indonesisch'), ('Schwedisch'),
   ('Malaysisch'), ('Ungarisch');

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES recipe_user(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    preparation_time INT,
    cooking_time INT,
    portions INT,
    category_id INT REFERENCES recipe_categories(id), 
    difficulty_level VARCHAR(100) CHECK (difficulty_level IN ('einfach', 'mittel', 'schwer')),
    created_at DATE,
    image TEXT
);

INSERT INTO recipe_user (uid, date_of_birth, gender, weight, height, activity_level) VALUES
    ('user1', '1990-01-01', 'männlich', 70, 180, 'mittel'),
    ('user2', '1985-05-15', 'weiblich', 60, 165, 'hoch'),
    ('user3', '1995-08-20', 'divers', 75, 175, 'niedrig');

INSERT INTO recipe (
    user_id,
    title, 
    description, 
    preparation_time, 
    cooking_time, 
    portions, 
    category_id, 
    difficulty_level, 
    created_at,
    image
) 
VALUES
    (1, 'Vegan Salad', 'A healthy salad with fresh vegetables.', 10, 10, 2, 1, 'einfach', '2024-11-10', NULL),
    (1, 'Gluten-Free Pancakes', 'Delicious pancakes made with gluten-free flour.', 15, 20, 4, 2, 'mittel', '2024-11-10', NULL),
    (3, 'Keto Avocado Egg Salad', 'Creamy salad perfect for a quick snack.', 10, 5, 2, 1, 'einfach', '2024-11-10', NULL),
    (2, 'Glutenfreies Bananenbrot', 'Ein saftiges Bananenbrot ohne Gluten.', 10, 40, 8, 2, 'mittel', '2024-11-10', NULL);

CREATE TABLE recipe_diet (
    recipe_id INT REFERENCES recipe(id) ON DELETE CASCADE,
    diet_type_id INT REFERENCES recipe_diet_type(id) ON DELETE CASCADE,
    PRIMARY KEY (recipe_id, diet_type_id)
);

INSERT INTO recipe_diet (recipe_id, diet_type_id) VALUES
    (1, 1), -- Vegan Salad -> Vegan
    (1, 3), -- Vegan Salad -> Glutenfrei
    (2, 3), -- Gluten-Free Pancakes -> Glutenfrei
    (2, 6), -- Gluten-Free Pancakes -> Low-carb
    (3, 2); -- Keto Avocado Egg Salad -> Vegetarisch

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
    ('Hülsenfrüchte');

CREATE TABLE recipe_user_allergene (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES recipe_user(id),
    ingredient_id INT REFERENCES recipe_ingredient(id),
    allergene_id INT REFERENCES recipe_allergene(id)
);

CREATE TABLE recipe_user_diet_type (
    user_id INT REFERENCES recipe_user(id),
    diet_type_id INT REFERENCES recipe_diet_type(id),
    PRIMARY KEY (user_id, diet_type_id)
);

CREATE TABLE recipe_user_categories (
    user_id INT REFERENCES recipe_user(id),
    category_id INT REFERENCES recipe_categories(id),
    PRIMARY KEY (user_id, category_id)
);
