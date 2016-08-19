
(function() {
'use strict';
  angular.module('mntApp').factory('$authService',authService);

  authService.$inject = ['$http', '$injector','$window', '$q', '$auth'];

  function authService($http, $injector, $window, $q, $auth) {
    let authUser = {
      userName: '',
      accountInfo: '',
      info : '',
      role: ''
    };

    let service = {
      authUser: authUser,
      login: login,
      logout: logout,
      isAuthenticated: isAuthenticated,
      fillData: fillData
    };

    return service;

    function login(credentials) {
      return $auth.login({username: credentials.userName, password: credentials.password})
        .then((response) => loginSuccess(response))
        .catch((err) => loginError(err));
    }

    function logout() {
      clearAuthStorage();
      $injector.get('$state').go('login');
    }

    function isAuthenticated(){
      return $auth.isAuthenticated();
    }

    function loginSuccess(response) {
      $window.localStorage.currentAccount = JSON.stringify(response.data.account);
      let currentAccount = JSON.parse($window.localStorage.currentAccount);
      authUser.username = currentAccount.local.username;
      authUser.info = currentAccount.user;
      authUser.role = currentAccount.user.role;
      delete currentAccount.user;
      authUser.accountInfo = currentAccount;
      return response;
    }

    function loginError(err) {
      return $q.reject(err.data);
    }

    function fillData(){
      if(isAuthenticated()){
        let currentAccount = JSON.parse($window.localStorage.currentAccount);
        authUser.username = currentAccount.local.username;
        authUser.info = currentAccount.user;
        authUser.role = currentAccount.user.role;
        delete currentAccount.user;
        authUser.accountInfo = currentAccount;
      }
    }

    function clearAuthStorage() {
      $auth.logout();
      delete $window.localStorage.currentAccount;
      authUser.username = '';
      authUser.accountInfo = '';
      authUser.info = '';
      authUser.role = '';
    }
  }
})();
