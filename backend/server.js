const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('recipes.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    image TEXT,
    ingredients TEXT,
    instructions TEXT,
    liked BOOLEAN
  )`);
});

app.get('/recipes', (req, res) => {
  db.all('SELECT * FROM recipes', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

app.get('/favorites', (req, res) => {
  db.all('SELECT * FROM recipes WHERE liked=true', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

app.post('/recipes', (req, res) => {
  const { name, poster, image, ingredients, instructions, liked } = req.body;
  db.run(`INSERT INTO recipes (name, image, ingredients, instructions, liked) VALUES (?, ?, ?, ?, ?)`,
    [name, image, ingredients, instructions, liked], function(err) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(201).json({ id: this.lastID });
      }
  });
});

app.delete('/recipes/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM recipes WHERE id = ?`, id, function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(204).send();
    }
  });
});

app.put('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const { liked } = req.body;
  db.run(`UPDATE recipes SET liked = ? WHERE id = ?`, [liked, id], function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(204).send();
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
