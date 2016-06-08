/*
 * init modules, and
 * inject D3 into our directive, and
 * inject the directive and controller into main ‘d3App’ angular app.
*/

(function () {
    
    'use strict';
    
    angular.module('d3App', ['d3App.controllers', 'd3App.directives']);
    angular.module('d3', []);
    angular.module('d3App.controllers', []);
    angular.module('d3App.directives', ['d3']);
    
})();