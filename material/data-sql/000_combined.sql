
DROP TABLE IF EXISTS recipe_user_sammlung CASCADE;
DROP TABLE IF EXISTS recipe_planner CASCADE;
DROP TABLE IF EXISTS recipe_mealplan CASCADE;
DROP TABLE IF EXISTS recipe_ingredient_details CASCADE;
DROP TABLE IF EXISTS recipe_feedback CASCADE;
DROP TABLE IF EXISTS recipe_diet CASCADE;
DROP TABLE IF EXISTS recipe_categories CASCADE;
DROP TABLE IF EXISTS recipe_allergene CASCADE; 
DROP TABLE IF EXISTS recipe_diet_type CASCADE;
DROP TABLE IF EXISTS recipe_ingredient CASCADE;
DROP TABLE IF EXISTS recipe CASCADE;
DROP TABLE IF EXISTS recipe_user_ingredient_allergene CASCADE;
DROP TABLE IF EXISTS recipe_user_diet_type CASCADE;
DROP TABLE IF EXISTS recipe_user_categories CASCADE;
DROP TABLE IF EXISTS recipe_user_allergene CASCADE;
DROP TABLE IF EXISTS recipe_user CASCADE;



CREATE TABLE recipe_user (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(250) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    weight FLOAT,
    height FLOAT,
    activity_level VARCHAR(100));

    
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
    ('Hülsenfrüchte'),
     ('Honig');



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

