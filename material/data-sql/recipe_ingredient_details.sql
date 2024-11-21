DROP TABLE IF EXISTS recipe_ingredient_details;

CREATE TABLE recipe_ingredient_details (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES recipe(id), 
    ingredient_id INT REFERENCES recipe_ingredient(id), 
    quantity FLOAT,
    unit VARCHAR(100));

INSERT INTO recipe_ingredient_details (recipe_id, ingredient_id, quantity, unit) VALUES
-- Zutaten für Vegan Salad (recipe_id = 1)
(1, 1, 100, 'g'),  -- Tomate
(1, 2, 50, 'g'),  
(1, 3, 20, 'g'),   
(2, 10, 200, 'g'), 
(2, 11, 150, 'ml'),    
(2, 12, 2, 'stueck'),  
(3, 12, 3, 'stueck'), 
(3, 13, 1, 'stueck'),  
(3, 14, 10, 'ml'),     
(4, 15, 200, 'g'), 
(4, 16, 3, 'stueck'),  
(4, 17, 100, 'g'); 
