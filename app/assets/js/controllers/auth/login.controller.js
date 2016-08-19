(function() {
  'use strict';
  angular.module('mntApp').controller('LoginCtrl', loginController);

  loginController.$inject = ['$state','$authService'];
  function loginController ($state, $authService) {
    let vm = this;
    vm.login = login;
    vm.error_message = '';
    vm.authModel = { userName: '', password: ''};

    function login() {
      $authService.login(vm.authModel)
        .then(() => $state.go('dashboard.home'))
        .catch((err) => { //TODO: launch toastr(error) or sweetAlert(error)
          vm.error_message = err.message;
          vm.authModel.userName = '';
          vm.authModel.password = '';
        });
    }
  }
})();
