softUniApp.controller('LoginController', function($scope, $window, Auth, mainData) {
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
                    $scope.removeFilters();
                    $window.location.href = '#/user/home';
                },
                function(err) {
                    console.log(err);
                    $window.location.href = '#/register';
                }
            );
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

                },
                function(err) {
                    console.log(err);
                    $window.location.href = '#/login';
                }
            );
    }

    function logout() {
        var headers = Auth.getAuthorizationHeaders();
        Auth.logout(headers).then(function (data) {
            Auth.removeAuthorizationHeaders();
            Auth.setLoggedUser(undefined);
            $window.location.href = '#/';
        },function (err) {
            console.log(err);
        });
    }
});