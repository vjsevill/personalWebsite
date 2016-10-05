
app.controller('HomeCtrl',
    ['$scope', '$rootScope', 'User', '$mdDialog', '$interval', '$window',
    function($scope, $rootScope, User, $mdDialog, $interval, $window) {
  logger("Ctrl:Home:: Initializing HomeCtrl now..", CTRL_LEVEL);

  $scope.projects = [];

  $scope.menuOpenType = 'md-fling';
  $scope.menuOpen = false;

  $scope.logoutClick = function() {
    logger("Ctrl:Home:uploadFile:: Initiating logout now...", CTRL_LEVEL);
    User.logout();
  };

  $scope.imageClick = function() {
    logger("Ctrl:Home:imageClick:: Opening up image dialog now...",
        CTRL_LEVEL);

    $mdDialog.show({
      templateUrl:'templates/profileDialog.html',
      clickOutsideToClose:true,
      controller: 'ImgCtrl',
      parent: angular.element(document.body)
    });
  };

  $scope.goGithub = function() {
    logger("Ctrl:Home:goGithub:: Opening new window to github now...",
        CTRL_LEVEL);
    $window.open('https://github.com/vjsevill');
  };

  $scope.displayNote = function(ev) {
    $mdDialog.show({
      templateUrl:'/templates/noteDialog.html',
      clickOutsideToClose:true,
      controller: 'NoteCtrl',
      parent: angular.element(document.body)
    });
  };

  $scope.uploadFile = function(file) {
    logger("Ctrl:Home:uploadFile:: Beginning to upload file...", CTRL_LEVEL);

    var storageRef = firebase.storage().ref('videos/' + file.name);
    var task = storageRef.put(file);
    task.on('state_changed',
        function progress(snapshot) {
          var percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          $scope.$emit('progress_bar_change',
              {'status':true, 'mode': 'determinate','percent':percentage});
          $scope.$apply();
        },
        function error(err) {
          logger(err, CTRL_LEVEL);
        },
        function complete() {
          logger("Ctrl:Home:uploadFile:: File upload complete...", CTRL_LEVEL);
          insertIntoDB(task.snapshot.downloadURL);
          $scope.$emit('progress_bar_change', {'status':false});
          $scope.$apply();
        }
    );

    var insertIntoDB = function(url) {
      /*upload a project with the given url*/
      // var newProject = {
      //   'title': 'Cannavigate',
      //   'description': 'This is a personal project of mine that I am currently working on.  It takes up most of my free time, but that is because I enjoy it and I see it being quite successful in the future. <br> <br> This application is for the growing cannabis industry.  I have many ideas that if implementable will rival the competition; I am in the process of determining how possible these ideas are.  Currently, the login/signup/majority of the routing/authentication have been handled.  My next goal is to begin working on the home pages for each of the user types.  You can find it <a href="https://friendlychat-abc7d.firebaseapp.com" target="_blank">here</a>.',
      //   'rank': '1',
      //   'url': url
      // }
      // var videosRef = firebase.database().ref().child('projects');
      // videosRef.push(newProject);

      /*update the profile with the given profilePicture url*/
      // var newProfile = {
      //   'url': url,
      //   'description': "My name is Vincent Sevilla.  I study Math - Computer Science at UCSD. I plan to graduate in June of 2017. <br> <br> When I'm not coding, I love to surf and hang out with my closest friends. <br> <br> If you would like to see my private github repositiories, please signin to github as<br>username:'janeydoe'<br>password:'janeydoe1'",
      //   'email' : '<a href="mailto:vjsevill@ucsd.edu" target="_top">vjsevill@ucsd.edu</a>',
      //   'cellphone' : '626-806-0557'
      // }
      //
      // var profileRef = firebase.database().ref().child('profile');
      // profileRef.set(newProfile);
    };
  };

  var loadProjects = function() {
    var projectsRef = firebase.database().ref().child('projects');

    projectsRef.orderByChild('rank').once('value')
      .then(function(snapshot) {
        logger("Ctrl:Home:loadProjects:: Projects recieved.", CTRL_LEVEL);

        snapshot.forEach(function(childSnapshot) {
          logger("Ctrl:Home:loadProjects:: Project: \n" +
              JSON.stringify(childSnapshot.val()) + "\nrecieved", CTRL_LEVEL);
          $scope.projects.push(childSnapshot.val());
          $scope.$apply();
        });
      })
      .catch(function(err) {
        logger("Ctrl:Home:loadProjects:: " + err, CTRL_LEVEL);
      });
  };

  var loadProfile = function() {
    var profileRef = firebase.database().ref().child('profile');

    profileRef.once('value')
      .then(function(snapshot) {
        logger("Ctrl:Home:loadProfile:: Profile recieved as \n" +
          JSON.stringify(snapshot.val()), CTRL_LEVEL);
        var profile = snapshot.val();
        $scope.profile = {
          'description' : profile.description,
          'url': profile.url,
          'cellphone': profile.cellphone,
          'email': profile.email
        };

        $rootScope.profilePicUrl = profile.url;
        $scope.$apply();
      })
      .catch(function(err) {
        logger("Ctrl:Home:loadProfile:: " + err, CTRL_LEVEL);
      });
  };

  var init = function() {
    logger("Ctrl:Home:init:: Beginnign to loadProfile/loadProjects...",
        CTRL_LEVEL);

    loadProfile();
    loadProjects();
  };

  init();
}]);
