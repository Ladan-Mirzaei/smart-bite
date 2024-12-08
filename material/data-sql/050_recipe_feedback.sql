CREATE TABLE recipe_feedback (
   id SERIAL PRIMARY KEY,
   user_id INT REFERENCES recipe_user(id) ,
   recipe_id INT REFERENCES recipe(id) ,
   rating FLOAT ,  
   comments TEXT
);
