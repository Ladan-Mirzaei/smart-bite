
-- Drop tables if they exist
DROP TABLE IF EXISTS recipe;


CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    preparation_time INT,
    cooking_time INT,
    portions INT,
    calories FLOAT,
    protein FLOAT,
    carbohydrates FLOAT,
    fats FLOAT,
    category_id INT REFERENCES recipe_categories(id),
    diet_type VARCHAR(100) CHECK (diet_type IN ('vegan', 'vegetarisch', 'glutenfrei', 'keto', 'paleo')),
    difficulty_level VARCHAR(100) CHECK (difficulty_level IN ('einfach', 'mittel', 'schwer')),
    instructions TEXT
);

INSERT INTO recipe (title, description, preparation_time, cooking_time, portions, calories, protein, carbohydrates, fats, diet_type, difficulty_level, instructions, category_id) VALUES
    ('Vegan Salat',
     'Ein gesunder Salat mit frischem Gemüse.',
     10, 0, 2, 200, 5, 20, 10, 'vegan', 'einfach',
     '1. Gemüse waschen und in kleine Stücke schneiden.\n' ||
     '2. Alle Zutaten in einer Schüssel vermengen.\n' ||
     '3. Mit Dressing abschmecken und servieren.', 1
    ),
    ('Glutenfreie Pfannkuchen',
     'Leckere Pfannkuchen aus glutenfreiem Mehl.',
     15, 20, 4, 350, 10, 45, 15, 'glutenfrei', 'mittel',
     '1. Pfanne erhitzen und etwas Öl hinzufügen.\n' ||
     '2. Teig für die Pfannkuchen vorbereiten.\n' ||
     '3. Teig in die Pfanne geben und auf beiden Seiten goldbraun braten.\n' ||
     '4. Warm servieren.', 2
    ),
,(
    'Keto Avocado-Eiersalat',
    'Ein cremiger, ketofreundlicher Salat aus Avocado und Ei, perfekt für einen schnellen Snack.',
    10, 5, 2, 250, 12, 5, 20, 'keto', 'einfach',
    '1. Die Eier in einem Topf für ca. 10 Minuten hart kochen. Anschließend abkühlen lassen und in kleine Stücke schneiden.\n' ||
    '2. Die Avocado halbieren, das Fruchtfleisch herauslöffeln und in eine Schüssel geben. Mit einer Gabel zerdrücken.\n' ||
    '3. Die Eierstücke zur Avocado hinzufügen und gut vermischen. Mit Salz, Pfeffer und etwas Zitronensaft abschmecken.\n' ||
    '4. Optional: Ein wenig gehackten Schnittlauch oder Petersilie hinzufügen und sofort servieren.'
),
(
    'Keto Blumenkohl-Püree',
    'Eine samtige, kohlenhydratarme Alternative zu Kartoffelpüree, perfekt als Beilage.',
    10, 20, 4, 150, 5, 8, 12, 'keto', 'einfach',
    '1. Den Blumenkohl in kleine Röschen schneiden und in einem großen Topf mit Salzwasser kochen, bis er weich ist (ca. 10-15 Minuten).\n' ||
    '2. Den gekochten Blumenkohl abgießen und in einem Mixer oder mit einem Stabmixer pürieren.\n' ||
    '3. Butter und Sahne hinzufügen und nochmals mixen, bis eine cremige Konsistenz erreicht ist.\n' ||
    '4. Mit Salz, Pfeffer und Muskatnuss abschmecken und warm servieren.'
),
(
    'Keto Hähnchen in Sahnesoße',
    'Zartes Hähnchen in einer reichhaltigen Sahnesoße mit frischen Kräutern und Knoblauch.',
    15, 30, 4, 400, 30, 4, 30, 'keto', 'mittel',
    '1. Hähnchenbrustfilets mit Salz und Pfeffer würzen. In einer Pfanne mit etwas Olivenöl von beiden Seiten goldbraun anbraten, dann herausnehmen und beiseite stellen.\n' ||
    '2. Knoblauch und gehackte Zwiebeln in derselben Pfanne anbraten, bis sie duften.\n' ||
    '3. Sahne und frische Kräuter (z.B. Thymian oder Basilikum) hinzufügen und die Soße bei niedriger Hitze köcheln lassen, bis sie leicht eindickt.\n' ||
    '4. Die Hähnchenbrustfilets wieder in die Pfanne legen und in der Soße erhitzen. Servieren, sobald das Hähnchen durchgegart ist.'
),
(
    'Keto Zoodles mit Pesto',
    'Leichte und erfrischende Zucchini-Nudeln mit einem kohlenhydratarmen Pesto.',
    10, 10, 2, 180, 4, 6, 15, 'keto', 'einfach',
    '1. Die Zucchini mit einem Spiralschneider in dünne Nudeln schneiden.\n' ||
    '2. Eine Pfanne erhitzen und die Zoodles darin kurz anbraten (2-3 Minuten), damit sie etwas weicher werden.\n' ||
    '3. Das Pesto unter die Zoodles mischen, bis alles gut verteilt ist.\n' ||
    '4. Nach Belieben mit geriebenem Parmesan und frischem Basilikum servieren.'
),
(
    'Keto Hackfleischpfanne mit Gemüse',
    'Eine sättigende Hackfleischpfanne mit kohlenhydratarmem Gemüse wie Paprika und Zucchini.',
    15, 20, 3, 350, 25, 8, 25, 'keto', 'mittel',
    '1. Hackfleisch in einer großen Pfanne mit etwas Öl anbraten, bis es krümelig ist.\n' ||
    '2. Zwiebeln, Paprika und Zucchini klein schneiden und zum Hackfleisch geben. Alles gut anbraten.\n' ||
    '3. Tomatenmark hinzufügen und gut verrühren. Mit Salz, Pfeffer und Paprikapulver würzen.\n' ||
    '4. Etwa 10 Minuten köcheln lassen, bis das Gemüse weich ist. Sofort servieren.'
),
(
    'Keto Omelett mit Käse und Speck',
    'Ein herzhaftes Frühstücks-Omelett, das Sie für Stunden sättigt.',
    5, 10, 1, 300, 18, 2, 25, 'keto', 'einfach',
    '1. Eier in einer Schüssel verquirlen und mit Salz und Pfeffer würzen.\n' ||
    '2. Speck in einer Pfanne knusprig braten und beiseite stellen.\n' ||
    '3. Die verquirlten Eier in die Pfanne gießen und bei mittlerer Hitze stocken lassen.\n' ||
    '4. Käse und den gebratenen Speck auf eine Hälfte des Omeletts geben, dann die andere Hälfte darüber klappen und servieren.'
),
(
    'Keto Spinat-Feta-Rolle',
    'Eine sättigende und geschmackvolle Rolle aus Spinat und Feta, perfekt für ein leichtes Mittagessen.',
    15, 30, 2, 250, 12, 6, 18, 'keto', 'mittel',
    '1. Den Spinat in einer Pfanne mit etwas Olivenöl andünsten, bis er zusammenfällt.\n' ||
    '2. Den Feta in kleine Würfel schneiden und zum Spinat geben. Mit Salz, Pfeffer und Muskat würzen.\n' ||
    '3. Eine Pfannkuchen- oder Wrap-Basis vorbereiten (z.B. mit Mandelmehl) und den Spinat-Feta-Mix darauf verteilen.\n' ||
    '4. Die Wraps aufrollen und kurz im Ofen backen, bis sie warm sind. Sofort servieren.'
),
(
    'Keto Shakshuka',
    'Eine würzige Shakshuka mit Paprika, Tomaten und Eiern, ideal für ein herzhaftes Frühstück oder Abendessen.',
    10, 20, 3, 280, 10, 8, 20, 'keto', 'mittel',
    '1. In einer großen Pfanne Paprika, Zwiebeln und Knoblauch in Olivenöl anbraten, bis sie weich sind.\n' ||
    '2. Gehackte Tomaten und Gewürze (z.B. Kreuzkümmel und Paprikapulver) hinzufügen und köcheln lassen.\n' ||
    '3. Kleine Vertiefungen in der Tomatensoße formen und die Eier hineinschlagen.\n' ||
    '4. Die Pfanne abdecken und die Eier stocken lassen. Mit frischem Koriander oder Petersilie garnieren.'
),
(
    'Keto Avocado-Schoko-Mousse',
    'Ein cremiges, zuckerfreies Dessert mit Avocado und Schokolade, das reich an gesunden Fetten ist.',
    10, 0, 2, 300, 4, 5, 25, 'keto', 'mittel',
    '1. Die Avocado in einem Mixer oder einer Küchenmaschine glatt pürieren.\n' ||
    '2. Kakaopulver und eine ketofreundliche Süße (z.B. Erythrit) hinzufügen und gut verrühren.\n' ||
    '3. Etwas Vanilleextrakt oder Zimt hinzugeben und nochmals mixen, bis die Mousse cremig ist.\n' ||
    '4. In kleine Schalen füllen und für eine Stunde kühlen. Optional mit gehackten Nüssen garnieren.'
),
(
    'Keto Lasagne ohne Nudeln',
    'Eine ketofreundliche Lasagne, die Zucchini statt Nudelplatten verwendet.',
    30, 45, 4, 450, 30, 10, 35, 'keto', 'schwer',
    '1. Die Zucchini in dünne Scheiben schneiden und auf ein Backblech legen. Leicht salzen und im Ofen bei 180°C ca. 10 Minuten vorbacken, um Wasser zu entfernen.\n' ||
    '2. Hackfleisch mit Zwiebeln und Knoblauch anbraten, Tomatensoße hinzufügen und köcheln lassen.\n' ||
    '3. Eine Schicht Zucchini in eine Auflaufform legen, darauf eine Schicht Hackfleischsoße und etwas geriebenen Käse. Wiederholen, bis alles aufgebraucht ist.\n' ||
    '4. Die Lasagne im Ofen ca. 25-30 Minuten backen, bis der Käse goldbraun ist. Vor dem Servieren etwas abkühlen'
    ),
