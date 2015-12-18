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

		console.log("Averages " + averages);
		console.log("Data " + dates);

		var result = JSON.stringify([averages,dates]);

        response.write(result);
        response.end();
	});
});


app.post('/Log', function (req, res) {
	var DB = new DBInterface();

	console.log("req " + req.body);

	actualTime = new Date(req.body.Time);
	queueTime = req.body.ApproxTime;
	cardMachineWorking = req.body.CardMachine;
	coffeeMachineWorking = req.body.CoffeeMachine;

	console.log("actualTime " + actualTime);

	DB.InsertLog(actualTime, queueTime, cardMachineWorking, coffeeMachineWorking);

	res.redirect("/index.html");
});


var server = app.listen(3000, function () {
	var host = "localhost"
	var port = server.address().port;

	var DB = new DBInterface();
	DB.CreateSchema();
});