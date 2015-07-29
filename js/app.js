'use strict';

/* App Module */

var recruterApp = angular.module('recruterApp', [
  'ngRoute',
  'recruterControllers',
  // 'materialControllers',
  'firebase',
  // 'customDirectives',
  // 'recruterFilters',
  
]);


recruterApp.run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
    $location.path("/login");
    }
  });
}]);

recruterApp.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://recruter.firebaseio.com");
    // console.log($firebaseAuth(ref))
    return $firebaseAuth(ref);
  }
]);



recruterApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/search', {
        templateUrl: 'partials/cadidate-list.html',
        controller: 'CandidateListCtrl',
        resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function(Auth) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$requireAuth();
            }]
          }
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'authCtrl'
       }).
      when('/search/new', {
        templateUrl: 'partials/candidate-new.html',
        controller: 'CandidateNewCtrl',
        resolve: {
            "currentAuth": ["Auth", function(Auth) {
            return Auth.$waitForAuth();
            }]
          }
      }).
      when('/search/edit/:CandidateID', {
        templateUrl: 'partials/candidate-edit.html',
        controller: 'CandidateEditlCtrl',
        resolve: {
          userData: function(GatherDataServise, $route){
            return GatherDataServise.getRecordByID($route.current.params.CandidateID)
          }
        }
      }).
      when('/search/:CandidateID', {
        templateUrl: 'partials/candidate-detail.html',
        controller: 'CandidateViewlCtrl',
        resolve: {
          userData: function(GatherDataServise, $route){
            return GatherDataServise.getRecordByID($route.current.params.CandidateID)
          }
        }
      }).
      otherwise({
        redirectTo: '/search'
      });
  }]);

