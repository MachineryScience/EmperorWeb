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

        self.BGCOLOR = new THREE.Color().setRGB( 159/255, 159/255, 159/255 );

        self.BGCOLOR = new THREE.Color().setRGB( 129/255, 129/255, 129/255 );

//        self.BGCOLOR = new THREE.Color().setRGB( 0,0,0 );
//        self.GRID_COLOR = new THREE.Color().setRGB(14.0/255,14.0/255,14.0/255);
//        self.GRID_COLOR_MAJOR = new THREE.Color().setRGB(12.0/255,12.0/255,12.0/255);

        self.GRID_COLOR = new THREE.Color().setRGB(.8,.8,.8);
        self.GRID_COLOR_MAJOR = new THREE.Color().setRGB(1,1,1);


        self.FEED_COLOR = new THREE.Color().setRGB(0/255, 255/255, 0/255);
        self.FEED_COLOR_OVERLAY = new THREE.Color().setRGB(128/255, 255/255, 128/255);
        self.TEMP_LINE_COLOR = new THREE.Color().setRGB(1,0,0);
        self.TRAVERSE_COLOR = new THREE.Color().setRGB(0/255, 0/255, 255/255);

        self.GRID_COLOR_Y = new THREE.Color().setRGB(150/255, 75/255, 75/255);
