define(function(require) {

    var template = require('text!./view_spindle.html');
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

                self.linuxCNCServer.vars.spindle_brake.data.subscribe( function(newVal)
                {
                    self.serverUpdate = true;
                    $(self.Panel.getJQueryElement()).find('#brake_toggle').bootstrapSwitch('setState',newVal);
                    self.serverUpdate = false;
                });
                $(self.Panel.getJQueryElement()).find('#brake_toggle').bootstrapSwitch('setState',self.linuxCNCServer.vars.spindle_brake.data());

                self.serverUpdate = false;
            }
        };

        self.setBrake = function()
        {
            if (!self.serverUpdate)
                self.linuxCNCServer.setSpindleBrake( $( '#brake_toggle', self.Panel.getJQueryElement() ).bootstrapSwitch('status'));
        }



	};

	return ViewModel;
});
