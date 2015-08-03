'use strict';

/* Directives */

   // $scope.go = function ( path) {
   //    $location.path( path );
   //    };


angular.module('customDirectives', [])

// .directive('clickLink', ['$location', function($location) {
//     return {
//         link: function(scope, element, attrs) {
//             element.on('click', function() {
//                 scope.$apply(function() {
//                     $location.path(attrs.clickLink);
//                 });
//             });
//         }
//     }
// }]);
// templateUrl: 'partials/cadidate-list.html'

.directive('searchFields', function() {
  return {
    template: '<h4>TTTT</h4>'
  };
});