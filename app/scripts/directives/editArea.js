app.directive('editArea', [function() {
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {

			var ta = element.find('textarea')[0];
			scope.selectedText = "";

			scope.t = "initial text\nline 2";

			scope.mouseup = scope.keyup = function() {
				console.log("ngMouseup");
				scope.selectedText = getSelectedText(ta);

			}

			getSelectedText = function(textarea) {
				return textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
			}

			/*scope.$watch(scope.t, function(newValue, oldValue) {
				console.log('watch: selectedText: ' + oldValue);
				console.log('watch: selectedText: ' + newValue);
			});*/



		},
		template: `<textarea ng-model="t" ng-mouseup="mouseup()" ng-keyup="$event.keyCode >= 37 && $event.keyCode <= 40 && keyup()"></textarea>
					<p>Selected text: <br />
					{{selectedText}}</p>`
	};
}]);