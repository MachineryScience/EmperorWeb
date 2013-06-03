define(function(require) {

    var template = require('text!./view.html');
    var nls = require('i18n!./nls/resources');

	var ViewModel = function(moduleContext) {

		var self = this;
        self.linuxCNCServer = moduleContext.getSettings().linuxCNCServer;
        self.settings =  moduleContext.getSettings();

        self.jogging = ko.observable(false);

        this.getTemplate = function()
        {
            return template;
        }
        this.getNls = function()
        {
            return nls;
        }

		this.initialize = function( Panel ) {
            if (_.isUndefined(self.Panel))
            {
                self.Panel = Panel;
                self.mdiTypeAhead = $('#navBottomMDIInput',self.Panel.getJQueryElement()).typeahead({ dropup: true, source: function() { return self.settings.persist.MDIHistory(); } });

                self.jogFocusElement = $('#jog_focus_handler', self.Panel.getJQueryElement());

                // steal focus away from the body, buttons and links, so we can grab the keyboard for jogging
                setInterval(function(){
                    var focusObj = $(document.activeElement);

                    if (!self.jogFocusElement.is(":focus"))
                        if ( (focusObj).is("body") || (focusObj).is("button") || (focusObj).is("a"))
                            self.jogFocusElement.focus();
                },100);

                // GLOBAL KEYBOARD BINDINGS

                // Y AXIS JOG
                var yKeyJog = false;
                self.jogFocusElement.bind('keydown', 'up', function(e){ if (!yKeyJog) self.linuxCNCServer.jogCont(1,self.linuxCNCServer.jog_speed_slow()); yKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'up', function(){ yKeyJog=false; self.linuxCNCServer.jogStop(1); });
                self.jogFocusElement.bind('keydown', 'shift+up', function(e){ if (!yKeyJog) self.linuxCNCServer.jogCont(1,self.linuxCNCServer.jog_speed_fast());  yKeyJog=true; e.preventDefault(); });
                self.jogFocusElement.bind('keyup', 'shift+up', function(){ yKeyJog=false; self.linuxCNCServer.jogStop(1); });
                self.jogFocusElement.bind('keydown', 'alt+up', function(e){ if (!yKeyJog) self.linuxCNCServer.jogIncr(1, self.linuxCNCServer.jog_step());  yKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'alt+up', function(){ yKeyJog=false; });

                self.jogFocusElement.bind('keydown', 'down', function(e){  if (!yKeyJog) self.linuxCNCServer.jogCont(1,-1*self.linuxCNCServer.jog_speed_slow());  yKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'down', function(){ yKeyJog=false; self.linuxCNCServer.jogStop(1); });
                self.jogFocusElement.bind('keydown', 'shift+down', function(e){  if (!yKeyJog) self.linuxCNCServer.jogCont(1,-1*self.linuxCNCServer.jog_speed_fast()); yKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'shift+down', function(){ yKeyJog=false; self.linuxCNCServer.jogStop(1); });
                self.jogFocusElement.bind('keydown', 'alt+down', function(e){  if (!yKeyJog) self.linuxCNCServer.jogIncr(1, -1*self.linuxCNCServer.jog_step());  yKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'alt+down', function(){ yKeyJog=false; });

                // X AXIS JOG
                var xKeyJog = false;
                self.jogFocusElement.bind('keydown', 'right', function(e){ if (!xKeyJog) self.linuxCNCServer.jogCont(0,self.linuxCNCServer.jog_speed_slow()); xKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'right', function(){ xKeyJog=false; self.linuxCNCServer.jogStop(0); });
                self.jogFocusElement.bind('keydown', 'shift+right', function(e){ if (!xKeyJog) self.linuxCNCServer.jogCont(0,self.linuxCNCServer.jog_speed_fast());  xKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'shift+right', function(){ xKeyJog=false; self.linuxCNCServer.jogStop(0); });
                self.jogFocusElement.bind('keydown', 'alt+right', function(e){ if (!xKeyJog) self.linuxCNCServer.jogIncr(0, self.linuxCNCServer.jog_step());  xKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'alt+right', function(){ xKeyJog=false; });

                self.jogFocusElement.bind('keydown', 'left', function(e){  if (!xKeyJog) self.linuxCNCServer.jogCont(0,-1*self.linuxCNCServer.jog_speed_slow());  xKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'left', function(){ xKeyJog=false; self.linuxCNCServer.jogStop(0); });
                self.jogFocusElement.bind('keydown', 'shift+left', function(e){  if (!xKeyJog) self.linuxCNCServer.jogCont(0,-1*self.linuxCNCServer.jog_speed_fast()); xKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'shift+left', function(){ xKeyJog=false; self.linuxCNCServer.jogStop(0); });
                self.jogFocusElement.bind('keydown', 'alt+left', function(e){  if (!xKeyJog) self.linuxCNCServer.jogIncr(0, -1*self.linuxCNCServer.jog_step());  xKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'alt+left', function(){ xKeyJog=false; });

                // Z AXIS JOG
                var zKeyJog = false;
                self.jogFocusElement.bind('keydown', 'pageup', function(e){ if (!zKeyJog) self.linuxCNCServer.jogCont(2,self.linuxCNCServer.jog_speed_slow()); zKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'pageup', function(){ zKeyJog=false; self.linuxCNCServer.jogStop(2); });
                self.jogFocusElement.bind('keydown', 'shift+pageup', function(e){ if (!zKeyJog) self.linuxCNCServer.jogCont(2,self.linuxCNCServer.jog_speed_fast());  zKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'shift+pageup', function(){ zKeyJog=false; self.linuxCNCServer.jogStop(2); });
                self.jogFocusElement.bind('keydown', 'alt+pageup', function(e){ if (!zKeyJog) self.linuxCNCServer.jogIncr(2, self.linuxCNCServer.jog_step());  zKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'alt+pageup', function(e){ zKeyJog=false; e.preventDefault(); });

                self.jogFocusElement.bind('keydown', 'pagedown', function(e){  if (!zKeyJog) self.linuxCNCServer.jogCont(2,-1*self.linuxCNCServer.jog_speed_slow());  zKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'pagedown', function(){ zKeyJog=false; self.linuxCNCServer.jogStop(2); });
                self.jogFocusElement.bind('keydown', 'shift+pagedown', function(e){  if (!zKeyJog) self.linuxCNCServer.jogCont(2,-1*self.linuxCNCServer.jog_speed_fast()); zKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'shift+pagedown', function(){ zKeyJog=false; self.linuxCNCServer.jogStop(2); });
                self.jogFocusElement.bind('keydown', 'alt+pagedown', function(e){  if (!zKeyJog) self.linuxCNCServer.jogIncr(2, -1*self.linuxCNCServer.jog_step());  zKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'alt+pagedown', function(e){ zKeyJog=false; e.preventDefault();});


                // A AXIS JOG
                var aKeyJog = false;
                self.jogFocusElement.bind('keydown', 'home', function(e){ if (!aKeyJog) self.linuxCNCServer.jogCont(3,self.linuxCNCServer.jog_speed_slow()); aKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'home', function(){ aKeyJog=false; self.linuxCNCServer.jogStop(3); });
                self.jogFocusElement.bind('keydown', 'shift+home', function(e){ if (!aKeyJog) self.linuxCNCServer.jogCont(3,self.linuxCNCServer.jog_speed_fast());  aKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'shift+home', function(){ aKeyJog=false; self.linuxCNCServer.jogStop(3); });
                self.jogFocusElement.bind('keydown', 'alt+home', function(e){ if (!aKeyJog) self.linuxCNCServer.jogIncr(3, self.linuxCNCServer.jog_step());  aKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'alt+home', function(){ aKeyJog=false; });

                self.jogFocusElement.bind('keydown', 'end', function(e){  if (!aKeyJog) self.linuxCNCServer.jogCont(3,-1*self.linuxCNCServer.jog_speed_slow());  aKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'end', function(){ aKeyJog=false; self.linuxCNCServer.jogStop(3); });
                self.jogFocusElement.bind('keydown', 'shift+end', function(e){  if (!aKeyJog) self.linuxCNCServer.jogCont(3,-1*self.linuxCNCServer.jog_speed_fast()); aKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'shift+end', function(){ aKeyJog=false; self.linuxCNCServer.jogStop(3); });
                self.jogFocusElement.bind('keydown', 'alt+end', function(e){  if (!aKeyJog) self.linuxCNCServer.jogIncr(3, -1*self.linuxCNCServer.jog_step());  aKeyJog=true; e.preventDefault();});
                self.jogFocusElement.bind('keyup', 'alt+end', function(){ aKeyJog=false; });
            }
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
