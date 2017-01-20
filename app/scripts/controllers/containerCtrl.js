app.controller('containerCtrl', ['$scope', function($scope){
	$scope.fullscreen = false;

	$scope.onFullscreenClick = function() {
		$scope.fullscreen = !$scope.fullscreen;
	}


	$scope.setPanelStyles = function(maxmin) {
		//0: Both panels
		//1: Edit
		//2: Preview
		console.log(maxmin);
		$scope.bothPanels = $scope.maxEdit = $scope.maxPreview = $scope.minEdit = $scope.minPreview = false;
		switch(maxmin) {
			case 0:
			$scope.bothPanels = true;
			break;

			case 1:
			$scope.maxEdit = $scope.minPreview = true;
			break;

			case 2:
			$scope.minEdit = $scope.maxPreview = true;
			break;

		}
	};

	$scope.maxmin = 1;
	$scope.setPanelStyles(0);

	$scope.onMaxMinClick = function() {

		
		$scope.setPanelStyles($scope.maxmin);
		

		$scope.maxmin++;
		$scope.maxmin %= 3;




	};

	
	
}]);