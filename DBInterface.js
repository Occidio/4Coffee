var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TestDatabase');

var method = DBInterface.prototype;

function DBInterface(){

}

method.CreateSchema = function() {
	db.serialize(function() {
		db.run("CREATE TABLE IF NOT EXISTS Log (DateCreated TEXT, Time INT, QueueTime INT, CardMachine INT, CoffeeMachine INT);");

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

method.GetGraphData = function(day, callback)
{
	db.serialize(function() 
	{
<<<<<<< HEAD
=======

>>>>>>> origin/master
		var currentAverages = new Array;
		var todaysData = new Array;
		db.each("SELECT CurrentAverage FROM Summary WHERE Day = ? ORDER BY Time ASC",day,function(err, row){
			if(err){
		  		console.log(err);
					//break out
			}
			else{
				if(row.CurrentAverage == null)
				{
		  			currentAverages.push(0);
				}
				else
				{			
		  			currentAverages.push(row.CurrentAverage);
				}
			}
		},function()
		{

			var todayDate = new Date();
			var todayInt = dayOfWeekAsInteger(todayDate.getDay());

			var difference = todayInt - day;

			if(difference<0){
				return;
			}

			todayDate.setDate(todayDate.getDate() - difference);

			db.each("SELECT AVG(QueueTime) as QueueTime, Time FROM Log WHERE DateCreated = ? GROUP BY Time", convertDate(todayDate),function(err, row){
				if(err){
			  		console.log(err);
						//break out
				}
				else{

					var obj = {
							    key1: row.QueueTime,
							    key2: row.Time
							};

			  		todaysData.push(obj);
				}
			},function()
			{

				var horribleArray = new Array(33);
				for (var i = horribleArray.length-1; i >= 0; -- i) horribleArray[i] = 0;

				//
				for (var i = todaysData.length - 1; i >= 0; i--) 
				{
					 switch(todaysData[i].key2){
					 	case 800:
					 		horribleArray[0] = todaysData[i].key1;
					 		break;
					 	case 815:
					 		horribleArray[1] = todaysData[i].key1;
					 		break;
					 	case 830:
					 		horribleArray[2] = todaysData[i].key1;
					 		break;
					 	case 845:
					 		horribleArray[3] = todaysData[i].key1;
					 		break;
					 	case 900:
					 		horribleArray[4] = todaysData[i].key1;
					 		break;
					 	case 915:
					 		horribleArray[5] = todaysData[i].key1;
					 		break;
					 	case 930:
					 		horribleArray[6] = todaysData[i].key1;
					 		break;
					 	case 945:
					 		horribleArray[7] = todaysData[i].key1;
					 		break;
					 	case 1000:
					 		horribleArray[8] = todaysData[i].key1;
					 		break;
					 	case 1015:
					 		horribleArray[9] = todaysData[i].key1;
					 		break;
					 	case 1030:
					 		horribleArray[10] = todaysData[i].key1;
					 		break;
					 	case 1045:
					 		horribleArray[11] = todaysData[i].key1;
					 		break;
					 	case 1100:
					 		horribleArray[12] = todaysData[i].key1;
					 		break;
					 	case 1115:
					 		horribleArray[13] = todaysData[i].key1;
					 		break;
					 	case 1130:
					 		horribleArray[14] = todaysData[i].key1;
					 		break;
					 	case 1145:
					 		horribleArray[15] = todaysData[i].key1;
					 		break;
					 	case 1200:
					 		horribleArray[16] = todaysData[i].key1;
					 		break;
					 	case 1215:
					 		horribleArray[17] = todaysData[i].key1;
					 		break;
					 	case 1230:
					 		horribleArray[18] = todaysData[i].key1;
					 		break;
					 	case 1245:
					 		horribleArray[19] = todaysData[i].key1;
					 		break;
					 	case 1300:
					 		horribleArray[20] = todaysData[i].key1;
					 		break;
					 	case 1315:
					 		horribleArray[21] = todaysData[i].key1;
					 		break;
					 	case 1330:
					 		horribleArray[22] = todaysData[i].key1;
					 		break;
					 	case 1345:
					 		horribleArray[23] = todaysData[i].key1;
					 		break;
					 	case 1400:
					 		horribleArray[24] = todaysData[i].key1;
					 		break;
					 	case 1415:
					 		horribleArray[25] = todaysData[i].key1;
					 		break;
					 	case 1430:
					 		horribleArray[26] = todaysData[i].key1;
					 		break;
					 	case 1445:
					 		horribleArray[27] = todaysData[i].key1;
					 		break;
					 	case 1500:
					 		horribleArray[28] = todaysData[i].key1;
					 		break;
					 	case 1515:
					 		horribleArray[29] = todaysData[i].key1;
					 		break;
					 	case 1530:
					 		horribleArray[30] = todaysData[i].key1;
					 		break;
					 	case 1545:
					 		horribleArray[31] = todaysData[i].key1;
					 		break;
					 	case 1600:
					 		horribleArray[32] = todaysData[i].key1;
					 		break;
					 }
				};
				callback(currentAverages, horribleArray);
			});

		});

		
	});

	
}

method.InsertLog = function(actualTime, queueTime, cardMachineWorking, coffeeMachineWorking) 
{
	//Get 15 mins from queueTime
	hour = actualTime.getHours();
	mins = (Math.round(actualTime.getMinutes()/15) * 15) % 60;

	if(hour < 8 || hour > 16 ){
		return;
	}

	//putting the Hack in HackDay
	if(mins == 0)
	{
		hour = hour+1;
		var parsedTime = hour+""+mins+"0";
	}
	else{
		var parsedTime = hour+""+mins;
	}

	var dateToSave = convertDate(actualTime);
	db.run("INSERT INTO Log(DateCreated, Time, queueTime, CardMachine, CoffeeMachine) VALUES(?,?,?,?,?)", dateToSave, parsedTime, queueTime, cardMachineWorking, coffeeMachineWorking);
	method.InsertSummary(actualTime, queueTime);
}

method.InsertSummary = function(actualTime, queueTime) 
{
	//Get 15 mins from queueTime
	hour = actualTime.getHours()
	mins = (Math.round(actualTime.getMinutes()/15) * 15) % 60;

	//putting the Hack in HackDay
	if(mins == 0 && actualTime.getMinutes() > 50)
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

			var newAverage = row.CurrentAverage + ((queueTime - row.CurrentAverage) / newNumberOfRows);

			//Save updated date
			db.run("UPDATE Summary SET CurrentAverage = ?, NumberOfLogs = ? WHERE rowid = ?", newAverage, newNumberOfRows, row.rowid);
		}
	});
}

function dayOfWeekAsInteger(day) {
	var dayArray = ["Sunday","0","1","2","3","4","Saturday"]
  	return dayArray[day];
}

function convertDate(date){
	var month = date.getMonth() + 1; // BECAUSE WHYYYYYY
	return date.getFullYear()+"-"+month+"-"+date.getDate()
}

module.exports = DBInterface;