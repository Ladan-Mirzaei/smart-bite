-- DROP TABLE IF EXISTS recipe_diet;
-- DROP TABLE IF EXISTS recipe;
-- DROP TABLE IF EXISTS recipe_diet_type;
-- DROP TABLE IF EXISTS recipe_categories;



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
    instructions TEXT,
    created_at DATE
);

INSERT INTO recipe (
    user_id,
    title, 
    description, 
    preparation_time, 
    cooking_time, 
    portions, 
    category_id, 
    difficulty_level, 
    instructions,
    created_at
) VALUES 
(
    'Vegan Salat', 
    'Ein gesunder Salat mit frischem Gemüse.', 
    10, 
    10,
    2, 
    1, 
    'einfach', 
    '1. Gemüse waschen und in kleine Stücke schneiden.\n' ||
    '2. Alle Zutaten in einer Schüssel vermengen.\n' ||
    '3. Mit Dressing abschmecken und servieren.',
    '2024-11-10'
),
(
    'Glutenfreie Pfannkuchen',
    'Leckere Pfannkuchen aus glutenfreiem Mehl.',
    15, 
    20, 
    4, 
    3, 
    'mittel', 
    '1. Pfanne erhitzen und etwas Öl hinzufügen.\n' ||
    '2. Teig für die Pfannkuchen vorbereiten.\n' ||
    '3. Teig in die Pfanne geben und auf beiden Seiten goldbraun braten.\n' ||
    '4. Warm servieren.',
    '2024-11-10'
),
(
    'Keto Avocado-Eiersalat',
    'Ein cremiger, ketofreundlicher Salat aus Avocado und Ei, perfekt für einen schnellen Snack.',
    10, 
    5, 
    2, 
    2, 
    'einfach', 
    '1. Die Eier in einem Topf für ca. 10 Minuten hart kochen. Anschließend abkühlen lassen und in kleine Stücke schneiden.\n' ||
    '2. Die Avocado halbieren, das Fruchtfleisch herauslöffeln und in eine Schüssel geben. Mit einer Gabel zerdrücken.\n' ||
    '3. Die Eierstücke zur Avocado hinzufügen und gut vermischen. Mit Salz, Pfeffer und etwas Zitronensaft abschmecken.\n' ||
    '4. Optional: Ein wenig gehackten Schnittlauch oder Petersilie hinzufügen und sofort servieren.',
    '2024-11-10'
);
