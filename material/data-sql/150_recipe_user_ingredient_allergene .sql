
CREATE TABLE recipe_user_ingredient_allergene  (
    user_id INT REFERENCES recipe_user(id),
    ingredient_id INT  REFERENCES recipe_ingredient(id) ,
    PRIMARY KEY (user_id, ingredient_id)
);
