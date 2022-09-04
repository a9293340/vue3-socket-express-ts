const mysql = require('mysql');
const config = require('./mysql.json')
const dbConnection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: 'demo'
});


dbConnection.connect((err) => {
    if(err) throw err;
    console.log('DB Connect Success!')
});


module.exports = dbConnection;