('Glutenfreier Quinoa-Salat', 
    'Ein erfrischender Salat mit Quinoa und frischem Gemüse.',
    15, 0, 2, 300, 10, 30, 12, 'glutenfrei', 'einfach',
    '1. Quinoa in einem feinen Sieb abspülen, um Bitterstoffe zu entfernen.\n' ||
    '2. Quinoa in einem Topf mit der doppelten Menge Wasser zum Kochen bringen.\n' ||
    '3. Hitze reduzieren, abdecken und 15 Minuten köcheln lassen.\n' ||
    '4. Das Gemüse (Gurke, Tomaten, Paprika) waschen und klein schneiden.\n' ||
    '5. Quinoa mit dem Gemüse in einer großen Schüssel vermengen.\n' ||
    '6. Mit Olivenöl, Zitronensaft, Salz und Pfeffer abschmecken.'
),
('Glutenfreie Pancakes', 
    'Leckere und fluffige Pancakes ohne Gluten.',
    10, 10, 2, 350, 8, 45, 15, 'glutenfrei', 'mittel',
    '1. In einer Schüssel Mehl, Backpulver, Zucker und eine Prise Salz vermengen.\n' ||
    '2. In einer separaten Schüssel Ei, Milch und Vanilleextrakt verquirlen.\n' ||
    '3. Die trockenen Zutaten zu den flüssigen Zutaten geben und gut verrühren, bis der Teig glatt ist.\n' ||
    '4. Eine Pfanne bei mittlerer Hitze erwärmen und mit etwas Öl bepinseln.\n' ||
    '5. Den Teig in kleinen Portionen in die Pfanne geben und von beiden Seiten goldbraun braten.\n' ||
    '6. Mit Ahornsirup oder frischen Früchten servieren.'
),
('Glutenfreies Bananenbrot', 
    'Ein saftiges Bananenbrot ohne Gluten.',
    10, 40, 8, 250, 5, 40, 10, 'glutenfrei', 'mittel',
    '1. Den Backofen auf 180°C vorheizen und eine Kastenform einfetten.\n' ||
    '2. Die Bananen schälen und in einer Schüssel mit einer Gabel zerdrücken.\n' ||
    '3. Ei, Zucker, Öl und Vanilleextrakt zu den Bananen geben und gut vermengen.\n' ||
    '4. Mehl, Backpulver und eine Prise Salz in einer separaten Schüssel mischen und unter die Bananenmasse rühren.\n' ||
    '5. Den Teig in die vorbereitete Form füllen und für ca. 40 Minuten backen, bis ein Zahnstocher sauber herauskommt.'
),
('Glutenfreie Pasta mit Tomatensauce', 
    'Leckere glutenfreie Pasta mit einer frischen Tomatensauce.',
    10, 15, 2, 400, 12, 50, 18, 'glutenfrei', 'mittel',
    '1. Die Pasta nach Packungsanweisung in kochendem Wasser al dente kochen.\n' ||
    '2. In einer Pfanne Olivenöl erhitzen und Zwiebeln sowie Knoblauch anbraten.\n' ||
    '3. Die Tomaten aus der Dose hinzugeben und mit Oregano, Salz und Pfeffer würzen.\n' ||
    '4. Die Sauce bei mittlerer Hitze 10 Minuten köcheln lassen, dabei gelegentlich umrühren.\n' ||
    '5. Die gekochte Pasta mit der Sauce vermengen und nach Belieben mit Parmesan bestreuen.'
),
('Glutenfreier Reisauflauf', 
    'Ein herzhafter Auflauf mit Reis und Gemüse.',
    20, 30, 4, 350, 12, 45, 15, 'glutenfrei', 'mittel',
    '1. Den Reis in einem Topf nach Packungsanweisung kochen.\n' ||
    '2. Gemüse (wie Brokkoli, Paprika, Zucchini) klein schneiden und in einer Pfanne mit etwas Öl anbraten.\n' ||
    '3. Den gekochten Reis mit dem gebratenen Gemüse und etwas geriebenem Käse in einer Auflaufform vermengen.\n' ||
    '4. Mit Salz, Pfeffer und Kräutern würzen und im Ofen bei 180°C für 25-30 Minuten backen.'
),
('Glutenfreies Curry mit Kichererbsen', 
    'Ein leckeres und würziges Curry mit Kichererbsen.',
    10, 30, 4, 450, 15, 55, 18, 'glutenfrei', 'mittel',
    '1. Zwiebeln und Knoblauch in etwas Öl anbraten.\n' ||
    '2. Kichererbsen, gewürfelte Tomaten und Kokosmilch hinzufügen.\n' ||
    '3. Mit Curry-Pulver, Kreuzkümmel und Chili würzen.\n' ||
    '4. Das Curry bei mittlerer Hitze 20 Minuten köcheln lassen.\n' ||
    '5. Mit Reis oder Naanbrot servieren.'
),
('Glutenfreies Gemüse-Risotto', 
    'Ein cremiges Risotto mit frischem Gemüse.',
    15, 25, 3, 400, 10, 50, 16, 'glutenfrei', 'mittel',
    '1. Die Zwiebel fein hacken und in einem Topf mit etwas Öl anbraten.\n' ||
    '2. Reis hinzufügen und kurz anbraten.\n' ||
    '3. Nach und nach Gemüsebrühe hinzugeben und unter Rühren kochen, bis der Reis die Flüssigkeit aufgenommen hat.\n' ||
    '4. Das Gemüse (z. B. Erbsen, Zucchini) hinzufügen und weiter kochen, bis der Reis gar ist.\n' ||
    '5. Mit Parmesan und frischen Kräutern verfeinern.'
),
('Glutenfreier Linseneintopf', 
    'Ein herzhaftes Eintopfgericht mit Linsen und Gemüse.',
    15, 45, 4, 350, 18, 45, 12, 'glutenfrei', 'mittel',
    '1. Zwiebeln, Karotten und Sellerie in Würfel schneiden und in einem großen Topf anbraten.\n' ||
    '2. Linsen, Brühe und Tomaten hinzufügen.\n' ||
    '3. Den Eintopf zum Kochen bringen und 30-40 Minuten köcheln lassen.\n' ||
    '4. Mit Salz, Pfeffer und Gewürzen nach Geschmack abschmecken.'
),
('Glutenfreier Kartoffelsalat', 
    'Ein klassischer Kartoffelsalat ohne Gluten.',
    20, 0, 4, 250, 6, 40, 8, 'glutenfrei', 'einfach',
    '1. Die Kartoffeln in einem Topf mit Wasser kochen, bis sie weich sind.\n' ||
    '2. Die Kartoffeln abkühlen lassen und in Scheiben schneiden.\n' ||
    '3. Zwiebeln und Essiggurken hacken und unter die Kartoffeln mischen.\n' ||
    '4. Mit einer Mischung aus Essig, Öl, Senf und Gewürzen abschmecken.'
),
('Glutenfreie Zucchini-Nudeln', 
    'Zucchini-Nudeln als glutenfreie Alternative zu Pasta.',
    10, 5, 2, 150, 4, 20, 5, 'glutenfrei', 'einfach',
    '1. Die Zucchini mit einem Spiralschneider in Nudelform schneiden.\n' ||
    '2. In einer heißen Pfanne mit etwas Olivenöl anbraten.\n' ||
    '3. Mit Salz, Pfeffer und etwas Zitronensaft würzen und servieren.'
),
('Glutenfreier Apfelkuchen', 
    'Ein saftiger Apfelkuchen ohne Gluten.',
    15, 40, 8, 300, 4, 40, 12, 'glutenfrei', 'mittel',
    '1. Die Äpfel schälen, entkernen und in dünne Scheiben schneiden.\n' ||
    '2. Mehl, Zucker und Backpulver mischen und mit Butter und Eiern zu einem Teig verrühren.\n' ||
    '3. Die Äpfel unter den Teig heben und in eine gefettete Form füllen.\n' ||
    '4. Den Kuchen bei 180°C für etwa 40 Minuten backen, bis er goldbraun ist.'
),
('Glutenfreies Hähnchen-Curry', 
    'Ein würziges Curry mit Hähnchen und frischem Gemüse.',
    10, 30, 4, 400, 25, 30, 15, 'glutenfrei', 'mittel',
    '1. Hähnchenbrustfilets in mundgerechte Stücke schneiden und mit einer Prise Salz und Pfeffer würzen.\n' ||
    '2. In einer großen Pfanne oder einem Topf etwas Öl erhitzen und die Hähnchenstücke darin anbraten, bis sie leicht gebräunt sind. Anschließend das Hähnchen aus der Pfanne nehmen und beiseitestellen.\n' ||
    '3. In derselben Pfanne Zwiebeln fein hacken und mit etwas Öl glasig dünsten.\n' ||
    '4. Knoblauch und Ingwer fein hacken und zu den Zwiebeln geben. Für etwa 1 Minute mit anbraten, bis es duftet.\n' ||
    '5. Gewürze (z. B. Curry-Pulver, Kreuzkümmel, Koriander und Kurkuma) hinzufügen und kurz anrösten, um die Aromen freizusetzen.\n' ||
    '6. Eine Dose Kokosmilch und gewürfelte Tomaten in die Pfanne geben, gut umrühren und die Hähnchenstücke zurück in die Pfanne legen.\n' ||
    '7. Das Curry bei mittlerer Hitze ca. 15-20 Minuten köcheln lassen, bis das Hähnchen durchgegart ist und die Sauce eingedickt ist.\n' ||
    '8. Nach Geschmack mit Salz und Pfeffer abschmecken und mit frischem Koriander garnieren.\n' ||
    '9. Mit Reis oder glutenfreiem Naanbrot servieren.'),
