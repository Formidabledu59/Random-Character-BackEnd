const db = require('../db');
const bcrypt = require('bcrypt');

async function verifyTrigger(req, res, next) {
  const { trigger } = req.body;

  if (!trigger) {
    return res.status(401).json({ error: 'Trigger word requis.' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM trigger_words');
    for (const row of rows) {
      if (await bcrypt.compare(trigger, row.hash)) {
        return next();
      }
    }
    res.status(403).json({ error: 'Trigger word invalide.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur de vérification du trigger.' });
  }
}

module.exports = verifyTrigger;
