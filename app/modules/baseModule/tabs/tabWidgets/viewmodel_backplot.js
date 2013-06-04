define(function(require) {

    var template = require('text!./view_backplot.html');
    var nls = require('i18n!./nls/resources');

    var ViewModel = function(moduleContext) {

        var self = this;
        self.panel = null;


        this.getTemplate = function()
        {
            return template;
        }
        this.getNls = function()
        {
            return nls;
        }

        self.linuxCNCServer = moduleContext.getSettings().linuxCNCServer;
        self.settings = moduleContext.getSettings();


        // utility function for connecting a color to persistent storage in settings
        var setupPersistColor = function(obs)
        {
            var ret = new THREE.Color().setRGB( obs().r/255, obs().g/255, obs().b/255 );
            obs.subscribe(function(newval){
                try{
                    if (newval.r/255 != ret.r || newval.g/255 != ret.g || newval.b/255 != ret.b )
                    {
                        ret.setRGB(newval.r/255,newval.g/255,newval.b/255);
                        self.refreshBackplot();
                    }
                } catch(ex){}
            });
            return ret;
        }

        self.BGCOLOR = setupPersistColor(self.settings.persist.BPBGColor);
        self.GRID_COLOR = setupPersistColor(self.settings.persist.BPGridColor);
        self.GRID_COLOR_MAJOR = setupPersistColor(self.settings.persist.BPGridMajorColor);
        self.FEED_COLOR = setupPersistColor(self.settings.persist.BPFeedColor);
        self.TRAVERSE_COLOR = setupPersistColor(self.settings.persist.BPTraverseColor);
        self.EXECUTED_COLOR = setupPersistColor(self.settings.persist.BPFeedExecutedColor);
        self.EXECUTED_COLOR_TRAVERSE = setupPersistColor(self.settings.persist.BPTraverseExecutedColor);

        self.GRID_COLOR_Y = new THREE.Color().setRGB(150/255, 75/255, 75/255);
        self.GRID_COLOR_X = new THREE.Color().setRGB(75/255, 150/255, 75/255);

        self.GRID_VISIBLE = self.settings.persist.BPShowGrid;
        self.GRID_VISIBLE.subscribe(function(newval){self.refreshBackplot();});

        var gridopacity = 0.23
        var forgroundopacity = 1;

        self.gridMinorDivisions = 10;
        self.gridMajorSpacing = 1;
        self.renderer = null;

        self.needRender = true;

        self.initSubscription = _.once(function()
        {
            self.linuxCNCServer.vars.backplot_async.data.subscribe( function(){ self.refreshBackplot();  } );

            self.linuxCNCServer.DisplayUnitsPerMM.subscribe( function(newval){ console.log("DISPLAY UNITS PER MM CHANGED TO " + newval); self.refreshBackplot();  } );
            self.linuxCNCServer.ChangeDisplayUnitsToProgramUnits.subscribe( function(){ self.refreshBackplot();  } );

            self.linuxCNCServer.RmtDRO.subscribe( self.toolPositionChange );

            self.linuxCNCServer.vars.motion_line.data.subscribe( function(newVal){
                self.hilightMotionLine(newVal);
            } );
            self.linuxCNCServer.MachineUnitsToDisplayUnitsLinearScaleFactor.subscribe( function(){ self.refreshBackplot();  } );
        });

        self.initialize = function( backplotPanel ) {
            if (self.panel == null)
            {
                self.panel = backplotPanel;

                self.initSubscription();

                if ( $.isEmptyObject(self.renderer) )
                    if (typeof(self.linuxCNCServer.vars.backplot_async.data()) != "string")
                    {
                        self.refreshBackplot();
                    }

            }

            setTimeout(self.resize,2);
        };


        self.constructScene = function( scene, data )
        {
            var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth: 1, transparent: false  } );
            material.opacity = forgroundopacity;
            var divisor = 100000;

            var scale = self.linuxCNCServer.MachineUnitsToDisplayUnitsLinearScaleFactor();

            self.motionVectorMap = {};

            // FEED
            self.feedGeometry = new THREE.Geometry();
            var idx;
            var tox, toy, toz;
            var newColor;

            data.feed.forEach( function(element, index, array) {
                tox = element[4][0] / divisor;
                toy = element[4][1] / divisor;
                toz = element[4][2] / divisor;

                l1 = new THREE.Vector3( element[1][0]/divisor - tox, element[1][1]/divisor - toy, element[1][2]/divisor - toz).multiplyScalar(scale);
                l2 = new THREE.Vector3( element[2][0]/divisor - tox, element[2][1]/divisor - toy, element[2][2]/divisor - toz ).multiplyScalar(scale);

                self.feedGeometry.vertices.push( l1 );
                self.feedGeometry.vertices.push( l2 );

                var newfname = element[0].toString();
                if (_.isUndefined(self.motionVectorMap[newfname]))
                {
                    newColor = new THREE.Color().copy(self.FEED_COLOR);
                    self.motionVectorMap[newfname] = [newColor, self.feedGeometry];
                } else
                    newColor = self.motionVectorMap[newfname][0];

                self.feedGeometry.colors.push( newColor );
                self.feedGeometry.colors.push( newColor );
            });


            var x = 0;
            geom = undefined;
            data.arcfeed.forEach( function(element, index, array) {
                tox = element[4][0] / divisor;
                toy = element[4][1] / divisor;
                toz = element[4][2] / divisor;

                l1 = new THREE.Vector3( element[1][0]/divisor - tox, element[1][1]/divisor - toy, element[1][2]/divisor - toz ).multiplyScalar(scale);
                l2 = new THREE.Vector3( element[2][0]/divisor - tox, element[2][1]/divisor - toy, element[2][2]/divisor - toz ).multiplyScalar(scale);

                self.feedGeometry.vertices.push( l1 );
                self.feedGeometry.vertices.push( l2 );

                var newfname = element[0].toString();
                if (_.isUndefined(self.motionVectorMap[newfname]))
                {
                    newColor = new THREE.Color().copy(self.FEED_COLOR);
                    self.motionVectorMap[newfname] = [newColor, self.feedGeometry];
                } else
                    newColor = self.motionVectorMap[newfname][0];

                self.feedGeometry.colors.push( newColor );
                self.feedGeometry.colors.push( newColor );
            });

            self.feedGeometry.computeBoundingBox();
            scene.add( new THREE.Line(self.feedGeometry, material, THREE.LinePieces) );

            // TRAVERSE
            var materialTrav = new THREE.LineDashedMaterial( { vertexColors: THREE.VertexColors, dashSize: .3, gapSize: .1  } );
            materialTrav.opacity = forgroundopacity;
            self.traverseGeometry = new THREE.Geometry();
            data.traverse.forEach( function(element, index, array) {
                tox = element[3][0] / divisor;
                toy = element[3][1] / divisor;
                toz = element[3][2] / divisor;

                l1 = new THREE.Vector3( element[1][0]/divisor - tox, element[1][1]/divisor - toy, element[1][2]/divisor - toz ).multiplyScalar(scale);
                l2 = new THREE.Vector3( element[2][0]/divisor - tox, element[2][1]/divisor - toy, element[2][2]/divisor - toz ).multiplyScalar(scale);

                self.traverseGeometry.vertices.push( l1 );
                self.traverseGeometry.vertices.push( l2 );

                var newfname = element[0].toString();
                if (_.isUndefined(self.motionVectorMap[newfname]))
                {
                    newColor = new THREE.Color().copy(self.TRAVERSE_COLOR);
                    self.motionVectorMap[newfname] = [newColor, self.traverseGeometry];
                } else
                    newColor = self.motionVectorMap[newfname][0];

                self.traverseGeometry.colors.push( newColor );
                self.traverseGeometry.colors.push( newColor );
            });

            self.traverseGeometry.computeBoundingBox();
            self.traverseGeometry.computeLineDistances();
            self.scene.add( new THREE.Line(self.traverseGeometry, materialTrav, THREE.LinePieces) );

            // Tool
            var obj3d = new THREE.Object3D();
            self.toolImage = obj3d;
            var tooheight = 15 * self.linuxCNCServer.DisplayUnitsPerMM();
            var toolTop = new THREE.CylinderGeometry( tooheight/4, 0, tooheight, 32, 1 );

            var m1 = new THREE.Matrix4();
            m1.makeRotationX(Math.PI/2);
            var m2 = new THREE.Matrix4();
            m2.makeTranslation( 0,0, tooheight/2 );
            var m = new THREE.Matrix4();
            m.multiplyMatrices(m2, m1);
            toolTop.applyMatrix(m);

            var materialToolTop = new THREE.MeshLambertMaterial( {color: 0xffffff, emissive: 0x403040, transparent: true } );
            materialToolTop.opacity = 0.50;
            self.toolImage.add(new THREE.Mesh(toolTop, materialToolTop));
            scene.add( self.toolImage );

            var light = new THREE.AmbientLight( 0x404040 ); // soft white light
            scene.add( light );
            light = new THREE.PointLight( 0xffffff );
            light.position.set( 1000, -1000, 1000 );
            scene.add( light );


            // GRID
            var gridGeometry1 = new THREE.Geometry();
            var materialMinorGrid = new THREE.LineBasicMaterial( { vertexColors: THREE.NoColors, color:self.GRID_COLOR, linewidth: 0.5, transparent: true } );
            materialMinorGrid.opacity = gridopacity;
            var minx = Math.min(0,self.feedGeometry.boundingBox.min.x,self.traverseGeometry.boundingBox.min.x);
            var miny = Math.min(0,self.feedGeometry.boundingBox.min.y,self.traverseGeometry.boundingBox.min.y);
            var minz = Math.min(0,self.feedGeometry.boundingBox.min.z,self.traverseGeometry.boundingBox.min.z);
            var maxx = Math.max(0,self.feedGeometry.boundingBox.max.x,self.traverseGeometry.boundingBox.max.x);
            var maxy = Math.max(0,self.feedGeometry.boundingBox.max.y,self.traverseGeometry.boundingBox.max.y);
            var maxz = Math.max(0,self.feedGeometry.boundingBox.max.z,self.traverseGeometry.boundingBox.max.z);
            var span = Math.max(maxx-minx, maxy-miny, maxz-minz, 0.1 );
            self.span = Math.ceil(span);
            var span = self.span;

            if (self.GRID_VISIBLE())
            {
                var minorGridCount = 10;
                if (span > 100)
                    minorGridCount = 1;
                var itr = 0;
                for (idx = (-span); idx <= (span); idx += 1/minorGridCount)
                {
                    if (Math.abs(idx - Math.round(idx)) > 0.5/minorGridCount)
                    {
                        gridGeometry1.vertices.push( new THREE.Vector3( idx, -span, 0 ));
                        gridGeometry1.vertices.push( new THREE.Vector3( idx,  span, 0 ));
                        gridGeometry1.vertices.push( new THREE.Vector3( -span, idx, 0 ));
                        gridGeometry1.vertices.push( new THREE.Vector3(  span, idx, 0 ));
                    }
                }
                scene.add( new THREE.Line(gridGeometry1, materialMinorGrid, THREE.LinePieces ));

                var gridGeometry2 = new THREE.Geometry();
                var materialMinorGrid2 = new THREE.LineBasicMaterial( { vertexColors: THREE.NoColors, color:self.GRID_COLOR_MAJOR, transparent: true } );
                materialMinorGrid2.opacity = gridopacity;
                for (idx = (-span); idx <= (span); idx += 1)
                {

                    if (idx != 0)
                    {
                        gridGeometry2.vertices.push( new THREE.Vector3( idx, -span, 0 ));
                        gridGeometry2.vertices.push( new THREE.Vector3( idx,  span, 0 ));
                        gridGeometry2.vertices.push( new THREE.Vector3( -span, idx, 0 ));
                        gridGeometry2.vertices.push( new THREE.Vector3(  span, idx, 0 ));
                    } else {
                        gridGeometry2.vertices.push( new THREE.Vector3( idx, -span, 0 ));
                        gridGeometry2.vertices.push( new THREE.Vector3( idx,  0, 0 ));
                        gridGeometry2.vertices.push( new THREE.Vector3( -span, idx, 0 ));
                        gridGeometry2.vertices.push( new THREE.Vector3(  0, idx, 0 ));
                    }

                }
                scene.add( new THREE.Line(gridGeometry2, materialMinorGrid2, THREE.LinePieces ));
            }

            var gridGeometry3 = new THREE.Geometry();
            var materialMinorGrid3 = new THREE.LineBasicMaterial( { vertexColors: THREE.NoColors, color: self.GRID_COLOR_X  } );
            gridGeometry3.vertices.push( new THREE.Vector3( 0, 0, 0 ));
            gridGeometry3.vertices.push( new THREE.Vector3( 0, span, 0 ));
            scene.add( new THREE.Line(gridGeometry3, materialMinorGrid3, THREE.LinePieces ));

            var gridGeometry4 = new THREE.Geometry();
            var materialMinorGrid4 = new THREE.LineBasicMaterial( { vertexColors: THREE.NoColors, color: self.GRID_COLOR_Y } );
            gridGeometry4.vertices.push( new THREE.Vector3( 0, 0, 0 ));
            gridGeometry4.vertices.push( new THREE.Vector3( span, 0, 0 ));
            gridGeometry4.computeLineDistances();
            scene.add( new THREE.Line(gridGeometry4, materialMinorGrid4, THREE.LinePieces ));

        }

        self.onNewData = function(newData)
        {
            if (self.renderer)
            {
                try{
                    $(self.renderer.domElement).remove();
                    self.renderer = null;
                } catch(ex) {}
            }

            self.scene = new THREE.Scene();
            self.constructScene( self.scene, newData );

            self.camera = new THREE.PerspectiveCamera( 25, $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).width() / $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).height(), 1, 1000 );
            var centerPos = self.feedGeometry.boundingBox.center();
            centerPos.z = centerPos.z + self.span*2;
            self.camera.position.set( centerPos.x, centerPos.y, centerPos.z );
            self.camera.lookAt(self.feedGeometry.boundingBox.center() );

            self.controls = new THREE.OrbitControls( self.camera, $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).get(0) );
            self.controls.userPanSpeed = self.span / 100;;
            self.controls.center = self.feedGeometry.boundingBox.center();

            self.controls.addEventListener( 'change', function(){ self.needRender = true; } );

            self.renderer = new THREE.WebGLRenderer( {antialias: true} );
            self.renderer.setClearColor( self.BGCOLOR, 1 );

            self.renderer.setSize( $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).width(), $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).height() );



            $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).append( self.renderer.domElement );

            self.animate();

            //setTimeout(self.resize,2);
            setTimeout(function(){ self.resize(); self.toolPositionChange(self.linuxCNCServer.RmtDRO())},3);
        }


        self.toolPositionChange = function(newVal){
            try {
                self.toolImage.position.set( newVal[0], newVal[1], newVal[2] );
                self.needRender = true;
            } catch(ex) {};
        }

        self.hilightMotionLine = function(lineNum)
        {
            if (!_.isUndefined( self.motionVectorMap[lineNum.toString()]) )
            {
                if (self.motionVectorMap[lineNum.toString()][1] === self.feedGeometry)
                    self.motionVectorMap[lineNum.toString()][0].copy(self.EXECUTED_COLOR );
                else
                    self.motionVectorMap[lineNum.toString()][0].copy(self.EXECUTED_COLOR_TRAVERSE );

                self.motionVectorMap[lineNum.toString()][1].colorsNeedUpdate = true;

                return;
            } else {
            }
        }

        self.setTopView = function()
        {
            try {
                var centerPos = self.feedGeometry.boundingBox.center();
                centerPos.z = centerPos.z + self.span*2;
                self.camera.position.set( centerPos.x, centerPos.y, centerPos.z );
                self.camera.up.x=0;self.camera.up.y=1;self.camera.up.z=0;
                self.controls.center = self.feedGeometry.boundingBox.center();
                self.camera.lookAt(self.feedGeometry.boundingBox.center() );

                self.render();
            } catch (ex) {}
        }


        self.setPerspectiveView = function()
        {
            try {
                self.setTopView();
                self.controls.rotateRight(Math.PI/4);
                self.controls.rotateDown(Math.PI/4);

                self.render();
            } catch (ex) {}
        }

        self.resize = function(event){
            try {

                var height_of_bp_area = $("#BACKPLOT_INNER_WRAP",self.panel.getJQueryElement()).height() -
                    ( $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).offset().top - $("#BACKPLOT_INNER_WRAP",self.panel.getJQueryElement()).offset().top ) - 30;

                if (height_of_bp_area < 100)
                    height_of_bp_area = 100;
                $("#BACKPLOT_SIZER",self.panel.getJQueryElement()).height( height_of_bp_area );

                try {
                $(self.renderer.domElement).detach();
                self.camera.aspect = $("#BACKPLOT_SIZER",self.panel.getJQueryElement()).width() / $("#BACKPLOT_SIZER",self.panel.getJQueryElement()).height();
                self.camera.updateProjectionMatrix();
                self.renderer.setSize( $("#BACKPLOT_SIZER",self.panel.getJQueryElement()).width(), $("#BACKPLOT_SIZER",self.panel.getJQueryElement()).height() );
                } catch(ex) {}

                $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).height($("#BACKPLOT_SIZER",self.panel.getJQueryElement()).height());
                $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).append( self.renderer.domElement );

                self.render();


            } catch (ex){  };
        }


        self.refreshBackplot = _.debounce( function(event) {
            self.onNewData(self.linuxCNCServer.vars.backplot_async.data());
        }, 1000, false );

        self.render = function()
        {
            self.scene.updateMatrixWorld();
            self.renderer.clear();
            self.renderer.render( self.scene, self.camera );
        }

        self.animate = _.throttle( function() {
            requestAnimationFrame( self.animate );
            try {
                //if (self.panel.getJQueryElement().is(":visible"))
                {
                    self.controls.update();
                    if (self.needRender) {
                        self.needRender = false;
                        self.renderer.render( self.scene, self.camera );
                    }
                }
            } catch (ex) {}
        } , 100 );

        $(window).resize( _.throttle(self.resize, 200 ) );

    };

    return ViewModel;
});

