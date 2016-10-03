app.controller('NoteCtrl', ['$scope', '$mdDialog', 'User', 'Notify',
    function($scope, $mdDialog, User, Notify) {
  logger("Ctrl:Note:: Initializing NoteCtrl now..", CTRL_LEVEL);


  $scope.note = "";

  $scope.submit = function() {
    logger("Ctrl:Note:: Note submission requested", CTRL_LEVEL);

    var notesRef = firebase.database().ref().child("notes");
    notesRef.child(User.getUser().company).push($scope.note);

    $mdDialog.hide();

    Notify.displayNotification({
      notifyType: TOAST_SUCCESS,
      msg: "Note has been saved!",
      duration: TOAST_SHORT
    });
  };
}]);
