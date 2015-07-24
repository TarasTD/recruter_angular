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

      $scope.deleteProfile = function(id){
        swal({   title: "Are you sure?",
          text: "You will not be able to recover this profile!",   
          type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   
          confirmButtonText: "Yes, delete it!",   closeOnConfirm: false }, 
          function(){ swal("Deleted!", "Profile has been deleted.", "success"); 
                      GatherDataServise.deleteRecord(id);
                    });


        // if (confirm("Are you sure to delete profile?")) {
        //   GatherDataServise.deleteRecord(id);}
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
          userData.latestupdatetime = new Date().getTime();
          console.log(userData)
          GatherDataServise.addUser($scope, userData);
          swal({title: "Nice job!",   
                imageUrl: "thumbs-up.jpg" });
          $location.path("/search/");
        }

        $scope.showAddnew = function (){
            if ($scope.show1) {
                $scope.show1 = false;
                }
            else { 
                $scope.show1 = true;
            }
        }

        $scope.submitNewfield = function(){
          var fieldlabel = $scope.field.name;
          var fieldname = $scope.field.name.replace(/\s+/g, '').toLowerCase().replace(/\.+/g, '');
          GatherDataServise.addNewfield(fieldlabel, fieldname, $scope.field.type)
        }
      });

    recruterApp.controller('CandidateViewlCtrl', function($scope, $routeParams, 
                                                          GatherDataServise){
        $scope.fields = GatherDataServise.getFieldlist();
        $scope.userDataview = $scope.allData.$getRecord($routeParams.CandidateID)
        console.log($scope.userDataview)
      });

    recruterApp.controller('CandidateEditlCtrl', function($scope, $routeParams, 
                                                          GatherDataServise){
        $scope.userDataview = $scope.allData.$getRecord($routeParams.CandidateID)
        $scope.fields = GatherDataServise.getFieldlist();

        $scope.saveEdit = function (){
          delete $scope.userDataview.$id;
          delete $scope.userDataview.$priority;
          // $scope.userDataview.latestupdatetime = new Date();
          GatherDataServise.updateUser($scope, $scope.userDataview, $routeParams.CandidateID);
        };
    });
