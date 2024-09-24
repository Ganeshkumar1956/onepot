const db = require('../config/database');

exports.createRecipe = async (req, res) => {
    const { user_id, title, description, ingredients, instructions, prep_time, cook_time, image_url, cuisine_id } = req.body;

    const sql = `INSERT INTO Recipes (user_id, title, description, instructions, prep_time, cook_time, total_time, image_url, cuisine_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        // Inserting the recipe
        db.run(sql, [user_id, title, description, instructions, prep_time, cook_time, prep_time + cook_time, image_url, cuisine_id], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const recipeId = this.lastID;
            
            // If no ingredients were provided, send a response
            if (!ingredients || ingredients.length === 0) {
                return res.status(201).json({ recipe_id: recipeId });
            }

            // Prepare the ingredient insert query
            const recing = "INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?)";

            // Loop through ingredients and insert them
            const promises = ingredients.map(ing => {
                return new Promise((resolve, reject) => {
                    db.run(recing, [recipeId, ing.ingredient_id, ing.quantity, ing.unit], (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            });

            // Wait for all ingredient inserts to complete
            Promise.all(promises)
                .then(() => {
                    return res.status(201).json({ recipe_id: recipeId });
                })
                .catch(err => {
                    return res.status(500).json({ error: err.message });
                });
        });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};


// Get All Recipes
exports.getAllRecipes = (req, res) => {
    const sql = `
        SELECT r.recipe_id, r.title, r.description, r.instructions, r.prep_time, r.cook_time, r.image_url, r.cuisine_id,
               ri.ingredient_id, ri.quantity, ri.unit, i.name as ingredient_name
        FROM Recipes r
        LEFT JOIN RecipeIngredients ri ON r.recipe_id = ri.recipe_id
        LEFT JOIN Ingredients i ON ri.ingredient_id = i.ingredient_id
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Organize the data by recipe
        const recipes = {};

        rows.forEach(row => {
            const recipeId = row.recipe_id;

            // If the recipe doesn't exist yet, create it
            if (!recipes[recipeId]) {
                recipes[recipeId] = {
                    recipe_id: recipeId,
                    title: row.title,
                    description: row.description,
                    instructions: row.instructions,
                    prep_time: row.prep_time,
                    cook_time: row.cook_time,
                    image_url: row.image_url,
                    cuisine_id: row.cuisine_id,
                    ingredients: []
                };
            }

            // Add the ingredient if it exists (handles cases where no ingredients are associated)
            if (row.ingredient_id) {
                recipes[recipeId].ingredients.push({
                    ingredient_id: row.ingredient_id,
                    name: row.ingredient_name,
                    quantity: row.quantity,
                    unit: row.unit
                });
            }
        });

        // Convert the recipes object to an array
        const result = Object.values(recipes);

        return res.status(200).json(result);
    });
};


exports.getRecipeById = (req, res) => {
    const { recipe_id } = req.params;

    const sql = `
        SELECT r.recipe_id, r.title, r.description, r.instructions, r.prep_time, r.cook_time, r.image_url, r.cuisine_id,
               ri.ingredient_id, ri.quantity, ri.unit, i.name as ingredient_name
        FROM Recipes r
        LEFT JOIN RecipeIngredients ri ON r.recipe_id = ri.recipe_id
        LEFT JOIN Ingredients i ON ri.ingredient_id = i.ingredient_id
        WHERE r.recipe_id = ?
    `;

    db.all(sql, [recipe_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // If the recipe is not found
        if (rows.length === 0) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        // Organize the data for the recipe
        const recipe = {
            recipe_id: rows[0].recipe_id,
            title: rows[0].title,
            description: rows[0].description,
            instructions: rows[0].instructions,
            prep_time: rows[0].prep_time,
            cook_time: rows[0].cook_time,
            image_url: rows[0].image_url,
            cuisine_id: rows[0].cuisine_id,
            ingredients: []
        };

        // Add ingredients to the recipe
        rows.forEach(row => {
            if (row.ingredient_id) {
                recipe.ingredients.push({
                    ingredient_id: row.ingredient_id,
                    name: row.ingredient_name,
                    quantity: row.quantity,
                    unit: row.unit
                });
            }
        });

        return res.status(200).json(recipe);
    });
};


// Update Recipe
exports.updateRecipe = (req, res) => {
    const {recipe_id}=req.params;
    const {title, description, image_url,instructions } = req.body;
    const sql = `UPDATE Recipes SET title = ?, description = ?,instructions=?, image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE recipe_id = ?`;
    
    db.run(sql, [title, description,instructions, image_url, recipe_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ changes: this.changes });
    });
};

exports.deleteRecipe = (req, res) => {
    const { recipe_id } = req.params;
    
    db.run(`DELETE FROM Recipes WHERE recipe_id = ?`, recipe_id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ changes: this.changes });
    });
};
