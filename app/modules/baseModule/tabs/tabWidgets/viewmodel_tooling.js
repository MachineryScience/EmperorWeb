define(function(require) {

    var template = require('text!./view_file.html');
    var nls = require('i18n!./nls/resources');

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

		this.initialize = function( Panel ) {
            if (_.isNull( self.Panel ))
            {
                self.Panel = Panel;

                // var data = self.linuxCNCServer.vars.file_content.data().split('\n');
                var data = [  ];

                self.toolListTable = $("#FileListTable", self.Panel.getJQueryElement());
                self.toolListTable.handsontable({
                    data: data,
                    stretchH: "last",
                    rowHeaders: true,
                    height: 254,
                    startCols: 7,
                    outsideClickDeselects: false,
                    columns: [
                        {
                            //readOnly: true
                        }
                    ]
                });

                // monitor file contents
                self.linuxCNCServer.vars.file_content.data.subscribe( self.updateData );
                self.linuxCNCServer.vars.motion_line.data.subscribe( self.updateDisplayLine );

                self.fileListTable.dblclick( function(){ self.setMotionLineToSelected(); } );
            }

            setTimeout( function() {
                self.updateData(self.linuxCNCServer.vars.file_content.data());
                self.updateDisplayLine(self.linuxCNCServer.vars.motion_line.data());
            },2);

		};

        this.setMotionLineToSelected = function()
        {
            if (!self.linuxCNCServer.RmtRunning())
                self.linuxCNCServer.vars.motion_line.data(self.fileListTable.handsontable('getSelected')[0]);

        }

        this.updateData = function( newfilecontent )
        {
            var ht = self.fileListTable.handsontable('getInstance');

            var dat = _.zip(newfilecontent.split('\n'));
            ht.loadData(dat);

            var rh = [];
            var rc = ht.countRows();
            for (idx = 0; idx < rc; idx++)
                rh.push(idx.toString());
            ht.updateSettings({rowHeaders: rh});

            ht.render();

            $("#jog_focus_handler").focus();


        }

        this.updateDisplayLine = function( lineNum )
        {
            var ht = self.fileListTable.handsontable('getInstance');

            ht.selectCell(lineNum,0);

            if (ht.countRows() > lineNum+4)
            {
                ht.view.scrollViewport({row: lineNum+4, col: 0});
                ht.view.wt.draw(true); //these two lines are needed to fix scrolling viewport when cell dimensions are significantly bigger than assumed by Walkontable
                ht.view.scrollViewport({row: lineNum+4, col: 0});
            }

            $("#jog_focus_handler").focus();
        }



	};

	return ViewModel;
});
