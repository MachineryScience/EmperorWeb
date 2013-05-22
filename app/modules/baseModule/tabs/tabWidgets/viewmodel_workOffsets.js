define(function(require) {

    var template = require('text!./view_workOffsets.html');
    var nls = require('i18n!./nls/resources');
    var utils = require('/app/core/helpers/utility.js');

	var ViewModel = function(moduleContext) {

		var self = this;
        self.Panel = null;
        self.linuxCNCServer = moduleContext.getSettings().linuxCNCServer;

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


        this.setG92Enable = function()
        {
            self.linuxCNCServer.setG92Enable( $( '#wo_g92_toggle', self.Panel.getJQueryElement() ).bootstrapSwitch('status'));
        }

        this.onG92ValChange = function(data,event,index)
        {
            if ($.isNumeric(event.currentTarget.value))
            {
                if ( parseFloat(event.currentTarget.value) != self.linuxCNCServer.vars.g92_offset.data()[index])
                {
                    alert("G92 Send data to server " + event.currentTarget.value );
                    self.linuxCNCServer.g92Set( index, event.currentTarget.value );
                }
                return;
            }
            // default behavior: reset value
            $(event.currentTarget).val( self.linuxCNCServer.vars.g92_offset.data()[index].toFixed(self.linuxCNCServer.DisplayPrecision()));
        };

        this.onG5xValChange = function(data,event,index)
        {
            alert("G5x Change on " + index + " data " + data );
        };

        this.onToolValChange = function(data,event,index)
        {
            alert("TLO Change on " + index + " data " + data );
        };


	};

	return ViewModel;
});
