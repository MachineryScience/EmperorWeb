define(function(require) {

    // Load the dependencies
    var Boiler = require('Boiler');

    var ViewModel = require('./viewmodel');
    var ViewModel_config = require('../tabWidgets/viewmodel_config');

    var Component = function(moduleContext) {
		var panel = null;
        var panel_config = null;
        var vm = null;
        var vm_config = null;
        var privateContext = new Boiler.Context();

		return {
			activate : function(parent) {
				if (!panel) {
                    vm = new ViewModel(moduleContext, privateContext);
					panel = new Boiler.ViewTemplate(parent, vm.getTemplate(), vm.getNls());
                    ko.applyBindings( vm, panel.getDomElement());
				}
                vm.initialize(panel);

                if (!panel_config) {
                    vm_config = new ViewModel_config(moduleContext, privateContext);
                    panel_config = new Boiler.ViewTemplate(panel.getJQueryElement().find("#CONFIG_PANEL"), vm_config.getTemplate(), vm_config.getNls());
                    ko.applyBindings( vm_config, panel_config.getDomElement());
                }
                vm_config.initialize(panel_config);

                panel.show();
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
