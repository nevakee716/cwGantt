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

    cwImprovedGantt.prototype.applyJavaScript = function() {
        var self = this;
        var libToLoad = [];

        if (cwAPI.isDebugMode() === true) {
            self.createGantt();
        } else {
            libToLoad = ['modules/jsgantt/jsgantt.min.js'];
            // AsyncLoad
            cwApi.customLibs.aSyncLayoutLoader.loadUrls(libToLoad, function(error) {
                if (error === null) {
                    self.createGantt();
                } else {
                    cwAPI.Log.Error(error);
                }
            });
        }
    };


    // Building network
    cwImprovedGantt.prototype.createGantt = function() {
        function addStyleString(str) {
            var node = document.createElement('style');
            node.innerHTML = str;
            document.body.appendChild(node);
        }

        var GanttContainer = document.getElementById("cwImprovedGantt" + this.nodeID);
        var self = this,
            i = 0;


        // legend
        var x = -GanttContainer.clientWidth / 2 + 70;
        var y = -GanttContainer.clientHeight / 2 + 150;
        this.g = new JSGantt.GanttChart(GanttContainer, 'day');
        this.g.setDateTaskTableDisplayFormat(this.config.dateDisplayFormat);
        this.g.setUseToolTip(0);
        this.simplify(this.JSONobjects, null);
        this.g.Draw(this.config.columnMap);



        function createCSSSelector (selector, style) {
          if (!document.styleSheets) return;
          if (document.getElementsByTagName('head').length == 0) return;

          var styleSheet,mediaType;

          if (document.styleSheets.length > 0) {
            for (var i = 0, l = document.styleSheets.length; i < l; i++) {
              if (document.styleSheets[i].disabled) 
                continue;
              var media = document.styleSheets[i].media;
              mediaType = typeof media;

              if (mediaType === 'string') {
                if (media === '' || (media.indexOf('screen') !== -1)) {
                  styleSheet = document.styleSheets[i];
                }
              }
              else if (mediaType=='object') {
                if (media.mediaText === '' || (media.mediaText.indexOf('screen') !== -1)) {
                  styleSheet = document.styleSheets[i];
                }
              }

              if (typeof styleSheet !== 'undefined') 
                break;
            }
          }

          if (typeof styleSheet === 'undefined') {
            var styleSheetElement = document.createElement('style');
            styleSheetElement.type = 'text/css';
            document.getElementsByTagName('head')[0].appendChild(styleSheetElement);

            for (i = 0; i < document.styleSheets.length; i++) {
              if (document.styleSheets[i].disabled) {
                continue;
              }
              styleSheet = document.styleSheets[i];
            }

            mediaType = typeof styleSheet.media;
          }

          if (mediaType === 'string') {
            for (var i = 0, l = styleSheet.rules.length; i < l; i++) {
              if(styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase()==selector.toLowerCase()) {
                styleSheet.rules[i].style.cssText = style;
                return;
              }
            }
            styleSheet.addRule(selector,style);
          }
          else if (mediaType === 'object') {
            var styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
            for (var i = 0; i < styleSheetLength; i++) {
              if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                styleSheet.cssRules[i].style.cssText = style;
                return;
              }
            }
            styleSheet.insertRule(selector + '{' + style + '}', styleSheetLength);
          }
        };

        this.config.columnMap.forEach(function(c) {

            createCSSSelector(".g" + c.scriptname,"height: 18px; white-space: nowrap; border: #efefef 1px solid; text-align: center; min-width: 140px; max-width: 140px; width: 140px; font-size: 10px;");
            
        });
    };



    cwApi.cwLayouts.cwImprovedGantt = cwImprovedGantt;
}(cwAPI, jQuery));