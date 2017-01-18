app.controller('editPanelCtrl', ['$scope', 'textModel', function($scope, textModel) {

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