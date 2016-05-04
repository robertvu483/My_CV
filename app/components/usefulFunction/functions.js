function cloneObject(obj) {
    'use strict';
    
    var keys,
        temp,
        i;
    
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    temp = obj.constructor(); // give temp the original obj's constructor
    keys = Object.keys(obj);
    for (i = 0; i < keys.length; i = i + 1) {
        temp[keys[i]] = cloneObject(obj[keys[i]]);
    }
 
    return temp;
}

function createDate(array, attrList) {
    'use strict';
    
    var i, j;

    for (i = 0; i < array.length; i = i + 1) {
        for (j = 0; j < attrList.length; j = j + 1) {
            array[i][attrList[j]] = new Date(array[i][attrList[j]]);
        }
    }
}