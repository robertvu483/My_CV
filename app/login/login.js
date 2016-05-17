/*global angular*/

var mdl = angular.module("loginMdl", ["factories"]);

mdl.controller("loginCtrl", function ($scope, Auth, $location) {
    "use strict";
    
    Auth.$onAuth(function (authData) {
        if (authData !== null) {
            $location.url("/");
        }
    });
    
    $scope.login = function () {
        Auth.$authWithOAuthPopup("facebook");
    };
});