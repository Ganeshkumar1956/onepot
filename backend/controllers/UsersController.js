const db = require('../config/database');
const crypto = require('crypto');

// Create User
exports.createUser = (req, res) => {
    const { username, email, password, profile_picture_url } = req.body;
    const password_hash=crypto.createHash('md5').update(password).digest('hex');
    const sql = `INSERT INTO Users (username, email, password_hash, profile_picture_url) VALUES (?, ?, ?, ?)`;
    
    db.run(sql, [username, email, password_hash, profile_picture_url], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ user_id: this.lastID });
    });
};

exports.AuthUser=(req,res)=>{
    const { username, password } = req.body;
    const hashedPassword =crypto.createHash('md5').update(password).digest('hex');
    db.get('SELECT * FROM Users WHERE username = ? AND password_hash = ?', [username, hashedPassword], (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (!user) {
            return res.status(400).json({ message: 'Incorrect username or password' });
        }
        return res.status(200).send("Authenticated Successfully");
    });
}

// Get All Users
exports.getUsers = (req, res) => {
    db.all(`SELECT * FROM Users`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(rows);
    });
};

exports.getUserById = (req, res) => {
    const {user_id}=req.params;
    db.all(`SELECT * FROM Users WHERE user_id=?`, [user_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(rows);
    });
};

// Update User
exports.updateUser = (req, res) => {
    const {user_id}=req.params;
    const {username, email, profile_picture_url } = req.body;
    const sql = `UPDATE Users SET username = ?, email = ?, profile_picture_url = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?`;
    
    db.run(sql, [username, email, profile_picture_url, user_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ changes: this.changes });
    });
};

// Delete User
exports.deleteUser = (req, res) => {
    const { user_id } = req.params;
    
    db.run(`DELETE FROM Users WHERE user_id = ?`, user_id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ changes: this.changes });
    });
};
