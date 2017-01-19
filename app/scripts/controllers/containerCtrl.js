app.controller('containerCtrl', ['$scope', function($scope){
	$scope.fullscreen = false;

	$scope.onFullscreenClick = function() {
		$scope.fullscreen = !$scope.fullscreen;
	}

	$scope.maxmin = 0;

	$scope.onMaxMinClick = function() {

		$scope.maxmin++;
		$scope.maxmin %= 3;

	}
	
}]);