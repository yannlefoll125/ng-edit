app.controller('toolBarCtrl', ['$scope','textModel', function($scope,textModel){
	$scope.bold = function(){
		textModel.onStyleSelection('b');
	}

	$scope.italic = function () {
		textModel.onStyleSelection('i');
		
	}

	$scope.underline = function () {
		textModel.onStyleSelection('u');
	}

	$scope.clear = function() {
		textModel.onStyleSelection('c');
	}
}])