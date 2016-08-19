(() => {
  'use strict';
  angular.module('mntApp').controller('userDetailController', controller);

  controller.$inject = ['$userService', '$stateParams'];
  function controller($userService, $stateParams){
    let vm = this;
    vm.account = {};
    vm.user = {};
    vm.hasDL = false;
    vm.existImg = false;
    vm.getUser = getUser;

    vm.getUser();

    function getUser(){
      $userService.User.getAccount($stateParams.id)
        .then((response) => {
          let account = response.account;
          vm.user = account.user;
          if(account.user.documentation.driving_license)
            vm.hasDL = true;
          if(account.user.img){
            existImg = true;
          }
          delete account.user;
          vm.account = account;
        })
        .catch((err) => console.log(err));
    }


  }
})();
