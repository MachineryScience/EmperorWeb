define(function(require) {

    var template = require('text!./view_fileopen.html');
    var nls = require('i18n!./nls/resources');
    var utils = require('/app/core/helpers/utility.js');

	var ViewModel = function(moduleContext) {

		var self = this;
        self.Panel = null;
        self.linuxCNCServer = moduleContext.getSettings().linuxCNCServer;

        this.getTemplate = function()
        {
            return template;
        }
        this.getNls = function()
        {
            return nls;
        }


        this.readFile = function(reader)
        {

        }

        this.testFileSelect = function( evt )
        {
            console.log(evt);
            var files = evt.target.files; // FileList object
            var reader = new FileReader();
            var f = files[0];
            reader.onload = (function(theFile) {
                return function(e) {
                    self.linuxCNCServer.uploadGCode(theFile.name, e.target.result );
                };
            })(f);
            reader.readAsText(f);
        }

		this.initialize = function( Panel ) {
            if (self.Panel == null)
            {
                self.Panel = Panel;
                $('.switch', self.Panel.getJQueryElement()).bootstrapSwitch();

                $('#file_input', self.Panel.getJQueryElement()).bind('change', self.testFileSelect );
            }
		};




	};

	return ViewModel;
});