('Vegetarische Lasagne',
    'Eine köstliche Lasagne mit Schichten aus Pasta, Tomatensauce und Gemüse.',
    20, 40, 4, 500, 18, 60, 15, 'vegetarisch', 'mittel',
    '1. Den Backofen auf 180°C vorheizen.\n' ||
    '2. Zwiebeln und Knoblauch fein hacken und in etwas Olivenöl in einer großen Pfanne anbraten.\n' ||
    '3. Karotten und Zucchini klein würfeln und hinzufügen. Für 5 Minuten anbraten.\n' ||
    '4. Tomatenmark und gehackte Tomaten hinzufügen, mit Oregano, Salz und Pfeffer abschmecken und für 10 Minuten köcheln lassen.\n' ||
    '5. Eine Auflaufform einfetten und abwechselnd Gemüsesauce, Lasagneblätter und etwas Ricotta-Käse schichten.\n' ||
    '6. Mit einer Schicht geriebenem Käse abschließen und die Lasagne 30-40 Minuten im Ofen backen, bis sie goldbraun ist.'
),
('Vegetarische Quiche mit Spinat und Feta',
    'Eine herzhafte Quiche mit frischem Spinat und Feta-Käse.',
    15, 35, 6, 350, 12, 30, 18, 'vegetarisch', 'mittel',
    '1. Den Backofen auf 200°C vorheizen und eine Quiche-Form einfetten.\n' ||
    '2. Den Teig ausrollen und in die Quiche-Form legen, dabei den Rand hochziehen.\n' ||
    '3. Spinat waschen und in einer Pfanne kurz andünsten, bis er zusammenfällt.\n' ||
    '4. Spinat abkühlen lassen und gut ausdrücken, überschüssiges Wasser abgießen.\n' ||
    '5. Eier, Sahne und geriebenen Käse in einer Schüssel verquirlen, mit Salz, Pfeffer und Muskat würzen.\n' ||
    '6. Spinat und zerbröselten Feta auf dem Teig verteilen und die Eimischung darüber gießen.\n' ||
    '7. Die Quiche im Ofen für ca. 30-35 Minuten backen, bis sie fest und leicht gebräunt ist.'
),
('Vegetarische Gemüsesuppe',
    'Eine wärmende Suppe mit frischem Gemüse der Saison.',
    10, 30, 4, 200, 6, 25, 5, 'vegetarisch', 'einfach',
    '1. Karotten, Zucchini, Kartoffeln und Sellerie klein würfeln.\n' ||
    '2. Zwiebeln und Knoblauch in einem großen Topf in etwas Öl anbraten.\n' ||
    '3. Das gewürfelte Gemüse hinzufügen und 5 Minuten anbraten.\n' ||
    '4. Mit Gemüsebrühe aufgießen und Lorbeerblatt und Kräuter hinzufügen.\n' ||
    '5. Die Suppe bei mittlerer Hitze 20 Minuten köcheln lassen, bis das Gemüse weich ist.\n' ||
    '6. Lorbeerblatt entfernen, Suppe nach Belieben pürieren und mit Salz und Pfeffer abschmecken.'
),
('Vegetarisches Kichererbsen-Curry',
    'Ein würziges Curry mit Kichererbsen und Kokosmilch.',
    10, 25, 4, 400, 15, 50, 12, 'vegetarisch', 'mittel',
    '1. Zwiebeln und Knoblauch fein hacken und in einer Pfanne mit etwas Öl anbraten.\n' ||
    '2. Gewürze wie Kreuzkümmel, Kurkuma, Koriander und Currypulver hinzufügen und kurz anrösten.\n' ||
    '3. Tomatenmark und gewürfelte Tomaten hinzugeben, umrühren und 5 Minuten köcheln lassen.\n' ||
    '4. Kichererbsen und Kokosmilch hinzufügen und gut vermengen.\n' ||
    '5. Das Curry bei mittlerer Hitze 15 Minuten köcheln lassen und mit frischem Koriander garnieren.'
),
('Gefüllte Paprika mit Reis und Gemüse',
    'Paprika gefüllt mit einer Mischung aus Reis, Gemüse und Gewürzen.',
    15, 30, 4, 250, 8, 35, 6, 'vegetarisch', 'mittel',
    '1. Den Backofen auf 180°C vorheizen.\n' ||
    '2. Die Paprika waschen, oben aufschneiden und entkernen.\n' ||
    '3. Reis nach Packungsanweisung kochen.\n' ||
    '4. In einer Pfanne Zwiebeln und Knoblauch anbraten, dann gewürfeltes Gemüse wie Zucchini und Karotten hinzufügen.\n' ||
    '5. Den gekochten Reis und das Gemüse mischen, mit Kräutern und Gewürzen abschmecken.\n' ||
    '6. Die Mischung in die Paprika füllen und diese in eine Auflaufform stellen.\n' ||
    '7. 20-25 Minuten im Ofen backen, bis die Paprika weich sind.'
),
('Vegetarisches Ratatouille',
    'Ein traditionelles französisches Gericht mit Zucchini, Auberginen und Paprika.',
    20, 40, 4, 180, 5, 20, 8, 'vegetarisch', 'mittel',
    '1. Zucchini, Auberginen und Paprika in Scheiben schneiden.\n' ||
    '2. Zwiebeln und Knoblauch hacken und in einem großen Topf mit etwas Olivenöl anbraten.\n' ||
    '3. Das Gemüse schichtenweise hinzufügen und jede Schicht mit Salz, Pfeffer und Kräutern würzen.\n' ||
    '4. Tomaten aus der Dose hinzufügen und das Ratatouille bei niedriger Hitze 30 Minuten köcheln lassen.\n' ||
    '5. Ab und zu umrühren und mit frischen Kräutern garnieren.',y
),
('Vegetarisches Chili sin Carne',
    'Ein würziges Chili mit Bohnen und Mais, ohne Fleisch.',
    15, 30, 4, 300, 15, 45, 8, 'vegetarisch', 'mittel',
    '1. Zwiebeln und Knoblauch in etwas Öl anbraten.\n' ||
    '2. Gewürfelte Paprika und Karotten hinzufügen und 5 Minuten anbraten.\n' ||
    '3. Tomatenmark, gewürfelte Tomaten und Gemüsebrühe hinzufügen und umrühren.\n' ||
    '4. Rote Bohnen, weiße Bohnen und Mais hinzufügen und das Chili bei mittlerer Hitze 20 Minuten köcheln lassen.\n' ||
    '5. Mit Paprikapulver, Kreuzkümmel, Salz und Pfeffer abschmecken und servieren.'
),
('Vegetarisches Pilz-Risotto',
    'Ein cremiges Risotto mit Champignons und Parmesan.',
    10, 30, 4, 350, 10, 55, 12, 'vegetarisch', 'mittel',
    '1. Zwiebel und Knoblauch fein hacken und in etwas Butter in einem Topf anbraten.\n' ||
    '2. Risottoreis hinzufügen und kurz anrösten.\n' ||
    '3. Nach und nach Gemüsebrühe hinzugeben und unter Rühren köcheln lassen.\n' ||
    '4. Die Pilze in einer separaten Pfanne anbraten und am Ende unter das Risotto rühren.\n' ||
    '5. Mit Salz, Pfeffer und geriebenem Parmesan abschmecken.'
),
('Vegetarische Frühlingsrollen',
    'Knusprige Frühlingsrollen mit Gemüsefüllung.',
    20, 15, 4, 250, 6, 30, 8, 'vegetarisch', 'schwer',
    '1. Karotten, Weißkohl und Zucchini in feine Streifen schneiden.\n' ||
    '2. Das Gemüse in einer Pfanne anbraten und mit Sojasauce abschmecken.\n' ||
    '3. Die Füllung abkühlen lassen und dann auf Frühlingsrollenteig geben.\n' ||
    '4. Den Teig zusammenrollen und die Enden mit Wasser verschließen.\n' ||
    '5. Die Frühlingsrollen in heißem Öl frittieren, bis sie goldbraun sind.'
),
('Vegetarischer Gemüseauflauf',
    'Ein herzhafter Auflauf mit Kartoffeln, Zucchini und Käse.',
    20, 40, 4, 400, 12, 45, 15, 'vegetarisch', 'mittel',
    '1. Den Backofen auf 180°C vorheizen und eine Auflaufform einfetten.\n' ||
    '2. Kartoffeln schälen und in dünne Scheiben schneiden. Die Zucchini ebenfalls in Scheiben schneiden.\n' ||
    '3. Zwiebel und Knoblauch fein hacken und in einer Pfanne mit etwas Olivenöl anbraten, bis sie glasig sind.\n' ||
    '4. Sahne und etwas geriebenen Käse in die Pfanne geben, mit Salz, Pfeffer und Muskatnuss abschmecken und die Sauce kurz aufkochen lassen.\n' ||
    '5. Die Hälfte der Kartoffelscheiben in die Auflaufform legen, dann eine Schicht Zucchini darauf verteilen.\n' ||
    '6. Die Zwiebel-Sahne-Sauce über das Gemüse gießen und mit einer weiteren Schicht Kartoffeln und Zucchini bedecken.\n' ||
    '7. Den restlichen geriebenen Käse gleichmäßig über den Auflauf streuen.\n' ||
    '8. Den Auflauf im vorgeheizten Ofen etwa 40 Minuten backen, bis die Kartoffeln weich und der Käse goldbraun ist.\n' ||
    '9. Vor dem Servieren kurz abkühlen lassen, damit der Auflauf etwas fest wird.'
),
('Veganes Curry mit Kichererbsen und Spinat',
    'Ein cremiges, würziges Curry mit Kichererbsen und frischem Spinat.',
    10, 25, 4, 350, 12, 50, 10, 'vegan', 'mittel',
    '1. Zwiebeln und Knoblauch fein hacken und in einer Pfanne mit etwas Öl anbraten.\n' ||
    '2. Gewürze wie Kreuzkümmel, Kurkuma und Currypulver hinzufügen und kurz anrösten.\n' ||
    '3. Kichererbsen und gewürfelte Tomaten hinzufügen und gut umrühren.\n' ||
    '4. Kokosmilch und Spinat dazugeben und das Curry 15 Minuten köcheln lassen.\n' ||
    '5. Mit Salz und Pfeffer abschmecken und mit frischem Koriander servieren.'
),
('Veganer Gemüse-Bulgur-Pilaw',
    'Ein herzhaftes Bulgur-Gericht mit saisonalem Gemüse.',
    10, 20, 4, 300, 9, 55, 7, 'vegan', 'einfach',
    '1. Zwiebel und Knoblauch hacken und in einer Pfanne mit etwas Olivenöl anbraten.\n' ||
    '2. Zucchini, Paprika und Tomaten in kleine Würfel schneiden und zur Pfanne geben.\n' ||
    '3. Bulgur hinzufügen und mit Gemüsebrühe aufgießen. Zum Kochen bringen.\n' ||
    '4. Bei schwacher Hitze 15 Minuten köcheln lassen, bis der Bulgur die Flüssigkeit aufgesogen hat.\n' ||
    '5. Mit Salz, Pfeffer und frischen Kräutern abschmecken und servieren.'
),
('Veganer Linseneintopf',
    'Ein sättigender Eintopf mit Linsen und Gemüse.',
    15, 30, 4, 400, 18, 45, 8, 'vegan', 'mittel',
    '1. Zwiebeln, Karotten und Sellerie klein schneiden und in einem großen Topf mit Öl anbraten.\n' ||
    '2. Linsen hinzufügen und mit Gemüsebrühe aufgießen.\n' ||
    '3. Gewürze wie Lorbeerblatt, Thymian und Paprika dazugeben und 30 Minuten köcheln lassen.\n' ||
    '4. Nach Belieben pürieren oder stückig lassen und abschmecken.'
),
('Vegane Ratatouille',
    'Ein traditionelles französisches Gericht mit Tomaten, Zucchini und Aubergine.',
    20, 40, 4, 180, 5, 25, 9, 'vegan', 'mittel',
    '1. Gemüse in Scheiben schneiden und abwechselnd in eine große Pfanne schichten.\n' ||
    '2. Mit Olivenöl beträufeln und mit Kräutern der Provence bestreuen.\n' ||
    '3. Bei schwacher Hitze 40 Minuten garen, bis das Gemüse weich ist.\n' ||
    '4. Vor dem Servieren mit frischen Kräutern garnieren.'
),
('Vegane Bolognese mit Linsen',
    'Eine vegane Alternative zur klassischen Bolognese mit Linsen.',
    15, 30, 4, 320, 15, 55, 5, 'vegan', 'mittel',
    '1. Zwiebeln, Karotten und Sellerie hacken und in einer Pfanne anbraten.\n' ||
    '2. Rote Linsen und Tomaten hinzufügen und mit Gemüsebrühe aufgießen.\n' ||
    '3. 20 Minuten köcheln lassen, bis die Linsen weich sind.\n' ||
    '4. Mit Salz, Pfeffer und italienischen Kräutern abschmecken und mit Pasta servieren.'
),
('Veganer Kartoffelauflauf mit Spinat',
    'Ein cremiger Auflauf mit Kartoffeln und Spinat.',
    20, 40, 4, 350, 10, 45, 12, 'vegan', 'mittel',
    '1. Kartoffeln in dünne Scheiben schneiden und in eine Auflaufform schichten.\n' ||
    '2. Spinat andünsten und darüber verteilen.\n' ||
    '3. Eine Soße aus pflanzlicher Sahne, Knoblauch, Salz und Pfeffer mischen und über die Kartoffeln gießen.\n' ||
    '4. 40 Minuten im Ofen bei 180°C backen, bis die Kartoffeln weich sind.'
),
('Veganes Thai-Curry mit Gemüse',
    'Ein aromatisches Curry mit Kokosmilch und Gemüse.',
    15, 20, 4, 380, 7, 45, 15, 'vegan', 'mittel',
    '1. Zwiebeln und Knoblauch anbraten und mit rotem Currypulver bestreuen.\n' ||
    '2. Gemüse wie Paprika, Zucchini und Karotten hinzufügen.\n' ||
    '3. Mit Kokosmilch aufgießen und 15 Minuten köcheln lassen.\n' ||
    '4. Mit frischem Koriander servieren.'
),
('Veganes Risotto mit Pilzen',
    'Ein cremiges Risotto mit Champignons.',
    10, 25, 4, 300, 8, 50, 6, 'vegan', 'mittel',
    '1. Zwiebeln und Knoblauch in einem Topf mit Öl anbraten.\n' ||
    '2. Reis hinzufügen und mit Weißwein ablöschen.\n' ||
    '3. Gemüsebrühe nach und nach hinzufügen, bis der Reis cremig ist.\n' ||
    '4. Champignons in einer separaten Pfanne anbraten und unter das Risotto mischen.'
),
('Veganes Tofu-Stir-Fry',
    'Ein schnelles Stir-Fry mit Tofu und Gemüse.',
    10, 15, 4, 250, 15, 30, 10, 'vegan', 'einfach',
    '1. Tofu in Würfel schneiden und in einer Pfanne mit etwas Öl knusprig anbraten.\n' ||
    '2. Gemüse wie Paprika, Brokkoli und Karotten hinzufügen.\n' ||
    '3. Mit Sojasauce abschmecken und mit Reis servieren.'
),
('Vegane gefüllte Paprika',
    'Paprika gefüllt mit einer Mischung aus Quinoa und Gemüse.',
    15, 30, 4, 270, 10, 40, 5, 'vegan', 'mittel',
    '1. Paprika halbieren und entkernen.\n' ||
    '2. Quinoa nach Packungsanweisung kochen und mit gewürfeltem Gemüse mischen.\n' ||
    '3. Die Mischung in die Paprika füllen und 20 Minuten im Ofen backen.'
),
('Vegane Tomatensuppe',
    'Eine cremige Suppe aus frischen Tomaten.',
    10, 20, 4, 150, 3, 20, 5, 'vegan', 'einfach',
    '1. Tomaten, Zwiebeln und Knoblauch hacken und in einem Topf anbraten.\n' ||
    '2. Mit Gemüsebrühe aufgießen und 15 Minuten köcheln lassen.\n' ||
    '3. Pürieren und mit Salz, Pfeffer und frischem Basilikum abschmecken.'
),
('Veganes Pad Thai',
    'Ein traditionelles Thai-Gericht mit Reisnudeln und Gemüse.',
    15, 10, 4, 400, 10, 60, 8, 'vegan', 'mittel',
    '1. Reisnudeln nach Packungsanweisung kochen.\n' ||
    '2. Tofu und Gemüse anbraten und mit Sojasauce und Limettensaft abschmecken.\n' ||
    '3. Nudeln hinzufügen und gut vermengen, mit Erdnüssen garnieren.'
),
('Vegane Falafel mit Hummus',
    'Hausgemachte Falafel-Bällchen mit Hummus.',
    20, 15, 4, 300, 12, 35, 12, 'vegan', 'mittel',
    '1. Kichererbsen, Zwiebeln, Knoblauch, Petersilie und Gewürze pürieren.\n' ||
    '2. Zu kleinen Bällchen formen und im Ofen backen oder frittieren.\n' ||
    '3. Mit Hummus und Fladenbrot servieren.'
),
('Veganer Burrito',
    'Ein mexikanischer Burrito mit Bohnen und Avocado.',
    10, 5, 2, 450, 15, 60, 15, 'vegan', 'einfach',
    '1. Tortilla mit Bohnen, Reis, Avocado und Salsa füllen.\n' ||
    '2. Zusammenrollen und servieren.'
),
('Veganer Burger mit schwarzen Bohnen',
    'Ein köstlicher und gesunder veganer Burger aus schwarzen Bohnen.',
    20, 15, 4, 350, 12, 45, 8, 'vegan', 'mittel',
    '1. Schwarze Bohnen abtropfen lassen und mit einer Gabel grob zerdrücken.\n' ||
    '2. Zwiebel, Knoblauch und Paprika fein hacken und in einer Pfanne mit etwas Öl anbraten.\n' ||
    '3. Bohnen, Haferflocken, Gewürze und angebratene Zwiebelmischung vermengen und gut durchkneten.\n' ||
    '4. Aus der Masse Burger-Patties formen und in der Pfanne mit etwas Öl von beiden Seiten anbraten.\n' ||
    '5. Auf Burger-Brötchen mit Salat, Tomate und veganer Mayonnaise servieren.'
),
('Veganer Süßkartoffel-Eintopf',
    'Ein herzhafter Eintopf mit Süßkartoffeln, schwarzen Bohnen und Gemüse.',
    15, 30, 4, 380, 10, 50, 8, 'vegan', 'mittel',
    '1. Zwiebel und Knoblauch hacken und in einem großen Topf mit etwas Öl anbraten.\n' ||
    '2. Süßkartoffeln schälen, würfeln und in den Topf geben.\n' ||
    '3. Gewürfelte Tomaten, Gemüsebrühe und schwarze Bohnen hinzufügen und 25 Minuten köcheln lassen.\n' ||
    '4. Mit Koriander und Limettensaft abschmecken und servieren.'
),
('Veganer Kichererbsen-Salat mit Avocado',
    'Ein frischer, proteinreicher Salat mit Kichererbsen und Avocado.',
    10, 0, 2, 300, 12, 40, 12, 'vegan', 'einfach',
    '1. Kichererbsen abspülen und mit gewürfelter Avocado, Gurke, Tomaten und roten Zwiebeln vermengen.\n' ||
    '2. Zitronensaft, Salz, Pfeffer und Olivenöl als Dressing hinzufügen.\n' ||
    '3. Gut vermischen und sofort servieren.'
),
('Veganer Blumenkohl-Kichererbsen-Tikka',
    'Ein aromatisches, indisch inspiriertes Blumenkohlgericht.',
    20, 25, 4, 320, 10, 45, 10, 'vegan', 'mittel',
    '1. Blumenkohlröschen und Kichererbsen mit Tikka-Gewürzen und etwas Olivenöl vermengen.\n' ||
    '2. Auf einem Backblech verteilen und bei 200°C für 20 Minuten rösten.\n' ||
    '3. Mit frischem Koriander und veganem Joghurt servieren.'
),
('Vegane Ofen-Kartoffeln mit Knoblauch-Kräuter-Sauce',
    'Knusprige Ofenkartoffeln mit einer hausgemachten Kräuter-Sauce.',
    15, 40, 4, 250, 5, 40, 8, 'vegan', 'einfach',
    '1. Kartoffeln in Spalten schneiden und mit Öl, Salz und Knoblauchpulver vermengen.\n' ||
    '2. Auf einem Backblech verteilen und bei 200°C für 40 Minuten rösten.\n' ||
    '3. Für die Sauce vegane Mayonnaise mit gehackten Kräutern und Zitronensaft vermengen.\n' ||
    '4. Die Kartoffeln mit der Kräuter-Sauce servieren.'
),
('Veganer Kürbis-Risotto',
    'Ein cremiger Risotto mit Kürbis und Salbei.',
    15, 30, 4, 380, 8, 50, 12, 'vegan', 'mittel',
    '1. Kürbis in kleine Würfel schneiden und in einer Pfanne mit Öl anbraten.\n' ||
    '2. Reis hinzufügen und kurz mitdünsten, dann mit Gemüsebrühe nach und nach ablöschen.\n' ||
    '3. 25 Minuten köcheln lassen, bis der Reis cremig ist.\n' ||
    '4. Mit frischem Salbei und Pfeffer abschmecken und servieren.'
),
('Vegane Ramen-Suppe mit Tofu',
    'Eine herzhafte Ramen-Suppe mit Tofu und Gemüse.',
    15, 15, 2, 350, 10, 40, 8, 'vegan', 'mittel',
    '1. Brühe in einem Topf erhitzen und Miso-Paste hinzufügen.\n' ||
    '2. Nudeln, Tofu, Pilze und Gemüse in die Brühe geben und 10 Minuten köcheln lassen.\n' ||
    '3. Mit frischem Koriander, Frühlingszwiebeln und Sesam servieren.'
),
('Vegane Buddha Bowl',
    'Eine bunte Schüssel voll mit Gemüse, Körnern und gesunden Fetten.',
    15, 0, 2, 450, 15, 60, 15, 'vegan', 'einfach',
    '1. Quinoa kochen und abkühlen lassen.\n' ||
    '2. Mit frischem Gemüse wie Avocado, Spinat, Tomaten und Karotten in einer Schüssel anrichten.\n' ||
    '3. Mit Tahini-Dressing beträufeln und mit Nüssen und Samen bestreuen.'
),
('Veganes Chili sin Carne',
    'Ein herzhaftes Chili ohne Fleisch mit Bohnen und Mais.',
    10, 30, 4, 380, 15, 50, 10, 'vegan', 'mittel',
    '1. Zwiebeln und Paprika anbraten, dann gewürfelte Tomaten und Gewürze hinzufügen.\n' ||
    '2. Kidneybohnen, schwarze Bohnen und Mais dazugeben und 20 Minuten köcheln lassen.\n' ||
    '3. Mit frischem Koriander servieren.'
),
('Veganer Zucchini-Nudelsalat',
    'Ein frischer Salat aus Zucchini-Nudeln und Gemüse.',
    10, 0, 2, 200, 6, 25, 8, 'vegan', 'einfach',
    '1. Zucchini mit einem Spiralschneider zu Nudeln verarbeiten.\n' ||
    '2. Mit Tomaten, Paprika und frischem Basilikum vermengen.\n' ||
    '3. Mit Olivenöl, Salz, Pfeffer und Zitronensaft abschmecken und servieren.'
),
('Veganes Gemüse-Sushi',
    'Hausgemachtes Sushi mit Avocado, Gurke und Karotten.',
    30, 0, 4, 300, 8, 50, 5, 'vegan', 'mittel',
    '1. Sushi-Reis nach Anleitung kochen und mit Reisessig vermengen.\n' ||
    '2. Nori-Blätter auslegen und Reis darauf verteilen.\n' ||
    '3. Mit Avocado, Gurke und Karotten belegen und aufrollen.\n' ||
    '4. In Stücke schneiden und mit Sojasauce servieren.'
),
('Vegane Pilz-Tacos',
    'Würzige Tacos gefüllt mit sautierten Pilzen und Gemüse.',
    10, 10, 4, 280, 6, 40, 10, 'vegan', 'einfach',
    '1. Pilze und Paprika in einer Pfanne mit etwas Öl anbraten.\n' ||
    '2. Mit Taco-Gewürz würzen und in Tortillas füllen.\n' ||
    '3. Mit Salat und Salsa garnieren und servieren.'
),
('Veganer Wrap mit Hummus und Gemüse',
    'Ein schneller Wrap gefüllt mit Hummus, Avocado und Gemüse.',
    5, 0, 2, 350, 8, 45, 12, 'vegan', 'einfach',
    '1. Wrap mit Hummus bestreichen und mit Avocado, Gurke und Karotten füllen.\n' ||
    '2. Zusammenrollen und servieren.'
),
('Vegane Quinoa-Gemüse-Bowl',
    'Eine bunte Bowl aus Quinoa, Avocado und Gemüse.',
    10, 0, 2, 400, 12, 55, 15, 'vegan', 'einfach',
    '1. Quinoa kochen und abkühlen lassen.\n' ||
    '2. Mit Avocado, Tomaten, Spinat und Tahini-Dressing in einer Schüssel anrichten.\n' ||
    '3. Mit Nüssen oder Samen bestreuen und genießen.'),
