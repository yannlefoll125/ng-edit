app.controller('toolBarCtrl', ['$scope','textModel', function($scope,textModel){
	$scope.bold = function(){
		textModel.style('b');
	}

	$scope.italic = function () {
		textModel.style('i');
		
	}
	

	$scope.underline = function (argument) {
		textModel('u');
	}
}])