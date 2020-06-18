const db = require('./db');
const dbService =require('./dbService.js');
const invitee = require("./sources/insertData.json").invitee;
const room = require("./sources/insertData.json").room;
const meeting = require("./sources/insertData.json").meeting;

//Create Invitee Table
dbService.createTable(db,'Invitee',{'invitee_no':'INT', 'invitee_name': 'VARCHAR(50)','invited_by': 'VARCHAR(50)'});

//Create Room Table
dbService.createTable(db,'Room',{'room_no':'INT', 'room_name': 'VARCHAR(50)','floor_number':'INT'});

//Create Meeting Table
dbService.createTable(db,'Meeting',{'meeting_no':'INT', 'meeting_title': 'VARCHAR(50)','starting_time':'DATETIME','ending_time':'DATETIME','room_no':'INT'});


//Insert Invitee
dbService.insertTable(db,'Invitee',invitee);

//Insert Room
dbService.insertTable(db,'Room',room);

//Insert Meeting
dbService.insertTable(db,'Meeting',meeting);

db.end();




