
$().ready(function(){
	$("a").bind("mouseout",function(){
		this.blur();
	});
});

$().ready(function(){
	var height = document.documentElement.clientHeight;
	$("div.container.full-container").css("height", height + "px");
});

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

$().ready(function(){
	$("div.container").fixedSpan();
});

//ls-clearText
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
$().ready(function(){
	$("input[data-lscleartext=true]").lscleartext();
});

//ls-uploadfile
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
				$a = $("<a style=\"margin-top:0px;display: inline-block;\" href=\""+ downloadurl +"\">" + downloadfilename + "</a>");
			}
			$viewspan.append($a);

			var $selectbtnspan = $("<span class=\"btn btn-outline-info ls-fileinput-button\">" + selectbtn + "</span>");
			$oneinput.appendTo($selectbtnspan);

			var $clearbtnspan = $("<span class=\"btn btn-outline-secondary ls-fileclear-button\">" + clearbtn + "</span>");

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

$().ready(function(){
	$("input[type=file][name!=''].ls-uploadfile").lsuploadfile();
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
			$td.css("background-color","#bee5eb");
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
				$td.css("border-color","#dee2e6");
			}
		}
	}
});

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
$().ready(function(){
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

$.extend({
	_dialogloadinghasinit:false,
	showdialogloading: function(timeout){
		if(!$._dialogloadinghasinit){
			$._dialogloading_init();
		}
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
		if(!$._dialogloadinghasinit){
			$._dialogloading_init();
		}
		if($("#ls_dialog-loading-model").length==0){
			parent.$("#ls_dialog-loading-model").css("display","none");
			parent.$("#ls_dialog-loading").css("display","none");
		}else{
			$("#ls_dialog-loading-model").css("display","none");
			$("#ls_dialog-loading").css("display","none");
		}
	},
	_dialogloading_init: function(){
		if($._dialogloadinghasinit){
			return;
		}
		$._dialogloadinghasinit = true;
		var loadingmodel = "<div id=\"ls_dialog-loading-model\" class=\"ui-widget-overlay\" style=\"display: none;position: fixed;width: 100%;height: 100%;left:0;top:0;filter: alpha(opacity=40); opacity: 0.6; background:#FFFFFF; z-index: 2000;\"></div>";
		var loading = "<div id=\"ls_dialog-loading\" style=\"text-align: center; display: none;position: fixed;top: 50%;left: 50%;margin-left: -21px;margin-top: -40px;z-index: 2001;background-color: none;filter: alpha(opacity=40); opacity: 0.6;\" title=\"loading...\"><img src=\"data:image/gif;base64,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\"/></div>";
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
	}
});

$(function(){
	$._dialogloading_init();
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
