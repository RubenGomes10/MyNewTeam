(function() {
  'use strict';
    angular
      .module('mntApp')
      .controller('RegisterClubCtrl', registerClubController)
      .controller('GetClubsCtrl', getClubsController)
      .controller('GetClubCtrl',getClubController);

      getClubController.$inject = ['$http', '$stateParams', 'config']
      function getClubController($http, $stateParams, config){
        let vm = this;
        vm.setMap = setMap;
        vm.getClub = getClub;
        vm.club = getClub();

        function setMap(latitude, longitude){
          let mapDiv = document.getElementById('map'),
              lat = parseFloat(latitude),
              lon = parseFloat(longitude);

          let map = new google.maps.Map(mapDiv, {
              center: new google.maps.LatLng(lat, lon),
              zoom: 18
          });

          let marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(lat, lon),
            });
        }

        function getClub(){
          let httpRequest = $http.get(config.api.url + config.api.routes.clubs + '/' + $stateParams.clubId);
          return httpRequest.then((response) => response.data.club).catch((err) => console.log(err));
        }
      }

      getClubsController.$inject = ['$http', 'config'];
      function getClubsController($http, config){
        let vm = this;
        vm.clubs = [];
        vm.getClubs = getClubs;

        function getClubs(){
          $http.get(config.api.url + config.api.routes.clubs)
            .then((response) => vm.clubs = response.data.clubs)
            .catch((err) => console.log(err));
        }

        getClubs();
      }

      registerClubController.$inject = ['$http','$state','config'];
      function registerClubController($http, $state, config){
        let vm = this;
        vm.club = {};
        vm.registerClub = registerClub;

        function registerClub(){
          console.log(vm.club); // TODO: sweet-alert or toastr
          $http.post(config.api.url + config.api.routes.clubs, vm.club)
            .then((response) => state.go(dashboard.users))
            .catch((err) => console.log(err));
        }
      }
})();
