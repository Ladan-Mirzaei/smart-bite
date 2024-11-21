DROP TABLE IF EXISTS recipe_feedback;

CREATE TABLE recipe_feedback (
   id SERIAL PRIMARY KEY,
   user_id INT REFERENCES recipe_user(id),
   recipe_id INT REFERENCES recipe(id),
   rating INT ,  -- Star rating from 1 to 5
   comments TEXT,
   date Date  
);

INSERT INTO recipe_feedback (user_id, recipe_id, rating, comments,date) VALUES
(1, 1, 5, 'Köstlich und einfach zuzubereiten!', '2024-10-26 14:30:00-05'),
(2, 2, 4, 'Lecker, könnte aber mehr Geschmack vertragen.', '2024-10-27 09:00:00-05'),
(3, 3, 3, 'Durchschnittliches Gericht, nichts Besonderes.', '2024-10-28 19:15:00-05');
