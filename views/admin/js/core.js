var ostoreApp = angular.module('ostoreApp', []);

ostoreApp.controller('ostoreController', function ($scope, $http) {

    $scope.doSearch = function () {

        var datatosend = {
            "searchfeild": $scope.searchfeild,
        }

        $http({
            method: 'POST',
            url: '/api/search',
            data: datatosend,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function mySucces(resp) {

            $scope.respObj = resp;

        }, function myError(response) {



        });
    };
});
