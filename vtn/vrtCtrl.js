'use strict';

vtnapp.controller('vrtController', ['$scope', 'vtnCoordinator', function($scope, vtnCoordinator){

    $scope.initvrt = function(){

    };

    /********************  vRouter General Functions **************************/

    //GET vRouters
    $scope.getvRt = function(vtnName){
        var vtnObj = JSON.parse(vtnName);
        $scope.vtnObject = vtnObj;
        var url = 'vtns/' + vtnObj.vtn_name + '/vrouters/detail';
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.rtrs = response.data.vrouters;
            $scope.status = response.status;
            $scope.statusText = response.statusText;
         }, function(err){
            confirm(response.status + ' ' + response.statusText);
        });
    };

    //POST vRouters
    var vrt = $scope.vrt;
    $scope.addvRt = function(vtnName){
        var vtnObj = JSON.parse(vtnName);
        $scope.vtnObject = vtnObj;
        function router(vrt_name, controller_id, domain_id, description){
            this.vrt_name = vrt_name;
            this.controller_id = controller_id;
            this.domain_id = domain_id;
            this.description = description;
        }
        var vrouter = new router(this.vrt.vrtName, this.vrt.ctlId, this.vrt.domId, this.vrt.vrtDesc);
        var vrtjson = new Object();
        vrtjson.vrouter = vrouter;
        var url = 'vtns/' + vtnObj.vtn_name + '/vrouters';
        vtnCoordinator.addInfo(url, vrtjson)
        .then(function(response){
            confirm('vRouter successfully created!!');
            $scope.getvRt(vtnName);
            window.location = "/vtn/lists/vrouters/vrtconf.html";
         }, function(err){
            confirm(err.status + ' ' + err.statusText);
        });
    };

    //DELETE vRouters
    $scope.delvRt = function(vtnName, vrt){
        var vtnObj = JSON.parse(vtnName);
        $scope.vtnObject = vtnObj;
        var approve = confirm('Delete ' + vrt.vrt_name + '?');
        if (approve === true){
            var url = 'vtns/' + vtnObj.vtn_name + '/vrouters/' + vrt.vrt_name;
            vtnCoordinator.delInfo(url)
            .then(function(response){
                confirm('vRouter successfully deleted!!');
                $scope.getvRt(vtnName);
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };

    //PUT vRouters
    $scope.updvRt = function(vtnName, vrt){
        var vtnObj = JSON.parse(vtnName);
        $scope.vtnObject = vtnObj;
        var description = prompt('Enter new Description');
        if (description != '' && description != null){
            var descjson = {
                vrouter: {description: description}
            };
            var url = 'vtns/' + vtnObj.vtn_name + '/vrouters/' + vrt.vrt_name;
            vtnCoordinator.updInfo(url, descjson)
            .then(function(response){
                confirm('vRouter successfully updated!!');
                $scope.getvRt(vtnName);
            }, function(err){
                confirm(err.status + ' ' + err.statusText);
            });
        };
    };


    /********************  vRouter Interface Functions **************************/


    //GET vRouter Interfaces
    $scope.getvRtInt = function(vtnName, vrtName){
        var vtnObj = JSON.parse(vtnName);
        var vrtObj = JSON.parse(vrtName);
        $scope.vtnObject = vtnObj;
        $scope.vrtObject = vrtObj;
        var url = 'vtns/' + vtnObj.vtn_name + '/vrouters/' + vrtObj.vrt_name + '/interfaces/detail';
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.intfs = response.data.interfaces;
            $scope.status = response.status;
            $scope.statusText = response.statusText;
         }, function(err){
            confirm(err.status + ' ' + err.statusText);
        });
    };

    //POST vRouter Interfaces
    var ifc = $scope.ifc;
    $scope.addvRtInt = function(vtnName, vrtName){
        var vtnObj = JSON.parse(vtnName);
        var vrtObj = JSON.parse(vrtName);
        $scope.vtnObject = vtnObj;
        $scope.vrtObject = vrtObj;
        function vrInterface(if_name, description, adminstatus, ipaddr, prefix, macaddr){
            this.if_name = if_name;
            this.description = description;
            this.adminstatus = adminstatus;
            this.ipaddr = ipaddr;
            this.prefix = prefix;
            this.macaddr = macaddr;
        }
        var interf = new vrInterface(
            this.ifc.ifName, 
            this.ifc.ifDesc, 
            this.ifc.admStatus,
            this.ifc.ifIp,
            this.ifc.ipPrefx,
            this.ifc.ifMac);
        var ifjson = new Object();
        ifjson.interface = interf;
        var url = 'vtns/' + vtnObj.vtn_name + '/vrouters/' + vrtObj.vrt_name + '/interfaces';
        vtnCoordinator.addInfo(url, ifjson)
        .then(function(response){
            confirm('vRouter Interface successfully created!!');
            $scope.getvRtInt(vtnName, vrtName);
            window.location = "/vtn/lists/vrouters/ifvrtconf.html";
         }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };

    //DELETE vRouter Interfaces
    $scope.delvRtInt = function(vtnName, vrtName, intf){
        var vtnObj = JSON.parse(vtnName);
        var vrtObj = JSON.parse(vrtName);
        $scope.vtnObject = vtnObj;
        $scope.vrtObject = vrtObj;
        var approve = confirm('Delete ' + intf.if_name + '?');
        if (approve === true){
            var url = 'vtns/' + vtnObj.vtn_name + '/vrouters/' + vrtObj.vrt_name + '/interfaces/' + intf.if_name;
            vtnCoordinator.delInfo(url)
            .then(function(response){
                confirm('vRouter Interface successfully deleted!!');
                $scope.getvRtInt(vtnName, vrtName);
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };

    //PUT vRouter Interfaces
    /*$scope.updvBrInt = function(vtnName, vrtName, intf){
        var vtnObj = JSON.parse(vtnName);
        var vrtObj = JSON.parse(vrtName);
        $scope.vtnObject = vtnObj;
        $scope.vrtObject = vrtObj;
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
    
    /********************  vRouter IP Routes Functions **************************/
    
    //GET static IP routes
    $scope.getStcRt = function(vtnName, vrtName){
        var vtnObj = JSON.parse(vtnName);
        var vrtObj = JSON.parse(vrtName);
        $scope.vtnObject = vtnObj;
        $scope.vrtObject = vrtObj;
        var url = 'vtns/' + vtnObj.vtn_name + '/vrouters/' + vrtObj.vrt_name + '/static_iproutes/detail';
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.stcroutes = response.data.static_iproutes;
            $scope.status = response.status;
            $scope.statusText = response.statusText;
         }, function(err){
            confirm(err.status + ' ' + err.statusText);
        });
    };

    //POST Static IP Routes
    var srt = $scope.srt;
    $scope.addStcRt = function(vtnName, vrtName){
        var vtnObj = JSON.parse(vtnName);
        var vrtObj = JSON.parse(vrtName);
        $scope.vtnObject = vtnObj;
        $scope.vrtObject = vrtObj;
        function route(ipaddr, prefix, nexthopaddr){
            this.ipaddr = ipaddr;
            this.prefix = prefix;
            this.nexthopaddr = nexthopaddr;
        }
        var staticRoute = new route(
            this.srt.ipAddr,
            this.srt.ipPrefx,
            this.srt.nextHop);
        var srtjson = new Object();
        srtjson.static_iproute = staticRoute;
        var url = 'vtns/' + vtnObj.vtn_name + '/vrouters/' + vrtObj.vrt_name + '/static_iproutes';
        vtnCoordinator.addInfo(url, srtjson)
        .then(function(response){
            confirm('Static IP route successfully added!!');
            $scope.getStcRt(vtnName, vrtName);
            window.location = "/vtn/lists/vrouters/stcrtconf.html";
         }, function(err){
            confirm(err.status + ' ' + err.statusText);
        });
    };

    //DELETE Static IP Routes
    $scope.delStcRt = function(vtnName, vrtName, stcRoute){
        var vtnObj = JSON.parse(vtnName);
        var vrtObj = JSON.parse(vrtName);
        $scope.vtnObject = vtnObj;
        $scope.vrtObject = vrtObj;
        var approve = confirm('Delete ' + stcRoute.static_iproute_id + '?');
        if (approve === true){
            var url = 'vtns/' + vtnObj.vtn_name + '/vrouters/' + vrtObj.vrt_name + '/static_iproutes/' + stcRoute.static_iproute_id;
            vtnCoordinator.delInfo(url)
            .then(function(response){
                confirm('IP static route successfully deleted!!');
                $scope.getStcRt(vtnName, vrtName);
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };
    
   $scope.initvrt();

}]); 