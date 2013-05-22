/*
 * This AMD module define a object containing settings as its properties. Settings can be 
 * simple literal variables or objects with complex composition.This settings file is 
 * getting loaded to GlobalContext, so that the settings defined here are copied to all 
 * sub contexts. Note that sub contexts receive own 'copies' of global settings.
 * 
 */
define(['/app/linuxCNCInterface.js'], function(linuxcnc ) {

    var settings = {};

    $.cookie.json = true;

	settings.appName =  "Emperor";
    settings.linuxCNCServer = linuxcnc;

    settings.mdiHistory = ko.observableArray([]);

    // setup mdiHistory initially
    var tmp = $.cookie('mdi_History');
    if (_.isArray(tmp)) settings.mdiHistory(tmp);
    settings.mdiHistory.subscribe( function(newval) {
        $.cookie('mdi_History', newval, { expires: 365, path: '/' });
    });

    // utility for adding to MDI history
    settings.addToMDIHistory = function( newVal )
    {
        if (!_.isString(newVal))
            return;

        newVal = newVal.toUpperCase();

        var old =  $.cookie('mdi_History');
        if (!_.isArray(old)) old = [];
        old = _.without(old,newVal);
        old.push(newVal);

        settings.mdiHistory(_.uniq(_.last(old,15)));
        settings.mdiHistory.valueHasMutated();
    }


    return settings;
});

