const mysql = require('mysql2/promise');  // Utiliser la version promise de mysql2
require('dotenv').config();  // Charger les variables d'environnement

// Créer un pool de connexions (meilleure pratique pour les applications avec beaucoup de requêtes)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Fonction de test de connexion pour vérifier si la connexion à la base de données est réussie
async function testConnection() {
  try {
    const connection = await pool.getConnection();  // Obtenir une connexion du pool
    console.log('✅ Connecté à la base de données MySQL');
    connection.release();  // Libérer la connexion après l'utilisation
  } catch (err) {
    console.error('Erreur de connexion à la base de données :', err);
  }
}

// Tester la connexion à la base de données au démarrage
testConnection();

module.exports = pool;
