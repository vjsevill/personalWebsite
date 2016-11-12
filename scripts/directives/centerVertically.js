app.directive('centerVertically', ['$window', function($window) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var browserHeight, elemHeight, topMargin;

      elemHeight = $window.getComputedStyle(elem[0], null).height;
      elemHeight = parseInt(elemHeight.replace("px", ""));

      var centerNow = function() {
        browserHeight = $window.innerHeight;
        if (browserHeight > elemHeight) {
          topMargin = (browserHeight - elemHeight) / 2;
          angular.element(elem).css(
            {
              'top' : topMargin + 'px'
            }
          );
        }
      };

      angular.element($window).bind('resize', centerNow);

      scope.$on('$destroy', function() {
        angular.element($window).unbind('resize', centerNow);
        console.log('login centervertically directive destroyed');
      });

      centerNow();
    }
  };
}]);
