define(function(require) {

    var template = require('text!./view_config.html');
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

            $('#myTab a:first', self.Panel.getJQueryElement() ).tab('show');

            $('#myTab a', self.Panel.getJQueryElement()).each( function(index, Element){
                $(Element).click( function (e) {
                    e.preventDefault();
                    $(this).tab('show');
            })});
        }


	};

	return ViewModel;
});
