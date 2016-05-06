/*global FileReader*/

function createDate(array, attrList) {
    'use strict';
    
    var i, j;

    for (i = 0; i < array.length; i = i + 1) {
        for (j = 0; j < attrList.length; j = j + 1) {
            array[i][attrList[j]] = new Date(array[i][attrList[j]]);
        }
    }
}

function resetFileInput(elementId) {
    document.getElementById(elementId).value = "";
}