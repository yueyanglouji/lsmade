
$().ready(function(){
	$("a").bind("mouseout",function(){
		this.blur();
	});
});

$().ready(function(){
	var height = document.documentElement.clientHeight;
	$("div.container.full-container").css("height", height + "px");
});

$().ready(function(){
	
	$.fn.extend({
		fixedSpan:function(){
			
			if("ontouchstart" in document){
				return;
			}
			
			var _doit = function($item){
				var width = $item.css("width");
				$item.css("width",width);
			};
			
			for(var i=0;i<$(this).length;i++){
				_doit($($(this)[i]));
			}
		}
	});
	
	$("div.container").fixedSpan();
});

//ls-clearText
$().ready(function(){
	
	$.fn.extend({
		lscleartext: function(){
			var _init = function($item){
				var $text = $($item);
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
					var $lscleartext = $("<span class=\"glyphicon glyphicon-remove ls-ui-icon\" style=\"z-index:100;display:none;\"></span>");
					$a.append($lscleartext);
					
					$text.bind("focus",function(event){
						if($text.val()==""){
							$lscleartext.css("display","none");
							$a.css("display","none");
						}else{
							$lscleartext.css("display","block");
							$a.css("display","block");
						}
					});
					
					$text.bind("blur",function(event){
						setTimeout( function(){
							$lscleartext.css("display","none");
							$a.css("display","none");
						},200);
					});

					$text.on( "keyup change input paste", function(event) {
						
						setTimeout( function(){
							if($text.val()==""){
								$lscleartext.css("display","none");
								$a.css("display","none");
							}else{
								$lscleartext.css("display","block");
								$a.css("display","block");
							}
						}, 100 );
					});
					
					
					$lscleartext.bind("click",function(event){
						$text.val("");
						if($text.val()==""){
							$lscleartext.css("display","none");
							$a.css("display","none");
						}else{
							$lscleartext.css("display","block");
							$a.css("display","block");
						}
						try{
							$text[0].focus();
						}catch(err){}
						$text.trigger("focus");
						return false;
					});
				}
			};
			
			for(var i=0;i<$(this).length;i++){
				_init($($(this)[i]));
			}
		}
	});
	
	$("input[data-lscleartext=true]").lscleartext();
});

//ls-uploadfile
$().ready(function(){
	
	$.fn.extend({
		lsuploadfile:function(){
			var _init = function($item){
				var $oneinput = $($item);
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
				var $viewspan = $("<span class=\"form-control no-br\" style=\"color:black; text-overflow: ellipsis; overflow: hidden;\"></span>");
				var $a = $("");
				if(downloadurl!=null && downloadurl!="" && downloadfilename!=null && downloadfilename!=""){
					$a = $("<a style=\"margin-top:8px;display: inline-block;\" href=\""+ downloadurl +"\">" + downloadfilename + "</a>");
				}
				$viewspan.append($a);
				
				var $selectbtnspan = $("<span class=\"btn btn-default ls-fileinput-button\">" + selectbtn + "</span>");
				$oneinput.appendTo($selectbtnspan);
				
				var $clearbtnspan = $("<span class=\"btn btn-default ls-fileclear-button\">" + clearbtn + "</span>");
				
				var $lsuploadinputdiv = $("<div class=\"ls-upload-input-div span-12\"></div>")
				var $lsuploadbtndiv = $("<div class=\"ls-upload-btn-div span-12\"></div>")
				
				$div.append($lsuploadinputdiv);
				$div.append($lsuploadbtndiv);
				$lsuploadinputdiv.append($viewspan);
				$lsuploadbtndiv.append($selectbtnspan);
				$lsuploadbtndiv.append($clearbtnspan);
				
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
						var $oneinputclone = $oneinput.clone(true);
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
			};
			for(var i=0;i<$(this).length;i++){
				_init($($(this)[i]));
			}
		}
	});
	
	$("input[type=file][name!=].ls-uploadfile").lsuploadfile();
});

