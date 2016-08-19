/**
 * Created by ManuelDMarques on 20/07/16.
 */
'use strict';
(function() {
    angular.module('mntApp')
        // Controller for posting places
        .controller('PostPlaceCtrl',['$scope','$http','$location',function($scope, $http, $location){
            $scope.place = {};

            // calling our submit function.
            $scope.postPlace = function() {
                console.log($scope.place)

                // / Posting data to php file
                $http.post('api/v1/places', $scope.place)
                    .success(function(data) {
                        console.log('---------- POST Place DONE ----------');
                        $scope.message = data.message;
                        console.log('---------- Redirecting to places ----------');
                        $location.path('/app/places');
                    })
                    .error(function (errors) {
                            console.log(errors);
                        }
                    );
            };
        }])
        // Controller for getting all places
        .controller('GetPlacesCtrl',['$scope','$http',function($scope, $http){
            $scope.data = [];

            console.log('At get all places!');
            // / Getting users
            $http.get('api/v1/places')
                .success(function(data) {
                    console.log('---------- GET DONE ----------')
                    $scope.places = data._places;
                    console.log(data._places);
                    //$scope.message = data.message;
                })
                .error(function (errors) {
                    console.log('Error - ' + errors);
                });
        }])

        // Controller for getting a specific place
        .controller('GetPlaceCtrl',['$scope','$http','$stateParams',function($scope, $http, $stateParams){
            console.log($stateParams);

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


            console.log('At get a place!');
            // / Getting users
            $http.get('api/v1/places/'+$stateParams.placeId)
                .success(function(data) {
                    console.log('---------- GET DONE ----------')
                    $scope.place = data._place;
                    console.log(data._place);
                    //$scope.message = data.message;
                })
                .error(function (errors) {
                    console.log('Error - ' + errors);
                });
        }]);
}());
