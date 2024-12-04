
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
    gender VARCHAR(10) CHECK (gender IN ('männlich', 'weiblich', 'divers')),
    weight FLOAT,
    height FLOAT,
    activity_level VARCHAR(10) CHECK (activity_level IN ('niedrig', 'mittel', 'hoch')) NOT NULL
);

INSERT INTO recipe_user (uid, date_of_birth, gender, weight, height, activity_level) VALUES
    ('user1', '1990-01-01', 'männlich', 70, 180, 'mittel'),
    ('user2', '1985-05-15', 'weiblich', 60, 165, 'hoch'),
    ('user3', '1995-08-20', 'divers', 75, 175, 'niedrig');

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
    difficulty_level VARCHAR(100) ,
    created_at DATE,
    image TEXT
);

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

CREATE TABLE recipe_diet (
    recipe_id INT REFERENCES recipe(id) ,
    diet_type_id INT REFERENCES recipe_diet_type(id) ,
    PRIMARY KEY (recipe_id, diet_type_id)
);

CREATE TABLE recipe_feedback (
   id SERIAL PRIMARY KEY,
   user_id INT REFERENCES recipe_user(id),
   recipe_id INT REFERENCES recipe(id),
   rating INT ,  -- Star rating from 1 to 5
   comments TEXT,
   date Date  
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

INSERT INTO recipe_ingredient (name, calories, protein, carbohydrates, fats, allergene_id) VALUES
    ('Tomate', 18, 0.9, 3.9, 0.2, 1),
    ('Gurke', 16, 0.7, 3.6, 0.1, NULL),
    ('Kartoffel', 77, 2.0, 17.0, 0.1, 1),
    ('Milch', 42, 3.4, 4.8, 1.0, 2),
    ('Erdnuss', 567, 25.8, 16.1, 49.2, 3),
    ('Mandeln', 579, 21.2, 21.6, 49.9, 3),
    ('Lachs', 208, 20.4, 0.0, 13.6, 4),
    ('Ei', 155, 13.0, 1.1, 11.0, 5),
    ('Weizenbrot', 265, 9.0, 49.0, 3.2, 6),
    ('Sojabohne', 446, 36.5, 30.2, 19.9, 7),
    ('Paprika', 31, 1.0, 6.0, 0.3, 1),
    ('Aubergine', 25, 1.0, 5.9, 0.2, 1),
    ('Mozzarella', 280, 22.0, 2.2, 22.4, 2),
    ('Joghurt', 59, 10.0, 3.6, 0.4, 2),
    ('Reis', 130, 2.4, 28.0, 0.3, NULL),
    ('Huhn', 239, 27.3, 0.0, 13.6, NULL),
    ('Schweinefleisch', 242, 27.0, 0.0, 14.0, NULL),
    ('Rindfleisch', 250, 26.0, 0.0, 15.0, NULL),
    ('Thunfisch', 144, 23.3, 0.0, 4.9,4),
    ('Shrimp', 85, 20.0, 0.0, 0.5, 4),
    ('Brokkoli', 55, 3.7, 11.1, 0.6, NULL),
    ('Karotte', 41, 0.9, 9.6, 0.2, NULL),
    ('Apfel', 52, 0.3, 14.0, 0.2, NULL),
    ('Banane', 89, 1.1, 23.0, 0.3, NULL),
    ('Orange', 47, 0.9, 12.0, 0.1, NULL),
    ('Ananas', 50, 0.5, 13.1, 0.1, NULL),
    ('Mango', 60, 0.8, 15.0, 0.4, NULL),
    ('Erdbeere', 32, 0.7, 7.7, 0.3, NULL),
    ('Blaubeere', 57, 0.7, 14.5, 0.3, NULL),
    ('Himbeere', 52, 1.2, 12.0, 0.7, NULL),
    ('Avocado', 160, 2.0, 9.0, 15.0, NULL),
    ('Spinat', 23, 2.9, 3.6, 0.4, NULL),
    ('Grünkohl', 49, 4.3, 8.8, 0.9, NULL),
    ('Zucchini', 17, 1.2, 3.1, 0.3, NULL),
    ('Kürbis', 26, 1.0, 6.5, 0.1, NULL),
    ('Honig', 304, 0.3, 82.4, 0.0, 8),
    ('Haferflocken', 389, 16.9, 66.3, 6.9, 6),
    ('Quinoa', 120, 4.1, 21.3, 1.9, NULL),
    ('Chiasamen', 486, 16.5, 42.1, 30.7, NULL),
    ('Leinsamen', 534, 18.3, 28.9, 42.2, NULL),
    ('Kürbiskerne', 559, 30.2, 10.7, 49.1, 3),
    ('Cashew', 553, 18.2, 30.2, 43.8, 3),
    ('Walnuss', 654, 15.0, 14.0, 65.2, 3),
    ('Bohnen', 347, 21.0, 63.0, 1.2, 7),
    ('Linsen', 352, 24.6, 63.4, 1.1, 7),
    ('Kidneybohnen', 333, 23.6, 60.0, 0.8, 7),
    ('Kichererbsen', 364, 19.3, 61.0, 6.0, 7),
    ('Süßkartoffel', 86, 1.6, 20.1, 0.1, NULL),
    ('Tofu', 76, 8.1, 1.9, 4.8, 7),
    ('Tempeh', 192, 20.3, 7.6, 10.8, 7),
    ('Olivenöl', 884, 0.0, 0.0, 100.0, NULL),
    ('Butter', 717, 0.9, 0.1, 81.1, 2),
    ('Käse', 402, 25.0, 1.3, 33.1, 2),
    ('Hüttenkäse', 98, 11.1, 3.4, 4.3, 2),
    ('Parmesan', 431, 38.0, 4.1, 29.4, 2),
    ('Schokolade', 546, 4.9, 61.0, 31.0, NULL),
    ('Mandarinen', 53, 0.8, 13.3, 0.3, NULL),
    ('Birne', 57, 0.4, 15.0, 0.1, NULL),
    ('Pfirsich', 39, 0.9, 9.5, 0.3, NULL),
    ('Granatapfel', 83, 1.7, 18.7, 1.2, NULL),
    ('Kokosnuss', 354, 3.3, 15.2, 33.5, NULL),
    ('Aprikose', 48, 1.4, 11.1, 0.4, NULL),
    ('Zitrone', 29, 1.1, 9.3, 0.3, NULL),
    ('Kaffee', 1, 0.1, 0.0, 0.0, NULL),
    ('Tee', 1, 0.0, 0.0, 0.0, NULL),
    ('Rote Beete', 43, 1.6, 9.6, 0.2, NULL),
    ('Pilze', 22, 3.1, 3.3, 0.3, NULL),
    ('Basilikum', 23, 3.2, 2.7, 0.6, NULL),
    ('Thymian', 101, 5.6, 24.5, 1.7, NULL),
    ('Rosmarin', 131, 3.3, 20.7, 5.9, NULL),
    ('Oregano', 265, 9.0, 68.9, 4.3, NULL),
    ('Petersilie', 36, 3.0, 6.3, 0.8, NULL),
    ('Minze', 44, 3.3, 8.4, 0.6, NULL),
    ('Koriander', 23, 2.1, 3.7, 0.5, NULL),
    ('Ingwer', 80, 1.8, 17.8, 0.8, NULL),
    ('Knoblauch', 149, 6.4, 33.1, 0.5, NULL),
    ('Zwiebel', 40, 1.1, 9.3, 0.1, NULL),
    ('Sellerie', 16, 0.7, 3.5, 0.2, NULL),
    ('Fenchel', 31, 1.2, 7.3, 0.2, NULL),
    ('Chili', 40, 1.9, 8.8, 0.4, 1),
    ('Rucola', 25, 2.6, 3.7, 0.7, NULL),
    ('Pak Choi', 13, 1.5, 2.2, 0.2, NULL),
    ('Grüne Bohnen', 31, 1.8, 7.1, 0.1, 7),
    ('Edamame', 121, 11.9, 8.9, 5.2, 7),
    ('Artischocke', 47, 3.3, 10.5, 0.2, NULL),
    ('Kohl', 25, 1.3, 5.8, 0.1, NULL),
    ('Rotkohl', 31, 1.4, 7.4, 0.2, NULL),
    ('Blumenkohl', 25, 1.9, 4.9, 0.3, NULL),
    ('Mais', 86, 3.3, 19.0, 1.2, NULL),
    ('Weißkohl', 25, 1.3, 5.8, 0.1, NULL),
    ('Rosenkohl', 43, 3.4, 8.9, 0.3, NULL),
    ('Lauch', 61, 1.5, 14.2, 0.3, NULL),
    ('Zucker', 387, 0.0, 100.0, 0.0, NULL),
    ('Salz', 0, 0.0, 0.0, 0.0, NULL),
    ('Essig', 21, 0.0, 0.9, 0.0, NULL),
    ('Sojasauce', 53, 5.0, 4.9, 0.0, 7),
    ('Ketchup', 112, 1.0, 25.8, 0.2, 1),
    ('Mayonnaise', 680, 1.0, 0.6, 75.0, NULL),
    ('Pistazien', 562, 20.0, 27.2, 45.3, 3),
    ('Macadamianüsse', 718, 7.9, 13.8, 75.8, 3),
    ('Sonnenblumenkerne', 584, 20.8, 20.0, 51.5, NULL),
    ('Dinkelmehl', 333, 14.6, 70.2, 2.4, 6),
    ('Roggenmehl', 335, 9.0, 73.0, 1.7, 6),
    ('Vollkornbrot', 250, 9.0, 43.0, 4.0, 6),
    ('Magerquark', 67, 12.0, 4.0, 0.2, 2),
    ('Sahne', 337, 2.1, 3.2, 35.0, 2),
    ('Schweizer Käse', 380, 25.0, 1.4, 29.0, 2),
    ('Hirse', 119, 3.5, 23.7, 1.0, NULL),
    ('Kokosöl', 862, 0.0, 0.0, 100.0, NULL),
    ('Pekannüsse', 691, 9.2, 13.9, 72.0, 3),
    ('Haselnüsse', 628, 15.0, 16.7, 60.8, 3),
    ('Rindersteak', 271, 26.1, 0.0, 19.0, NULL),
    ('Ente', 337, 18.3, 0.0, 28.4, NULL),
    ('Hähnchenbrust', 165, 31.0, 0.0, 3.6, NULL),
    ('Lamm', 294, 25.6, 0.0, 21.3, NULL),
    ('Wildreis', 101, 4.0, 21.0, 0.3, NULL),
    ('Hummer', 77, 16.5, 0.0, 0.9, 4),
    ('Kabeljau', 82, 18.0, 0.0, 0.7, 4),
    ('Austern', 68, 7.0, 4.0, 2.0, 4),
    ('Calamari', 92, 15.6, 3.1, 1.4, 4),
    ('Linsennudeln', 352, 24.0, 53.0, 1.5, 7),
    ('Kichererbsenmehl', 387, 22.0, 58.0, 6.7, 7),
    ('Mandeldrink', 13, 0.4, 0.3, 1.2, 3),
    ('Cashewmilch', 25, 0.9, 1.5, 2.0, 3),
    ('Hafermilch', 47, 1.0, 8.0, 1.5, 6),
    ('Kokosmilch', 230, 2.3, 5.5, 23.8, NULL),
    ('Reismilch', 47, 0.3, 10.0, 1.0, NULL),
    ('Sesam', 573, 17.0, 23.0, 49.7, 3),
        ('Senf', 66, 4.4, 5.8, 3.6, 7);

CREATE TABLE recipe_ingredient_details (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES recipe(id), 
    ingredient_id INT REFERENCES recipe_ingredient(id), 
    quantity FLOAT,
    unit VARCHAR(100));



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
-- DROP TABLE IF EXISTS recipe_nutrition_goal CASCADE;
-- CREATE TABLE recipe_nutrition_goal (
--     id SERIAL PRIMARY KEY,
--     calorie_goal FLOAT,
--     protein_goal FLOAT,
--     carbohydrate_goal FLOAT,
--     fat_goal FLOAT,
--     user_id INT REFERENCES recipe_user(uid)
-- );

-- INSERT INTO recipe_nutrition_goal (user_id, calorie_goal, protein_goal, carbohydrate_goal, fat_goal) VALUES
-- (1, 2000, 50, 250, 70),
-- (2, 1800, 40, 200, 60),
-- (3, 2200, 80, 180, 90),
-- (4, 1900, 60, 210, 75);

CREATE TABLE recipe_planner (
    planner_id SERIAL PRIMARY KEY,       
    user_id INT REFERENCES recipe_user(id),
    recipe_id INT REFERENCES recipe(id),
    recipe_title VARCHAR(255) NOT NULL,  
    date DATE NOT NULL,                  
    link TEXT                            
);
 
 CREATE TABLE recipe_user_allergene (
    
    user_id INT REFERENCES recipe_user(id),
    allergene_id INT REFERENCES recipe_allergene(id)
,
    PRIMARY KEY (user_id, allergene_id)
);
CREATE TABLE recipe_user_sammlung (
    user_id INT REFERENCES recipe_user(id),
    recipe_id INT REFERENCES recipe(id),
    PRIMARY KEY (user_id, recipe_id)
);

CREATE TABLE recipe_user_categories (
    user_id INT REFERENCES recipe_user(id),
    category_id INT  REFERENCES recipe_categories(id) ,
   PRIMARY KEY (user_id, category_id)
);
-- CREATE TABLE recipe_diet_goals (
--     goal_id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(user_id),
--     start_date DATE,
--     end_date DATE,
--     target_weight FLOAT,
--     calorie_goal INT,
--     protein_goal FLOAT,
--     carbs_goal FLOAT,
--     fats_goal FLOAT
-- );

CREATE TABLE recipe_user_diet_type (
    user_id INT REFERENCES recipe_user(id),
    diet_type_id INT REFERENCES recipe_diet_type(id),
    PRIMARY KEY (user_id, diet_type_id)
);

CREATE TABLE recipe_user_ingredient_allergene  (
    user_id INT REFERENCES recipe_user(id),
    ingredient_id INT  REFERENCES recipe_ingredient(id) ,
    PRIMARY KEY (user_id, ingredient_id)
);
