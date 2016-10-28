'use strict';

vtnapp.controller('vlkController', ['$scope', 'vtnCoordinator', /*'$uibModal',*/ function($scope, vtnCoordinator/*, $uibModal*/){

    $scope.initvlk = function(){

        //$scope.getBdry();

    };

/*------------------------------ Physical Boundaries ----------------------------*/

 //GET Boundaries
    $scope.getBdry = function(){
        var url = 'boundaries/detail';
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.bdrs = response.data.boundaries;
            $scope.status = response.status;
            $scope.statusText = response.statusText;
         }, function(err){
            confirm(response.status + '' + response.statusText);
        });
    };


    //POST Boundaries
    var bdry = $scope.bdry;
    $scope.addBdry = function(){
        
        //confirm(this.bdry.ctrlId1 + ' ' + this.bdry.domId2);

        function Link(
            controller1_id,
            domain1_id,
            logical_port1_id,
            controller2_id,
            domain2_id,
            logical_port2_id
        ){
            this.controller1_id = controller1_id;
            this.domain1_id = domain1_id;
            this.logical_port1_id = logical_port1_id;
            this.controller2_id = controller2_id;
            this.domain2_id = domain2_id;
            this.logical_port2_id = logical_port2_id;
        }

        var link = new Link(
            this.bdry.ctrlId1, 
            this.bdry.domId1, 
            this.bdry.logPtId1, 
            this.bdry.ctrlId2, 
            this.bdry.domId2, 
            this.bdry.logPtId2
        );
        var boundary = new Object();
        var bdryjson = new Object();
        
        boundary.boundary_id = this.bdry.bdryId;
        boundary.description = this.bdry.bdryDesc;
        boundary.link = link;
        bdryjson.boundary = boundary;
        
        var url = 'boundaries';

        vtnCoordinator.addInfo(url, bdryjson)
        .then(function(response){
            confirm('Boundary successfully created!!');
            $scope.getBdry();
         }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };


    //DELETE Boundaries
    $scope.delBdry = function(bdry){
        var approve = confirm('Delete Boundary ' + bdry.boundary_id + '?');
        if (approve === true){
            var url = 'boundaries/' + bdry.boundary_id;
            vtnCoordinator.delInfo(url)
            .then(function(response){
                confirm('Boundary successfully deleted!!');
                $scope.getBdry();
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };

    //PUT Boundaries
    $scope.updBdry = function(bdry){
        /*var vtnObj = JSON.parse(vtnName);
        var vbrObj = JSON.parse(vbrName);
        $scope.vtnObject = vtnObj;
        $scope.vbrObject = vbrObj;*/
        var description = prompt('Enter new Description');
        if (description != '' && description != null){
            var descjson = {
                boundary: {description: description}
            };
            var url = 'boundaries/' + bdry.boundary_id;
            vtnCoordinator.updInfo(url, descjson)
            .then(function(response){
                confirm('Boundary successfully updated!!');
                $scope.getBdry();
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });           
        };
    };


/*------------------------------ vLinks -----------------------------------------*/

    //GET vLinks
    $scope.getvLinks = function(vtnName){
        if(typeof vtnName === 'object'){
            var url = 'vtns/' + vtnName.vtn_name + '/vlinks/detail';
        } else {
            var vtnObj = JSON.parse(vtnName);
            $scope.vtnObject = vtnObj;
            var url = 'vtns/' + vtnObj.vtn_name + '/vlinks/detail';
        }
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.links = response.data.vlinks;
            $scope.status = response.status;
            $scope.statusText = response.statusText;
         }, function(err){
            confirm(response.status + '' + response.statusText);
        });
    };


    //POST vLinks
    var vlk = $scope.vlk;
    $scope.addvLink = function(vtnName){
        var nodeObj = function(node){
          return JSON.parse(node);  
        }; 
        var vNode1 = nodeObj(this.vlk.vNode1).vbr_name;
        var vNode2 = nodeObj(this.vlk.vNode2).vbr_name;
        var vtnObj = nodeObj(vtnName);

        function boundary(boundary_id, vlan_id, no_vlan_id){
            this.boundary_id = boundary_id;
            this.vlan_id = vlan_id;
            this.no_vlan_id = no_vlan_id;
        }

        function link(
            vlk_name, 
            vnode1_name, 
            if1_name, 
            vnode2_name, 
            if2_name, 
            description, 
            adminstatus, 
            boundary_map
            ){
            this.vlk_name = vlk_name;
            this.vnode1_name = vnode1_name;
            this.if1_name = if1_name;
            this.vnode2_name = vnode2_name;
            this.if2_name = if2_name;
            this.description = description;
            this.adminstatus = adminstatus;
            this.boundary_map = boundary_map;
        }

        var bdryMap = new boundary(this.vlk.bdryId, this.vlk.vlanId, this.vlk.noVlan);
        var vlink = new link(
            this.vlk.linkName, 
            vNode1, 
            this.vlk.vNInt1, 
            vNode2, 
            this.vlk.vNInt2, 
            this.vlk.vlkDesc, 
            this.vlk.admStat, 
            bdryMap
        );
        var vlkjson = new Object();
        vlkjson.vlink = vlink;
        
        var url = 'vtns/' + vtnObj.vtn_name + '/vlinks';

        vtnCoordinator.addInfo(url, vlkjson)
        .then(function(response){
            confirm('vLink successfully created!!');
            $scope.getvLinks(vtnName);
         }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };


    //DELETE vLinks
    $scope.delvLink = function(vtnName, vlk){
        var vtnObj = JSON.parse(vtnName);
        var approve = confirm('Delete ' + vlk.vlk_name + '?');
        if (approve === true){
            var url = 'vtns/' + vtnObj.vtn_name + '/vlinks/' + vlk.vlk_name;
            vtnCoordinator.delInfo(url)
            .then(function(response){
                confirm('vLink successfully deleted!!');
                $scope.getvLinks(vtnName);
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };


    //PUT vLinks
   /* $scope.updvLink = function(vtnName, vlkObj){
        var modalInstance = $uibModal.open({
            templateUrl: 'vlkedit.html',
            controller: 'mdlController',
            resolve:{
                vtnName: function(){
                    return vtnName;
                },
                vlkObj: function(){
                    return vlkObj;
                }
            }
        });
        modalInstance.result.then(function(res){
            $scope.getvLinks(vtnName);
        }, function(err){});
    };
    
    $scope.updvLink = function(vtnName, vlkObj) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'vlkedit.html',
      parent: angular.element(document.body),
      //targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(response) {
      confirm('vLink successfully updated!!');
      $scope.getvLinks(vtnName);
    }, function(err) {
      confirm(err.status + '' + err.statusText);
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };*/

    $scope.initvlk();

}]);

/*function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.submit = function() {
    $mdDialog.hide();
  };
}

/*vtnapp.controller('mdlController', ['$scope', '$uibModalInstance', 'vtnCoordinator', 'vtnName', 'vlkObj', function($scope, $uibModalInstance, vtnCoordinator, vtnName, vlkObj){

    var vlk = $scope.vlk;
    $scope.vlkName = vlkObj.vlk_name;
    
    $scope.updLink = function(){
        //confirm(vtnName + ' ' + this.vlk.vlkDesc);
        var vtnObj = JSON.parse(vtnName);
        
        function bdryEdit(boundary_id, vlan_id, no_vlan_id){
            this.boundary_id = boundary_id;
            this.vlan_id = vlan_id;
            this.no_vlan_id = no_vlan_id;
        }

        function linkEdit(description, adminstatus, boundary_map){
            this.description = description;
            this.adminstatus = adminstatus;
            this.boundary_map = boundary_map;
        }

        var bdryMap = new bdryEdit(this.vlk.bdryId, this.vlk.vlanId, this.vlk.noVlan);
        var vlink = new linkEdit(this.vlk.vlkDesc, this.vlk.admStat, bdryMap);
        var vlkjson = new Object();
        vlkjson.vlink = vlink;
        var url = 'vtns/' + vtnObj.vtn_name + '/vlinks/' + vlkObj.vlk_name;
        vtnCoordinator.updInfo(url, vlkjson)
        .then(function(response){
            confirm('vLink successfully updated!!');
        }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };
    
    $scope.close = function(){
        $uibModalInstance.close("close");
    };

}]);*/
