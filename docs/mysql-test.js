const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pgd_development'
});
connection.connect((err) => {
    if (err) throw err;
console.log('Connected!');
});
