var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var connection = require('./db/db');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('Server is running on port ' + 3000);
  connection.connect(function (err) {
    if (err) throw err;
    console.log('Database connected!');
  });
});


app.post('/clients', (req, res) => {
  const { code, nom, prenom, email, telephone } = req.body;
  const query = 'INSERT INTO Client (code, nom, prenom, email, telephone) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [code, nom, prenom, email, telephone], (err, results) => {
    if (err) {
      console.error('Error adding new client:', err);
      // res.redirect('/error');
      return;
    }
    console.log('New client added:', results);
    // res.redirect('/clients');
  });
});

app.get('/clients', function (req, res) {
  var sql = "SELECT * FROM Client";
  connection.query(sql, function (err, results) {
    if (err) {
      console.error("Error fetching data: " + err.message);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});


app.get('/allVols', function (req, res) {
  var sql = "SELECT * FROM vol";
  connection.query(sql, function (err, results) {
    if (err) {
      console.error("Error fetching data: " + err.message);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});


app.post('/addVol', function (req, res) {
  var { numero, date, villeDepart, villeArrivee, heureDepart, heureArrivee, nombrePlaces } = req.body;
  var sql = "INSERT INTO vol (numero, date, villeDepart, villeArrivee, heureDepart, heureArrivee, nombrePlaces) VALUES (?, ?, ?, ?, ?, ?, ?)";
  var values = [numero, str_to_date(date), villeDepart, villeArrivee, heureDepart, heureArrivee, nombrePlaces];

  connection.query(sql, values, function (err, result) {
    if (err) {
      console.error("Error inserting data: " + err.message);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.status(201).send("Vol added successfully");
    res.redirect('/allVols');
  });
});



app.get('/reservations/new', (req, res) => {
  let clients, flights;
  connection.query('SELECT * FROM Client', (err, results) => {
    if (err) {
      console.error('Error fetching clients:', err);
      res.redirect('/error');
      return;
    }
    clients = results;
    connection.query('SELECT * FROM vol', (err, results) => {
      if (err) {
        console.error('Error fetching flights:', err);
        res.redirect('/error');
        return;
      }
      flights = results;
      res.render('newReservation', { clients, flights });
    });
  });
});


app.post('/reservations', (req, res) => {
  const { client_id, vol_id } = req.body;
  const query = 'INSERT INTO Reservation (client_id, vol_id) VALUES (?, ?)';
  connection.query(query, [client_id, vol_id], (err, results) => {
    if (err) {
      console.error('Error making reservation:', err);
      res.redirect('/error');
      return;
    }
    console.log('Reservation made:', results);
    res.redirect('/reservations');
  });
});


app.get('/payment', (req, res) => {
  res.render('payment');
});
