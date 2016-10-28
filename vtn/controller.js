var vtnapp = angular.module('vtnApp', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngMaterial']);

vtnapp.config(function($routeProvider){
    $routeProvider.when('/summary', {templateUrl: 'summary.html'})
    .when('/monitor', {templateUrl: 'monitor.html'})
    .when('/plktable', {templateUrl: 'plktable.html'})
    .when('/pbdrtable', {templateUrl: 'pbdrtable.html'})
    .when('/config', {templateUrl: 'config.html'})
    .when('/listinfo', {templateUrl: 'listinfo.html'})
    .when('/vtnmaptable', {templateUrl: 'vtnmaptable.html'})
    .when('/vtnadd', {templateUrl: 'vtnadd.html', controller: 'vtnController'})
    .when('/vtnedit', {templateUrl: 'vtnedit.html'})
    .when('/vtndelete', {templateUrl: 'vtndelete.html'})
    .when('/domtable', {templateUrl: 'domtable.html', controller: 'ctlController'})
    .when('/domset', {templateUrl: 'domset.html'})
    .when('/domadd', {templateUrl: 'domadd.html'})
    .when('/vbrtable', {templateUrl: 'vbrtable.html', controller: 'vbrController'})
    .when('/vbrset', {templateUrl: 'vbrset.html'/*, controller: 'vbrController'*/})
    .when('/vbradd',{templateUrl: 'vbradd.html'/*, controller: 'vbrController'*/})
    .when('/iftable', {templateUrl: 'iftable.html', controller: 'vbrController'})
    .when('/ifbrset', {templateUrl: 'ifbrset.html'/*, controller: 'vbrController'*/})
    .when('/ifbradd',{templateUrl: 'ifbradd.html'/*, controller: 'vbrController'*/})
    .when('/vbrmaptable', {templateUrl: 'vbrmaptable.html', controller: 'vbrController'})
    .when('/vbrmapset', {templateUrl: 'vbrmapset.html'/*, controller: 'vbrController'*/})
    .when('/vlnmapset', {templateUrl: 'vlnmapset.html'})
    .when('/vlnmaptable', {templateUrl: 'vlnmaptable.html'})
    .when('/vrtset', {templateUrl: 'vrtset.html'})
    .when('/vrttable', {templateUrl: 'vrttable.html'})
    .when('/vrtifset', {templateUrl: 'vrtifset.html'})
    .when('/vrtiftable', {templateUrl: 'vrtiftable.html'})
    .when('/vrtrouteset', {templateUrl: 'vrtrouteset.html'})
    .when('/vrtroutetable', {templateUrl: 'vrtroutetable.html'})
    .when('/vlktable', {templateUrl: 'vlktable.html'/*, controller: 'vlkController'*/})
    .when('/vlkset', {templateUrl: 'vlkset.html'/*, controller: 'vlkController'*/})
    .when('/ctladd', {templateUrl: 'ctladd.html'/*, controller: 'ctlController'*/})
    .when('/bdryadd', {templateUrl: 'bdryadd.html'})
    .otherwise({redirectTo: '/'});
});

vtnapp.config(function($httpProvider){
    
});

vtnapp.run(function($rootScope){
    $rootScope.endPoint = 'http://127.0.0.1:8083/vtn-webapi/';
});

vtnapp.controller('mainController', ['$scope', 'vtnCoordinator', function($scope, vtnCoordinator){


    $scope.init = function(){
        var url = 'api_version';
        var url2 = 'vtns';
        
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.status = response.status;
            $scope.statusText = response.statusText;
	        $scope.payload = response.data;
        }, function(err){
           $scope.status = err.status;
           $scope.statusText = err.statusText;
        });
        
        vtnCoordinator.getInfo(url2)
        .then(function(response){
            $scope.tnets = response.data.vtns;
        }, function(error){
            confirm(err.status + ' ' + err.statusText);
        });

    };
    
    /*$scope.getSummary = function(vtnName){
        var url1 = 'vtns/' + vtnName.vtn_name + '/vbridges/detail';
        var url2 = 'vtns/' + vtnName.vtn_name + '/vlinks/detail';
        vtnCoordinator.getInfo(url1)
        .then(function(response){
            $scope.bridges = response.data.vbridges; //###
        }, function(error){
            confirm(err.status + ' ' + err.statusText);
        });
        vtnCoordinator.getInfo(url2)
        .then(function(response){
            $scope.vlinks = response.data.vlinks; //###
        }, function(error){
            confirm(err.status + ' ' + err.statusText);
        });
        
        for(bridge in bridges){
            var mapInt = [];        
            var url3 = 'vtns/' + vtnName.vtn_name + '/vbridges/' + bridge.vbr_name + '/interfaces/detail';
            vtnCoordinator.getInfo(url3)
            .then(function(response){
                mapInt = response.data.interfaces;
                var pmps = [];
                for (var i = 0; i < mapInt.length; i++){
                    var url4 = 'vtns/' + vtnName.vtn_name + '/vbridges/' + bridge.vbr_name + '/interfaces/' + mapInt[i].if_name + '/portmap';
                    vtnCoordinator.getInfo(url4)
                    .then(function(response){ 
                        pmps.push(response.data.portmap);
                    }, function(err){
                        confirm(err.status + '' + err.statusText);
                    });
                }
                $scope.pmaps = pmps; //###
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
            
            var url5 = 'vtns/' + vtnName.vtn_name + '/vbridges/' + bridge.vbr_name + '/vlanmaps/detail';
            vtnCoordinator.getInfo(url2)
            .then(function(response){
                $scope.vlnmaps = response.data.vlanmaps; //###
            }, function(error){
                confirm(err.status + ' ' + err.statusText);
            });
        }
    }*/

    $scope.init();

}]);
