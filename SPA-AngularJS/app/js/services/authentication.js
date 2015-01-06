"use strict";

softUniApp.factory('authentication', function ($http, $q, baseUrl) {
    var baseUserUrl = baseUrl + 'user/';

    function register(user) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: baseUserUrl + 'register/',
            data: user
        })
            .success(function (userRegisterData) {
                d.resolve(userRegisterData);
            })
            .error(function (err) {
                d.reject(err);
            });

        return d.promise;
    }

    function login(user) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: baseUserUrl + 'login/',
            data: user
        })
            .success(function (userLoginData) {
                d.resolve(userLoginData);
            })
            .error(function (err) {
                d.reject(err);
            });

        return d.promise;
    }

    function logout(headers) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: baseUserUrl + 'logout/',
            headers: headers,
            data: {}
        })
            .success(function (userLogoutData) {
                d.resolve(userLogoutData);
            })
            .error(function (logoutError) {
                d.reject(logoutError);
            });
        return d.promise;
    }

    return {
        register: register,
        login: login,
        logout: logout
    };
});