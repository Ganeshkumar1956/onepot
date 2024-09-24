const db=require('../config/database');

exports.createTag = (req, res) => {
    const { tag_name } = req.body;
    if (!tag_name) {
        return res.status(400).json({ error: "Tag name is required" });
    }
    const sql = `INSERT INTO Tags (tag_name) VALUES (?)`;
    db.run(sql, [tag_name], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ tag_id: this.lastID, tag_name });
    });
};


exports.getRecipeByTag = (req, res) => {
    const {tag_name}=req.params;
    db.get(`SELECT tag_id FROM Tags WHERE tag_name=?`, [tag_name], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "Tag not found" });
        }
        const tag_id = row.tag_id;
        const insertRecipeTagSql = `SELECT recipe_id FROM RecipeTags WHERE tag_id=?`;

        db.all(insertRecipeTagSql, [tag_id], function (err,rows) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json(rows);
        });
        
    });
};

exports.addRecipeTag = (req, res) => {
    const { tag_name,recipe_id } = req.body;
    const getTagIdSql = `SELECT tag_id FROM Tags WHERE tag_name = ?`;

    db.get(getTagIdSql, [tag_name], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "Tag not found" });
        }
        const tag_id = row.tag_id;
        const insertRecipeTagSql = `INSERT INTO RecipeTags (recipe_id, tag_id) VALUES (?, ?)`;

        db.run(insertRecipeTagSql, [recipe_id, tag_id], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(201).json({ message: "Tag added to recipe successfully" });
        });
    });
};
