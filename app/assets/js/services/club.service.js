(() => {
  'use strict';

  angular.module('mntApp').factory('$clubService', $clubService);

  $clubService.$inject = ['$http','config','utilService'];
  function $clubService($http, config, utilService){
    let apiUrl = config.api.url;
    let clubs = config.api.routes.clubs;
    let athletes = config.api.routes.athletes;
    let coaches = config.api.routes.coaches;
    let managers = config.api.routes.managers;
    let users = config.api.routes.users;
    let competitions = config.api.routes.competitions;
    let inventory = config.api.routes.products;

    let service = {
      getAll: getAll,
      getOne: getOne,
      createOne: createOne,
      updateOne: updateOne,
      deleteOne: deleteOne,
      getUsers: getUsers,
      getAthletes: getAthletes,
      getCoaches: getCoaches,
      getManagers: getManagers,
      getCompetitions: getCompetitions,
      getInventory: getInventory
    }

    function getAll(){
      let url = apiUrl + clubs;
      return $http.get(url).then(utilService.successCallback, utilService.errorCallback);
    }

    function getOne(id){
      let url = apiUrl + clubs + '/'+ id;
      return $http.get(url).then(utilService.successCallback, utilService.errorCallback);
    }

    function createOne(club){
      let url = apiUrl + clubs;
      return $http.post(url, club).then(utilService.successCallback, utilService.errorCallback);
    }

    function updateOne(id, club){
      let url = apiUrl + clubs + '/'+ id;
      return $http.put(url, club).then(utilService.successCallback, utilService.errorCallback);
    }

    function deleteOne(id){
      let url = apiUrl + clubs + '/'+ id;
      return $http.delete(url).then(utilService.successCallback, utilService.errorCallback);
    }

    function getUsers(id){
      let url = apiUrl + clubs + '/'+ id + users;
      return $http.get(url).then(utilService.successCallback, utilService.errorCallback);
    }

    function getAthletes(){
      let url = apiUrl + clubs + '/'+ id + athletes;
      return $http.delete(url).then(utilService.successCallback, utilService.errorCallback);
    }

    function getCoaches(){
      let url = apiUrl + clubs + '/'+ id + coaches;
      return $http.delete(url).then(utilService.successCallback, utilService.errorCallback);
    }

    function getManagers(){
      let url = apiUrl + clubs + '/'+ id + managers;
      return $http.delete(url).then(utilService.successCallback, utilService.errorCallback);
    }

    function getCompetitions(){
      let url = apiUrl + clubs + '/'+ id + competitions;
      return $http.delete(url).then(utilService.successCallback, utilService.errorCallback);
    }

    function getInventory(){
      let url = apiUrl + clubs + '/'+ id + inventory;
      return $http.delete(url).then(utilService.successCallback, utilService.errorCallback);
    }

    return service;
  }
})();
