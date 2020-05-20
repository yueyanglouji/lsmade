
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
	
	var touchtype = 0;
	$.each([1,2,3,4,5], function(index,value){
		$.each({"touchstart_" : touchStartEvent, "touchmove_" : touchMoveEvent, "touchend_" : touchStopEvent}, function(ename, eevent){
			$.event.special[ename + value] = {
					
					setup: function() {
						var thisObject = this,
						$this = $( thisObject );
						var number = value;
						$this.bind( eevent, function( event ) {
							
							
							if(ename == "touchend_"){
								
								if(touchtype != 0){
									var trigerEvent = $.Event(ename + touchtype);
									trigerEvent.originalEvent = event.originalEvent;
									touchtype = 0;
									
									$( event.target ).trigger( trigerEvent );
								}
							}else{
								if(event.originalEvent.touches == null || event.originalEvent.touches.length != number){
									return;
								}
								
								var trigerEvent = $.Event(ename + number);
								trigerEvent.originalEvent = event.originalEvent;
								
								if(ename == "touchstart_"){
									if(touchtype != 0){
										$( event.target ).trigger("touchexceptionend_" + touchtype);
									}
									touchtype = number;
									$( event.target ).trigger( trigerEvent );
								}else{
									if(touchtype == number){
										$( event.target ).trigger( trigerEvent );
									}
								}
							}
							
						});
					}
			};
		});
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
							coords: [ data.clientX, data.clientY ],
							origin: $( event.target )
						};
			},

			stop: function( event ,s) {
				var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] : event;
				return {
							time: ( new Date() ).getTime(),
							coords: [ data.clientX, data.clientY ]
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

				$this.bind( "touchstart_1", function( event ) {
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

					$this.bind( "touchmove_1", moveHandler )
						.one( "touchend_1", function() {
							$this.unbind( "touchmove_1", moveHandler );

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
	
	$.event.special.tip = {
			supressionThreshold: 30, // More than this horizontal displacement, and we will suppress scrolling.

			durationThreshold: 1000, // More time than this, and it isn't a tip.

			eventInfo: function( event ) {
				var data = event.originalEvent.touches[ 0 ];
				return {
					time: ( new Date() ).getTime(),
					coords: [ data.clientX, data.clientY ],
					origin: $( event.target )
				};
			},

			handleTip: function( start, stop ) {
				if ( stop.time - start.time < $.event.special.tip.durationThreshold &&
						Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) < $.event.special.tip.supressionThreshold &&
						Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.tip.supressionThreshold ) {

						start.origin.trigger( "tip", {
							tip:start,
						});
				}
			},

			setup: function() {
				var thisObject = this,
					$this = $( thisObject );
				
				$this.bind( "touchstart_1", function( event ) {
					
					var start = $.event.special.tip.eventInfo( event ),
						stop;
					
					function moveHandler( event ) {
						if ( !start ) {
							event.preventDefault();
							return;
						}
						stop = $.event.special.tip.eventInfo( event ,stop);
						
						if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.tip.supressionThreshold ) {
							event.preventDefault();
						}
					}

					$this.bind( "touchmove_1", moveHandler )
						.one( "touchend_1", function() {
							$this.unbind( "touchmove_1", moveHandler );
							
							stop = $.event.special.tip.eventInfo( event ,stop);
							if ( start && stop ) {
								$.event.special.tip.handleTip( start, stop );
							}
							start = stop = undefined;
							event.preventDefault();
						});
				});
			}
	};
	
	$.event.special.swipeOpenClose = {
			
			eventInfo: function( event ) {
				var data1 = event.originalEvent.touches[ 0 ];
				var data2 = event.originalEvent.touches[ 1 ];
				return {
							time: ( new Date() ).getTime(),
							coords1: [ data1.clientX, data1.clientY ],
							coords2: [ data2.clientX, data2.clientY ],
							center: [ (data1.clientX + data2.clientX)/2, (data1.clientY + data2.clientY)/2 ],
							origin: $( event.target )
						};
			},

			handleSwipe: function( start, stop ) {
				
				var centerMove = [stop.center[0] - start.center[0], stop.center[1] - start.center[1]];
				var scaling = Math.sqrt( Math.pow(stop.coords1[1]-stop.coords2[1],2) + Math.pow(stop.coords1[0]-stop.coords2[0],2)) / Math.sqrt( Math.pow(start.coords1[1]-start.coords2[1],2) + Math.pow(start.coords1[0]-start.coords2[0],2));
				var rate = Math.atan2(start.coords1[1]-start.coords2[1],start.coords1[0]-start.coords2[0]) - Math.atan2(stop.coords1[1]-stop.coords2[1],stop.coords1[0]-stop.coords2[0]);
				start.origin.trigger( "swipeOpenClose", {
					start:start,
					stop:stop,
					centerMove : centerMove,
					rate : rate,
					scaling : scaling
				});
			},

			setup: function() {
				var thisObject = this,
					$this = $( thisObject );
				
				$this.bind( "touchstart_2", function( event ) {
					
					var start = $.event.special.swipeOpenClose.eventInfo( event ),
						stop;
					
					function moveHandler( event ) {
						if ( !start ) {
							start = $.event.special.swipeOpenClose.eventInfo( event );
						}
						stop = $.event.special.swipeOpenClose.eventInfo( event ,stop);
						$.event.special.swipeOpenClose.handleSwipe( start, stop );
						
						start = stop;
						
						event.stopPropagation();
					}

					$this.bind( "touchmove_2", moveHandler )
						.one( "touchend_2", function() {
							$this.unbind( "touchmove_2", moveHandler );

							if ( start && stop ) {
								$.event.special.swipeOpenClose.handleSwipe( start, stop );
							}
							start = stop = undefined;
							event.stopPropagation();
						});
				});
			}
	};

	// add new event shortcuts
	
	var allEvent = "swipeleft swiperight swipe tip swipeOpenClose";
	$.each([1,2,3,4,5], function(index,value){
		allEvent += " touchstart_" + value;
		allEvent += " touchmove_" + value;
		allEvent += " touchend_" + value;
		allEvent += " touchexceptionend_" + value;
	});
	
	$.each( allEvent.split( " " ), function( i, name ) {
		$.fn[ name ] = function( fn ) {
			
			return fn ? this.bind( name, fn ) : this.trigger( name );
		};

		// jQuery < 1.8
		if ( $.attrFn ) {
			$.attrFn[ name ] = true;
		}
	});
})( jQuery, this );
}));