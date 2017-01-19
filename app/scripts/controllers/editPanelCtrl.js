app.controller('editPanelCtrl', ['$scope', 'textModel', function($scope, textModel) {

	$scope.reduceExtend=true;

	$scope.onButtonChange = function () {
		// body...
		if ($scope.reduceExtend) {

			$scope.reduceStyle={ width:'0px', height:'0px'}

		} else {

			$scope.reduceStyle={ width:'400px', height:'300px'}
		}
		
		$scope.reduceExtend= !$scope.reduceExtend;
		
		console.log('click');
	}

	$scope.textEditTextAreaChanged = function(newValue) {

		textModel.setText(newValue);
	};

	$scope.selectionStart = 0;
	$scope.selectionEnd = 0;

	$scope.selectionChanged = function(selectionStart, selectionEnd) {
		//console.log("selection changed: (" + selectionStart + ", " + selectionEnd + ")");
		
		textModel.setSelectionBounds(selectionStart, selectionEnd);

	};
}]);