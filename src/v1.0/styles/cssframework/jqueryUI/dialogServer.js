

var $dialog = parent["_ls_dialog"];

$().ready(function(){
	
	if($dialog != null){
		
		var spannum = $dialog.dialog("getSpan");
		spannum = Number(spannum);
		if(spannum>0 && spannum<=24){
			var width = spannum*30 -8;
			$("div.container-pop").css("width",width+"px");
		}
		
		var iframeReady = $dialog.dialog("getIframeReady");
		if(iframeReady!=null && typeof iframeReady === "function"){
			iframeReady.call(document);
		}
	}
	
});