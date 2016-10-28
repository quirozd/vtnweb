'use strict';

vtnapp.controller('vbrController', ['$scope', 'vtnCoordinator', function($scope, vtnCoordinator){

    $scope.initvbr = function(){

    };
     

    /********************  vBridge General Functions **************************/

    //GET vBridges
    $scope.getvBr = function(vtnName){
        if(typeof vtnName === 'object'){
            var url = 'vtns/' + vtnName.vtn_name + '/vbridges/detail';
        } else {
            var vtnObj = JSON.parse(vtnName);
            $scope.vtnObject = vtnObj;
            var url = 'vtns/' + vtnObj.vtn_name + '/vbridges/detail';
        }
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.brgs = response.data.vbridges;
         }, function(err){
            confirm(response.status + ' ' + response.statusText);
        });
    };

    //POST vBridges
    var vbrg = $scope.vbrg;
    $scope.addvBr = function(vtnName){
        var vtnObj = JSON.parse(vtnName);
        $scope.vtnObject = vtnObj;
        function bridge(vbr_name, controller_id, description, domain_id){
            this.vbr_name = vbr_name;
            this.controller_id = controller_id;
            this.description = description;
            this.domain_id = domain_id;
        }
        var vbridge = new bridge(this.vbrg.vbrName, this.vbrg.ctlId, this.vbrg.vbrDesc, this.vbrg.domId);
        var vbrjson = new Object();
        vbrjson.vbridge = vbridge;
        var url = 'vtns/' + vtnObj.vtn_name + '/vbridges';
        vtnCoordinator.addInfo(url, vbrjson)
        .then(function(response){
            confirm('vBridge successfully created!!');
            $scope.getvBr(vtnName);
            window.location = "/vtn/lists/vbridges/vbrconf.html";
         }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };

    //DELETE vBridges
    $scope.delvBr = function(vtnName, vbr){
        var vtnObj = JSON.parse(vtnName);
        $scope.vtnObject = vtnObj;
        var approve = confirm('Delete ' + vbr.vbr_name + '?');
        if (approve === true){
            var url = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbr.vbr_name;
            vtnCoordinator.delInfo(url)
            .then(function(response){
                confirm('vBridge successfully deleted!!');
                $scope.getvBr(vtnName);
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };

    //PUT vBridges
    $scope.updvBr = function(vtnName, vbr){
        var vtnObj = JSON.parse(vtnName);
        $scope.vtnObject = vtnObj;
        var description = prompt('Enter new Description');
        if (description != '' && description != null){
            var descjson = {
                vbridge: {description: description}
            };
            var url = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbr.vbr_name;
            vtnCoordinator.updInfo(url, descjson)
            .then(function(response){
                confirm('vBridge successfully updated!!');
                $scope.getvBr(vtnName);
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };


    /********************  vBridge Interface Functions **************************/


    //GET vBridge Interfaces
    $scope.getvBrInt = function(vtnName, vbrName){
        var vtnObj = JSON.parse(vtnName);
        var vbrObj = JSON.parse(vbrName);
        $scope.vtnObject = vtnObj;
        $scope.vbrObject = vbrObj;
        var url = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbrObj.vbr_name + '/interfaces/detail';
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.intfs = response.data.interfaces;
         }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };

    //POST vBridge Interfaces
    var ifc = [];
    ifc = $scope.ifc;
    $scope.addvBrInt = function(vtnName, vbrName){
        var vtnObj = JSON.parse(vtnName);
        var vbrObj = JSON.parse(vbrName);
        $scope.vtnObject = vtnObj;
        $scope.vbrObject = vbrObj;
        function vbInterface(if_name, description, adminstatus){
            this.if_name = if_name;
            this.description = description;
            this.adminstatus = adminstatus;
        }
        var interf = new vbInterface(this.ifc.ifName, this.ifc.ifDesc, this.ifc.admStatus);
        var ifjson = new Object();
        ifjson.interface = interf;
        var url = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbrObj.vbr_name + '/interfaces';
        vtnCoordinator.addInfo(url, ifjson)
        .then(function(response){
            confirm('vBridge Interface successfully created!!');
            $scope.getvBrInt(vtnName, vbrName);
            window.location = "/vtn/lists/vbridges/ifbrconf.html";
         }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };

    //DELETE vBridge Interfaces
    $scope.delvBrInt = function(vtnName, vbrName, intf){
        var vtnObj = JSON.parse(vtnName);
        var vbrObj = JSON.parse(vbrName);
        $scope.vtnObject = vtnObj;
        $scope.vbrObject = vbrObj;
        var approve = confirm('Delete ' + intf.if_name + '?');
        if (approve === true){
            var url = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbrObj.vbr_name + '/interfaces/' + intf.if_name;
            vtnCoordinator.delInfo(url)
            .then(function(response){
                confirm('vBridge Interface successfully deleted!!');
                $scope.getvBrInt(vtnName, vbrName);
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };

    //PUT vBridge Interfaces
    $scope.updvBrInt = function(vtnName, vbrName, intf){
        var vtnObj = JSON.parse(vtnName);
        var vbrObj = JSON.parse(vbrName);
        $scope.vtnObject = vtnObj;
        $scope.vbrObject = vbrObj;
        var description = prompt('Enter new Description');
        if (description != '' && description != null){
            var adminstatus = prompt('Enter adminstatus (enable/disable)');
            if ((adminstatus == 'enable' || adminstatus == 'disable') && adminstatus != null ){
                var intfjson = {
                    interface: {description: description, adminstatus: adminstatus}
                };
                var url = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbrObj.vbr_name + '/interfaces/' + intf.if_name;
                vtnCoordinator.updInfo(url, intfjson)
                .then(function(response){
                    confirm('vBridge Interface successfully updated!!');
                    $scope.getvBrInt(vtnName, vbrName);
                }, function(err){
                    confirm(err.status + '' + err.statusText);
                });
            };
        };
    };


    /********************  vBridge Interface Port Mappings **************************/

    //GET vBridge Interface Port Mappings
    $scope.getvBrMap = function(vtnName, vbrName){
        var vtnObj = JSON.parse(vtnName);
        var vbrObj = JSON.parse(vbrName);
        $scope.vtnObject = vtnObj;
        $scope.vbrObject = vbrObj;
        
        var mapInt = [];        
        var url1 = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbrObj.vbr_name + '/interfaces/detail';
        vtnCoordinator.getInfo(url1)
        .then(function(response){
            mapInt = response.data.interfaces;
            var pmps = [];
            for (var i = 0; i < mapInt.length; i++){
                var url2 = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbrObj.vbr_name + '/interfaces/' + mapInt[i].if_name + '/portmap';
                vtnCoordinator.getInfo(url2)
                .then(function(response){ 
                    pmps.push(response.data.portmap);
                }, function(err){
                    confirm(err.status + '' + err.statusText);
                });
            }
            $scope.pmaps = pmps;
        }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };
    
  //GET vBridge Interface Port Mappings with 3 inputs
    $scope.getvBrMap2 = function(vtnName, vbrName, intfName){
        var vtnObj = JSON.parse(vtnName);
        var vbrObj = JSON.parse(vbrName);
        var intfObj = JSON.parse(intfName);
        $scope.vtnObject = vtnObj;
        $scope.vbrObject = vbrObj;
        $scope.intfObject = intfObj;
                
        var url = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbrObj.vbr_name + '/interfaces/' + intfObj.if_name + '/portmap';
        vtnCoordinator.getInfo(url)
        .then(function(response){ 
            $scope.pmaps = response.data.portmap;
        }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };
    
  //GET Domain Logical ports
  $scope.getLogPts = function(vbrName){
        var vbrObj = JSON.parse(vbrName);
        var url = 'controllers/' + vbrObj.controller_id + '/domains/' + vbrObj.domain_id + '/logical_ports';
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.logpts = response.data.logical_ports;
         }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };

    //PUT vBridge Interface Mappings
    var ifmap = $scope.ifmap;
    $scope.setvBrMap = function(vtnName, vbrName, intfName){
        var vtnObj = JSON.parse(vtnName);
        var vbrObj = JSON.parse(vbrName);
        var intfObj = JSON.parse(intfName);
        $scope.vtnObject = vtnObj;
        $scope.vbrObject = vbrObj;
        $scope.intfObject = intfObj;
        function portMap(logical_port_id, vlan_id, tagged){
            this.logical_port_id = logical_port_id;
            this.vlan_id = vlan_id;
            this.tagged = tagged;
        }
        var portmap = new portMap(this.ifmap.logPortId, this.ifmap.vlanId, this.ifmap.tgd);
        var pmapjson = new Object();
        pmapjson.portmap = portmap;
        var url = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbrObj.vbr_name + '/interfaces/' + intfObj.if_name + '/portmap';
        vtnCoordinator.updInfo(url, pmapjson)
        .then(function(response){
            confirm('Port mapping successfully created!!');
            $scope.getvBrMap2(vtnName, vbrName, intfName);
            window.location = "/vtn/lists/vbridges/vbrmapconf.html";
         }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };

    //DELETE vBridge Interface Mappings
    $scope.delvBrMap = function(vtnName, vbrName, intfName){
        var vtnObj = JSON.parse(vtnName);
        var vbrObj = JSON.parse(vbrName);
        var intfObj = JSON.parse(intfName);
        $scope.vtnObject = vtnObj;
        $scope.vbrObject = vbrObj;
        $scope.intfObject = intfObj;
        var approve = confirm('Delete ' + 'intfName' + ' port mapping?');
        if (approve === true){
            var url = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbrObj.vbr_name + '/interfaces/' + intfObj.if_name + '/portmap';
            vtnCoordinator.delInfo(url)
            .then(function(response){
                confirm('Port mapping successfully deleted!!');
                $scope.getvBrMap2(vtnName, vbrName, intfName);
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };
    
    /********************  vBridge VLAN Mappings **************************/
    
    //GET VLAN Mappings
    $scope.getVlnMap = function(vtnName, vbrName){
        var vtnObj = JSON.parse(vtnName);
        var vbrObj = JSON.parse(vbrName);
        $scope.vtnObject = vtnObj;
        $scope.vbrObject = vbrObj;
        var url = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbrObj.vbr_name + '/vlanmaps/detail';
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.vlns = response.data.vlanmaps;
         }, function(err){
            confirm(err.status + ' ' + err.statusText);
        });
    };

    //POST VLAN Mappings
    var vlan = $scope.vlan;
    $scope.addVlnMap = function(vtnName, vbrName){
        var vtnObj = JSON.parse(vtnName);
        var vbrObj = JSON.parse(vbrName);
        $scope.vtnObject = vtnObj;
        $scope.vbrObject = vbrObj;
        function map(logical_port_id, vlan_id, no_vlan_id){
            this.logical_port_id = logical_port_id;
            this.vlan_id = vlan_id;
            this.no_vlan_id = no_vlan_id;
        }
        var vlanmap = new map(this.vlan.logPtId, this.vlan.vlnId, this.vlan.noVlnId);
        var vlnjson = new Object();
        vlnjson.vlanmap = vlanmap;
        var url = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbrObj.vbr_name + '/vlanmaps';
        vtnCoordinator.addInfo(url, vlnjson)
        .then(function(response){
            confirm('VLAN Mapping successfully created with ID: ' + response.data.vlanmap.vlanmap_id);
            $scope.getVlnMap(vtnName, vbrName);
            window.location = "/vtn/lists/vbridges/vlnmapconf.html";
         }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };

    //DELETE VLAN Mappings
    $scope.delVlnMap = function(vtnName, vbrName, vlnMap){
        var vtnObj = JSON.parse(vtnName);
        var vbrObj = JSON.parse(vbrName);
        $scope.vtnObject = vtnObj;
        $scope.vbrObject = vbrObj;
        var approve = confirm('Delete ' + vlnMap.vlanmap_id + '?');
        if (approve === true){
            var url = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbrObj.vbr_name + '/vlanmaps/' + vlnMap.vlanmap_id;
            vtnCoordinator.delInfo(url)
            .then(function(response){
                confirm('VLAN Map successfully deleted!!');
                $scope.getVlnMap(vtnName, vbrName);
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };

    //PUT vBridge Interfaces
    /*$scope.updvBrInt = function(vtnName, vbrName, intf){
        var vtnObj = JSON.parse(vtnName);
        var vbrObj = JSON.parse(vbrName);
        $scope.vtnObject = vtnObj;
        $scope.vbrObject = vbrObj;
        var description = prompt('Enter new Description');
        if (description != '' && description != null){
            var adminstatus = prompt('Enter adminstatus (enable/disable)');
            if ((adminstatus == 'enable' || adminstatus == 'disable') && adminstatus != null ){
                var intfjson = {
                    interface: {description: description, adminstatus: adminstatus}
                };
                //var url = 'vtns/' + vtnName + '/vbridges/' + vbrName + '/interfaces/' + intf.if_name;
                var url = 'vtns/' + vtnObj.vtn_name + '/vbridges/' + vbrObj.vbr_name + '/interfaces/' + intf.if_name;
                vtnCoordinator.updInfo(url, intfjson)
                .then(function(response){
                    confirm('vBridge Interface successfully updated!!');
                    $scope.getvBrInt(vtnName, vbrName);
                }, function(err){
                    confirm(err.status + '' + err.statusText);
                });
            };
        };
    };*/

    $scope.initvbr();

}]);
