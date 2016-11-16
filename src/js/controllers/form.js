const URL = 'https://class-server.herokuapp.com/collections/glee-contacts';

function FormController ($scope, $http) {
  $scope.forms = [];
  $scope.errors = {};

  function init () {
  $http.get(URL).then(function (resp) {
    $scope.forms = resp.data;
    });
  };

  init();

  $scope.validateName = function (name) {
    if (name === '') {
      $scope.errors.name = "Name cannot be left empty"
    } else {
      $scope.errors.name = '';
    }
    return true;
  };

  $scope.validateEmail = function (email) {
    if (email && !email.includes('@')) {
      $scope.errors.email = "Email must have an '@'"
      return false;
    } else {
      $scope.errors.email = "";
    }
    if (email === '') {
      $scope.errors.email = "Email cannot be left empty"
    }
    return true;
  };

  $scope.validateUrl = function (url) {
    if (url && !url.startsWith('http')) {
      $scope.errors.url = "Website must start with http://"
      return false;
    } else {
      $scope.errors.url = '';
    }
    if (url === '') {
      $scope.errors.url = "Website cannot be left empty"
    }
    return true;
  };

  $scope.validateMsg = function (msg) {
    if (msg === '') {
      $scope.errors.msg = "Message cannot be left empty"
    } else {
      $scope.errors.msg = '';
    }
    return true;
  };

  $scope.validateForm = function (form) {
    return $scope.validateUrl(form.url) &&
           $scope.validateName(form.name) &&
           $scope.validateEmail(form.email) &&
           $scope.validateMsg(form.msg)
  };

  $scope.addForm = function (form) {
    if ($scope.validateForm(form)) {
      $http.post(URL, form).then(function (resp) {
        let form = resp.data;
        $scope.forms.unshift(form);
      });
      $scope.form = [];
    }
  };
}

FormController.$inject = ['$scope', '$http'];
export { FormController };