CREATE TABLE recipe (
     id SERIAL PRIMARY KEY,
    user_id INT REFERENCES recipe_user(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    preparation_time INT,
    cooking_time INT,
    portions INT,
    category_id INT REFERENCES recipe_categories(id), 
    difficulty_level VARCHAR(100) ,
    created_at DATE,
    image TEXT
);
-- INSERT INTO recipe (user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES
-- (1, 'Spaghetti Bolognese', 'Ein Klassiker der italienischen Küche. Diese herzhafte Bolognese-Sauce wird mit gehacktem Rindfleisch, Tomaten, Karotten, Sellerie und einer Prise italienischer Kräuter langsam geköchelt. Perfekt serviert mit Spaghetti und frisch geriebenem Parmesan.', 15, 60, 4, 1, 'mittel', CURRENT_DATE, ''),
-- (1, 'Hühner-Curry', 'Ein aromatisches indisches Gericht, das zarte Hühnerstücke in einer würzigen Tomaten-Kokosnuss-Sauce vereint. Mit Koriander, Ingwer und Garam Masala verfeinert, wird es traditionell mit Basmatireis serviert.', 20, 40, 4, 2, 'einfach', CURRENT_DATE, ''),
-- (1, 'Thai-Grünes Curry', 'Ein scharfes, cremiges Curry, das mit grüner Currypaste, Kokosmilch, knackigem Gemüse und zartem Huhn oder Tofu zubereitet wird. Dieses Gericht ist reich an Aromen und perfekt für Liebhaber der asiatischen Küche.', 25, 35, 4, 3, 'mittel', CURRENT_DATE, ''),
-- (1, 'Vegetarische Lasagne', 'Eine köstliche Lasagne mit geschichteten Schichten aus cremiger Bechamelsauce, frischen Zucchini, Auberginen und einer herzhaften Tomatensauce. Dieses Gericht ist eine gesunde Alternative zur klassischen Lasagne.', 30, 45, 6, 7, 'schwer', CURRENT_DATE, ''),
-- (1, 'Französische Zwiebelsuppe', 'Eine reichhaltige und wärmende Suppe, die durch langsam karamellisierte Zwiebeln, einen Schuss Weißwein und eine kräftige Brühe besticht. Gekrönt mit knusprigem Baguette und geschmolzenem Käse.', 15, 50, 4, 5, 'mittel', CURRENT_DATE, ''),
-- (1, 'Keto Avocado-Hähnchen-Salat', 
-- 'Ein cremiger Keto-Salat mit Avocado und gegrilltem Hähnchen. Kochschritte:
-- 1. Das Hähnchen mit Olivenöl, Salz und Pfeffer einreiben und in einer heißen Pfanne goldbraun braten. Anschließend in Streifen schneiden.
-- 2. Eine reife Avocado würfeln und mit etwas Zitronensaft beträufeln, damit sie nicht braun wird.
-- 3. Gurke, Tomaten und Paprika klein schneiden und zusammen mit dem Hähnchen und der Avocado in eine große Schüssel geben.
-- 4. Für das Dressing Olivenöl, Zitronensaft, Senf, Knoblauch und frische Kräuter (z. B. Dill oder Petersilie) verrühren.
-- 5. Alles gut mischen und nach Geschmack mit Salz und Pfeffer abschmecken. Sofort servieren.', 
-- 15, 10, 2, 8, 'einfach', CURRENT_DATE, ''),

-- (1, 'Low-Carb Blumenkohlreis mit Gemüse', 
-- 'Ein gesunder, kohlenhydratarmer Genuss mit Blumenkohlreis und knackigem Gemüse. Kochschritte:
-- 1. Blumenkohl in kleine Röschen teilen und in einem Mixer zu einer reisähnlichen Konsistenz zerkleinern.
-- 2. Zwiebel und Knoblauch hacken und in einer großen Pfanne in Olivenöl anschwitzen, bis sie glasig sind.
-- 3. Paprika, Zucchini und Karotten in kleine Würfel schneiden und zur Zwiebelmischung geben. Etwa 5 Minuten anbraten.
-- 4. Den Blumenkohlreis hinzufügen, gut umrühren und weitere 5 Minuten braten, bis er weich ist.
-- 5. Mit Sojasauce, Salz, Pfeffer und frischen Kräutern abschmecken. Optional: Mit etwas geröstetem Sesam garnieren.', 
-- 20, 15, 3, 6, 'einfach', CURRENT_DATE, ''),

-- (1, 'Vegane Buddha Bowl mit Tahini-Dressing', 
-- 'Eine nährstoffreiche Schale mit frischem Gemüse, Quinoa und einem cremigen Tahini-Dressing. Kochschritte:
-- 1. Quinoa gründlich waschen und in doppelter Menge Wasser kochen, bis es weich ist (ca. 15 Minuten).
-- 2. Süßkartoffeln in Würfel schneiden, mit Olivenöl und Gewürzen wie Paprikapulver und Kreuzkümmel marinieren und im Ofen bei 200 °C 20 Minuten rösten.
-- 3. Frisches Gemüse wie Gurke, Tomaten, Karotten und Rotkohl fein schneiden oder hobeln.
-- 4. Für das Dressing Tahini, Zitronensaft, Knoblauch und etwas Wasser cremig rühren und mit Salz und Pfeffer abschmecken.
-- 5. Quinoa, Süßkartoffeln und Gemüse in einer Schale anrichten, mit dem Dressing beträufeln und mit frischen Kräutern oder gerösteten Kernen garnieren.', 
-- 25, 20, 4, 2, 'mittel', CURRENT_DATE, ''),

-- (1, 'Keto Zoodles mit cremiger Alfredo-Sauce', 
-- 'Zucchininudeln mit einer sahnigen Alfredo-Sauce – perfekt für die Keto-Diät. Kochschritte:
-- 1. Zucchini mit einem Spiralschneider in dünne Nudeln schneiden und beiseite stellen.
-- 2. In einer Pfanne Butter schmelzen und gehackten Knoblauch kurz anbraten, bis er duftet.
-- 3. Frischkäse und Sahne hinzufügen, gut verrühren und mit Salz, Pfeffer und Muskatnuss abschmecken.
-- 4. Den geriebenen Parmesan einrühren, bis eine cremige Sauce entsteht.
-- 5. Die Zoodles in die Sauce geben und vorsichtig umrühren, bis sie leicht weich sind. Nicht zu lange kochen, damit sie knackig bleiben. Mit mehr Parmesan garnieren und heiß servieren.', 
-- 10, 10, 2, 9, 'einfach', CURRENT_DATE, ''),

-- (1, 'Veganer Linsen-Dal', 
-- 'Ein herzhafter und proteinreicher indischer Eintopf aus roten Linsen und Gewürzen. Kochschritte:
-- 1. Zwiebel, Knoblauch und Ingwer fein hacken und in einem Topf mit etwas Kokosöl anbraten.
-- 2. Rote Linsen gründlich waschen und in den Topf geben. Mit Kokosmilch und Wasser aufgießen.
-- 3. Kurkuma, Kreuzkümmel, Koriander und Garam Masala hinzufügen und gut umrühren.
-- 4. Auf mittlerer Hitze köcheln lassen, bis die Linsen weich sind (ca. 20 Minuten). Gelegentlich umrühren, damit nichts anbrennt.
-- 5. Mit Salz, Pfeffer und frischem Koriander abschmecken. Optional: Mit frischem Limettensaft beträufeln und mit Reis oder Naan servieren.', 
-- 15, 25, 4, 2, 'mittel', CURRENT_DATE, ''),
-- (1, 'Keto-Hähnchen-Curry', 
-- 'Ein aromatisches Curry mit zartem Hähnchen, Blumenkohlreis und einer cremigen Kokos-Sauce. Kochschritte:
-- 1. Hähnchenfilet in Würfel schneiden und in einer Pfanne mit etwas Olivenöl anbraten, bis es goldbraun ist.
-- 2. Blumenkohl in einer Küchenmaschine zu reisähnlicher Konsistenz zerkleinern und kurz in einer separaten Pfanne anbraten.
-- 3. Zwiebel, Knoblauch und Ingwer fein hacken und in derselben Pfanne wie das Hähnchen anschwitzen.
-- 4. Kokosmilch, Currypaste, Kurkuma und Kreuzkümmel hinzufügen und gut verrühren.
-- 5. Den Blumenkohlreis und das Hähnchen wieder in die Pfanne geben, alles gut vermischen und mit frischem Koriander garnieren.', 
-- 20, 25, 4, 8, 'mittel', CURRENT_DATE, ''),

-- (1, 'Veganes Pad Thai', 
-- 'Ein klassisches thailändisches Gericht mit Reisnudeln, knackigem Gemüse und einer würzigen Erdnusssauce. Kochschritte:
-- 1. Reisnudeln nach Packungsanweisung kochen und beiseite stellen.
-- 2. Zwiebel, Knoblauch und Paprika in Streifen schneiden und in einer Pfanne mit Sesamöl anbraten.
-- 3. Tofu in kleine Würfel schneiden, in der Pfanne knusprig braten und mit Sojasauce ablöschen.
-- 4. Für die Sauce Erdnussbutter, Limettensaft, Sojasauce, Ahornsirup und etwas Wasser glatt rühren.
-- 5. Die Nudeln und die Sauce in die Pfanne geben, gut vermischen und mit gehackten Erdnüssen, frischem Koriander und Limettenspalten servieren.', 
-- 20, 15, 3, 2, 'mittel', CURRENT_DATE, ''),

-- (1, 'Glutenfreier Schoko-Bananen-Kuchen', 
-- 'Ein saftiger Kuchen aus Mandelmehl und Bananen, verfeinert mit Zartbitterschokolade. Kochschritte:
-- 1. Reife Bananen mit einer Gabel zerdrücken und mit Eiern, Honig und Vanilleextrakt in einer Schüssel verrühren.
-- 2. Mandelmehl, Backpulver und eine Prise Salz hinzufügen und zu einem glatten Teig verrühren.
-- 3. Zartbitterschokolade grob hacken und unter den Teig heben.
-- 4. Eine Backform mit Backpapier auslegen, den Teig hineingeben und glatt streichen.
-- 5. Im vorgeheizten Ofen bei 180 °C ca. 40 Minuten backen. Abkühlen lassen und mit Puderzucker bestreuen.', 
-- 15, 40, 8, 7, 'einfach', CURRENT_DATE, '');



INSERT INTO public.recipe (id, user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES (6, 1, 'Keto Avocado-Hähnchen-Salat', 'Ein cremiger Keto-Salat mit Avocado und gegrilltem Hähnchen. Kochschritte:
1. Das Hähnchen mit Olivenöl, Salz und Pfeffer einreiben und in einer heißen Pfanne goldbraun braten. Anschließend in Streifen schneiden.
2. Eine reife Avocado würfeln und mit etwas Zitronensaft beträufeln, damit sie nicht braun wird.
3. Gurke, Tomaten und Paprika klein schneiden und zusammen mit dem Hähnchen und der Avocado in eine große Schüssel geben.
4. Für das Dressing Olivenöl, Zitronensaft, Senf, Knoblauch und frische Kräuter (z. B. Dill oder Petersilie) verrühren.
5. Alles gut mischen und nach Geschmack mit Salz und Pfeffer abschmecken. Sofort servieren.', 15, 10, 2, 8, 'einfach', '2024-12-15', 'https://res.cloudinary.com/dxneunm1q/image/upload/v1734277117/sdy0hsztt2vq7dmzv4nc.jpg');
INSERT INTO public.recipe (id, user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES (9, 1, 'Keto Zoodles mit cremiger Alfredo-Sauce', 'Zucchininudeln mit einer sahnigen Alfredo-Sauce – perfekt für die Keto-Diät. Kochschritte:
1. Zucchini mit einem Spiralschneider in dünne Nudeln schneiden und beiseite stellen.
2. In einer Pfanne Butter schmelzen und gehackten Knoblauch kurz anbraten, bis er duftet.
3. Frischkäse und Sahne hinzufügen, gut verrühren und mit Salz, Pfeffer und Muskatnuss abschmecken.
4. Den geriebenen Parmesan einrühren, bis eine cremige Sauce entsteht.
5. Die Zoodles in die Sauce geben und vorsichtig umrühren, bis sie leicht weich sind. Nicht zu lange kochen, damit sie knackig bleiben. Mit mehr Parmesan garnieren und heiß servieren.', 10, 10, 2, 9, 'einfach', '2024-12-15', 'https://res.cloudinary.com/dxneunm1q/image/upload/v1734277491/nicf9vbpkz5anc6nndjb.jpg');
INSERT INTO public.recipe (id, user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES (2, 1, 'Hühner-Curry', 'Ein aromatisches indisches Gericht, das zarte Hühnerstücke in einer würzigen Tomaten-Kokosnuss-Sauce vereint. Mit Koriander, Ingwer und Garam Masala verfeinert, wird es traditionell mit Basmatireis serviert.', 20, 40, 4, 2, 'einfach', '2024-12-15', 'https://res.cloudinary.com/dxneunm1q/image/upload/v1734271263/pgroacvidbnv2pii8yqu.jpg');
INSERT INTO public.recipe (id, user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES (1, 1, 'Spaghetti Bolognese', 'Ein Klassiker der italienischen Küche. Diese herzhafte Bolognese-Sauce wird mit gehacktem Rindfleisch, Tomaten, Karotten, Sellerie und einer Prise italienischer Kräuter langsam geköchelt. Perfekt serviert mit Spaghetti und frisch geriebenem Parmesan.', 15, 60, 4, 1, 'mittel', '2024-12-15', 'https://res.cloudinary.com/dxneunm1q/image/upload/v1734271430/kb9gbxeghltuvrpu1mhe.jpg');
INSERT INTO public.recipe (id, user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES (3, 1, 'Thai-Grünes Curry', 'Ein scharfes, cremiges Curry, das mit grüner Currypaste, Kokosmilch, knackigem Gemüse und zartem Huhn oder Tofu zubereitet wird. Dieses Gericht ist reich an Aromen und perfekt für Liebhaber der asiatischen Küche.', 25, 35, 4, 3, 'mittel', '2024-12-15', 'https://res.cloudinary.com/dxneunm1q/image/upload/v1734271512/rlysmjqtvwebz4maksok.jpg');
INSERT INTO public.recipe (id, user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES (5, 1, 'Französische Zwiebelsuppe', 'Eine reichhaltige und wärmende Suppe, die durch langsam karamellisierte Zwiebeln, einen Schuss Weißwein und eine kräftige Brühe besticht. Gekrönt mit knusprigem Baguette und geschmolzenem Käse.', 15, 50, 4, 5, 'mittel', '2024-12-15', 'https://res.cloudinary.com/dxneunm1q/image/upload/v1734271657/qd14ewfkwaxirxppol5z.avif');
INSERT INTO public.recipe (id, user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES (7, 1, 'Low-Carb Blumenkohlreis mit Gemüse', 'Ein gesunder, kohlenhydratarmer Genuss mit Blumenkohlreis und knackigem Gemüse. Kochschritte:
1. Blumenkohl in kleine Röschen teilen und in einem Mixer zu einer reisähnlichen Konsistenz zerkleinern.
2. Zwiebel und Knoblauch hacken und in einer großen Pfanne in Olivenöl anschwitzen, bis sie glasig sind.
3. Paprika, Zucchini und Karotten in kleine Würfel schneiden und zur Zwiebelmischung geben. Etwa 5 Minuten anbraten.
4. Den Blumenkohlreis hinzufügen, gut umrühren und weitere 5 Minuten braten, bis er weich ist.
5. Mit Sojasauce, Salz, Pfeffer und frischen Kräutern abschmecken. Optional: Mit etwas geröstetem Sesam garnieren.', 20, 15, 3, 6, 'einfach', '2024-12-15', 'https://res.cloudinary.com/dxneunm1q/image/upload/v1734277552/m8w7kc5akhl2x39hd8el.jpg');
INSERT INTO public.recipe (id, user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES (8, 1, 'Vegane Buddha Bowl mit Tahini-Dressing', 'Eine nährstoffreiche Schale mit frischem Gemüse, Quinoa und einem cremigen Tahini-Dressing. Kochschritte:
1. Quinoa gründlich waschen und in doppelter Menge Wasser kochen, bis es weich ist (ca. 15 Minuten).
2. Süßkartoffeln in Würfel schneiden, mit Olivenöl und Gewürzen wie Paprikapulver und Kreuzkümmel marinieren und im Ofen bei 200 °C 20 Minuten rösten.
3. Frisches Gemüse wie Gurke, Tomaten, Karotten und Rotkohl fein schneiden oder hobeln.
4. Für das Dressing Tahini, Zitronensaft, Knoblauch und etwas Wasser cremig rühren und mit Salz und Pfeffer abschmecken.
5. Quinoa, Süßkartoffeln und Gemüse in einer Schale anrichten, mit dem Dressing beträufeln und mit frischen Kräutern oder gerösteten Kernen garnieren.', 25, 20, 4, 2, 'mittel', '2024-12-15', 'https://res.cloudinary.com/dxneunm1q/image/upload/v1734277658/hudgnptrwzflrrrdn5ld.jpg');
INSERT INTO public.recipe (id, user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES (4, 1, 'Vegetarische Lasagne', 'Eine köstliche Lasagne mit geschichteten Schichten aus cremiger Bechamelsauce, frischen Zucchini, Auberginen und einer herzhaften Tomatensauce. Dieses Gericht ist eine gesunde Alternative zur klassischen Lasagne.', 30, 45, 6, 7, 'schwer', '2024-12-15', 'https://res.cloudinary.com/dxneunm1q/image/upload/v1734277733/uu7kjnxqqm7uo2cs1b6i.jpg');
INSERT INTO public.recipe (id, user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES (13, 1, 'Glutenfreier Schoko-Bananen-Kuchen', 'Ein saftiger Kuchen aus Mandelmehl und Bananen, verfeinert mit Zartbitterschokolade. Kochschritte:
1. Reife Bananen mit einer Gabel zerdrücken und mit Eiern, Honig und Vanilleextrakt in einer Schüssel verrühren.
2. Mandelmehl, Backpulver und eine Prise Salz hinzufügen und zu einem glatten Teig verrühren.
3. Zartbitterschokolade grob hacken und unter den Teig heben.
4. Eine Backform mit Backpapier auslegen, den Teig hineingeben und glatt streichen.
5. Im vorgeheizten Ofen bei 180 °C ca. 40 Minuten backen. Abkühlen lassen und mit Puderzucker bestreuen.', 15, 40, 8, 7, 'einfach', '2024-12-15', 'https://res.cloudinary.com/dxneunm1q/image/upload/v1734276917/cvk3brbe4pmqybxp7atv.webp');
INSERT INTO public.recipe (id, user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES (10, 1, 'Veganer Linsen-Dal', 'Ein herzhafter und proteinreicher indischer Eintopf aus roten Linsen und Gewürzen. Kochschritte:
1. Zwiebel, Knoblauch und Ingwer fein hacken und in einem Topf mit etwas Kokosöl anbraten.
2. Rote Linsen gründlich waschen und in den Topf geben. Mit Kokosmilch und Wasser aufgießen.
3. Kurkuma, Kreuzkümmel, Koriander und Garam Masala hinzufügen und gut umrühren.
4. Auf mittlerer Hitze köcheln lassen, bis die Linsen weich sind (ca. 20 Minuten). Gelegentlich umrühren, damit nichts anbrennt.
5. Mit Salz, Pfeffer und frischem Koriander abschmecken. Optional: Mit frischem Limettensaft beträufeln und mit Reis oder Naan servieren.', 15, 25, 4, 2, 'mittel', '2024-12-15', 'https://res.cloudinary.com/dxneunm1q/image/upload/v1734277450/mwiegwawro05hydiu4r1.webp');
INSERT INTO public.recipe (id, user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES (12, 1, 'Veganes Pad Thai', 'Ein klassisches thailändisches Gericht mit Reisnudeln, knackigem Gemüse und einer würzigen Erdnusssauce. Kochschritte:
1. Reisnudeln nach Packungsanweisung kochen und beiseite stellen.
2. Zwiebel, Knoblauch und Paprika in Streifen schneiden und in einer Pfanne mit Sesamöl anbraten.
3. Tofu in kleine Würfel schneiden, in der Pfanne knusprig braten und mit Sojasauce ablöschen.
4. Für die Sauce Erdnussbutter, Limettensaft, Sojasauce, Ahornsirup und etwas Wasser glatt rühren.
5. Die Nudeln und die Sauce in die Pfanne geben, gut vermischen und mit gehackten Erdnüssen, frischem Koriander und Limettenspalten servieren.', 20, 15, 3, 2, 'mittel', '2024-12-15', 'https://res.cloudinary.com/dxneunm1q/image/upload/v1734277338/xo3zbjokmqwkpyt0l5uw.jpg');
INSERT INTO public.recipe (id, user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES (11, 1, 'Keto-Hähnchen-Curry', 'Ein aromatisches Curry mit zartem Hähnchen, Blumenkohlreis und einer cremigen Kokos-Sauce. Kochschritte:
1. Hähnchenfilet in Würfel schneiden und in einer Pfanne mit etwas Olivenöl anbraten, bis es goldbraun ist.
2. Blumenkohl in einer Küchenmaschine zu reisähnlicher Konsistenz zerkleinern und kurz in einer separaten Pfanne anbraten.
3. Zwiebel, Knoblauch und Ingwer fein hacken und in derselben Pfanne wie das Hähnchen anschwitzen.
4. Kokosmilch, Currypaste, Kurkuma und Kreuzkümmel hinzufügen und gut verrühren.
5. Den Blumenkohlreis und das Hähnchen wieder in die Pfanne geben, alles gut vermischen und mit frischem Koriander garnieren.', 20, 25, 4, 8, 'mittel', '2024-12-15', 'https://res.cloudinary.com/dxneunm1q/image/upload/v1734277385/qaxhtyaexjsl1beketfl.jpg');
INSERT INTO public.recipe (id, user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image) VALUES (14, 1, 'Veganer Kuchen mit Sojamilch', '1. Heizen Sie den Backofen auf 180 °C vor.\n\n2. Mischen Sie in einer großen Schüssel 250 g Mehl, 100 g Zucker, 1 TL Backpulver und 1 TL Natron.\n\n3. Fügen Sie 200 ml Sojamilch, 80 ml Sonnenblumenöl und 1 TL Vanilleextrakt hinzu. Rühren Sie alles zu einem glatten Teig.\n\n4. Geben Sie den Teig in eine gefettete oder mit Backpapier ausgelegte Kuchenform.\n\n5. Backen Sie den Kuchen für 30-35 Minuten oder bis ein Zahnstocher sauber herauskommt.\n\n6. Lassen Sie den Kuchen abkühlen und genießen Sie ihn pur oder mit veganem Topping.', 15, 35, 8, 2, 'einfach', '2024-12-16', 'https://res.cloudinary.com/dxneunm1q/image/upload/v1734305940/cpeef6ur1y5kag9railt.jpg');





CREATE TABLE  recipe_diet_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    daily_calories INT,
    daily_fats FLOAT,
    daily_carbohydrates FLOAT,
    daily_protein FLOAT
);
INSERT INTO recipe_diet_type (name, daily_calories, daily_fats, daily_carbohydrates, daily_protein) VALUES
    ('Vegan', 2000, 70, 250, 50),
    ('Vegetarisch', 2200, 80, 270, 60),
    ('Glutenfrei', 2000, 75, 230, 55),
    ('Keto', 1800, 150, 50, 70),
    ('paleo', 2100, 100, 150, 80),
    ('low-carb', 1900, 80, 100, 75),
    ('pescatarian', 2000, 70, 250, 60),
    ('dairy-free', 2000, 70, 250, 50),
    ('Fleisch', 2200, 90, 260, 70),
    ('Fisch', 2100, 85, 240, 65)
;

CREATE TABLE recipe_diet (
    recipe_id INT REFERENCES recipe(id) ,
    diet_type_id INT REFERENCES recipe_diet_type(id) ,
    PRIMARY KEY (recipe_id, diet_type_id)
);
INSERT INTO recipe_diet (recipe_id, diet_type_id) VALUES
(1, 9), 
(2, 6), 
(3, 7), 
(4, 2), 
(5, 2),
(6, 9), 
(7, 6),
(8, 7), 
(9, 2), 
(10, 2),
(11, 4),
(12, 1), 
(12, 3), 
(13, 3), 
(13, 1); CREATE TABLE recipe_feedback (
   id SERIAL PRIMARY KEY,
   user_id INT REFERENCES recipe_user(id) ,
   recipe_id INT REFERENCES recipe(id) ,
   rating FLOAT ,  
   comments TEXT
);

CREATE TABLE recipe_ingredient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    calories FLOAT,
    protein FLOAT,
    carbohydrates FLOAT,
    fats FLOAT,
    allergene_id INT REFERENCES recipe_allergene(id)

);

INSERT INTO recipe_ingredient (name, calories, protein, carbohydrates, fats, allergene_id
) VALUES
    ('Tomate', 18, 0.9, 3.9, 0.2, 1),
    ('Gurke', 16, 0.7, 3.6, 0.1, NULL),
    ('Kartoffel', 77, 2.0, 17.0, 0.1, 1),
    ('Milch', 42, 3.4, 4.8, 1.0, 2),
    ('Erdnuss', 567, 25.8, 16.1, 49.2, 3),
    ('Mandeln', 579, 21.2, 21.6, 49.9, 3),
    ('Lachs', 208, 20.4, 0.0, 13.6, 4),
    ('Ei', 155, 13.0, 1.1, 11.0, 5),
    ('Weizenbrot', 265, 9.0, 49.0, 3.2, 6),
    ('Sojabohne', 446, 36.5, 30.2, 19.9, 7),
    ('Paprika', 31, 1.0, 6.0, 0.3, 1),
    ('Aubergine', 25, 1.0, 5.9, 0.2, 1),
    ('Mozzarella', 280, 22.0, 2.2, 22.4, 2),
    ('Joghurt', 59, 10.0, 3.6, 0.4, 2),
    ('Reis', 130, 2.4, 28.0, 0.3, NULL),
    ('Huhn', 239, 27.3, 0.0, 13.6, NULL),
    ('Schweinefleisch', 242, 27.0, 0.0, 14.0, NULL),
    ('Rindfleisch', 250, 26.0, 0.0, 15.0, NULL),
    ('Thunfisch', 144, 23.3, 0.0, 4.9,4),
    ('Shrimp', 85, 20.0, 0.0, 0.5, 4),
    ('Brokkoli', 55, 3.7, 11.1, 0.6, NULL),
    ('Karotte', 41, 0.9, 9.6, 0.2, NULL),
    ('Apfel', 52, 0.3, 14.0, 0.2, NULL),
    ('Banane', 89, 1.1, 23.0, 0.3, NULL),
    ('Orange', 47, 0.9, 12.0, 0.1, NULL),
    ('Ananas', 50, 0.5, 13.1, 0.1, NULL),
    ('Mango', 60, 0.8, 15.0, 0.4, NULL),
    ('Erdbeere', 32, 0.7, 7.7, 0.3, NULL),
    ('Blaubeere', 57, 0.7, 14.5, 0.3, NULL),
    ('Himbeere', 52, 1.2, 12.0, 0.7, NULL),
    ('Avocado', 160, 2.0, 9.0, 15.0, NULL),
    ('Spinat', 23, 2.9, 3.6, 0.4, NULL),
    ('Grünkohl', 49, 4.3, 8.8, 0.9, NULL),
    ('Zucchini', 17, 1.2, 3.1, 0.3, NULL),
    ('Kürbis', 26, 1.0, 6.5, 0.1, NULL),
    ('Honig', 304, 0.3, 82.4, 0.0, 8),
    ('Haferflocken', 389, 16.9, 66.3, 6.9, 6),
    ('Quinoa', 120, 4.1, 21.3, 1.9, NULL),
    ('Chiasamen', 486, 16.5, 42.1, 30.7, NULL),
    ('Leinsamen', 534, 18.3, 28.9, 42.2, NULL),
    ('Kürbiskerne', 559, 30.2, 10.7, 49.1, 3),
    ('Cashew', 553, 18.2, 30.2, 43.8, 3),
    ('Walnuss', 654, 15.0, 14.0, 65.2, 3),
    ('Bohnen', 347, 21.0, 63.0, 1.2, 7),
    ('Linsen', 352, 24.6, 63.4, 1.1, 7),
    ('Kidneybohnen', 333, 23.6, 60.0, 0.8, 7),
    ('Kichererbsen', 364, 19.3, 61.0, 6.0, 7),
    ('Süßkartoffel', 86, 1.6, 20.1, 0.1, NULL),
    ('Tofu', 76, 8.1, 1.9, 4.8, 7),
    ('Tempeh', 192, 20.3, 7.6, 10.8, 7),
    ('Olivenöl', 884, 0.0, 0.0, 100.0, NULL),
    ('Butter', 717, 0.9, 0.1, 81.1, 2),
    ('Käse', 402, 25.0, 1.3, 33.1, 2),
    ('Hüttenkäse', 98, 11.1, 3.4, 4.3, 2),
    ('Parmesan', 431, 38.0, 4.1, 29.4, 2),
    ('Schokolade', 546, 4.9, 61.0, 31.0, NULL),
    ('Mandarinen', 53, 0.8, 13.3, 0.3, NULL),
    ('Birne', 57, 0.4, 15.0, 0.1, NULL),
    ('Pfirsich', 39, 0.9, 9.5, 0.3, NULL),
    ('Granatapfel', 83, 1.7, 18.7, 1.2, NULL),
    ('Kokosnuss', 354, 3.3, 15.2, 33.5, NULL),
    ('Aprikose', 48, 1.4, 11.1, 0.4, NULL),
    ('Zitrone', 29, 1.1, 9.3, 0.3, NULL),
    ('Kaffee', 1, 0.1, 0.0, 0.0, NULL),
    ('Tee', 1, 0.0, 0.0, 0.0, NULL),
    ('Rote Beete', 43, 1.6, 9.6, 0.2, NULL),
    ('Pilze', 22, 3.1, 3.3, 0.3, NULL),
    ('Basilikum', 23, 3.2, 2.7, 0.6, NULL),
    ('Thymian', 101, 5.6, 24.5, 1.7, NULL),
    ('Rosmarin', 131, 3.3, 20.7, 5.9, NULL),
    ('Oregano', 265, 9.0, 68.9, 4.3, NULL),
    ('Petersilie', 36, 3.0, 6.3, 0.8, NULL),
    ('Minze', 44, 3.3, 8.4, 0.6, NULL),
    ('Koriander', 23, 2.1, 3.7, 0.5, NULL),
    ('Ingwer', 80, 1.8, 17.8, 0.8, NULL),
    ('Knoblauch', 149, 6.4, 33.1, 0.5, NULL),
    ('Zwiebel', 40, 1.1, 9.3, 0.1, NULL),
    ('Sellerie', 16, 0.7, 3.5, 0.2, NULL),
    ('Fenchel', 31, 1.2, 7.3, 0.2, NULL),
    ('Chili', 40, 1.9, 8.8, 0.4, 1),
    ('Rucola', 25, 2.6, 3.7, 0.7, NULL),
    ('Pak Choi', 13, 1.5, 2.2, 0.2, NULL),
    ('Grüne Bohnen', 31, 1.8, 7.1, 0.1, 7),
    ('Edamame', 121, 11.9, 8.9, 5.2, 7),
    ('Artischocke', 47, 3.3, 10.5, 0.2, NULL),
    ('Kohl', 25, 1.3, 5.8, 0.1, NULL),
    ('Rotkohl', 31, 1.4, 7.4, 0.2, NULL),
    ('Blumenkohl', 25, 1.9, 4.9, 0.3, NULL),
    ('Mais', 86, 3.3, 19.0, 1.2, NULL),
    ('Weißkohl', 25, 1.3, 5.8, 0.1, NULL),
    ('Rosenkohl', 43, 3.4, 8.9, 0.3, NULL),
    ('Lauch', 61, 1.5, 14.2, 0.3, NULL),
    ('Zucker', 387, 0.0, 100.0, 0.0, NULL),
    ('Salz', 0, 0.0, 0.0, 0.0, NULL),
    ('Essig', 21, 0.0, 0.9, 0.0, NULL),
    ('Sojasauce', 53, 5.0, 4.9, 0.0, 7),
    ('Ketchup', 112, 1.0, 25.8, 0.2, 1),
    ('Mayonnaise', 680, 1.0, 0.6, 75.0, NULL),
    ('Pistazien', 562, 20.0, 27.2, 45.3, 3),
    ('Macadamianüsse', 718, 7.9, 13.8, 75.8, 3),
    ('Sonnenblumenkerne', 584, 20.8, 20.0, 51.5, NULL),
    ('Dinkelmehl', 333, 14.6, 70.2, 2.4, 6),
    ('Roggenmehl', 335, 9.0, 73.0, 1.7, 6),
    ('Vollkornbrot', 250, 9.0, 43.0, 4.0, 6),
    ('Magerquark', 67, 12.0, 4.0, 0.2, 2),
    ('Sahne', 337, 2.1, 3.2, 35.0, 2),
    ('Schweizer Käse', 380, 25.0, 1.4, 29.0, 2),
    ('Hirse', 119, 3.5, 23.7, 1.0, NULL),
    ('Kokosöl', 862, 0.0, 0.0, 100.0, NULL),
    ('Pekannüsse', 691, 9.2, 13.9, 72.0, 3),
    ('Haselnüsse', 628, 15.0, 16.7, 60.8, 3),
    ('Rindersteak', 271, 26.1, 0.0, 19.0, NULL),
    ('Ente', 337, 18.3, 0.0, 28.4, NULL),
    ('Hähnchenbrust', 165, 31.0, 0.0, 3.6, NULL),
    ('Lamm', 294, 25.6, 0.0, 21.3, NULL),
    ('Wildreis', 101, 4.0, 21.0, 0.3, NULL),
    ('Hummer', 77, 16.5, 0.0, 0.9, 4),
    ('Kabeljau', 82, 18.0, 0.0, 0.7, 4),
    ('Austern', 68, 7.0, 4.0, 2.0, 4),
    ('Calamari', 92, 15.6, 3.1, 1.4, 4),
    ('Linsennudeln', 352, 24.0, 53.0, 1.5, 7),
    ('Kichererbsenmehl', 387, 22.0, 58.0, 6.7, 7),
    ('Mandeldrink', 13, 0.4, 0.3, 1.2, 3),
    ('Cashewmilch', 25, 0.9, 1.5, 2.0, 3),
    ('Hafermilch', 47, 1.0, 8.0, 1.5, 6),
    ('Kokosmilch', 230, 2.3, 5.5, 23.8, NULL),
    ('Reismilch', 47, 0.3, 10.0, 1.0, NULL),
    ('Sesam', 573, 17.0, 23.0, 49.7, 3),
    ('Senf', 66, 4.4, 5.8, 3.6, 7),
    ('Mandelmus', 614, 21.1, 19.6, 55.0, 3),
    ('Gerste', 354, 12.5, 73.5, 2.3, NULL),
    ('Mangold', 22, 2.2, 4.3, 0.2, NULL),
    ('Schwarze Bohnen', 341, 21.6, 62.4, 1.0, 7),
    ('Brauner Zucker', 387, 0.0, 100.0, 0.0, NULL),
    ('Rotkohl', 31, 1.4, 7.4, 0.2, NULL),
    ('Thunfisch aus der Dose', 116, 25.0, 0.0, 0.5, 4),
    ('Mangoldblätter', 19, 1.8, 3.7, 0.2, NULL),
    ('Maismehl', 361, 6.9, 78.9, 3.2, NULL),
    ('Couscous', 376, 12.8, 77.4, 0.6, NULL),
    ('Entenfleisch', 337, 19.0, 0.0, 28.5, NULL),
    ('Aubergine', 24, 1.0, 6.0, 0.2, NULL),
    ('Kondensmilch', 135, 6.8, 10.5, 7.5, 2),
    ('Fladenbrot', 262, 8.5, 51.6, 2.2, 6),
    ('Leinöl', 884, 0.0, 0.0, 100.0, 3),
    ('Tiefkühlerbsen', 80, 5.0, 13.0, 0.4, NULL),
    ('Kichererbsen', 364, 19.3, 61.0, 6.0, 7),
    ('Glutenfreies Brot', 250, 4.5, 48.0, 3.0, 6),
    ('Reismehl', 366, 6.0, 80.0, 0.9, NULL),
    ('Grüner Spargel', 20, 2.2, 3.8, 0.1, NULL),
    ('Haselnussöl', 884, 0.0, 0.0, 100.0, 3),
    ('Dinkelvollkornmehl', 340, 12.0, 72.0, 2.6, 6),
    ('Sonnenblumenöl', 884, 0.0, 0.0, 100.0, NULL),
    ('Ziegenkäse', 364, 21.0, 0.8, 30.0, 2),
    ('Ahornsirup', 260, 0.0, 67.0, 0.0, NULL),
    ('Tofu geräuchert', 150, 15.0, 3.0, 8.0, 7),
    ('Seitan', 120, 24.0, 4.0, 1.0, NULL),
    ('Gelbe Paprika', 27, 1.0, 6.0, 0.2, 1),
    ('Schafskäse', 264, 14.0, 4.0, 21.0, 2),
    ('Kokoszucker', 375, 0.0, 100.0, 0.0, NULL),
    ('Weizengrieß', 340, 11.0, 72.0, 1.0, 6),
    ('Frühlingszwiebel', 32, 1.8, 7.2, 0.1, NULL),
    ('Rote Linsen', 354, 25.0, 63.0, 1.5, 7),
    ('Grüne Linsen', 340, 24.0, 60.0, 1.2, 7),
    ('Ziegenmilch', 64, 3.5, 4.5, 3.7, 2),
    ('Rosenwasser', 18, 0.0, 4.5, 0.0, NULL),
    ('Gelatine', 62, 15.0, 0.0, 0.0, NULL),
    ('Cashewmus', 553, 18.0, 30.0, 43.8, 3),
    ('Kokosmehl', 320, 20.0, 60.0, 8.0, NULL),
    ('Reissirup', 310, 0.0, 78.0, 0.0, NULL),
    ('Chiliöl', 884, 0.0, 0.0, 100.0, 1),
    ('Kürbismus', 26, 1.0, 6.0, 0.1, NULL),
    ('Granola', 450, 10.0, 70.0, 15.0, 6),
    ('Zartbitterschokolade', 560, 5.0, 45.0, 40.0, NULL),
    ('Vegane Butter', 700, 1.0, 0.0, 78.0, NULL),
    ('Rucolaöl', 884, 0.0, 0.0, 100.0, NULL),
    ('Aprikosenkernöl', 884, 0.0, 0.0, 100.0, NULL),
    ('Erdmandeln', 450, 23.0, 60.0, 10.0, NULL),
    ('Vanilleextrakt', 288, 0.1, 7.0, 0.1, NULL),
    ('Tahin', 595, 20.0, 20.0, 53.0, 3),
    ('Kakaonibs', 520, 13.0, 30.0, 40.0, NULL),
    ('Leindotteröl', 884, 0.0, 0.0, 100.0, NULL),
    ('Kichererbsen-Cracker', 380, 12.0, 65.0, 8.0, 7),
    ('Matcha', 20, 2.0, 3.0, 0.5, NULL),
    ('Kokosdrink', 25, 0.5, 3.0, 1.0, NULL),
    ('Weizenkeime', 360, 23.0, 51.0, 10.0, 6),
    ('Mandel-Croissant', 450, 10.0, 50.0, 25.0, 3),
    ('Fenchelsamen', 340, 20.0, 52.0, 15.0, NULL),
    ('Safran', 310, 11.0, 60.0, 5.0, NULL),
    ('Tomatenmark', 85, 3.0, 18.0, 0.5, 1),
    ('Gerösteter Sesam', 580, 20.0, 23.0, 49.0, 3),
    ('Misopaste', 200, 10.0, 25.0, 6.0, 7),
    ('Räucherlachs', 208, 20.0, 0.0, 14.0, 4),
    ('Tofu Natur', 120, 12.0, 2.0, 6.0, 7),
    ('Kokosjoghurt', 110, 2.0, 8.0, 7.0, NULL),
    ('Schwarzer Reis', 360, 9.0, 75.0, 2.5, NULL),
    ('Grüne Erbsen', 80, 5.0, 13.0, 0.4, NULL),
    ('Feigen', 74, 1.0, 19.0, 0.3, NULL),
        ('Feigen', 74, 1.0, 19.0, 0.3, NULL),

    ('Walnussöl', 884, 0.0, 0.0, 100.0, 3),

    ('Weiße Bohnen', 333, 21.0, 60.0, 1.5, 7),
    ('Kokosraspeln', 360, 3.3, 15.0, 33.0, NULL),
    ('Haferkekse', 450, 8.0, 65.0, 15.0, 6),
    ('Reisnudeln', 360, 5.0, 80.0, 1.0, NULL),
    ('Dinkelcracker', 350, 10.0, 70.0, 5.0, 6),
    ('Quark', 72, 8.0, 3.0, 4.0, 2),
    ('Mozzarella gerieben', 280, 22.0, 2.0, 20.0, 2),
    ('Frischkäse', 250, 6.0, 3.0, 22.0, 2),
    ('Linsenmehl', 350, 24.0, 60.0, 2.0, 7),
    ('Kichererbsenpüree', 160, 8.0, 20.0, 5.0, 7),
    ('Veganes Hackfleisch', 200, 20.0, 5.0, 10.0, NULL),
    ('Pflanzenmargarine', 720, 0.5, 0.0, 80.0, NULL),
    ('Gemahlene Mandeln', 580, 20.0, 10.0, 50.0, 3),
    ('Erdnussbutter', 588, 25.0, 15.0, 50.0, 3),
    ('Cranberries getrocknet', 325, 1.0, 82.0, 1.0, NULL),
    ('Goji-Beeren', 349, 14.0, 64.0, 1.0, NULL),
    ('Chia-Pudding', 150, 5.0, 10.0, 8.0, NULL),
    ('Kokoswasser', 19, 0.2, 4.0, 0.2, NULL),
    ('Apfelmus', 50, 0.2, 12.0, 0.2, NULL),
    ('Vollkornnudeln', 350, 12.0, 65.0, 2.0, 6),
    ('Amaranth', 370, 14.0, 60.0, 7.0, NULL),
    ('Hanfprotein', 375, 50.0, 7.0, 10.0, NULL),
    ('Sojajoghurt', 55, 4.0, 3.0, 2.0, 7),
    ('Süßlupinenmehl', 320, 39.0, 9.0, 10.0, 7),
    ('Cashewkerne', 553, 18.0, 30.0, 44.0, 3),
    ('Edamame (gekocht)', 120, 11.0, 9.0, 5.0, 7),
    ('Tiefkühlspinat', 30, 2.5, 2.0, 0.3, NULL),
    ('Karottensaft', 40, 1.0, 8.0, 0.1, NULL),
    ('Zwiebelpulver', 340, 10.0, 70.0, 1.0, NULL),
    ('Knoblauchpulver', 330, 17.0, 72.0, 0.5, NULL),
    ('Ghee', 900, 0.1, 0.0, 99.5, NULL),
    ('Tapiokamehl', 360, 0.2, 88.0, 0.2, NULL),
    ('Reisflocken', 350, 7.0, 78.0, 1.0, NULL),
    ('Seetang', 30, 5.0, 8.0, 0.3, NULL),
    ('Himbeermarmelade', 240, 1.0, 60.0, 0.1, NULL),
    ('Brombeeren', 43, 1.0, 10.0, 0.5, NULL),
    ('Pflaumen getrocknet', 240, 2.0, 64.0, 0.5, NULL),
    ('Ahornzucker', 380, 0.0, 95.0, 0.0, NULL),
    ('Limettensaft', 25, 0.5, 10.0, 0.1, NULL),
    ('Sojasauce light', 45, 5.0, 3.0, 0.1, 7),
    ('Vollkornreis', 360, 7.0, 77.0, 2.2, NULL),
    ('Dattelsirup', 320, 1.0, 75.0, 0.5, NULL),
    ('Zucchini geraspelt', 20, 1.0, 3.0, 0.1, NULL),
    ('Quinoa gepufft', 370, 13.0, 68.0, 6.0, NULL),
    ('Pastinaken', 75, 1.0, 18.0, 0.2, NULL),
    ('Grünkohlchips', 400, 12.0, 40.0, 25.0, NULL),
    ('Schokoladenstreusel', 500, 5.0, 65.0, 25.0, NULL),
    ('Dinkelspaghetti', 345, 12.0, 68.0, 2.5, 6),
    ('Reismilch ungesüßt', 45, 0.3, 10.0, 1.0, NULL),
    ('Cashewdrink', 25, 1.0, 2.0, 1.5, 3),
    ('Buchweizenmehl', 343, 13.0, 72.0, 3.4, NULL),
    ('Kokoschips', 600, 7.0, 6.0, 58.0, NULL),
    ('Leinsamenöl', 884, 0.0, 0.0, 100.0, NULL),
    ('Granatapfelsaft', 60, 1.0, 15.0, 0.1, NULL),
    ('Karottenwürfel', 35, 1.0, 8.0, 0.2, NULL),
    ('Rote Beete Saft', 50, 1.0, 12.0, 0.1, NULL),
    ('Apfelringe getrocknet', 350, 2.0, 80.0, 0.5, NULL),
    ('Dinkelcrunchy', 450, 10.0, 65.0, 15.0, 6),
    ('Vegane Schlagsahne', 200, 1.0, 5.0, 15.0, NULL),
    ('Hafercuisine', 120, 0.5, 10.0, 8.0, 6),
    ('Sojadrink Vanille', 45, 3.0, 5.0, 1.5, 7),
    ('Dinkeldrink', 40, 0.5, 8.0, 1.0, 6),
    ('Veganer Mozzarella', 250, 3.0, 20.0, 18.0, NULL),
    ('Kokosblütenzucker', 380, 0.0, 90.0, 0.1, NULL),
    ('Vegane Schokolade', 500, 5.0, 50.0, 35.0, NULL),
    ('Jackfruit', 75, 1.0, 18.0, 0.3, NULL),
    ('Haferporridge', 350, 8.0, 60.0, 8.0, 6),
    ('Glutenfreie Haferflocken', 380, 12.0, 67.0, 7.0, NULL),
    ('Kichererbsencracker', 360, 9.0, 60.0, 5.0, 7),
    ('Getrocknete Aprikosen', 270, 2.0, 63.0, 0.5, NULL),
    ('Buchweizengrütze', 343, 13.0, 72.0, 3.4, NULL),
    ('Polenta', 358, 8.0, 78.0, 1.2, NULL),
    ('Reisprotein', 400, 80.0, 5.0, 2.0, NULL),
    ('Kakaopulver', 228, 20.0, 58.0, 13.0, NULL),
    ('Frischkäse Natur', 250, 8.0, 4.0, 22.0, 2),
    ('Edamer', 350, 25.0, 1.5, 28.0, 2),
    ('Camembert', 300, 20.0, 0.5, 24.0, 2),
    ('Schnittlauch', 30, 3.3, 4.0, 0.5, NULL),
    ('Kerbel', 23, 3.2, 2.1, 0.6, NULL),
    ('Rosenkohl (gekocht)', 36, 3.0, 8.0, 0.5, NULL),
    ('Möhrenpüree', 40, 0.5, 9.0, 0.2, NULL),
    ('Kefir', 60, 3.5, 4.5, 3.0, 2),
    ('Birchermüsli', 380, 10.0, 65.0, 8.0, 6),
    ('Haferriegel', 400, 6.0, 70.0, 10.0, 6),
    ('Kokoscreme', 330, 3.0, 8.0, 35.0, NULL),
    ('Pfeilwurzelmehl', 340, 0.3, 84.0, 0.1, NULL),
    ('Tamarinde', 239, 2.8, 62.5, 0.6, NULL),
    ('Okraschoten', 33, 2.0, 7.0, 0.2, NULL),
    ('Pastinakenchips', 450, 4.0, 50.0, 30.0, NULL),
    ('Röstzwiebeln', 400, 5.0, 40.0, 25.0, NULL),
    ('Johannisbeeren', 56, 1.3, 14.0, 0.3, NULL),
    ('Gojisaft', 60, 2.0, 12.0, 0.5, NULL),
    ('Dinkelgrieß', 360, 12.0, 72.0, 2.0, 6),
    ('Kürbiskernöl', 884, 0.0, 0.0, 100.0, 3),
    ('Aprikosensaft', 45, 1.0, 10.0, 0.2, NULL),
    ('Datteln (getrocknet)', 300, 2.0, 75.0, 0.5, NULL),
    ('Kohlrabiblätter', 25, 2.0, 4.0, 0.3, NULL),
    ('Kaktusfeige', 50, 0.7, 13.0, 0.2, NULL),
    ('Mangopüree', 60, 0.8, 15.0, 0.2, NULL),
    ('Papayastücke', 55, 1.0, 14.0, 0.2, NULL),
    ('Pfirsichkompott', 70, 0.5, 17.0, 0.1, NULL),
    ('Karamellsauce', 310, 1.0, 75.0, 2.0, NULL),
    ('Grießbrei', 110, 3.0, 18.0, 3.0, 6),
    ('Vanillepudding', 105, 3.0, 17.0, 2.0, 6),
    ('Schlagsahne', 337, 2.0, 3.0, 36.0, 2),
    ('Ziegenmilchjoghurt', 60, 3.0, 4.0, 3.0, 2),
    ('Hafermilch Barista', 48, 1.0, 7.0, 2.0, 6),
    ('Dinkelsauerteig', 250, 9.0, 47.0, 2.0, 6),
    ('Sojaprotein', 380, 80.0, 4.0, 2.0, 7),
    ('Maisgrieß', 360, 7.0, 79.0, 1.0, NULL),
    ('Grüne Paprika', 28, 1.0, 5.0, 0.3, 1),
    ('Rote Paprika', 31, 1.0, 6.0, 0.2, 1),
    ('Gelatineblätter', 355, 87.0, 0.0, 0.0, NULL),
    ('Malzextrakt', 360, 6.0, 82.0, 1.0, NULL),
    ('Kakaobutter', 884, 0.0, 0.0, 100.0, NULL),
    ('Veganes Vanilleeis', 190, 2.0, 28.0, 7.0, NULL),
    ('Erdbeerkompott', 100, 0.7, 25.0, 0.1, NULL),
    ('Rote Grütze', 90, 0.7, 22.0, 0.1, NULL),
    ('Matcha Latte Pulver', 400, 8.0, 85.0, 2.0, NULL),
    ('Chili Paste', 40, 1.0, 10.0, 0.5, 1),
    ('Tahin Sesampaste', 595, 18.0, 21.0, 54.0, 3),
    ('Kokosdrink Natur', 20, 0.5, 3.0, 0.5, NULL),
    ('Couscous Vollkorn', 355, 12.0, 64.0, 2.0, NULL),
    ('Geröstete Mandeln', 590, 21.0, 8.0, 50.0, 3),
    ('Sonnenblumenkerne geröstet', 590, 20.0, 18.0, 51.0, NULL),
    ('Tiefkühlhimbeeren', 40, 1.0, 9.0, 0.3, NULL),
    ('Tiefkühlblaubeeren', 45, 0.7, 10.0, 0.3, NULL),
    ('Käsewürfel', 350, 25.0, 2.0, 28.0, 2),
    ('Mandelkäse', 250, 8.0, 3.0, 22.0, 3),
    ('Vegane Bolognese', 180, 9.0, 10.0, 10.0, NULL),
    ('Jackfruit Stücke', 75, 1.0, 17.0, 0.2, NULL),
    ('Wassermelone', 30, 0.5, 7.0, 0.2, NULL),
    ('Pistazien geröstet', 560, 20.0, 27.0, 45.0, 3),
    ('Macadamianüsse geröstet', 700, 8.0, 14.0, 75.0, 3),
    ('Walnüsse gehackt', 654, 15.0, 14.0, 65.0, 3),
    ('Süßkartoffelpüree', 85, 2.0, 20.0, 0.2, NULL),
    ('Dattelpaste', 280, 2.0, 72.0, 0.5, NULL),
    ('Karottensticks', 35, 1.0, 8.0, 0.2, NULL),
    ('Gemüsebrühe Pulver', 250, 10.0, 40.0, 5.0, NULL),
    ('Salzstangen', 400, 10.0, 70.0, 5.0, 6),
    ('Veganes Würstchen', 200, 15.0, 5.0, 10.0, NULL),
    ('Roggencrunchy', 380, 12.0, 65.0, 5.0, 6),
    ('Vegane Mayo', 350, 0.5, 5.0, 35.0, NULL),
    ('Chilisauce', 50, 0.5, 12.0, 0.1, 1),
    ('Kokosjoghurt Natur', 100, 1.0, 8.0, 7.0, NULL),
    ('Getrocknete Cranberries', 325, 1.0, 75.0, 1.0, NULL),
    ('Leinsamen geschrotet', 534, 18.0, 30.0, 42.0, NULL),
    ('Quark 20%', 70, 12.0, 4.0, 0.5, 2),
    ('Hüttenkäse 1%', 100, 11.0, 3.5, 4.0, 2),
    ('Kichererbsennudeln', 350, 21.0, 50.0, 5.0, 7),
    ('Linsensuppe', 120, 6.0, 18.0, 2.0, NULL),
    ('Feldsalat', 14, 1.8, 2.0, 0.2, NULL),
    ('Ruccola', 25, 2.6, 3.7, 0.7, NULL),
    ('Eisbergsalat', 14, 1.0, 2.0, 0.1, NULL),
    ('Gouda Käse', 356, 24.0, 2.0, 28.0, 2),
    ('Parmesan gerieben', 431, 38.0, 4.0, 29.0, 2),
    ('Sonnenblumenöl kaltgepresst', 884, 0.0, 0.0, 100.0, NULL),
    ('Leinsamen ganz', 534, 18.0, 29.0, 42.0, NULL),
    ('Bulgur', 342, 12.0, 76.0, 1.5, 6),
    ('Hirsemehl', 360, 10.0, 75.0, 2.0, NULL),
    ('Reismehl weiß', 366, 6.0, 80.0, 0.5, NULL),
    ('Kokosmehl Bio', 360, 20.0, 60.0, 10.0, NULL),
    ('Hanfsamen', 580, 20.0, 15.0, 45.0, NULL),
    ('Kürbiskernmehl', 400, 65.0, 10.0, 10.0, 3),
    ('Cashewmus ohne Zucker', 553, 18.0, 30.0, 45.0, 3),
    ('Mandelmehl', 400, 20.0, 10.0, 40.0, 3),
    ('Macadamianussmus', 718, 8.0, 15.0, 75.0, 3),
    ('Blütenhonig', 300, 0.5, 75.0, 0.1, 8),
    ('Akazienhonig', 300, 0.0, 75.0, 0.1, 8),
    ('Erdnussöl', 884, 0.0, 0.0, 100.0, 3),
    ('Apfelessig', 18, 0.0, 0.5, 0.0, NULL),
    ('Rote Beete eingelegt', 50, 1.0, 10.0, 0.2, NULL),
    ('Knuspermüsli', 450, 8.0, 65.0, 15.0, 6),
    ('Haselnussmus', 628, 15.0, 10.0, 60.0, 3),
    ('Kakao (entölt)', 228, 21.0, 57.0, 10.0, NULL),
    ('Gekochter Reis', 130, 2.5, 28.0, 0.2, NULL),
    ('Haferkleie', 360, 12.0, 58.0, 8.0, 6),
    ('Hartweizengrieß', 350, 11.0, 73.0, 1.5, 6),
    ('Reiswaffeln', 380, 7.0, 80.0, 1.0, NULL),
    ('Gerösteter Knoblauch', 100, 3.0, 15.0, 1.0, NULL),
    ('Zwiebelringe frittiert', 400, 5.0, 40.0, 20.0, NULL),
    ('Süßkartoffelchips', 500, 5.0, 60.0, 30.0, NULL),
    ('Vegane Käsealternative', 300, 2.0, 5.0, 25.0, NULL),
    ('Mango getrocknet', 350, 2.0, 80.0, 1.0, NULL),
    ('Ananas getrocknet', 360, 2.0, 80.0, 1.0, NULL),
    ('Rinderfilet', 271, 26.0, 0.0, 19.0, NULL),
    ('Lammkotelett', 294, 25.0, 0.0, 21.0, NULL),
    ('Kalbsfleisch', 200, 20.0, 0.0, 10.0, NULL),
    ('Entenbrust', 337, 18.0, 0.0, 28.0, NULL),
    ('Hühnerleber', 150, 20.0, 2.0, 6.0, NULL),
    ('Forelle', 141, 19.0, 0.0, 7.0, 4),
    ('Makrele', 305, 18.0, 0.0, 25.0, 4),
    ('Barsch', 128, 23.0, 0.0, 3.0, 4),
    ('Krabben', 99, 19.0, 0.0, 1.0, 4),
    ('Languste', 80, 16.0, 0.0, 0.9, 4),
    ('Wildschwein', 125, 21.0, 0.0, 4.0, NULL),
    ('Rehfleisch', 120, 22.0, 0.0, 2.0, NULL),
    ('Fasan', 125, 22.0, 0.0, 4.0, NULL),
    ('Schafsleber', 150, 20.0, 2.0, 5.0, NULL),
    ('Trüffel', 25, 2.0, 4.0, 0.5, NULL),
    ('Austernpilze', 33, 3.0, 6.0, 0.5, NULL),
    ('Champignons', 22, 3.1, 3.3, 0.3, NULL),
('Shiitake', 35, 2.2, 7.0, 0.5, NULL),
    ('Morcheln', 31, 3.1, 6.5, 0.5, NULL),
    ('Pecannüsse', 690, 10.0, 15.0, 72.0, 3),
    ('Kürbiskernöl', 884, 0.0, 0.0, 100.0, 3),
    ('Schalotten', 60, 1.5, 14.0, 0.1, NULL),
    ('Fenchelknolle', 31, 1.0, 7.0, 0.2, NULL),
    ('Kräuterbutter', 600, 1.0, 1.0, 66.0, 2),
    ('Rosmarin frisch', 131, 3.3, 20.7, 5.9, NULL),
    ('Thymian frisch', 101, 5.6, 24.5, 1.7, NULL),
    ('Dill frisch', 43, 3.5, 7.0, 0.5, NULL),
    ('Petersilie frisch', 36, 3.0, 6.3, 0.8, NULL),
    ('Minzblätter', 44, 3.0, 8.0, 0.6, NULL),
    ('Lauchzwiebeln', 32, 1.8, 7.0, 0.1, NULL),
    ('Erdnüsse geröstet', 567, 25.0, 16.0, 49.0, 3),
    ('Mandeln geröstet', 579, 21.0, 22.0, 50.0, 3),
    ('Haselnüsse geröstet', 628, 15.0, 17.0, 61.0, 3),
    ('Cashewkerne geröstet', 553, 18.0, 30.0, 44.0, 3),
    ('Walnüsse geröstet', 654, 15.0, 14.0, 65.0, 3),
    ('Pistazien geröstet', 562, 20.0, 27.0, 45.0, 3),
    ('Macadamianüsse geröstet', 718, 8.0, 14.0, 75.0, 3),
    ('Paranüsse', 659, 14.0, 12.0, 66.0, 3),
    ('Kastanien', 180, 2.0, 38.0, 1.0, NULL),
    ('Fruchtmüsli', 350, 8.0, 70.0, 5.0, 6),
    ('Beerenmix (gefroren)', 50, 1.0, 12.0, 0.3, NULL),
    ('Roggenflocken', 320, 10.0, 55.0, 3.0, 6),
    ('Vollkornbrot Roggen', 250, 8.0, 50.0, 2.0, 6),
    ('Dinkelbrot', 260, 8.0, 50.0, 3.0, 6),
    ('Weizenbrot Toast', 250, 8.0, 48.0, 3.0, 6),
    ('Croissant Butter', 420, 7.0, 45.0, 23.0, 2),
    ('Berliner', 350, 6.0, 50.0, 14.0, 2),
    ('Apfelstrudel', 250, 4.0, 40.0, 10.0, 2),
    ('Kirschkuchen', 350, 5.0, 55.0, 15.0, 2),
    ('Schokoladenkuchen', 400, 6.0, 50.0, 20.0, 2)
    ('Weizenmehl Type 405', 364, 10.0, 76.0, 1.0, 6),
    ('Weizenmehl Type 550', 362, 11.0, 74.0, 1.2, 6),
    ('Weizenvollkornmehl', 340, 13.0, 62.0, 2.0, 6)
    ('Rinderhackfleisch', 250, 26.0, 0.0, 18.0, NULL),
    ('Schweinehackfleisch', 280, 22.0, 0.0, 21.0, NULL),
    ('Gemischtes Hackfleisch', 265, 24.0, 0.0, 19.0, NULL),
    ('Hähnchenhackfleisch', 160, 21.0, 0.0, 8.0, NULL),
    ('Putenhackfleisch', 140, 20.0, 0.0, 6.0, NULL),
    ('Lammhackfleisch', 290, 20.0, 0.0, 23.0, NULL),
    ('Veganes Hackfleisch (Erbsenprotein)', 190, 20.0, 6.0, 9.0, NULL),
    ('Veganes Hackfleisch (Sojaprotein)', 200, 21.0, 5.0, 10.0, 7),
    ('Tofu-Hackfleisch', 120, 12.0, 3.0, 6.0, 7),
    ('Seitan-Hackfleisch', 150, 28.0, 5.0, 1.5, 6),
    ('Wildhackfleisch', 180, 23.0, 0.0, 8.0, NULL),
    ('Sojamilch', 54.0, 3.3, 6.0, 1.8, NULL);


CREATE TABLE recipe_ingredient_details (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES recipe(id), 
    ingredient_id INT REFERENCES recipe_ingredient(id), 
    quantity FLOAT,
    unit VARCHAR(100));
INSERT INTO recipe_ingredient_details (recipe_id, ingredient_id, quantity, unit) VALUES
(1, 1, 500, 'g'), 
(1, 3, 250, 'g'), 
(1, 21, 2, 'Stk'),
(1, 13, 1, 'EL'),  
(1, 6, 300, 'g'),  
(1, 60, 50, 'g'),  
(2, 16, 400, 'g'), 
(2, 33, 200, 'ml'), 
(2, 30, 2, 'Stk'),
(2, 27, 1, 'EL'), 
(2, 21, 1, 'Stk'), 
(2, 15, 200, 'g'), 
(3, 16, 300, 'g'),
(3, 9, 2, 'Stk'),  
(3, 34, 2, 'EL'),  
(3, 13, 1, 'EL'), 
(4, 2, 1, 'Stk'), 
(4, 1, 2, 'Stk'),  
(4, 22, 300, 'g'), 
(4, 11, 200, 'g'),
(4, 12, 100, 'g'),
(5, 21, 4, 'Stk'),
(5, 13, 1, 'EL'), 
(5, 24, 1, 'L'),   
(5, 25, 1, 'Stk'),
(5, 60, 50, 'g'),
(6, 1, 500, 'g'),
(6, 3, 250, 'g'),
(6, 21, 2, 'Stk'),
(6, 13, 1, 'EL'),
(6, 6, 300, 'g'),
(6, 60, 50, 'g'),
(7, 16, 400, 'g'),
(7, 33, 200, 'ml'),
(7, 30, 2, 'Stk'),
(7, 27, 1, 'EL'),
(7, 21, 1, 'Stk'),
(7, 15, 200, 'g'),
(8, 16, 300, 'g'),
(8, 9, 2, 'Stk'),
(8, 34, 2, 'EL'),
(8, 13, 1, 'EL'),
(9, 2, 1, 'Stk'),
(9, 1, 2, 'Stk'),
(9, 22, 300, 'g'),
(9, 11, 200, 'g'),
(9, 12, 100, 'g'),
(10, 21, 4, 'Stk'),
(10, 13, 1, 'EL'),
(10, 24, 1, 'L'),
(10, 25, 1, 'Stk'),
(10, 60, 50, 'g'),
(11, 16, 400, 'g'),
(11, 33, 200, 'ml'),
(11, 13, 1, 'EL'),
(11, 21, 1, 'Stk'),
(11, 30, 1, 'Stk'),
(11, 34, 2, 'EL'),
(11, 23, 1, 'TL'),
(11, 22, 1, 'TL'),
(11, 20, 300, 'g'),
(11, 52, 1, 'Bund'),
(12, 45, 200, 'g'),
(12, 33, 100, 'ml'),
(12, 30, 2, 'Stk'),
(12, 21, 1, 'Stk'),
(12, 35, 1, 'TL'),
(12, 24, 1, 'L'),
(12, 43, 1, 'Bund'),
(12, 22, 1, 'TL'),
(12, 23, 1, 'TL'),

(13, 3, 250, 'g'),
(13, 33, 200, 'ml'),
(13, 13, 1, 'EL'),
(13, 21, 1, 'Stk'),
(13, 30, 1, 'Stk'),
(13, 34, 2, 'EL'),
(13, 23, 1, 'TL'),
(13, 22, 1, 'TL'),
(13, 20, 300, 'g'),
(13, 52, 1, 'Bund');



CREATE TABLE recipe_mealplan (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES recipe_user(id),
    recipe_id INT REFERENCES recipe(id),
    quantity FLOAT,
    unit VARCHAR(100),
    calories FLOAT,
    protein FLOAT,
    carbohydrates FLOAT,
    fats FLOAT,
    date DATE,
    meal_type VARCHAR(100) 
);
-- DROP TABLE IF EXISTS recipe_nutrition_goal CASCADE;
-- CREATE TABLE recipe_nutrition_goal (
--     id SERIAL PRIMARY KEY,
--     calorie_goal FLOAT,
--     protein_goal FLOAT,
--     carbohydrate_goal FLOAT,
--     fat_goal FLOAT,
--     user_id INT REFERENCES recipe_user(uid)
-- );

-- INSERT INTO recipe_nutrition_goal (user_id, calorie_goal, protein_goal, carbohydrate_goal, fat_goal) VALUES
-- (1, 2000, 50, 250, 70),
-- (2, 1800, 40, 200, 60),
-- (3, 2200, 80, 180, 90),
-- (4, 1900, 60, 210, 75);

CREATE TABLE recipe_planner (
    planner_id SERIAL PRIMARY KEY,       
    user_id INT REFERENCES recipe_user(id),
    recipe_id INT REFERENCES recipe(id),
    recipe_title VARCHAR(255) NOT NULL,  
    date DATE NOT NULL,                  
    link TEXT                            
);
 
 CREATE TABLE recipe_user_allergene (
    
    user_id INT REFERENCES recipe_user(id),
    allergene_id INT REFERENCES recipe_allergene(id)
,
    PRIMARY KEY (user_id, allergene_id)
);
CREATE TABLE recipe_user_sammlung (
    user_id INT REFERENCES recipe_user(id),
    recipe_id INT REFERENCES recipe(id),
    PRIMARY KEY (user_id, recipe_id)
);

CREATE TABLE recipe_user_categories (
    user_id INT REFERENCES recipe_user(id),
    category_id INT  REFERENCES recipe_categories(id) ,
   PRIMARY KEY (user_id, category_id)
);
-- CREATE TABLE recipe_diet_goals (
--     goal_id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(user_id),
--     start_date DATE,
--     end_date DATE,
--     target_weight FLOAT,
--     calorie_goal INT,
--     protein_goal FLOAT,
--     carbs_goal FLOAT,
--     fats_goal FLOAT
-- );

CREATE TABLE recipe_user_diet_type (
    user_id INT REFERENCES recipe_user(id),
    diet_type_id INT REFERENCES recipe_diet_type(id),
    PRIMARY KEY (user_id, diet_type_id)
);

CREATE TABLE recipe_user_ingredient_allergene  (
    user_id INT REFERENCES recipe_user(id),
    ingredient_id INT  REFERENCES recipe_ingredient(id) ,
    PRIMARY KEY (user_id, ingredient_id)
);
