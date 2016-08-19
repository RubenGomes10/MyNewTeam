(() => {
  'use strict';

  angular.module('mntApp').controller('UserCreateController', controller);

  controller.$inject =  ['$state', '$authService', '$userService', '$clubService'];
  function controller($state, $authService, $userService, $clubService){
    let vm = this;
    vm.IsAdmin = $authService.authUser.role === 'Admin';

    vm.user= {};
    vm.clubs = [];
    vm.club = {};

    vm.calculateAge = calculateAge;
    vm.registerUser = registerUser;

    if(vm.IsAdmin){
      $clubService.getAll()
        .then((response) => vm.clubs = response.clubs)
        .catch((err) => console.log(err));
    }

    function registerUser() {
        vm.calculateAge(vm.user.birthday);
        if(!vm.IsAdmin)
          vm.user.club = $authService.authUser.info.club;
        $userService[vm.user.role].createOne(vm.user)
            .then((response) => $state.go('dashboard.users'))
            .catch((err) => console.log(err));
    }

    function calculateAge(birthday) { // birthday is a date
          let ageDifMs = Date.now() - new Date(birthday);
          let ageDate = new Date(ageDifMs); // miliseconds from epoch
          let age = (Math.abs(ageDate.getUTCFullYear() - 1970));
          vm.user.age = age;
      };
  }

})();
