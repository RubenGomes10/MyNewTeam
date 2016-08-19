(() => {
  'use strict';
  angular.module('mntApp').directive('sidebar',sidebar);

  function sidebar() {
    let directive = {
      templateUrl:'assets/js/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controllerAs: 'vm',
      controller:controller,
      bindToController: true
    };

    return directive;

    controller.$inject = ['$authService'];
    function controller($authService) {
      let vm = this;
      vm.isAuthenticated = $authService.isAuthenticated();
      vm.role = $authService.authUser.role;
      vm.selectedMenu = 'dashboard';
      vm.collapseVar = 0;
      vm.multiCollapseVar = 0;
      vm.is = is;
      vm.check = check;
      vm.multiCheck = multiCheck;

      function is(role){
        return vm.role === role;
      }

      function check(x) {
        if(x == vm.collapseVar)
          vm.collapseVar = 0;
        else
          vm.collapseVar = x;

        vm.multiCollapseVar = 0;
      };

      function multiCheck(y) {
        if( y == vm.multiCollapseVar)
          vm.multiCollapseVar = 0;
        else
          vm.multiCollapseVar = y;
      };
    }
  }
})();
