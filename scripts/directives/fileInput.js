/*
  Dependency: material icons: icon #-> &#xE2C6
  Sample use in html:
  <file-input on-upload="uploadFile($event)"> </file-input>,
  where the attribute on-upload is required and its value is
  a function defined in the controller to execute when file is uploaded
  example ctrl function to recieve uploaded file

  $scope.uploadFile = function(file) {
      console.log(file);
  };
*/
app.directive('fileInput', ['$parse',function($parse) {
  return {
    restrict: 'E',
    scope: {
      'onUpload':'&'
    },
    templateUrl: 'templates/file.html',
    link: function(scope, element, attrs) {

      var icon = element.find('input');
      icon.bind('change', function(e) {
        scope.onUpload({
            '$event': e.target.files[0]
        });
        /*reset the value of the input so the same file could be selected
         downloaded again. this is for a niche use case*/
        icon.val('');
      });
    }
  };
}]);
