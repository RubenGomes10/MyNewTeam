(function () {
  'use strict';
    var config = {
        baseURL: 'http://localhost:3000',
        api: {
          url: 'http://localhost:8080',
          routes: {
            clubs: '/clubs',
            auth: '/getToken',
            users: '/users',
            athletes: '/athletes',
            coaches: '/coaches',
            managers: '/managers',
            competitions: '/competitions',
            events: '/events',
            products: '/products',
            workouts: '/workouts',
            places: '/places',
            results: '/results',
            monthlyFees: '/monthlyFees'
          }
        }
    };
    angular.module('mntApp').value('config', config);
})();
