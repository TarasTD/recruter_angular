'use strict';

/* Filters */

angular.module('recruterFilters', []).filter('find', function() {
  return function(all, searchParameters) {
    var fields = searchParameters.fields;
    var strict = searchParameters.fields["strict"];
    console.log(strict, 'strict')
    var searchWords = searchParameters.searchFor;
    var notContain = searchParameters.notSearch;
    var all = all
    var allDataArr = []
    var fieldArr = []
    var fieldsData = []
    var foundId = []
    var out = []
    // searchParameters.fields["strict"] = false;

    // fetch field to search to array, 
    // include only ones that has True value

    angular.forEach(fields, function(value, key) {
        if (value){
            fieldArr.push(key)
        };
    });

    for (var i = all.length - 1; i >= 0; i--) {
        allDataArr.push(all[i])
    };

    // gather all profile data only from specified fields to dict with id
    angular.forEach(all, function(value, key) {
        for (var i = fieldArr.length - 1; i >= 0; i--) {
            if (fieldArr[i] in value){
                if (fieldsData[value.$id]){
                    fieldsData[value.$id] += " " + value[fieldArr[i]]
                    }
                else{
                    fieldsData[value.$id] = value[fieldArr[i]];
                }
            };
        };
    }); 

    console.log(fieldsData)
    for (var i in fieldsData){
        var id = i;
        var data = fieldsData[i].toLowerCase().split(/[ ,]+/);
        var stop = false

        for (var i = notContain.length - 1; i >= 0; i--) {
            if (data.indexOf(notContain[i].toLowerCase()) > -1){
                stop = true
                break;
            }
        }
        if (!stop){
            for (var i = searchWords.length - 1; i >= 0; i--) {
                if (data.indexOf(searchWords[i].toLowerCase()) > -1){
                    foundId.push(id);
                    console.log(foundId)
                    if (!strict){break}
                }
                else{
                    if (strict){
                        var index = foundId.indexOf(id)

                        console.log("deleting", index, id)
                        if (index  > -1){foundId.splice(index, 1);}
                        stop=true;
                        break;
                    }
                }
            }
        }
    }
    
    for (i in allDataArr){
        if (foundId.indexOf(allDataArr[i]['$id']) > -1){
            out.push(allDataArr[i])
        }
    }



    // console.log(searchWords)
    // console.log(fieldsData, 'res')



    console.log(out)


    return out;
  };
});