var mysql = require('mysql');

console.log('Get connection ...');

var conn = mysql.createConnection({
    database: 'mysql',
    host: "localhost",
    user: "root",
    password: ""
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    conn.query("SELECT * FROM db", function (err, result) {
        if(err) throw err;
        console.log(result)
    })
});