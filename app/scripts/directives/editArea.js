app.directive('editArea', [function() {
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {


			var ta = element.find('textarea')[0];

			scope.t = "initial text\nline 2";

			scope.mouseup = scope.keyup = function() {

				scope.selectionChanged(ta.selectionStart, ta.selectionEnd);

			}

		},
		template: `<textarea ng-model="t"
					ng-change="textEditTextAreaChanged(t)"
					ng-mouseup="mouseup()"
					ng-keyup="$event.keyCode >= 37 && $event.keyCode <= 40 && keyup()" 
					class="edit-area-textarea"></textarea>
					`
	};
}]);