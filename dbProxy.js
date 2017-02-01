'use strict'

var mongoose = require('mongoose');


//Model definitions
var textSchema = mongoose.Schema({
	title: String,
	text: String
});

var TextModel = mongoose.model('Text', textSchema);



//Connection
mongoose.connect('mongodb://localhost/ng-edit');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
	console.log("Succesfuly connected to db");
	//exports.saveText("test title 1", "line 1\nline2");
});



//Module functions
exports.saveText = function(title, text) {
	let textToSave = new TextModel({
		title: title,
		text: text
	});

	textToSave.save(function(err) {
		if(err) {
			console.log("Error while saving: " + err);
		}
	});


};



