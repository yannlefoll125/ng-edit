app.controller('previewPanelCtrl', ['$scope', 'textModel', function($scope, textModel){

	$scope.text = "";
	textModel.registerObserverCallback(function() {
		console.log("PP: text changed in the model");
		$scope.text = textModel.getText();
	});



	
}]);