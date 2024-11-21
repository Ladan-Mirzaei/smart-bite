



CREATE TABLE recipe_diet (
    recipe_id INT REFERENCES recipe(id) ON DELETE CASCADE,
    diet_type_id INT REFERENCES recipe_diet_type(id) ON DELETE CASCADE,
    PRIMARY KEY (recipe_id, diet_type_id)
);

INSERT INTO recipe_diet (recipe_id, diet_type_id) VALUES
    (1, 2),
    (1, 3),
    (2, 4),
    (2, 6),
    (3, 1);
