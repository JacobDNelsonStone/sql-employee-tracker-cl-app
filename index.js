const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'iwritegoodcode',
    database: 'employeedata_db'
  },
  console.log(`Connected to the employeedata_db database.`)
);

