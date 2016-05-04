/*global angular, cloneObject, createDate*/

// Declare app level module which depends on views, and components
var myCV = angular.module('myCV', []);

myCV.controller('bodyController', function ($scope, $http) {
    'use strict';
    
    window.abc = $scope;
    
    $http.get("personal_info/basic.json").success(function (data) {
        $scope.basic = data;
    });
    
    $http.get("personal_info/summary.json").success(function (data) {
        $scope.summary = data;
    });
    
    $http.get("personal_info/experience.json").success(function (data) {
        $scope.exp = data;
        createDate($scope.exp.experiences, ["startDate", "endDate"]);
    });
    
    $http.get("personal_info/projects.json").success(function (data) {
        $scope.prj = data;
        createDate($scope.prj.projects, ["startDate", "endDate"]);
    });
    
    $http.get("personal_info/skills.json").success(function (data) {
        $scope.sks = data;
    });
    
    $http.get("personal_info/education.json").success(function (data) {
        $scope.education = data;
    });
    
    $scope.display = {
        "basicName": true,
        "basicHeadline": true,
        "basicLocation": true,
        "basicContact": true,
        "summary": true,
        "experience": true,
        "projects": true,
        "skills": true,
        "education": true
    };
    
    $scope.temp = {
        "basicName": "",
        "basicHeadline": "",
        "basicLocation": "",
        "basicContact": [],
        "summary": "",
        "experience": {},
        "projects": {},
        "skills": [],
        "skill": "",
        "education": {}
    };
    
    $scope.editIndex = {
        "experience": -1,
        "projects": -1,
        "education": -1
    };
    
    $scope.show = function (displayName) {
        $scope.display[displayName] = true;
    };
    
    $scope.hide = function (displayName) {
        $scope.display[displayName] = false;
    };
    
    $scope.editForm = function (displayName, curValue) {
        $scope.hide(displayName);
        $scope.temp[displayName] = cloneObject(curValue);
    };
    
    $scope.editArrayForm = function (displayName, curValue, index) {
        $scope.editIndex[displayName] = index;
        $scope.editForm(displayName, curValue);
    };
    
    $scope.submitForm = function (displayName, obj, attrName, newValue) {
        $scope.show(displayName);
        obj[attrName] = cloneObject(newValue);
    };
    
    $scope.submitArrayForm = function (displayName, array, newValue) {
        var index = $scope.editIndex[displayName];
        
        $scope.show(displayName);
        
        if (index !== -1) {
            array[index] = cloneObject(newValue);
        } else {
            array.push(cloneObject(newValue));
        }
    };
    
    $scope.hasData = function (obj) {
        return !(typeof obj === "undefined" || obj === null || obj === "");
    };
    
    $scope.addSkill = function () {
        if ($scope.temp.skill !== "") {
            $scope.temp.skills.push($scope.temp.skill);
            $scope.temp.skill = "";
        }
    };
    
    $scope.removeSkill = function (index) {
        $scope.temp.skills.splice(index, 1);
    };
});