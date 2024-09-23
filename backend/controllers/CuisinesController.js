const db = require('../config/database');

// Create Cuisine
exports.createCuisine = (req, res) => {
    const { name, description } = req.body;
    const sql = `INSERT INTO Cuisines (name, description) VALUES (?, ?)`;

    db.run(sql, [name, description], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ cuisine_id: this.lastID });
    });
};

// Get All Cuisines
exports.getAllCuisines = (req, res) => {
    db.all(`SELECT * FROM Cuisines`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(rows);
    });
};

// Get Cuisine by ID
exports.getCuisineById = (req, res) => {
    const { cuisine_id } = req.params;

    db.get(`SELECT * FROM Cuisines WHERE cuisine_id = ?`, [cuisine_id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Cuisine not found' });
        }
        return res.status(200).json(row);
    });
};

// Update Cuisine
exports.updateCuisine = (req, res) => {
    const { cuisine_id, name, description } = req.body;
    const sql = `UPDATE Cuisines SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE cuisine_id = ?`;

    db.run(sql, [name, description, cuisine_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ changes: this.changes });
    });
};

// Delete Cuisine
exports.deleteCuisine = (req, res) => {
    const { cuisine_id } = req.params;

    db.run(`DELETE FROM Cuisines WHERE cuisine_id = ?`, cuisine_id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ changes: this.changes });
    });
};
