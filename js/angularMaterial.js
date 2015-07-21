'use strict';

/* Controllers */

var materialControllers = angular.module('materialControllers', 
                                        ['ngMaterial']);




    materialControllers.controller('AppCtrl', function($scope) {
        $scope.imagePath = '../mountain.png';
    });
