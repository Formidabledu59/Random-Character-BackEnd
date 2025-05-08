const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyTrigger = require('../middlewares/verifyTrigger');

router.post('/', verifyTrigger, async (req, res) => {
  const { character_id, tag_id } = req.body;
  try {
    await db.query(
      'INSERT INTO character_tags (character_id, tag_id) VALUES (?, ?)',
      [character_id, tag_id]
    );
    res.json({ character_id, tag_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/', verifyTrigger, async (req, res) => {
  const { character_id, tag_id } = req.body;
  try {
    await db.query(
      'DELETE FROM character_tags WHERE character_id = ? AND tag_id = ?',
      [character_id, tag_id]
    );
    res.json({ message: 'Lien supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
