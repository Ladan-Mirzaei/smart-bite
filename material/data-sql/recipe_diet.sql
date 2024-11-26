



CREATE TABLE recipe_diet (
    recipe_id INT REFERENCES recipe(id) ,
    diet_type_id INT REFERENCES recipe_diet_type(id) ,
    PRIMARY KEY (recipe_id, diet_type_id)
);
    
INSERT INTO recipe_diet (recipe_id, diet_type_id) VALUES
    (1, 2),
    (1, 3),
    (2, 4),
    (5, 6),
    (5, 1);


