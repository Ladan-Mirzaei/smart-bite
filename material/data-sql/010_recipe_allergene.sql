
CREATE TABLE recipe_allergene (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) UNIQUE
);

INSERT INTO recipe_allergene (name)
VALUES 
    ('Nachtschattengewächse'),
    ('Milchprodukte'),
    ('Nüsse'),
    ('Meeresfrüchte'),
    ('Eier'),
    ('Gluten'),
    ('Hülsenfrüchte');
