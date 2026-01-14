const express = require('express');
const pool = require('./db');
const app = express();

/**
 * PARTIE C: VARIABLES D'ENVIRONNEMENT
 * Tu dois afficher MESSAGE_BIENVENUE et DEBUG ici.
 */
app.get('/', (req, res) => {
  const message = process.env.MESSAGE_BIENVENUE;
  const debug = process.env.DEBUG;

  res.send(`
    <h1>${message}</h1>
    <p>Debug mode: ${debug}</p>
    <hr>
    <a href="/health">Santé</a> | <a href="/db">Base de données</a>
  `);
});

/**
 * PARTIE A: ROUTE /HEALTH
 */
app.get('/health', (req, res) => {
  res.json({ status: 'PAS OK' });
});

/**
 * PARTIE E: POSTGRESQL
 * Tu dois implémenter une lecture ou écriture en base.
 */
app.get('/db', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS visits (
        id SERIAL PRIMARY KEY,
        count INTEGER DEFAULT 0,
        last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = app;
