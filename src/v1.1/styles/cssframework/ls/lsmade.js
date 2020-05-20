
$().ready(function(){
	$("a").bind("mouseout",function(){
		this.blur();
	});
});

$().ready(function(){
	if(!/msie/.test(navigator.userAgent.toLowerCase())){
		return;
	}
	var $container = $("div.container");
	if($container.length==0){
		return;
	}
	
	var width = $container.css("width");
	
	$container.css("width",width);
	
	var $showgrid = $("div.showgrid");
	if($showgrid.length!=0){
		var bgimage = $showgrid.css("background-image");
		$showgrid.css("background-image",bgimage);
	}
	
	var $span = $("div.container .span-1,div.container .span-2,div.container .span-3,div.container .span-4,div.container .span-5,div.container .span-6,div.container .span-7,div.container .span-8,div.container .span-9,div.container .span-10,div.container .span-11,div.container .span-12,div.container .span-13,div.container .span-14,div.container .span-15,div.container .span-16,div.container .span-17,div.container .span-18,div.container .span-19,div.container .span-20,div.container .span-21,div.container .span-22,div.container .span-23,div.container .span-24,div.container .column");
	for(var i=0;i<$span.length;i++){
		var $onespan = $($span[i]);
		var spanwidth = $onespan.css("width");
		
		var spanpaddingright = $onespan.css("padding-right");
		var spanpaddingleft = $onespan.css("padding-left");
		var spanmarginleft = $onespan.css("margin-left");
		var spanmarginright = $onespan.css("margin-right");
		
		
		$onespan.css("width",spanwidth);
		$onespan.css("margin-right",spanmarginright);
		$onespan.css("padding-right",spanpaddingright);
		$onespan.css("padding-left",spanpaddingleft);
		$onespan.css("margin-left",spanmarginleft);
		
		if($onespan.hasClass("last")){
			$onespan.css("float","left");
		}
	}
	
});

//ls-clearText
$().ready(function(){
	var $texts = $("input[data-lscleartext=true]");
	for(var i=0;i<$texts.length;i++){
		
		var $text = $($texts[i]);
		
		var $div = $("<div></div>");
		$text.wrap($div);
		$div = $text.parent();
		$div.css({"position":"relative","float":"left"});
		
		var $a = $("<a title=\"clear text\" href=\"#\" style=\"z-index:100;\"></a>");
		$a.addClass("ls-cleartext-a");
		$a.css("display","none");
		
		$text.after($a);
		
		$a.bind("click", function(){
			return false;
		});
		
		if($text.data("lscleartext") == true){
			var $lscleartext = $("<span class=\"glyphicon glyphicon-remove ls-ui-icon\" style=\"color:white;z-index:100;display:none;\"></span>");
			$a.append($lscleartext);
			
			$text.bind("focus",{"$text":$text,"$lscleartext":$lscleartext,"$a":$a},function(event){
				if(event.data.$text.val()==""){
					event.data.$lscleartext.css("display","none");
					event.data.$a.css("display","none");
				}else{
					event.data.$lscleartext.css("display","block");
					event.data.$a.css("display","block");
				}
			});
			
			$text.bind("blur",{"$text":$text,"$lscleartext":$lscleartext,"$a":$a},function(event){
				setTimeout( function(){
					event.data.$lscleartext.css("display","none");
					event.data.$a.css("display","none");
				},100);
			});

			$text.on( "keyup change input paste", {"$text":$text,"$lscleartext":$lscleartext,"$a":$a}, function(event) {
				
				setTimeout( function(){
					if(event.data.$text.val()==""){
						event.data.$lscleartext.css("display","none");
						event.data.$a.css("display","none");
					}else{
						event.data.$lscleartext.css("display","block");
						event.data.$a.css("display","block");
					}
				}, 100 );
			});
			
			
			$lscleartext.bind("click",{"$text":$text,"$lscleartext":$lscleartext,"$a":$a},function(event){
				event.data.$text.val("");
				if(event.data.$text.val()==""){
					event.data.$lscleartext.css("display","none");
					event.data.$a.css("display","none");
				}else{
					event.data.$lscleartext.css("display","block");
					event.data.$a.css("display","block");
				}
				try{
					(event.data.$text)[0].focus();
				}catch(err){}
				event.data.$text.trigger("focus");
				return false;
			});
			
			
		}
		
	
	}
});


