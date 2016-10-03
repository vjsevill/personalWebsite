app.controller('RootCtrl', ['$scope', function($scope) {
  logger("Ctrl:Root:: Initializing RootCtrl now..", CTRL_LEVEL);

  $scope.progressMode = 'determinate';
  $scope.progressStatus = false;
  $scope.percentage = 0;

  $scope.$on('progress_bar_change', function(e, args) {
    if (args.status) {
      $scope.progressMode = args.mode;
      $scope.progressStatus = true;
      if (args.mode === 'determinate') {
        $scope.percentage = args.percent;
      }
    } else {
      $scope.percentage = 0;
      $scope.progressStatus = false;
    }
  });
}]);
