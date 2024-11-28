-- https://app.quickdatabasediagrams.com/
recipe
--
id SERIAL
title VARCHAR(255)
description TEXT
preparation_time INT
cooking_time INT
servings INT
calories FLOAT
protein FLOAT
carbohydrates FLOAT
fats FLOAT
# Check Constraint on column diet_type
diet_type VARCHAR(20)
# Check Constraint on column difficulty_level
difficulty_level VARCHAR(10)


recipe_ingredient_details
--
id SERIAL
recipe_id INT
ingredient_id INT
quantity FLOAT
unit VARCHAR(100)

recipe_user
--
id SERIAL
name VARCHAR(100)
email VARCHAR(255)
password_hash VARCHAR(255)
date_of_birth DATE
# Check Constraint on column gender
gender VARCHAR(10)
weight FLOAT
height FLOAT
# Check Constraint on column activity_level
activity_level VARCHAR(10)

recipe_nutrition_goal
--
id SERIAL
calorie_goal FLOAT
protein_goal FLOAT
carbohydrate_goal FLOAT
fat_goal FLOAT
user_id INT

recipe_mealplan
--
id SERIAL
user_id INT
recipe_id INT
quantity FLOAT
unit VARCHAR(100)
calories FLOAT
protein FLOAT
carbohydrates FLOAT
fats FLOAT
date DATE
# Check Constraint on column meal_type
meal_type VARCHAR(100)

recipe_ingredient
--
id SERIAL
name VARCHAR(100)
calories FLOAT
protein FLOAT
carbohydrates FLOAT
fats FLOAT

recipe_feedback
--
id SERIAL
user_id INT
recipe_id INT
#  Star rating from 1 to 5
rating INT
comments TEXT
date Date

recipe_user_preference
--
id SERIAL
user_id INT
# Check Constraint on column diet_type
diet_type VARCHAR(50)
allergies VARCHAR(100)
favorite_cuisine VARCHAR(100)