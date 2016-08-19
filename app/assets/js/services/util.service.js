(function () {
    'use strict';

    angular.module('mntApp').factory('utilService', utilService);

    utilService.$inject = ['$q'];

    function utilService($q) {

      let service = {
          checkRole: checkRole,
          successCallback: successCallback,
          errorCallback: errorCallback
      };

      return service;

      function checkRole(userRoles, rolesToCheck) {
        if (!rolesToCheck) {
          return true;
        }
        if (!userRoles) {
          return false;
        }
        if(Array.isArray(userRoles)){ // N-N
          for (var i = 0; i < userRoles.length; i++) {
            if (rolesToCheck.indexOf(userRoles[i]) > -1) {
              return true;
            }
          }
        }else{ // 1-N
          if(rolesToCheck.indexOf(userRoles) > -1)
            return true;
        }

        return false;
      }

      function successCallback(response){
          return response.data;
      }

      function errorCallback(err){
        return $q.reject(err.data);
      }
  }
})();
