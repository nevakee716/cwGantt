/* Copyright (c) 2012-2013 Casewise Systems Ltd (UK) - All rights reserved */



/*global cwAPI, jQuery */
(function(cwApi, $) {
    "use strict";
    if (cwApi && cwApi.cwLayouts && cwApi.cwLayouts.cwImprovedGantt) {
        var cwImprovedGantt = cwApi.cwLayouts.cwImprovedGantt;
    } else {
        // constructor
        var cwImprovedGantt = function(options, viewSchema) {
            cwApi.extend(this, cwApi.cwLayouts.CwLayout, options, viewSchema); // heritage
            cwApi.registerLayoutForJSActions(this); // execute le applyJavaScript après drawAssociations
            this.construct(options);
        };
    }

    cwImprovedGantt.prototype.construct = function(options) {
        this.scale = "month";
        this.idsTable = {};
        this.reverseIdTable = {};
        this.layoutsByNodeId = {};
        this.objectTypeTable = {};
        this.reverseobjectTypeTable = {};
        this.removedNodes = [];
        this.config = {
            "nodes": [{
                "nodeID": "projet_474185792",
                "startDate": "STARTDATE",
                "endDate": "ENDDATE",
                "completion": "PERCENTCOMPLETE",
                "finishToStart": [],
                "startToStart": [],
                "finishToFinish": [],
                "milestone" : [],
                "classStyle": "ggroupblack"
            }, {
                "nodeID": "projet_20027_205402790",
                "startDate": "STARTDATE",
                "endDate": "ENDDATE",
                "completion": "PERCENTCOMPLETE",
                "finishToStart": ["projet_20217_39247427"],
                "startToStart": ["projet_20218_858571321"],
                "finishToFinish": ["projet_20219_1725533778"],
                "milestone" : ["projet_20027_2109559671"],
                "classStyle": "gtaskred"
            }],
            "hiddenNodes": [""],
            "complementaryNode": [],
            "dateDisplayFormat": "mm/dd/yyyy",
            "scale": "month",
            "fixedColumnMap": {
                "startdate": {
                    "hide":false,
                    "scriptname": "startdate",
                    "width": "70"
                },
                "enddate": {
                    "hide":false,
                    "scriptname": "enddate",
                    "width": "70"
                },
                "duration": {
                    "hide":false,
                    "scriptname": "duration",
                    "width": "70"
                },
                "pccomplete": {
                    "hide":true,
                    "scriptname": "pccomplete",
                    "width": "50"
                },
                "taskname": {
                    "hide":false,
                    "scriptname": "taskname",
                    "width": "400"
                }
            },
            "customColumnMap": [{
                "scriptname": "type",
                "label": "Category",
                "width": "70"
            }]

        };

        var nodesObj = {};
        this.config.nodes.forEach(function(n) {
            nodesObj[n.nodeID] = n;
        });

        this.config.nodes = nodesObj;
    };



    cwApi.cwLayouts.cwImprovedGantt = cwImprovedGantt;
}(cwAPI, jQuery));