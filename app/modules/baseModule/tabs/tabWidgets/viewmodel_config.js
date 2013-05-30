define(function(require) {

    var template = require('text!./view_config.html');
    var nls = require('i18n!./nls/resources');

	var ViewModel = function(moduleContext) {

		var self = this;
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

        // Offset settings
        this.saveOffsetSettings = function()
        {
            self.settings.persist.ProbeRadius.SaveScratch();
            self.settings.persist.GaugeHeight.SaveScratch();
        }

        this.refreshOffsetSettings = function()
        {
            self.settings.persist.ProbeRadius.ResetScratch();
            self.settings.persist.GaugeHeight.ResetScratch();
        }

		this.initialize = function( Panel ) {
            if (_.isUndefined(self.Panel))
            {
                self.Panel = Panel;
                $('#myTab a:first', self.Panel.getJQueryElement() ).tab('show');

                $('#OffsetsTab', self.Panel.getJQueryElement()).on('shown', this.refreshOffsetSettings );


                $("#cp1", self.Panel.getJQueryElement()).colorpicker({format:"rgb"});
            }
        }

        this.getDisplayUnitValue = ko.computed(
        {
            read: function() {
                if (self.linuxCNCServer.ChangeDisplayUnitsToProgramUnits())
                    return "PROGRAM";

                switch (self.linuxCNCServer.DisplayUnitsPerMM())
                {
                    case 1: return "MM"; break;
                    case 1/10: return "CM"; break;
                    default: return "INCH"; break;
                }
            },
            write: function(newval){
                switch (newval)
                {
                    case "PROGRAM": self.linuxCNCServer.ChangeDisplayUnitsToProgramUnits(true);  self.linuxCNCServer.DisplayUnitsPerMM(self.linuxCNCServer.ProgramUnitsPerMM()); break;
                    case "MM": self.linuxCNCServer.ChangeDisplayUnitsToProgramUnits(false); self.linuxCNCServer.DisplayUnitsPerMM(1);  break;
                    case "CM": self.linuxCNCServer.ChangeDisplayUnitsToProgramUnits(false); self.linuxCNCServer.DisplayUnitsPerMM(1/10); break;
                    default:   self.linuxCNCServer.ChangeDisplayUnitsToProgramUnits(false); self.linuxCNCServer.DisplayUnitsPerMM(1/25.4); break;
                }
            }
        });

        this.refreshSettings = function()
        {
            self.linuxCNCServer.getClientConfig();
        }

        this.saveDisplaySettings = function()
        {
            self.linuxCNCServer.setClientConfig("DisplayUnitsPerMM", self.linuxCNCServer.DisplayUnitsPerMM() );
            self.linuxCNCServer.setClientConfig("ChangeDisplayUnitsToProgramUnits", self.linuxCNCServer.ChangeDisplayUnitsToProgramUnits() );
        }




	};

	return ViewModel;
});
