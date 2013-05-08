define(function(require) {

    var template = require('text!./view_run.html');
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

		this.initialize = function( Panel ) {
            self.Panel = Panel;
            $('.switch', self.Panel.getJQueryElement()).bootstrapSwitch();
            self.linuxCNCServer.vars.optional_stop.data.subscribe( function(newVal)
            {
                $('#run_opstop_toggle', Panel.getJQueryElement()).bootstrapSwitch('setState',newVal);
            });
		};

        self.run = function()
        {
            if (self.singleStep())
                self.linuxCNCServer.runStep();
            else
                self.linuxCNCServer.runFrom(self.linuxCNCServer.vars.motion_line.data())
        };

        self.resume = function()
        {
            if (!self.linuxCNCServer.vars.paused.data())
                self.linuxCNCServer.pause();
            else {
                if (self.singleStep())
                    self.linuxCNCServer.runStep();
                else
                    self.linuxCNCServer.resume();
            }
        };

        self.singleStep = ko.observable(false);

	};

	return ViewModel;
});
