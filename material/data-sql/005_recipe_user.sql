

DROP TABLE IF EXISTS recipe_user CASCADE;

CREATE TABLE recipe_user (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(250) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10) CHECK (gender IN ('männlich', 'weiblich', 'divers')),
    weight FLOAT,
    height FLOAT,
    activity_level VARCHAR(10) CHECK (activity_level IN ('niedrig', 'mittel', 'hoch')) NOT NULL
);

INSERT INTO recipe_user (uid, date_of_birth, gender, weight, height, activity_level) VALUES
    ('user1', '1990-01-01', 'männlich', 70, 180, 'mittel'),
    ('user2', '1985-05-15', 'weiblich', 60, 165, 'hoch'),
    ('user3', '1995-08-20', 'divers', 75, 175, 'niedrig');
