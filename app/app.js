/*global angular*/

var myCV = angular.module("myCV", ["factories", "ngRoute", "mainMdl", "loginMdl"]);

myCV.config(function ($routeProvider) {
    'use strict';
    
    $routeProvider
        .when("/", {
            controller: "mainCtrl",
            templateUrl: "/main/main.html",
            resolve: {
                "authentication": function (Auth, $location) {
                    Auth.$requireAuth()["catch"](function (error) {
                        $location.url("/login");
                    });
                }
            }
        }).when("/login", {
            controller: "loginCtrl",
            templateUrl: "/login/login.html",
            resolve: {
                "authentication": function (Auth, $location) {
                    Auth.$waitForAuth().then(function (authData) {
                        if (authData !== null) {
                            $location.url("/");
                        }
                    });
                }
            }
        }).otherwise({
            redirectTo: "/"
        });
});