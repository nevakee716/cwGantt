/* Copyright (c) 2012-2013 Casewise Systems Ltd (UK) - All rights reserved */



/*global cwAPI, jQuery */
(function (cwApi, $) {
    "use strict";
    if(cwApi && cwApi.cwLayouts && cwApi.cwLayouts.cwImprovedGantt) {
      var cwImprovedGantt = cwApi.cwLayouts.cwImprovedGantt;
    } else {
    // constructor
        var cwImprovedGantt = function (options, viewSchema) {
            cwApi.extend(this, cwApi.cwLayouts.CwLayout, options, viewSchema); // heritage
            cwApi.registerLayoutForJSActions(this); // execute le applyJavaScript après drawAssociations
            this.construct(options);
        };
    }
   
    cwImprovedGantt.prototype.construct = function(options) {
        this.scale = "month";
        this.idsTable = {};
        this.reverseIdTable = {};
        this.complementaryNode = [];
        this.objectTypeTable = {};
        this.reverseobjectTypeTable = {};
        this.layoutsByNodeId = {};
        this.config =  {
            "nodes" : {
                "projet_474185792": {    // node ID
                    "startDate": "STARTDATE",      // property scriptname of the start date
                    "endDate": "ENDDATE",
                    "completion": "PERCENTCOMPLETE",
                    "ressourceNodeID":"cw_user_20192_1267182698",          // property scriptname of the end date,                             // will be set to current if the date is not set
                    "classStyle": "ggroupblack"    // css style of the step
                },
                "projet_20027_205402790": {
                    "startDate": "STARTDATE",
                    "endDate": "ENDDATE",
                    "completion": "PERCENTCOMPLETE",
                    "ressourceNodeID":"cw_user_20192_206480431",
                    "finishToStart" : ["projet_20217_39247427"],
                    "startToStart" : ["projet_20218_858571321"],
                    "finishToFinish" : ["projet_20219_1725533778"],
                    "classStyle": "gtaskred" 
                }
            },
            "hiddenNodes" : [],
            "complementaryNode" : [],
            "dateDisplayFormat":"mm/dd/yyyy",
            "scale" : "month",
            "fixedColumnMap" : [
            {
                scriptname : "startdate",
                label : "Start Date",
                width : "70"
            },
            {
                scriptname : "enddate",
                label : "End Date",
                width : "70"
            },
            {
                scriptname : "duration",
                label : "Duration",
                width : "70"
            },
            {
                scriptname : "pccomplete",
                label : "% Completion",
                width : "50"
            },
            {
                scriptname : "taskname",
                width : "400"
            }],
            "customColumnMap" : [{
                scriptname : "type",
                label : "Category",
                width : "70"
            }],
            

        };

    };



    cwApi.cwLayouts.cwImprovedGantt = cwImprovedGantt;
}(cwAPI, jQuery));