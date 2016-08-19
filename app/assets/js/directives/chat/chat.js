'use strict';
angular.module('mntApp')
	.directive('chat',function(){
		return {
        templateUrl:'assets/js/directives/chat/chat.html',
        restrict: 'E',
        replace: true,
    	}
	});
