DROP TABLE IF EXISTS recipe_user_preference;

CREATE TABLE recipe_user_preference (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES recipe_user(id), 
    diet_type VARCHAR(50) CHECK (diet_type IN ('vegan', 'vegetarisch', 'glutenfrei', 'keto', 'paleo')),
    
    favorite_cuisine VARCHAR(100)
);

INSERT INTO recipe_user_preference (user_id, diet_type, favorite_cuisine) VALUES
(1, 'vegan',  'Italienisch'),
(3, 'paleo', 'Indisch'),
(2, 'vegetarisch', 'Mexikanisch')
; 
