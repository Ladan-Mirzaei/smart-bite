 
 CREATE TABLE recipe_planner (
    planner_id SERIAL PRIMARY KEY,       
    user_id INT REFERENCES recipe_user(id),
    recipe_id INT REFERENCES recipe(id), 
    recipe_title VARCHAR(255) NOT NULL,  
    date DATE NOT NULL,                  
    link TEXT                            
);
