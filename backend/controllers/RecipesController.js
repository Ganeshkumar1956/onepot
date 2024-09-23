const db = require('../config/database');

// Create Recipe
exports.createRecipe = (req, res) => {
    const { user_id, title, description, ingredients, instructions, prep_time, cook_time, image_url, cuisine_id } = req.body;
    const sql = `INSERT INTO Recipes (user_id, title, description, ingredients, instructions, prep_time, cook_time,total_time, image_url, cuisine_id) VALUES (?, ?, ?,? , ?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [user_id, title, description, ingredients, instructions, prep_time, cook_time, prep_time+cook_time,image_url, cuisine_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ recipe_id: this.lastID });
    });
};

// Get All Recipes
exports.getAllRecipes = (req, res) => {
    db.all(`SELECT * FROM Recipes`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(rows);
    });
};

exports.getRecipeById = (req, res) => {
    const {recipe_id}=req.params;
    db.all(`SELECT * FROM Recipes WHERE recipe_id=recipe_id`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(rows);
    });
};

// Update Recipe
exports.updateRecipe = (req, res) => {
    const {recipe_id}=req.params;
    const {title, description, image_url } = req.body;
    const sql = `UPDATE Recipes SET title = ?, description = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE recipe_id = ?`;
    
    db.run(sql, [title, description, image_url, recipe_id], function (err) {
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
