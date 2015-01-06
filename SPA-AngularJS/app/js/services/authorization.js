"use strict";

softUniApp.factory('authorization', function ($cookieStore) {

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

    function isAdmin() {
        var user = getLoggedUser();
        if (user.isAdmin == 'true') {
            return true;
        }
        return false;
    }

    function isUser() {
        var user = getLoggedUser();
        if (!user.isAdmin) {
            return true;
        }
        return false;
    }

    return {
        removeLoggedUser: removeLoggedUser,
        getAuthorizationHeaders: getAuthorizationHeaders,
        isLoggedUser: isLoggedUser,
        getLoggedUser: getLoggedUser,
        setLoggedUser: setLoggedUser,
        isAdmin: isAdmin,
        isUser: isUser

    };
});