//ls-ajaxUploadForm
//$(function(){
//	
//	$.fn.extend({
//		lsajaxuploadform:function(option){
//			
//			var _init = function($form){
//				
//				var keep = {};
//				keep.action = $form.attr("action");
//				
//				var $methodInput = null;
//				if(option && option.method){
//					var method = option.method;
//					$methodInput = $("<input name=\"method:" + method + " value="" \">")
//					$form.append($methodInput);
//				}
//				
//				var url = "";
//				if(option && option.action){
//					$form.attr("action", option.action);
//					url += option.action;
//				}else{
//					url += keep.action;
//				}
//				
//				//var $iframe = $("<iframe id=\"_lsajaxuploadform\" name=\"_lsajaxuploadform\" src=\"\" frameborder=\"no\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" style=\"display:none;\"></iframe>");
//				var $iframe = $("<div id=\"_lsajaxuploadform\" name=\"_lsajaxuploadform\" style=\"display:none;\"></div>");
//				$("body").append($iframe);
//				
//				$iframe.load();
//				
//				
//			};
//			
//			var $this = $(this);
//			for(var i=0;i<$this.length;i++){
//				var item = $this[i];
//				if(item.nodeName.toLowerCase() == "form"){
//					_init($(form));
//				}
//			}
//		}
//	});
//	
//});


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
	$.fn.extend({
		lsvalidate:function(option){
			var _option = {border:true};
			
			var _init = function($init, _option){
				if($init == null){
					$init = $("body");
				}else{
					$init = $($init);
				}
				
				if(_option == null || _option.border){
					var re = $init.find("input[validate=required],textarea[validate=required]");
					for(var i=0;i<re.length;i++){
						if(re[i].value==""){
							$(re[i]).addClass("lsinputrequired-error");
						}else{
							$(re[i]).addClass("lsinputrequired-success");
						}
					}
					
					$init.find("input[validate=required],textarea[validate=required]").bind("blur",function(){
						
						$(this).removeClass("lsinputrequired-forcus");
						if($(this).val()==""){
							$(this).removeClass("lsinputrequired-success");
							$(this).addClass("lsinputrequired-error");
						}else{
							$(this).removeClass("lsinputrequired-error");
							$(this).addClass("lsinputrequired-success");
						}
					});
					
					$init.find("input[validate=required],textarea[validate=required]").bind("focus",function(){
						
						$(this).addClass("lsinputrequired-forcus");
					});
				}
				
				$init.find("input[type=button][validate=true],input[type=submit][validate=true],button[validate=true],a[validate=true]").bind("click",function(){
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
				
			};
			
			if(option != null){
				for(var key in option){
					_option[key] = option[key];
				}
				_init(this, _option);
			}else{
				var $that = $(this);
				if($that.length == 0){
					return false;
				}
				
				for(var i = 0;i<$that.length; i++){
					if($that[i].nodeName.toLowerCase() != "form"){
						return false;
					}
				}
				for(var i = 0;i<$that.length; i++){
					var form = $that[i];
					
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
								return ret;
							}
						}
					}
					
					var thatName = this.name;
					this.name = "";
				}
				return true;
			}
		}
	});
	
	$("body").lsvalidate({border:true});
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

$(function(){
	$.extend({
		showdialogloading: function(timeout){
			if($("#ls_dialog-loading-model").length==0){
				parent.$("#ls_dialog-loading-model").css("display","block");
				parent.$("#ls_dialog-loading").css("display","block");
				if(timeout && timeout>0){
					setTimeout(function(){
						parent.$.closedialogloading();
					}, timeout);
				}
			}else{
				$("#ls_dialog-loading-model").css("display","block");
				$("#ls_dialog-loading").css("display","block");
				if(timeout && timeout>0){
					setTimeout(function(){
						$.closedialogloading();
					}, timeout);
				}
			}
		},
		closedialogloading: function(){
			if($("#ls_dialog-loading-model").length==0){
				parent.$("#ls_dialog-loading-model").css("display","none");
				parent.$("#ls_dialog-loading").css("display","none");
			}else{
				$("#ls_dialog-loading-model").css("display","none");
				$("#ls_dialog-loading").css("display","none");
			}
		}
	});
	
	var _init = function(){
		
		var loadingmodel = "<div id=\"ls_dialog-loading-model\" class=\"ui-widget-overlay\" style=\"display: none;position: fixed;width: 100%;height: 100%;left:0;top:0;filter: alpha(opacity=40); opacity: 0.6; background:#FFFFFF; z-index: 2000;\"></div>";
		var loading = "<div id=\"ls_dialog-loading\" style=\"text-align: center; display: none;position: fixed;top: 50%;left: 50%;margin-left: -21px;margin-top: -40px;z-index: 2001;background-color: none;filter: alpha(opacity=40); opacity: 0.6;\" title=\"loading...\"><img src=\"styles/cssframework/ls/src/loading_deadaef0.gif\"/></div>";
		$("body").append(loadingmodel);
		$("body").append(loading);
		
		$("a:not([data-loading=false])").bind("click",function(e){
			
			var href = $(this).attr("href");
			if(href!=null && href!="" && href!="#" && !href.match("^#")){
				if(parent!=null && parent.location!=null && parent.location.href!=window.location.href){
					parent.$.showdialogloading();
				}else{
					$.showdialogloading();
				}
			}
		});

		$("input[type=submit]:not([data-loading=false]),button[type=submit]:not([data-loading=false])").bind("click",function(e){
			if(parent!=null && parent.location!=null && parent.location.href!=window.location.href){
				parent.$.showdialogloading();
			}else{
				$.showdialogloading();
			}
		});
		
		$("form:not([data-loading=false])").on("submit",function(){
			if(parent!=null && parent.location!=null && parent.location.href!=window.location.href){
				parent.$.showdialogloading();
			}else{
				$.showdialogloading();
			}
		});
		
		$("[data-loading=true]").on("click",function(){
			if(parent!=null && parent.location!=null && parent.location.href!=window.location.href){
				parent.$.showdialogloading();
			}else{
				$.showdialogloading();
			}
		});
		
		if(parent!=null && parent.location!=null && parent.location.href!=window.location.href){
			parent.$.closedialogloading();
		}else{
			$.closedialogloading();
		}
		
	};
	
	_init();
	
});

$(function(){
	$( window ).on( "orientationchange", function( event ) {
		if($(".ui-dialog:visible").length == 0){
			return;
		}
		var width = document.documentElement.clientWidth;
		var dialogwidth = $(".ui-dialog:visible").width();
		
		$(".ui-dialog:visible").css("left",(width - dialogwidth>0?width - dialogwidth:0)/2 + "px");
		
		var height = document.documentElement.clientHeight;
		var dialogheight = $(".ui-dialog:visible").height();
		
		$(".ui-dialog:visible").css("top",(height - dialogheight>0?height - dialogheight:0)/2 + "px");
		
		$(".ui-widget-overlay").css({"width":"100%","height":"100%"});
		
	});
});