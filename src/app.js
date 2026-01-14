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
  res.json({ status: 'OK' });
});

/**
 * PARTIE E: POSTGRESQL
 * Tu dois implémenter une lecture ou écriture en base.
 */
app.get('/db', async (req, res) => {

  try {
    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT nb_visite FROM DB", function (err, result, fields) {
        if (err) throw err;
          const sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
          con.execute(`UPDATE DB SET nb_visite ${result}`);
      });
    });

    con.query("SELECT nb_visite FROM DB", function (err, result, fields) {
      if (err) throw err;
      res.send(`Route /db : site visiter ${result}.`);
    });

  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = app;
