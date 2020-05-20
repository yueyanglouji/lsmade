window.IScroll = window.IScroll || {};

if (!Function.prototype.extend) {
    Function.prototype.extend = function( efunc ){
        var func = this;

        return function(){
            func.apply(this,arguments);
            efunc.apply(this, arguments);
        }
    }
}
window.IScroll.extend = function( object ){
	if(arguments.length <= 0) {
	  throw new Error('Missing arguments in extend function');
	}
	for (key in object) {
		var o = window.IScroll.prototype[key];
		if ( o && (typeof o == "function") ) {
			window.IScroll.prototype[key] = o.extend(object[key]);
		} else {
			window.IScroll.prototype[key] = object[key];
		}
		
	}
}

window.IScroll.extend ({
	isShowHeader: true,
	isProcessHeader: false,
	startY: 0,
	scTop: -1,
	scrollStart: function (){
		this.startY = this.y;
	},
	scroll : function(){
		var currentY = this.y;
		var movedY = this.startY-currentY;
		if ( movedY > 20 && this.y < -200 ) {
			//hidden 
			this._hide();
		} else if ( this.y >= -100 ) {
			this._show();
		}
	},
	scrollEnd : function(){
		if ( this.y >= -100 ) {
			this._show();
		}
	},
	_hide : function(){
		if ( this.isProcessHeader ) { return ;}
		var myMaxScrollY = this.maxScrollY + 110;
		if ( this.y <=  myMaxScrollY) { return ;}
		
		//console.log("hide");
		this.isProcessHeader = true;
		if ( this.isShowHeader==false ) { this.isProcessHeader = false; return ;}
		this.isShowHeader = false;
		var that = this;
		this.scTop = parseInt($(this.wrapper).css("top"));
		
		$("header[data-headroom] > div").each(function(){
			var thisTop = $(this).css("top");
			$(this).attr("_top_", thisTop);
			var topInt = parseInt(thisTop),
				newTopInt = (topInt-that.scTop);
			$(this).animate({ top: newTopInt+"px"}, 500 );
		});
		this.wrapper.style.zIndex = 500;
		$(this.wrapper).animate({ top: "0px"}, 500 );
		var that = this;
		setTimeout(function(){that.refresh();that.isProcessHeader = false;},500);
	},
	_show : function(){
		if ( this.isProcessHeader ) { return ;}
		this.isProcessHeader = true;
		if ( this.isShowHeader==true ) { this.isProcessHeader = false; return ;}
		var that = this;
		
		$("header[data-headroom] > div").each(function(){
			var thisTop = $(this).attr("_top_");
			$(this).animate({ top: thisTop }, 500 );
			$(this).removeAttr("_top_");
		});
		
		$(that.wrapper).animate({ top: that.scTop+"px"}, 500 );
		setTimeout(function(){ that.wrapper.style.zIndex=1;that.refresh();that.isShowHeader = true;that.isProcessHeader = false;},500);
	},
	
	_init: function() {
		this.on('scrollStart', this.scrollStart);
		this.on('scroll', this.scroll);
		this.on('scrollEnd', this.scrollEnd);
	}
});