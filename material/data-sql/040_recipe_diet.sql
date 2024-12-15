
CREATE TABLE recipe_diet (
    recipe_id INT REFERENCES recipe(id) ,
    diet_type_id INT REFERENCES recipe_diet_type(id) ,
    PRIMARY KEY (recipe_id, diet_type_id)
);
INSERT INTO recipe_diet (recipe_id, diet_type_id) VALUES
(1, 9), 
(2, 6), 
(3, 7), 
(4, 2), 
(5, 2),
(6, 9), 
(7, 6),
(8, 7), 
(9, 2), 
(10, 2),
(11, 4),
(12, 1), 
(12, 3), 
(13, 3), 
(13, 1); 