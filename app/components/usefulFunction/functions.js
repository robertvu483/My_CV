function cloneObject(obj) {
    'use strict';
    
    var keys = Object.keys(obj),
        temp,
        i;
    
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
 
    temp = obj.constructor(); // give temp the original obj's constructor
    for (i = 0; i < keys.length; i = i + 1) {
        temp[keys[i]] = cloneObject(obj[keys[i]]);
    }
 
    return temp;
}