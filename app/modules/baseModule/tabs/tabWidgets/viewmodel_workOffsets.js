define(function(require) {

    var template = require('text!./view_workOffsets.html');
    var nls = require('i18n!./nls/resources');
    var utils = require('/app/core/helpers/utility.js');

	var ViewModel = function(moduleContext) {

		var self = this;
        self.Panel = null;
        self.linuxCNCServer = moduleContext.getSettings().linuxCNCServer;
        self.settings = moduleContext.getSettings();

        this.getTemplate = function()
        {
            return template;
        }
        this.getNls = function()
        {
            return nls;
        }

		this.initialize = function( Panel ) {
            if (self.Panel == null)
            {
                self.Panel = Panel;
                $('[data-toggle="tooltip"]',self.Panel.getJQueryElement()).each(function(idx,elem){$(elem).tooltip({})});
            }
		};


        self.tempToolNumber = ko.observable(self.linuxCNCServer.vars.tool_in_spindle.data());
        self.linuxCNCServer.vars.tool_in_spindle.data.subscribe(function(newval){self.tempToolNumber(newval);});

        self.tempOffset = ko.observable(0);
        self.curIdx = ko.observable(0);


        this.G54ZeroDRO = function(data,event,index){
            alert("Zero G54 " + index );
        };
        this.G54SetDRO = function(data,event,index){
            alert("G54SetDRO " + index );
        };
        this.G54SetDROToRadius = function(data,event,index){
            alert("G54SetDROToRadius " + index );
        };
        this.G54Clear = function(data,event,index){
            alert("G54Clear " + index );
        };
        this.G54ClearAll = function(){
            alert("G54ClearAll");
        };

	};

	return ViewModel;
});
