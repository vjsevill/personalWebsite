/*Toasts*/
const TOAST_SHORT = 3000;
const TOAST_MEDIUM = 5000;
const TOAST_LONG = 10000;
const TOAST_SUCCESS = "toast-success";
const TOAST_FAILURE = "toast-failure";
const TOAST_NORMAL = "toast-normal";

/*switches/threshholds*/
const CONSOLE_LOG_SWITCH = true;
const DIRECTIVE_LEVEL = 10;
const FACT_LEVEL = 20;
const CTRL_LEVEL = 30;
const RUN_LEVEL = 40;
const CONFIG_LEVEL = 50;
const CURRENT_LEVEL = FACT_LEVEL;

const FROM_LOGIN = "from login";
const FROM_HOME = "from home";

const BLANK_FIELDS = "Please fill in all the fields";
const LOGIN_FIELDS_FILLED = "The login fields are filled";
const INPUT_SANITIZE_FAIL = "Please no '.', '#', '$', '[', ']' in your input.";
const FIELDS_PASSED_SANITIZE_CHECK = "All fields passed sanitize check.";
const USERNAME_NOT_FOUND = "The username doesnt exist.";
const USER_FOUND = "The user was found in the DB, returning user obj now.";
const INVALID_PASS = "The password you entered was incorrect.";
const PASSWORD_MATCH = "The passwords matched!";

/*redefine console.log*/
var logger = function(logMessage, priorityLevel) {
  if (!CONSOLE_LOG_SWITCH || priorityLevel < CURRENT_LEVEL) {
    return;
  } else {
    console.log(logMessage);
  }
}
