


CREATE TABLE recipe_user (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(250) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    weight FLOAT,
    height FLOAT,
    activity_level VARCHAR(100));

    