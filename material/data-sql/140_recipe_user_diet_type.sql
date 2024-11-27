
CREATE TABLE recipe_user_diet_type (
    user_id INT REFERENCES recipe_user(id),
    diet_type_id INT REFERENCES recipe_diet_type(id),
    PRIMARY KEY (user_id, diet_type_id)
);
