

var $dialog = parent["_ls_dialog"];

$().ready(function(){
	
	if($dialog != null){
		var iframeReady = $dialog.dialog("getIframeReady");
		if(iframeReady!=null && typeof iframeReady === "function"){
			iframeReady.call(document);
		}
	}
	
});