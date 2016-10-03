// Initialize Firebase
var config = {
  apiKey: "AIzaSyBkFUiL0IUXAr0a_uV85_ZhmLqK3XEmzNA",
  authDomain: "pers-website.firebaseapp.com",
  databaseURL: "https://pers-website.firebaseio.com",
  storageBucket: "pers-website.appspot.com",
};

firebase.initializeApp(config);


app.config(['$stateProvider', '$urlRouterProvider','$mdThemingProvider',
    function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  $mdThemingProvider.theme("success-toast");
  $mdThemingProvider.theme("error-toast");
  $mdThemingProvider.theme("normal-toast");

  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      data: {
        css:"styles/login.css"
      },
      resolve: {
        "isLoggedIn": ["$q", "localStorageService",
            function($q, localStorageService) {
          logger("app.config:isLoggedIn:: " +
              "Checking if user is logged in...", CONFIG_LEVEL);

          var deferred = $q.defer();
          var thisUser = localStorageService.get('thisUser');
          if (thisUser === null) {
            deferred.resolve();
          } else {
            deferred.reject(FROM_LOGIN);
          }
          return deferred.promise;
        }]
      }
    })
    .state('home', {
      url:"/home",
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl',
      data: {
        css:'styles/home.css'
      },
      resolve: {
        "isLoggedIn": ["$q", "localStorageService",
            function($q, localStorageService) {
          logger("app.config:isLoggedIn:: " +
              "Checking if user is logged in...", CONFIG_LEVEL);

          var deferred = $q.defer();
          var thisUser = localStorageService.get('thisUser');
          if (thisUser === null) {
            deferred.reject(FROM_HOME);
          } else {
            deferred.resolve();
          }
          return deferred.promise;
        }]
      }
    })
  $urlRouterProvider.otherwise("login");

}]);
