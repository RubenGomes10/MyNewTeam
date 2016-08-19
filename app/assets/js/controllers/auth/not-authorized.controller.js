(function(){
  'use strict';
  angular.module('mntApp').controller('NotAuthController', controller);

  controller.$inject = ['$authService'];
  function controller($authService) {
    let vm = this;
    vm.logout = () => $authService.logout();

    vm.authentication = $authService.authUser;
  }
})();
