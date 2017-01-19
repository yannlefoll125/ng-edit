app.directive('previewDisplay', [function() {
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {
			var text = attrs['pdText'];
			console.log(element);

			var el = angular.element("<p>" + text + "</p>");
			element.find('div')[0].appendChild(el);






		},
		template: `<div class="preview-display"></div>`
	}
}]);