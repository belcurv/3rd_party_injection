/*
 * init modules, and
 * inject D3 into our directive, and
 * inject the directive and controller into main ‘myApp’ angular app.
*/

(function () {
    
    'use strict';
    
    angular.module('myApp', ['myApp.controllers', 'myApp.directives']);
    angular.module('d3', []);
    angular.module('myApp.controllers', []);
    angular.module('myApp.directives', ['d3']);
    
})();