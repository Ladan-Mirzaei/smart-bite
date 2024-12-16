SELECT 
    name,
    COUNT(*) AS duplicate_count
FROM 
    recipe_ingredient
GROUP BY 
    name
HAVING 
    COUNT(*) > 1;
    DELETE FROM recipe_ingredient
WHERE id NOT IN (
    SELECT MIN(id)
    FROM recipe_ingredient
    GROUP BY name
);
