
(function ( root, doc, factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define( [ "jquery" ], function ( $ ) {
			factory( $, root, doc );
			return $.mobile;
		});
	} else {
		// Browser globals
		factory( root.jQuery, root, doc );
	}
}( this, document, function ( jQuery, window, document, undefined ) {
(function( $, window, undefined ) {
	var $document = $( document );

	//ontouchstart
	var supportTouch = ("ontouchstart" in document),
	touchStartEvent = supportTouch ? "touchstart" : "mousedown",
	touchStopEvent = supportTouch ? "touchend" : "mouseup",
	touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
	
	// add new event shortcuts
	$.each( ( "swipeleft swiperight " ).split( " " ), function( i, name ) {
		$.fn[ name ] = function( fn ) {
			
			return fn ? this.bind( name, fn ) : this.trigger( name );
		};

		// jQuery < 1.8
		if ( $.attrFn ) {
			$.attrFn[ name ] = true;
		}
	});
	
	// also handles swipeleft, swiperight
	$.event.special.swipe = {
			scrollSupressionThreshold: 30, // More than this horizontal displacement, and we will suppress scrolling.

			durationThreshold: 1000, // More time than this, and it isn't a swipe.

			horizontalDistanceThreshold: 30,  // Swipe horizontal displacement must be more than this.

			verticalDistanceThreshold: 75,  // Swipe vertical displacement must be less than this.

			start: function( event ) {
				var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] : event;
				return {
							time: ( new Date() ).getTime(),
							coords: [ data.pageX, data.pageY ],
							origin: $( event.target )
						};
			},

			stop: function( event ,s) {
				var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] : event;
				return {
							time: ( new Date() ).getTime(),
							coords: [ data.pageX, data.pageY ]
						};
				
			},

			handleSwipe: function( start, stop ) {
				if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
					Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
					Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {

					start.origin.trigger( "swipe" )
						.trigger( start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight" );
				}
			},

			setup: function() {
				var thisObject = this,
					$this = $( thisObject );

				$this.bind( touchStartEvent, function( event ) {
					var start = $.event.special.swipe.start( event ),
						stop;

					function moveHandler( event ) {
						if ( !start ) {
							return;
						}

						stop = $.event.special.swipe.stop( event ,stop);

						// prevent scrolling
						if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.scrollSupressionThreshold ) {
							event.preventDefault();
						}
					}

					$this.bind( touchMoveEvent, moveHandler )
						.one( touchStopEvent, function() {
							$this.unbind( touchMoveEvent, moveHandler );

							if ( start && stop ) {
								$.event.special.swipe.handleSwipe( start, stop );
							}
							start = stop = undefined;
						});
				});
			}
	};
	$.each({
		swipeleft: "swipe",
		swiperight: "swipe"
	}, function( event, sourceEvent ) {

		$.event.special[ event ] = {
			setup: function(data, namespaces, eventHandle) {
				$( this ).bind( sourceEvent, function(){} );
			}
		};
	});

})( jQuery, this );
}));