CREATE TABLE recipe_planner (
    planner_id SERIAL PRIMARY KEY,       
    user_id INT REFERENCES recipe_user(id),
    recipe_id INT REFERENCES recipe(id), 
    recipe_title VARCHAR(255) NOT NULL,  
    date DATE NOT NULL,                  
    link TEXT                            
);
INSERT INTO recipe_planner (user_id, recipe_id, recipe_title, date, link) 
VALUES 
(4, 1, 'Spaghetti Bolognese', '2024-11-25', '/recipes/1');
