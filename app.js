const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/characters', require('./routes/characters'));
app.use('/tags', require('./routes/tags'));
app.use('/character-tags', require('./routes/characterTags'));
app.use('/search', require('./routes/search'));
app.use('/trigger', require('./routes/trigger'));

app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));
