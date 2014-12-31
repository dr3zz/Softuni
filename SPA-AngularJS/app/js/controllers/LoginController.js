softUniApp.controller('LoginController', function($scope, $window, Auth, mainData, messaging) {
    $scope.register = registerUser;
    $scope.login = loginUser;
    $scope.userData = Auth;
    $scope.logout = logout;

    $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.phonePattern = /\(?[+]([0-9]{3})\)?([ -]?)([0-9]{3})\2([0-9]{6})|([0-9]{2,3})[ ]([0-9]{6,7})/g;



    function registerUser() {
        Auth.register($scope.registerObj)
            .then(
                function(userRegisterData) {
                    Auth.setLoggedUser(userRegisterData);
                    Auth.getAuthorizationHeaders();

                    $window.location.href = '#/user/home';
                    messaging.successMessage("Welcome " + userRegisterData.username);
                },
                function(err) {
                    var error = err.modelState[''];
                    for (var e in error) {
                        var errorResultString = checkRegisterUserForErrors(error[e]);
                        messaging.errorMessage(errorResultString);
                        console.log(errorResultString);
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

    function loginUser() {
        var user = {
            username: $scope.username,
            password: $scope.password
        };

        Auth.login(user)
            .then(
                function(userLoginData) {
                    // console.dir(userLoginData);
                    Auth.setLoggedUser(userLoginData);
                    Auth.getAuthorizationHeaders();
                    $window.location.href = '#/user/home';
                    messaging.successMessage("Welcome " + userLoginData.username);
                },
                function(err) {
                    messaging.errorMessage(err.error_description);
                }
            );
    }

    function logout() {
        var headers = Auth.getAuthorizationHeaders();
        Auth.logout(headers).then(function(data) {
            Auth.removeAuthorizationHeaders();
            Auth.setLoggedUser(undefined);
            messaging.successMessage(data.message)
            $window.location.href = '#/';
        }, function(err) {
            messaging.errorMessage(err.message);
        });
    }
});