"use strict";

softUniApp.factory('Auth', function($http, $q, $window) {
    var baseUrl = 'http://localhost:1337/api/user/';
    var headers = {};

    function setAuthorizationHeaders(accessToken) {
        angular.extend(headers, accessToken);
    }

    function getLocalUser() {
        var savedUser = JSON.parse($window.sessionStorage.getItem('UserData'));
        if (savedUser) {
            return savedUser;
        } else {
            return false;
        }
    }
    return {
        removeAuthorizationHeaders: function removeAuthorizationHeaders() {
            $window.sessionStorage.removeItem('UserData');
        },
        getAuthorizationHeaders: function getAuthorizationHeaders() {
            var loggedUser = getLocalUser();
            if (loggedUser) {
                var head = {};

                head['Authorization'] = 'Bearer ' + loggedUser.sessionToken;

                setAuthorizationHeaders(head);
            } else {
                var head = {};
                setAuthorizationHeaders(head);
                console.log("az sum");
            }
            return headers;
        },

        isLoggedUser: function isLoggedUser() {
            var sessionUser = $window.sessionStorage.getItem('UserData');

            return !!sessionUser;

        },
        // isAuthorized: function isAuthorized(authorizedRoles) {
        //     if (!angular.isArray(authorizedRoles)) {
        //         authorizedRoles = [authorizedRoles];
        //     }
        //     return (authService.isAuthenticated() &&
        //         authorizedRoles.indexOf(Session.userRole) !== -1);
        // },
        getLoggedUser: function getLoggedUser() {
            return JSON.parse($window.sessionStorage.getItem('UserData'));
        },
        setLoggedUser: function setLoggedUser(user) {
            if (!!user) {
                var sessionUser = {
                    username: user.username,
                    sessionToken: user.access_token
                };
                $window.sessionStorage.setItem('UserData', JSON.stringify(sessionUser));
            }
        },
        register: function(user) {
            var d = $q.defer();
            $http({
                    method: 'POST',
                    url: baseUrl + 'register/',
                    data: user
                })
                .success(function(userRegisterData) {
                    d.resolve(userRegisterData);
                })
                .error(function(err) {
                    d.reject(err);
                });

            return d.promise;
        },
        login: function login(user) {
            var d = $q.defer();
            $http({
                    method: 'POST',
                    url: baseUrl + 'login/',
                    data: user
                })
                .success(function(userLoginData) {
                    d.resolve(userLoginData);
                })
                .error(function(err) {
                    d.reject(err);
                });

            return d.promise;
        },
        logout: function logout(headers) {
            var d = $q.defer();
            $http({
                    method: 'POST',
                    url: baseUrl + 'logout/',
                    headers: headers,
                    data: {}
                })
                .success(function(userLogoutData) {
                    d.resolve(userLogoutData);
                })
                .error(function(logoutError) {
                    d.reject(logoutError);
                });
            return d.promise;
        }

    };
});