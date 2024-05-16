const mysql = require('mysql');
const config = require('../config/config').db;

console.log('STARTING CONNECTION TO THE DB');
const pool = mysql.createPool({
    connectionLimit: config.connectionLimit,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
});
// Can be moved to an .sql file called 'dbSetup' and executed on server start
const createOrdersTable = `
CREATE TABLE IF NOT EXISTS orders (
    orderId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(255) NOT NULL
);
`;

pool.query(createOrdersTable, (err) => {
    if (err) {
        console.error("Failed to create 'orders' table:", err);
        return;
    }
    console.log("'orders' table created or already exists.");
});

module.exports = pool;