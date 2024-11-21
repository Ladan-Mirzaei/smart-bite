-- Drop tables if they exist, in reverse dependency order
DROP TABLE IF EXISTS recipe_diet;
DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS recipe_diet_type;

-- Create the recipe_diet_type table
CREATE TABLE recipe_diet_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    daily_calories INT,
    daily_fats FLOAT,
    daily_carbohydrates FLOAT,
    daily_protein FLOAT
);

-- Insert data into recipe_diet_type
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

-- Create the recipe table
CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    preparation_time INT,
    cooking_time INT,
    portions INT,
    category_id INT, -- Assuming recipe_categories exists, add reference if needed
    difficulty_level VARCHAR(100) CHECK (difficulty_level IN ('einfach', 'mittel', 'schwer')),
    instructions TEXT,
    created_at DATE,
    img_name VARCHAR(200), -- Korrekt benannt
    img TEXT
);

-- Insert data into recipe
INSERT INTO recipe (
    title, 
    description, 
    preparation_time, 
    cooking_time, 
    portions, 
    category_id, 
    difficulty_level, 
    instructions, 
    created_at,
    img_name,
    img
) 
VALUES
    ('Vegan Salad', 
    'A healthy salad with fresh vegetables.', 
    10, 
    10, 
    2, 
    1, 
    'einfach', 
    '1. Wash the vegetables.\n2. Chop into small pieces.\n3. Mix in a bowl.', 
    '2024-11-10',
    'vegan-salad.jpg', 
    'path/to/vegan-salad.jpg'
    ),
    ('Gluten-Free Pancakes', 
    'Delicious pancakes made with gluten-free flour.', 
    15, 
    20, 
    4, 
    2, 
    'mittel', 
    '1. Prepare batter.\n2. Fry on both sides.', 
    '2024-11-10',
    'gluten-free-pancakes.jpg', 
    'path/to/gluten-free-pancakes.jpg'
    ),
    ('Keto Avocado Egg Salad', 
    'Creamy salad perfect for a quick snack.', 
    10, 
    5, 
    2, 
    1, 
    'einfach', 
    '1. Boil eggs.\n2. Mix with avocado.', 
    '2024-11-10',
    'keto-avocado-egg-salad.jpg', 
    'path/to/keto-avocado-egg-salad.jpg'
    ),
    ('Glutenfreies Bananenbrot', 
    'Ein saftiges Bananenbrot ohne Gluten.', 
    10, 
    40, 
    8, 
    2, 
    'mittel', 
    '1. Den Backofen auf 180°C vorheizen und eine Kastenform einfetten.\n' ||
    '2. Die Bananen schälen und in einer Schüssel mit einer Gabel zerdrücken.\n' ||
    '3. Ei, Zucker, Öl und Vanilleextrakt zu den Bananen geben und gut vermengen.\n' ||
    '4. Mehl, Backpulver und eine Prise Salz in einer separaten Schüssel mischen und unter die Bananenmasse rühren.\n' ||
    '5. Den Teig in die vorbereitete Form füllen und für ca. 40 Minuten backen, bis ein Zahnstocher sauber herauskommt.', 
    '2024-11-10',
    'glutenfreies-bananenbrot.jpg', 
    'path/to/glutenfreies-bananenbrot.jpg'
    );

-- Create the recipe_diet table
CREATE TABLE recipe_diet (
    recipe_id INT REFERENCES recipe(id) ON DELETE CASCADE,
    diet_type_id INT REFERENCES recipe_diet_type(id) ON DELETE CASCADE,
    PRIMARY KEY (recipe_id, diet_type_id)
);

-- Insert data into recipe_diet
INSERT INTO recipe_diet (recipe_id, diet_type_id) VALUES
    (1, 1), -- Vegan Salad -> Vegan
    (1, 3), -- Vegan Salad -> Glutenfrei
    (2, 4), -- Gluten-Free Pancakes -> Keto
    (2, 6), -- Gluten-Free Pancakes -> Low-carb
    (3, 2); -- Keto Avocado Egg Salad -> Vegetarisch
