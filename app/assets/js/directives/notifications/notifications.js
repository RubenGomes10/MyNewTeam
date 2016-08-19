'use strict';

angular.module('mntApp')
	.directive('notifications',function(){
		return {
        templateUrl:'assets/js/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});
