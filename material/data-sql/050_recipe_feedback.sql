DROP TABLE IF EXISTS recipe_feedback CASCADE;

CREATE TABLE recipe_feedback (
   id SERIAL PRIMARY KEY,
   user_id INT REFERENCES recipe_user(id),
   recipe_id INT REFERENCES recipe(id),
   rating INT ,  -- Star rating from 1 to 5
   comments TEXT,
   date Date  
);
