const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;  // Utilisation de la variable d'environnement PORT si définie, sinon port 3000

app.use(cors());
app.use(express.json());

app.use('/characters', require('./routes/characters'));
app.use('/tags', require('./routes/tags'));
app.use('/character-tags', require('./routes/characterTags'));
app.use('/search', require('./routes/search'));
app.use('/trigger', require('./routes/trigger'));


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });