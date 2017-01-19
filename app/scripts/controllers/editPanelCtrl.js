app.controller('editPanelCtrl', ['$scope', 'textModel', function($scope, textModel) {

	var scope_ref = $scope;

	$scope.textEditTextAreaChanged = function(newValue) {

		textModel.setText(newValue);
	};

	$scope.selectionStart = 0;
	$scope.selectionEnd = 0;

	$scope.selectionChanged = function(selectionStart, selectionEnd) {
		//console.log("selection changed: (" + selectionStart + ", " + selectionEnd + ")");
		//$scope.t = "selection changed";
		textModel.setSelectionBounds(selectionStart, selectionEnd);

	};

	$scope.br2nl = function(str) {
		return str.split('<br />').join('\n');
	}


	$scope.modelCallback = function(event) {
		//console.log('editCtrl: received event from model(' + event + ')');
		//console.log($scope);
		switch (event) {
			case 'text-model':
			
			$scope.t = $scope.br2nl(textModel.getHtmlText());
			break;
			default:
				// statements_def
				break;
			}
		};

		textModel.registerObserverCallback($scope.modelCallback);

	}]);