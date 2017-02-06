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

	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-mongo-drop-yann');
	grunt.loadNpmTasks('grunt-mongo-bin');

	grunt.registerTask('drop-db', ['mongo-drop']);
	grunt.registerTask('default', ['drop-db', 'express:dev']);

};