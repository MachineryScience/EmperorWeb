define(function(require) {

    // Load the dependencies
    var Boiler = require('Boiler');

    var ViewModel = require('./viewmodel');
    var ViewModel_dro = require('../tabWidgets/viewmodel_dro');
    var ViewModel_file = require('../tabWidgets/viewmodel_file');
    var ViewModel_fileOpen = require('../tabWidgets/viewmodel_fileOpen');
    var ViewModel_backplot = require('../tabWidgets/viewmodel_backplot');

    var Component = function(moduleContext) {
		var panel = null;
        var panel_dro = null;
        var panel_file = null;
        var panel_fileopen = null;
        var panel_backplot = null;
        var vm = null;
        var vm_dro = null;
        var vm_file = null;
        var vm_fileopen = null;
        var vm_backplot = null;

        var privateContext = new Boiler.Context();

		return {
			activate : function(parent) {
				if (!panel) {
                    vm = new ViewModel(moduleContext, privateContext);
					panel = new Boiler.ViewTemplate(parent, vm.getTemplate(), vm.getNls());
                    ko.applyBindings( vm, panel.getDomElement());
				}
                vm.initialize(panel);

                if (!panel_dro) {
                    vm_dro = new ViewModel_dro(moduleContext, privateContext);
                    panel_dro = new Boiler.ViewTemplate(panel.getJQueryElement().find("#DRO_PANEL"), vm_dro.getTemplate(), vm_dro.getNls());
                    ko.applyBindings( vm_dro, panel_dro.getDomElement());
                }
                vm_dro.initialize(panel_dro);

                if (!panel_fileopen) {
                    vm_fileopen = new ViewModel_fileOpen(moduleContext, privateContext);
                    panel_fileopen = new Boiler.ViewTemplate(panel.getJQueryElement().find("#FILE_OPEN_PANEL"), vm_fileopen.getTemplate(), vm_fileopen.getNls());
                    ko.applyBindings( vm_fileopen, panel_fileopen.getDomElement());
                }
                vm_fileopen.initialize(panel_fileopen);

                if (!panel_backplot) {
                    vm_backplot = new ViewModel_backplot(moduleContext, privateContext);
                    panel_backplot = new Boiler.ViewTemplate(panel.getJQueryElement().find("#BACKPLOT_PANEL"), vm_backplot.getTemplate(), vm_backplot.getNls());
                    ko.applyBindings( vm_backplot, panel_backplot.getDomElement());
                }

                if (!panel_file) {
                    vm_file = new ViewModel_file(moduleContext, privateContext);
                    panel_file = new Boiler.ViewTemplate(panel.getJQueryElement().find("#FILE_PANEL"), vm_file.getTemplate(), vm_file.getNls());
                    ko.applyBindings( vm_file, panel_file.getDomElement());
                }
                vm_file.initialize(panel_file);

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
