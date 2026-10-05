const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'senai',
    database: 'estoque_db',
    connectionLimit: 5
});

module.exports = pool;