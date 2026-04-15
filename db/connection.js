const mysql = require('mysql2')

const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Теперь равно 'db'
  user: process.env.DB_USER,       // Теперь равно 'my_user'
  password: process.env.DB_PASSWORD, // Теперь равно 'my_password'
  database: process.env.DB_NAME,   // Теперь равно 'my_database'
  port: process.env.DB_PORT        // Теперь равно 3306
});

const promisePool = pool.promise();

module.exports = promisePool;