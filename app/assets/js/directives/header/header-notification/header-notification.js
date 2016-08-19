(function() {
	'use strict';

	angular.module('mntApp').directive('headerNotification', directive);
	directive.$inject = ['$authService'];
	function directive($authService){
		return {
        	templateUrl:'assets/js/directives/header/header-notification/header-notification.html',
        	restrict: 'E',
        	replace: true,
			scope: {
			},
			controller: function($scope){
				$scope.isAuthenticated = $authService.isAuthenticated();
				$scope.logout = $authService.logout;
			}
    }
	}
})();
