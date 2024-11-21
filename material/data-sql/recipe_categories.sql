-- DROP TABLE IF EXISTS recipe_diet;
-- DROP TABLE IF EXISTS recipe;
-- DROP TABLE IF EXISTS recipe_diet_type;
-- DROP TABLE IF EXISTS recipe_categories;


CREATE TABLE recipe_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) UNIQUE
);





INSERT INTO recipe_categories (name) VALUES
   ('Mexikanisch'),
    ('Indisch'),
    ('Thailändisch'),
    ('Japanisch'),
    ('Französisch'),
    ('Griechisch'),
    ('Spanisch'),
    ('Koreanisch'),
    ('Vietnamesisch'),
    ('Türkisch'),
    ('Libanesisch'),
    ('Brasilianisch'),
    ('Marokkanisch'),
    ('Karibisch'),
    ('Äthiopisch'),
    ('Russisch'),
    ('Philippinisch'),
    ('Amerikanisch'),
    ('Mediterran'),
    ('Kubanisch'),
    ('Deutsch'),
    ('Britisch'),
    ('Portugiesisch'),
    ('Ägyptisch'),
    ('Argentinisch'),
    ('Polnisch'),
    ('Indonesisch'),
    ('Schwedisch'),
    ('Malaysisch'),
    ('Ungarisch');