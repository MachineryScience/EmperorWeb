define(function(require) {

    // Load the dependencies
    var Boiler = require('Boiler');

    var ViewModel = require('./viewmodel');
    var ViewModel_dro = require('../tabWidgets/viewmodel_dro');
    var ViewModel_run = require('../tabWidgets/viewmodel_run');
    var ViewModel_fileOpen = require('../tabWidgets/viewmodel_fileOpen');
    var ViewModel_workOffsets = require('../tabWidgets/viewmodel_workOffsets');
    var ViewModel_backplot = require('../tabWidgets/viewmodel_backplot');

    var Component = function(moduleContext) {
		var panel = null;
        var panel_dro = null;
        var panel_run = null;
        var panel_fileopen = null;
        var panel_workoffsets = null;
        var panel_backplot = null;
        var vm = null;
        var vm_dro = null;
        var vm_run = null;
        var vm_fileopen = null;
        var vm_workoffsets = null;
        var vm_backplot = null;

		return {
			activate : function(parent) {
				if (!panel) {
                    vm = new ViewModel(moduleContext);
					panel = new Boiler.ViewTemplate(parent, vm.getTemplate(), vm.getNls());
                    ko.applyBindings( vm, panel.getDomElement());
				}
                vm.initialize(panel);

                if (!panel_dro) {
                    vm_dro = new ViewModel_dro(moduleContext);
                    panel_dro = new Boiler.ViewTemplate(panel.getJQueryElement().find("#DRO_PANEL"), vm_dro.getTemplate(), vm_dro.getNls());
                    ko.applyBindings( vm_dro, panel_dro.getDomElement());
                }
                vm_dro.initialize(panel_dro);

                if (!panel_run) {
                    vm_run = new ViewModel_run(moduleContext);
                    panel_run = new Boiler.ViewTemplate(panel.getJQueryElement().find("#RUN_PANEL"), vm_run.getTemplate(), vm_run.getNls());
                    ko.applyBindings( vm_run, panel_run.getDomElement());
                }
                vm_run.initialize(panel_run);

                if (!panel_fileopen) {
                    vm_fileopen = new ViewModel_fileOpen(moduleContext);
                    panel_fileopen = new Boiler.ViewTemplate(panel.getJQueryElement().find("#FILE_OPEN_PANEL"), vm_fileopen.getTemplate(), vm_fileopen.getNls());
                    ko.applyBindings( vm_fileopen, panel_fileopen.getDomElement());
                }
                vm_fileopen.initialize(panel_fileopen);

                if (!panel_workoffsets) {
                    vm_workoffsets = new ViewModel_workOffsets(moduleContext);
                    panel_workoffsets = new Boiler.ViewTemplate(panel.getJQueryElement().find("#WORK_OFFSETS_PANEL"), vm_workoffsets.getTemplate(), vm_workoffsets.getNls());
                    ko.applyBindings( vm_workoffsets, panel_workoffsets.getDomElement());
                }
                vm_workoffsets.initialize(panel_workoffsets);

                if (!panel_backplot) {
                    vm_backplot = new ViewModel_backplot(moduleContext);
                    panel_backplot = new Boiler.ViewTemplate(panel.getJQueryElement().find("#BACKPLOT_PANEL"), vm_backplot.getTemplate(), vm_backplot.getNls());
                    ko.applyBindings( vm_backplot, panel_backplot.getDomElement());
                }

                panel.show();

                vm_backplot.initialize(panel_backplot);
                moduleContext.notify("ActivatedTabNeedsResize",panel_backplot.getJQueryElement());

			},



			deactivate : function() {
				if (panel) {
					panel.hide();
				}
			}
		};
	};

	return Component;

});
