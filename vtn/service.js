'use strict';

vtnapp.service('vtnCoordinator', ['$http', '$q', '$rootScope', 'Base64', function($http, $q, $rootScope, Base64){

    var coordinator = this;
    var coded = Base64.encode('admin:adminpass');
    var options = {
        dataType: 'json',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic ' + coded
        }
    };
    
    //GET Service
    coordinator.getInfo = function(url){
       var defer = $q.defer();
        
        $http.get($rootScope.endPoint + url, options)
        .then(function(response){
            defer.resolve(response);
         }, function(err, status){
            defer.reject(err);
         });

         return defer.promise;
    }

    //POST Service
    coordinator.addInfo = function(url, payload){
            var defer = $q.defer();

            $http.post($rootScope.endPoint + url, payload, options)
            .then(function(response){
                defer.resolve(response);
            }, function(err, status){
                defer.reject(err);
            });

            return defer.promise;
    }

    //DELETE Service
    coordinator.delInfo = function(url){
            var defer = $q.defer();

            $http.delete($rootScope.endPoint + url, options)
            .then(function(response){
                defer.resolve(response);
            }, function(err, status){
                defer.reject(err);
            });

            return defer.promise;

    }

    //PUT Service
    coordinator.updInfo = function(url, payload){
            var defer = $q.defer();

            $http.put($rootScope.endPoint + url, payload, options)
            .then(function(response){
                defer.resolve(response);
            }, function(err, status){
                defer.reject(err);
            });

            return defer.promise;

    }

}]);


