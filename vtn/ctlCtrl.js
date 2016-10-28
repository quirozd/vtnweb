'use strict';

vtnapp.controller('ctlController', ['$scope', '$q','vtnCoordinator', function($scope, $q, vtnCoordinator){

    $scope.initctl = function(){

        $scope.getCtrl();

    };

/*----------------------------------- SDN Controllers ----------------------------------*/

    //GET Controllers
    $scope.getCtrl = function(){
        var url = 'controllers/detail';
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.ctls = response.data.controllers;
            $scope.status = response.status;
            $scope.statusText = response.statusText;
         }, function(err){
            $scope.status = err.status;
            $scope.statusText = err.statusText;
        });
    };

    //POST Controllers
    var ctl = $scope.ctl;
    $scope.addCtrl = function(){
        function ctrl(controller_id, description, ipaddr, type, auditstatus, version){
            this.controller_id = controller_id;
            this.description = description;
            this.ipaddr = ipaddr;
            this.type = type;
            this.auditstatus = auditstatus;
            this.version = version;
        }
        var controller = new ctrl(
            this.ctl.ctlId, 
            this.ctl.ctlDesc,
            this.ctl.ctlIp,
            this.ctl.ctlType,
            this.ctl.ctlAudStatus,
            this.ctl.ctlVer
        );
        var ctljson = new Object();
        ctljson.controller = controller;
        var url = 'controllers';
        vtnCoordinator.addInfo(url, ctljson)
        .then(function(response){
            confirm('Controller successfully added!!');
            $scope.getCtrl();
            $scope.status = response.status;
            $scope.statusText = response.statusText;
            window.location = "/vtn/lists/controllers/ctlconf.html";
         }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };

    //DELETE Controllers
    $scope.delCtrl = function(ctl){
        var approve = confirm('Delete Controller ' + ctl.controller_id + '?');
        if (approve === true){
            var url = 'controllers/' + ctl.controller_id;
            vtnCoordinator.delInfo(url)
            .then(function(response){
                confirm('Controller successfully deleted!!');
                $scope.getCtrl();
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };

    //PUT Controllers
    $scope.updCtrl = function(ctl){
        var description = prompt('Enter new Description');
        if (description != '' && description != null){
            var descjson = {
                controller: {description: description}
            };
            var url = 'controllers/' + ctl.controller_id;
            vtnCoordinator.updInfo(url, descjson)
            .then(function(response){
                confirm('Controller successfully updated!!');
                $scope.getCtrl();
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };
    
/*----------------------------------- Domains ----------------------------------*/

 //GET Domains
    $scope.getDom = function(ctrlId){
        //var ctlrObj = JSON.parse(ctlr);
        var url = 'controllers/' + ctrlId + '/domains/detail';
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.doms = response.data.domains;
            $scope.status = response.status;
            $scope.statusText = response.statusText;
         }, function(err){
            confirm(err.status + ' ' + err.statusText);
        });
    };
    
    //POST Domains
    var dom = $scope.dom;
    $scope.addDom = function(ctrlId){
        function netDomain(domain_id, type, description){
            this.domain_id = domain_id;
            this.type = type;
            this.description = description;
        }
        var domain = new netDomain(this.dom.domId, this.dom.domType, this.dom.domDesc);
        var domjson = new Object();
        domjson.domain = domain;
        var url = 'controllers/' + ctrlId + '/domains';
        vtnCoordinator.addInfo(url, domjson)
        .then(function(response){
            confirm('Domain successfully created!!');
            $scope.getDom();
            $scope.status = response.status;
            $scope.statusText = response.statusText;
            window.location = "/vtn/lists/controllers/domconf.html";
         }, function(err){
            confirm(err.status + '' + err.statusText);
        });
    };

    //DELETE Domains
    $scope.delDom = function(ctrlId, dom){
        var approve = confirm('Delete ' + dom.domain_id + '?');
        if (approve === true){
            var url = 'controllers/' + ctrlId + '/domains/' + dom.domain_id;
            vtnCoordinator.delInfo(url)
            .then(function(response){
                confirm('Domain successfully deleted!!');
                $scope.getDom(ctrlId);
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };

    //PUT Domains
    $scope.updTNet = function(ctrlId, dom){
        var description = prompt('Enter new Description');
        if (description != '' && description != null){
            var descjson = {
                domain: {description: description}
            };
            var url = 'controllers/' + ctrlId + '/domains/' + dom.domain_id;
            vtnCoordinator.updInfo(url, descjson)
            .then(function(response){
                confirm('Domain successfully updated!!');
                $scope.getDom(ctrlId);
            }, function(err){
                confirm(err.status + '' + err.statusText);
            });
        };
    };

/*----------------------------------- Logical Ports ----------------------------*/

//GET Logical Ports
    $scope.getLogPts = function(ctrlId, domId){        
        var url = 'controllers/' + ctrlId + '/domains/' + domId + '/logical_ports/detail';
        //var lpts = [];
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.logpts = response.data.logical_ports;
            //return response.data.logical_ports;
         }, function(err){
            confirm(err.status + ' ' + err.statusText);
        });
        return vtnCoordinator.getInfo(url);
    };


/*----------------------------------- Physical Links ----------------------------*/    
    
    //GET Physical Links
    $scope.getLinks = function(ctrlId){
        var url = 'controllers/' + ctrlId + '/links/detail';
        var links = [];
        vtnCoordinator.getInfo(url)
        .then(function(response){
            var pLinks = response.data.links;
            for (var i = 0; i < pLinks.length; i++){
                links.push(pLinks[i].port1_name + " <--> " + pLinks[i].port2_name);
                pLinks[i].plk_summary = links[i];
            }
            $scope.links = pLinks;
            //return response.data.links;
         }, function(err){
            confirm(err.status + ' ' + err.statusText);
        });        
    }

/*----------------------------------- Physical Ports ----------------------------*/    
    
    //GET Physical Ports
    /*$scope.getPorts = function(ctrlId, swId){
        var url = 'controllers/' + ctrlId + '/switches/' + swId + '/ports/detail';
        vtnCoordinator.getInfo(url)
        .then(function(response){
            $scope.ports = response.data.ports;
         }, function(err){
            confirm(err.status + ' ' + err.statusText);
        });        
    }*/

/*----------------------------------- Link Monitoring ----------------------------*/

    //Get Link Information and Statistics
    $scope.getLinkInfo = function(ctrlId, plkArray){
        var plkObj = JSON.parse(plkArray);
        $scope.plkObject = plkObj;        
        
        var url1 = 'controllers/' + ctrlId + '/switches/' + plkObj.switch1_id + '/ports/detail';
        var url2 = 'controllers/' + ctrlId + '/switches/' + plkObj.switch2_id + '/ports/detail';
        var ports1 = [];
        var ports2 = [];
        
        vtnCoordinator.getInfo(url1)
        .then(function(response){
            ports1 = response.data.ports;
            for (var i = 0; i < ports1.length; i++){
                if (ports1[i].neighbor.switch_id == plkObj.switch2_id){
                    $scope.port1 = ports1[i];
                }
            }
         }, function(err){
            confirm(err.status + ' ' + err.statusText);
        });
        
        vtnCoordinator.getInfo(url2)
        .then(function(response){
            ports2 = response.data.ports;
            for (var i = 0; i < ports2.length; i++){
                if (ports2[i].neighbor.switch_id == plkObj.switch1_id){
                    $scope.port2 = ports2[i];
                }
            }
         }, function(err){
            confirm(err.status + ' ' + err.statusText);
        });
        
    }
    
    //Get Boundary Information and Statistics
    $scope.getBdrInfo = function(pbdrArray){
        var pbdrObj = JSON.parse(pbdrArray);
        $scope.pbdrObject = pbdrObj;
        
        var bdrports1 = [];
        var logPts1 = $scope.getLogPts(pbdrObj.link.controller1_id, pbdrObj.link.domain1_id);
        logPts1.then(function(response){
            var logpts1 = response.data.logical_ports;
            for (var i = 0; i < logpts1.length; i++){
                if (logpts1[i].logical_port_id == pbdrObj.link.logical_port1_id){
                    var url1 = 'controllers/' + pbdrObj.link.controller1_id + '/switches/' + logpts1[i].switch_id + '/ports/detail';
                    vtnCoordinator.getInfo(url1)
                    .then(function(response){
                        bdrports1 = response.data.ports;
                        for (var i = 0; i < bdrports1.length; i++){
                            if (bdrports1[i].logical_port_id == pbdrObj.link.logical_port1_id){
                                    $scope.bdrport1 = bdrports1[i];
                            }
                        }    
                    }, function(err){
                        confirm(err.status + ' ' + err.statusText);
                    });
                }
            }
        }, function(err){
            confirm(err.status + ' ' + err.statusText);
        });
        
        var bdrports2 = [];
        var logPts2 = $scope.getLogPts(pbdrObj.link.controller2_id, pbdrObj.link.domain2_id);
        logPts2.then(function(response){
            var logpts2 = response.data.logical_ports;
            for (var i = 0; i < logpts2.length; i++){
                if (logpts2[i].logical_port_id == pbdrObj.link.logical_port2_id){
                    var url2 = 'controllers/' + pbdrObj.link.controller2_id + '/switches/' + logpts2[i].switch_id + '/ports/detail';
                    vtnCoordinator.getInfo(url2)
                    .then(function(response){
                        bdrports2 = response.data.ports;
                        for (var i = 0; i < bdrports2.length; i++){
                            if (bdrports2[i].logical_port_id == pbdrObj.link.logical_port2_id){
                                $scope.bdrport2 = bdrports2[i];
                            }
                        }    
                    }, function(err){
                        confirm(err.status + ' ' + err.statusText);
                    });
                }
            }
        }, function(err){
            confirm(err.status + ' ' + err.statusText);
        });

    }

    $scope.initctl();

}]);
