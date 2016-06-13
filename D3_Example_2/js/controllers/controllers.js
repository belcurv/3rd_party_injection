(function () {
    
    'use strict';
    
    angular.module('myApp.controllers')
    
        .controller('mainController', ['$scope', '$http', 'reformatService', function ($scope, $http, reformatService) {

            // initialize the model
            $scope.title = "Injecting D3 library into Angular app, with XHR GET.";
            $scope.user = 'belcurv';
            $scope.repo = 'csv_parse';
            
            // define GET method and responses
            $scope.getCommitData = function () {
                
                $http({
                    method: 'GET',
                    url   : 'https://api.github.com/repos/' +
                            $scope.user + '/' +
                            $scope.repo + '/commits'
                })
                    .success(function (data) {
                        // pass 'data' to our reformat service and bind formatted
                        // results to $scope
                        $scope.data = reformatService.reformatGithubResponse(data);

                        // clear the error messages
                        $scope.error = '';
                    })
                    .error(function (data, status) {
                        if (status === 404) {
                            $scope.error = 'That repository does not exist';
                        } else {
                            $scope.error = 'Error: ' + status;
                        }
                    });
            };
            
            // GET the commit data immediately
            $scope.getCommitData();
            
        }]);
    
})();