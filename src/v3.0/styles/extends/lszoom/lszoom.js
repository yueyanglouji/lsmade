var _lszoom_hideMenu = null;
var _lszoom_attribute = {};
$(function(){
	
	$.event.special.tipclick = {
			setup: function() {
				var thisObject = this,
					$this = $( thisObject );
				var height = $this.css("height");
					$this.attr("bheight",height);
				
				var eableMoveWidth = 30;
				var eableMoveHeight = 30;
				
				var begin = null,end = null;
				
				if("ontouchstart" in document){
					return;
				}
					
				$this.bind( "mousedown", function( event ) {
					var screenX = event.screenX;
					var screenY = event.screenY;
					begin = {screenX:screenX,screenY:screenY};
				});
				$this.bind( "mouseup", function( event ) {
					var screenX = event.screenX;
					var screenY = event.screenY;
					end = {screenX:screenX,screenY:screenY};
					
					if(Math.abs(end.screenX - begin.screenX) <=eableMoveWidth && Math.abs(end.screenY - begin.screenY) <= eableMoveHeight){
						$this.trigger("tipclick");
					}else{
						event.preventDefault();
					}
				});
				
			}
	};
	
	$.extend({
		lszoomSetAttribute: function(key,value){
			_lszoom_attribute[key] = value;
		},
		lszoomGetAttribute: function(key){
			return _lszoom_attribute[key];
		},
		lszoomExtends: function(ext){
			$("#append_parent").append($(ext));
		}
	});
	$.fn.extend({
		lszoom:function(methodOrParam){
			
			var lszoomoption = function(){
				return $.lszoomGetAttribute("_lszoomoption");
			}
			
			if ( (typeof methodOrParam).toLowerCase() === "string" ) {
				var method = eval(methodOrParam);
				if ( (typeof method).toLowerCase() === "function" ) {
					return method(this);
				}
				return;
			}
			if ( (typeof methodOrParam).toLowerCase() === "object" ) {
				var option = methodOrParam;
				$.lszoomSetAttribute("_lszoomoption", option);
			}
			
			var IMGDIR = "http://static.bbs.xiaomi.cn/static/image/xiaomibbs3";
			var SITEURL = "http://bbs.xiaomi.cn/";

			var BROWSER = {};
			var USERAGENT = navigator.userAgent.toLowerCase();
			browserVersion({'ie':'msie','firefox':'','chrome':'','opera':'','safari':'','mozilla':'','webkit':'','maxthon':'','qq':'qqbrowser'});
			if(BROWSER.safari) {
				BROWSER.firefox = true;
			}
			BROWSER.opera = BROWSER.opera ? opera.version() : 0;
			HTMLNODE = document.getElementsByTagName('head')[0].parentNode;
			if(BROWSER.ie) {
				BROWSER.iemode = parseInt(typeof document.documentMode != 'undefined' ? document.documentMode : BROWSER.ie);HTMLNODE.className = 'ie_all ie' + BROWSER.iemode;
			}
			var CSSLOADED = [];var JSLOADED = [];
			var JSMENU = [];
			JSMENU['active'] = [];
			JSMENU['timer'] = [];
			JSMENU['drag'] = [];
			JSMENU['layer'] = 0;
			JSMENU['zIndex'] = {'win':200,'menu':300,'dialog':400,'prompt':500};
			JSMENU['float'] = '';

			var CURRENTSTYPE = null;
			var discuz_uid = isUndefined(discuz_uid) ? 0 : discuz_uid;
			var creditnotice = isUndefined(creditnotice) ? '' : creditnotice;
			var cookiedomain = isUndefined(cookiedomain) ? '' : cookiedomain;
			var cookiepath = isUndefined(cookiepath) ? '' : cookiepath;

			var EXTRAFUNC = [], 
			EXTRASTR = '';
			EXTRAFUNC['showmenu'] = [];
			var DISCUZCODE = [];
			DISCUZCODE['num'] = '-1';
			DISCUZCODE['html'] = [];
			var USERABOUT_BOX = true;
			var USERCARDST = null;
			var CLIPBOARDSWFDATA = '';
			var NOTICETITLE = [];
			var NOTICECURTITLE = document.title;
			if(BROWSER.firefox && window.HTMLElement) {
				HTMLElement.prototype.__defineGetter__( "innerText", function(){var anyString = "";var childS = this.childNodes;for(var i=0; i <childS.length; i++) {if(childS[i].nodeType==1) {anyString += childS[i].tagName=="BR" ? '\n' : childS[i].innerText;} else if(childS[i].nodeType==3) {anyString += childS[i].nodeValue;}}return anyString;});HTMLElement.prototype.__defineSetter__( "innerText", function(sText){this.textContent=sText;});HTMLElement.prototype.__defineSetter__('outerHTML', function(sHTML) {var r = this.ownerDocument.createRange();r.setStartBefore(this);var df = r.createContextualFragment(sHTML);this.parentNode.replaceChild(df,this);return sHTML;});HTMLElement.prototype.__defineGetter__('outerHTML', function() {var attr;var attrs = this.attributes;var str = '<' + this.tagName.toLowerCase();for(var i = 0;i < attrs.length;i++){attr = attrs[i];if(attr.specified)str += ' ' + attr.name + '="' + attr.value + '"';}if(!this.canHaveChildren) {return str + '>';}return str + '>' + this.innerHTML + '</' + this.tagName.toLowerCase() + '>';});HTMLElement.prototype.__defineGetter__('canHaveChildren', function() {switch(this.tagName.toLowerCase()) {case 'area':case 'base':case 'basefont':case 'col':case 'frame':case 'hr':case 'img':case 'br':case 'input':case 'isindex':case 'link':case 'meta':case 'param':return false;}return true;});
			}
			function __$$(id) {return !id ? null : document.getElementById(id);}
			function __$$C(classname, ele, tag) {var returns = [];ele = ele || document;tag = tag || '*';if(ele.getElementsByClassName) {var eles = ele.getElementsByClassName(classname);if(tag != '*') {for (var i = 0, L = eles.length; i < L; i++) {if (eles[i].tagName.toLowerCase() == tag.toLowerCase()) {returns.push(eles[i]);}}} else {returns = eles;}}else {eles = ele.getElementsByTagName(tag);var pattern = new RegExp("(^|\\s)"+classname+"(\\s|__$$)");for (i = 0, L = eles.length; i < L; i++) {if (pattern.test(eles[i].className)) {returns.push(eles[i]);}}}return returns;}
			function _attachEvent(obj, evt, func, eventobj) {eventobj = !eventobj ? obj : eventobj;if(obj.addEventListener) {obj.addEventListener(evt, func, false);} else if(eventobj.attachEvent) {obj.attachEvent('on' + evt, func);}}
			function _detachEvent(obj, evt, func, eventobj) {eventobj = !eventobj ? obj : eventobj;if(obj.removeEventListener) {obj.removeEventListener(evt, func, false);} else if(eventobj.detachEvent) {obj.detachEvent('on' + evt, func);}}
			function browserVersion(types) {
				var other = 1;
				for (i in types) {
					var v = types[i] ? types[i] : i;
					if (USERAGENT.indexOf(v) != -1) {
						var re = new RegExp(v + '(\\/|\\s)([\\d\\.]+)', 'ig');
						var matches = re.exec(USERAGENT);
						var ver = matches != null ? matches[2] : 0;
						other = ver !== 0 && v != 'mozilla' ? 0 : other;
					} else {
						var ver = 0;
					}
					eval('BROWSER.' + i + '= ver');
				}
				BROWSER.other = other;
			}
			function getEvent() {if(document.all) return window.event;func = getEvent.caller;while(func != null) {var arg0 = func.arguments[0];if (arg0) {if((arg0.constructor  == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {return arg0;}}func=func.caller;}return null;}
			function isUndefined(variable) {return typeof variable == 'undefined' ? true : false;}
			function in_array(needle, haystack) {if(typeof needle == 'string' || typeof needle == 'number') {for(var i in haystack) {if(haystack[i] == needle) {return true;}}}return false;}
			function trim(str) {return (str + '').replace(/(\s+)__$$/g, '').replace(/^\s+/g, '');}
			function strlen(str) {return (BROWSER.ie && str.indexOf('\n') != -1) ? str.replace(/\r?\n/g, '_').length : str.length;}
			function mb_strlen(str) {var len = 0;for(var i = 0; i < str.length; i++) {len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;}return len;}
			function mb_cutstr(str, maxlen, dot) {var len = 0;var ret = '';var dot = !dot ? '...' : dot;maxlen = maxlen - dot.length;for(var i = 0; i < str.length; i++) {len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;if(len > maxlen) {ret += dot;break;}ret += str.substr(i, 1);}return ret;}
			function preg_replace(search, replace, str, regswitch) {var regswitch = !regswitch ? 'ig' : regswitch;var len = search.length;for(var i = 0; i < len; i++) {re = new RegExp(search[i], regswitch);str = str.replace(re, typeof replace == 'string' ? replace : (replace[i] ? replace[i] : replace[0]));}return str;}
			function htmlspecialchars(str) {return preg_replace(['&', '<', '>', '"'], ['&amp;', '&lt;', '&gt;', '&quot;'], str);}
			function display(id) {var obj = __$$(id);if(obj.style.visibility) {obj.style.visibility = obj.style.visibility == 'visible' ? 'hidden' : 'visible';} else {obj.style.display = obj.style.display == '' ? 'none' : '';}}
			function checkall(form, prefix, checkall) {var checkall = checkall ? checkall : 'chkall';count = 0;for(var i = 0; i < form.elements.length; i++) {var e = form.elements[i];if(e.name && e.name != checkall && !e.disabled && (!prefix || (prefix && e.name.match(prefix)))) {e.checked = form.elements[checkall].checked;if(e.checked) {count++;}}}return count;}
			function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {if(cookieValue == '' || seconds < 0) {cookieValue = '';seconds = -2592000;}if(seconds) {var expires = new Date();expires.setTime(expires.getTime() + seconds * 1000);}domain = !domain ? cookiedomain : domain;path = !path ? cookiepath : path;document.cookie = escape(cookiepre + cookieName) + '=' + escape(cookieValue)+ (expires ? '; expires=' + expires.toGMTString() : '')+ (path ? '; path=' + path : '/')+ (domain ? '; domain=' + domain : '')+ (secure ? '; secure' : '');}
			function getcookie(name, nounescape) {name = cookiepre + name;var cookie_start = document.cookie.indexOf(name);var cookie_end = document.cookie.indexOf(";", cookie_start);if(cookie_start == -1) {return '';} else {var v = document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length));return !nounescape ? unescape(v) : v;}}
			function Ajax(recvType, waitId) {var aj = new Object();aj.loading = '请稍候...';aj.recvType = recvType ? recvType : 'XML';aj.waitId = waitId ? __$$(waitId) : null;aj.resultHandle = null;aj.sendString = '';aj.targetUrl = '';aj.setLoading = function(loading) {if(typeof loading !== 'undefined' && loading !== null) aj.loading = loading;};aj.setRecvType = function(recvtype) {aj.recvType = recvtype;};aj.setWaitId = function(waitid) {aj.waitId = typeof waitid == 'object' ? waitid : __$$(waitid);};aj.createXMLHttpRequest = function() {var request = false;if(window.XMLHttpRequest) {request = new XMLHttpRequest();if(request.overrideMimeType) {request.overrideMimeType('text/xml');}} else if(window.ActiveXObject) {var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];for(var i=0; i<versions.length; i++) {try {request = new ActiveXObject(versions[i]);if(request) {return request;}} catch(e) {}}}return request;};aj.XMLHttpRequest = aj.createXMLHttpRequest();aj.showLoading = function() {if(aj.waitId && (aj.XMLHttpRequest.readyState != 4 || aj.XMLHttpRequest.status != 200)) {aj.waitId.style.display = '';aj.waitId.innerHTML = '<span><img src="' + IMGDIR + '/loading.gif" class="vm"> ' + aj.loading + '</span>';}};aj.processHandle = function() {if(aj.XMLHttpRequest.readyState == 4 && aj.XMLHttpRequest.status == 200) {if(aj.waitId) {aj.waitId.style.display = 'none';}if(aj.recvType == 'HTML') {aj.resultHandle(aj.XMLHttpRequest.responseText, aj);} else if(aj.recvType == 'XML') {if(!aj.XMLHttpRequest.responseXML || !aj.XMLHttpRequest.responseXML.lastChild || aj.XMLHttpRequest.responseXML.lastChild.localName == 'parsererror') {aj.resultHandle('<a href="' + aj.targetUrl + '" target="_blank" style="color:red">内部错误，无法显示此内容</a>' , aj);} else {aj.resultHandle(aj.XMLHttpRequest.responseXML.lastChild.firstChild.nodeValue, aj);}} else if(aj.recvType == 'JSON') {var s = null;try {s = (new Function("return ("+aj.XMLHttpRequest.responseText+")"))();} catch (e) {s = null;}aj.resultHandle(s, aj);}}};aj.get = function(targetUrl, resultHandle) {targetUrl = hostconvert(targetUrl);setTimeout(function(){aj.showLoading()}, 250);aj.targetUrl = targetUrl;aj.XMLHttpRequest.onreadystatechange = aj.processHandle;aj.resultHandle = resultHandle;var attackevasive = isUndefined(attackevasive) ? 0 : attackevasive;if(window.XMLHttpRequest) {aj.XMLHttpRequest.open('GET', aj.targetUrl);aj.XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');aj.XMLHttpRequest.send(null);} else {aj.XMLHttpRequest.open("GET", targetUrl, true);aj.XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');aj.XMLHttpRequest.send();}};aj.post = function(targetUrl, sendString, resultHandle) {targetUrl = hostconvert(targetUrl);setTimeout(function(){aj.showLoading()}, 250);aj.targetUrl = targetUrl;aj.sendString = sendString;aj.XMLHttpRequest.onreadystatechange = aj.processHandle;aj.resultHandle = resultHandle;aj.XMLHttpRequest.open('POST', targetUrl);aj.XMLHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');aj.XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');aj.XMLHttpRequest.send(aj.sendString);};aj.getJSON = function(targetUrl, resultHandle) {aj.setRecvType('JSON');aj.get(targetUrl+'&ajaxdata=json', resultHandle);};aj.getHTML = function(targetUrl, resultHandle) {aj.setRecvType('HTML');aj.get(targetUrl+'&ajaxdata=html', resultHandle);};return aj;}
			function getHost(url) {var host = "null";if(typeof url == "undefined"|| null == url) {url = window.location.href;}var regex = /^\w+\:\/\/([^\/]*).*/;var match = url.match(regex);if(typeof match != "undefined" && null != match) {host = match[1];}return host;}
			function hostconvert(url) {if(!url.match(/^https?:\/\//)) url = SITEURL + url;var url_host = getHost(url);var cur_host = getHost().toLowerCase();if(url_host && cur_host != url_host) {url = url.replace(url_host, cur_host);}return url;}
			function newfunction(func) {var args = [];for(var i=1; i<arguments.length; i++) args.push(arguments[i]);return function(event) {doane(event);window[func].apply(window, args);return false;}}
			function evalscript(s) {if(s.indexOf('<script') == -1) return s;var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;var arr = [];while(arr = p.exec(s)) {var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;var arr1 = [];arr1 = p1.exec(arr[0]);if(arr1) {appendscript(arr1[1], '', arr1[2], arr1[3]);} else {p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;arr1 = p1.exec(arr[0]);appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);}}return s;}
			var safescripts = {}, evalscripts = [];
			function safescript(id, call, seconds, times, timeoutcall, endcall, index) {seconds = seconds || 1000;times = times || 0;var checked = true;try {if(typeof call == 'function') {call();} else {eval(call);}} catch(e) {checked = false;}if(!checked) {if(!safescripts[id] || !index) {safescripts[id] = safescripts[id] || [];safescripts[id].push({'times':0,'si':setInterval(function () {safescript(id, call, seconds, times, timeoutcall, endcall, safescripts[id].length);}, seconds)});} else {index = (index || 1) - 1;safescripts[id][index]['times']++;if(safescripts[id][index]['times'] >= times) {clearInterval(safescripts[id][index]['si']);if(typeof timeoutcall == 'function') {timeoutcall();} else {eval(timeoutcall);}}}} else {try {index = (index || 1) - 1;if(safescripts[id][index]['si']) {clearInterval(safescripts[id][index]['si']);}if(typeof endcall == 'function') {endcall();} else {eval(endcall);}} catch(e) {}}}
			function __$$F(func, args, script) {
				var run = function () {
					var argc = args.length, 
					s = '';
					for(i = 0;i < argc;i++) {
						s += ',args[' + i + ']';
					}
					eval('var check = typeof ' + func + ' == \'function\'');
					if(check) {
						eval(func + '(' + s.substr(1) + ')');
					}else {
						setTimeout(function () {checkrun();}, 50);
					}
				};
				var checkrun = function () {
					if(JSLOADED[src]) {
						run();
					}else {
						setTimeout(function () {checkrun();}, 50);
					}
				};
				script = script || 'common_extra';src = JSPATH + script + '.js?' + VERHASH;if(!JSLOADED[src]) {appendscript(src);}checkrun();
			}
			function appendscript(src, text, reload, charset) {var id = hash(src + text);if(!reload && in_array(id, evalscripts)) return;if(reload && __$$(id)) {__$$(id).parentNode.removeChild(__$$(id));}evalscripts.push(id);var scriptNode = document.createElement("script");scriptNode.type = "text/javascript";scriptNode.id = id;scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);try {if(src) {scriptNode.src = src;scriptNode.onloadDone = false;scriptNode.onload = function () {scriptNode.onloadDone = true;JSLOADED[src] = 1;};scriptNode.onreadystatechange = function () {if((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {scriptNode.onloadDone = true;JSLOADED[src] = 1;}};} else if(text){scriptNode.text = text;}document.getElementsByTagName('head')[0].appendChild(scriptNode);} catch(e) {}}
			function hash(string, length) {var length = length ? length : 32;var start = 0;var i = 0;var result = '';filllen = length - string.length % length;for(i = 0; i < filllen; i++){string += "0";}while(start < string.length) {result = stringxor(result, string.substr(start, length));start += length;}return result;}
			function stringxor(s1, s2) {var s = '';var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';var max = Math.max(s1.length, s2.length);for(var i=0; i<max; i++) {var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);s += hash.charAt(k % 52);}return s;}
			function showPreview(val, id) {var showObj = __$$(id);if(showObj) {showObj.innerHTML = val.replace(/\n/ig, "<bupdateseccoder />");}}
			function showloading(display, waiting) {var display = display ? display : 'block';var waiting = waiting ? waiting : '请稍候...';__$$('ajaxwaitid').innerHTML = waiting;__$$('ajaxwaitid').style.display = display;}
			function ajaxinnerhtml(showid, s) {if(showid.tagName != 'TBODY') {showid.innerHTML = s;} else {while(showid.firstChild) {showid.firstChild.parentNode.removeChild(showid.firstChild);}var div1 = document.createElement('DIV');div1.id = showid.id+'_div';div1.innerHTML = '<table><tbody id="'+showid.id+'_tbody">'+s+'</tbody></table>';__$$('append_parent').appendChild(div1);var trs = div1.getElementsByTagName('TR');var l = trs.length;for(var i=0; i<l; i++) {showid.appendChild(trs[0]);}var inputs = div1.getElementsByTagName('INPUT');var l = inputs.length;for(var i=0; i<l; i++) {showid.appendChild(inputs[0]);}div1.parentNode.removeChild(div1);}}
			function doane(event, preventDefault, stopPropagation) {var preventDefault = isUndefined(preventDefault) ? 1 : preventDefault;var stopPropagation = isUndefined(stopPropagation) ? 1 : stopPropagation;e = event ? event : window.event;if(!e) {e = getEvent();}if(!e) {return null;}if(preventDefault) {if(e.preventDefault) {e.preventDefault();} else {e.returnValue = false;}}if(stopPropagation) {if(e.stopPropagation) {e.stopPropagation();} else {e.cancelBubble = true;}}return e;}
			function loadcss(cssname) {if(!CSSLOADED[cssname]) {if(!__$$('css_' + cssname)) {css = document.createElement('link');css.id = 'css_' + cssname,css.type = 'text/css';css.rel = 'stylesheet';css.href = 'data/cache/style_' + STYLEID + '_' + cssname + '.css?' + VERHASH;var headNode = document.getElementsByTagName("head")[0];headNode.appendChild(css);} else {__$$('css_' + cssname).href = 'data/cache/style_' + STYLEID + '_' + cssname + '.css?' + VERHASH;}CSSLOADED[cssname] = 1;}}
			function showMenu(v) {
				var ctrlid = isUndefined(v['ctrlid']) ? v : v['ctrlid'];
				var showid = isUndefined(v['showid']) ? ctrlid : v['showid'];
				var menuid = isUndefined(v['menuid']) ? showid + '_menu' : v['menuid'];
				var ctrlObj = __$$(ctrlid);var menuObj = __$$(menuid);
				if(!menuObj) return;
				var mtype = isUndefined(v['mtype']) ? 'menu' : v['mtype'];
				var evt = isUndefined(v['evt']) ? 'mouseover' : v['evt'];
				var pos = isUndefined(v['pos']) ? '43' : v['pos'];
				var layer = isUndefined(v['layer']) ? 1 : v['layer'];
				var duration = isUndefined(v['duration']) ? 2 : v['duration'];
				var timeout = isUndefined(v['timeout']) ? 250 : v['timeout'];
				var maxh = isUndefined(v['maxh']) ? 600 : v['maxh'];
				var cache = isUndefined(v['cache']) ? 1 : v['cache'];
				var drag = isUndefined(v['drag']) ? '' : v['drag'];
				var dragobj = drag && __$$(drag) ? __$$(drag) : menuObj;
				var fade = isUndefined(v['fade']) ? 0 : v['fade'];
				var cover = isUndefined(v['cover']) ? 0 : v['cover'];
				var zindex = isUndefined(v['zindex']) ? JSMENU['zIndex']['menu'] : v['zindex'];
				var ctrlclass = isUndefined(v['ctrlclass']) ? '' : v['ctrlclass'];
				var winhandlekey = isUndefined(v['win']) ? '' : v['win'];zindex = cover ? zindex + 500 : zindex;
				if(typeof JSMENU['active'][layer] == 'undefined') {
					JSMENU['active'][layer] = [];
				}
				for(i in EXTRAFUNC['showmenu']) {
					try {
						eval(EXTRAFUNC['showmenu'][i] + '()');
					}catch(e){}
				}
				if(evt == 'click' && in_array(menuid, JSMENU['active'][layer]) && mtype != 'win') {
					hideMenu(menuid, mtype);return;
				}
				if(mtype == 'menu') {
					hideMenu(layer, mtype);
				}
				if(ctrlObj) {
					if(!ctrlObj.getAttribute('initialized')) {ctrlObj.setAttribute('initialized', true);ctrlObj.unselectable = true;ctrlObj.outfunc = typeof ctrlObj.onmouseout == 'function' ? ctrlObj.onmouseout : null;ctrlObj.onmouseout = function() {if(this.outfunc) this.outfunc();if(duration < 3 && !JSMENU['timer'][menuid]) {JSMENU['timer'][menuid] = setTimeout(function () {hideMenu(menuid, mtype);}, timeout);}};ctrlObj.overfunc = typeof ctrlObj.onmouseover == 'function' ? ctrlObj.onmouseover : null;ctrlObj.onmouseover = function(e) {doane(e);if(this.overfunc) this.overfunc();if(evt == 'click') {clearTimeout(JSMENU['timer'][menuid]);JSMENU['timer'][menuid] = null;} else {for(var i in JSMENU['timer']) {if(JSMENU['timer'][i]) {clearTimeout(JSMENU['timer'][i]);JSMENU['timer'][i] = null;}}}};}
				}
				if(!menuObj.getAttribute('initialized')) {
					menuObj.setAttribute('initialized', true);
					menuObj.ctrlkey = ctrlid;
					menuObj.mtype = mtype;
					menuObj.layer = layer;
					menuObj.cover = cover;
					if(ctrlObj && ctrlObj.getAttribute('fwin')) {
						menuObj.scrolly = true;
					}menuObj.style.position = 'absolute';
					menuObj.style.zIndex = zindex + layer;
					menuObj.onclick = function(e) {
						return doane(e, 0, 1);
					};
					if(duration < 3) {
						if(duration > 1) {
							menuObj.onmouseover = function() {
								clearTimeout(JSMENU['timer'][menuid]);
								JSMENU['timer'][menuid] = null;
							};
						}
						if(duration != 1) {
							menuObj.onmouseout = function() {
								JSMENU['timer'][menuid] = setTimeout(function () {hideMenu(menuid, mtype);}, timeout);
							};
						}
					}
					if(cover) {
						var coverObj = document.createElement('div');
						coverObj.id = menuid + '_cover';
						coverObj.style.position = 'absolute';
						coverObj.style.zIndex = menuObj.style.zIndex - 1;
						coverObj.style.left = coverObj.style.top = '0px';
						coverObj.style.width = '100%';
						if($(".container").width()){
							$(coverObj).css("min-width",$(".container").width() + $(".container").position().left + "px");
						}
						coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + 'px';
						coverObj.style.backgroundColor = '#000';
						coverObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=50)';
						coverObj.style.opacity = 0.5;
						$(coverObj).on("tip tipclick", function (event) {
							hideMenu();
						});
						
						if (BROWSER.ie || BROWSER.chrome || BROWSER.safari) {
							coverObj.onmousewheel = function(e){doane(e);return false;};
						} else {
							coverObj.addEventListener('DOMMouseScroll', function(e){doane(e);return false}, false);
						}
						$(coverObj).on("touchstart_1 touchstart_2 touchstart_3 touchstart_4 touchstart_5", function (event) {
							event.stopPropagation();
							return false;
						});
						$(coverObj).on("touchmove_1 touchmove_2 touchmove_3 touchmove_4 touchmove_5", function (event) {
							event.stopPropagation();
							return false;
						});
						__$$('append_parent').appendChild(coverObj);
						_attachEvent(window, 'load', function () {
							coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + 'px';
						}, document);
					}
				}
				if(drag) {
					dragobj.style.cursor = 'move';
					dragobj.onmousedown = function(event) {
						try{
							dragMenu(menuObj, event, 1);
						}catch(e){}
					};
					if("ontouchstart" in document){
						$(dragobj).on("touchstart_1", function(event){
							dragMenu(menuObj, event.originalEvent, 1);
							event.stopPropagation();
						});
					}
				}
				if(cover) 
					__$$(menuid + '_cover').style.display = '';
				if(fade) {
					var O = 0;var fadeIn = function(O) {if(O > 100) {clearTimeout(fadeInTimer);return;}menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + O + ')';menuObj.style.opacity = O / 100;O += 20;var fadeInTimer = setTimeout(function () {fadeIn(O);}, 40);};fadeIn(O);menuObj.fade = true;
				}else {
					menuObj.fade = false;
				}
				menuObj.style.display = '';
				if(ctrlObj && ctrlclass) {
					ctrlObj.className += ' ' + ctrlclass;menuObj.setAttribute('ctrlid', ctrlid);menuObj.setAttribute('ctrlclass', ctrlclass);
				}
				if(pos != '*') {
					setMenuPosition(showid, menuid, pos);
				}
				if(BROWSER.ie && BROWSER.ie < 7 && winhandlekey && __$$('fwin_' + winhandlekey)) {
					__$$(menuid).style.left = (parseInt(__$$(menuid).style.left) - parseInt(__$$('fwin_' + winhandlekey).style.left)) + 'px';__$$(menuid).style.top = (parseInt(__$$(menuid).style.top) - parseInt(__$$('fwin_' + winhandlekey).style.top)) + 'px';
				}
				if(maxh && menuObj.scrollHeight > maxh) {
					menuObj.style.height = maxh + 'px';if(BROWSER.opera) {menuObj.style.overflow = 'auto';} else {menuObj.style.overflowY = 'auto';}
				}
				if(!duration) {
					setTimeout('hideMenu(\'' + menuid + '\', \'' + mtype + '\')', timeout);
				}
				if(!in_array(menuid, JSMENU['active'][layer])) JSMENU['active'][layer].push(menuid);
				menuObj.cache = cache;
				if(layer > JSMENU['layer']) {
					JSMENU['layer'] = layer;
				}
				var hasshow = function(ele) {
					while(ele.parentNode && ((typeof(ele['currentStyle']) === 'undefined') ? window.getComputedStyle(ele,null) : ele['currentStyle'])['display'] !== 'none') {ele = ele.parentNode;}if(ele === document) {return true;} else {return false;}
				};
				if(!menuObj.getAttribute('disautofocus')) {
					try{var focused = false;var tags = ['input', 'select', 'textarea', 'button', 'a'];for(var i = 0; i < tags.length; i++) {var _all = menuObj.getElementsByTagName(tags[i]);if(_all.length) {for(j = 0; j < _all.length; j++) {if((!_all[j]['type'] || _all[j]['type'] != 'hidden') && hasshow(_all[j])) {_all[j].className += ' hidefocus';_all[j].focus();focused = true;var cobj = _all[j];_attachEvent(_all[j], 'blur', function (){cobj.className = trim(cobj.className.replace(' hidefocus', ''));});break;}}}if(focused) {break;}}} catch (e) {}
				}
			}

			var delayShowST = null;
			function delayShow(ctrlObj, call, time) {if(typeof ctrlObj == 'object') {var ctrlid = ctrlObj.id;call = call || function () {showMenu(ctrlid);};}var time = isUndefined(time) ? 500 : time;delayShowST = setTimeout(function () {if(typeof call == 'function') {call();} else {eval(call);}}, time);if(!ctrlObj.delayinit) {_attachEvent(ctrlObj, 'mouseout', function() {clearTimeout(delayShowST);});ctrlObj.delayinit = 1;}}
			var dragMenuDisabled = false;
			function dragMenu(menuObj, e, op) {
				e = e ? e : window.event;
				if(op == 1) {
					if(dragMenuDisabled || in_array(e.target ? e.target.tagName : e.srcElement.tagName, ['TEXTAREA', 'INPUT', 'BUTTON', 'SELECT'])) {
						return;
					}
					
					JSMENU['drag'] = [e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY];
					
					JSMENU['drag'][2] = parseInt(menuObj.style.left);
					JSMENU['drag'][3] = parseInt(menuObj.style.top);
					document.onmousemove = function(e) {
						try{dragMenu(menuObj, e, 2);}catch(err){}
					};
					document.onmouseup = function(e) {
						try{dragMenu(menuObj, e, 3);}catch(err){}
					};
					
					if("ontouchstart" in document){
						$(document).bind("touchmove_1", function(e) {
							try{
								dragMenu(menuObj, e.originalEvent, 2);
								event.stopPropagation();
							}catch(err){}
						});
						$(document).bind("touchend_1", function(e) {
							try{
								dragMenu(menuObj, e.originalEvent, 3);
								event.stopPropagation();
							}catch(err){}
						});
						$(document).bind("touchexceptionend_1", function(e) {
							try{
								dragMenu(menuObj, e.originalEvent, 3);
								event.stopPropagation();
							}catch(err){}
						});
					}
					doane(e);
				}
				else if(op == 2 && JSMENU['drag'][0]) {
					var menudragnow = [e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY];
					
					menuObj.style.left = (JSMENU['drag'][2] + menudragnow[0] - JSMENU['drag'][0]) + 'px';
					menuObj.style.top = (JSMENU['drag'][3] + menudragnow[1] - JSMENU['drag'][1]) + 'px';
					menuObj.removeAttribute('top_');menuObj.removeAttribute('left_');doane(e);
				}
				else if(op == 3) {
					JSMENU['drag'] = [];document.onmousemove = null;document.onmouseup = null;
					document.ontouchmove = null;document.ontouchend = null;
					$(document).unbind("touchmove_1");
					$(document).unbind("touchend_1");
					$(document).unbind("touchexceptionend_1");
				}
			}
			function setMenuPosition(showid, menuid, pos) {var showObj = __$$(showid);var menuObj = menuid ? __$$(menuid) : __$$(showid + '_menu');if(isUndefined(pos) || !pos) pos = '43';var basePoint = parseInt(pos.substr(0, 1));var direction = parseInt(pos.substr(1, 1));var important = pos.indexOf('!') != -1 ? 1 : 0;var sxy = 0, sx = 0, sy = 0, sw = 0, sh = 0, ml = 0, mt = 0, mw = 0, mcw = 0, mh = 0, mch = 0, bpl = 0, bpt = 0;if(!menuObj || (basePoint > 0 && !showObj)) return;if(showObj) {sxy = fetchOffset(showObj);sx = sxy['left'];sy = sxy['top'];sw = showObj.offsetWidth;sh = showObj.offsetHeight;}mw = menuObj.offsetWidth;mcw = menuObj.clientWidth;mh = menuObj.offsetHeight;mch = menuObj.clientHeight;switch(basePoint) {case 1:bpl = sx;bpt = sy;break;case 2:bpl = sx + sw;bpt = sy;break;case 3:bpl = sx + sw;bpt = sy + sh;break;case 4:bpl = sx;bpt = sy + sh;break;}switch(direction) {case 0:menuObj.style.left = (document.body.clientWidth - menuObj.clientWidth) / 2 + 'px';mt = (document.documentElement.clientHeight - menuObj.clientHeight) / 2;break;case 1:ml = bpl - mw;mt = bpt - mh;break;case 2:ml = bpl;mt = bpt - mh;break;case 3:ml = bpl;mt = bpt;break;case 4:ml = bpl - mw;mt = bpt;break;}var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);if(!important) {if(in_array(direction, [1, 4]) && ml < 0) {ml = bpl;if(in_array(basePoint, [1, 4])) ml += sw;} else if(ml + mw > scrollLeft + document.body.clientWidth && sx >= mw) {ml = bpl - mw;if(in_array(basePoint, [2, 3])) {ml -= sw;} else if(basePoint == 4) {ml += sw;}}if(in_array(direction, [1, 2]) && mt < 0) {mt = bpt;if(in_array(basePoint, [1, 2])) mt += sh;} else if(mt + mh > scrollTop + document.documentElement.clientHeight && sy >= mh) {mt = bpt - mh;if(in_array(basePoint, [3, 4])) mt -= sh;}}if(pos.substr(0, 3) == '210') {ml += 69 - sw / 2;mt -= 5;if(showObj.tagName == 'TEXTAREA') {ml -= sw / 2;mt += sh / 2;}}if(direction == 0 || menuObj.scrolly) {if(BROWSER.ie && BROWSER.ie < 7) {if(direction == 0) mt += scrollTop;} else {if(menuObj.scrolly) mt -= scrollTop;menuObj.style.position = 'fixed';}}if(ml) menuObj.style.left = ml + 'px';if(mt) menuObj.style.top = mt + 'px';if(direction == 0 && BROWSER.ie && !document.documentElement.clientHeight) {menuObj.style.position = 'absolute';menuObj.style.top = (document.body.clientHeight - menuObj.clientHeight) / 2 + 'px';}if(menuObj.style.clip && !BROWSER.opera) {menuObj.style.clip = 'rect(auto, auto, auto, auto)';}}
			function hideMenu(attr, mtype) {attr = isUndefined(attr) ? '' : attr;mtype = isUndefined(mtype) ? 'menu' : mtype;if(attr == '') {for(var i = 1; i <= JSMENU['layer']; i++) {hideMenu(i, mtype);}return;} else if(typeof attr == 'number') {for(var j in JSMENU['active'][attr]) {hideMenu(JSMENU['active'][attr][j], mtype);}return;}else if(typeof attr == 'string') {var menuObj = __$$(attr);if(!menuObj || (mtype && menuObj.mtype != mtype)) return;var ctrlObj = '', ctrlclass = '';if((ctrlObj = __$$(menuObj.getAttribute('ctrlid'))) && (ctrlclass = menuObj.getAttribute('ctrlclass'))) {var reg = new RegExp(' ' + ctrlclass);ctrlObj.className = ctrlObj.className.replace(reg, '');}clearTimeout(JSMENU['timer'][attr]);var hide = function() {if(menuObj.cache) {if(menuObj.style.visibility != 'hidden') {menuObj.style.display = 'none';if(menuObj.cover) __$$(attr + '_cover').style.display = 'none';}}else {menuObj.parentNode.removeChild(menuObj);if(menuObj.cover) __$$(attr + '_cover').parentNode.removeChild(__$$(attr + '_cover'));}var tmp = [];for(var k in JSMENU['active'][menuObj.layer]) {if(attr != JSMENU['active'][menuObj.layer][k]) tmp.push(JSMENU['active'][menuObj.layer][k]);}JSMENU['active'][menuObj.layer] = tmp;};if(menuObj.fade) {var O = 100;var fadeOut = function(O) {if(O == 0) {clearTimeout(fadeOutTimer);hide();return;}menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + O + ')';menuObj.style.opacity = O / 100;O -= 20;var fadeOutTimer = setTimeout(function () {fadeOut(O);}, 40);};fadeOut(O);} else {hide();}}clearExif();}
			_lszoom_hideMenu = hideMenu;
			function getCurrentStyle(obj, cssproperty, csspropertyNS) {if(obj.style[cssproperty]){return obj.style[cssproperty];}if (obj.currentStyle) {return obj.currentStyle[cssproperty];} else if (document.defaultView.getComputedStyle(obj, null)) {var currentStyle = document.defaultView.getComputedStyle(obj, null);var value = currentStyle.getPropertyValue(csspropertyNS);if(!value){value = currentStyle[cssproperty];}return value;} else if (window.getComputedStyle) {var currentStyle = window.getComputedStyle(obj, "");return currentStyle.getPropertyValue(csspropertyNS);}}
			function fetchOffset(obj, mode) {var left_offset = 0, top_offset = 0, mode = !mode ? 0 : mode;if(obj.getBoundingClientRect && !mode) {var rect = obj.getBoundingClientRect();var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);if(document.documentElement.dir == 'rtl') {scrollLeft = scrollLeft + document.documentElement.clientWidth - document.documentElement.scrollWidth;}left_offset = rect.left + scrollLeft - document.documentElement.clientLeft;top_offset = rect.top + scrollTop - document.documentElement.clientTop;}if(left_offset <= 0 || top_offset <= 0) {left_offset = obj.offsetLeft;top_offset = obj.offsetTop;while((obj = obj.offsetParent) != null) {position = getCurrentStyle(obj, 'position', 'position');if(position == 'relative') {continue;}left_offset += obj.offsetLeft;top_offset += obj.offsetTop;}}return {'left' : left_offset, 'top' : top_offset};}
			function showTip(ctrlobj) {__$$F('_showTip', arguments);}
			function showPrompt(ctrlid, evt, msg, timeout, classname) {__$$F('_showPrompt', arguments);}
			function showCreditPrompt() {__$$F('_showCreditPrompt', []);}
			var showDialogST = null;
			function showDialog(msg, mode, t, func, cover, funccancel, leftmsg, confirmtxt, canceltxt, closetime, locationtime) {clearTimeout(showDialogST);cover = isUndefined(cover) ? (mode == 'info' ? 0 : 1) : cover;leftmsg = isUndefined(leftmsg) ? '' : leftmsg;mode = in_array(mode, ['confirm', 'notice', 'info', 'right']) ? mode : 'alert';var menuid = 'fwin_dialog';var menuObj = __$$(menuid);var showconfirm = 1;confirmtxtdefault = '确定';closetime = isUndefined(closetime) ? '' : closetime;closefunc = function () {if(typeof func == 'function') func();else eval(func);hideMenu(menuid, 'dialog');};if(closetime) {showPrompt(null, null, '<i>' + msg + '</i>', closetime * 1000, 'popuptext');return;}locationtime = isUndefined(locationtime) ? '' : locationtime;if(locationtime) {leftmsg = locationtime + ' 秒后页面跳转';showDialogST = setTimeout(closefunc, locationtime * 1000);showconfirm = 0;}confirmtxt = confirmtxt ? confirmtxt : confirmtxtdefault;canceltxt = canceltxt ? canceltxt : '取消';if(menuObj) hideMenu('fwin_dialog', 'dialog');menuObj = document.createElement('div');menuObj.style.display = 'none';menuObj.className = 'fwinmask';menuObj.id = menuid;__$$('append_parent').appendChild(menuObj);var hidedom = '';if(!BROWSER.ie) {hidedom = '<style type="text/css">object{visibility:hidden;}</style>';}var s = hidedom + '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"></td><td class="t_r"></td></tr><tr><td class="m_l">&nbsp;&nbsp;</td><td class="m_c"><h3 class="flb"><em>';s += t ? t : '提示信息';s += '</em><span><a href="javascript:;" id="fwin_dialog_close" class="flbc" onclick="_lszoom_hideMenu(\'' + menuid + '\', \'dialog\')" title="关闭">关闭</a></span></h3>';if(mode == 'info') {s += msg ? msg : '';} else {s += '<div class="c altw"><div class="' + (mode == 'alert' ? 'alert_error' : (mode == 'right' ? 'alert_right' : 'alert_info')) + '"><p>' + msg + '</p></div></div>';s += '<p class="o pns">' + (leftmsg ? '<span class="z xg1">' + leftmsg + '</span>' : '') + (showconfirm ? '<button id="fwin_dialog_submit" value="true" class="pn pnc"><strong>'+confirmtxt+'</strong></button>' : '');s += mode == 'confirm' ? '<button id="fwin_dialog_cancel" value="true" class="pn" onclick="hideMenu(\'' + menuid + '\', \'dialog\')"><strong>'+canceltxt+'</strong></button>' : '';s += '</p>';}s += '</td><td class="m_r"></td></tr><tr><td class="b_l"></td><td class="b_c"></td><td class="b_r"></td></tr></table>';menuObj.innerHTML = s;if(__$$('fwin_dialog_submit')) __$$('fwin_dialog_submit').onclick = function() {if(typeof func == 'function') func();else eval(func);hideMenu(menuid, 'dialog');};if(__$$('fwin_dialog_cancel')) {__$$('fwin_dialog_cancel').onclick = function() {if(typeof funccancel == 'function') funccancel();else eval(funccancel);hideMenu(menuid, 'dialog');};__$$('fwin_dialog_close').onclick = __$$('fwin_dialog_cancel').onclick;}showMenu({'mtype':'dialog','menuid':menuid,'duration':3,'pos':'00','zindex':JSMENU['zIndex']['dialog'],'cache':0,'cover':cover});try {if(__$$('fwin_dialog_submit')) __$$('fwin_dialog_submit').focus();} catch(e) {}}
			function showError(msg) {var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;msg = msg.replace(p, '');if(msg !== '') {showDialog(msg, 'alert', '错误信息', null, true, null, '', '', '', 3);}}
			function hideWindow(k, all, clear) {all = isUndefined(all) ? 1 : all;clear = isUndefined(clear) ? 1 : clear;hideMenu('fwin_' + k, 'win');if(clear && __$$('fwin_' + k)) {__$$('append_parent').removeChild(__$$('fwin_' + k));}if(all) {hideMenu();}}
			function AC_FL_RunContent() {var str = '';var ret = AC_GetArgs(arguments, "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash");if(BROWSER.ie && !BROWSER.opera) {str += '<object ';for (var i in ret.objAttrs) {str += i + '="' + ret.objAttrs[i] + '" ';}str += '>';for (var i in ret.params) {str += '<param name="' + i + '" value="' + ret.params[i] + '" /> ';}str += '</object>';} else {str += '<embed ';for (var i in ret.embedAttrs) {str += i + '="' + ret.embedAttrs[i] + '" ';}str += '></embed>';}return str;}
			function AC_GetArgs(args, classid, mimeType) {var ret = new Object();ret.embedAttrs = new Object();ret.params = new Object();ret.objAttrs = new Object();for (var i = 0; i < args.length; i = i + 2){var currArg = args[i].toLowerCase();switch (currArg){case "classid":break;case "pluginspage":ret.embedAttrs[args[i]] = 'http://www.macromedia.com/go/getflashplayer';break;case "src":ret.embedAttrs[args[i]] = args[i+1];ret.params["movie"] = args[i+1];break;case "codebase":ret.objAttrs[args[i]] = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0';break;case "onafterupdate":case "onbeforeupdate":case "onblur":case "oncellchange":case "onclick":case "ondblclick":case "ondrag":case "ondragend":case "ondragenter":case "ondragleave":case "ondragover":case "ondrop":case "onfinish":case "onfocus":case "onhelp":case "onmousedown":case "onmouseup":case "onmouseover":case "onmousemove":case "onmouseout":case "onkeypress":case "onkeydown":case "onkeyup":case "onload":case "onlosecapture":case "onpropertychange":case "onreadystatechange":case "onrowsdelete":case "onrowenter":case "onrowexit":case "onrowsinserted":case "onstart":case "onscroll":case "onbeforeeditfocus":case "onactivate":case "onbeforedeactivate":case "ondeactivate":case "type":case "id":ret.objAttrs[args[i]] = args[i+1];break;case "width":case "height":case "align":case "vspace": case "hspace":case "class":case "title":case "accesskey":case "name":case "tabindex":ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];break;default:ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];}}ret.objAttrs["classid"] = classid;if(mimeType) {ret.embedAttrs["type"] = mimeType;}return ret;}
			function simulateSelect(selectId, widthvalue) {var selectObj = __$$(selectId);if(!selectObj) return;if(BROWSER.other) {if(selectObj.getAttribute('change')) {selectObj.onchange = function () {eval(selectObj.getAttribute('change'));}}return;}var widthvalue = widthvalue ? widthvalue : 70;var defaultopt = selectObj.options[0] ? selectObj.options[0].innerHTML : '';var defaultv = '';var menuObj = document.createElement('div');var ul = document.createElement('ul');var handleKeyDown = function(e) {e = BROWSER.ie ? event : e;if(e.keyCode == 40 || e.keyCode == 38) doane(e);};var selectwidth = (selectObj.getAttribute('width', i) ? selectObj.getAttribute('width', i) : widthvalue) + 'px';var tabindex = selectObj.getAttribute('tabindex', i) ? selectObj.getAttribute('tabindex', i) : 1;for(var i = 0; i < selectObj.options.length; i++) {var li = document.createElement('li');li.innerHTML = selectObj.options[i].innerHTML;li.k_id = i;li.k_value = selectObj.options[i].value;if(selectObj.options[i].selected) {defaultopt = selectObj.options[i].innerHTML;defaultv = selectObj.options[i].value;li.className = 'current';selectObj.setAttribute('selecti', i);}li.onclick = function() {if(__$$(selectId + '_ctrl').innerHTML != this.innerHTML) {var lis = menuObj.getElementsByTagName('li');lis[__$$(selectId).getAttribute('selecti')].className = '';this.className = 'current';__$$(selectId + '_ctrl').innerHTML = this.innerHTML;__$$(selectId).setAttribute('selecti', this.k_id);__$$(selectId).options.length = 0;__$$(selectId).options[0] = new Option('', this.k_value);eval(selectObj.getAttribute('change'));}hideMenu(menuObj.id);return false;};ul.appendChild(li);}selectObj.options.length = 0;selectObj.options[0]= new Option('', defaultv);selectObj.style.display = 'none';selectObj.outerHTML += '<a href="javascript:;" id="' + selectId + '_ctrl" style="width:' + selectwidth + '" tabindex="' + tabindex + '">' + defaultopt + '</a>';menuObj.id = selectId + '_ctrl_menu';menuObj.className = 'sltm';menuObj.style.display = 'none';menuObj.style.width = selectwidth;menuObj.appendChild(ul);__$$('append_parent').appendChild(menuObj);__$$(selectId + '_ctrl').onclick = function(e) {__$$(selectId + '_ctrl_menu').style.width = selectwidth;showMenu({'ctrlid':(selectId == 'loginfield' ? 'account' : selectId + '_ctrl'),'menuid':selectId + '_ctrl_menu','evt':'click','pos':'43'});doane(e);};__$$(selectId + '_ctrl').onfocus = menuObj.onfocus = function() {_attachEvent(document.body, 'keydown', handleKeyDown);};__$$(selectId + '_ctrl').onblur = menuObj.onblur = function() {_detachEvent(document.body, 'keydown', handleKeyDown);};__$$(selectId + '_ctrl').onkeyup = function(e) {e = e ? e : window.event;value = e.keyCode;if(value == 40 || value == 38) {if(menuObj.style.display == 'none') {__$$(selectId + '_ctrl').onclick();} else {lis = menuObj.getElementsByTagName('li');selecti = selectObj.getAttribute('selecti');lis[selecti].className = '';if(value == 40) {selecti = parseInt(selecti) + 1;} else if(value == 38) {selecti = parseInt(selecti) - 1;}if(selecti < 0) {selecti = lis.length - 1} else if(selecti > lis.length - 1) {selecti = 0;}lis[selecti].className = 'current';selectObj.setAttribute('selecti', selecti);lis[selecti].parentNode.scrollTop = lis[selecti].offsetTop;}} else if(value == 13) {var lis = menuObj.getElementsByTagName('li');lis[selectObj.getAttribute('selecti')].onclick();} else if(value == 27) {hideMenu(menuObj.id);}};}
			function switchTab(prefix, current, total, activeclass) {__$$F('_switchTab', arguments);}
			function imageRotate(imgid, direct) {__$$F('_imageRotate', arguments);}
			function thumbImg(obj, method) {
				if(!obj) {return;}
				obj.onload = null;
				file = obj.src;
				zw = obj.offsetWidth;
				zh = obj.offsetHeight;
				if(zw < 2) {
					if(!obj.id) {
						obj.id = 'img_' + Math.random();
					}
					setTimeout("thumbImg(__$$('" + obj.id + "'), " + method + ")", 100);
					return;
				}
				zr = zw / zh;method = !method ? 0 : 1;
				if(method) {
					fixw = obj.getAttribute('_width');fixh = obj.getAttribute('_height');if(zw > fixw) {zw = fixw;zh = zw / zr;}
					if(zh > fixh) {
						zh = fixh;zw = zh * zr;
					}
				} else {
					fixw = typeof imagemaxwidth == 'undefined' ? '600' : imagemaxwidth;
					if (!obj.getAttribute('isfirst')) {
						fixw -= 110;
					}
					if(zw > fixw) {
						zw = fixw;
						zh = zw / zr;
						obj.style.cursor = 'pointer';
						if(!obj.onclick) {
							obj.onclick = function() {
								zoom(obj, obj.src);
							};
						}
					}
				}
				obj.width = zw;
				obj.height = zh;
			}
			var zoomstatus = 1;
			function zoom(obj, zimg, nocover, pn, showexif) {
				__$$F('_zoom', arguments);
			}
			function showselect(obj, inpid, t, rettype) {
				__$$F('_showselect', arguments);
			}
			function showColorBox(ctrlid, layer, k, bgcolor) {
				__$$F('_showColorBox', arguments);
			}
			function ctrlEnter(event, btnId, onlyEnter) {
				if(isUndefined(onlyEnter)) onlyEnter = 0;if((event.ctrlKey || onlyEnter) && event.keyCode == 13) {__$$(btnId).click();return false;}return true;
			}
			function parseurl(str, mode, parsecode) {
				if(isUndefined(parsecode)) parsecode = true;if(parsecode) str= str.replace(/\s*\[code\]([\s\S]+?)\[\/code\]\s*/ig, function(__$$1, __$$2) {return codetag(__$$2, -1);});str = str.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(swf|flv))/ig, '__$$1[flash]__$$2[/flash]');str = str.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(mp3|wma))/ig, '__$$1[audio]__$$2[/audio]');str = str.replace(/([^>=\]"'\/@]|^)((((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|ed2k|thunder|qqdl|synacast):\/\/))([\w\-]+\.)*[:\.@\-\w\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&;~`@':+!#]*)*)/ig, mode == 'html' ? '__$$1<a href="__$$2" target="_blank">__$$2</a>' : '__$$1[url]__$$2[/url]');str = str.replace(/([^\w>=\]"'\/@]|^)((www\.)([\w\-]+\.)*[:\.@\-\w\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&;~`@':+!#]*)*)/ig, mode == 'html' ? '__$$1<a href="__$$2" target="_blank">__$$2</a>' : '__$$1[url]__$$2[/url]');str = str.replace(/([^\w->=\]:"'\.\/]|^)(([\-\.\w]+@[\.\-\w]+(\.\w+)+))/ig, mode == 'html' ? '__$$1<a href="mailto:__$$2">__$$2</a>' : '__$$1[email]__$$2[/email]');if(parsecode) {for(var i = 0; i <= DISCUZCODE['num']; i++) {str = str.replace("[\tDISCUZ_CODE_" + i + "\t]", DISCUZCODE['html'][i]);}}return str;
			}
			function codetag(text, br) {
				var br = !br ? 1 : br;DISCUZCODE['num']++;if(br > 0 && typeof wysiwyg != 'undefined' && wysiwyg) text = text.replace(/<br[^\>]*>/ig, '\n');text = text.replace(/\__$$/ig, '__$$__$$');DISCUZCODE['html'][DISCUZCODE['num']] = '[code]' + text + '[/code]';return '[\tDISCUZ_CODE_' + DISCUZCODE['num'] + '\t]';
			}
			function initTab(frameId, type) {
				__$$F('_initTab', arguments);
			}

			var zoomstatus = 1;
			function zoom(obj, zimg, nocover, pn, showexif) {
				_zoom(obj, zimg, nocover, pn, showexif);
			}
			function _zoom(obj, zimg, nocover, pn, showexif) {
				if ( (typeof obj).toLowerCase() === "string" ) {
					var method = eval(obj);
					if ( (typeof method).toLowerCase() === "function" ) {
						return method();
					}
				}
			
				zimg = !zimg ? obj.src : zimg;
				showexif = !parseInt(showexif) ? 0 : showexif;
				if (!zoomstatus) {
					window.open(zimg, '', '');
					return;
				}
				if (!obj.id)
					obj.id = 'img_' + Math.random();
				var menuid = 'imgzoom';
				var menu = __$$(menuid);
				var zoomid = menuid + '_zoom';
				var imgtitle = !nocover && obj.title ? '<div class="imgzoom_title">'
						+ htmlspecialchars(obj.title)
						+ '</div>'
						+ (showexif ? '<div id="'
								+ zoomid
								+ '_exif" class="imgzoom_exif" onmouseover="this.className=\'imgzoom_exif imgzoom_exif_hover\'" onmouseout="this.className=\'imgzoom_exif\'"></div>'
								: '')
						: '';
				var cover = !nocover ? 1 : 0;
				var pn = !pn ? 0 : 1;
				var maxh = (document.documentElement.clientHeight ? document.documentElement.clientHeight
						: document.body.clientHeight) - 70;
				var loadCheck = function(objloading) {
					if (objloading.complete) {
						var imgw = loading.width;
						var imgh = loading.height;
						var r = imgw / imgh;
						var w = document.body.clientWidth * 0.95;
						w = imgw > w ? w : imgw;
						var h = w / r;
						if (w < 50 & h < 50) {
							__$$(menuid + '_waiting').style.display = 'none';
							hideMenu();
							return;
						}
						if (h > maxh) {
							h = maxh;
							w = h * r;
						}
						if (__$$(menuid)) {
							__$$(menuid).removeAttribute('top_');
							__$$(menuid).removeAttribute('left_');
							clearTimeout(__$$(menuid).getAttribute('timer'));
						}
						showimage(loading, w, h, imgw, imgh);
						if("onmspointerdown" in document){
							$("html").css("-ms-touch-action","none");
						}
						if (showexif) {
							if(lszoomoption() && lszoomoption().onShow){
								lszoomoption().onShow(__$$(menuid + '_img'), obj, $("#" + menuid + '_exif'));
							}
						}
					} else {
						setTimeout(function() {
							loadCheck(loading);
						}, 100);
					}
				};
				var showloading = function(zimg, pn) {
					if (!pn) {
						if (!__$$(menuid + '_waiting')) {
							waiting = document.createElement('img');
							waiting.id = menuid + '_waiting';
							waiting.src = 'styles/extends/lszoom/src/imageloading.gif';
							waiting.style.opacity = '0.8';
							waiting.style.filter = 'alpha(opacity=80)';
							waiting.style.position = 'absolute';
							waiting.style.zIndex = '100000';
							__$$('append_parent').appendChild(waiting);
						}
					}
					__$$(menuid + '_waiting').style.display = '';
					__$$(menuid + '_waiting').style.left = (document.body.clientWidth - 42)
							/ 2 + 'px';
					__$$(menuid + '_waiting').style.top = ((document.documentElement.clientHeight - 42) / 2 + Math
							.max(document.documentElement.scrollTop,
									document.body.scrollTop))
							+ 'px';
					loading = new Image();
					setTimeout(function() {
						loadCheck(loading);
					}, 100);
					if (!pn) {
						__$$(menuid + '_zoomlayer').style.display = 'none';
					}
					
					loading.src = zimg;
				};
				
				var adjustpn = function(h) {
					h = h < 90 ? 90 : h;
					if (__$$('zimg_prev')) {
						__$$('zimg_prev').style.height = parseInt(h) + 'px';
					}
					if (__$$('zimg_next')) {
						__$$('zimg_next').style.height = parseInt(h) + 'px';
					}
				};
				
				var showimage = function(zimg, w, h, imgw, imgh) {
					if(lszoomoption() && lszoomoption().zoominitwidth){
					
						var tmpW = w;
						w = lszoomoption().zoominitwidth;
						if(w<300){
							w = 300;
						}
						if(imgw < w){
							imgw = w;
						}
						if(lszoomoption() && lszoomoption().zoominitheight){
							h = lszoomoption().zoominitheight;
							if(h<200){
								h = 200;
							}
							imgh = imgw*h/w;
						}else{
							h = w*h/tmpW;
							if(imgh < h){
								imgh = h;
							}
						}
					}
					if(w<300){
						h = 300*h/w;
						w = 300;
						if(imgw < w){
							imgw = w;
							imgh = h
						}
					}
					__$$(menuid + '_waiting').style.display = 'none';
					__$$(menuid + '_zoomlayer').style.display = '';
					__$$(menuid + '_img').style.width = 'auto';
					__$$(menuid + '_img').style.height = 'auto';
					__$$(menuid).style.width = (w < 300 ? 320 : w + 20) + 'px';
					mheight = h + 63;
					menu.style.height = mheight + 'px';
					__$$(menuid + '_zoomlayer').style.height = (mheight < 120 ? 120 : mheight)
							+ 'px';
						
					var $zimg = null;
					if ( (typeof zimg).toLowerCase() === "string" ) {
						$zimg = $("<img src='" + zimg + "'/>");
					}else{
						$zimg = $(zimg);
					}
					
					$zimg.attr("id", zoomid);
					$zimg.attr("width", w);
					$zimg.attr("height", h);
					$zimg.attr("w", imgw);
					$zimg.attr("h", imgh);
					$zimg.attr("style", 'width:'+ w  +'px;height:' + h + 'px');
					$("#" + menuid + '_img').append($zimg);
					$("#" + menuid + '_img').append($(imgtitle));
					
					if (__$$(menuid + '_imglink')) {
						$("#" + menuid + '_imglink').on("tip tipclick", function(event){
							window.open((typeof zimg).toLowerCase() === "string"?zimg : zimg.src);
						});
					}
					
					setMenuPosition('', menuid, '00');
					adjustpn(h);
				};
				
				
				
				var adjustTimer = 0;
				var adjustTimerCount = 0;
				var wheelDelta = 0;
				var clientX = 0;
				var clientY = 0;
				var adjust = function(e, a) {
					if (BROWSER.ie && BROWSER.ie < 9) {
						
					} else {
						if (adjustTimerCount) {
							adjustTimer = (function() {
								return setTimeout(function() {
									adjustTimerCount++;
									adjust(e);
								}, 10);
							})();
							__$$(menuid).setAttribute('timer', adjustTimer);
							if (adjustTimerCount > 8) {
								clearTimeout(adjustTimer);
								adjustTimerCount = 0;
								doane();
							}
						} else if (!a) {
							adjustTimerCount = 1;
							if (adjustTimer) {
								clearTimeout(adjustTimer);
								adjust(e, a);
							} else {
								adjust(e, a);
							}
							doane();
						}
					}
					var ele = __$$(zoomid);
					if (!ele) {
						return;
					}
					var imgw = ele.getAttribute('w');
					var imgh = ele.getAttribute('h');
					if (!a) {
						e = e || window.event;
						try {
							if (e.altKey || e.shiftKey || e.ctrlKey)
								return;
						} catch (e) {
							e = {
								'wheelDelta' : wheelDelta,
								'clientX' : clientX,
								'clientY' : clientY
							};
						}
						var j_detail = e.wheelDelta ? (e.wheelDelta/120) :  ( e.detail > 0 ? -2 : 2 );
						var step = 3 * j_detail;
						if ( j_detail < 0 ) {
							if (parseInt($(ele).attr("width")) - 1 <= 300 || parseInt($(ele).attr("height")) - 1 <= 200) {
								clearTimeout(adjustTimer);
								adjustTimerCount = 0;
								doane(e);
								return;
							}
							//step = parseInt(imgw / Number($(ele).attr("width"))) - 4;
						} else {
							var amplityRate = 40;
							if(lszoomoption() && lszoomoption().enableamplityrate){
								amplityRate = lszoomoption().enableamplityrate;
							}
							if (Number($(ele).attr("width")) + 1 >= imgw * amplityRate) {
								clearTimeout(adjustTimer);
								adjustTimerCount = 0;
								doane(e);
								return;
							}
							//step = 4 - parseInt(imgw / Number($(ele).attr("width"))) || 2;
						}
						if (BROWSER.ie && BROWSER.ie < 9) {
							step *= 10;
						}
						wheelDelta = e.wheelDelta;
						clientX = e.clientX;
						clientY = e.clientY;
						var ratio = 0;
						if (imgw >= imgh) {
							ratio = step / Number($(ele).attr("height"));
							$(ele).attr("height", Number($(ele).attr("height")) + step);
							$(ele).css("height", Number($(ele).attr("height")) + "px");
							$(ele).attr("width", imgw * (Number($(ele).attr("height")) / imgh));
							$(ele).css("width", imgw * (Number($(ele).attr("height")) / imgh) + "px");
						} else if (imgw < imgh) {
							ratio = step / Number($(ele).attr("width"));
							$(ele).attr("width" ,Number($(ele).attr("width")) + step);
							$(ele).css("width" ,Number($(ele).attr("width")) + "px");
							$(ele).attr("height" , imgh * (Number($(ele).attr("width")) / imgw));
							$(ele).css("height" , imgh * (Number($(ele).attr("width")) / imgw) + "px");
						}
						if (BROWSER.ie && BROWSER.ie < 9) {
							setMenuPosition('', menuid, '00');
						} else {
							var menutop = parseFloat(menu.getAttribute('top_')
									|| menu.style.top);
							var menuleft = parseFloat(menu.getAttribute('left_')
									|| menu.style.left);
							var imgY = clientY - menutop - 39;
							var imgX = clientX - menuleft - 10;
							var newTop = (menutop - imgY * ratio) + 'px';
							var newLeft = (menuleft - imgX * ratio) + 'px';
							menu.style.top = newTop;
							menu.style.left = newLeft;
							menu.setAttribute('top_', newTop);
							menu.setAttribute('left_', newLeft);
						}
					} else {
						var menutop = parseFloat(menu.getAttribute('top_')
								|| menu.style.top);
						var menuleft = parseFloat(menu.getAttribute('left_')
								|| menu.style.left);
						var ow = Number($(ele).attr("width"));
						var oh = Number($(ele).attr("height"));
						$(ele).attr("width", imgw);
						$(ele).css("width", imgw + "px");
						$(ele).attr("height", imgh);
						$(ele).css("height", imgh + "px");
						
						var newleft = document.documentElement.clientWidth-imgw -20 + "px";
						menu.style.left = newleft;
						menu.setAttribute('left_', newleft);
						menu.style.top = "0px";
						menu.setAttribute('top_', "0px");
					}
					menu.style.width = (parseFloat(Number($(ele).attr("width")) < 300 ? 300
							: parseFloat(Number($(ele).attr("width")))) + 20)
							+ 'px';
					var mheight = (parseFloat(Number($(ele).attr("height"))) + 50);
					menu.style.height = mheight + 'px';
					__$$(menuid + '_zoomlayer').style.height = (mheight < 120 ? 120 : mheight)
							+ 'px';
					if(lszoomoption() && lszoomoption().onChangeSize){
						lszoomoption().onChangeSize(Number($(ele).attr("width")),Number($(ele).attr("height")),$("#" + menuid + '_exif'));
					}
					adjustpn(Number($(ele).attr("height")));
					doane(e);
				};
				
				
				var adjustForTouch = function(start, stop, scaling, centerMove) {
					var ele = __$$(zoomid);
					if (!ele) {
						return;
					}
					var imgw = ele.getAttribute('w');
					var imgh = ele.getAttribute('h');
					if (true) {
						clientX = stop.center[0];
						clientY = stop.center[1];
						var ratio = 0;
						var step = (Number($(ele).attr("width"))>Number($(ele).attr("height"))?Number($(ele).attr("height")):Number($(ele).attr("width")))/4 * (scaling - 1);
						
						if(step < 0){
							if (Number($(ele).attr("width")) - 1 <= 300 || Number($(ele).attr("height")) - 1 <= 200) {
								clearTimeout(adjustTimer);
								adjustTimerCount = 0;
								doane();
								return;
							}
						}else{
							var amplityRate = 40;
							if(lszoomoption() && lszoomoption().enableamplityrate){
								amplityRate = lszoomoption().enableamplityrate;
							}
							if (Number($(ele).attr("width")) + 1 >= imgw * amplityRate) {
								clearTimeout(adjustTimer);
								adjustTimerCount = 0;
								doane();
								return;
							}
						}
						
						if (imgw >= imgh) {
							ratio = step / Number($(ele).attr("height"));
							$(ele).attr("height", Number($(ele).attr("height")) + step);
							$(ele).css("height", Number($(ele).attr("height")) + "px");
							$(ele).attr("width", imgw * (Number($(ele).attr("height")) / imgh));
							$(ele).css("width", imgw * (Number($(ele).attr("height")) / imgh) + "px");
						} else if (imgw < imgh) {
							ratio = step / Number($(ele).attr("width"));
							$(ele).attr("width" ,Number($(ele).attr("width")) + step);
							$(ele).css("width" ,Number($(ele).attr("width")) + "px");
							$(ele).attr("height" , imgh * (Number($(ele).attr("width")) / imgw));
							$(ele).css("height" , imgh * (Number($(ele).attr("width")) / imgw) + "px");
						}
						if (BROWSER.ie && BROWSER.ie < 9) {
							setMenuPosition('', menuid, '00');
						} else {
							var menutop = parseFloat(menu.getAttribute('top_')
									|| menu.style.top);
							var menuleft = parseFloat(menu.getAttribute('left_')
									|| menu.style.left);
							var imgY = clientY - menutop - 39;
							var imgX = clientX - menuleft - 10;
							var newTop = (menutop + centerMove[1] - imgY * ratio) + 'px';
							var newLeft = (menuleft + centerMove[0] - imgX * ratio) + 'px';
							menu.style.top = newTop;
							menu.style.left = newLeft;
							menu.setAttribute('top_', newTop);
							menu.setAttribute('left_', newLeft);
						}
					}
					menu.style.width = (parseFloat(Number($(ele).attr("width")) < 300 ? 300
							: parseFloat(Number($(ele).attr("width")))) + 20)
							+ 'px';
					var mheight = (parseFloat(Number($(ele).attr("height"))) + 50);
					menu.style.height = mheight + 'px';
					__$$(menuid + '_zoomlayer').style.height = (mheight < 120 ? 120 : mheight)
							+ 'px';
					if(lszoomoption() && lszoomoption().onChangeSize){
						lszoomoption().onChangeSize(Number($(ele).attr("width")),Number($(ele).attr("height")),$("#" + menuid + '_exif'));
					}
					adjustpn(Number($(ele).attr("height")));
					doane();
				};
				
				if (!menu && !pn) {
					menu = document.createElement('div');
					menu.id = menuid;
					if (cover) {
						menu.innerHTML = '<div class="zoominner" id="'
								+ menuid
								+ '_zoomlayer" style="display:none"><p><span class="y"><a id="'
								+ menuid
								//+ '_imglink" class="imglink" target="_blank" title="在新窗口打开">在新窗口打开</a><a id="'
								+ '_imglink" href="#" class="imglink" title="新しいウィンドウズに開く" style="display:none;">新しいウィンドウズに開く</a><a id="'
								+ menuid
								//+ '_adjust" href="javascipt:;" class="imgadjust" title="实际大小">实际大小</a>'
								+ '_adjust" href="#" class="imgadjust" title="実際のサイズ" style="display:none;">実際のサイズ</a>'
								//+ '<a href="javascript:;" onclick="_lszoom_hideMenu()" class="imgclose" title="关闭">关闭</a></span>鼠标滚轮缩放图片</p>'
								+ '<a id="'
								+ menuid
								+ '_imgclose" href="#" onclick="javascipt:;" class="imgclose" title="閉じる">閉じる</a></span></p>'
								+ '<div class="zimg_p" id="' + menuid
								+ '_picpage"></div><div class="hm" id="' + menuid
								+ '_img"></div><div class="ex" id="' + menuid + '_exif"></div>'
								+ '</div><div class="ex" id="' + menuid + '_ext"></div>'
								+ '</div>';
					} else {
						menu.innerHTML = '<div class="popupmenu_popup" id="'
								+ menuid
								//+ '_zoomlayer" style="width:auto"><span class="right y"><a href="javascript:;" onclick="hideMenu()" class="flbc" style="width:20px;margin:0 0 2px 0">关闭</a></span>鼠标滚轮缩放图片<div class="zimg_p" id="'
								+ '_zoomlayer" style="width:auto"><span class="right y"><a href="javascript:;" onclick="hideMenu()" class="flbc" style="width:20px;margin:0 0 2px 0">关闭</a></span>マウスホイールズーム画像<div class="zimg_p" id="'
								+ menuid + '_picpage"></div><div class="hm" id="' + menuid
								+ '_img"></div></div>';
					}
					if (BROWSER.ie || BROWSER.chrome || BROWSER.safari) {
						menu.onmousewheel = adjust;
					} else {
						menu.addEventListener('DOMMouseScroll', adjust, false);
					}
					
					if("ontouchstart" in document){
						$(menu).on("swipeOpenClose", function(event, data){
							adjustForTouch(data.start,data.stop,data.scaling,data.centerMove);
						});
					}
					
					__$$('append_parent').appendChild(menu);
					if (__$$(menuid + '_adjust')) {
						$("#" + menuid + '_adjust').on("tip tipclick", function(e) {
							adjust(e, 1)
						});
					}
					if (__$$(menuid + '_imgclose')) {
						$("#" + menuid + '_imgclose').on("tip tipclick", function(e) {
							hideMenu();
						});
					}
				}
				showloading(zimg, pn);
				picpage = '';
				__$$(menuid + '_picpage').innerHTML = '';
				if (typeof zoomgroup == 'object' && zoomgroup[obj.id]
						&& typeof aimgcount == 'object' && aimgcount[zoomgroup[obj.id]]) {
					authorimgs = aimgcount[zoomgroup[obj.id]];
					var aid = obj.id.substr(5), authorlength = authorimgs.length, authorcurrent = '';
					if (authorlength > 1) {
						for (i = 0; i < authorlength; i++) {
							if (aid == authorimgs[i]) {
								authorcurrent = i;
							}
						}
						if (authorcurrent !== '') {
							paid = authorcurrent > 0 ? authorimgs[authorcurrent - 1]
									: authorimgs[authorlength - 1];
							picpage += ' <div id="zimg_prev" onmouseover="dragMenuDisabled=true;this.style.backgroundPosition=\'0 50px\'" onmouseout="dragMenuDisabled=false;this.style.backgroundPosition=\'0 -100px\';" onclick="_zoom_page(\''
									+ paid
									+ '\', '
									+ (showexif ? 1 : 0)
									+ ')" class="zimg_prev"><strong>上一张</strong></div> ';
							paid = authorcurrent < authorlength - 1 ? authorimgs[authorcurrent + 1]
									: authorimgs[0];
							picpage += ' <div id="zimg_next" onmouseover="dragMenuDisabled=true;this.style.backgroundPosition=\'100% 50px\'" onmouseout="dragMenuDisabled=false;this.style.backgroundPosition=\'100% -100px\';" onclick="_zoom_page(\''
									+ paid
									+ '\', '
									+ (showexif ? 1 : 0)
									+ ')" class="zimg_next"><strong>下一张</strong></div> ';
						}
						if (picpage) {
							__$$(menuid + '_picpage').innerHTML = picpage;
						}
					}
				}
				showMenu({
					'ctrlid' : obj.id,
					'menuid' : menuid,
					'duration' : 3,
					'pos' : '00',
					'cover' : cover,
					'drag' : menuid,
					'maxh' : ''
				});
			}
			
			function _zoom_page(paid, showexif) {
				var imagesrc = __$$('aimg_' + paid).getAttribute('zoomfile') ? __$$(
						'aimg_' + paid).getAttribute('zoomfile') : __$$('aimg_' + paid)
						.getAttribute('file');
				zoom(__$$('aimg_' + paid), imagesrc, 0, 1, showexif ? 1 : 0);
			}
			
			function clearExif(){
				//hideMenu();
				$("#" + 'imgzoom_exif').empty();
				$("#" + 'imgzoom_ext').empty();
				//_lszoom_attribute = {};
				$("#append_parent").empty();
				if(lszoomoption() && lszoomoption().onClose){
					lszoomoption().onClose();
				}
				if("onmspointerdown" in document){
					$("html").css("-ms-touch-action","pan-y");
				}
			}
			
			function _ls_zoom_user( step ) {
				var menuid = 'imgzoom';
				var menu = __$$(menuid);
				var zoomid = menuid + '_zoom';
				var ele = __$$(zoomid);
				if (!ele) {
					return;
				}
				var imgw = ele.getAttribute('w');
				var imgh = ele.getAttribute('h');
				
				if ( step < 0 ) {
					if (parseInt($(ele).attr("width")) - 1 <= 300 || parseInt($(ele).attr("height")) - 1 <= 200) {
						doane();
						return;
					}
				}else{
					var amplityRate = 40;
					if(lszoomoption() && lszoomoption().enableamplityrate){
						amplityRate = lszoomoption().enableamplityrate;
					}
					if (Number($(ele).attr("width")) + 1 >= imgw * amplityRate) {
						doane();
						return;
					}
				}
				
				var ratio = 0;
				var menutop = parseFloat(menu.getAttribute('top_')
						|| menu.style.top);
				var menuleft = parseFloat(menu.getAttribute('left_')
						|| menu.style.left);
				var ow = parseFloat(Number($(ele).attr("width"))) < 300? 300 : Number($(ele).attr("width"));
				if (imgw >= imgh) {
					ratio = step / Number($(ele).attr("height"));
					$(ele).attr("height", Number($(ele).attr("height")) + step);
					$(ele).css("height", Number($(ele).attr("height")) + "px");
					$(ele).attr("width", imgw * (Number($(ele).attr("height")) / imgh));
					$(ele).css("width", imgw * (Number($(ele).attr("height")) / imgh) + "px");
				} else if (imgw < imgh) {
					ratio = step / Number($(ele).attr("width"));
					$(ele).attr("width" ,Number($(ele).attr("width")) + step);
					$(ele).css("width" ,Number($(ele).attr("width")) + "px");
					$(ele).attr("height" , imgh * (Number($(ele).attr("width")) / imgw));
					$(ele).css("height" , imgh * (Number($(ele).attr("width")) / imgw) + "px");
				}
				
				menu.style.left = menuleft - (parseFloat(Number($(ele).attr("width")) < 300 ? 300
						: parseFloat(Number($(ele).attr("width")))) - ow) + "px";
				menu.setAttribute('left_', menuleft - (parseFloat(Number($(ele).attr("width")) < 300 ? 300
						: parseFloat(Number($(ele).attr("width")))) - ow) + "px");

				menu.style.width = (parseFloat(Number($(ele).attr("width")) < 300 ? 300
						: parseFloat(Number($(ele).attr("width")))) + 20)
						+ 'px';
				var mheight = (parseFloat(Number($(ele).attr("height"))) + 50);
				menu.style.height = mheight + 'px';
				__$$(menuid + '_zoomlayer').style.height = (mheight < 120 ? 120 : mheight)
						+ 'px';
			}
			
			function zoomIn( target ) {
				_ls_zoom_user(20);
			}
			
			function zoomOut( target ) {
				_ls_zoom_user(-20);
			}
			
			
			if(!$("#append_parent").length){
				$("body").append($("<div id='append_parent'></div>"));
			}
			
			function open() {
				setTimeout(function(){ _isOpen = false;}, 1000);
				//clearExif();
				zoom(event.target, $(event.target).attr("zoomfile"), 0, 0, 1);
			}
			function _init($item){
				var _isOpen = false;
				var triggerEvent = "";
				if(lszoomoption() && lszoomoption().triggerEvent){
					triggerEvent = lszoomoption().triggerEvent;
				}else{
					triggerEvent = "tip tipclick";
				}
				$item.bind(triggerEvent, function(event){
					event.preventDefault();
					if ( _isOpen ) {
						return ;
					}
					_isOpen = true;
					setTimeout(function(){ _isOpen = false;}, 1000);
					//clearExif();
					if(lszoomoption() && lszoomoption().beforeShow){
						var skip = lszoomoption().beforeShow();
						if(skip === false){
							return;
						}
					}
					zoom(event.target, $(event.target).attr("zoomfile"), 0, 0, 1);
					//bindExtEvents();
				});
			}
			$(this).each(function(key,value){
				_init($(value));
			});
		}
	});
});