//ls-uploadfile
$().ready(function(){
	var $input = $("input[type=file][name!=].ls-uploadfile");
	
	for(var i=0;i<$input.length;i++){
		var $oneinput = $($input[i]);
		var name = $oneinput.attr("name");
		var downloadurl = $oneinput.data("downloadurl");
		var downloadfilename = $oneinput.data("downloadfilename");
		var selectbtn = $oneinput.data("selectbtn");
		if(selectbtn==null || selectbtn==""){
			selectbtn = "select";
		}
		var clearbtn = $oneinput.data("clearbtn");
		if(clearbtn==null || clearbtn==""){
			clearbtn = "clear";
		}
		var $div = $("<div class=\"ls-file-upload-inline\"></div>");
		$div.appendTo($oneinput.parent());
		var $viewspan = $("<span class=\"input-large uneditable-input\" style=\"color:black;\"></span>");
		var $a = $("");
		if(downloadurl!=null && downloadurl!="" && downloadfilename!=null && downloadfilename!=""){
			$a = $("<a href=\""+ downloadurl +"\">" + downloadfilename + "</a>");
		}
		$viewspan.append($a);
		
		var $selectbtnspan = $("<span class=\"btn ls-fileinput-button\">" + selectbtn + "</span>");
		$oneinput.appendTo($selectbtnspan);
		
		var $clearbtnspan = $("<span class=\"btn ls-fileclear-button\">" + clearbtn + "</span>");
		
		$div.append($viewspan)
		$div.append($("<span>&nbsp;</span>"));
		$div.append($selectbtnspan);
		$div.append($("<span>&nbsp;</span>"));
		$div.append($clearbtnspan);
		
		$oneinput.bind("change",function(event){
			var filepath = this.value;
			var filename = filepath.substr(filepath.lastIndexOf("\\")+1);
			$viewspan.html(filename);
		});
		
		$clearbtnspan.bind("click",function(event){
			
			if($viewspan.find("a").length!=0){
				if(false === $oneinput.trigger("ls-beforeclearfile")){
					return false;
				}
				
				$a = $("");
				$viewspan.html("");
				$viewspan.append($a);
				
				$oneinput.trigger("ls-afterclearfile");
			}else{
				$oneinputclone = $oneinput.clone(true);
				$oneinput.remove();
				$oneinput.val("");
				$oneinput = $oneinputclone;
				$oneinput.val("");
				$oneinput.appendTo($selectbtnspan);
				
				$viewspan.html("");
				$a.html(downloadfilename);
				$viewspan.append($a);
			}
			
		});
	}
});

//ls-fluidtable
$().ready(function(){
	var $lsleftfluidtable = $("table.ls-fluidtable");
	if($lsleftfluidtable.length==0){
		return;
	}
	
	$tds = $lsleftfluidtable.find("tbody tr").find("td:first");
	if($tds.length==0){
		return;
	}
	for(var i=0;i<$tds.length;i++){
		var $td = $($tds[i]);
		var style = $td.attr("style");
		if(style==null) style = "";
		var bgcolor = $td[0].style.backgroundColor;
		if((bgcolor==null  || bgcolor=="" || bgcolor=="transparent") && !style.toLowerCase().match(/background-color|background-image|background:/)){
			$td.css("background-color","#C3D9FF");
		}
		if(!style.match("border:")){
			var borderStyle = $td[0].style.borderStyle;
			if((borderStyle==null || borderStyle=="") && !style.toLowerCase().match("border-style")){
				$td.css("border-style","solid");
			}
			var borderWidth = $td[0].style.borderWidth;
			if((borderWidth==null || borderWidth=="") && !style.toLowerCase().match("border-width")){
				$td.css("border-width","1px");
			}
			var borderColor = $td[0].style.borderColor;
			if((borderColor==null || borderColor=="") && !style.toLowerCase().match("border-color")){
				$td.css("border-color","#008080");
			}
		}
	}
});

$().ready(function(){
	
	var re = $("input[validate=required],textarea[validate=required]");
	for(var i=0;i<re.length;i++){
		if(re[i].value==""){
			$(re[i]).addClass("lsinputrequired-error");
		}else{
			$(re[i]).addClass("lsinputrequired-success");
		}
	}
	
	$("input[validate=required],textarea[validate=required]").bind("blur",function(){
		
		$(this).removeClass("lsinputrequired-forcus");
		if($(this).val()==""){
			$(this).removeClass("lsinputrequired-success");
			$(this).addClass("lsinputrequired-error");
		}else{
			$(this).removeClass("lsinputrequired-error");
			$(this).addClass("lsinputrequired-success");
		}
	});

	$("input[validate=required],textarea[validate=required]").bind("focus",function(){
		
		$(this).addClass("lsinputrequired-forcus");
	});
	
	$("input[type=button][validate=true],input[type=submit][validate=true],button[validate=true],a[validate=true]").bind("click",function(){
		var form = this.form;
		var $that = $(this);
		$that.addClass("disabled");
		$that.attr("disabled","disabled");
		
		var validateElements = $(form).find("input[type!=button][type!=submit][validate],textarea[validate],select[validate]");
		for(var i=0;i<validateElements.length;i++){
			var validateType = $(validateElements[i]).attr("validate");
			if(validateType == null || validateType==""){
				continue;
			}
			var name = $(validateElements[i]).attr("name");
			if(name == null || name == ""){
				continue;
			}
			var splitvalidateType = validateType.split(/\s+/);
			var ret = true;
			
			for(var j=0;j<splitvalidateType.length;j++){
				
				var ret = window["_lsValidate" + splitvalidateType[j].charAt(0).toUpperCase() + splitvalidateType[j].substring(1)](validateElements[i]);
				if(ret == false){
					$that.removeClass("disabled");
					$that.removeAttr("disabled");
					return ret;
				}
			}
		}
		
		var thatName = this.name;
		this.name = "";
		$(form).append($("<input type=\"hidden\" name=\""+ thatName +"\" value=\"\">"))
		
		$that.removeClass("disabled");
		$that.removeAttr("disabled");
		
		return true;
	});
});

var _lsValidateRequired = function(item){
	var $item = $(item)
	var status = false;
	
	var form = item.form;
	var name = item.name;
	var type = item.type.toLowerCase();
	if(type == "radio" || type == "checkbox"){
		var $sameItems = $(form).find("input[name='" + name + "']:checked");
		if($sameItems.length != 0){
			status = true;
		}
	}else{
		var value = item.value;
		if(value != null && value!="" && !value.match(/^\s*$/)){
			status = true;
		}
	}
	
	if(status == false){
		var message = $item.attr("message");
		if(message==null||message==""){
			
			message = name +" is required";
		}
		try{
			item.focus();
		}catch(err){}
		jAlert(message, 'Message');
		return false;
	}
};

