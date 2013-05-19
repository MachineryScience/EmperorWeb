define(function(require) {

    var template = require('text!./view_run.html');
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
                $('.switch', self.Panel.getJQueryElement()).bootstrapSwitch();
                self.linuxCNCServer.vars.optional_stop.data.subscribe( function(newVal)
                {
                    $(self.Panel.getJQueryElement()).find('#run_opstop_toggle').bootstrapSwitch('setState',newVal);
                });

                utils.JQVSlider( $( "#run_spindle_rate_slider", self.Panel.getJQueryElement() ), self.linuxCNCServer.vars.spindlerate.data, 0, 1, 0.01, function(event,ui){ self.linuxCNCServer.setSpindleOverride(ui.value); } );
                utils.JQVSlider( $( "#run_feed_rate_slider", self.Panel.getJQueryElement() ), self.linuxCNCServer.vars.feedrate.data, 0, 1, 0.01, function(event,ui){ self.linuxCNCServer.setFeedrate(ui.value); } );
            }
		};

        self.run = function()
        {
            if (self.singleStep())
                self.linuxCNCServer.runStep();
            else
                self.linuxCNCServer.runFrom(self.linuxCNCServer.vars.motion_line.data())
        };

        self.setOptionalStop = function()
        {
            self.linuxCNCServer.setOptionalStop( $( '#run_opstop_toggle', self.Panel.getJQueryElement() ).bootstrapSwitch('status'));
        }

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

        self.spindleRateText = ko.computed( function() {
            return (self.linuxCNCServer.vars.spindlerate.data() * 100).toFixed(0);
        });

        self.feedRateText = ko.computed( function() {
            return (self.linuxCNCServer.vars.feedrate.data() * 100).toFixed(0);
        });

	};

	return ViewModel;
});
