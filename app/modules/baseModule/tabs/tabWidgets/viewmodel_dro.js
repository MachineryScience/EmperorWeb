define(function(require) {

    var template = require('text!./view_dro.html');
    var nls = require('i18n!./nls/resources');

	var ViewModel = function(moduleContext) {

		var self = this;
        self.linuxCNCServer = moduleContext.getSettings().linuxCNCServer;

        this.getTemplate = function()
        {
            return template;
        }
        this.getNls = function()
        {
            return nls;
        }

		this.initialize = function( droPanel ) {
            self.droPanel = droPanel;
		};

        this.onDROFocus = function(data, event)
        {
            $(event.target.nextSibling).select();
            return true;
        }


        self.onHome = function(index)
        {
            self.linuxCNCServer.homeAxis(index);
        }

        self.onZeroDRO = function(index)
        {
            self.linuxCNCServer.touchoffCurrent( index, 0 );
        }

        self.onDROValChange=function(oldval,event,index)
        {
            if ($.isNumeric(event.currentTarget.value))
                if (event.currentTarget.value != self.linuxCNCServer.RmtDRO()[index].toFixed(4))
                    self.linuxCNCServer.touchoffCurrent( index, event.currentTarget.value );
                else
                    $(event.currentTarget).val( self.linuxCNCServer.RmtDRO()[index].toFixed(4) );
            else
                $(event.currentTarget).val( self.linuxCNCServer.RmtDRO()[index].toFixed(4) );
        }
	};

	return ViewModel;
});
