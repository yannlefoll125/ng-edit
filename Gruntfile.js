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
		},
		'mongo-drop': {
			options: {

				dbname: 'ng-edit',
				host: 'localhost'

			}
		},
		mongobin: {
			options: {
				host: 'localhost',
				port: '27017',
				db: 'ng-edit'
			},
			import_two_entries: {

			}

		}
	});


	function methodWrapper(action, database, callback) {

		if(action === 'drop') {
			return database.dropDatabase(callback);
		} else if(action === 'populate') {
			return populate(database, callback);
		} else {
			console.log("unknown database action (" + action + ")");
			return;
		}
		
	}

	function dbAction(action, done) {
		mongoose.connect('mongodb://localhost/ng-edit');

		mongoose.connection.on('open', function dbActionCB() {
			methodWrapper(action, mongoose.connection.db, function(err) {
				if(err) {
					console.error(err);
				} else {
					console.log("ng-edit database succesfully dropped");
				}
				
				mongoose.connection.close(function(err, result) {
					console.log("connection.close() cb");

					//Unsubscribe this callback to 'open' event, so that its not called
					//again on connection opening in the server
					mongoose.connection.removeListener('open', dbActionCB);

					done(err);
				});

			});
		});
	}




	grunt.registerTask('reset-db', '', function() {


		var done = this.async();

		//var action = 'drop';

		dbAction('drop', done);

		// mongoose.connect('mongodb://localhost/ng-edit');
// 
// 		mongoose.connection.on('open', function dbActionCB() {
// 			methodWrapper(action, mongoose.connection.db, function(err) {
// 				if(err) {
// 					console.error(err);
// 				} else {
// 					console.log("ng-edit database succesfully dropped");
// 				}
// 				
// 				mongoose.connection.close(function(err, result) {
// 					console.log("connection.close() cb");
// 
// 					//Unsubscribe this callback to 'open' event, so that its not called
// 					//again on connection opening in the server
// 					mongoose.connection.removeListener('open', dbActionCB);
// 
// 					done(err);
// 				});
// 
// 			});
// 		});


});

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-mongo-drop-yann');
	grunt.loadNpmTasks('grunt-mongo-bin');

	grunt.registerTask('drop-db', ['mongo-drop']);
	grunt.registerTask('default', ['drop-db', 'express:dev']);

};