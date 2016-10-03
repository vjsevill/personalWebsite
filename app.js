var app = angular.module('MyApp', ['firebase', 'ngMaterial', 'ui.router',
    'uiRouterStyles', 'LocalStorageModule', 'ngAria', 'ngSanitize']);

app.run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
    logger("app.run:$stateChangeSuccess:: Route change successful!", RUN_LEVEL);

    /*notify child ctrls that are listening that the page change is complete*/
    $rootScope.$broadcast('progress_bar_change', {'status':false});
  });
  $rootScope.$on("$stateChangeError",
      function(event, toState, toParams, fromState, fromParams, error) {
    logger("app.run:$stateChangeError::" +
        " Routing error. Attempting to re-route.", RUN_LEVEL);

    $rootScope.$broadcast('progress_bar_change', {'status':false});

    if (error === FROM_HOME) {
      logger("app.run:$stateChangeError::" +
          " Routing to login page now", RUN_LEVEL);
      $state.go('login');
    } else if(error === FROM_LOGIN) {
      logger("app.run:$stateChangeError::" +
          " Routing to home page now", RUN_LEVEL);
      $state.go('home');
    }
  });

  $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams, options) {
    logger("app.run:$stateChangeStart::" +
        " Starting to change states now...", RUN_LEVEL);
    $rootScope.$broadcast('progress_bar_change',
        {'status':true, 'mode': 'indeterminate'});
  });

}]);
