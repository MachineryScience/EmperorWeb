define(function(require) {

    // Load the dependencies
    var Boiler = require('Boiler');

    var ViewModel = require('./viewmodel');
    var ViewModel_dro = require('../tabWidgets/viewmodel_dro');
    var ViewModel_run = require('../tabWidgets/viewmodel_run');
    var ViewModel_backplot = require('../tabWidgets/viewmodel_backplot');

    var Component = function(moduleContext) {
		var panel = null;
        var panel_dro = null;
        var panel_run = null;
        var panel_backplot = null;
        var vm = null;
        var vm_dro = null;
        var vm_run = null;
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

                if (!panel_backplot) {
                    vm_backplot = new ViewModel_backplot(moduleContext);
                    panel_backplot = new Boiler.ViewTemplate(panel.getJQueryElement().find("#BACKPLOT_PANEL"), vm_backplot.getTemplate(), vm_backplot.getNls());
                    ko.applyBindings( vm_backplot, panel_backplot.getDomElement());
                }

                panel.show();

                moduleContext.notify("ActivatedTabNeedsResize",panel_backplot.getJQueryElement());
                vm_backplot.initialize(panel_backplot);
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
