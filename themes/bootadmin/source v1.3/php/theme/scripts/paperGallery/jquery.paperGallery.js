$.fn.paperGallery = function( args ) {
 
    this.each( function() {
     
        $( this ).find( '.view' ).each( function() {
         
            var $item   = $( this ),
                img     = $item.children( 'img' ).attr( 'src' ),
                $img  	= $item.children( 'img' ),
                struct  = '<div class="slice s1">';
                    struct  +='<div class="slice s2">';
                        struct  +='<div class="slice s3">';
                            struct  +='<div class="slice s4">';
                                struct  +='<div class="slice s5">';
                                struct  +='</div>';
                            struct  +='</div>';
                        struct  +='</div>';
                    struct  +='</div>';
                struct  +='</div>';
                 
            var $struct = $( struct );
            
            var dataPg = {
            	imgWidth: $img.width(),
            	imgHeight: $img.height(),
            	itemHeight: $item.height(),
            	sliceWidth: Math.round($img.width()/5)
            }
            
            $item.height(dataPg.itemHeight).width(dataPg.imgWidth).find( 'img' ).remove().end().append( $struct ).find( 'div.slice' ).css( 'background-image', 'url(' + img + ')' ).prepend( $( '<span class="overlay" ></span>' ) );
            
            var prefxs = ['-webkit-', '-moz-', '-o-', '-ms-', ''];
            var transform = dataPg.sliceWidth;
    		
    		$item
    			.on('mouseenter', function()
	    		{
    				$item.data('active', $item.data('active') == true ? false : true);
    				$item.find('.overlay').css('opacity', 1);
	    			$.each(prefxs, function(pk,pv)
	    			{
	    				$item.find('.s2').css( pv + 'transform', 'translate3d(' + (transform-1) + 'px,0,0) rotate3d(0,1,0,-45deg)' );
	    				$item.find('.s3, .s5').css( pv + 'transform', 'translate3d(' + (transform-1) + 'px,0,0) rotate3d(0,1,0,90deg)' );
	    				$item.find('.s4').css( pv + 'transform', 'translate3d(' + (transform-1) + 'px,0,0) rotate3d(0,1,0,-90deg)' );
	    			});
	    		})
	    		.on('mouseleave', function()
	    		{
	    			$item.data('active', $item.data('active') == true ? false : true);
	    			$item.find('.overlay').css('opacity', 0);
	    			$.each(prefxs, function(pk,pv)
	    			{
	    				$item.find('.slice').not('.s1').css( pv + 'transform', 'translate3d(' + transform + 'px,0,0)' );
	    			});
	    		})
	    		.find('.slice.s1').on('click', function(e)
	    		{
	    			//if ($(e.target).is('.btn')) return false;
	    			
	    			$item.data('active', $item.data('active') == true ? false : true);
	    			if ($item.data('active') == true)
    				{
	    				$item.find('.overlay').css('opacity', 1);
		    			$.each(prefxs, function(pk,pv)
		    			{
		    				$item.find('.s2').css( pv + 'transform', 'translate3d(' + (transform-1) + 'px,0,0) rotate3d(0,1,0,-45deg)' );
		    				$item.find('.s3, .s5').css( pv + 'transform', 'translate3d(' + (transform-1) + 'px,0,0) rotate3d(0,1,0,90deg)' );
		    				$item.find('.s4').css( pv + 'transform', 'translate3d(' + (transform-1) + 'px,0,0) rotate3d(0,1,0,-90deg)' );
		    			});
    				}
	    			else
    				{
		    			$item.find('.overlay').css('opacity', 0);
		    			$.each(prefxs, function(pk,pv)
		    			{
		    				$item.find('.slice').not('.s1').css( pv + 'transform', 'translate3d(' + transform + 'px,0,0) rotate3d(0,1,0,0.01deg)' );
		    			});
    				}
	    		});
    		
    		
            $item
            	.find('.slice')
            	.each(function(k,v)
            	{
            		var bgPos = k*dataPg.sliceWidth;
            		
            		$(this)
            			.add($(this).children('.overlay'))
            			.css('width', dataPg.sliceWidth);
            		
            		if (k>0)
        			{
            			var slice = $(this);
            			$.each(prefxs, function(pk,pv)
            			{
            				slice.css( pv + 'transform', 'translate3d(' + transform + 'px,0,0)' );
            			});
            			slice.css({
            				'background-position': '-' + bgPos + 'px 0px'
            			});
            		}
            	});
             
        } );
         
    });
 
};