('Paleo Hähnchen-Gemüse-Pfanne',
    'Eine schmackhafte Pfanne mit Hähnchen, Paprika und Brokkoli.',
    10, 15, 4, 300, 25, 10, 15, 'paleo', 'einfach',
    '1. Hähnchenbrust in mundgerechte Stücke schneiden und in einer großen Pfanne mit etwas Olivenöl anbraten, bis es goldbraun ist.\n' ||
    '2. Paprika und Brokkoli klein schneiden und zum Hähnchen in die Pfanne geben.\n' ||
    '3. Unter Rühren 5-7 Minuten anbraten, bis das Gemüse weich, aber noch bissfest ist.\n' ||
    '4. Mit Salz, Pfeffer und frischen Kräutern wie Petersilie oder Koriander abschmecken.\n' ||
    '5. Sofort servieren und genießen.'
),
('Paleo Blumenkohlreis mit Garnelen',
    'Ein leichtes und gesundes Gericht mit Blumenkohlreis und saftigen Garnelen.',
    10, 15, 4, 250, 20, 12, 10, 'paleo', 'mittel',
    '1. Blumenkohl grob reiben, um eine reisähnliche Konsistenz zu erhalten.\n' ||
    '2. In einer Pfanne etwas Kokosöl erhitzen und den Blumenkohlreis darin 5 Minuten anbraten, bis er leicht goldbraun wird.\n' ||
    '3. Garnelen, Knoblauch und gehacktes Gemüse (z.B. Paprika, Zucchini) hinzufügen.\n' ||
    '4. Unter Rühren weitere 5 Minuten kochen, bis die Garnelen rosa und durchgegart sind.\n' ||
    '5. Mit Salz, Pfeffer und Limettensaft abschmecken und sofort servieren.'
),
('Paleo Beef Stir-Fry mit Gemüse',
    'Ein schnell zubereitetes Rindfleisch-Gemüse-Stir-Fry.',
    10, 10, 4, 350, 30, 15, 12, 'paleo', 'mittel',
    '1. Rindfleisch in dünne Streifen schneiden und in einer heißen Pfanne mit etwas Kokosöl scharf anbraten.\n' ||
    '2. Sobald das Fleisch gebräunt ist, herausnehmen und beiseite stellen.\n' ||
    '3. Gemüse wie Brokkoli, Paprika und Karotten in die Pfanne geben und 5 Minuten anbraten.\n' ||
    '4. Rindfleisch zurück in die Pfanne geben und alles gut durchmischen.\n' ||
    '5. Mit Salz, Pfeffer und einer Prise Ingwer abschmecken und sofort servieren.'
),
('Paleo Süßkartoffel-Lachs-Bowl',
    'Eine sättigende Bowl mit gebackener Süßkartoffel, Lachs und frischem Spinat.',
    15, 20, 2, 500, 35, 30, 20, 'paleo', 'mittel',
    '1. Süßkartoffel schälen und in Würfel schneiden. Diese auf einem Backblech verteilen und bei 180°C für 20 Minuten backen.\n' ||
    '2. Lachsfilet mit etwas Salz und Pfeffer würzen und in einer Pfanne mit Kokosöl braten, bis er goldbraun und gar ist.\n' ||
    '3. In einer Schüssel Spinat anrichten und gebackene Süßkartoffel und Lachs darauf legen.\n' ||
    '4. Mit Avocado und frischen Kräutern wie Dill garnieren und mit Zitronensaft beträufeln.'
),
('Paleo gefüllte Paprika mit Hackfleisch',
    'Paprika, gefüllt mit würzigem Hackfleisch, ideal als sättigende Mahlzeit.',
    15, 30, 4, 350, 25, 10, 15, 'paleo', 'mittel',
    '1. Paprika halbieren, entkernen und mit etwas Olivenöl bestreichen.\n' ||
    '2. In einer Pfanne Hackfleisch mit Zwiebeln und Knoblauch anbraten und mit Salz, Pfeffer und Kräutern wie Thymian und Rosmarin würzen.\n' ||
    '3. Die Hackfleischmischung in die Paprikahälften füllen und auf ein Backblech legen.\n' ||
    '4. Bei 180°C etwa 20 Minuten backen, bis die Paprika weich und die Füllung durchgegart ist.'
),
('Paleo Zoodles mit Pesto und Tomaten',
    'Frische Zucchini-Nudeln mit cremigem Pesto und Kirschtomaten.',
    10, 0, 2, 200, 5, 10, 15, 'paleo', 'einfach',
    '1. Zucchini mit einem Spiralschneider in dünne Nudeln schneiden.\n' ||
    '2. Zoodles mit frischem Basilikumpesto und halbierten Kirschtomaten vermengen.\n' ||
    '3. Optional mit gehackten Nüssen bestreuen und sofort servieren.'
),
('Paleo Lachs-Salat mit Avocado und Beeren',
    'Ein erfrischender Salat mit gegrilltem Lachs, Avocado und frischen Beeren.',
    10, 10, 2, 400, 25, 15, 20, 'paleo', 'einfach',
    '1. Lachs in einer Pfanne grillen oder backen, bis er zart und saftig ist.\n' ||
    '2. In einer Schüssel gemischten Salat, Avocado und eine Auswahl an frischen Beeren (z.B. Blaubeeren, Himbeeren) anrichten.\n' ||
    '3. Den gegrillten Lachs darauf legen und mit einem Dressing aus Olivenöl und Zitronensaft beträufeln.'
),
('Paleo Gemüsesuppe mit Hühnchen',
    'Eine leichte und wohltuende Gemüsesuppe mit zartem Hühnchen.',
    10, 25, 4, 200, 20, 15, 5, 'paleo', 'einfach',
    '1. Hühnchenbrust in kleine Würfel schneiden und in einem großen Topf mit etwas Olivenöl anbraten, bis sie goldbraun sind.\n' ||
    '2. Gemüse wie Karotten, Zucchini und Sellerie klein schneiden und zum Hühnchen hinzufügen.\n' ||
    '3. Mit Gemüsebrühe auffüllen und 20 Minuten köcheln lassen, bis das Gemüse weich ist.\n' ||
    '4. Mit frischen Kräutern wie Petersilie abschmecken.'
),
('Paleo Ei-Gemüse-Frühstücksmuffins',
    'Herzhafte Frühstücksmuffins mit Ei und frischem Gemüse.',
    10, 20, 4, 150, 10, 5, 10, 'paleo', 'einfach',
    '1. Verschiedenes Gemüse wie Paprika, Spinat und Zwiebeln klein schneiden.\n' ||
    '2. Die Eier in einer Schüssel verquirlen und das Gemüse unterrühren.\n' ||
    '3. Die Mischung in Muffinförmchen füllen und bei 180°C etwa 20 Minuten backen, bis die Muffins fest sind.\n' ||
    '4. Die Muffins warm oder kalt genießen.'
),
('Paleo Hackfleisch-Pfanne mit Spinat',
    'Eine schnelle Pfanne mit würzigem Hackfleisch und frischem Spinat.',
    10, 15, 4, 300, 25, 10, 15, 'paleo', 'einfach',
    '1. Hackfleisch in einer Pfanne mit etwas Olivenöl anbraten, bis es krümelig und durchgegart ist.\n' ||
    '2. Knoblauch und Zwiebeln hinzufügen und 3 Minuten mitbraten.\n' ||
    '3. Frischen Spinat einrühren und nur so lange garen, bis er zusammenfällt.\n' ||
    '4. Mit Salz, Pfeffer und Paprikapulver abschmecken.'
),('Paleo Hähnchen mit Süßkartoffeln und Gemüse',
    'Ein nährstoffreiches und köstliches Paleo-Gericht, das perfekt für eine ausgewogene Mahlzeit geeignet ist.',
    15, 40, 4, 600, 45, 50, 25, 'paleo', 'mittel',
    '1. Den Ofen auf 200°C vorheizen.\n' ||
    '2. Süßkartoffeln schälen und in gleichmäßige Würfel schneiden.\n' ||
    '3. Süßkartoffeln auf einem Backblech verteilen und mit Olivenöl, Salz, Pfeffer und Paprika würzen.\n' ||
    '4. Süßkartoffeln für ca. 25 Minuten im Ofen rösten, bis sie goldbraun sind.\n' ||
    '5. Hähnchenbrust in Streifen schneiden und mit Salz, Pfeffer und etwas Knoblauchpulver würzen.\n' ||
    '6. Eine Pfanne mit Olivenöl erhitzen und das Hähnchen darin 7-10 Minuten anbraten, bis es goldbraun ist.\n' ||
    '7. In einer weiteren Pfanne das Gemüse (z. B. Brokkoli, Karotten) anbraten, bis es bissfest ist.\n' ||
    '8. Alles zusammen auf einem Teller anrichten und servieren.'
),

