(function(){
  'use strict';
  angular.module('mntApp').controller('MainCtrl',controller);

  controller.$inject = ['$authService'];
  function controller($authService) {
    let vm = this;
    vm.isAuthenticated = $authService.isAuthenticated();
  }
})();