//        self.GRID_COLOR_X = new THREE.Color().setRGB(75/255, 150/255, 75/255);
        self.GRID_COLOR_X = new THREE.Color().setRGB(75/255, 175/255, 75/255);


        var gridopacity = 0.13
        var forgroundopacity = 0.5;

        self.gridMinorDivisions = 10;
        self.gridMajorSpacing = 1;
        self.renderer = null;

        self.needRender = true;

        self.initSubscription = _.once(function()
        {
            self.linuxCNCServer.vars.backplot.data.subscribe( function( newValue ) {
                self.onNewData(newValue);
            } );
        });

        self.initialize = function( backplotPanel ) {
            if (self.panel == null)
            {
                self.panel = backplotPanel;

                self.initSubscription();

                if ( ! $.isEmptyObject(self.renderer) )
                    setTimeout(self.resize,2);
                else
                    self.linuxCNCServer.sendBackplotRequestOrNotify();
            } else
                self.resize();
        };


        self.constructScene = function( scene, data )
        {
            self.tempLineMaterial = new THREE.LineBasicMaterial( { vertexColors: THREE.NoColors, color:self.FEED_COLOR_OVERLAY, linewidth: 2  } );
            var material = new THREE.LineBasicMaterial( { vertexColors: THREE.NoColors, color:self.FEED_COLOR, linewidth: 1, transparent: true  } );
            material.opacity = forgroundopacity;
            var divisor = 100000;

            self.motionVectorMap = {};

            // FEED
            self.feedGeometry = new THREE.Geometry();
            var idx;
            var tox, toy, toz;

            var l1, l2, ll, geom;
            data.feed.forEach( function(element, index, array) {
                tox = element[4][0] / divisor;
                toy = element[4][1] / divisor;
                toz = element[4][2] / divisor;

                l1 = new THREE.Vector3( element[1][0]/divisor - tox, element[1][1]/divisor - toy, element[1][2]/divisor - toz );
                l2 = new THREE.Vector3( element[2][0]/divisor - tox, element[2][1]/divisor - toy, element[2][2]/divisor - toz );

                geom = new THREE.Geometry();
                geom.vertices.push(l1);
                geom.vertices.push(l2);

                ll = new THREE.Line(geom, self.tempLineMaterial, THREE.LinePieces);

                self.feedGeometry.vertices.push( l1 );
                self.feedGeometry.vertices.push( l2 );

                self.motionVectorMap[element[0].toString()] = ll;
            });

            var fname = "";
            geom = undefined;
            data.arcfeed.forEach( function(element, index, array) {
                tox = element[4][0] / divisor;
                toy = element[4][1] / divisor;
                toz = element[4][2] / divisor;

                l1 = new THREE.Vector3( element[1][0]/divisor - tox, element[1][1]/divisor - toy, element[1][2]/divisor - toz );
                l2 = new THREE.Vector3( element[2][0]/divisor - tox, element[2][1]/divisor - toy, element[2][2]/divisor - toz );
                self.feedGeometry.vertices.push( l1 );
                self.feedGeometry.vertices.push( l2 );

                var newfname = element[0].toString();
                if ( (fname != newfname || index == array.length - 1) && (!_.isUndefined(geom)) )
                    {
//                        var mat = new THREE.LineBasicMaterial( { vertexColors: THREE.NoColors, color:self.FEED_COLOR, linewidth: 1  } );
                        ll = new THREE.Line(geom, self.tempLineMaterial, THREE.LinePieces);
//                        scene.add(ll);
                        self.motionVectorMap[fname] = ll;
                        geom = undefined;
                    }
                fname = newfname;

                if (_.isUndefined(geom))
                {
                    geom = new THREE.Geometry();
                    geom.vertices.push(l1);
                    geom.vertices.push(l2);
                }
                else
                {
                    geom.vertices.push(l1);
                    geom.vertices.push(l2);
                }
            });

            self.feedGeometry.computeBoundingBox();
            scene.add( new THREE.Line(self.feedGeometry, material, THREE.LinePieces) );

            // TRAVERSE
            var materialTrav = new THREE.LineDashedMaterial( { color: self.TRAVERSE_COLOR, dashSize: .3, gapSize: .1, transparent: true } );
            materialTrav.opacity = forgroundopacity;
            self.tempLineMaterial = new THREE.LineDashedMaterial( { color: self.TRAVERSE_COLOR, dashSize: .3, gapSize: .1  } );
            self.traverseGeometry = new THREE.Geometry();
            data.traverse.forEach( function(element, index, array) {
                tox = element[3][0] / divisor;
                toy = element[3][1] / divisor;
                toz = element[3][2] / divisor;

                l1 = new THREE.Vector3( element[1][0]/divisor - tox, element[1][1]/divisor - toy, element[1][2]/divisor - toz );
                l2 = new THREE.Vector3( element[2][0]/divisor - tox, element[2][1]/divisor - toy, element[2][2]/divisor - toz );

                geom = new THREE.Geometry();
                geom.vertices.push(l1);
                geom.vertices.push(l2);
                geom.computeLineDistances();
                ll = new THREE.Line(geom, self.tempLineMaterial, THREE.LinePieces);

                self.motionVectorMap[element[0].toString()] = ll;

                self.traverseGeometry.vertices.push( l1 );
                self.traverseGeometry.vertices.push( l2 );
            });

            self.traverseGeometry.computeBoundingBox();
            self.traverseGeometry.computeLineDistances();
            self.scene.add( new THREE.Line(self.traverseGeometry, materialTrav, THREE.LinePieces) );

            // Tool
            self.toolImage = new THREE.SphereGeometry( 0.001 );
            self.materialTool = new THREE.MeshLambertMaterial( {color: 0xff0000, emissive: 0xff0000, transparent: true   } );
            self.materialTool.opacity = 0.75;
            var obj3d = new THREE.Object3D();
            obj3d.add(new THREE.Mesh(self.toolImage, self.materialTool));
            self.toolImage = obj3d;
            var toolTop = new THREE.CylinderGeometry( 0.125, 0, 1, 32, 1 );

            var m1 = new THREE.Matrix4();
            m1.makeRotationX(Math.PI/2);
            var m2 = new THREE.Matrix4();
            m2.makeTranslation( 0,0, 0.5 );
            var m = new THREE.Matrix4();
            m.multiplyMatrices(m2, m1);
            toolTop.applyMatrix(m);

            var materialToolTop = new THREE.MeshLambertMaterial( {color: 0xffffff, emissive: 0x400000, transparent: true   } );
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
            var minorGridCount = 10;
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
            console.debug("Backplot new data");
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

            self.linuxCNCServer.RmtDROProgram.subscribe( function(newVal){
                self.toolImage.position.set( newVal[0], newVal[1], newVal[2] );
                self.needRender = true;
            } );
            self.linuxCNCServer.vars.motion_line.data.subscribe( function(newVal){
                self.hilightMotionLine(newVal);
            } );

            setTimeout(self.resize,2);
        }

        self.hilightMotionLine = function(lineNum)
        {

//            if (!_.isUndefined(self.tempHilightObj))
//                self.scene.remove(self.tempHilightObj);

            if (!_.isUndefined( self.motionVectorMap[lineNum.toString()]) )
            {
                self.scene.add( self.motionVectorMap[lineNum.toString()] );
                return;
            }

//            var newline = new THREE.Geometry();
//            self.motionVectorMap[lineNum.toString()].forEach( function(element, index, array) {
//                newline.vertices.push( element );
//            });
//
//            self.tempHilightObj = new THREE.Line( newline, self.tempLineMaterial, THREE.LinePieces );
//
//            self.scene.add(self.tempHilightObj);

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
                    ( $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).offset().top - $("#BACKPLOT_INNER_WRAP",self.panel.getJQueryElement()).offset().top ) - 25;

                if (height_of_bp_area < 100)
                    height_of_bp_area = 100;
                $("#BACKPLOT_SIZER",self.panel.getJQueryElement()).height( height_of_bp_area );

                $(self.renderer.domElement).detach();
                self.camera.aspect = $("#BACKPLOT_SIZER",self.panel.getJQueryElement()).width() / $("#BACKPLOT_SIZER",self.panel.getJQueryElement()).height();
                self.camera.updateProjectionMatrix();
                self.renderer.setSize( $("#BACKPLOT_SIZER",self.panel.getJQueryElement()).width(), $("#BACKPLOT_SIZER",self.panel.getJQueryElement()).height() );
                $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).height($("#BACKPLOT_SIZER",self.panel.getJQueryElement()).height());
                $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).append( self.renderer.domElement );
                self.render();

            } catch (ex){  };
        }

        self.render = function()
        {
            self.scene.updateMatrixWorld();
            self.renderer.clear();
            self.renderer.render( self.scene, self.camera );
        }

        self.animate = _.throttle( function() {
            requestAnimationFrame( self.animate );
            try {
                self.controls.update();
                if (self.needRender) {
                    self.needRender = false;
                    self.renderer.render( self.scene, self.camera );
                }
            } catch (ex) {}
        } , 100 );

        $(window).resize( _.throttle(self.resize, 200 ) );

    };

    return ViewModel;
});

