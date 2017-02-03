var mongoose = require('mongoose');

module.exports= function(grunt) {

	grunt.initConfig({
		express: {
			options: {
				background: false,
				logs: {
					out: 'logs/log',
					err: 'logs/err'
				}
			},

			dev: {
				options: {
					script: 'server.js'
				}
			}
		}
	});

	grunt.registerTask('reset-db', '', function() {


		var done = this.async();

		mongoose.connect('mongodb://localhost/ng-edit');

		mongoose.connection.on('open', function dropConnectionOpenCB() {
			mongoose.connection.db.dropDatabase(function(err) {
				if(err) {
					console.error(err);
				} else {
					console.log("ng-edit database succesfully dropped");
				}
				
				mongoose.connection.close(function(err, result) {
					console.log("connection.close() cb");

					//Unsubscribe this callback to 'open' event, so that its not called
					//again on connection opening in the server
					mongoose.connection.removeListener('open', dropConnectionOpenCB);

					done(err);
				});

			});
		});

		
	});

	grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('default', ['reset-db', 'express:dev']);
 
};