define(function(require) {

    var template = require('text!./view_workOffsets.html');
    var nls = require('i18n!./nls/resources.js');
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
            nls.counter = nls.counter + 1;
            console.log(nls.counter);
            return nls;
        }

		this.initialize = function( Panel ) {
            if (self.Panel == null)
            {
                self.Panel = Panel;

                // we use unique IDs in the view, so increment the counter so the next instance of t his view model will get a new ID
                // The modal dialogs need unique IDs globally, so each instance of this view must have different IDs for the modals
                self.settings.globals.nextUniqueElementID = self.settings.globals.nextUniqueElementID + 1;
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

        return self;

	};

	return ViewModel;
});
