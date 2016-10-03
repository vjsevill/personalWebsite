app.factory('Validator', ['$q', function($q) {
  var result = {};

  result.doPasswordsMatch = function(aUserObj, password) {
    var deferred = $q.defer();

    if (aUserObj.password !== password) {
      deferred.reject({
        message: INVALID_PASS
      });
    }
    else {
      deferred.resolve({
        message: PASSWORD_MATCH,
      });
    }
    return deferred.promise;
  };

  result.checkDatabase = function(aUserObj) {
    logger("--Fact:User:checkDatabase:: " +
        "Checking if the username exists in the database.", FACT_LEVEL);
    var deferred = $q.defer();
    var usersRef = firebase.database().ref().child("users");
    var thisUsersRef;
    var username = aUserObj.username.toLowerCase();

    usersRef.once("value")
      .then(function(snapshot) {
        if (snapshot.hasChild(username)) {
          /*The path exists, so get a reference to it, that is users/username*/
          thisUsersRef = usersRef.child(username);
          return thisUsersRef.once("value");
        }

        deferred.reject({
          message: USERNAME_NOT_FOUND
        });

        return deferred.promise;
      })
      .then(function(snapshot) {
        logger("--Fact:User:checkDatabase:: " +
            "Username found in the DB. Grabbing the user object associated" +
            " with the account now. It is: " +
            JSON.stringify(snapshot.val()), FACT_LEVEL);

        deferred.resolve({
            message: USER_FOUND,
            info: snapshot.val()
        });
      })
      .catch(function(failure) {
        logger("--Fact:User:getAnyUser:: " + failure.message, FACT_LEVEL);
        deferred.reject({
            message: USERNAME_NOT_FOUND
        });
      });

    return deferred.promise;
  };

  result.findBlankFieldsInLogin = function(aUserObj) {
    logger("--Fact:Validator:findBlankFieldsInLogin:: " +
        "Looking for blank fields in login view.", FACT_LEVEL);
    var deferred = $q.defer();

    if (!(aUserObj.username && aUserObj.password && aUserObj.company)) {
      logger("--Fact:Validator:findBlankFieldsInLogin:: " +
          "Username/email/password blank field found.", FACT_LEVEL);
      deferred.reject({
        message: BLANK_FIELDS
      });
      return deferred.promise;
    }

    logger("--Fact:Validator:findBlankFieldsInLogin:: " +
        "No blank fields found.", FACT_LEVEL);
    deferred.resolve({
      message: LOGIN_FIELDS_FILLED
    });
    return deferred.promise;
  };

  /*returns false if there was an invalid char in the
      string, "."  are ok in email input*/
  result.sanitizeCheck = function(aString) {
    logger("--Fact:Validator:sanitizeCheck:: " +
        "Sanitize checking \"" + aString + "\"", FACT_LEVEL);

    if (aString.indexOf('.') > -1 || aString.indexOf('$') > -1
        || aString.indexOf('[') > -1 || aString.indexOf(']') > -1
        || aString.indexOf('#') > -1) {
      return false;
    }

    return true;
  };

  /*used by Login Ctrl*/
  result.sanitizeUserInfo = function(aUserObj) {
    logger("--Fact:Validator:sanitizeUserInfo:: " +
        "Starting to sanitize user info...", FACT_LEVEL);
    var deferred = $q.defer();
    var error = false;
    var fieldsToBlank = [];

    for (var item in aUserObj) {
      if (item === "password") {
        continue;
      }
      if (!aUserObj.hasOwnProperty(item) ||
          typeof aUserObj[item] !== "string") {
        continue;
      }
      if (!this.sanitizeCheck(aUserObj[item])) {
        fieldsToBlank.push(item);
        error = true;
      }
    }
    if (error) {
      logger("--Fact:Validator:sanitizeUserInfo:: " +
          "Some fields had invalid characters: " +
          fieldsToBlank.toString() + ".", FACT_LEVEL);
      deferred.reject({
        message: INPUT_SANITIZE_FAIL,
        blankOut: fieldsToBlank
      });
    } else {
      logger("--Fact:Validator:sanitizeUserInfo:: " +
          "No fields had invalid characters.", FACT_LEVEL);
      deferred.resolve({
        message: FIELDS_PASSED_SANITIZE_CHECK
      });
    }
    return deferred.promise;
  };

  return result;
}]);
