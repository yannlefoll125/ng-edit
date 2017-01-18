app.controller('previewPanelCtrl', ['$scope', 'textModel', function($scope, textModel){

	$scope.text = "";
	textModel.registerObserverCallback(function(eventName) {
		
		switch(eventName) {
			case "text-model":
				$scope.text = textModel.getText();
				break;

		}

	});



	
}]);