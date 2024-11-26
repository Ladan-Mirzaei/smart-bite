 DROP TABLE IF EXISTS recipe_user_categories ;

CREATE TABLE recipe_user_categories (
    user_id INT REFERENCES recipe_user(id),
    category_id INT  REFERENCES recipe_categories(id) ,
   PRIMARY KEY (user_id, category_id)
);


