const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyTrigger = require('../middlewares/verifyTrigger');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM characters');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM characters WHERE id = ?', [req.params.id]);
    res.json(rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', verifyTrigger, async (req, res) => {
  const { name, img_path, description } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO characters (name, img_path, description) VALUES (?, ?, ?)',
      [name, img_path, description]
    );
    res.json({ id: result.insertId, name, img_path, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', verifyTrigger, async (req, res) => {
  const { name, img_path, description } = req.body;
  try {
    await db.query(
      'UPDATE characters SET name = ?, img_path = ?, description = ? WHERE id = ?',
      [name, img_path, description, req.params.id]
    );
    res.json({ id: req.params.id, name, img_path, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', verifyTrigger, async (req, res) => {
  try {
    await db.query('DELETE FROM characters WHERE id = ?', [req.params.id]);
    res.json({ message: 'Personnage supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
