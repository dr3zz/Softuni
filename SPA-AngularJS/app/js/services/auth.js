"use strict";

softUniApp.factory('Auth', function($http, $cookieStore, $q, $window, baseUrl) {
    var baseUserUrl = baseUrl + 'user/';
    var headers = {};

    function setAuthorizationHeaders(accessToken) {
        angular.extend(headers, accessToken);
    }

    function getLocalUser() {
        var savedUser = $cookieStore.get('UserData');
        if (savedUser) {
            return savedUser;
        } else {
            return false;
        }
    }

    function removeLoggedUser() {
        $cookieStore.remove('UserData');
    }

    function getAuthorizationHeaders() {
        var loggedUser = getLocalUser();
        if (loggedUser) {
            var head = {};
            head['Authorization'] = 'Bearer ' + loggedUser.access_token;
            setAuthorizationHeaders(head);
        } else {
            var head = {};
            setAuthorizationHeaders(head);
        }
        return headers;
    }

    function isLoggedUser() {
        var sessionUser = $cookieStore.get('UserData');
        return !!sessionUser;
    }

    function getLoggedUser() {
        return $cookieStore.get('UserData');
    }

    function setLoggedUser(user) {
        if (!!user) {
            $cookieStore.put('UserData', user);
        }
    }

    function register(user) {
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
    }

    function login(user) {
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
    }

    function logout(headers) {
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
    return {
        removeLoggedUser: removeLoggedUser,
        getAuthorizationHeaders: getAuthorizationHeaders,
        isLoggedUser: isLoggedUser,
        getLoggedUser: getLoggedUser,
        setLoggedUser: setLoggedUser,
        register: register,
        login: login,
        logout: logout

    };
});