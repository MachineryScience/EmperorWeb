define(function(require) {

    var template = require('text!./view_spindle.html');
    var nls = require('i18n!./nls/resources');

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
                $('.switch', self.Panel.getJQueryElement()).bootstrapSwitch();

                self.linuxCNCServer.vars.spindle_brake.data.subscribe( function(newVal)
                {
                    $(self.Panel.getJQueryElement()).find('#brake_toggle').bootstrapSwitch('setState',newVal);
                });
                $(self.Panel.getJQueryElement()).find('#brake_toggle').bootstrapSwitch('setState',self.linuxCNCServer.vars.spindle_brake.data());
            }
        };

        self.setBrake = function()
        {
            self.linuxCNCServer.setSpindleBrake( $( '#brake_toggle', self.Panel.getJQueryElement() ).bootstrapSwitch('status'));
        }



	};

	return ViewModel;
});
