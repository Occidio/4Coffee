var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TestDatabase');

var method = DBInterface.prototype;

function DBInterface(){

}

method.CreateSchema = function() {
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS Log (DateCreated DATETIME, QueueTime INT, CardMachine INT, CoffeeMachine INT);");

		db.run("CREATE TABLE IF NOT EXISTS Summary (Day INT, Time INT, CurrentAverage INT, NumberOfLogs INT);");

		db.each("SELECT Count(*) as Count FROM Summary",function(err, row){
			if(err){
		  		console.log(err);
	  			//break out
			}
			else{
		  		console.log(row);
				if(row.Count == 0)
				{
					for (var i = 0; i <= 5; i++) //loop for each day as an int (dont care about weekend)
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

module.exports = DBInterface;