('Paleo Lachs mit Avocado-Salat',
    'Lachsfilet, perfekt gewürzt und kombiniert mit einem frischen Avocado-Salat.',
    10, 15, 2, 500, 35, 10, 30, 'paleo', 'einfach',
    '1. Lachsfilets mit Olivenöl, Salz, Pfeffer und Zitronensaft würzen.\n' ||
    '2. Lachsfilets in einer heißen Pfanne auf jeder Seite 5-6 Minuten braten.\n' ||
    '3. Während der Lachs brät, die Avocado halbieren, den Kern entfernen und in kleine Stücke schneiden.\n' ||
    '4. Tomaten und Gurken in Würfel schneiden.\n' ||
    '5. Das Gemüse mit der Avocado in einer Schüssel vermengen.\n' ||
    '6. Mit Olivenöl, Zitronensaft, Salz und Pfeffer abschmecken.\n' ||
    '7. Den Lachs auf den Salat legen und servieren.'
),

('Paleo Zucchini-Nudeln mit Pesto',
    'Ein köstliches, kohlenhydratarmes Gericht aus Zucchini-Nudeln und selbstgemachtem Pesto.',
    10, 10, 2, 300, 12, 15, 20, 'paleo', 'einfach',
    '1. Zucchini mit einem Spiralschneider zu Nudeln verarbeiten.\n' ||
    '2. Für das Pesto frisches Basilikum, Knoblauch, Pinienkerne, Olivenöl und Salz in einem Mixer pürieren.\n' ||
    '3. Zucchini-Nudeln in einer heißen Pfanne mit etwas Olivenöl für 2-3 Minuten anbraten.\n' ||
    '4. Das Pesto zu den Zucchini-Nudeln in die Pfanne geben und gut vermengen.\n' ||
    '5. Die Nudeln auf Tellern anrichten und mit extra Pinienkernen und frischem Basilikum garnieren.\n' ||
    '6. Mit einem Spritzer Zitronensaft verfeinern und servieren.'
),

