app.controller('previewPanelCtrl', ['$scope', 'textModel', function($scope, textModel){

	$scope.text = textModel.text;

	//$scope.pdText = "azer";
	//$scope.pdStyle = {};

	$scope.htmlPreviewText = '';


	textModel.registerObserverCallback(function(eventName) {
		
		
		switch(eventName) {
			case "text-model":

				$scope.htmlPreviewText = textModel.getHtmlText();
				break;

		}

	});



	
}]);