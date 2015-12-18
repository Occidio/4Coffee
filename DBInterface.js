var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TestDatabase');

var method = DBInterface.prototype;

function DBInterface(){

}

method.CreateSchema = function() {
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS Log (DateCreated DATETIME, Time INT, QueueTime INT, CardMachine INT, CoffeeMachine INT);");

		db.run("CREATE TABLE IF NOT EXISTS Summary (Day INT, Time INT, CurrentAverage INT DEFAULT(0), NumberOfLogs INT DEFAULT(0));");

		db.each("SELECT Count(*) as Count FROM Summary",function(err, row){
			if(err){
		  		console.log(err);
	  			//break out
			}
			else{
				if(row.Count == 0)
				{
					for (var i = 0; i <= 4; i++) //loop for each day as an int (dont care about weekend)
					{	
	  					console.log("Inserting for " + i);
		  				method.AddSummaryTimes(i);
		  			}
				}
			}
		});
		
	});
}

method.AddSummaryTimes = function(day)
{
	//OH GOD PLEASE FORGIVE ME!!
	db.serialize(function() 
	{
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,0800)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,0815)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,0830)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,0845)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,0900)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,0915)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,0930)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,0945)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1000)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1015)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1030)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1045)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1100)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1115)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1130)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1145)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1200)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1215)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1230)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1245)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1300)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1315)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1330)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1345)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1400)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1415)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1430)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1445)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1500)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1515)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1530)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1545)", day);
		db.run("INSERT INTO Summary (Day, Time) VALUES (?,1600)", day);
	});
}

method.GetGraphData = function(callback)
{
	var currentAverages = [];
	var todaysData = [];

	var today = new Date();
	var dd = dayOfWeekAsInteger(today.getDay());

	db.each("SELECT CurrentAverage FROM Summary WHERE Day = ? ORDER BY Time ASC",dd,function(err, row){
		if(err){
	  		console.log(err);
				//break out
		}
		else{
	  		currentAverages.push(row.CurrentAverage);
		}
	});

	db.each("SELECT QueueTime FROM Log WHERE DateCreated = date('now') ORDER BY Time ASC",function(err, row){
		if(err){
	  		console.log(err);
				//break out
		}
		else{
	  		todaysData.push(row.CurrentAverage);
		}
	});

	callback(currentAverages, todaysData);
}

method.InsertLog = function(actualTime, queueTime, cardMachineWorking, coffeeMachineWorking) 
{
	db.run("INSERT INTO Log(Time, QueueTime, CardMachine, CoffeeMachine) VALUES(?,?,?,?)", actualTime, queueTime, cardMachineWorking, coffeeMachineWorking);
	method.InsertSummary(actualTime, queueTime);
}

method.InsertSummary = function(actualTime, queueTime) 
{
	//Get 15 mins from queueTime
	hour = actualTime.getHours()
	mins = (Math.round(actualTime.getMinutes()/15) * 15) % 60;

	//putting the Hack in HackDay
	if(mins == 0)
	{
		hour = hour+1;
		var completeTime = hour+""+mins+"0";
	}
	else{
		var completeTime = hour+""+mins;
	}
			
	//Convert actualTime into INT day
	var day = dayOfWeekAsInteger(actualTime.getDay());

	//get row for day and time
	db.each("SELECT rowid, CurrentAverage, NumberOfLogs FROM Summary WHERE Time = ? AND Day = ?", completeTime, day, function(err,row)
	{
		if(err){
	  		console.log(err);
		}
		else{
			//calculate average
			newNumberOfRows = row.NumberOfLogs + 1;	

			//Save updated date
			db.run("UPDATE Summary SET CurrentAverage = ?, NumberOfLogs = ? WHERE rowid = ?", newAverage, newNumberOfRows, row.rowid);
		}
	});
}

function dayOfWeekAsInteger(day) {
	var dayArray = ["Sunday","0","1","2","3","4","Saturday"]
  	return dayArray[day];
}

module.exports = DBInterface;