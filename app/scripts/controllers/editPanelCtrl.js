app.controller('editPanelCtrl', ['$scope', 'textModel', function($scope, textModel) {

	$scope.textEditTextAreaChanged = function(newValue) {

		textModel.setText(newValue);
	}

}]);