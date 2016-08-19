'use strict';

angular.module('mntApp')
	.directive('timeline',function() {
        return {
            templateUrl: 'assets/js/directives/timeline/timeline.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($scope, $rootScope) {
                $scope.authenticated = $rootScope.authenticated;
            }
        }
    });
