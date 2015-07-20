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
        $scope.addNew = function (){

          var userData = {
              name: $scope.nameSurname,
              currentCompany: $scope.currentCompany,
              mainTech: $scope.mainTech,
              minorTech: $scope.minorTech,
              comments: $scope.comments,
              contacts: $scope.contacts,
              avatar: $scope.skype,
            };

          GatherDataServise.addUser($scope, userData);
          $location.path("/search/");
        }

        $scope.addNewfield = function (){
            alert($scope.field.name )
        }

      });

    recruterApp.controller('CandidateViewlCtrl', function($scope, $routeParams, 
                                                          GatherDataServise){
        $scope.userDataview = $scope.allData.$getRecord($routeParams.CandidateID)
      });

    recruterApp.controller('CandidateEditlCtrl', function($scope, GatherDataServise,
                                                            $firebaseObject){
        var fields = GatherDataServise.getFieldlist();
        // fields.$loaded.then(function(a){console.log(a)})
        $scope.fields = fields;


    });




