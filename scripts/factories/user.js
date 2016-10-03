app.factory('User', ['$q', 'localStorageService', '$state',
    function($q, localStorageService, $state) {

  var result = {};

  result.logout = function() {
    logger("Fact:User:logout:: " +
        "Removing user from local storage now. " +
        "Initiating state change to login.", FACT_LEVEL);
    localStorageService.remove('thisUser');
    $state.go('login');
  };

  result.setUser = function(aUserObj) {
    var deferred = $q.defer();
    var newObj = JSON.parse(JSON.stringify(aUserObj));
    delete newObj.password;

    localStorageService.set('thisUser', newObj);
    logger("Fact:User:setUser:: Setting user object to be " +
        JSON.stringify(newObj), FACT_LEVEL);

    deferred.resolve();
    return deferred.promise;
  };

  result.getUser = function() {
    logger("Fact:User:getUser:: Returning user object as " +
        JSON.stringify(localStorageService.get('thisUser')), FACT_LEVEL);
    return localStorageService.get('thisUser');
  };

  return result;
}]);
