var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var swig  = require('swig');
var DBInterface = require('./DBInterface');
var http = require('http');
var fs = require('fs');

app.use(express.static('website'));
app.use(bodyParser());

app.get('/GetGraph', function (req, response) {
	response.header("Access-Control-Allow-Origin", "*");

	var DB = new DBInterface();
	DB.GetGraphData(req.query.Day, function(averages, dates){

		var result = JSON.stringify([averages,dates]);

        response.write(result);
        response.end();
	});
});


app.post('/Log', function (req, res) {
	var DB = new DBInterface();

	DB.InsertLog(new Date(req.body.Time), req.body.ApproxTime, req.body.CardMachine, req.body.CoffeeMachine);

	res.redirect("/index.html");
});


var server = app.listen(3000, function () {
	var host = "localhost"
	var port = server.address().port;

	var DB = new DBInterface();
	DB.CreateSchema();
});