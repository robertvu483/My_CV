/*global angular, createDate, Firebase*/

// Declare app level module which depends on views, and components
var myCV = angular.module('myCV', ['customDirectives', 'firebase']);

myCV.controller('bodyController', function ($scope, $firebaseObject) {
    'use strict';
    var ref = new Firebase("https://brilliant-fire-3035.firebaseio.com");
    
    $scope.basic = $firebaseObject(ref.child("basic"));
    $scope.summary = $firebaseObject(ref.child("summary"));
    $scope.exp = $firebaseObject(ref.child("experience"));
    $scope.prj = $firebaseObject(ref.child("projects"));
    $scope.sks = $firebaseObject(ref.child("skills"));
    $scope.education = $firebaseObject(ref.child("education"));
    
    $scope.exp.$loaded().then(function () {
        createDate($scope.exp.experiences, ["startDate", "endDate"]);
    })["catch"](function (error) {
        window.alert("Error:" + error);
    });
    
    $scope.prj.$loaded().then(function () {
        createDate($scope.prj.projects, ["startDate", "endDate"]);
    })["catch"](function (error) {
        window.alert("Error:" + error);
    });

    $scope.display = {
        "basicAvatar": true,
        "basicName": true,
        "basicHeadline": true,
        "basicLocation": true,
        "basicContact": true,
        "basicFooter": false,
        "summary": true,
        "experience": true,
        "projects": true,
        "skills": true,
        "education": true
    };
    
    $scope.temp = {
        "basicAvatar": "",
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
    
    $scope.toggle = function (displayName) {
        $scope.display[displayName] = !$scope.display[displayName];
    };
    
    $scope.editForm = function (displayName, curValue) {
        $scope.hide(displayName);
        $scope.temp[displayName] = angular.copy(curValue);
    };
    
    $scope.editArrayForm = function (displayName, curValue, index) {
        $scope.editIndex[displayName] = index;
        $scope.editForm(displayName, curValue);
    };
    
    $scope.submitForm = function (displayName, obj, attrName, newValue) {
        $scope.show(displayName);
        obj[attrName] = angular.copy(newValue);
    };
    
    $scope.submitArrayForm = function (displayName, array, newValue) {
        var index = $scope.editIndex[displayName];
        
        $scope.show(displayName);
        
        if (index !== -1) {
            array[index] = angular.copy(newValue);
        } else {
            array.push(angular.copy(newValue));
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