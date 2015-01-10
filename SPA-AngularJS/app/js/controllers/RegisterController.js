softUniApp.controller('RegisterController', function($scope, $http, $window, authentication,authorization, mainData, messaging) {
    $scope.register = registerUser;
    $scope.userData = authorization;
    $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // $scope.phonePattern = /\(?[+]([0-9]{3})\)?([ -]?)([0-9]{3})\2([0-9]{6})|([0-9]{2,3})[ ]([0-9]{6,7})/g;
    $scope.phonePattern = /([+359]*[\d ])$/;
    function registerUser() {
        authentication.register($scope.registerObj)
            .then(
                function(userRegisterData) {
                    authorization.setLoggedUser(userRegisterData);
                    authorization.getAuthorizationHeaders();

                    $window.location.href = '#/user/home';
                    messaging.successMessage("Welcome " + userRegisterData.username);
                },
                function(err) {
                    var error = err.modelState[''];
                    for (var e in error) {
                        var errorResultString = checkRegisterUserForErrors(error[e]);
                        messaging.errorMessage(errorResultString);
                        // console.log(errorResultString);
                    }
                }
            );
    }

    function checkRegisterUserForErrors(errorString) {
        var errorResultString = errorString;
        var errorParams = errorString.substring(0, 4);
        if (errorParams.toLowerCase() === 'name') {
            errorResultString = errorString.replace(errorParams, "Username");
        }
        return errorResultString;
    }

    
});