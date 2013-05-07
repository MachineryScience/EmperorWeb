define(function(require) {

    var template = require('text!./view.html');
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
		};


        this.filename_short = ko.computed( function() {
            var str = self.linuxCNCServer.vars.file.data();
            if (str.length > 25)
                return "..." + str.substr( str.length - 22 );
            return str;
        });

	};

	return ViewModel;
});
