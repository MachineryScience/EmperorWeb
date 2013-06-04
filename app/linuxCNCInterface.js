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
    lcncsvr.server_address = ko.observable("192.168.1.214");
    lcncsvr.server_port = ko.observable("8000");
    lcncsvr.server_username = ko.observable("default");
    lcncsvr.server_password = ko.observable("default");


    lcncsvr.server_open = ko.observable(false);
    lcncsvr.server_logged_in = ko.observable(false);
    lcncsvr.serverReconnectCheckInterval = 2000;
    lcncsvr.serverReconnectHBTimeoutInterval = 5000;

    lcncsvr.jog_step = ko.observable(0.001);
    lcncsvr.jog_speed_fast = ko.observable(1);
    lcncsvr.jog_speed_slow = ko.observable(1);

    lcncsvr.vars = {};
    lcncsvr.vars.client_config = { data: ko.observable({invalid:true}), watched: true, convert_to_json: true };
    lcncsvr.vars.linear_units = { data: ko.observable(1), watched: true };
    lcncsvr.vars.program_units = { data: ko.observable(0), watched: true };

    lcncsvr.isClientConfigValid = function()
    {
        try {
            return (lcncsvr.vars.client_config.data().invalid) != true;
        } catch(ex) { return false; }
    }

    // Client settings
    lcncsvr.DisplayUnitsPerMM = ko.observable(1);
    lcncsvr.DisplayPrecision = ko.computed(function(){ if (lcncsvr.DisplayUnitsPerMM() >= 1) return 3; return 4; });
    lcncsvr.ChangeDisplayUnitsToProgramUnits = ko.observable(false);

    lcncsvr.vars.program_units.data.subscribe( function(newvalue) {
        if (lcncsvr.ChangeDisplayUnitsToProgramUnits())
        {
            if (newvalue == 1)
                lcncsvr.DisplayUnitsPerMM(1/25.4);
            else if (newvalue == 2)
                lcncsvr.DisplayUnitsPerMM(1);
            else if (newvalue == 3)
                lcncsvr.DisplayUnitsPerMM(0.1);
        }
    });

    lcncsvr.vars.client_config.data.subscribe( function(newval){
        if ("ChangeDisplayUnitsToProgramUnits" in lcncsvr.vars.client_config.data())
        {
            lcncsvr.ChangeDisplayUnitsToProgramUnits(lcncsvr.vars.client_config.data().ChangeDisplayUnitsToProgramUnits);
            lcncsvr.vars.program_units.data.valueHasMutated();
        } else
        if ("DisplayUnitsPerMM" in lcncsvr.vars.client_config.data())
            lcncsvr.DisplayUnitsPerMM(lcncsvr.vars.client_config.data().DisplayUnitsPerMM);
    });

    // UNIT CONVERSION

    lcncsvr.MachineUnitsToDisplayUnitsLinearScaleFactor = ko.computed(function()
    {
        var MachineUnitPerMM = lcncsvr.vars.linear_units.data();
        return lcncsvr.DisplayUnitsPerMM() / MachineUnitPerMM;
    });

    lcncsvr.MachineUnitsToDisplayUnitsLinear = function(val)
    {
        try {
            return val * lcncsvr.MachineUnitsToDisplayUnitsLinearScaleFactor();
        } catch(ex) {}
    }

    lcncsvr.MachineUnitsToDisplayUnitsLinearPos = function(v)
    {
        try {
            var val = v.slice(0);
            var sf = lcncsvr.MachineUnitsToDisplayUnitsLinearScaleFactor();

            for (i = 0; i < 3; i++)
                val[i] = val[i] * sf;
            for (i = 6; i < 9; i++)
                val[i] = val[i] * sf;
            return val;
        } catch(ex) {}
    }

    lcncsvr.DisplayUnitsToMachineUnits = function(val)
    {
        try {
            var MachineUnitPerMM = lcncsvr.vars.linear_units.data();
            return val * MachineUnitPerMM / lcncsvr.DisplayUnitsPerMM();
        } catch(ex) {}
    }

    lcncsvr.DisplayUnitsToMachineUnitsPos = function(v)
    {
        try{
            var MachineUnitPerMM = lcncsvr.vars.linear_units.data();
            var DisplayUnitsPerMM = lcncsvr.DisplayUnitsPerMM()
            var val = v.slice(0);

            for (i = 0; i < 3; i++)
                val[i] = val[i] * MachineUnitPerMM / DisplayUnitsPerMM;
            for (i = 6; i < 9; i++)
                val[i] = val[i] * MachineUnitPerMM / DisplayUnitsPerMM;
            return val;
        } catch(ex) {}
    }

    lcncsvr.ProgramUnitsPerMM = ko.computed(function()
    {
        var punits = lcncsvr.vars.program_units.data();
        var vProgramUnitsPerMM = 1;
        if (punits == lcncsvr.UNITS_INCHES )
            vProgramUnitsPerMM = 1/25.4;
        else
        if (punits == lcncsvr.UNITS_CM )
            vProgramUnitsPerMM = 1/10;
        return vProgramUnitsPerMM;
    });

    lcncsvr.DisplayUnitsToProgramUnits = function(val)
    {
        try {
            return val * lcncsvr.ProgramUnitsPerMM() / lcncsvr.DisplayUnitsPerMM();
        } catch(ex) {}
    }

    lcncsvr.DisplayUnitsToProgramUnitsPos = function(v)
    {
        try{
            var val = v.slice(0);
            var pupmm = lcncsvr.ProgramUnitsPerMM();
            var dupmm = lcncsvr.DisplayUnitsPerMM();

            for (i = 0; i < 3; i++)
                val[i] = val[i] * pupmm / dupmm;
            for (i = 6; i < 9; i++)
                val[i] = val[i] * pupmm / dupmm;
            return val;
        } catch(ex) {}
    }


    // ***************
    // ***************
    // state variables
    // ***************
    // ***************


    lcncsvr.vars.actual_position = { data: ko.observableArray([0, 0, 0, 0, 0, 0, 0, 0, 0]), watched: true };
    lcncsvr.vars.actual_positionDisplay = { data: ko.computed(function(){ return lcncsvr.MachineUnitsToDisplayUnitsLinearPos(lcncsvr.vars.actual_position.data()) }), watched: false, local:true };

    lcncsvr.vars.g5x_offset = { data: ko.observableArray([0, 0, 0, 0, 0, 0, 0, 0, 0]), watched: true };
    lcncsvr.vars.g5x_offsetDisplay = { data: ko.computed(function(){ return lcncsvr.MachineUnitsToDisplayUnitsLinearPos(lcncsvr.vars.g5x_offset.data()) }), watched: false, local:true };

    lcncsvr.vars.g5x_index = { data: ko.observable(1), watched: true };

    lcncsvr.vars.g92_offset = { data: ko.observableArray([0, 0, 0, 0, 0, 0, 0, 0, 0]), watched: true };
    lcncsvr.vars.g92_offsetDisplay = { data: ko.computed(function(){ return lcncsvr.MachineUnitsToDisplayUnitsLinearPos(lcncsvr.vars.g92_offset.data()) }), watched: false, local:true };

    lcncsvr.vars.tool_offset = { data: ko.observableArray([0, 0, 0, 0, 0, 0, 0, 0, 0]), watched: true };
    lcncsvr.vars.tool_offsetDisplay = { data: ko.computed(function(){ return lcncsvr.MachineUnitsToDisplayUnitsLinearPos(lcncsvr.vars.tool_offset.data()) }), watched: false, local:true };

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
    lcncsvr.vars.homed = { data: ko.observableArray([0, 0, 0, 0, 0, 0, 0, 0, 0]), watched: true };
    lcncsvr.vars.gcodes = { data: ko.observableArray([]), watched: true };
    lcncsvr.vars.file = { data: ko.observable(""), watched: true };
    lcncsvr.vars.motion_line = { data: ko.observable(0), watched: true };
    lcncsvr.vars.optional_stop = { data: ko.observable(false), watched: true };
    lcncsvr.vars.error = { data: ko.observable(""), watched: true };
    lcncsvr.vars.spindlerate = { data: ko.observable(1), watched: true };
    lcncsvr.vars.feedrate = { data: ko.observable(1), watched: true };
    lcncsvr.vars.ls = { data: ko.observableArray([]), watched: true };
    lcncsvr.vars.tool_table = {data: ko.observableArray([]), watched: true, indexed:true, max_index:55 };

    lcncsvr.settings = ko.observable({});

    lcncsvr.vars.axis_mask = { data: ko.observable(0), watched: true };
    lcncsvr.vars.backplot_async = { data: ko.observable(""), watched: false, convert_to_json: true, local:true };
    lcncsvr.vars.file.data.subscribe( function(newval){ lcncsvr.socket.send(JSON.stringify({"id": "backplot_async", "command": "get", "name": "backplot_async"})); });
    lcncsvr.vars.file_content = { data: ko.observable(""), watched: false, local:true };
    lcncsvr.vars.file.data.subscribe( function(newval){ lcncsvr.socket.send(JSON.stringify({"id": "file_content", "command": "get", "name": "file_content"})); });

    lcncsvr.server_logged_in.subscribe( function(newval) {
        if (!newval)
        {
            console.log("SERVER_LOGGED_IN: " + newval);
            lcncsvr.vars.file.data("");
            lcncsvr.vars.backplot_async.data("");
            lcncsvr.vars.file_content.data("");
        }
    });

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
        return lcncsvr.vars.task_state.data() === lcncsvr.STATE_ON && ( lcncsvr.vars.interp_state.data() === lcncsvr.TASK_INTERP_IDLE || ( lcncsvr.vars.task_mode.data() === lcncsvr.TASK_MODE_MDI && !lcncsvr.vars.queue_full.data() ) );
    });

    lcncsvr.RmtDROProgram = ko.observable([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    lcncsvr.RmtDRO = ko.observable([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    lcncsvr.RmtDROReal = ko.computed({
        read: function () {
            var ret = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            var idx;
            var act = lcncsvr.vars.actual_position.data();
            var g5x = lcncsvr.vars.g5x_offset.data();
            var g92 = lcncsvr.vars.g92_offset.data();
            var tlo = lcncsvr.vars.tool_offset.data();

            for (idx = 0; idx < 9; idx++)
                ret[idx] = act[idx] - g5x[idx] - g92[idx] - tlo[idx];
            return lcncsvr.MachineUnitsToDisplayUnitsLinearPos(ret);
        }
    });
    lcncsvr.RmtDROReal.subscribe(function(newval){
        lcncsvr.RmtDRO(newval);
        lcncsvr.RmtDROProgram( lcncsvr.DisplayUnitsToProgramUnitsPos(newval) );
    });

    lcncsvr.AxesNumbers = ko.observable([]);
    lcncsvr.AxesNumbersReal = ko.computed(function(){

        var axismask = lcncsvr.vars.axis_mask.data();
        var idx;
        var ret = [];
        for (idx = 0; idx < 9; idx++)
            if (axismask & (1 << idx))
                ret.push(idx);;
        return ret;
    });
    lcncsvr.AxesNumbersReal.subscribe(function(newval){lcncsvr.AxesNumbers(newval);});


    lcncsvr.RmtG5xString = ko.computed( function (){
        if (lcncsvr.vars.g5x_index.data() <= 6)
            return "G5" + (lcncsvr.vars.g5x_index.data() + 3);
        else
            return "G59." + (lcncsvr.vars.g5x_index.data() - 6);
     });

    lcncsvr.RmtPaused = ko.computed( function() {
       return lcncsvr.vars.interp_state.data() == lcncsvr.TASK_INTERP_PAUSED;
    });

    lcncsvr.filename_short = ko.computed( function() {
        var str = lcncsvr.vars.file.data();
        if (str.length > 35)
            return "..." + str.substr( str.length - 32 );
        return str;
    });

    lcncsvr.filename_nopath = ko.computed( function() {
        var str = lcncsvr.vars.file.data();
        str = str.split("/");
        str = $(str).last()[0];
        str = str || "";
        return str;
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

    lcncsvr._pendingCommands = [];
    lcncsvr.sendCommandWhenReady = function( id, name, ordinals )
    {
        try {
            if (lcncsvr.server_logged_in() )
                lcncsvr.sendCommand(id,name,ordinals);
            else
                lcncsvr._pendingCommands.push([id,name,ordinals]);
        } catch (e) {}
    }
    lcncsvr.server_logged_in.subscribe(function(isLoggedIn){
        if (isLoggedIn)
        {
            lcncsvr._pendingCommands.forEach(function(cmd){
                lcncsvr.sendCommand(cmd[0],cmd[1],cmd[2]);
            });
            lcncsvr._pendingCommands = [];
        }
    });

    lcncsvr.setRmtAnyMode = function( modes )
    {
        if ($.isEmptyObject(modes) || !$.isArray(modes) )
            return false;
        try {
            if ($.inArray( lcncsvr.vars.task_mode.data(), modes ) >= 0 )
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
        return true;
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

    lcncsvr.toggleOptionalStop = function( )
    {
        lcncsvr.setOptionalStop(!lcncsvr.vars.optional_stop.data());
    }

    lcncsvr.setOptionalStop = function( onoff )
    {
        lcncsvr.sendCommand("set_optional_stop","set_optional_stop",[onoff]);
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


    lcncsvr.resume = function()
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

    lcncsvr.incrementFeedrate = function( delta )
    {
        if (!$.isNumeric(delta))
            return;

        lcncsvr.sendCommand("set_feed_override","set_feed_override", ["1"]);
        lcncsvr.sendCommand("set_feedrate","feedrate", [lcncsvr.vars.feedrate.data() + delta] );
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

    lcncsvr.incrementSpindleOverride = function( delta )
    {
        if (!$.isNumeric(delta))
            return;

        lcncsvr.sendCommand("set_spindle_override","set_spindle_override", ["1"]);
        lcncsvr.sendCommand("setspindleoverride","spindleoverride", [lcncsvr.vars.spindlerate.data() + delta] );
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
        lcncsvr.setRmtMode(lcncsvr.TASK_MODE_MDI);
        lcncsvr.setRmtMode(lcncsvr.TASK_MODE_AUTO);
        lcncsvr.sendCommand("program_open","program_open",[filename]);
        return;
    }


    lcncsvr.touchoff = function( g5x, axis, offset )
    {
        var cmd = "G10 L20 P" + g5x;
        if (! $.isNumeric(axis))
            cmd = cmd + axis;
        else
            cmd = cmd + lcncsvr.axisNames[axis];

        if (_.isNumber(offset))
            offset = offset.toFixed(6);

        cmd = cmd + (offset);

        lcncsvr.mdi(cmd);
    }

    lcncsvr.touchoffDisplay = function( g5x, axis, offset )
    {
        if (axis < 3 || axis > 5 )
            offset = lcncsvr.DisplayUnitsToProgramUnits(offset);
        lcncsvr.touchoff( g5x, axis, offset );
    }

    lcncsvr.touchoffCurrent = function( axis, offset )
    {
        lcncsvr.touchoff( lcncsvr.vars.g5x_index.data(), axis, offset );
    }

    lcncsvr.touchoffCurrentDisplay = function( axis, offset )
    {
        if (axis < 3 || axis > 5 )
            offset = lcncsvr.DisplayUnitsToProgramUnits(offset);
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

    lcncsvr.clearG5xAllCurrent = function( )
    {
        lcncsvr.clearG5xAll(0);
    }

    lcncsvr.setG5x = function( index )
    {
        if (index < 0 || index >= 9)
            return;

        if (index <= 6)
            lcncsvr.mdi("G5" + (index + 3));
        else
            lcncsvr.mdi("G59." + (index - 6));
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
    };

    lcncsvr.clearG92 = function()
    {
        return lcncsvr.mdi("G92.1");
    };

    lcncsvr.g92Set = function( axis, offset )
    {
        if (_.isNumber(offset))
            offset = offset.toFixed(6);

        var cmd = "G92 " + lcncsvr.axisNames[axis] + offset;
        return lcncsvr.mdi(cmd);
    };

    lcncsvr.g92SetDisplay = function( axis, offset )
    {
        if (axis < 3 || axis > 5)
            offset = lcncsvr.DisplayUnitsToProgramUnits(offset);

        if (_.isNumber(offset))
            offset = offset.toFixed(6);

        var cmd = "G92 " + lcncsvr.axisNames[axis] + offset;
        return lcncsvr.mdi(cmd);
    };

    lcncsvr.setG92Enable = function( onoff )
    {
        if (onoff)
            lcncsvr.mdi("G92.3");
        else
            lcncsvr.mdi("G92.2");
    };

    lcncsvr.jogIncr = function( axisNumber, dist )
    {
        try {
            dist = dist.toFixed(5);
        } catch(ex){}
        try {
            lcncsvr.setRmtMode(lcncsvr.TASK_MODE_MANUAL);
            lcncsvr.sendCommand( "JOG", "jog", ["JOG_INCREMENT", axisNumber, lcncsvr.jog_speed_fast(), dist ])
        } catch(ex){}
    };

    lcncsvr.jogCont = function( axisNumber, speed )
    {
        try {
            speed = speed / 60;
            speed = speed.toFixed(3);
        } catch(ex){}

        try {
            lcncsvr.setRmtMode(lcncsvr.TASK_MODE_MANUAL);
            lcncsvr.sendCommand( "JOG", "jog", ["JOG_CONTINUOUS", axisNumber, speed ])
        } catch(ex){}
    };

    lcncsvr.jogStop = function( axisNumber )
    {
        lcncsvr.setRmtMode(lcncsvr.TASK_MODE_MANUAL);
        lcncsvr.sendCommand( "JOG", "jog", ["JOG_STOP", axisNumber])
    };

    lcncsvr.homeAll = function()
    {
        lcncsvr.setRmtMode(lcncsvr.TASK_MODE_MANUAL);
        lcncsvr.sendCommand("home","home",["-1"]);
    };

    lcncsvr.homeAxis = function( axis )
    {
        lcncsvr.setRmtMode(lcncsvr.TASK_MODE_MANUAL);
        lcncsvr.sendCommand("home","home",[axis.toString()]);
    };

    lcncsvr.home = function( axis )
    {
        lcncsvr.setRmtMode(lcncsvr.TASK_MODE_MANUAL);
        lcncsvr.sendCommand("home","home",[ axis.toString() ]);
    };

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

    lcncsvr.setToolTableFull = function( toolnum, zofs, xofs, diam, front, back, orient )
    {
        try {
            lcncsvr.mdi("G10 L1 P" + toolnum + " Z" + zofs + " X" + xofs + " R" + (parseFloat(diam)/2).toFixed(5) + " I" + front + " J" + back + " Q" + orient );
        } catch (ex) {}
    }

    lcncsvr.setToolTableZ = function( zOffset )
    {
        if (_.isNumber(zOffset))
            zOffset = zOffset.toFixed(6);

        lcncsvr.mdi( "G10 L10 P" + lcncsvr.vars.tool_in_spindle.data() + " Z" + zOffset );
        lcncsvr.mdi( "G43" );
    }

    lcncsvr.setToolTable = function( zOffset, diameter )
    {
        lcncsvr.mdi( "G10 L10 P" + lcncsvr.vars.tool_in_spindle.data() + "R" + (diameter/2) + " Z" + zOffset );
        lcncsvr.mdi( "G43" );
    }

    lcncsvr.setToolNumber = function( toolNum )
    {
        if (!_.isNaN( parseInt( toolNum)))
            lcncsvr.mdi( "M6T" + parseInt(toolNum) );
    }

    lcncsvr.clearLastError = function()
    {
        lcncsvr.sendCommand("clear_error","clear_error",[]);
    }

    lcncsvr.setClientConfig = function( key, value )
    {
        lcncsvr.sendCommandWhenReady("cc","save_client_config",[key,value]);
    }

    lcncsvr.getClientConfig = function()
    {
        lcncsvr.socket.send(JSON.stringify({"id": "client_config", "command": "get", "name": "client_config"}));
    }

    lcncsvr.sendFileContentRequestOrNotify = function() {
        if (typeof(lcncsvr.vars.file_content.data()) == "string")
            lcncsvr.socket.send(JSON.stringify({"id": "file_content", "command": "get", "name": "file_content"}));
        else
            lcncsvr.vars.file_content.data.valueHasMutated();
    }

    lcncsvr.sendBackplotRequestOrNotify = function () {
        var x;
        if (typeof(lcncsvr.vars.backplot_async.data()) == "string")
            x = 1;
        else
            lcncsvr.vars.backplot_async.data.valueHasMutated();
    }

    lcncsvr.uploadGCode = function(filename, data) {
        lcncsvr.setRmtMode(lcncsvr.TASK_MODE_MDI);
        lcncsvr.setRmtMode(lcncsvr.TASK_MODE_AUTO);
        lcncsvr.sendCommand("program_upload","program_upload",[filename, data]);
    }

    lcncsvr.sendAllWatchRequests = function () {
        try {
            var id;
            var delayval = 0;
            $.each(lcncsvr.vars, function (key, val) {
                if (val.watched) {
                    //console.debug("WEBSOCKET: send watch request for " + key);
                    if (key == "actual_position")
                        id = "a";
                    else
                        id = key;

                    if (val.indexed)
                    {
                        var idx;
                        for (idx = 0; idx <= val.max_index; idx++)
                        {
                            id = key + ":" + idx;
                            // delay each request by an increasing amount, just to make sure these don't all spam the server at once
                            (function(k,i,d,index){
                                _.delay( function(key,id, index){
                                    lcncsvr.socket.send(JSON.stringify({"id": id, "command": "watch", "name": key, "index":index }));
                                }, d, k, i, index );
                            })(key,id,delayval,idx);
                        }
                    } else
                    {
                        // delay each request by an increasing amount, just to make sure these don't all spam the server at once
                        (function(k,i,d){
                            _.delay( function(key,id){
                                lcncsvr.socket.send(JSON.stringify({"id": id, "command": "watch", "name": key}));
                            }, d, k, i  );
                        })(key,id,delayval);
                    }
                    delayval = delayval + 5;

                } else {
                    try {
                        if (!val.local)
                        {
                            id = key;

                            // delay each request by an increasing amount, just to make sure these don't all spam the server at once
                            (function(k,i,d){
                                _.delay( function(key,id){
                                    lcncsvr.socket.send(JSON.stringify({"id": id, "command": "get", "name": key}));
                                }, d, k, i  );
                            })(key,id,delayval);
                            delayval = delayval + 5;
                }
                    } catch(ex) {}
                }
            });
        } catch (ex) {
        }
    }


    // **** Function to auto-reopen the connection if there hasn't been activity (heartbeat)
    //      The _.debounce causes this to not trigger unless it hasn't been called since
    //      lcncsvr.serverReconnectCheckInterval milliseconds
    lcncsvr.hbTimeout = _.debounce( function(){
        lcncsvr.reopen();
    }, lcncsvr.serverReconnectHBTimeoutInterval);
    lcncsvr.checkHB = function() {
        try {
            lcncsvr.socket.send(JSON.stringify({"id":"HB", command:"get", "name":"estop"}))
        } catch(ex) {}
    }
    lcncsvr.hbCheckIntervalID = setInterval( lcncsvr.checkHB, lcncsvr.serverReconnectCheckInterval );

    // throttle the actual position updates
    lcncsvr.updateActualPosition = _.throttle( function(newVal){ lcncsvr.vars.actual_position.data(newVal); } , 125)

    // **** reopen the connection.  will close an existing connection
    lcncsvr.reopen = function()
    {
        try {
            lcncsvr.socket.close();
        } catch (ex) { }

        lcncsvr.hbTimeout();

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

//                    console.debug(data);

                    if (data.code != "?OK") {
                        console.debug("WEBSOCKET: ERROR code returned " + msg.data);
                        return;
                    }

                    if (data.id == "a")
                    {
                        lcncsvr.updateActualPosition(data.data);
                        return;
                    }

                    if (data.id == "LOGIN")
                        lcncsvr.server_logged_in(true);

                    if (lcncsvr.server_logged_in())
                        lcncsvr.hbTimeout();

                    var curID = data.id.split(":");

                    if (lcncsvr.vars.hasOwnProperty(curID[0])) {
                        if (lcncsvr.vars[curID[0]].indexed)
                        {
                            if (lcncsvr.vars[curID[0]].convert_to_json)
                                lcncsvr.vars[curID[0]].data()[curID[1]] = JSON.parse(data.data);
                            else
                                lcncsvr.vars[curID[0]].data()[curID[1]] = data.data;
                            lcncsvr.vars[curID[0]].data.valueHasMutated();
                        } else {
                            if (lcncsvr.vars[curID[0]].convert_to_json)
                                lcncsvr.vars[curID[0]].data(JSON.parse(data.data));
                            else
                                lcncsvr.vars[curID[0]].data(data.data);
                        }
                    }
                } catch (ex) {
//                    console.debug(ex);
                }
            }

            lcncsvr.socket.onclose = function () {
                lcncsvr.server_open(false);
                lcncsvr.server_logged_in(false);
            }
        } catch (ex) {

        }
    }

    return lcncsvr;

});
