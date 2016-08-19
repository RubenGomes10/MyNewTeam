'use strict';

angular.module('mntApp')
	.directive('header',function(){
		return {
        templateUrl:'assets/js/directives/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});
