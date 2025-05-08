const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyTrigger = require('../middlewares/verifyTrigger');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tags');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', verifyTrigger, async (req, res) => {
  const { name } = req.body;
  try {
    const [result] = await db.query('INSERT INTO tags (name) VALUES (?)', [name]);
    res.json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', verifyTrigger, async (req, res) => {
  try {
    await db.query('DELETE FROM tags WHERE id = ?', [req.params.id]);
    res.json({ message: 'Tag supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
