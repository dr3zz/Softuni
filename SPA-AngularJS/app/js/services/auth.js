"use strict";

softUniApp.factory('Auth', function($http, $q, $window,baseUrl) {
    var baseUserUrl = baseUrl + 'user/';
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
            }
            return headers;
        },

        isLoggedUser: function isLoggedUser() {
            var sessionUser = $window.sessionStorage.getItem('UserData');

            return !!sessionUser;

        },
    
        getLoggedUser: function getLoggedUser() {
            return JSON.parse($window.sessionStorage.getItem('UserData'));
        },
        setLoggedUser: function setLoggedUser(user) {
            if (!!user) {
                var sessionUser = {
                    username: user.username,
                    sessionToken: user.access_token,
                   
                };
                // console.log(user);
                // console.log(message);
                $window.sessionStorage.setItem('UserData', JSON.stringify(sessionUser));
            }
        },
        register: function(user) {
            var d = $q.defer();
            $http({
                    method: 'POST',
                    url: baseUserUrl + 'register/',
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
                    url: baseUserUrl + 'login/',
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
                    url: baseUserUrl + 'logout/',
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