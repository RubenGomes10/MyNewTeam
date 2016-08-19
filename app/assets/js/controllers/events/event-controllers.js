/**
 * Created by ManuelDMarques on 19/07/16.
 */
'use strict';
(function(){
    angular.module('mntApp')
        .controller('GetEventsCtrl',['$scope','$http',function($scope, $http){

            $scope.data = [];
            // calling our submit function.
            console.log('At get all events!');
            // / Getting users
            $http.get('api/v1/events')
                .success(function(data) {
                    //console.log('---------- GET DONE ----------')
                    $scope.data = data.events;
                    //console.log(data.workouts);
                    $scope.message = data.message;
                })
                .error(function (errors) {
                        console.log(errors);
                    }
                );
        }])
        .controller('GetEventCtrl',['$scope','$http','$stateParams',function($scope, $http,$stateParams){
            console.log($stateParams);

            console.log('At get specific workout!');
            // / Getting workout
            $http.get('api/v1/events/'+$stateParams.eventId)
                .success(function(data) {
                    console.log('---------- GET DONE ----------')
                    console.log(data);
                    $scope.event = data.event;
                })
                .error(function (error) {
                        console.log(error);
                    }
                );
        }])
        // Controller for posting events
        .controller('PostEventCtrl',['$scope','$http','$location',function($scope, $http, $location){
            $scope.event = {};

            // calling our submit function.
            $scope.createEvent = function() {
                console.log($scope.event )

                $http.post('api/v1/events', $scope.event)
                    .success(function(data) {
                        console.log('---------- POST WORKOUT DONE ----------');
                        $scope.message = data.message;
                        console.log('---------- Redirecting to workouts ----------');
                        $location.path('/app/events');
                    })
                    .error(function (errors) {
                            console.log(errors);
                        }
                    );
            };
        }]);
}())
