'use strict';

/* App Module */

var recruterApp = angular.module('recruterApp', [
  'ngRoute',
  'recruterControllers',
  'materialControllers',
  'firebase',
  // 'customDirectives',
  // 'recruterFilters',
  
]);

recruterApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/search', {
        templateUrl: 'partials/cadidate-list.html',
        controller: 'CandidateListCtrl'
      }).
      when('/search/new', {
        templateUrl: 'partials/candidate-new.html',
        controller: 'CandidateNewCtrl'
      }).
      when('/search/edit/:CandidateID', {
        templateUrl: 'partials/candidate-edit.html',
        controller: 'CandidateEditlCtrl'
      }).
      when('/search/:CandidateID', {
        templateUrl: 'partials/candidate-detail.html',
        controller: 'CandidateViewlCtrl'
      }).
      otherwise({
        redirectTo: '/search'
      });
  }]);

