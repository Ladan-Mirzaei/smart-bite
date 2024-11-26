CREATE TABLE recipe_diet_goals (
    goal_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    start_date DATE,
    end_date DATE,
    target_weight FLOAT,
    calorie_goal INT,
    protein_goal FLOAT,
    carbs_goal FLOAT,
    fats_goal FLOAT
);