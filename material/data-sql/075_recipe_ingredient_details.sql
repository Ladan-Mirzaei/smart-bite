
CREATE TABLE recipe_ingredient_details (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES recipe(id), 
    ingredient_id INT REFERENCES recipe_ingredient(id), 
    quantity FLOAT,
    unit VARCHAR(100));
INSERT INTO recipe_ingredient_details (recipe_id, ingredient_id, quantity, unit) VALUES
(1, 1, 500, 'g'), 
(1, 3, 250, 'g'), 
(1, 21, 2, 'Stk'),
(1, 13, 1, 'EL'),  
(1, 6, 300, 'g'),  
(1, 60, 50, 'g'),  
(2, 16, 400, 'g'), 
(2, 33, 200, 'ml'), 
(2, 30, 2, 'Stk'),
(2, 27, 1, 'EL'), 
(2, 21, 1, 'Stk'), 
(2, 15, 200, 'g'), 
(3, 16, 300, 'g'),
(3, 9, 2, 'Stk'),  
(3, 34, 2, 'EL'),  
(3, 13, 1, 'EL'), 
(4, 2, 1, 'Stk'), 
(4, 1, 2, 'Stk'),  
(4, 22, 300, 'g'), 
(4, 11, 200, 'g'),
(4, 12, 100, 'g'),
(5, 21, 4, 'Stk'),
(5, 13, 1, 'EL'), 
(5, 24, 1, 'L'),   
(5, 25, 1, 'Stk'),
(5, 60, 50, 'g'),
(6, 1, 500, 'g'),
(6, 3, 250, 'g'),
(6, 21, 2, 'Stk'),
(6, 13, 1, 'EL'),
(6, 6, 300, 'g'),
(6, 60, 50, 'g'),
(7, 16, 400, 'g'),
(7, 33, 200, 'ml'),
(7, 30, 2, 'Stk'),
(7, 27, 1, 'EL'),
(7, 21, 1, 'Stk'),
(7, 15, 200, 'g'),
(8, 16, 300, 'g'),
(8, 9, 2, 'Stk'),
(8, 34, 2, 'EL'),
(8, 13, 1, 'EL'),
(9, 2, 1, 'Stk'),
(9, 1, 2, 'Stk'),
(9, 22, 300, 'g'),
(9, 11, 200, 'g'),
(9, 12, 100, 'g'),
(10, 21, 4, 'Stk'),
(10, 13, 1, 'EL'),
(10, 24, 1, 'L'),
(10, 25, 1, 'Stk'),
(10, 60, 50, 'g'),
(11, 16, 400, 'g'),
(11, 33, 200, 'ml'),
(11, 13, 1, 'EL'),
(11, 21, 1, 'Stk'),
(11, 30, 1, 'Stk'),
(11, 34, 2, 'EL'),
(11, 23, 1, 'TL'),
(11, 22, 1, 'TL'),
(11, 20, 300, 'g'),
(11, 52, 1, 'Bund'),
(12, 45, 200, 'g'),
(12, 33, 100, 'ml'),
(12, 30, 2, 'Stk'),
(12, 21, 1, 'Stk'),
(12, 35, 1, 'TL'),
(12, 24, 1, 'L'),
(12, 43, 1, 'Bund'),
(12, 22, 1, 'TL'),
(12, 23, 1, 'TL'),

(13, 3, 250, 'g'),
(13, 33, 200, 'ml'),
(13, 13, 1, 'EL'),
(13, 21, 1, 'Stk'),
(13, 30, 1, 'Stk'),
(13, 34, 2, 'EL'),
(13, 23, 1, 'TL'),
(13, 22, 1, 'TL'),
(13, 20, 300, 'g'),
(13, 52, 1, 'Bund');
