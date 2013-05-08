/*
 * Definition of the base module. Base module contain some common components some one may use in
 * creating own application. These components are not a core part of BoilerplateJS, but available as samples.
 */
define(function(require) {

    // Load the dependencies
    var Boiler = require('Boiler'), 
        NavBarTopComponent = require('./mainShell/navBarTop/component'),
        NavBarBottomComponent = require('./mainShell/navBarBottom/component'),
        OverviewTab = require('./tabs/overviewTab/component');

    // Definition of the base Module as an object, this is the return value of this AMD script
    return {
        
        initialize : function(parentContext) {
            //create module context by assiciating with the parent context
            var context = new Boiler.Context(parentContext);

            var controller = new Boiler.DomController($('body'));
            //add routes with DOM node selector queries and relevant components
            controller.addRoutes({
                "#navbar_top_wrapper" : new NavBarTopComponent(context),
                "#navbar_bottom_wrapper" : new NavBarBottomComponent(context)
            });
            controller.start();

            var controller = new Boiler.UrlController($("#main-content"));
            var test = new OverviewTab(context);
            controller.addRoutes({
                "/" : test,      // DEFAULT landing page
                "test" : test
            });
            controller.start();

            // error notifications
            parentContext.getSettings().linuxCNCServer.vars.error.data.subscribe(function(){
                try  {
                if (parentContext.getSettings().linuxCNCServer.vars.error.data().text.length > 0)
                    $.pnotify({
                        type: "error",
                        title: "Controller Error",
                        text: parentContext.getSettings().linuxCNCServer.vars.error.data().text
                    })
                } catch(ex) {}
            });
        }
        
    }

});