/*global angular, Firebase*/

var mdl = angular.module("factories", ["firebase"]);

mdl.factory("Ref", function () {
    'use strict';
    return new Firebase("https://brilliant-fire-3035.firebaseio.com");
});

mdl.factory("Auth", function (Ref, $firebaseAuth) {
    'use strict';
    return $firebaseAuth(Ref);
});