'use strict';

/* App Module */

var recruterApp = angular.module('recruterApp', [
  'ngRoute',
  'recruterControllers',
  // 'recruterFilters',
  'recruterServices'
]);

recruterApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/search', {
        templateUrl: 'partials/cadidate-list.html',
        controller: 'CandidateListCtrl'
      }).
      when('/search/:candidateId', {
        templateUrl: 'partials/candidate-detail.html',
        controller: 'CandidateListCtrl'
      }).
      otherwise({
        redirectTo: '/search'
      });
  }]);

