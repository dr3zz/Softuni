softUniApp.controller('UserController', function($scope, $window, Auth) {
    $scope.register = registerUser;
    $scope.login = loginUser;
    $scope.userData = Auth;
    $scope.logout = logout;
    $scope.registerPrint = registerPrint;
    function registerPrint(obj) {
        console.log(obj);
    }
    function registerUser() {
        var user = {
            username: $scope.username,
            password: $scope.password
        };
        Auth.register($scope.registerObj)
            .then(
                function() {
                    alert('user successfully registered');
                    $window.location.href = '#/user/home';
                },
                function(err) {
                    console.log(err);
                    $window.location.href = '#/login';
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
                    console.dir(userLoginData);
                    Auth.setLoggedUser(userLoginData);
                    $scope.removeFilters();
                    $window.location.href = '#/user/home';

                },
                function(err) {
                    console.log(err);
                }
            )
    }

    function logout() {
        Auth.logout();
    }
});