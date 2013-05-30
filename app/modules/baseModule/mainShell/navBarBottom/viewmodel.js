define(function(require) {

    var template = require('text!./view.html');
    var nls = require('i18n!./nls/resources');

	var ViewModel = function(moduleContext) {

		var self = this;
        self.linuxCNCServer = moduleContext.getSettings().linuxCNCServer;
        self.settings =  moduleContext.getSettings();

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
            self.mdiTypeAhead = $('#navBottomMDIInput',self.Panel.getJQueryElement()).typeahead({ dropup: true, source: function() { return self.settings.persist.MDIHistory(); } });
		};

        this.currentMDIText = ko.observable("");
        this.currentMDITextSetAndFocus = function(newval)
        {
            self.currentMDIText(newval);
            $('#navBottomMDIInput',self.Panel.getJQueryElement()).focus();
        };

        this.mdiInputKeyPress = function(d,e)
        {
            if (self.mdiTypeAhead.shown)
                return true;

            e = e || window.event;
            var keyCode=(e.keyCode ? e.keyCode : e.which);
            if (keyCode == 13) self.mdiExecute();
            return true;
        };

        this.mdiExecute= function()
        {
            var mdiText = $('#navBottomMDIInput',self.Panel.getJQueryElement()).val();

            if (! _.isEmpty(mdiText))
            {
                self.linuxCNCServer.mdi(mdiText);
                self.settings.addToMDIHistory( mdiText );
                $('#navBottomMDIInput',self.Panel.getJQueryElement()).typeahead({ dropup: true, source: self.settings.persist.MDIHistory() });
            }
        }

	};

	return ViewModel;
});
