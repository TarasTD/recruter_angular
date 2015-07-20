'use strict';

/* Controllers */

var recruterControllers = angular.module('recruterControllers', 
                                        ["recruterServices"]);
    
    recruterApp.controller('CandidateListCtrl', function($scope, GatherDataServise,  
                                                         $location) {
      var all = GatherDataServise.getUserslist();
      $scope.allData = all;

      $scope.go = function (path) {
        $location.path( path );
      }

      $scope.deleteProfile = function(){
        alert("Deleting!")
      };
    });

    recruterApp.controller('CandidateDetailCtrl', function($scope, GatherDataServise,
                                                            $firebaseObject){
        $scope.message = GatherDataServise.getUserlist();
    });



    recruterApp.controller('CandidateNewCtrl', function($scope, GatherDataServise,
                                                            $firebaseObject, $location){
        var fields = GatherDataServise.getFieldlist();
        $scope.fields = fields;
        $scope.values = {}

        $scope.addNew = function (){
          var userData = $scope.values
          GatherDataServise.addUser($scope, userData);
          $location.path("/search/");
        }

        $scope.showAddnew = function (){
            $scope.show1 = true;
        };

        $scope.submitNewfield = function(){
          var fieldlabel = $scope.field.name;
          var fieldname = $scope.field.name.replace(/\s+/g, '').toLowerCase().replace(/\.+/g, '');
          GatherDataServise.addNewfield(fieldlabel, fieldname, $scope.field.type)
        }

      });

    recruterApp.controller('CandidateViewlCtrl', function($scope, $routeParams, 
                                                          GatherDataServise){
        $scope.userDataview = $scope.allData.$getRecord($routeParams.CandidateID)
      });

    recruterApp.controller('CandidateEditlCtrl', function($scope, GatherDataServise,
                                                            $firebaseObject){
        var fields = GatherDataServise.getFieldlist();
        $scope.fields = fields;


    });




