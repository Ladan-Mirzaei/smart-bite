CREATE TABLE recepie_allergene  (
    user_id INT REFERENCES users(uid),
    allergy_id INT REFERENCES recipe_allergies(id), 
    PRIMARY KEY (user_id,allergy_id)
);