('Paleo Avocado-Eiersalat',
    'Ein erfrischender Eiersalat mit Avocado und einem leichten Dressing.',
    5, 0, 2, 350, 15, 10, 25, 'paleo', 'einfach',
    '1. Eine reife Avocado halbieren, den Kern entfernen und das Fruchtfleisch in Würfel schneiden.\n' ||
    '2. 4 hartgekochte Eier schälen und in kleine Stücke schneiden.\n' ||
    '3. Die Eier und Avocado in eine Schüssel geben und vorsichtig vermengen.\n' ||
    '4. Mit Zitronensaft, Salz und Pfeffer abschmecken.\n' ||
    '5. Optional: Einen Teelöffel Senf für extra Geschmack hinzufügen.\n' ||
    '6. Mit frischen Kräutern wie Petersilie oder Schnittlauch garnieren.\n' ||
    '7. Den Salat in kleinen Schalen anrichten und servieren.'
),

('Paleo Rindfleisch mit Brokkoli und Mandeln',
    'Rindfleisch, das perfekt mit Brokkoli und gerösteten Mandeln kombiniert wird.',
    15, 20, 3, 500, 40, 15, 25, 'paleo', 'mittel',
    '1. Rindfleisch in dünne Streifen schneiden und mit Salz, Pfeffer und einer Prise Chili würzen.\n' ||
    '2. Brokkoli in kleine Röschen teilen und in kochendem Wasser für 3-4 Minuten blanchieren.\n' ||
    '3. Eine Pfanne mit Olivenöl erhitzen und das Rindfleisch darin scharf anbraten.\n' ||
    '4. Sobald das Rindfleisch angebraten ist, den Brokkoli und eine Handvoll Mandeln hinzufügen.\n' ||
    '5. Weitere 3-4 Minuten anbraten, bis der Brokkoli leicht gebräunt und bissfest ist.\n' ||
    '6. Mit Tamari oder paleo-freundlicher Sojasauce abschmecken.\n' ||
    '7. Mit frischen Kräutern wie Koriander oder Petersilie garnieren und servieren.'
),

