const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// Création libre d’un trigger word
router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Trigger requis.' });

  try {
    const hash = await bcrypt.hash(text, 10);
    await db.query('INSERT INTO trigger_words (hash) VALUES (?)', [hash]);
    res.json({ message: 'Trigger word créé.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
