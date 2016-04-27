/*global angular*/

// Declare app level module which depends on views, and components
var myCV = angular.module('myCV', []);

myCV.controller('bodyController', function ($scope, $http) {
    'use strict';
    
    $http.get("personal_info/basic.json").success(function (data) {
        $scope.basic = data;
    });
    
    $http.get("personal_info/summary.json").success(function (data) {
        $scope.summary = data;
    });
    
    $http.get("personal_info/experience.json").success(function (data) {
        $scope.exp = data;
    });
    
    $http.get("personal_info/projects.json").success(function (data) {
        $scope.prj = data;
    });
    
    $http.get("personal_info/skills.json").success(function (data) {
        $scope.skills = data;
    });
    
    $http.get("personal_info/education.json").success(function (data) {
        $scope.education = data;
    });
});