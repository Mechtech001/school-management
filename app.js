require('dotenv').config();
const express = require('express');
const app = express();
const myRoutes = require('./src/routes/schoolRoutes'); // imported routes
const theDb = require('./src/config/db');

// parse json stuff
app.use(express.json());

const path = require('path');

// basic landing page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/', myRoutes);

// catch all for errors
app.use(function (err, req, res, next) {
  console.log("got an error:", err.message);
  res.status(500).json({ error: "server messed up somewhere" });
});

const portNum = process.env.PORT || 3000;

async function startMyApp() {
  try {
    const conn = await theDb.getConnection();
    console.log('db connected fine');
    conn.release(); // dont forget to release

    app.listen(portNum, function() {
      console.log(`running on port ${portNum}`);
    });
  } catch (err) {
    console.error('db connection failed...', err.message);
    process.exit(1);
  }
}

startMyApp();
