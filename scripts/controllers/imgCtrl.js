app.controller('ImgCtrl', ['$scope', '$rootScope',
    function($scope, $rootScope) {
  logger("Ctrl:ImgCtrl:: Initializing ImgCtrl now..", CTRL_LEVEL);

  $scope.dialogDimentions = {'width' : 0.8, 'height' : 0.8};

  $scope.styleDialogImage = {
    'background-image': 'url(' + $rootScope.profilePicUrl + ')',
    'background-repeat':'no-repeat',
    'background-position': 'center center',
    'width':'100%',
    'height':'100%',
    'background-size':'contain'
  };
}]);
