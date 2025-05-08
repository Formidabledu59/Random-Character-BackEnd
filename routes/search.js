const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/random-by-tag/:tag', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*
      FROM characters c
      JOIN character_tags ct ON c.id = ct.character_id
      JOIN tags t ON ct.tag_id = t.id
      WHERE t.name = ?
      ORDER BY RAND()
      LIMIT 1
    `, [req.params.tag]);

    if (rows.length === 0) {
      res.status(404).json({ message: 'Aucun résultat' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
