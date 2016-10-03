app.directive('resizeThis', ['$window', function($window) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var dimensions = JSON.parse(attrs.resizeThis);
      var widthFactor = dimensions.width;
      var heightFactor = dimensions.height;
      var newWidth = widthFactor * $window.innerWidth;
      var newHeight = heightFactor * $window.innerHeight;
      var maxWidth = screen.availWidth;
      var maxHeight = screen.availHeight;

      angular.element(elem).css(
        {
          'width': newWidth + 'px',
          'height': newHeight + 'px'
        }
      );

      var resizeCallback = function() {
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

      angular.element($window).bind('resize', resizeCallback);

      scope.$on('$destroy', function() {
        angular.element($window).unbind('resize', resizeCallback);
      });
    }
  };
}]);
