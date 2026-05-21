require('dotenv').config();
const express = require('express');
const app = express();
const myRoutes = require('./src/routes/schoolRoutes'); // imported routes
const theDb = require('./src/config/db');

// parse json stuff
app.use(express.json());

// basic landing page
app.get('/', function(req, res) {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>School Management API</title>
      <style>
        body { font-family: sans-serif; background-color: #f4f4f9; color: #333; padding: 20px; max-width: 800px; margin: 0 auto; }
        h1 { color: #222; }
        .endpoint { background: #e2e2e2; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
        code { font-family: monospace; font-size: 1.1em; color: #b30000; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>School Management API</h1>
      <p>A simple api I threw together to manage schools and find them by distance.</p>
      
      <h2>Available Endpoints:</h2>
      
      <div class="endpoint">
        <p><strong>Add a School</strong></p>
        <p><code>POST /addSchool</code></p>
        <p>Body: <code>{ "name": "...", "address": "...", "latitude": 12.34, "longitude": 56.78 }</code></p>
      </div>

      <div class="endpoint">
        <p><strong>List Schools (Sorted by distance)</strong></p>
        <p><code>GET /listSchools?latitude=12.34&longitude=56.78</code></p>
      </div>
    </body>
    </html>
  `);
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
