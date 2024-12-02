CREATE TABLE recipe_user_sammlung (
    user_id INT REFERENCES recipe_user(id),
    recipe_id INT REFERENCES recipe(id),
    PRIMARY KEY (user_id, recipe_id)
);
