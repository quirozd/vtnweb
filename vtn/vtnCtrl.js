'use strict';

vtnapp.controller('vtnController', ['$scope', 'vtnCoordinator', function($scope, vtnCoordinator){

    $scope.initvtn = function(){

        $scope.getTNet();

    };

/*-------------------------  VTN Configuration -----------------------------*/

    //GET VTNs
    $scope.getTNet = function(){
        var url = 'vtns/detail';
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.tenants = response.data.vtns;
            $scope.status = response.status;
            $scope.statusText = response.statusText;
         }, function(err){
            $scope.status = err.status;
            $scope.statusText = err.statusText;
        });
    };

    //GET VTN mappings
    $scope.getTMap = function(vtnName){
        var url = 'vtns/' + vtnName + '/mappings/detail';
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.tmaps = response.data.mappings;
            $scope.status = response.status;
            $scope.statusText = response.statusText;
         }, function(err){
            confirm(err.status + ' ' + err.statusText);
        });
    };

    //POST VTNs
    var vtn = $scope.vtn;
    $scope.addTNet = function(){
        function tnetwork(vtn_name, description){
            this.vtn_name = vtn_name;
            this.description = description;
        }
        var vtn = new tnetwork(this.vtn.vtnName, this.vtn.vtnDesc);
        var vtnjson = new Object();
        vtnjson.vtn = vtn;
        var url = 'vtns';
        vtnCoordinator.addInfo(url, vtnjson)
        .then(function(response){
            confirm('VTN successfully created!!');
            $scope.getTNet();
            $scope.status = response.status;
            $scope.statusText = response.statusText;
            window.location = "/vtn/lists/vtns/vtnconf.html";
         }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };

    //DELETE VTNs
    $scope.delTNet = function(index){
        var approve = confirm('Delete ' + index.vtn_name + '?');
        if (approve === true){
            var url = 'vtns/' + index.vtn_name;
            vtnCoordinator.delInfo(url)
            .then(function(response){
                confirm('VTN successfully deleted!!');
                $scope.getTNet();
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };

    //PUT VTNs
    $scope.updTNet = function(index){
        var description = prompt('Enter new Description');
        if (description != '' && description != null){
            var descjson = {
                vtn: {description: description}
            };
            var url = 'vtns/' + index.vtn_name;
            vtnCoordinator.updInfo(url, descjson)
            .then(function(response){
                confirm('VTN successfully updated!!');
                $scope.getTNet();
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };

    $scope.initvtn();

}]);