('Paleo Hähnchen-Curry mit Kokosmilch',
    'Ein würziges Curry mit zartem Hähnchen und cremiger Kokosmilch.',
    10, 30, 4, 550, 40, 20, 35, 'paleo', 'mittel',
    '1. Hähnchenbrust in kleine Stücke schneiden und mit Salz, Pfeffer und Kurkuma würzen.\n' ||
    '2. Zwiebeln und Knoblauch fein hacken und in einer heißen Pfanne mit etwas Olivenöl anbraten.\n' ||
    '3. Das Hähnchen dazugeben und rundherum anbraten, bis es goldbraun ist.\n' ||
    '4. Kokosmilch und Currypaste hinzufügen und gut verrühren.\n' ||
    '5. Das Curry bei niedriger Hitze 20 Minuten köcheln lassen, bis das Hähnchen durchgegart ist.\n' ||
    '6. Optional: Spinat oder anderes Gemüse hinzufügen und mit garen.\n' ||
    '7. Mit frischem Koriander garnieren und servieren.'
),

('Paleo Frühstücks-Bowl mit Beeren und Nüssen',
    'Eine nahrhafte Frühstücksbowl mit frischen Beeren und Nüssen.',
    5, 0, 1, 300, 10, 25, 20, 'paleo', 'einfach',
    '1. Eine Schale mit frischen Beeren (z. B. Himbeeren, Blaubeeren) füllen.\n' ||
    '2. Mandeln und Walnüsse grob hacken und gleichmäßig über die Beeren streuen.\n' ||
    '3. Einen Esslöffel Chiasamen und einen Teelöffel Kokosflocken hinzufügen.\n' ||
    '4. Mit etwas Honig oder Ahornsirup beträufeln.\n' ||
    '5. Optional: Einen Klecks Mandelbutter oder Joghurt auf die Bowl geben.\n' ||
    '6. Die Bowl mit einem Spritzer Zitronensaft und einem Hauch Zimt verfeinern.\n' ||
    '7. Mit frischen Kräutern wie Minze garnieren und genießen.'
),

