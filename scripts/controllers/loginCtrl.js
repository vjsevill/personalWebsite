app.controller('LoginCtrl', ['$scope','$mdDialog', '$state', 'Notify',
    'Validator', 'User',
    function($scope, $mdDialog, $state, Notify, Validator, User) {
  logger("Ctrl:Login:: Initializing LoginCtrl now..", CTRL_LEVEL);

  $scope.user = {};

  $scope.infoClick = function() {
    $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .parent(angular.element(document.body))
        .textContent('Check the bottom of my resume for the login information.')
        .ok('Got it!')
    );
  }

  $scope.loginClick = function() {
    Validator.findBlankFieldsInLogin($scope.user)
      .then(function() {
        return Validator.sanitizeUserInfo($scope.user);
      })
      .then(function() {
        return Validator.checkDatabase($scope.user);
      })
      .then(function(user) {
        return Validator.doPasswordsMatch(user.info, $scope.user.password);
      })
      .then(function() {
        return User.setUser($scope.user);
      })
      .then(function() {
        $state.go('home');
      })
      .catch(function(failure) {
        if('blankOut' in failure && failure.blankOut.length > 0) {
          for (var index = 0; index < failure.blankOut.length; index++) {
            logger("Ctrl:Login:loginClick:: " + "Blanking out field: \"" +
                failure.blankOut[index] + "\".", CTRL_LEVEL);

            $scope.user[failure.blankOut[index]] = "";
          }
        }
        Notify.displayNotification({
          notifyType: TOAST_FAILURE,
          msg: failure.message,
          duration: TOAST_MEDIUM
        });
      });
  };
}]);
