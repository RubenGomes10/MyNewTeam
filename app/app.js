(function () {
  'use strict';
  angular
    .module('mntApp',[
      'ui.router',
      'satellizer',
      'ui.bootstrap',
      'angular-loading-bar',
      'ngAnimate',
      'ngMessages',
      'toggle-switch',
      '720kb.datepicker',
      'ngTouch',
      'ngTable',
      'chart.js'
    ])
    .config(configRoutes)
    .config(configAuth)
    .run(appRun);

    configRoutes.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider'];
    function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!'); // set path int html5 format without #/path of Angular defaults.
      $urlRouterProvider.otherwise('/app/home'); // default path if no one match

      $stateProvider
        .state('dashboard', {
          url: '/app',
          templateUrl: 'views/dashboard/main.html'
        })
        .state('dashboard.home', {
          templateUrl: 'views/dashboard/home.html',
          url: '/home',
          controller: 'MainCtrl',
          controllerAs: 'vm'
        })
        .state('dashboard.registerClub', {
            templateUrl: 'views/clubs/club-register.html',
            url: '/clubs/register',
            controller: 'RegisterClubCtrl',
            controllerAs: 'vm',
            requireLogin: true,
            roles: ['Admin']
        })
        .state('dashboard.clubs', {
            templateUrl: 'views/clubs/clubList.html',
            url: '/clubs',
            controller: 'GetClubsCtrl',
            controllerAs: 'vm',
            requireLogin: false
        })
        .state('dashboard.club', {
            templateUrl: 'views/clubs/club.html',
            url: '/clubs/:clubId',
            controller: 'GetClubCtrl',
            controllerAs: 'vm',
            requireLogin: false
        })
        .state('dashboard.profile',{
            templateUrl: 'views/users/profile.html',
            url: '/users/profile'
        })
        .state('dashboard.submitUser', {
            templateUrl: 'views/users/user-create.html',
            url: '/users/submit',
            controller: 'UserCreateController',
            controllerAs: 'vm',
            requireLogin: true,
            roles: ['Admin', 'Manager', 'Coach']
        })
        .state('dashboard.users', {
            templateUrl: 'views/users/user-list.html',
            url: '/users',
            controller: 'userListController',
            controllerAs: 'vm',
            requireLogin: true
        })
        .state('dashboard.user', {
            templateUrl: 'views/users/user-profile.html',
            url: '/users/:id',
            controller: 'userDetailController',
            controllerAs: 'vm',
            requireLogin: true
        })
        .state('dashboard.submitWorkout', {
            templateUrl: 'views/workout/workoutPost.html',
            url: '/workouts/submit',
            controller: 'PostWorkoutCtrl',
            requireLogin: true,
            roles: ['Manager', 'Coach']
        })
        .state('dashboard.workouts', {
            templateUrl: 'views/workout/workoutList.html',
            url: '/workouts',
            controller: 'GetWorkoutsCtrl',
            requireLogin: true,
            roles: ['Manager', 'Coach', 'Athlete']
        })
        .state('dashboard.workout', {
            templateUrl: 'views/workout/workout.html',
            url: '/workout/:workoutId',
            controller: 'GetWorkoutCtrl',
            requireLogin: true,
            roles: ['Manager', 'Coach', 'Athlete']
        })
        .state('dashboard.submitCompetition', {
            templateUrl: 'views/competitions/competitionPost.html',
            url: '/competitions/submit',
            controller: 'PostCompetitionCtrl',
            requireLogin: true,
            roles: ['Manager', 'Coach']
        })
        .state('dashboard.competitions', {
            templateUrl: 'views/competitions/competitionList.html',
            url: '/competitions',
            controller: 'GetCompetitionsCtrl',
            requireLogin: true,
            roles: ['Manager', 'Coach', 'Athlete']
        })
        .state('dashboard.competition', {
            templateUrl: 'views/competitions/competition.html',
            url: '/competitions/:competitionId',
            controller: 'GetCompetitionCtrl',
            requireLogin: true,
            roles: ['Manager', 'Coach', 'Athlete']
        })
        .state('dashboard.submitEvent', {
            templateUrl: 'views/events/eventPost.html',
            url: '/events/submit',
            controller: 'PostEventCtrl',
            requireLogin: true,
            roles: ['Manager', 'Coach']
        })
        .state('dashboard.events', {
            templateUrl: 'views/events/eventList.html',
            url: '/events',
            controller: 'GetEventsCtrl',
            requireLogin: true,
            roles: ['Manager', 'Coach', 'Athletes']
        })
        .state('dashboard.event', {
            templateUrl: 'views/events/event.html',
            url: '/events/:eventId',
            controller: 'GetEventCtrl',
            requireLogin: true,
            roles: ['Manager', 'Coach', 'Athlete']
        })
        .state('dashboard.submitPlace', {
            templateUrl: 'views/places/placePost.html',
            url: '/places/submit',
            controller: 'PostPlaceCtrl',
            requireLogin: true,
            roles: ['Manager', 'Coach']
        })
        .state('dashboard.places', {
            templateUrl: 'views/places/placeList.html',
            url: '/places',
            controller: 'GetPlacesCtrl',
            requireLogin: true,
            roles: ['Manager', 'Coach', 'Athlete']
        })
        .state('dashboard.place', {
            templateUrl: 'views/places/place.html',
            url: '/places/:placeId',
            controller: 'GetPlaceCtrl',
            requireLogin: true,
            roles: ['Manager', 'Coach', 'Athlete']
        })
        .state('login', {
          templateUrl: 'views/pages/login.html',
          url: '/login',
          controller: 'LoginCtrl',
          controllerAs: 'vm',
          requireLogin: false
        })
        .state('dashboard.chart', {
          templateUrl: 'views/chart.html',
          url: '/chart',
          controller: 'ChartCtrl',
          requireLogin: false
        })
        .state('notauthorized', {
          url: '/notauthorized',
          templateUrl: 'views/pages/not-authorized.html',
          controller: 'NotAuthController',
          controllerAs: 'vm',
          requireLogin: false
        });
    }

    configAuth.$inject = ['$authProvider'];
    function configAuth($authProvider){
      let googleLoginURL = 'http://localhost:8080/auth/google';
      let facebookLoginURL = 'http://localhost:8080/auth/facebook';
      $authProvider.loginUrl = 'http://localhost:8080/getToken';
      $authProvider.tokenPrefix = 'mynewteam';
      $authProvider.tokenHeader = 'x-access-token';
      $authProvider.tokenType = null;
    }

    appRun.$inject = ['$rootScope', '$state', '$authService', 'utilService'];
    function appRun($rootScope, $state, $authService, utilService){
      $authService.fillData();
      $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
        if(toState.requireLogin && !$authService.isAuthenticated()){
          event.preventDefault();
          $state.go('login');
        }
        if(!utilService.checkRole($authService.authUser.role, toState.roles)){
          event.preventDefault();
          $state.go('notauthorized');
        }
      });

      $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
        setTimeout(function(){
          let width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
          let $nav = $('nav.navbar');
          let $sidebar = $('div.sidebar-nav');
          if (width < 768) {
              $sidebar.removeClass('in');
              $sidebar.attr("aria-expanded", "false");

              $nav.removeClass('navbar-fixed-top');
              $nav.addClass('navbar-static-top');
          } else {
              $nav.removeClass('navbar-static-top');
              $nav.addClass('navbar-fixed-top');
          }
        },100);
      });
    }

})();
