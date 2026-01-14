require('dotenv').config();
const app = require('./src/app');
const port = process.env.PORT || 3000;


const mysql = require('mysql2');
const con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  con.query(`CREATE TABLE DB (nb_visite int)`, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
