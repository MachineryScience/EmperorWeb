define(function(require) {

    var template = require('text!./view.html');
    var nls = require('i18n!./nls/resources');

	var ViewModel = function(moduleContext) {

		var self = this;
        self.linuxCNCServer = moduleContext.getSettings().linuxCNCServer;

        self.currentTabNum = ko.observable(0);
        self.activeTab0 = ko.computed( function(){ return self.currentTabNum() == 0 } );
        self.activeTab1 = ko.computed( function(){ return self.currentTabNum() == 1 } );
        self.activeTab2 = ko.computed( function(){ return self.currentTabNum() == 2 } );
        self.activeTab3 = ko.computed( function(){ return self.currentTabNum() == 3 } );
        self.activeTab4 = ko.computed( function(){ return self.currentTabNum() == 4 } );
        self.activeTab5 = ko.computed( function(){ return self.currentTabNum() == 5 } );
        self.activeTab6 = ko.computed( function(){ return self.currentTabNum() == 6 } );
        self.activeTab7 = ko.computed( function(){ return self.currentTabNum() == 7 } );
        self.activeTab8 = ko.computed( function(){ return self.currentTabNum() == 8 } );
        self.activeTab9 = ko.computed( function(){ return self.currentTabNum() == 9 } );

        self.tabChange = function(newTabNum)
        {
            self.currentTabNum(newTabNum);
            return true;
        }

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

	};

	return ViewModel;
});
