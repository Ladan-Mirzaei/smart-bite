SELECT id, name
FROM recipe_ingredient
WHERE LOWER(name) IN ('bio', 'frische', 'ei');