const mysql = require('mysql');
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'eric',
    password: 'a9293340A',
    database: 'demo'
});


dbConnection.connect((err) => {
    if(err) throw err;
    console.log('DB Connect Success!')
});


module.exports = dbConnection;