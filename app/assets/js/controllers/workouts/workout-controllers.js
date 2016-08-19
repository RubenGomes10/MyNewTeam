/**
 * Created by ManuelDMarques on 08/06/16.
 */
'use strict';
(function(){
    angular.module('mntApp')
        // Controller for getting all workouts
        .controller('GetWorkoutsCtrl',['$scope', '$http',function($scope, $http){

            $scope.data = [];
            // calling our submit function.
            console.log('At get all workouts!');
            // / Getting users
            $http.get('api/v1/workouts')
                .success(function(data) {
                    //console.log('---------- GET DONE ----------')
                    $scope.data = data.workouts;
                    //console.log(data.workouts);
                    $scope.message = data.message;
                })
                .error(function (errors) {
                    console.log(errors);
                }
            );
        }])
        // Controller for getting a single workout
        .controller('GetWorkoutCtrl',['$scope', '$http', '$stateParams',function($scope, $http, $stateParams){
            console.log($stateParams);

            console.log('At get specific workout!');
            // / Getting workout
            $http.get('api/v1/workouts/'+$stateParams.workoutId)
                .success(function(data) {
                    console.log('---------- GET DONE ----------')
                    console.log(data);
                    $scope.workout = data.workout;
                })
                .error(function (error) {
                    console.log(error);
                }
            );
        }])
        // Controller for posting workouts
        .controller('PostWorkoutCtrl',['$scope', '$http', '$location',function($scope, $http, $location){
            $scope.workout = {};

            // calling our submit function.
            $scope.createWorkout = function() {
                console.log($scope.workout )

                // / Posting data to php file
                $http.post('api/v1/workouts', $scope.workout)
                    .success(function(data) {
                        console.log('---------- POST WORKOUT DONE ----------');
                        $scope.message = data.message;
                        console.log('---------- Redirecting to workouts ----------');
                        $location.path('/app/workouts');
                    })
                    .error(function (errors) {
                        console.log(errors);
                    }
                );
            };
        }]);
}())
