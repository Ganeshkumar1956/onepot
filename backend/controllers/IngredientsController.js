const db = require('../config/database');

exports.createIngredient = (req, res) => {
    const { name } = req.body;
    const sql = `INSERT INTO Ingredients (name) VALUES (?)`;

    db.run(sql, [name], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ ingredient_id: this.lastID });
    });
};

exports.getAllIngredients = (req, res) => {
    db.all(`SELECT * FROM Ingredients`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(rows);
    });
};

exports.getIngredientById = (req, res) => {
    const { ingredient_id } = req.params;

    db.get(`SELECT * FROM Ingredients WHERE ingredient_id = ?`, [ingredient_id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        return res.status(200).json(row);
    });
};

exports.updateIngredient = (req, res) => {
    const { ingredient_id, name, description } = req.body;
    const sql = `UPDATE Ingredients SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE ingredient_id = ?`;

    db.run(sql, [name, description, ingredient_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ changes: this.changes });
    });
};

exports.deleteIngredient = (req, res) => {
    const { ingredient_id } = req.params;

    db.run(`DELETE FROM Ingredients WHERE ingredient_id = ?`, ingredient_id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ changes: this.changes });
    });
};
