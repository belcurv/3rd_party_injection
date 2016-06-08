(function () {
    
    'use strict';
    
    angular.module('d3App.directives')
    
        .directive('d3Lines', ['d3', function (d3) {
            
            return {
                restrict : 'EA',
                link     : function (scope) {
                    
                    // chart code here
                    
                }
            };
            
        }]);
})();