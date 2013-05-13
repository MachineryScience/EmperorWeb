define(function(require) {

    var template = require('text!./view_backplot.html');
    var nls = require('i18n!./nls/resources');


    var ViewModel = function(moduleContext) {

        var self = this;

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
        self.GRID_COLOR = new THREE.Color().setRGB(140/255,140/255,140/255);
        self.GRID_COLOR_MAJOR = new THREE.Color().setRGB(120/255,120/255,120/255);
        self.FEED_COLOR = new THREE.Color().setRGB(0/255, 255/255, 0/255);
        self.TRAVERSE_COLOR = new THREE.Color().setRGB(0/255, 0/255, 255/255);
        self.GRID_COLOR_Y = new THREE.Color().setRGB(150/255, 75/255, 75/255);
        self.GRID_COLOR_X = new THREE.Color().setRGB(75/255, 150/255, 75/255);

        self.gridMinorDivisions = 10;
        self.gridMajorSpacing = 1;
        self.renderer = null;

        self.initSubscription = _.once(function()
        {
            self.linuxCNCServer.vars.backplot.data.subscribe( function( newValue ) {
                self.onNewData(newValue);
            } );
        });

        self.initialize = function( backplotPanel ) {
            self.panel = backplotPanel;

            self.initSubscription();

            if ( ! $.isEmptyObject(self.renderer) )
                setTimeout(self.resize,2);
            else
                self.linuxCNCServer.sendBackplotRequest();
        };


        self.constructScene = function( scene, data )
        {
            var material = new THREE.LineBasicMaterial( { vertexColors: THREE.NoColors, color:self.FEED_COLOR, linewidth: 1 } );
            var divisor = 100000;

            // FEED
            self.feedGeometry = new THREE.Geometry();
            var idx;
            var tox, toy, toz;
            data.feed.forEach( function(element, index, array) {
                tox = element[4][0] / divisor;
                toy = element[4][1] / divisor;
                toz = element[4][2] / divisor;

                self.feedGeometry.vertices.push( new THREE.Vector3( element[1][0]/divisor - tox, element[1][1]/divisor - toy, element[1][2]/divisor - toz ) );
                self.feedGeometry.vertices.push( new THREE.Vector3( element[2][0]/divisor - tox, element[2][1]/divisor - toy, element[2][2]/divisor - toz ) );
            });
            data.arcfeed.forEach( function(element, index, array) {
                tox = element[4][0] / divisor;
                toy = element[4][1] / divisor;
                toz = element[4][2] / divisor;

                self.feedGeometry.vertices.push( new THREE.Vector3( element[1][0]/divisor - tox, element[1][1]/divisor - toy, element[1][2]/divisor - toz ) );
                self.feedGeometry.vertices.push( new THREE.Vector3( element[2][0]/divisor - tox, element[2][1]/divisor - toy, element[2][2]/divisor - toz ) );
            });

            self.feedGeometry.computeBoundingBox();
            scene.add( new THREE.Line(self.feedGeometry, material, THREE.LinePieces) );

            // TRAVERSE
            var materialTrav = new THREE.LineDashedMaterial( { color: self.TRAVERSE_COLOR, dashSize: .3, gapSize: .1 } );
            self.traverseGeometry = new THREE.Geometry();
            data.traverse.forEach( function(element, index, array) {
                tox = element[3][0] / divisor;
                toy = element[3][1] / divisor;
                toz = element[3][2] / divisor;

                self.traverseGeometry.vertices.push( new THREE.Vector3( element[1][0]/divisor - tox, element[1][1]/divisor - toy, element[1][2]/divisor - toz ) );
                self.traverseGeometry.vertices.push( new THREE.Vector3( element[2][0]/divisor - tox, element[2][1]/divisor - toy, element[2][2]/divisor - toz ) );
            });

            self.traverseGeometry.computeBoundingBox();
            self.traverseGeometry.computeLineDistances();
            scene.add( new THREE.Line(self.traverseGeometry, materialTrav, THREE.LinePieces) );

            // GRID
            var gridGeometry1 = new THREE.Geometry();
            var materialMinorGrid = new THREE.LineBasicMaterial( { vertexColors: THREE.NoColors, color:self.GRID_COLOR, linewidth: 0.5 } );
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
            var materialMinorGrid2 = new THREE.LineBasicMaterial( { vertexColors: THREE.NoColors, color:self.GRID_COLOR_MAJOR } );
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

        self.resize_handler = function() {
            var timer_id;
            $(window).resize(function() {
                clearTimeout(timer_id);
                timer_id = setTimeout(function() {
                    self.resize();
                }, 100);
            });
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

            self.renderer = new THREE.WebGLRenderer( {antialias: true} );
            self.renderer.setClearColor( self.BGCOLOR );

            self.renderer.setSize( $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).width(), $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).height() );

            $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).append( self.renderer.domElement );

//            try { // try to remove the resize property if it is there, so we don't do it twice
//                $("#BACKPLOT_SIZER",self.panel.getJQueryElement()).resizable( 'destroy' );
//            } catch (ex) {}
//            $("#BACKPLOT_SIZER",self.panel.getJQueryElement()).resizable({ handles: "s", minHeight:150 });

            self.animate();

            setTimeout(self.resize,2);
            self.resize();
        }

        self.setTopView = function()
        {
            try {
                var centerPos = self.feedGeometry.boundingBox.center();
                centerPos.z = centerPos.z + self.span*2;
                self.camera.position.set( centerPos.x, centerPos.y, centerPos.z );
                self.camera.lookAt(self.feedGeometry.boundingBox.center() );

                self.controls.object = null;
                self.controls = new THREE.OrbitControls( self.camera, $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).get(0) );
                self.controls.userPanSpeed = self.span / 100;
                self.controls.center = self.feedGeometry.boundingBox.center();

                self.render();
            } catch (ex) {}
        }



        self.resize = function(event){
            try {


                var height_of_bp_area = $("#BACKPLOT_INNER_WRAP",self.panel.getJQueryElement()).height() -
                    ( $("#BACKPLOT_CONTENT",self.panel.getJQueryElement()).offset().top - $("#BACKPLOT_INNER_WRAP",self.panel.getJQueryElement()).offset().top ) -
                    50;

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

        self.animate = function() {
            requestAnimationFrame( self.animate );
            try {
                self.controls.update();
                self.renderer.render( self.scene, self.camera );
            } catch (ex) {}
        }

        self.resize_handler();

    };

    return ViewModel;
});

