app.controller('containerCtrl', ['$scope', function($scope){
	$scope.fullscreen = false;

	$scope.onFullscreenClick = function() {
		$scope.fullscreen = !$scope.fullscreen;
	}
	
}]);