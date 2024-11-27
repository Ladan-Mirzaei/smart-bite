
DROP TABLE IF EXISTS recipe_categories CASCADE;


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
