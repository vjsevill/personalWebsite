app.directive('resizeThis', ['$window', function($window) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var dimensions = JSON.parse(attrs.resizeThis);
      var widthFactor = dimensions.width, heightFactor = dimensions.height;
      var maxWidth = screen.availWidth, maxHeight = screen.availHeight;
      var newWidth, newHeight;

      var resizeNow = function() {
        newWidth = widthFactor * $window.innerWidth;
        newHeight = heightFactor * $window.innerHeight;

        if (!(newWidth > maxWidth || newHeight > maxHeight)) {
          angular.element(elem).css(
            {
              'width': newWidth + 'px',
              'height': newHeight + 'px'
            }
          );
          scope.$apply();
        }
      };

      angular.element($window).bind('resize', resizeNow);

      scope.$on('$destroy', function() {
        angular.element($window).unbind('resize', resizeNow);
      });

      resizeNow();
    }
  };
}]);
