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

		},
		template: `<textarea ng-model="t" ng-mouseup="mouseup()" 
					ng-change="textEditTextAreaChanged(t)"
					ng-keyup="$event.keyCode >= 37 && $event.keyCode <= 40 && keyup()" 
					class="edit-area-textarea"></textarea>
					`
	};
}]);