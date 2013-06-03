/*
 * This AMD module define a object containing settings as its properties. Settings can be 
 * simple literal variables or objects with complex composition.This settings file is 
 * getting loaded to GlobalContext, so that the settings defined here are copied to all 
 * sub contexts. Note that sub contexts receive own 'copies' of global settings.
 * 
 */
define(['/app/linuxCNCInterface.js', '/app/core/helpers/utility.js'], function(linuxcnc, utils ) {

    var settings = {};

    $.cookie.json = true;

	settings.appName =  "Emperor";
    settings.linuxCNCServer = linuxcnc;

    // *** PERSISTENT SETTINGS ***
    // Settings that are stored on the remote server
    settings.persist = {}
    var _serverUpdating = false;
    settings.addPersistentSetting = function( name, value, initialValue )
    {
        if (_.isUndefined(initialValue))
            initialValue = false;

        if (_.has(settings.persist,name))
        {
            settings.persist[name](value);
        }
        else
        {
            settings.persist[name] = ko.observable(value).extend({withScratch: true});
            if (!initialValue)
                settings.linuxCNCServer.setClientConfig(name,value);
            settings.persist[name].subscribe( function(newvalue){ if(!_serverUpdating) settings.linuxCNCServer.setClientConfig(name,newvalue); } );
        }
    }
    settings.updatePersistentSettings = function(clientConfig) {
        _serverUpdating = true;
        _.pairs(clientConfig).forEach( function(keyval) {
            settings.addPersistentSetting(keyval[0],keyval[1]);
        } );
        _serverUpdating = false;
    }

    // set persistent defaults
    settings.addPersistentSetting("ProbeRadius",  0.1,  true );
    settings.addPersistentSetting("GaugeHeight",    1,  true );
    settings.addPersistentSetting("MDIHistory",    [],  true );
    settings.addPersistentSetting("DisplayUnitsPerMM",   settings.linuxCNCServer.DisplayUnitsPerMM(),  true );
    settings.addPersistentSetting("ChangeDisplayUnitsToProgramUnits",  settings.linuxCNCServer.ChangeDisplayUnitsToProgramUnits(),  true );
    settings.addPersistentSetting("BPShowGrid",  true,  true );
    settings.addPersistentSetting("BPBGColor",       {r:159,g:159,b:159},  true );
    settings.addPersistentSetting("BPGridColor",     {r:128,g:128,b:128},  true );
    settings.addPersistentSetting("BPGridMajorColor",{r:51,g:51,b:51},     true );
    settings.addPersistentSetting("BPFeedColor",     {r:255,g:255,b:100},  true );
    settings.addPersistentSetting("BPTraverseColor", {r:0,g:0,b:255},      true );
    settings.addPersistentSetting("BPFeedExecutedColor",    {r:0,g:255,b:0},true );
    settings.addPersistentSetting("BPTraverseExecutedColor",{r:100,g:255,b:255},true );

    settings.addPersistentSetting("JogFeedSlow", 1,true );
    settings.addPersistentSetting("JogFeedFast", 10,true );
    settings.addPersistentSetting("JogStep",  0.001,true );
    settings.addPersistentSetting("JogStep1", 0.001,true );
    settings.addPersistentSetting("JogStep2", 0.01,true );
    settings.addPersistentSetting("JogStep3", 0.1,true );

    // these settings need to be pushed to the linuxCNCServer
    settings.persist.DisplayUnitsPerMM.subscribe(function(newval){ settings.linuxCNCServer.DisplayUnitsPerMM(newval); });
    settings.persist.ChangeDisplayUnitsToProgramUnits.subscribe(function(newval){ settings.linuxCNCServer.ChangeDisplayUnitsToProgramUnits(newval)});
    settings.persist.JogStep.subscribe(function(newval){settings.linuxCNCServer.jog_step(newval) });
    settings.persist.JogFeedSlow.subscribe(function(newval){settings.linuxCNCServer.jog_speed_slow(newval) });
    settings.persist.JogFeedFast.subscribe(function(newval){settings.linuxCNCServer.jog_speed_fast(newval); console.log("Setting Jog Fast Speed to " + newval) });
    settings.linuxCNCServer.jog_speed_slow(settings.persist.JogFeedSlow());
    settings.linuxCNCServer.jog_speed_fast(settings.persist.JogFeedFast());
    settings.linuxCNCServer.jog_step(settings.persist.JogStep());

    // update settings from the server
    settings.updatePersistentSettings(settings.linuxCNCServer.vars.client_config.data());
    settings.linuxCNCServer.vars.client_config.data.subscribe( settings.updatePersistentSettings );

    // *** NETWORK SETTINGS ***
    // these settings are special, because they relate to the network and need to be stored locally
    // ==> we can't get them from the server because they tell us how to contact the server in the first place
    settings.loadNetworkSettings = function()
    {
        var tmp = $.cookie('network_settings');
        if (_.isArray(tmp)) {
            settings.linuxCNCServer.server_address(tmp[0]);
            settings.linuxCNCServer.server_port(tmp[1]);
            settings.linuxCNCServer.server_username(tmp[2]);
            settings.linuxCNCServer.server_password(tmp[3]);
        }
    }
    settings.loadNetworkSettings();

    settings.saveNetworkSettings = function()
    {
        $.cookie('network_settings',
            [settings.linuxCNCServer.server_address(),settings.linuxCNCServer.server_port(),settings.linuxCNCServer.server_username(),settings.linuxCNCServer.server_password()],
            { expires: 9999, path: '/' });
        settings.linuxCNCServer.reopen();
    }
    settings.saveNetworkSettings();


    // *** MDI HISTORY ***
    // utility for adding to MDI history
    settings.addToMDIHistory = function( newVal )
    {
        if (!_.isString(newVal))
            return;

        newVal = newVal.toUpperCase();

        var old =  settings.persist.MDIHistory();
        if (!_.isArray(old)) old = [];
        old = _.without(old,newVal);
        old.push(newVal);

        settings.persist.MDIHistory(_.uniq(_.last(old,15)));
        settings.persist.MDIHistory.valueHasMutated();
    }


    return settings;
});