('Paleo Tomaten-Basilikum-Suppe',
    'Eine einfache, aber leckere Tomatensuppe mit frischem Basilikum.',
    10, 30, 4, 250, 8, 20, 15, 'paleo', 'einfach',
    '1. Tomaten, Zwiebeln und Knoblauch in einem Topf mit etwas Olivenöl anbraten.\n' ||
    '2. Brühe und Gewürze wie Salz, Pfeffer und Oregano hinzufügen.\n' ||
    '3. 20 Minuten köcheln lassen, bis die Tomaten weich sind.\n' ||
    '4. Die Suppe mit einem Stabmixer pürieren, bis sie schön cremig ist.\n' ||
    '5. Mit frischem Basilikum garnieren.\n' ||
    '6. Optional: Einen Schuss Kokosmilch für extra Cremigkeit hinzufügen.\n' ||
    '7. Heiß servieren und genießen.'
),
('Paleo Bananen-Pfannkuchen',
    'Köstliche Pfannkuchen, die nur mit Bananen, Eiern und Kokosmehl zubereitet werden. Ein einfaches, glutenfreies Frühstücksgericht, das reich an Nährstoffen ist.',
    5, 10, 2, 350, 15, 30, 20, 'paleo', 'einfach',
    '1. Eine reife Banane schälen und mit einer Gabel in einer Schüssel gut zerdrücken, bis sie eine glatte Konsistenz hat.\n' ||
    '2. Zwei Eier in die zerdrückte Banane geben und gut vermengen, bis die Masse gleichmäßig ist.\n' ||
    '3. Einen Esslöffel Kokosmehl und eine Prise Backpulver hinzufügen und alles gut umrühren.\n' ||
    '4. Eine Pfanne bei mittlerer Hitze erhitzen und mit etwas Kokosöl oder Ghee einfetten.\n' ||
    '5. Einen Esslöffel der Pfannkuchenmasse in die Pfanne geben und in der Form eines kleinen Kreises ausbreiten.\n' ||
    '6. Den Pfannkuchen ca. 2-3 Minuten braten, bis die Ränder fest werden und die Unterseite goldbraun ist.\n' ||
    '7. Den Pfannkuchen vorsichtig wenden und auf der anderen Seite 1-2 Minuten weiter braten.\n' ||
    '8. Den Pfannkuchen auf einen Teller legen und nach Belieben mit frischen Beeren, Ahornsirup oder Kokosflocken garnieren. Sofort servieren.'
);