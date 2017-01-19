app.directive('editArea', [function() {
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {

			var ta = element.find('textarea')[0];

			scope.mouseup = scope.keyup = function() {

				scope.selectionChanged(ta.selectionStart, ta.selectionEnd);

			}

		},
		template: `<textarea ng-model="$parent.t"
					ng-change="textEditTextAreaChanged(t)"
					ng-mouseup="mouseup()"
					ng-keyup="$event.keyCode >= 37 && $event.keyCode <= 40 && keyup()" 
					placeholder="Type your text here"
					ng-class="{'edit-area-textarea': true, 'edit-area-textarea-non-fullscreen': !fullscreen,
								'edit-area-textarea-fullscreen': fullscreen}"></textarea>
					`
	};
}]);