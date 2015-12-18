var express = require('express')
var app = express();
var swig  = require('swig');
var DBInterface = require('./DBInterface');
var http = require('http');
var fs = require('fs');

app.get('/GetGraph', function (req, response) {
	fs.readFile('Graph/graph.html', 'utf-8', function (err, data) {
	        response.writeHead(200, { 'Content-Type': 'text/html' });

	        var averageData = [];
	        var todayData = [];

        	var DB = new DBInterface();
			DB.GetGraphData(function(averages, data){
				console.log("Averages "+averages);
				console.log("Data " + data);

				data = data.toString('utf8').replace('{{averageData}}', JSON.stringify(averages));
	        	var result = data.toString('utf8').replace('{{todayData}}', JSON.stringify(data));

		        response.write(result);
		        response.end();
			});
	        
	        
    	});
});

app.post('/Log', function (req, res) {
	res.send("Success");
});

var server = app.listen(3000, function () {
	var host = "localhost"
	var port = server.address().port;

	var DB = new DBInterface();
	DB.CreateSchema();
});