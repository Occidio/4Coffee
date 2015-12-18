var express = require('express')
var app = express();
var swig  = require('swig');
var DBInterface = require('./DBInterface');
var http = require('http');
var fs = require('fs');

app.get('/GetGraph', function (req, response) {
	response.header("Access-Control-Allow-Origin", "*");

	var DB = new DBInterface();
	DB.GetGraphData(function(averages, dates){
		for (var i = 0; i < 36; i++)
    		averages.push(Math.random() * 50);
    	for (var i = 0; i < 36; i++)
    		dates.push(Math.random() * 50);

		console.log("Averages " + averages);
		console.log("Data " + dates);

		var result = JSON.stringify([averages,dates]);

        response.write(result);
        response.end();
	});
});


app.get('/Log', function (req, res) {
	var DB = new DBInterface();

	actualTime = new Date();
	queueTime = 5;
	cardMachineWorking = 1;
	coffeeMachineWorking = 0;

	DB.InsertLog(actualTime, queueTime, cardMachineWorking, coffeeMachineWorking);

	res.send("success")
});


var server = app.listen(3000, function () {
	var host = "localhost"
	var port = server.address().port;

	var DB = new DBInterface();
	DB.CreateSchema();
});