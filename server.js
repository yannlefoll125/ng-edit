'use strict'

var express = require('express');
var server = express();
var path = require('path');

server.use('/bower_components', express.static(path.join(__dirname, "bower_components")));
server.use(express.static(__dirname + "/app"));


server.listen(8080);