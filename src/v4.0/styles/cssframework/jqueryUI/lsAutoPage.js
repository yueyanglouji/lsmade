
//_ls_lsautopagea
var $autoPage = null;

$().ready(function(){
	$autoPage = $("a._ls_lsautopagea");
	
	$autoPage.bindItem = function($item){
		
		for(var i=0;i<$item.length;i++){
			var name = $item[i].name;
			var value = $item[i].value;
			value = encodeURI(value);
			if(name!=null && value!=null){
				var append = name + "=" +value;
				for(var j=0;j<$autoPage.length;j++){
					var href = $autoPage[j].href;
					if(href.match(append)){
						continue;
					}else{
						href = href + "&" +append;
						$autoPage[j].href = href
					}
				}
			}
		}
	};
	
	$autoPage.unbindItem = function($item){
		
		for(var i=0;i<$item.length;i++){
			var name = $item[i].name;
			var value = $item[i].value;
			value = encodeURI(value);
			if(name!=null && value!=null){
				var remove = "&" + name + "=" +value;
				for(var j=0;j<$autoPage.length;j++){
					var href = $autoPage[j].href;
					if(href.match(remove) == null){
						continue;
					}else{
						var reg = new RegExp(remove);
						href = href.replace(reg,"");
						$autoPage[j].href = href
					}
				}
			}
		}
	};
	
});