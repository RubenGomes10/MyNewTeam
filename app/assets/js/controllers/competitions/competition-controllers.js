/**
 * Created by ManuelDMarques on 18/07/16.
 */
'use strict';
(function(){
    angular.module('mntApp')
    // Controller for getting all workouts
        .controller('GetCompetitionsCtrl',['$scope', '$http',function($scope, $http){

            $scope.data = [];
            // calling our submit function.
            console.log('At get all competitions!');
            // / Getting users
            $http.get('api/v1/competitions')
                .success(function(data) {
                    //console.log('---------- GET DONE ----------')
                    $scope.data = data.competitions;
                    //console.log(data.competitions);
                    $scope.message = data.message;
                })
                .error(function (errors) {
                        console.log(errors);
                    }
                );
        }])
        // Controller for getting a single competition
        .controller('GetCompetitionCtrl',['$scope', '$http', '$stateParams',function($scope, $http, $stateParams){

            $scope.setMap = function(latitude, longitude){
              var mapDiv = document.getElementById('map'),
                  lat = parseFloat(latitude),
                  lon = parseFloat(longitude);

              var map = new google.maps.Map(mapDiv, {
                  center: new google.maps.LatLng(lat, lon),
                  zoom: 18
              });

              var marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(lat, lon),
                });
            };

            console.log('At get specific competition!');
            // / Getting competition
            $http.get('api/v1/competitions/'+$stateParams.competitionId)
                .success(function(data) {
                    console.log('---------- GET COMPETITION ----------')
                    $scope.competition = data.competition;
                })
                .error(function (error) {
                        console.log(error);
                    }
                );

            // / Getting competition
            $http.get('api/v1/competitions/'+$stateParams.competitionId+'/events')
                .success(function(data) {
                    console.log('---------- GET EVENTS ----------')
                    $scope.events = data.events;
                })
                .error(function (error) {
                        console.log(error);
                    }
                );

        }])
        // Controller for posting competitions
        .controller('PostCompetitionCtrl',['$scope', '$http', '$location', '$rootScope',function($scope, $http, $location, $rootScope){
            var session = $rootScope.current_session || {user:{ role: 'Guest' }}, // anonymous
                club    = session.user.club;

            $scope.competition = {};
            $scope.places = [];
            $scope.events = [];
            $scope.selectedEvents = [];

            $scope.toggle = function (item) {
                var idx = $scope.selectedEvents.indexOf(item);
                if (idx > -1) {
                    $scope.selectedEvents.splice(idx, 1);
                }
                else {
                    $scope.selectedEvents.push(item);
                }

                console.log($scope.selectedEvents);
            };
            $scope.exists = function (item) {
                return $scope.selectedEvents.indexOf(item) > -1;
            };

            $http.get('/api/v1/places')
                .success(function(data){
                    console.log(data._places);
                    $scope.places = data._places;// play here
                })
                .error(function (errors) {
                    console.log(errors);
                });

            $http.get('/api/v1/events')
                .success(function(data){
                    console.log(data.events);
                    $scope.events = data.events;// play here
                })
                .error(function (errors) {
                    console.log(errors);
                });

            $scope.setSelectedEvents = function(){
                $scope.selectedEvents = $scope.selectedEvents.map(function(n){return n._id});
                $scope.competition.events = $scope.selectedEvents;
            };

            $scope.setClub = function(){
                console.log(club);
                $scope.competition.club = club;
            }

            // calling our submit function.
            $scope.createCompetition = function() {
                $scope.setSelectedEvents();
                console.log(session.user);
                $scope.competition.club = club;

                console.log($scope.competition);

                // Posting data
                $http.post('api/v1/competitions', $scope.competition)
                    .success(function(data) {
                        console.log('---------- POST competition DONE ----------');
                        $scope.message = data.message;
                        console.log('---------- Redirecting to competitions ----------');
                        $location.path('/app/competitions');
                    })
                    .error(function (errors) {
                            console.log(errors);
                        }
                    );
            };
        }]);
}())
