const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3001;
const db = new sqlite3.Database('./expenses.db');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    db.all('SELECT * FROM expenses', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });
  
  app.post('/expenses', (req, res) => {
    const { title, amount, date } = req.body;
    db.run(
      'INSERT INTO expenses (title, amount, date) VALUES (?, ?, ?)',
      [title, amount, date],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
      }
    );
  });
  
  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM expenses WHERE id = ?', id, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Expense deleted successfully' });
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
