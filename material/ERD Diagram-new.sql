recipe_user
--
id SERIAL
uid VARCHAR(250)
date_of_birth DATE
gender VARCHAR(10)
weight FLOAT
height FLOAT
activity_level VARCHAR(100)

recipe_allergene
--
id SERIAL FK >- recipe.id
name VARCHAR(100)

recipe_categories
--
id SERIAL
name VARCHAR(250)

recipe
--
id SERIAL
user_id INT FK >- recipe_user.id
title VARCHAR(255)
description TEXT
preparation_time INT
cooking_time INT
portions INT
category_id INT
difficulty_level VARCHAR(100)
created_at DATE
image TEXT

recipe_diet_type
--
id SERIAL FK >- recipe_diet.recipe_id
name VARCHAR(250)
daily_calories INT
daily_fats FLOAT
daily_carbohydrates FLOAT
daily_protein FLOAT

recipe_diet
--
recipe_id INT PK FK >- recipe.id
diet_type_id INT PK

recipe_feedback
--
id SERIAL FK >- recipe.id
user_id INT FK >- recipe_user.id
recipe_id INT
rating FLOAT
comments TEXT

recipe_ingredient
--
id SERIAL FK >- recipe_ingredient_details.id
name VARCHAR(100)
calories FLOAT
protein FLOAT
carbohydrates FLOAT
fats FLOAT
allergene_id INT

recipe_ingredient_details
--
id SERIAL FK >- recipe.id
recipe_id INT
ingredient_id INT
quantity FLOAT
unit VARCHAR(100)


recipe_planner
--
planner_id SERIAL
user_id INT
recipe_id INT FK >- recipe.id
recipe_title VARCHAR(255)
date DATE
link TEXT

recipe_user_allergene
--
user_id INT PK
allergene_id INT PK

recipe_user_sammlung
--
user_id INT PK
recipe_id INT PK

recipe_user_categories
--
user_id INT PK
category_id INT PK


recipe_user_diet_type
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
meal_type VARCHAR(100)

recipe_user_ingredient_allergene
--
user_id INT PK
ingredient_id INT PK

