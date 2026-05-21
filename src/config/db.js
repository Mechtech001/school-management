const mysql = require('mysql2/promise');
require('dotenv').config(); // needed this here too to be safe

// creating connection pool
const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // 10 should be enough I think
  queueLimit: 0
});

module.exports = dbPool;
