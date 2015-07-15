'use strict';

/* App Module */

var recruterApp = angular.module('recruterApp', [
  'ngRoute',
  'recruterControllers',
  'firebase',
  // 'recruterFilters',
  
]);

recruterApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/search', {
        templateUrl: 'partials/cadidate-list.html',
        controller: 'CandidateListCtrl'
      }).
      when('/search/detail', {
        templateUrl: 'partials/candidate-detail.html',
        controller: 'CandidateDetailCtrl'
      }).
      when('/search/new', {
        templateUrl: 'partials/candidate-new.html',
        controller: 'CandidateNewCtrl'
      }).

      otherwise({
        redirectTo: '/search'
      });
  }]);

