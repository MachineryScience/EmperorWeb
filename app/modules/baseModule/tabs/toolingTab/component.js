define(function(require) {

    // Load the dependencies
    var Boiler = require('Boiler');

    var ViewModel = require('./viewmodel');
    var ViewModel_dro = require('../tabWidgets/viewmodel_dro');
    var ViewModel_work = require('/app/modules/baseModule/tabs/tabWidgets/viewmodel_workOffsets.js');
    var ViewModel_tooling = require('../tabWidgets/viewmodel_tooling');

    var Component = function(moduleContext) {
		var panel = null;
        var panel_dro = null;
        var panel_work = null;
        var panel_tooling = null;
        var vm = null;
        var vm_dro = null;
        var vm_work = null;
        var vm_tooling = null;

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

                if (!panel_work) {
                    vm_work = new ViewModel_work(moduleContext);
                    panel_work = new Boiler.ViewTemplate(panel.getJQueryElement().find("#WORK_OFFSETS_PANEL"), vm_work.getTemplate(), vm_work.getNls());
                    ko.applyBindings( vm_work, panel_work.getDomElement());
                }
                vm_work.initialize(panel_work);

                if (!panel_tooling) {
                    vm_tooling = new ViewModel_tooling(moduleContext);
                    panel_tooling = new Boiler.ViewTemplate(panel.getJQueryElement().find("#TOOLING_PANEL"), vm_tooling.getTemplate(), vm_tooling.getNls());
                    ko.applyBindings( vm_tooling, panel_tooling.getDomElement());
                }
                vm_tooling.initialize(panel_tooling);

                panel.show();

                moduleContext.notify("ActivatedTabNeedsResize",panel_tooling.getJQueryElement());

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
