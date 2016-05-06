/*global angular, FileReader*/

var module = angular.module('customDirectives', []);

module.directive("fileModel", function () {
    'use strict';
    
    return {
        scope: {
            fileModel: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                if (window.File && window.FileReader && window.FileList && window.Blob) {
                    var files = changeEvent.target.files,
                        reader;
                    
                    if (files.length > 0) {
                        reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                scope.fileModel = loadEvent.target.result;
                            });
                        };

                        reader.readAsDataURL(changeEvent.target.files[0]);
                    }
                } else {
                    window.alert("The File APIs are not fully supported in this browser.");
                }
            });
        }
    };
});