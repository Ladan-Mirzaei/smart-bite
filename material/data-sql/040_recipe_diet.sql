
CREATE TABLE recipe_diet (
    recipe_id INT REFERENCES recipe(id) ,
    diet_type_id INT REFERENCES recipe_diet_type(id) ,
    PRIMARY KEY (recipe_id, diet_type_id)
);
