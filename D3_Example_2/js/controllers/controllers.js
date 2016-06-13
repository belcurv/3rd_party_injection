(function () {
    
    'use strict';
    
    angular.module('myApp.controllers')
    
        .controller('mainController', ['$scope', '$http', function ($scope, $http) {

            // initialize variables
            var reformatGithubResponse,
                date, date0, dateN, days, curDay,
                uniqueAuthors,
                authorMap,
                formattedData,
                i, j;
            
            // initialize the model
            $scope.title = "Injecting D3 library into Angular app, with XHR GET.";
            $scope.user = 'belcurv';
            $scope.repo = 'csv_parse';
            
            // helper for formatting date
            function humanReadableDate(d) {
                return d.getUTCMonth() + 1 + '/' + d.getUTCDate();
            }
            
            // helper for reformatting the Github API response into a form we can pass to D3
            reformatGithubResponse = function (data) {
                
                // sort data by author date rather than commit date
                data.sort(function (a, b) {
                    if (new Date(a.commit.author.date) > new Date(b.commit.author.date)) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
                
                // date objects representing the first/last commit dates
                date0 = new Date(data[data.length - 1].commit.author.date);
                dateN = new Date(data[0].commit.author.date);
                
                // the number of days between the first and last commit
                days = Math.floor((dateN - date0) / 86400000) + 1;
                
                // map authors and indexes
                uniqueAuthors = [];   // map index -> author
                authorMap = {};       // map author -> index
                data.forEach(function (datum) {
                    var name = datum.commit.author.name;
                    if (uniqueAuthors.indexOf(name) === -1) {
                        authorMap[name] = uniqueAuthors.length;
                        uniqueAuthors.push(name);
                    }
                });
                
                // build up the data to be passed to our d3 visualization
                formattedData = [];
                formattedData.length = uniqueAuthors.length;
                for (i = 0; i < formattedData.length; i += 1) {
                    formattedData[i] = [];
                    formattedData[i].length = days;
                    for (j = 0; j < formattedData[i].length; j += 1) {
                        formattedData[i][j] = {
                            x: j,
                            y: 0
                        };
                    }
                }
                data.forEach(function (datum) {
                    date = new Date(datum.commit.author.date);
                    curDay = Math.floor((date - date0) / 86400000);
                    formattedData[authorMap[datum.commit.author.name]][curDay].y += 1;
                    formattedData[0][curDay].date = humanReadableDate(date);
                });
                
                // add author names to data for the chart's key
                for (i = 0; i < uniqueAuthors.length; i += 1) {
                    formattedData[i][0].user = uniqueAuthors[i];
                }
                
                return formattedData;
            };
            
            $scope.getCommitData = function () {
                
                $http({
                    method: 'GET',
                    url   : 'https://api.github.com/repos/' +
                            $scope.user + '/' +
                            $scope.repo + '/commits'
                })
                    .success(function (data) {
                        // attach this data to the scope
                        $scope.data = reformatGithubResponse(data);

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
            
            // get the commit data immediately
            $scope.getCommitData();
            
        }]);
    
})();