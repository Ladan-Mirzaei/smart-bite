
CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES recipe_user(id),
    title VARCHAR(255) NOT NULL, 
    description TEXT, 
    preparation_time INT, 
    cooking_time INT, 
    portions INT, 
    category_id INT REFERENCES recipe_categories(id), 
    difficulty_level VARCHAR(100) CHECK (difficulty_level IN ('einfach', 'mittel', 'schwer')), 
    instructions TEXT,
    created_at DATE
);
