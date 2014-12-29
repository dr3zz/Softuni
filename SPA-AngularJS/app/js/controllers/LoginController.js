softUniApp.controller('LoginController', function($scope, $window, Auth, mainData) {
    $scope.register = registerUser;
    $scope.login = loginUser;
    $scope.userData = Auth;
    $scope.logout = logout;
    $scope.registerPrint = registerPrint;
    $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.phonePattern = /\(?[+]([0-9]{3})\)?([ -]?)([0-9]{3})\2([0-9]{6})|([0-9]{2,3})[ ]([0-9]{6,7})/g;

    function registerPrint(obj) {
        console.log(obj);
    }

    function registerUser() {
        var townName = $scope.townName;
        mainData.getAllTowns().then(function(data) {
            for (var town in data) {
                if (town.name === townName) {
                    $scope.registerObj.townId = town.id;
                }
            }
            Auth.register($scope.registerObj)
                .then(
                    function(userRegisterData) {
                       
                        Auth.setLoggedUser(userRegisterData);
                        Auth.getAuthorizationHeaders();
                        console.dir("auth data" + Auth.getAuthorizationHeaders());
                        $scope.removeFilters();
                        $window.location.href = '#/user/home';
                    },
                    function(err) {
                        console.log(err);
                        $window.location.href = '#/register';
                    }
                );
        }, function(err) {
            console.log(err);
        });

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
                    $scope.removeFilters();

                    $window.location.href = '#/user/home';

                },
                function(err) {
                    console.log(err);
                }
            );
    }

    function logout() {
        Auth.logout();
    }
});