softUniApp.controller('LoginController', function($scope, $http, $window, authentication,authorization, mainData, messaging) {
    $scope.login = loginUser;
    $scope.userData = authorization;
  
    function loginUser() {
        var user = {
            username: $scope.username,
            password: $scope.password
        };

        authentication.login(user)
            .then(
                function(userLoginData) {
                    authorization.setLoggedUser(userLoginData);
                    authorization.getAuthorizationHeaders();
                    $window.location.href = '#/user/home';
                    messaging.successMessage("Welcome " + userLoginData.username);
                },
                function(err) {
                    messaging.errorMessage(err.error_description);
                }
            );
    }

});