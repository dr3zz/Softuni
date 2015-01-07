softUniApp.controller('LogoutController', function($scope, $http, $window, authentication,authorization, mainData, messaging) {
    $scope.userData = authorization;
    $scope.logout = logout;
   
    function logout() {
        var headers = authorization.getAuthorizationHeaders();
        authentication.logout(headers).then(function(data) {
            authorization.removeLoggedUser();
            messaging.successMessage(data.message);
            
            $window.location.href = '#/';
        }, function(err) {
            messaging.errorMessage(err.message);
        });
    }
});