app.factory("Notify", ["$mdToast", function($mdToast) {
  var result = {};

  function successToast(message, duration) {
    var toast = $mdToast.simple()
      .textContent(message)
      .position('top right')
      .theme('success-toast')
      .hideDelay(duration);
    $mdToast.show(toast);
  };

  function problemToast(message, duration) {
    var toast = $mdToast.simple()
      .textContent(message)
      .position('top right')
      .theme('error-toast')
      .hideDelay(duration)
    $mdToast.show(toast);
  };

  function normalToast(message, duration) {
    var toast = $mdToast.simple()
      .textContent(message)
      .position('top right')
      .theme('normal-toast')
      .hideDelay(duration)
    $mdToast.show(toast);
  };

  /*takes an obj like so:
  {
        notifyType: TOAST_FAILURE,
        msg: failure.message,
        duration: TOAST_LONG
  }*/
  result.displayNotification = function(notification) {
    logger("--Fact:Notify:displayNotification:: " +
        "Determining notification to display...", FACT_LEVEL);

    if (notification.notifyType === TOAST_FAILURE) {
      logger("--Fact:Notify:displayNotification:: " +
          "Displaying problem notification.", FACT_LEVEL);
      problemToast(notification.msg, notification.duration);
    } else if (notification.notifyType === TOAST_SUCCESS) {
      logger("--Fact:Notify:displayNotification:: " +
          "Displaying successful notification.", FACT_LEVEL);
      successToast(notification.msg, notification.duration);
    } else if (notification.notifyType === TOAST_NORMAL) {
      logger("--Fact:Notify:displayNotification:: " +
          "Displaying normal notification.", FACT_LEVEL);
      normalToast(notification.msg, notification.duration);
    }
  };

  return result;
}]);
