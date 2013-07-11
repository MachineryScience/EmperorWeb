define(function(require) {

    var template = require('text!./view_config.html');
    var nls = require('i18n!./nls/resources');
    var utils = require('/app/core/helpers/utility.js');

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

        // *** Offset settings
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

        // *** Jog settings
        this.saveJogSettings = function()
        {
            self.settings.persist.JogFeedFast.SaveScratch();
            self.settings.persist.JogFeedSlow.SaveScratch();
            self.settings.persist.JogStep1.SaveScratch();
            self.settings.persist.JogStep2.SaveScratch();
            self.settings.persist.JogStep3.SaveScratch();

        }

        this.refreshJogSettings = function()
        {
            self.settings.persist.JogFeedFast.ResetScratch();
            self.settings.persist.JogFeedSlow.ResetScratch();
            self.settings.persist.JogStep1.ResetScratch();
            self.settings.persist.JogStep2.ResetScratch();
            self.settings.persist.JogStep3.ResetScratch();
        }

        // *** Display Settings
        this.getBPColorText = (function(obs)
        {
            var c = obs.Scratch();
            return "rgb(" + c.r + "," + c.g + "," + c.b + ")";
        });


        this.refreshDisplaySettings = function()
        {
            self.settings.persist.DisplayUnitsPerMM.ResetScratch();
            self.settings.persist.ChangeDisplayUnitsToProgramUnits.ResetScratch();
        }

        this.saveDisplaySettings = function()
        {
            self.settings.persist.ChangeDisplayUnitsToProgramUnits.SaveScratch();
            self.settings.persist.DisplayUnitsPerMM.SaveScratch();
        }

        this.refreshBackplotSettings = function()
        {
            self.settings.persist.BPShowGrid.ResetScratch();

            // coordinate color pickers
            self.colorFields.forEach( function(el) {
                el[1].ResetScratch();
                $("#"+el[0], self.Panel.getJQueryElement()).colorpicker('setValue',self.getBPColorText(el[1]));
            });

            $(self.Panel.getJQueryElement()).find('#config_bpgrid_toggle').bootstrapSwitch('setState',self.settings.persist.BPShowGrid.Scratch());
        }

        this.saveBackplotSettings = function()
        {
            self.settings.persist.BPShowGrid.SaveScratch();
            self.colorFields.forEach( function(el) { el[1].SaveScratch(); } );
        }


		this.initialize = function( Panel ) {
            if (_.isUndefined(self.Panel))
            {
                self.Panel = Panel;

                // initialize individual tab values
                $('#OffsetsTab', self.Panel.getJQueryElement()).on('shown', this.refreshOffsetSettings );
                $('#DisplayTab', self.Panel.getJQueryElement()).on('shown', this.refreshDisplaySettings );
                $('#BackplotTab', self.Panel.getJQueryElement()).on('shown', this.refreshBackplotSettings );
                $('#JogTab', self.Panel.getJQueryElement()).on('shown', this.refreshBackplotSettings );

                $('#myTab a:first', self.Panel.getJQueryElement() ).tab('show');

                // setup colorpickers
                var setupColorPicker = function( element_name, observable ) {
                    $("#"+element_name, self.Panel.getJQueryElement()).colorpicker({format:"rgb"});
                    $("#"+element_name, self.Panel.getJQueryElement()).colorpicker().on('changeColor',function(ev){
                        observable.Scratch( ev.color.toRGB() );
                        $("#"+element_name, self.Panel.getJQueryElement()).val(self.getBPColorText(observable));
                    });
                }

                self.colorFields = [
                    ["inputBackplotBackgroundColor",self.settings.persist.BPBGColor],
                    ["inputBackplotFeedColor",self.settings.persist.BPFeedColor],
                    ["inputBackplotFeedExecutedColor",self.settings.persist.BPFeedExecutedColor],
                    ["inputBackplotTraverseColor",self.settings.persist.BPTraverseColor],
                    ["inputBackplotTraverseExecutedColor",self.settings.persist.BPTraverseExecutedColor],
                    ["inputBackplotGridColor",self.settings.persist.BPGridColor],
                    ["inputBackplotGridMajorColor",self.settings.persist.BPGridMajorColor]
                ];

                self.colorFields.forEach( function(el) {setupColorPicker(el[0],el[1]);});

                // setup toggle controls
                $('.switch', self.Panel.getJQueryElement()).bootstrapSwitch();
                self.settings.persist.BPShowGrid.subscribe( function(newVal)
                {
                    $(self.Panel.getJQueryElement()).find('#config_bpgrid_toggle').bootstrapSwitch('setState',newVal);
                });

            }
        }

        this.setBackplotGrid = function(){
            self.settings.persist.BPShowGrid.Scratch( $( '#config_bpgrid_toggle', self.Panel.getJQueryElement() ).bootstrapSwitch('status') ? true : false );
        }

        this.getDisplayUnitValue = ko.computed(
        {
            read: function() {
                if (self.settings.persist.ChangeDisplayUnitsToProgramUnits.Scratch())
                    return "PROGRAM";

                switch (self.settings.persist.DisplayUnitsPerMM.Scratch())
                {
                    case 1: return "MM"; break;
                    case 1/10: return "CM"; break;
                    default: return "INCH"; break;
                }
            },
            write: function(newval){
                switch (newval)
                {
                    case "PROGRAM":
                        self.settings.persist.ChangeDisplayUnitsToProgramUnits.Scratch(true);
                        self.settings.persist.DisplayUnitsPerMM.Scratch(self.linuxCNCServer.ProgramUnitsPerMM());
                        break;
                    case "MM":
                        self.settings.persist.ChangeDisplayUnitsToProgramUnits.Scratch(false);
                        self.settings.persist.DisplayUnitsPerMM.Scratch(1);
                        break;
                    case "CM":
                        self.settings.persist.ChangeDisplayUnitsToProgramUnits.Scratch(false);
                        self.settings.persist.DisplayUnitsPerMM.Scratch(1/10);
                        break;
                    default:
                        self.settings.persist.ChangeDisplayUnitsToProgramUnits.Scratch(false);
                        self.settings.persist.DisplayUnitsPerMM.Scratch(1/25.4);
                        break;
                }
            }
        });

        this.launchServerConfig = function()
        {
            window.open( "http://" + self.linuxCNCServer.server_address() + ":" + self.linuxCNCServer.server_port(), "Linux CNC Server Configuration Website", "height=700,width=1024,scrollbars=yes,resizable=1,location=no,status=no,toolbar=no");
        }

        this.launchServerHelp = function()
        {
            window.open( "/external/linuxCNCDoc//linuxCNCDocumentation/index.html", "Linux CNC Server Documentation", "height=700,width=1024,scrollbars=yes,resizable=1,location=no,status=no,toolbar=no");
        }

	};

	return ViewModel;
});
