CREATE TABLE recipe_user_allergene (
    
    user_id INT REFERENCES recipe_user(id),
    allergene_id INT REFERENCES recipe_allergene(id)
,
    PRIMARY KEY (user_id, allergene_id)
);

