/**
 * User: Peter Jensen
 * Date: 4/29/13
 * Time: 10:52 PM
 */

define(function (require) {

    console.debug("LINUXCNC SERVER STARTUP");

    //dependencies
    var Boiler = require("Boiler"); // BoilerplateJS namespace used to access core classes, see above for the definition

    var lcncsvr = {};

    // constants
    lcncsvr.STATE_ESTOP=1;
    lcncsvr.STATE_ESTOP_RESET=2;
    lcncsvr.STATE_OFF=3;
    lcncsvr.STATE_ON=4;

    lcncsvr.TASK_MODE_AUTO=2;
    lcncsvr.TASK_MODE_MANUAL=1;
    lcncsvr.TASK_MODE_MDI=3;

    lcncsvr.TASK_INTERP_IDLE=1;
    lcncsvr.TASK_INTERP_READING=2;
    lcncsvr.TASK_INTERP_PAUSED=3;
    lcncsvr.TASK_INTERP_WAITING=4;

    lcncsvr.UNITS_INCHES=1;
    lcncsvr.UNITS_MM=2;
    lcncsvr.UNITS_CM=3;

    lcncsvr.axisNames = ["X", "Y", "Z", "A", "B", "C", "U", "V", "W"];

    // Network settings
    lcncsvr.server_address = ko.observable("192.168.1.215");
    lcncsvr.server_port = ko.observable("8000");
    lcncsvr.server_username = ko.observable("default");
    lcncsvr.server_password = ko.observable("default");
    lcncsvr.server_open = ko.observable(false);
    lcncsvr.server_logged_in = ko.observable(false);
    lcncsvr.serverReconnectCheckInterval = 2000;
    lcncsvr.serverReconnectHBTimeoutInterval = 5000;

    // other settings
    lcncsvr.displayUnits = ko.observable(lcncsvr.UNITS_INCHES);


    // state variables
    lcncsvr.vars = {};
    lcncsvr.vars.actual_position = { data: ko.observableArray([0, 0, 0, 0, 0, 0, 0, 0, 0]), watched: true };
    lcncsvr.vars.g5x_offset = { data: ko.observableArray([0, 0, 0, 0, 0, 0, 0, 0, 0]), watched: true };
    lcncsvr.vars.g92_offset = { data: ko.observableArray([0, 0, 0, 0, 0, 0, 0, 0, 0]), watched: true };
    lcncsvr.vars.tool_offset = { data: ko.observableArray([0, 0, 0, 0, 0, 0, 0, 0, 0]), watched: true };
    lcncsvr.vars.estop = { data: ko.observable(0), watched: true };
    lcncsvr.vars.task_state = { data: ko.observable(0), watched: true };
    lcncsvr.vars.task_mode = { data: ko.observable(0), watched: true };
    lcncsvr.vars.interp_state = { data: ko.observable(0), watched: true };
    lcncsvr.vars.queue_full = { data: ko.observable(false), watched: true };
    lcncsvr.vars.paused = { data: ko.observable(false), watched: true };
    lcncsvr.vars.mist =  { data: ko.observable(false), watched: true };
    lcncsvr.vars.flood =  { data: ko.observable(false), watched: true };
    lcncsvr.vars.spindle_brake = { data: ko.observable(false), watched: true };
    lcncsvr.vars.tool_in_spindle = { data: ko.observable(0), watched: true };
    lcncsvr.vars.g5x_index = { data: ko.observable(0), watched: true };
    lcncsvr.vars.program_units = { data: ko.observable(0), watched: true };
    lcncsvr.vars.homed = { data: ko.observableArray([0, 0, 0, 0, 0, 0, 0, 0, 0]), watched: true };
    lcncsvr.vars.gcodes = { data: ko.observableArray([]), watched: true };
    lcncsvr.vars.file = { data: ko.observable(""), watched: true };

    lcncsvr.vars.axis_mask = { data: ko.observable(0), watched: true };
    lcncsvr.vars.backplot = { data: ko.observable(""), watched: false };

    // calculated variables
    lcncsvr.estop_inverse = ko.computed(function () {
        return !lcncsvr.vars.estop.data();
    });
    lcncsvr.power_is_on = ko.computed(function () {
        return lcncsvr.vars.task_state.data() === lcncsvr.STATE_ON;
    });

    /**
     * Synthetic Variables
     */
     lcncsvr.RmtRunning = ko.computed(function(){
        return lcncsvr.vars.task_mode.data() === lcncsvr.TASK_MODE_AUTO && lcncsvr.vars.interp_state.data() !== lcncsvr.TASK_INTERP_IDLE;
     });
    lcncsvr.RmtManualInputAllowed = ko.computed( function(){
//        console.log("" + lcncsvr.STATE_ON +","+lcncsvr.vars.task_state.data());
//        console.log("" + lcncsvr.TASK_INTERP_IDLE +","+lcncsvr.vars.interp_state.data());
//        console.log("" + lcncsvr.TASK_MODE_MDI +","+lcncsvr.vars.task_mode.data());
//        console.log("" + 0 +","+lcncsvr.vars.queue_full.data());
        //console.log("Return:" + lcncsvr.vars.task_state.data() === lcncsvr.STATE_ON && ( lcncsvr.vars.interp_state.data() === lcncsvr.TASK_INTERP_IDLE || ( lcncsvr.vars.task_mode.data() === lcncsvr.TASK_MODE_MDI && !lcncsvr.vars.queue_full.data() ) ));
        return lcncsvr.vars.task_state.data() === lcncsvr.STATE_ON && ( lcncsvr.vars.interp_state.data() === lcncsvr.TASK_INTERP_IDLE || ( lcncsvr.vars.task_mode.data() === lcncsvr.TASK_MODE_MDI && !lcncsvr.vars.queue_full.data() ) );
    });
    lcncsvr.RmtDRO = ko.computed( function(){
        var ret = [0,0,0,0,0,0,0,0,0];
        var idx;
        for (idx = 0; idx < 9; idx++)
            ret[idx] = lcncsvr.vars.actual_position.data()[idx] - lcncsvr.vars.g5x_offset.data()[idx] - lcncsvr.vars.g92_offset.data()[idx] - lcncsvr.vars.tool_offset.data()[idx];
        return ret;
    });


    /**
     * Server Functions
     */

    lcncsvr.sendCommand = function( id, name, ordinals )
    {
        try {
            if ( lcncsvr.server_logged_in() )
            {
                var obj = { id:id, command:"put", name:name };
                if (!$.isEmptyObject(ordinals))
                    $.each( ordinals, function(idx,val){ obj[idx.toString()] = val; } );
                lcncsvr.socket.send( JSON.stringify( obj ) );
            }
        } catch (ex) { return false; }
        return true;
    }

    lcncsvr.setRmtAnyMode = function( modes )
    {
        if ($.isEmptyObject(modes) || !$.isArray(modes) )
            return false;
        try {
            if ($.inArray( lcncsvr.vars.task_mode.data(), modes ) )
                return true;
            if (lcncsvr.RmtRunning())
                return false;
            return lcncsvr.setRmtMode(modes[0]);
        } catch (ex) {
            return false;
        }
    }

    lcncsvr.setRmtMode = function( mode )
    {
        if ( lcncsvr.vars.task_mode.data() == mode )
            return true;
        if (lcncsvr.RmtRunning())
            return false;
        switch ( mode )
        {
            case lcncsvr.TASK_MODE_AUTO:
                lcncsvr.sendCommand("mode","mode",["MODE_AUTO"]);
                break;
            case lcncsvr.TASK_MODE_MANUAL:
                lcncsvr.sendCommand("mode","mode",["MODE_MANUAL"]);
                break;
            case lcncsvr.TASK_MODE_MDI:
                lcncsvr.sendCommand("mode","mode",["MODE_MDI"]);
                break;
        }
        lcncsvr.sendCommand("wait_complete","wait_complete",["1"]);
    }

    lcncsvr.abort = function()
    {
        lcncsvr.sendCommand("abort","abort");
        return;
    }

    lcncsvr.estop = function( onoff )
    {
        if (onoff)
            lcncsvr.sendCommand("set_estop","state",["STATE_ESTOP"]);
        else
            if (lcncsvr.vars.task_state.data() === lcncsvr.STATE_ESTOP)
                lcncsvr.sendCommand("set_estop","state",["STATE_ESTOP_RESET"]);
    }

    lcncsvr.toggleEstop = function( )
    {
        if ( lcncsvr.vars.task_state.data() === lcncsvr.STATE_ESTOP )
            lcncsvr.estop( false );
        else
            lcncsvr.estop( true );
    }

    lcncsvr.machinePower = function( onoff )
    {
        if (lcncsvr.vars.task_state.data() === lcncsvr.STATE_ESTOP)
            return;

        if (onoff)
            lcncsvr.sendCommand("power","state",["STATE_ON"]);
        else
            lcncsvr.sendCommand("power","state",["STATE_OFF"]);
    }

    lcncsvr.togglePower = function( )
    {
        if (lcncsvr.vars.task_state.data() === lcncsvr.STATE_ESTOP)
            return;

        if ( lcncsvr.vars.task_state.data() === lcncsvr.STATE_OFF || lcncsvr.vars.task_state.data() === lcncsvr.STATE_ESTOP_RESET )
            lcncsvr.machinePower( true );
        else
            lcncsvr.machinePower( false );
    }

    lcncsvr.runFrom = function( lineNum )
    {
        if ( !lcncsvr.setRmtMode(lcncsvr.TASK_MODE_AUTO))
            return;
        
        lcncsvr.sendCommand("auto","auto",["AUTO_RUN",lineNum.toString()])
    }

    lcncsvr.runStep = function( )
    {
        if ( !lcncsvr.setRmtMode(lcncsvr.TASK_MODE_AUTO))
            return;
        lcncsvr.sendCommand("auto","auto",["AUTO_STEP"])
        return;
    }

    lcncsvr.pause = function(  )
    {
        if (lcncsvr.vars.task_mode.data() !== lcncsvr.TASK_MODE_AUTO || ( lcncsvr.vars.interp_state.data() !== lcncsvr.TASK_INTERP_READING && lcncsvr.vars.interp_state.data() !== lcncsvr.TASK_INTERP_WAITING ))
            return;
        if ( !lcncsvr.setRmtMode(lcncsvr.TASK_MODE_AUTO))
            return;
        lcncsvr.sendCommand("auto","auto",["AUTO_PAUSE"])
        return;
    }


    lcncsvr.resume = function(  )
    {
        if (!lcncsvr.vars.paused.data())
            return;

        if (lcncsvr.vars.task_mode.data() !== lcncsvr.TASK_MODE_AUTO && lcncsvr.vars.task_mode.data() !== lcncsvr.TASK_MODE_MDI )
            return;

        if ( !lcncsvr.setRmtAnyMode([lcncsvr.TASK_MODE_AUTO,lcncsvr.TASK_MODE_MDI]))
            return;
        lcncsvr.sendCommand("auto","auto",["AUTO_RESUME"])
        return;
    }


    lcncsvr.togglePause = function()
    {
        if (lcncsvr.vars.paused.data())
            return lcncsvr.resume();
        else
            return lcncsvr.pause();
    }

    lcncsvr.stop = function()
    {
        lcncsvr.abort();
        lcncsvr.sendCommand("wait_complete","wait_complete",["1"]);
        return;
    }

    lcncsvr.mdi = function( cmd )
    {
        if ($.isEmptyObject(cmd))
            return;
        if (!lcncsvr.setRmtMode(lcncsvr.TASK_MODE_MDI))
            return;
        if (!lcncsvr.RmtManualInputAllowed())
            return;
        lcncsvr.sendCommand("mdi","mdi",[cmd]);
        return;
    }

    lcncsvr.prepare_for_mdi = function()
    {
        lcncsvr.setRmtMode(lcncsvr.TASK_MODE_MDI);
        return lcncsvr.RmtManualInputAllowed();
    }

    lcncsvr.setFeedrate = function( rate )
    {
        if (!$.isNumeric(rate))
            return;
        if (rate < 0)
            rate = 0;
        lcncsvr.sendCommand("set_feed_override","set_feed_override", ["1"]);
        lcncsvr.sendCommand("set_feedrate","feedrate", [rate.toString()] );
        return;
    }

    lcncsvr.setSpindleOverride = function( rate )
    {
        if (!$.isNumeric(rate))
            return;
        if (rate < 0)
            rate = 0;

        lcncsvr.sendCommand("set_spindle_override","set_spindle_override", ["1"]);
        lcncsvr.sendCommand("setspindleoverride","spindleoverride", [rate.toString()] );
        return;
    }

    lcncsvr.setEnableSpindleOverride = function( onoff )
    {
        if (onOff)
            lcncsvr.sendCommand("set_spindle_override","set_spindle_override",["1"]);
        else
            lcncsvr.sendCommand("set_spindle_override","set_spindle_override",["0"]);
        return;
    }

    lcncsvr.openFile = function( filename )
    {
        lcncsvr.setRmtMode(TaskMode.MODE_MDI);
        lcncsvr.setRmtMode(TaskMode.MODE_AUTO);
        lcncsvr.sendCommand("program_open","program_open",[filename]);
        return;
    }

    lcncsvr.convertDisplayToProgramUnits = function( value )
    {
        var scale = 1;
        if (lcncsvr.displayUnits() != lcncsvr.vars.program_units.data())
        {
            // convert to inches
            switch (lcncsvr.displayUnits()) {
                case lcncsvr.UNITS_MM:
                    scale = 1/25.4;
                    break;
                case lcncsvr.UNITS_CM:
                    scale = 1/2.54;
                    break;
            }
            // convert from inches
            switch (lcncsvr.vars.program_units.data()) {
                case lcncsvr.UNITS_MM:
                    scale = scale*25.4;
                    break;
                case lcncsvr.UNITS_CM:
                    scale = scale*2.54;
                    break;
            }
        }
        return value * scale;
    }

    lcncsvr.touchoff = function( g5x, axis, offset )
    {
        var cmd = "G10 L20 P" + g5x;
        if (! $.isNumeric(axis))
            cmd = cmd + axis;
        else
            cmd = cmd + lcncsvr.axisNames[axis];
        cmd = cmd + lcncsvr.convertDisplayToProgramUnits(offset).toString();

        lcncsvr.mdi(cmd);
    }

    lcncsvr.touchoffCurrent = function( axis, offset )
    {
        lcncsvr.touchoff( lcncsvr.vars.g5x_index.data(), axis, offset );
    }

    lcncsvr.clearG5xAll = function( g5x )
    {
        var cmd = "G10 L2 P" + g5x;
        var axismask = lcncsvr.vars.axis_mask.data();
        var idx;
        for (idx = 0; idx < 9; idx++)
            if (axismask & (1 << idx))
                cmd = cmd + lcncsvr.axisNames[idx] + "0";
        return lcncsvr.mdi(cmd);
    }

    lcncsvr.touchoffAll = function( g5x )
    {
        var cmd = "G10 L20 P" + g5x;
        var axismask = lcncsvr.vars.axis_mask.data();
        var idx;
        for (idx = 0; idx < 9; idx++)
            if (axismask & (1 << idx))
                cmd = cmd + lcncsvr.axisNames[idx] + "0";
        return lcncsvr.mdi(cmd);
    }

    lcncsvr.isAxisAvailable  = function( axisnum )
    {
        return (lcncsvr.vars.axis_mask.data() & (1<<axisnum)) != 0;
    }

    lcncsvr.isAnyAxisAvailable = function()
    {
        return (lcncsvr.vars.axis_mask.data()) != 0;
    }

    lcncsvr.clearG92 = function()
    {
        return lcncsvr.mdi("G92.1");
    }

    lcncsvr.g92Set = function( axis, offset )
    {
        var cmd = "G92 " + lcncsvr.axisNames[axis] + offset;
        return lcncsvr.mdi(cmd);
    }

    lcncsvr.homeAll = function()
    {
        lcncsvr.setRmtMode(lcncsvr.TASK_MODE_MANUAL);
        lcncsvr.sendCommand("home","home",["-1"]);
    }

    lcncsvr.homeAxis = function( axis )
    {
        lcncsvr.setRmtMode(lcncsvr.TASK_MODE_MANUAL);
        lcncsvr.sendCommand("home","home",[axis.toString()]);
    }

    lcncsvr.home = function( axis )
    {
        lcncsvr.setRmtMode(lcncsvr.TASK_MODE_MANUAL);
        lcncsvr.sendCommand("home","home",[ axis.toString() ]);
    }

    lcncsvr.overrideLimits = function()
    {
        lcncsvr.sendCommand("override_limits","override_limits");
    }

    lcncsvr.toggleMist = function()
    {
        var val;
        if ( lcncsvr.vars.mist.data() )
            val = "MIST_OFF";
        else
            val = "MIST_ON";
        return lcncsvr.sendCommand("mist_toggle","mist",[val]);
    }

    lcncsvr.setMist = function( onoff )
    {
        var val;
        if ( onoff )
            val = "MIST_ON";
        else
            val = "MIST_OFF";
        return lcncsvr.sendCommand("mist_toggle","mist",[val]);
    }

    lcncsvr.toggleFlood = function()
    {
        var val;
        if ( lcncsvr.vars.flood.data() )
            val = "FLOOD_OFF";
        else
            val = "FLOOD_ON";
        return lcncsvr.sendCommand("flood_toggle","flood",[val]);
    }

    lcncsvr.setFlood = function( onoff )
    {
        var val;
        if ( onoff )
            val = "FLOOD_ON";
        else
            val = "FLOOD_OFF";
        return lcncsvr.sendCommand("flood_toggle","flood",[val]);
    }

    lcncsvr.spindleForward = function() {
        return lcncsvr.sendCommand("spindle_forward","spindle",["SPINDLE_FORWARD"]);
    }
    lcncsvr.spindleOff = function() {
        return lcncsvr.sendCommand("spindle_off","spindle",["SPINDLE_OFF"]);
    }
    lcncsvr.spindleReverse = function() {
        return lcncsvr.sendCommand("spindle_reverse","spindle",["SPINDLE_REVERSE"]);
    }


    lcncsvr.toggleSpindleBrake = function()
    {
        var val;
        if ( lcncsvr.vars.spindle_brake.data() )
            val = "BRAKE_RELEASE";
        else
            val = "BRAKE_ENGAGE";
        return lcncsvr.sendCommand("spindle_brake_toggle","brake",[val]);
    }

    lcncsvr.setSpindleBrake = function( onoff )
    {
        var val;
        if ( onoff )
            val = "BRAKE_ENGAGE";
        else
            val = "BRAKE_RELEASE";
        return lcncsvr.sendCommand("spindle_brake_set","brake",[val]);
    }

    lcncsvr.setToolTable = function( zOffset, diameter )
    {
        lcncsvr.mdi( "G10 L10 P" + lcncsvr.vars.tool_in_spindle.data() + "R" + (diameter/2) + " Z" + zOffset );
        lcncsvr.mdi( "G43" );
    }


    lcncsvr.sendBackplotRequest = function () {
        //console.debug("WEBSOCKET: send get request for backplot");
        lcncsvr.socket.send(JSON.stringify({"id": "backplot", "command": "get", "name": "backplot"}));
    }

    lcncsvr.sendAllWatchRequests = function () {
        try {
            $.each(lcncsvr.vars, function (key, val) {
                if (val.watched) {
                    //console.debug("WEBSOCKET: send watch request for " + key);
                    lcncsvr.socket.send(JSON.stringify({"id": key, "command": "watch", "name": key}));
                }
            });
        } catch (ex) {
        }
    }


    // **** Function to auto-reopen the connection if there hasn't been activity (heartbeat)
    lcncsvr.hbTimeout = new Date() / 1000.0 + lcncsvr.serverReconnectHBTimeoutInterval / 1000.0;
    lcncsvr.checkHB = function()
    {
        try {
            if ( (new Date()/1000.0) > lcncsvr.hbTimeout )
            {
                lcncsvr.reopen();
            } else {
                lcncsvr.socket.send(JSON.stringify({"id": "HB", "command": "get", "name": "estop"}));
            }
        } catch (ex) {}
    }
    lcncsvr.hbCheckIntervalID = setInterval( lcncsvr.checkHB, lcncsvr.serverReconnectCheckInterval );

    // **** reopen the connection.  will close an existing connection
    lcncsvr.reopen = function()
    {
        lcncsvr.hbTimeout = new Date() / 1000.0 + lcncsvr.serverReconnectHBTimeoutInterval / 1000.0;

        try {
            lcncsvr.socket.close();
        } catch (ex) { }

        try {
            lcncsvr.socket = new WebSocket("ws://" + lcncsvr.server_address() + ":" + lcncsvr.server_port() + "/websocket/");

            lcncsvr.socket.onopen = function () {
                lcncsvr.socket.send(JSON.stringify({"id": "LOGIN", "user": lcncsvr.server_username(), "password": lcncsvr.server_password()}));
                lcncsvr.server_open(true);
                lcncsvr.sendAllWatchRequests();
            }

            lcncsvr.socket.onmessage = function (msg) {
                try {
                    var data = JSON.parse(msg.data);

                    if (data.code != "?OK") {
                        console.debug("WEBSOCKET: ERROR code returned " + msg.data);
                        return;
                    }

                    lcncsvr.hbTimeout = new Date() / 1000.0 + lcncsvr.serverReconnectHBTimeoutInterval / 1000.0;

                    if (data.id == "LOGIN")
                    {
                        lcncsvr.server_logged_in(true);
                        return;
                    }

                    if (lcncsvr.vars.hasOwnProperty(data.id)) {
                        if (data.id == 'backplot')
                            lcncsvr.vars[data.id].data(JSON.parse(data.data));
                        else
                            lcncsvr.vars[data.id].data(data.data);
                    }
                } catch (ex) {
                }
            }

            lcncsvr.socket.onclose = function () {
                lcncsvr.server_open(false);
                lcncsvr.server_logged_in(false);
            }
        } catch (ex) {}
    }

    lcncsvr.reopen();

    return lcncsvr;

});
