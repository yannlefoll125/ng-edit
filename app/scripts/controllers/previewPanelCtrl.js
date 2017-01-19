app.controller('previewPanelCtrl', ['$scope', 'textModel', function($scope, textModel){

	$scope.text = textModel.text;

	//$scope.pdText = "azer";
	//$scope.pdStyle = {};

	$scope.htmlPreviewText = '';


	textModel.registerObserverCallback(function(eventName) {
		
		
		switch(eventName) {
			case "text-model":
				//$scope.pdText = textModel.getText();
				//$scope.pdStyle = textModel.getStyle();
				$scope.htmlPreviewText = textModel.getHtmlText();
				break;

		}

	});



	
}]);