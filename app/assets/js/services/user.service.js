(() => {
  'use strict';
  angular.module('mntApp').factory('$userService', $userService);

  $userService.$inject = ['$http', 'config', 'utilService'];
  function $userService($http, config, utilService){
    let apiURL = config.api.url;
    let athletesRoute = config.api.routes.athletes;
    let coachesRoute = config.api.routes.coaches;
    let managersRoute = config.api.routes.managers;
    let usersRoute = config.api.routes.users;
    let accountRoute = '/account';
    let changePasswordRoute = accountRoute + '/changePassword';
    let service = {
      User: {
        getAll: getAll(usersRoute),
        getOne: getOne(usersRoute),
        getAccount: getAccount,
        updateAccount: updateAccount,
        changePassword: changePassword
      },
      Athlete: {
        getAll: getAll(athletesRoute),
        getOne: getOne(athletesRoute),
        createOne: createOne(athletesRoute),
        updateOne: updateOne(athletesRoute),
        deleteOne: deleteOne(athletesRoute),
        getCompetitions: getCompetitions(athletesRoute),
        addCompetition: addCompetition(athletesRoute),
        getWorkouts: getWorkouts(athletesRoute),
        addWorkout: addWorkout(athletesRoute),
        getCoaches: getAthleteCoaches,
        aggregateCoach: aggregateCoach,
        getResults: getResults,
        getMonthlyFees: getMonthlyFees,
        addMonthlyFee: addMonthlyFee,
        updateMonthlyFee: updateMonthlyFee,
      },
      Coach: {
        getAll: getAll(coachesRoute),
        getOne: getOne(coachesRoute),
        createOne: createOne(coachesRoute),
        updateOne: updateOne(coachesRoute),
        deleteOne: deleteOne(coachesRoute),
        getCompetitions: getCompetitions(coachesRoute),
        addCompetition: addCompetition(coachesRoute),
        getWorkouts: getWorkouts(coachesRoute),
        addWorkout: addWorkout(coachesRoute),
        getAthletes: getCoachesAthletes
      },
      Manager: {
        getAll: getAll(managersRoute),
        getOne: getOne(managersRoute),
        createOne: createOne(managersRoute),
        updateOne: updateOne(managersRoute),
        deleteOne: deleteOne(managersRoute),
      },
      getRoles: getRoles
    };

    return service;

    function getAll(basePath) {
      return () => {
        let url = apiURL + basePath;
        return $http.get(url).then(utilService.successCallback).catch(utilService.errorCallback);
      }
    }

    function getOne(basePath) {
      return (id) => {
        let url = apiURL + basePath + '/' + id;
        return $http.get(url).then(utilService.successCallback, utilService.errorCallback);
      }
    }

    function createOne(basePath) {
      return (user) => {
        let url = apiURL + basePath;
        return $http.post(url, user).then(utilService.successCallback, utilService.errorCallback);
      }
    }

    function updateOne(basePath) {
      return (id, user) => {
        let url = apiURL + basePath + '/'+ id;
        return $http.put(url, user).then(utilService.successCallback, utilService.errorCallback);
      }
    }

    function deleteOne(basePath) {
      return (id) => {
        let url = apiURL + basePath + '/' + id;
        return $http.delete(url).then(utilService.successCallback, utilService.errorCallback);
      }
    }

    function getAccount(id) {
      let url = apiURL + usersRoute + '/' + id + accountRoute;
      return $http.get(url).then(utilService.successCallback,utilService.errorCallback);
    }

    function updateAccount(id, account) {
      let url = apiURL + usersRoute + '/' + id + accountRoute;
      return $http.put(url, account).then(utilService.successCallback, utilService.errorCallback);
    }

    function changePassword(id, passwordModel){
      let url = apiURL + usersRoute + '/' + id + changePasswordRoute;
      return $http.post(url, passwordModel).then(utilService.successCallback, utilService.errorCallback);
    }

    function getCompetitions(basePath) {
      return (id) => {
        let url = apiURL + basePath + '/' + id + config.api.routes.competitions;
        return $http.get(url).then(utilService.successCallback, utilService.errorCallback);
      }
    }

    function addCompetition(basePath) {
      return (id, competition) => {
        let url = apiURL + basePath + '/' + id + config.api.routes.competitions;
        return $http.post(url, competition).then(utilService.successCallback, utilService.errorCallback);
      }
    }

    function getWorkouts(basePath) {
      return (id) => {
        let url = apiURL + basePath + '/' + id + config.api.routes.workouts;
        return $http.get(url).then(utilService.successCallback, utilService.errorCallback);
      }
    }

    function addWorkout(basePath) {
      return (id, workout) => {
        let url = apiURL + basePath + '/' + id + config.api.routes.workouts;
        return $http.post(url, workout).then(utilService.successCallback, utilService.errorCallback);
      }
    }
    function getCoachesAthletes(id) {
      let url = apiURL + coachesRoute + '/' + id + athletesRoute;
      return $http.get(url).then(utilService.successCallback, utilService.errorCallback);
    }

    function getAthleteCoaches(id) {
      let url = apiURL + athletesRoute + '/' + id + coachesRoute;
      return $http.get(url).then(utilService.successCallback, utilService.errorCallback);
    }

    function aggregateCoach(id, coach){
      let url = apiURL + athletesRoute + '/' + id + coachesRoute;
      return $http.post(url, coach).then(utilService.successCallback, utilService.errorCallback);
    }

    function getResults(id) {
      let url = apiURL + athletesRoute + '/' + id + config.api.routes.results;
      return $http.get(url).then(utilService.successCallback, utilService.errorCallback);
    }

    function getMonthlyFees(id) {
      let url = apiURL + athletesRoute + '/' + id + config.api.routes.monthlyFees;
      return $http.get(url).then(utilService.successCallback, utilService.errorCallback);
    }

    function addMonthlyFee(id, monthlyFee) {
      let url = apiURL + athletesRoute + '/' + id + config.api.routes.monthlyFees;
      return $http.post(url, monthlyFee).then(utilService.successCallback, utilService.errorCallback);
    }

    function updateMonthlyFee(id, monthlyFee, monthlyFeeID) {
      let url = apiURL + athletesRoute + '/' + id + config.api.routes.monthlyFees + '?monthlyFee='+ monthlyFeeID;
      return $http.put(url, monthlyFee).then(utilService.successCallback, utilService.errorCallback);
    }

    function getRoles() {
      return ['Athlete', 'Coach', 'Manager'];
    }
  }
})();
