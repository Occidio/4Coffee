var express = require('express')
var app = express();
var swig  = require('swig');
var DBInterface = require('./DBInterface');

app.get('/GetGraph', function (req, res) {
	res.send("Hello World!");
});

app.post('/Log', function (req, res) {
	res.send("Success");
});

var server = app.listen(3000, function () {
	var host = "localhost"
	var port = server.address().port;

	var DB = new DBInterface();
	DB.CreateSchema();

	console.log("4Coffee listening at http://%s:%s", host, port);
});