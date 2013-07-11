define(function(require) {

    // Load the dependencies
    var Boiler = require('Boiler'),
        ViewModel = require('./viewmodel'),
        cssPath = require('path!./style.css');


	var Component = function(moduleContext) {
		var panel = null;
        var vm;
        var privateContext = new Boiler.Context();

		return {
			activate : function(parent) {
				if (!panel) {
                    vm = new ViewModel(moduleContext, privateContext);
                    panel = new Boiler.ViewTemplate(parent, vm.getTemplate(), vm.getNls());
                    ko.applyBindings( vm, panel.getDomElement());
					Boiler.ViewTemplate.setStyleLink(cssPath);
				}
				panel.show();

                // Main setup
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
