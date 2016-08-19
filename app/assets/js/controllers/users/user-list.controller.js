(() => {
  'use strict';
  angular.module('mntApp').controller('userListController', controller);

  controller.$inject = ['NgTableParams', '$userService', '$authService', '$clubService'];
  function controller(NgTableParams, $userService, $authService, $clubService){
    let vm = this;
    vm.users = [];
    vm.currentUser = $authService.authUser.info;
    vm.getUsers = getUsers;
    vm.deleteUser = deleteUser;
    vm.getRoles = getRoles;
    vm.isAdmin = isAdmin;
    vm.hasPermission = hasPermission;
    vm.isAuthorized = isAuthorized;
    vm.tableParams = {};



    function getUsers(){
      if(vm.isAdmin()){
        getAllUsers();
      }else{
        getUsersByClub();
      }
    }
    vm.getUsers();
    /*
    * Get users by club id of currentUser
    */
    function getUsersByClub(){
      return $clubService.getUsers(vm.currentUser.club).then((response) => {
        vm.users = response.users;
        initializeNgTable(vm.users);
      })
      .catch((err) => console.log(err));
    }

    /*
    * Get all users (Admin management)
    */
    function getAllUsers(){
      return $userService.User.getAll().then((response) => {
        vm.users = response.users;
        initializeNgTable(vm.users);
      })
      .catch((err) => console.log(err));
    }

    /*
    * Initialize ng-table on page one and each page have max 10 rows
    */
    function initializeNgTable(users){
      vm.tableParams = new NgTableParams({page: 1, count: 10},{data: users});
    }

    /*
    * Deletes a User and actualize the row data
    */
    function deleteUser(user){
      $userService[user.role].deleteOne(user._id).then((response) => {
        vm.getUsers();
      })
      .catch((err)=> console.log(err));
    }
    /*
    * Get Static roles of Users
    */
    function getRoles(){
      return [{id: "", title: ""}, {id: "Athlete", title: "Athlete"}, { id: "Coach", title: "Coach"}, { id: "Manager", title: "Manager"}];
    }

    /*
    * Authorization Methods
    */
    function isAdmin(){
      return vm.currentUser.role == 'Admin';
    }

    function hasPermission(){
      return vm.currentUser.role == 'Manager';
    }

    function isAuthorized(){
      return vm.isAdmin() || vm.hasPermission();
    }
  }

})();
