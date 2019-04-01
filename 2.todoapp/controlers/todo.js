var mysql = require('mysql');

console.log('Get connection ...');

var conn = mysql.createConnection({
    database: 'todo',
    host: "localhost",
    user: "root",
    password: ""
});

module.exports = function (app) {
    console.log('module controllers')
    app.get('/todo', function (req, res) {
        conn.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            conn.query("SELECT * FROM list", function (err, result) {
                if(err) throw err;
                res.render('todo', {todos: result})
            })
        });

    });
    app.post('/todo', function (req, res) {
        conn.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO list (id, name, status) VALUES (1, 'Company Inc', '0')";
            conn.query(sql, function (err, result) {
                if(err) throw err;
                res.render('todo', {todos: result})
            })
        })
    });
    app.delete('/todo', function (req, res) {

    });
}