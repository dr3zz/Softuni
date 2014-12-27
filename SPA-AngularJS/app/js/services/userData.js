"use strict";

softUniApp.factory('userData', function($http, $q) {
    var baseUrl = 'http://localhost:1337/api/user/';
    return {
       
        isLoggedUser: function isLoggedUser() {
            var sessionUser = sessionStorage.getItem('UserData');
            return !!sessionUser;
        },
        getLoggedUser: function getLoggedUser() {
            return JSON.parse(sessionStorage.getItem('UserData'));
        },
        setLoggedUser: function setLoggedUser(user) {
            var sessionUser = {
                username: user.username,
                sessionToken: user.access_token
            };
            sessionStorage.setItem('UserData', JSON.stringify(sessionUser));
        },
        register: function(user) {
            var d = $q.defer();
            $http({
                    method: 'POST',
                    url: baseUrl + 'register/',
                    data: user
                })
                .success(function(userRegisterData) {
                    d.resolve(userRegisterData)
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
                   
                    data : user
                })
                .success(function(userLoginData) {
                    d.resolve(userLoginData);
                })
                .error(function(err) {
                    d.reject(err);
                });

            return d.promise;
        },
        logout: function logout() {
            sessionStorage.removeItem('UserData');
        }
    }
});