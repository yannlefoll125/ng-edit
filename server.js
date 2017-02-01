'use strict'

var express = require('express');
var server = express();
var path = require('path');

var bodyParser = require('body-parser');
server.use(bodyParser.json())
.use(bodyParser.urlencoded({extended: true}));

var dbProxy = require(path.join(__dirname, 'dbProxy.js'));

server.use('/bower_components', express.static(path.join(__dirname, "bower_components")));
server.use(express.static(__dirname + "/app"));



//API ENDPOINTS
server.post('/saveText', function(req, res) {

	let text = req.body.text;
	let title = req.body.title;
	let creationDate = req.body.creationDate;

	console.log('POST request on /saveText. text=' + text + ", title=" + title + ", creationDate=" + creationDate);

	dbProxy.saveText(title, text, creationDate);

	res.writeHead(200);
	res.end();



});

server.get('/getTimestamp', function(req, res) {
	let timestamp = Math.floor(new Date().getTime() / 1000);
	res.writeHead(200, 'Content-Type', 'text/plain');
	res.end(timestamp.toString());
})


server.get('/listSavedTexts', function(req, res) {

});

server.get('/loadText', function(req, res) {

});


server.listen(8080);