-- INSERT INTO recipe (user_id, title, description, preparation_time, cooking_time, portions, category_id, difficulty_level, created_at, image)
-- VALUES
--     (4, 'Mexikanisches Chili', 'Ein würziges, veganes Chili mit schwarzen Bohnen, Paprika und Tomaten.', 30, 60, 4, 1, 'einfach', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/bwjlm8lgjc0ai8b13vp1.avif'),
--     (5, 'Indisches Butterhähnchen', 'Cremiges Curry mit Hähnchen in einer gewürzten Tomaten-Butter-Sauce.', 25, 45, 4, 2, 'schwer', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/y5cp9o7j2vtcqp0jjnko.avif'),
--     (4, 'Thailändisches Pad Thai', 'Ein vegetarisches Nudelgericht mit Erdnüssen, Tofu und Limettensaft.', 20, 30, 3, 3, 'einfach', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/ql3es1mctymvt4nrvyck.avif'),
--     (5, 'Japanisches Sushi', 'Sushi-Rollen mit Lachs, Avocado und Gurke, perfekt für Pescatarianer.', 50, 0, 2, 4, 'schwer', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/fish-vegetables.jpg'),
--     (4, 'Französisches Ratatouille', 'Ein veganes Gemüseeintopf-Rezept aus Zucchini, Paprika und Auberginen.', 15, 40, 4, 5, 'mittel', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/fish-vegetables.jpg'),
--     (5, 'Griechischer Moussaka', 'Ein keto-freundlicher Auberginenauflauf mit Hackfleisch und einer cremigen Soße.', 30, 60, 6, 6, 'schwer', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/ncagkh2zpgjkrsyxqc4y.webp'),
--     (4, 'Spanische Paella', 'Low-Carb-Paella mit Blumenkohlreis, Meeresfrüchten und Safran.', 20, 50, 4, 7, 'mittel', CURRENT_DATE, 'paella.jpg'),
--     (5, 'Koreanisches Bibimbap', 'Ein vegetarisches Reisgericht mit Gemüse, Pilzen und einem würzigen Gochujang-Dressing.', 25, 10, 2, 8, 'mittel', CURRENT_DATE, ''),
--     (4, 'Vietnamesische Pho', 'Eine Paleo-Rindfleisch-Suppe mit Kräutern und Reisnudeln.', 40, 120, 6, 9, 'schwer', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/fish-vegetables.jpg'),
--     (5, 'Türkisches Lahmacun', 'Ein flaches Teiggericht mit würziger Fleischfüllung, perfekt für Fleischliebhaber.', 15, 20, 4, 10, 'mittel', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/fish-vegetables.jpg'),
--     (4, 'Libanesisches Falafel', 'Knusprige vegane Kichererbsenbällchen mit Tahini-Dip.', 20, 15, 4, 11, 'einfach', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/fish-vegetables.jpg'),
--     (5, 'Brasilianisches Moqueca', 'Ein Fisch-Eintopf mit Kokosmilch, Paprika und Tomaten.', 30, 25, 4, 12, 'mittel', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/fish-vegetables.jpg'),
--     (4, 'Marokkanischer Couscous', 'Ein vegetarisches Gericht mit Kichererbsen, Rosinen und Gewürzen.', 20, 15, 6, 13, 'einfach', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/fish-vegetables.jpg'),
--     (5, 'Karibisches Jerk-Hähnchen', 'Ein würziges Paleo-Hähnchengericht mit karibischen Aromen.', 25, 45, 4, 14, 'schwer', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/fish-vegetables.jpg'),
--     (4, 'Äthiopisches Injera', 'Ein veganes Sauerteig-Fladenbrot mit würzigem Linsen-Wat.', 50, 30, 4, 15, 'mittel', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/fish-vegetables.jpg'),
--     (5, 'Russische Pelmeni', 'Teigtaschen mit Fleischfüllung, serviert mit saurer Sahne.', 40, 20, 4, 16, 'schwer', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/fish-vegetables.jpg'),
--     (4, 'Philippinisches Adobo', 'Ein würziges Fleischgericht mit Sojasoße, Essig und Knoblauch.', 20, 50, 4, 17, 'mittel', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/fish-vegetables.jpg'),
--     (5, 'Amerikanische BBQ-Rippchen', 'Keto-Rippchen mit einer rauchigen BBQ-Marinade.', 20, 120, 4, 18, 'schwer', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/breakfast.jpg'),
--     (4, 'Mediterrane Gemüsepfanne', 'Ein veganes, low-carb Gericht mit Zucchini, Auberginen und Oliven.', 15, 25, 3, 19, 'einfach', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/fish-vegetables.jpg'),
--     (5, 'Kubanisches Ropa Vieja', 'Ein Fleischgericht mit Paprika, Tomaten und Gewürzen.', 30, 90, 4, 20, 'schwer', CURRENT_DATE, 'https://res.cloudinary.com/dxneunm1q/image/upload/v1733394868/fish-vegetables.jpg');