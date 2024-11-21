
-- Löschen der Tabellen in der richtigen Reihenfolge:
DROP TABLE IF EXISTS recipe_feedback;
DROP TABLE IF EXISTS user_allergies;
DROP TABLE IF EXISTS recipe_user_preference;
DROP TABLE IF EXISTS recipe_ingredient_details;
DROP TABLE IF EXISTS recipe_mealplan;
DROP TABLE IF EXISTS recipe_nutrition_goal;
DROP TABLE IF EXISTS recipe_ingredient;
DROP TABLE IF EXISTS recipe;
DROP TABLE IF EXISTS allergies;
DROP TABLE IF EXISTS user_diet_goals;
DROP TABLE IF EXISTS recipe_user;


DROP TABLE IF EXISTS recipe_user;


CREATE TABLE recipe_user (
    id SERIAL PRIMARY KEY,
    uid VARCHAR (250) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('männlich', 'weiblich', 'divers')),
    weight FLOAT,
    height FLOAT,
    activity_level VARCHAR(10) CHECK (activity_level IN ('niedrig', 'mittel', 'hoch')) NOT NULL
);

INSERT INTO recipe_user ( uid, date_of_birth, gender, weight, height, activity_level) VALUES
( '128', '1990-01-15', 'weiblich', 75, 180, 'niedrig'),
('125', '1985-03-22', 'weiblich', 60.0, 165, 'mittel'),
('3', '1992-07-30', 'weiblich', 68, 170, 'hoch'),
('23', '1988-11-05', 'männlich', 82, 175, 'mittel');