define(function(require) {

    var template = require('text!./view_coolant.html');
    var nls = require('i18n!./nls/resources');

	var ViewModel = function(moduleContext) {

		var self = this;
        self.Panel = null;
        self.linuxCNCServer = moduleContext.getSettings().linuxCNCServer;

        self.serverUpdate = false;

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
                $('.switch', self.Panel.getJQueryElement()).bootstrapSwitch();

                self.serverUpdate = true;

                self.linuxCNCServer.vars.mist.data.subscribe( function(newVal)
                {
                    self.serverUpdate = true;
                    $(self.Panel.getJQueryElement()).find('#mist_toggle').bootstrapSwitch('setState',newVal);
                    self.serverUpdate = false;
                });
                $(self.Panel.getJQueryElement()).find('#mist_toggle').bootstrapSwitch('setState',self.linuxCNCServer.vars.mist.data());

                self.linuxCNCServer.vars.flood.data.subscribe( function(newVal)
                {
                    self.serverUpdate = true;
                    $(self.Panel.getJQueryElement()).find('#flood_toggle').bootstrapSwitch('setState',newVal);
                    self.serverUpdate = false;
                });
                $(self.Panel.getJQueryElement()).find('#flood_toggle').bootstrapSwitch('setState',self.linuxCNCServer.vars.flood.data());

                self.serverUpdate = false;
            }
        };

        self.setMist = function()
        {
            if (!self.serverUpdate)
                self.linuxCNCServer.setMist( $( '#mist_toggle', self.Panel.getJQueryElement() ).bootstrapSwitch('status'));
        }

        self.setFlood = function()
        {
            if (!self.serverUpdate)
                self.linuxCNCServer.setFlood( $( '#flood_toggle', self.Panel.getJQueryElement() ).bootstrapSwitch('status'));
        }

	};

	return ViewModel;
});
