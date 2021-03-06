'use strict'

var mongoose = require('mongoose');


//Model definitions
var textSchema = mongoose.Schema({
	title: String,
	text: String,
	creationDate: Number
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
exports.saveText = function(title, text, creationDate) {


	TextModel.find({creationDate: creationDate}, function(err, docs) {
		if(err) {
			console.error.bind(console, "Find Text by creationDate");
			
		} else {
			console.log('Docs found: ' + JSON.stringify(docs));

			let textData = {
				title: title,
				text: text,
				creationDate: creationDate
			};

			
			if(docs.length == 0) {
				let textToSave = new TextModel(textData);

				textToSave.save(function(err) {
					if(err) {
						console.log("Error while saving: " + err);
					}
				});

			} else if (docs.length === 1){
				console.log("Doc already exists for this creationDate, updating");
				TextModel.update({creationDate: creationDate}, textData, function(err, raw) {
					if(err) {
						console.error.bind(console, "Error while updating");
					}

					console.log("Update raw: " + JSON.stringify(raw));
				});

			} else {
				console.error("More than 1 doc exist for this creationDate");
			}
		}


	});



	


};

exports.getSavedTextList = function(callback) {
	TextModel.find({}, callback);
}



