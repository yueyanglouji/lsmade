
//if($.browser.msie&&($.browser.version == "6.0"||$.browser.version == "7.0"||$.browser.version == "8.0")){
if (!$.support.leadingWhitespace) {
	$().ready(function(){
		
		var table = $("table.table-striped");
		for(var a=0;a<table.length;a++){
			if($(table[a]).css("background")!=null || $(table[a]).css("background-color")!="transparent" || $(table[a]).attr("style")!=null && $(table[a]).attr("style").toLowerCase().match("background-color|background-image|background:")){
				continue;
			}
			var tbody = $(table[a]).find("tbody");
			for(var b=0;b<tbody.length;b++){
				if($(tbody[b]).css("background")!=null || $(tbody[b]).css("background-color")!="transparent" || $(tbody[b]).attr("style")!=null && $(tbody[b]).attr("style").toLowerCase().match("background-color|background-image|background:")){
					continue;
				}
				
				var tr = $(tbody[b]).find("tr:even");
				for(var c=0;c<tr.length;c++){
					if($(tr[c]).css("background")!=null || $(tr[c]).css("background-color")!="transparent"  || $(tr[c]).attr("style")!=null && $(tr[c]).attr("style").toLowerCase().match("background-color|background-image|background:")){
						continue;
					}
					var td = $(tr[c]).find("td");
					for(var d=0;d<td.length;d++){
						if($(td[d]).css("background")!=null || $(td[d]).css("background-color")!="transparent"  || $(td[d]).attr("style")!=null && $(td[d]).attr("style").toLowerCase().match("background-color|background-image|background:")){
							continue;
						}
						$(td[d]).css("background","none repeat scroll 0 0 #FFFFFF");
					}
				}
				
				var tr = $(tbody[b]).find("tr:odd,tr.even");
				for(var c=0;c<tr.length;c++){
					if($(tr[c]).css("background")!=null || $(tr[c]).css("background-color")!="transparent"  || $(tr[c]).attr("style")!=null && $(tr[c]).attr("style").toLowerCase().match("background-color|background-image|background:")){
						continue;
					}
					var td = $(tr[c]).find("td");
					for(var d=0;d<td.length;d++){
						if($(td[d]).css("background")!=null || $(td[d]).css("background-color")!="transparent"  || $(td[d]).attr("style")!=null && $(td[d]).attr("style").toLowerCase().match("background-color|background-image|background:")){
							continue;
						}
						$(td[d]).css("background","none repeat scroll 0 0 #E5ECF9");
					}
				}
				
			}
		}
	});
	
}