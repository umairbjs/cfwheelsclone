/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!String.prototype.startsWith){
Object.defineProperty(String.prototype,"startsWith",{value:function(_1fa,pos){
pos=!pos||pos<0?0:+pos;
return this.substring(pos,pos+_1fa.length)===_1fa;
}});
}
function cfinit(){
if(!window.ColdFusion){
ColdFusion={};
var $C=ColdFusion;
if(!$C.Ajax){
$C.Ajax={};
}
var $A=$C.Ajax;
if(!$C.AjaxProxy){
$C.AjaxProxy={};
}
var $X=$C.AjaxProxy;
if(!$C.Bind){
$C.Bind={};
}
var $B=$C.Bind;
if(!$C.Event){
$C.Event={};
}
var $E=$C.Event;
if(!$C.Log){
$C.Log={};
}
var $L=$C.Log;
if(!$C.Util){
$C.Util={};
}
var $U=$C.Util;
if(!$C.DOM){
$C.DOM={};
}
var $D=$C.DOM;
if(!$C.Spry){
$C.Spry={};
}
var $S=$C.Spry;
if(!$C.Pod){
$C.Pod={};
}
var $P=$C.Pod;
if(!$C.objectCache){
$C.objectCache={};
}
if(!$C.required){
$C.required={};
}
if(!$C.importedTags){
$C.importedTags=[];
}
if(!$C.requestCounter){
$C.requestCounter=0;
}
if(!$C.bindHandlerCache){
$C.bindHandlerCache={};
}
window._cf_loadingtexthtml="<div style=\"text-align: center;\">"+window._cf_loadingtexthtml+"&nbsp;"+CFMessage["loading"]+"</div>";
$C.globalErrorHandler=function(_206,_207){
if($L.isAvailable){
$L.error(_206,_207);
}
if($C.userGlobalErrorHandler){
$C.userGlobalErrorHandler(_206);
}
if(!$L.isAvailable&&!$C.userGlobalErrorHandler){
alert(_206+CFMessage["globalErrorHandler.alert"]);
}
};
$C.handleError=function(_208,_209,_20a,_20b,_20c,_20d,_20e,_20f){
var msg=$L.format(_209,_20b);
if(_208){
$L.error(msg,"http");
if(!_20c){
_20c=-1;
}
if(!_20d){
_20d=msg;
}
_208(_20c,_20d,_20f);
}else{
if(_20e){
$L.error(msg,"http");
throw msg;
}else{
$C.globalErrorHandler(msg,_20a);
}
}
};
$C.setGlobalErrorHandler=function(_211){
$C.userGlobalErrorHandler=_211;
};
$A.createXMLHttpRequest=function(){
try{
return new XMLHttpRequest();
}
catch(e){
}
var _212=["Microsoft.XMLHTTP","MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"];
for(var i=0;i<_212.length;i++){
try{
return new ActiveXObject(_212[i]);
}
catch(e){
}
}
return false;
};
$A.isRequestError=function(req){
return ((req.status!=0&&req.status!=200)||req.getResponseHeader("server-error"));
};
$A.sendMessage=function(url,_216,_217,_218,_219,_21a,_21b){
var req=$A.createXMLHttpRequest();
if(!_216){
_216="GET";
}
if(_218&&_219){
req.onreadystatechange=function(){
$A.callback(req,_219,_21a);
};
}
if(_217){
_217+="&_cf_nodebug=true&_cf_nocache=true";
}else{
_217="_cf_nodebug=true&_cf_nocache=true";
}
if(window._cf_clientid){
_217+="&_cf_clientid="+_cf_clientid;
}
if(_216=="GET"){
if(_217){
_217+="&_cf_rc="+($C.requestCounter++);
if(url.indexOf("?")==-1){
url+="?"+_217;
}else{
url+="&"+_217;
}
}
$L.info("ajax.sendmessage.get","http",[url]);
req.open(_216,url,_218);
req.send(null);
}else{
$L.info("ajax.sendmessage.post","http",[url,_217]);
req.open(_216,url,_218);
req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if(_217){
req.send(_217);
}else{
req.send(null);
}
}
if(!_218){
while(req.readyState!=4){
}
if($A.isRequestError(req)){
$C.handleError(null,"ajax.sendmessage.error","http",[req.status,req.statusText],req.status,req.statusText,_21b);
}else{
return req;
}
}
};
$A.callback=function(req,_21e,_21f){
if(req.readyState!=4){
return;
}
req.onreadystatechange=new Function;
_21e(req,_21f);
};
$A.submitForm=function(_220,url,_222,_223,_224,_225){
var _226=$C.getFormQueryString(_220);
if(_226==-1){
$C.handleError(_223,"ajax.submitform.formnotfound","http",[_220],-1,null,true);
return;
}
if(!_224){
_224="POST";
}
_225=!(_225===false);
var _227=function(req){
$A.submitForm.callback(req,_220,_222,_223);
};
$L.info("ajax.submitform.submitting","http",[_220]);
var _229=$A.sendMessage(url,_224,_226,_225,_227);
if(!_225){
$L.info("ajax.submitform.success","http",[_220]);
return _229.responseText;
}
};
$A.submitForm.callback=function(req,_22b,_22c,_22d){
if($A.isRequestError(req)){
$C.handleError(_22d,"ajax.submitform.error","http",[req.status,_22b,req.statusText],req.status,req.statusText);
}else{
$L.info("ajax.submitform.success","http",[_22b]);
if(_22c){
_22c(req.responseText);
}
}
};
$C.empty=function(){
};
$C.setSubmitClicked=function(_22e,_22f){
var el=$D.getElement(_22f,_22e);
el.cfinputbutton=true;
$C.setClickedProperty=function(){
el.clicked=true;
};
$E.addListener(el,"click",$C.setClickedProperty);
};
$C.getFormQueryString=function(_231,_232){
var _233;
if(typeof _231=="string"){
_233=(document.getElementById(_231)||document.forms[_231]);
}else{
if(typeof _231=="object"){
_233=_231;
}
}
if(!_233||null==_233.elements){
return -1;
}
var _234,elementName,elementValue,elementDisabled;
var _235=false;
var _236=(_232)?{}:"";
for(var i=0;i<_233.elements.length;i++){
_234=_233.elements[i];
elementDisabled=_234.disabled;
elementName=_234.name;
elementValue=_234.value;
if(_234.id&&_234.id.startsWith("cf_textarea")){
var _238=CKEDITOR.instances;
if(_238){
for(ta in _238){
if(_238[ta].getData){
elementValue=_238[ta].getData();
break;
}
}
}
}
if(!elementDisabled&&elementName){
switch(_234.type){
case "select-one":
case "select-multiple":
for(var j=0;j<_234.options.length;j++){
if(_234.options[j].selected){
if(window.ActiveXObject){
_236=$C.getFormQueryString.processFormData(_236,_232,elementName,_234.options[j].attributes["value"].specified?_234.options[j].value:_234.options[j].text);
}else{
_236=$C.getFormQueryString.processFormData(_236,_232,elementName,_234.options[j].hasAttribute("value")?_234.options[j].value:_234.options[j].text);
}
}
}
break;
case "radio":
case "checkbox":
if(_234.checked){
_236=$C.getFormQueryString.processFormData(_236,_232,elementName,elementValue);
}
break;
case "file":
case undefined:
case "reset":
break;
case "button":
_236=$C.getFormQueryString.processFormData(_236,_232,elementName,elementValue);
break;
case "submit":
if(_234.cfinputbutton){
if(_235==false&&_234.clicked){
_236=$C.getFormQueryString.processFormData(_236,_232,elementName,elementValue);
_235=true;
}
}else{
_236=$C.getFormQueryString.processFormData(_236,_232,elementName,elementValue);
}
break;
case "textarea":
var _23a;
if(window.FCKeditorAPI&&(_23a=$C.objectCache[elementName])&&_23a.richtextid){
var _23b=FCKeditorAPI.GetInstance(_23a.richtextid);
if(_23b){
elementValue=_23b.GetXHTML();
}
}
_236=$C.getFormQueryString.processFormData(_236,_232,elementName,elementValue);
break;
default:
_236=$C.getFormQueryString.processFormData(_236,_232,elementName,elementValue);
break;
}
}
}
if(!_232){
_236=_236.substr(0,_236.length-1);
}
return _236;
};
$C.getFormQueryString.processFormData=function(_23c,_23d,_23e,_23f){
if(_23d){
if(_23c[_23e]){
_23c[_23e]+=","+_23f;
}else{
_23c[_23e]=_23f;
}
}else{
_23c+=encodeURIComponent(_23e)+"="+encodeURIComponent(_23f)+"&";
}
return _23c;
};
$A.importTag=function(_240){
$C.importedTags.push(_240);
};
$A.checkImportedTag=function(_241){
var _242=false;
for(var i=0;i<$C.importedTags.length;i++){
if($C.importedTags[i]==_241){
_242=true;
break;
}
}
if(!_242){
$C.handleError(null,"ajax.checkimportedtag.error","widget",[_241]);
}
};
$C.getElementValue=function(_244,_245,_246){
if(!_244){
$C.handleError(null,"getelementvalue.noelementname","bind",null,null,null,true);
return;
}
if(!_246){
_246="value";
}
var _247=$B.getBindElementValue(_244,_245,_246);
if(typeof (_247)=="undefined"){
_247=null;
}
if(_247==null){
$C.handleError(null,"getelementvalue.elnotfound","bind",[_244,_246],null,null,true);
return;
}
return _247;
};
$B.getBindElementValue=function(_248,_249,_24a,_24b,_24c){
var _24d="";
if(window[_248]){
var _24e=eval(_248);
if(_24e&&_24e._cf_getAttribute){
_24d=_24e._cf_getAttribute(_24a);
return _24d;
}
}
var _24f=$C.objectCache[_248];
if(_24f&&_24f._cf_getAttribute){
_24d=_24f._cf_getAttribute(_24a);
return _24d;
}
var el=$D.getElement(_248,_249);
var _251=(el&&((!el.length&&el.length!=0)||(el.length&&el.length>0)||el.tagName=="SELECT"));
if(!_251&&!_24c){
$C.handleError(null,"bind.getbindelementvalue.elnotfound","bind",[_248]);
return null;
}
if(el.tagName!="SELECT"){
if(el.length>1){
var _252=true;
for(var i=0;i<el.length;i++){
var _254=(el[i].getAttribute("type")=="radio"||el[i].getAttribute("type")=="checkbox");
if(!_254||(_254&&el[i].checked)){
if(!_252){
_24d+=",";
}
_24d+=$B.getBindElementValue.extract(el[i],_24a);
_252=false;
}
}
}else{
_24d=$B.getBindElementValue.extract(el,_24a);
}
}else{
var _252=true;
for(var i=0;i<el.options.length;i++){
if(el.options[i].selected){
if(!_252){
_24d+=",";
}
_24d+=$B.getBindElementValue.extract(el.options[i],_24a);
_252=false;
}
}
}
if(typeof (_24d)=="object"){
$C.handleError(null,"bind.getbindelementvalue.simplevalrequired","bind",[_248,_24a]);
return null;
}
if(_24b&&$C.required[_248]&&_24d.length==0){
return null;
}
return _24d;
};
$B.getBindElementValue.extract=function(el,_256){
var _257=el[_256];
if((_257==null||typeof (_257)=="undefined")&&el.getAttribute){
_257=el.getAttribute(_256);
}
return _257;
};
$L.init=function(){
if(window.YAHOO&&YAHOO.widget&&YAHOO.widget.Logger){
YAHOO.widget.Logger.categories=[CFMessage["debug"],CFMessage["info"],CFMessage["error"],CFMessage["window"]];
YAHOO.widget.LogReader.prototype.formatMsg=function(_258){
var _259=_258.category;
return "<p>"+"<span class='"+_259+"'>"+_259+"</span>:<i>"+_258.source+"</i>: "+_258.msg+"</p>";
};
var _25a=new YAHOO.widget.LogReader(null,{width:"30em",fontSize:"100%"});
_25a.setTitle(CFMessage["log.title"]||"ColdFusion AJAX Logger");
_25a._btnCollapse.value=CFMessage["log.collapse"]||"Collapse";
_25a._btnPause.value=CFMessage["log.pause"]||"Pause";
_25a._btnClear.value=CFMessage["log.clear"]||"Clear";
$L.isAvailable=true;
}
};
$L.log=function(_25b,_25c,_25d,_25e){
if(!$L.isAvailable){
return;
}
if(!_25d){
_25d="global";
}
_25d=CFMessage[_25d]||_25d;
_25c=CFMessage[_25c]||_25c;
_25b=$L.format(_25b,_25e);
YAHOO.log(_25b,_25c,_25d);
};
$L.format=function(code,_260){
var msg=CFMessage[code]||code;
if(_260){
for(i=0;i<_260.length;i++){
if(!_260[i].length){
_260[i]="";
}
var _262="{"+i+"}";
msg=msg.replace(_262,_260[i]);
}
}
return msg;
};
$L.debug=function(_263,_264,_265){
$L.log(_263,"debug",_264,_265);
};
$L.info=function(_266,_267,_268){
$L.log(_266,"info",_267,_268);
};
$L.error=function(_269,_26a,_26b){
$L.log(_269,"error",_26a,_26b);
};
$L.dump=function(_26c,_26d){
if($L.isAvailable){
var dump=(/string|number|undefined|boolean/.test(typeof (_26c))||_26c==null)?_26c:recurse(_26c,typeof _26c,true);
$L.debug(dump,_26d);
}
};
$X.invoke=function(_26f,_270,_271,_272,_273){
return $X.invokeInternal(_26f,_270,_271,_272,_273,false,null,null);
};
$X.invokeInternal=function(_274,_275,_276,_277,_278,_279,_27a,_27b){
var _27c="method="+_275+"&_cf_ajaxproxytoken="+_276;
if(_279){
_27c+="&_cfclient="+"true";
var _27d=$X.JSON.encodeInternal(_274._variables,_279);
_27c+="&_variables="+encodeURIComponent(_27d);
var _27e=$X.JSON.encodeInternal(_274._metadata,_279);
_27c+="&_metadata="+encodeURIComponent(_27e);
}
var _27f=_274.returnFormat||"json";
_27c+="&returnFormat="+_27f;
if(_274.queryFormat){
_27c+="&queryFormat="+_274.queryFormat;
}
if(_274.formId){
var _280=$C.getFormQueryString(_274.formId,true);
if(_277!=null){
for(prop in _280){
_277[prop]=_280[prop];
}
}else{
_277=_280;
}
_274.formId=null;
}
var _281="";
if(_277!=null){
_281=$X.JSON.encodeInternal(_277,_279);
_27c+="&argumentCollection="+encodeURIComponent(_281);
}
$L.info("ajaxproxy.invoke.invoking","http",[_274.cfcPath,_275,_281]);
if(_274.callHandler){
_274.callHandler.call(null,_274.callHandlerParams,_274.cfcPath,_27c);
return;
}
var _282;
var _283=_274.async;
if(_27a!=null){
_283=true;
_282=function(req){
$X.callbackOp(req,_274,_278,_27a,_27b);
};
}else{
if(_274.async){
_282=function(req){
$X.callback(req,_274,_278);
};
}
}
var req=$A.sendMessage(_274.cfcPath,_274.httpMethod,_27c,_283,_282,null,true);
if(!_283){
return $X.processResponse(req,_274);
}
};
$X.callback=function(req,_288,_289){
if($A.isRequestError(req)){
$C.handleError(_288.errorHandler,"ajaxproxy.invoke.error","http",[req.status,_288.cfcPath,req.statusText],req.status,req.statusText,false,_289);
}else{
if(_288.callbackHandler){
var _28a=$X.processResponse(req,_288);
_288.callbackHandler(_28a,_289);
}
}
};
$X.callbackOp=function(req,_28c,_28d,_28e,_28f){
if($A.isRequestError(req)){
var _290=_28c.errorHandler;
if(_28f!=null){
_290=_28f;
}
$C.handleError(_290,"ajaxproxy.invoke.error","http",[req.status,_28c.cfcPath,req.statusText],req.status,req.statusText,false,_28d);
}else{
if(_28e){
var _291=$X.processResponse(req,_28c);
_28e(_291,_28d);
}
}
};
$X.processResponse=function(req,_293){
var _294=true;
for(var i=0;i<req.responseText.length;i++){
var c=req.responseText.charAt(i);
_294=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_294){
break;
}
}
var _297=(req.responseXML&&req.responseXML.childNodes.length>0);
var _298=_297?"[XML Document]":req.responseText;
$L.info("ajaxproxy.invoke.response","http",[_298]);
var _299;
var _29a=_293.returnFormat||"json";
if(_29a=="json"){
try{
_299=_294?null:$X.JSON.decode(req.responseText);
}
catch(e){
if(typeof _293._metadata!=="undefined"&&_293._metadata.servercfc&&typeof req.responseText==="string"){
_299=req.responseText;
}else{
throw e;
}
}
}else{
_299=_297?req.responseXML:(_294?null:req.responseText);
}
return _299;
};
$X.init=function(_29b,_29c,_29d){
if(typeof _29d==="undefined"){
_29d=false;
}
var _29e=_29c;
if(!_29d){
var _29f=_29c.split(".");
var ns=self;
for(i=0;i<_29f.length-1;i++){
if(_29f[i].length){
ns[_29f[i]]=ns[_29f[i]]||{};
ns=ns[_29f[i]];
}
}
var _2a1=_29f[_29f.length-1];
if(ns[_2a1]){
return ns[_2a1];
}
ns[_2a1]=function(){
this.httpMethod="GET";
this.async=false;
this.callbackHandler=null;
this.errorHandler=null;
this.formId=null;
};
_29e=ns[_2a1].prototype;
}else{
_29e.httpMethod="GET";
_29e.async=false;
_29e.callbackHandler=null;
_29e.errorHandler=null;
_29e.formId=null;
}
_29e.cfcPath=_29b;
_29e.setHTTPMethod=function(_2a2){
if(_2a2){
_2a2=_2a2.toUpperCase();
}
if(_2a2!="GET"&&_2a2!="POST"){
$C.handleError(null,"ajaxproxy.sethttpmethod.invalidmethod","http",[_2a2],null,null,true);
}
this.httpMethod=_2a2;
};
_29e.setSyncMode=function(){
this.async=false;
};
_29e.setAsyncMode=function(){
this.async=true;
};
_29e.setCallbackHandler=function(fn){
this.callbackHandler=fn;
this.setAsyncMode();
};
_29e.setErrorHandler=function(fn){
this.errorHandler=fn;
this.setAsyncMode();
};
_29e.setForm=function(fn){
this.formId=fn;
};
_29e.setQueryFormat=function(_2a6){
if(_2a6){
_2a6=_2a6.toLowerCase();
}
if(!_2a6||(_2a6!="column"&&_2a6!="row"&&_2a6!="struct")){
$C.handleError(null,"ajaxproxy.setqueryformat.invalidformat","http",[_2a6],null,null,true);
}
this.queryFormat=_2a6;
};
_29e.setReturnFormat=function(_2a7){
if(_2a7){
_2a7=_2a7.toLowerCase();
}
if(!_2a7||(_2a7!="plain"&&_2a7!="json"&&_2a7!="wddx")){
$C.handleError(null,"ajaxproxy.setreturnformat.invalidformat","http",[_2a7],null,null,true);
}
this.returnFormat=_2a7;
};
$L.info("ajaxproxy.init.created","http",[_29b]);
if(_29d){
return _29e;
}else{
return ns[_2a1];
}
};
$U.isWhitespace=function(s){
var _2a9=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_2a9=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_2a9){
break;
}
}
return _2a9;
};
$U.getFirstNonWhitespaceIndex=function(s){
var _2ad=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_2ad=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_2ad){
break;
}
}
return i;
};
$C.trim=function(_2b0){
return _2b0.replace(/^\s+|\s+$/g,"");
};
$U.isInteger=function(n){
var _2b2=true;
if(typeof (n)=="number"){
_2b2=(n>=0);
}else{
for(i=0;i<n.length;i++){
if($U.isInteger.numberChars.indexOf(n.charAt(i))==-1){
_2b2=false;
break;
}
}
}
return _2b2;
};
$U.isInteger.numberChars="0123456789";
$U.isArray=function(a){
return (typeof (a.length)=="number"&&!a.toUpperCase);
};
$U.isBoolean=function(b){
if(b===true||b===false){
return true;
}else{
if(b.toLowerCase){
b=b.toLowerCase();
return (b==$U.isBoolean.trueChars||b==$U.isBoolean.falseChars);
}else{
return false;
}
}
};
$U.isBoolean.trueChars="true";
$U.isBoolean.falseChars="false";
$U.castBoolean=function(b){
if(b===true){
return true;
}else{
if(b===false){
return false;
}else{
if(b.toLowerCase){
b=b.toLowerCase();
if(b==$U.isBoolean.trueChars){
return true;
}else{
if(b==$U.isBoolean.falseChars){
return false;
}else{
return false;
}
}
}else{
return false;
}
}
}
};
$U.checkQuery=function(o){
var _2b7=null;
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.DATA&&$U.isArray(o.DATA)&&(o.DATA.length==0||(o.DATA.length>0&&$U.isArray(o.DATA[0])))){
_2b7="row";
}else{
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.ROWCOUNT&&$U.isInteger(o.ROWCOUNT)&&o.DATA){
_2b7="col";
for(var i=0;i<o.COLUMNS.length;i++){
var _2b9=o.DATA[o.COLUMNS[i]];
if(!_2b9||!$U.isArray(_2b9)){
_2b7=null;
break;
}
}
}
}
return _2b7;
};
$X.JSON=new function(){
var _2ba={}.hasOwnProperty?true:false;
var _2bb=/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/;
var pad=function(n){
return n<10?"0"+n:n;
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};
var _2bf=function(s){
if(/["\\\x00-\x1f]/.test(s)){
return "\""+s.replace(/([\x00-\x1f\\"])/g,function(a,b){
var c=m[b];
if(c){
return c;
}
c=b.charCodeAt();
return "\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);
})+"\"";
}
return "\""+s+"\"";
};
var _2c4=function(o){
var a=["["],b,i,l=o.length,v;
for(i=0;i<l;i+=1){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(v===null?"null":$X.JSON.encode(v));
b=true;
}
}
a.push("]");
return a.join("");
};
var _2c7=function(o){
return "\""+o.getFullYear()+"-"+pad(o.getMonth()+1)+"-"+pad(o.getDate())+"T"+pad(o.getHours())+":"+pad(o.getMinutes())+":"+pad(o.getSeconds())+"\"";
};
this.encode=function(o){
return this.encodeInternal(o,false);
};
this.encodeInternal=function(o,cfc){
if(typeof o=="undefined"||o===null){
return "null";
}else{
if(o instanceof Array){
return _2c4(o);
}else{
if(o instanceof Date){
if(cfc){
return this.encodeInternal({_date_:o.getTime()},cfc);
}
return _2c7(o);
}else{
if(typeof o=="string"){
return _2bf(o);
}else{
if(typeof o=="number"){
return isFinite(o)?String(o):"null";
}else{
if(typeof o=="boolean"){
return String(o);
}else{
if(cfc&&typeof o=="object"&&typeof o._metadata!=="undefined"){
return "{\"_metadata\":"+this.encodeInternal(o._metadata,false)+",\"_variables\":"+this.encodeInternal(o._variables,cfc)+"}";
}else{
var a=["{"],b,i,v;
for(var i in o){
if(!_2ba||o.hasOwnProperty(i)){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(this.encodeInternal(i,cfc),":",v===null?"null":this.encodeInternal(v,cfc));
b=true;
}
}
}
a.push("}");
return a.join("");
}
}
}
}
}
}
}
};
this.decode=function(json){
if(typeof json=="object"){
return json;
}
if($U.isWhitespace(json)){
return null;
}
var _2cf=$U.getFirstNonWhitespaceIndex(json);
if(_2cf>0){
json=json.slice(_2cf);
}
if(window._cf_jsonprefix&&json.indexOf(_cf_jsonprefix)==0){
json=json.slice(_cf_jsonprefix.length);
}
try{
if(_2bb.test(json)){
return JSON.parse(json);
}
}
catch(e){
}
throw new SyntaxError("parseJSON");
};
}();
if(!$C.JSON){
$C.JSON={};
}
$C.JSON.encode=$X.JSON.encode;
$C.JSON.encodeInternal=$X.JSON.encodeInternal;
$C.JSON.decode=$X.JSON.decode;
$C.navigate=function(url,_2d1,_2d2,_2d3,_2d4,_2d5){
if(url==null){
$C.handleError(_2d3,"navigate.urlrequired","widget");
return;
}
if(_2d4){
_2d4=_2d4.toUpperCase();
if(_2d4!="GET"&&_2d4!="POST"){
$C.handleError(null,"navigate.invalidhttpmethod","http",[_2d4],null,null,true);
}
}else{
_2d4="GET";
}
var _2d6;
if(_2d5){
_2d6=$C.getFormQueryString(_2d5);
if(_2d6==-1){
$C.handleError(null,"navigate.formnotfound","http",[_2d5],null,null,true);
}
}
if(_2d1==null){
if(_2d6){
if(url.indexOf("?")==-1){
url+="?"+_2d6;
}else{
url+="&"+_2d6;
}
}
$L.info("navigate.towindow","widget",[url]);
window.location.replace(url);
return;
}
$L.info("navigate.tocontainer","widget",[url,_2d1]);
var obj=$C.objectCache[_2d1];
if(obj!=null){
if(typeof (obj._cf_body)!="undefined"&&obj._cf_body!=null){
_2d1=obj._cf_body;
}
}
$A.replaceHTML(_2d1,url,_2d4,_2d6,_2d2,_2d3);
};
$A.checkForm=function(_2d8,_2d9,_2da,_2db,_2dc){
var _2dd=_2d9.call(null,_2d8);
if(_2dd==false){
return false;
}
var _2de=$C.getFormQueryString(_2d8);
$L.info("ajax.submitform.submitting","http",[_2d8.name]);
$A.replaceHTML(_2da,_2d8.action,_2d8.method,_2de,_2db,_2dc);
return false;
};
$A.replaceHTML=function(_2df,url,_2e1,_2e2,_2e3,_2e4){
var _2e5=document.getElementById(_2df);
if(!_2e5){
$C.handleError(_2e4,"ajax.replacehtml.elnotfound","http",[_2df]);
return;
}
var _2e6="_cf_containerId="+encodeURIComponent(_2df);
_2e2=(_2e2)?_2e2+"&"+_2e6:_2e6;
$L.info("ajax.replacehtml.replacing","http",[_2df,url,_2e2]);
if(_cf_loadingtexthtml){
try{
_2e5.innerHTML=_cf_loadingtexthtml;
}
catch(e){
}
}
var _2e7=function(req,_2e9){
var _2ea=false;
if($A.isRequestError(req)){
$C.handleError(_2e4,"ajax.replacehtml.error","http",[req.status,_2e9.id,req.statusText],req.status,req.statusText);
_2ea=true;
}
var _2eb=new $E.CustomEvent("onReplaceHTML",_2e9);
var _2ec=new $E.CustomEvent("onReplaceHTMLUser",_2e9);
$E.loadEvents[_2e9.id]={system:_2eb,user:_2ec};
if(req.responseText.search(/<script/i)!=-1){
try{
_2e9.innerHTML="";
}
catch(e){
}
$A.replaceHTML.processResponseText(req.responseText,_2e9,_2e4);
}else{
try{
_2e9.innerHTML=req.responseText;
$A.updateLayouttab(_2e9);
if(_2e2.indexOf("window-id")>-1){
var q=_2e2.substring(_2e2.indexOf("window-id")+10,_2e2.indexOf("&"));
var cmp=Ext.getCmp(q);
if(cmp){
cmp.update(_2e9.innerHTML);
}
}
}
catch(e){
}
}
$E.loadEvents[_2e9.id]=null;
_2eb.fire();
_2eb.unsubscribe();
_2ec.fire();
_2ec.unsubscribe();
$L.info("ajax.replacehtml.success","http",[_2e9.id]);
if(_2e3&&!_2ea){
_2e3();
}
};
try{
$A.sendMessage(url,_2e1,_2e2,true,_2e7,_2e5);
}
catch(e){
try{
_2e5.innerHTML=$L.format(CFMessage["ajax.replacehtml.connectionerrordisplay"],[url,e]);
}
catch(e){
}
$C.handleError(_2e4,"ajax.replacehtml.connectionerror","http",[_2df,url,e]);
}
};
$A.replaceHTML.processResponseText=function(text,_2f0,_2f1){
var pos=0;
var _2f3=0;
var _2f4=0;
_2f0._cf_innerHTML="";
while(pos<text.length){
var _2f5=text.indexOf("<s",pos);
if(_2f5==-1){
_2f5=text.indexOf("<S",pos);
}
if(_2f5==-1){
break;
}
pos=_2f5;
var _2f6=true;
var _2f7=$A.replaceHTML.processResponseText.scriptTagChars;
for(var i=1;i<_2f7.length;i++){
var _2f9=pos+i+1;
if(_2f9>text.length){
break;
}
var _2fa=text.charAt(_2f9);
if(_2f7[i][0]!=_2fa&&_2f7[i][1]!=_2fa){
pos+=i+1;
_2f6=false;
break;
}
}
if(!_2f6){
continue;
}
var _2fb=text.substring(_2f3,pos);
if(_2fb){
_2f0._cf_innerHTML+=_2fb;
}
var _2fc=text.indexOf(">",pos)+1;
if(_2fc==0){
pos++;
continue;
}else{
pos+=7;
}
var _2fd=_2fc;
while(_2fd<text.length&&_2fd!=-1){
_2fd=text.indexOf("</s",_2fd);
if(_2fd==-1){
_2fd=text.indexOf("</S",_2fd);
}
if(_2fd!=-1){
_2f6=true;
for(var i=1;i<_2f7.length;i++){
var _2f9=_2fd+2+i;
if(_2f9>text.length){
break;
}
var _2fa=text.charAt(_2f9);
if(_2f7[i][0]!=_2fa&&_2f7[i][1]!=_2fa){
_2fd=_2f9;
_2f6=false;
break;
}
}
if(_2f6){
break;
}
}
}
if(_2fd!=-1){
var _2fe=text.substring(_2fc,_2fd);
var _2ff=_2fe.indexOf("<!--");
if(_2ff!=-1){
_2fe=_2fe.substring(_2ff+4);
}
var _300=_2fe.lastIndexOf("//-->");
if(_300!=-1){
_2fe=_2fe.substring(0,_300-1);
}
if(_2fe.indexOf("document.write")!=-1||_2fe.indexOf("CF_RunContent")!=-1){
if(_2fe.indexOf("CF_RunContent")!=-1){
_2fe=_2fe.replace("CF_RunContent","document.write");
}
_2fe="var _cfDomNode = document.getElementById('"+_2f0.id+"'); var _cfBuffer='';"+"if (!document._cf_write)"+"{document._cf_write = document.write;"+"document.write = function(str){if (_cfBuffer!=null){_cfBuffer+=str;}else{document._cf_write(str);}};};"+_2fe+";_cfDomNode._cf_innerHTML += _cfBuffer; _cfBuffer=null;";
}
try{
eval(_2fe);
}
catch(ex){
$C.handleError(_2f1,"ajax.replacehtml.jserror","http",[_2f0.id,ex]);
}
}
_2f5=text.indexOf(">",_2fd)+1;
if(_2f5==0){
_2f4=_2fd+1;
break;
}
_2f4=_2f5;
pos=_2f5;
_2f3=_2f5;
}
if(_2f4<text.length-1){
var _2fb=text.substring(_2f4,text.length);
if(_2fb){
_2f0._cf_innerHTML+=_2fb;
}
}
try{
_2f0.innerHTML=_2f0._cf_innerHTML;
$A.updateLayouttab(_2f0);
}
catch(e){
}
_2f0._cf_innerHTML="";
};
$A.updateLayouttab=function(_301){
var _302=_301.id;
var s=_302.substr(13,_302.length);
var cmp=Ext.getCmp(s);
var _305=_301.innerHTML;
var _306=document.getElementById(_302);
var html=_306.innerHTML;
if(cmp){
cmp.update("<div id="+_301.id+">"+html+"</div>");
}
var _306=document.getElementById(_302);
if(_306){
}
};
$A.replaceHTML.processResponseText.scriptTagChars=[["s","S"],["c","C"],["r","R"],["i","I"],["p","P"],["t","T"]];
$D.getElement=function(_308,_309){
var _30a=function(_30b){
return (_30b.name==_308||_30b.id==_308);
};
var _30c=$D.getElementsBy(_30a,null,_309);
if(_30c.length==1){
return _30c[0];
}else{
return _30c;
}
};
$D.getElementsBy=function(_30d,tag,root){
tag=tag||"*";
var _310=[];
if(root){
root=$D.get(root);
if(!root){
return _310;
}
}else{
root=document;
}
var _311=root.getElementsByTagName(tag);
if(!_311.length&&(tag=="*"&&root.all)){
_311=root.all;
}
for(var i=0,len=_311.length;i<len;++i){
if(_30d(_311[i])){
_310[_310.length]=_311[i];
}
}
return _310;
};
$D.get=function(el){
if(!el){
return null;
}
if(typeof el!="string"&&!(el instanceof Array)){
return el;
}
if(typeof el=="string"){
return document.getElementById(el);
}else{
var _314=[];
for(var i=0,len=el.length;i<len;++i){
_314[_314.length]=$D.get(el[i]);
}
return _314;
}
return null;
};
$E.loadEvents={};
$E.CustomEvent=function(_316,_317){
return {name:_316,domNode:_317,subs:[],subscribe:function(func,_319){
var dup=false;
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
if(sub.f==func&&sub.p==_319){
dup=true;
break;
}
}
if(!dup){
this.subs.push({f:func,p:_319});
}
},fire:function(){
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
sub.f.call(null,this,sub.p);
}
},unsubscribe:function(){
this.subscribers=[];
}};
};
$E.windowLoadImpEvent=new $E.CustomEvent("cfWindowLoadImp");
$E.windowLoadEvent=new $E.CustomEvent("cfWindowLoad");
$E.windowLoadUserEvent=new $E.CustomEvent("cfWindowLoadUser");
$E.listeners=[];
$E.addListener=function(el,ev,fn,_322){
var l={el:el,ev:ev,fn:fn,params:_322};
$E.listeners.push(l);
var _324=function(e){
if(!e){
var e=window.event;
}
fn.call(null,e,_322);
};
if(el.addEventListener){
window.addEventListener("load",function(){
el.addEventListener(ev,_324,false);
});
el.addEventListener(ev,_324,false);
return true;
}else{
if(el.attachEvent){
el.attachEvent("on"+ev,_324);
return true;
}else{
return false;
}
}
};
$E.isListener=function(el,ev,fn,_329){
var _32a=false;
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn==fn&&ls[i].params==_329){
_32a=true;
break;
}
}
return _32a;
};
$E.callBindHandlers=function(id,_32e,ev){
var el=document.getElementById(id);
if(!el){
return;
}
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn._cf_bindhandler){
ls[i].fn.call(null,null,ls[i].params);
}
}
};
$E.registerOnLoad=function(func,_334,_335,user){
if($E.registerOnLoad.windowLoaded){
if(_334&&_334._cf_containerId&&$E.loadEvents[_334._cf_containerId]){
if(user){
$E.loadEvents[_334._cf_containerId].user.subscribe(func,_334);
}else{
$E.loadEvents[_334._cf_containerId].system.subscribe(func,_334);
}
}else{
func.call(null,null,_334);
}
}else{
if(user){
$E.windowLoadUserEvent.subscribe(func,_334);
}else{
if(_335){
$E.windowLoadImpEvent.subscribe(func,_334);
}else{
$E.windowLoadEvent.subscribe(func,_334);
}
}
}
};
$E.registerOnLoad.windowLoaded=false;
$E.onWindowLoad=function(fn){
if(window.addEventListener){
window.addEventListener("load",fn,false);
}else{
if(window.attachEvent){
window.attachEvent("onload",fn);
}else{
if(document.getElementById){
window.onload=fn;
}
}
}
};
$C.addSpanToDom=function(){
var _338=document.createElement("span");
document.body.insertBefore(_338,document.body.firstChild);
};
$E.windowLoadHandler=function(e){
if(window.Ext){
Ext.BLANK_IMAGE_URL=_cf_ajaxscriptsrc+"/resources/ext/images/default/s.gif";
}
$C.addSpanToDom();
$L.init();
$E.registerOnLoad.windowLoaded=true;
$E.windowLoadImpEvent.fire();
$E.windowLoadImpEvent.unsubscribe();
$E.windowLoadEvent.fire();
$E.windowLoadEvent.unsubscribe();
if(window.Ext){
Ext.onReady(function(){
$E.windowLoadUserEvent.fire();
});
}else{
$E.windowLoadUserEvent.fire();
}
$E.windowLoadUserEvent.unsubscribe();
};
$E.onWindowLoad($E.windowLoadHandler);
$B.register=function(_33a,_33b,_33c,_33d){
for(var i=0;i<_33a.length;i++){
var _33f=_33a[i][0];
var _340=_33a[i][1];
var _341=_33a[i][2];
if(window[_33f]){
var _342=eval(_33f);
if(_342&&_342._cf_register){
_342._cf_register(_341,_33c,_33b);
continue;
}
}
var _343=$C.objectCache[_33f];
if(_343&&_343._cf_register){
_343._cf_register(_341,_33c,_33b);
continue;
}
var _344=$D.getElement(_33f,_340);
var _345=(_344&&((!_344.length&&_344.length!=0)||(_344.length&&_344.length>0)||_344.tagName=="SELECT"));
if(!_345){
$C.handleError(null,"bind.register.elnotfound","bind",[_33f]);
}
if(_344.length>1&&!_344.options){
for(var j=0;j<_344.length;j++){
$B.register.addListener(_344[j],_341,_33c,_33b);
}
}else{
$B.register.addListener(_344,_341,_33c,_33b);
}
}
if(!$C.bindHandlerCache[_33b.bindTo]&&typeof (_33b.bindTo)=="string"){
$C.bindHandlerCache[_33b.bindTo]=function(){
_33c.call(null,null,_33b);
};
}
if(_33d){
_33c.call(null,null,_33b);
}
};
$B.register.addListener=function(_347,_348,_349,_34a){
if(!$E.isListener(_347,_348,_349,_34a)){
$E.addListener(_347,_348,_349,_34a);
}
};
$B.assignValue=function(_34b,_34c,_34d,_34e){
if(!_34b){
return;
}
if(_34b.call){
_34b.call(null,_34d,_34e);
return;
}
var _34f=$C.objectCache[_34b];
if(_34f&&_34f._cf_setValue){
_34f._cf_setValue(_34d);
return;
}
var _350=document.getElementById(_34b);
if(!_350){
$C.handleError(null,"bind.assignvalue.elnotfound","bind",[_34b]);
}
if(_350.tagName=="SELECT"){
var _351=$U.checkQuery(_34d);
var _352=$C.objectCache[_34b];
if(_351){
if(!_352||(_352&&(!_352.valueCol||!_352.displayCol))){
$C.handleError(null,"bind.assignvalue.selboxmissingvaldisplay","bind",[_34b]);
return;
}
}else{
if(typeof (_34d.length)=="number"&&!_34d.toUpperCase){
if(_34d.length>0&&(typeof (_34d[0].length)!="number"||_34d[0].toUpperCase)){
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_34b]);
return;
}
}else{
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_34b]);
return;
}
}
_350.options.length=0;
var _353;
var _354=false;
if(_352){
_353=_352.selected;
if(_353&&_353.length>0){
_354=true;
}
}
if(!_351){
for(var i=0;i<_34d.length;i++){
var opt=new Option(_34d[i][1],_34d[i][0]);
_350.options[i]=opt;
if(_354){
for(var j=0;j<_353.length;j++){
if(_353[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_351=="col"){
var _358=_34d.DATA[_352.valueCol];
var _359=_34d.DATA[_352.displayCol];
if(!_358||!_359){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_34b]);
return;
}
for(var i=0;i<_358.length;i++){
var opt=new Option(_359[i],_358[i]);
_350.options[i]=opt;
if(_354){
for(var j=0;j<_353.length;j++){
if(_353[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_351=="row"){
var _35a=-1;
var _35b=-1;
for(var i=0;i<_34d.COLUMNS.length;i++){
var col=_34d.COLUMNS[i];
if(col==_352.valueCol){
_35a=i;
}
if(col==_352.displayCol){
_35b=i;
}
if(_35a!=-1&&_35b!=-1){
break;
}
}
if(_35a==-1||_35b==-1){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_34b]);
return;
}
for(var i=0;i<_34d.DATA.length;i++){
var opt=new Option(_34d.DATA[i][_35b],_34d.DATA[i][_35a]);
_350.options[i]=opt;
if(_354){
for(var j=0;j<_353.length;j++){
if(_353[j]==opt.value){
opt.selected=true;
}
}
}
}
}
}
}
}else{
_350[_34c]=_34d;
}
$E.callBindHandlers(_34b,null,"change");
$L.info("bind.assignvalue.success","bind",[_34d,_34b,_34c]);
};
$B.localBindHandler=function(e,_35e){
var _35f=document.getElementById(_35e.bindTo);
var _360=$B.evaluateBindTemplate(_35e,true);
$B.assignValue(_35e.bindTo,_35e.bindToAttr,_360);
};
$B.localBindHandler._cf_bindhandler=true;
$B.evaluateBindTemplate=function(_361,_362,_363,_364,_365){
var _366=_361.bindExpr;
var _367="";
if(typeof _365=="undefined"){
_365=false;
}
for(var i=0;i<_366.length;i++){
if(typeof (_366[i])=="object"){
var _369=null;
if(!_366[i].length||typeof _366[i][0]=="object"){
_369=$X.JSON.encode(_366[i]);
}else{
var _369=$B.getBindElementValue(_366[i][0],_366[i][1],_366[i][2],_362,_364);
if(_369==null){
if(_362){
_367="";
break;
}else{
_369="";
}
}
}
if(_363){
_369=encodeURIComponent(_369);
}
_367+=_369;
}else{
var _36a=_366[i];
if(_365==true&&i>0){
if(typeof (_36a)=="string"&&_36a.indexOf("&")!=0){
_36a=encodeURIComponent(_36a);
}
}
_367+=_36a;
}
}
return _367;
};
$B.jsBindHandler=function(e,_36c){
var _36d=_36c.bindExpr;
var _36e=new Array();
var _36f=_36c.callFunction+"(";
for(var i=0;i<_36d.length;i++){
var _371;
if(typeof (_36d[i])=="object"){
if(_36d[i].length){
if(typeof _36d[i][0]=="object"){
_371=_36d[i];
}else{
_371=$B.getBindElementValue(_36d[i][0],_36d[i][1],_36d[i][2],false);
}
}else{
_371=_36d[i];
}
}else{
_371=_36d[i];
}
if(i!=0){
_36f+=",";
}
_36e[i]=_371;
_36f+="'"+_371+"'";
}
_36f+=")";
var _372=_36c.callFunction.apply(null,_36e);
$B.assignValue(_36c.bindTo,_36c.bindToAttr,_372,_36c.bindToParams);
};
$B.jsBindHandler._cf_bindhandler=true;
$B.urlBindHandler=function(e,_374){
var _375=_374.bindTo;
if($C.objectCache[_375]&&$C.objectCache[_375]._cf_visible===false){
$C.objectCache[_375]._cf_dirtyview=true;
return;
}
var url=$B.evaluateBindTemplate(_374,false,true,false,true);
var _377=$U.extractReturnFormat(url);
if(_377==null||typeof _377=="undefined"){
_377="JSON";
}
if(_374.bindToAttr||typeof _374.bindTo=="undefined"||typeof _374.bindTo=="function"){
var _374={"bindTo":_374.bindTo,"bindToAttr":_374.bindToAttr,"bindToParams":_374.bindToParams,"errorHandler":_374.errorHandler,"url":url,returnFormat:_377};
try{
$A.sendMessage(url,"GET",null,true,$B.urlBindHandler.callback,_374);
}
catch(e){
$C.handleError(_374.errorHandler,"ajax.urlbindhandler.connectionerror","http",[url,e]);
}
}else{
$A.replaceHTML(_375,url,null,null,_374.callback,_374.errorHandler);
}
};
$B.urlBindHandler._cf_bindhandler=true;
$B.urlBindHandler.callback=function(req,_379){
if($A.isRequestError(req)){
$C.handleError(_379.errorHandler,"bind.urlbindhandler.httperror","http",[req.status,_379.url,req.statusText],req.status,req.statusText);
}else{
$L.info("bind.urlbindhandler.response","http",[req.responseText]);
var _37a;
try{
if(_379.returnFormat==null||_379.returnFormat==="JSON"){
_37a=$X.JSON.decode(req.responseText);
}else{
_37a=req.responseText;
}
}
catch(e){
if(req.responseText!=null&&typeof req.responseText=="string"){
_37a=req.responseText;
}else{
$C.handleError(_379.errorHandler,"bind.urlbindhandler.jsonerror","http",[req.responseText]);
}
}
$B.assignValue(_379.bindTo,_379.bindToAttr,_37a,_379.bindToParams);
}
};
$A.initSelect=function(_37b,_37c,_37d,_37e){
$C.objectCache[_37b]={"valueCol":_37c,"displayCol":_37d,selected:_37e};
};
$S.setupSpry=function(){
if(typeof (Spry)!="undefined"&&Spry.Data){
Spry.Data.DataSet.prototype._cf_getAttribute=function(_37f){
var val;
var row=this.getCurrentRow();
if(row){
val=row[_37f];
}
return val;
};
Spry.Data.DataSet.prototype._cf_register=function(_382,_383,_384){
var obs={bindParams:_384};
obs.onCurrentRowChanged=function(){
_383.call(null,null,this.bindParams);
};
obs.onDataChanged=function(){
_383.call(null,null,this.bindParams);
};
this.addObserver(obs);
};
if(Spry.Debug.trace){
var _386=Spry.Debug.trace;
Spry.Debug.trace=function(str){
$L.info(str,"spry");
_386(str);
};
}
if(Spry.Debug.reportError){
var _388=Spry.Debug.reportError;
Spry.Debug.reportError=function(str){
$L.error(str,"spry");
_388(str);
};
}
$L.info("spry.setupcomplete","bind");
}
};
$E.registerOnLoad($S.setupSpry,null,true);
$S.bindHandler=function(_38a,_38b){
var url;
var _38d="_cf_nodebug=true&_cf_nocache=true";
if(window._cf_clientid){
_38d+="&_cf_clientid="+_cf_clientid;
}
var _38e=window[_38b.bindTo];
var _38f=(typeof (_38e)=="undefined");
if(_38b.cfc){
var _390={};
var _391=_38b.bindExpr;
for(var i=0;i<_391.length;i++){
var _393;
if(_391[i].length==2){
_393=_391[i][1];
}else{
_393=$B.getBindElementValue(_391[i][1],_391[i][2],_391[i][3],false,_38f);
}
_390[_391[i][0]]=_393;
}
_390=$X.JSON.encode(_390);
_38d+="&method="+_38b.cfcFunction;
_38d+="&argumentCollection="+encodeURIComponent(_390);
$L.info("spry.bindhandler.loadingcfc","http",[_38b.bindTo,_38b.cfc,_38b.cfcFunction,_390]);
url=_38b.cfc;
}else{
url=$B.evaluateBindTemplate(_38b,false,true,_38f);
$L.info("spry.bindhandler.loadingurl","http",[_38b.bindTo,url]);
}
var _394=_38b.options||{};
if((_38e&&_38e._cf_type=="json")||_38b.dsType=="json"){
_38d+="&returnformat=json";
}
if(_38e){
if(_38e.requestInfo.method=="GET"){
_394.method="GET";
if(url.indexOf("?")==-1){
url+="?"+_38d;
}else{
url+="&"+_38d;
}
}else{
_394.postData=_38d;
_394.method="POST";
_38e.setURL("");
}
_38e.setURL(url,_394);
_38e.loadData();
}else{
if(!_394.method||_394.method=="GET"){
if(url.indexOf("?")==-1){
url+="?"+_38d;
}else{
url+="&"+_38d;
}
}else{
_394.postData=_38d;
_394.useCache=false;
}
var ds;
if(_38b.dsType=="xml"){
ds=new Spry.Data.XMLDataSet(url,_38b.xpath,_394);
}else{
ds=new Spry.Data.JSONDataSet(url,_394);
ds.preparseFunc=$S.preparseData;
}
ds._cf_type=_38b.dsType;
var _396={onLoadError:function(req){
$C.handleError(_38b.errorHandler,"spry.bindhandler.error","http",[_38b.bindTo,req.url,req.requestInfo.postData]);
}};
ds.addObserver(_396);
window[_38b.bindTo]=ds;
}
};
$S.bindHandler._cf_bindhandler=true;
$S.preparseData=function(ds,_399){
var _39a=$U.getFirstNonWhitespaceIndex(_399);
if(_39a>0){
_399=_399.slice(_39a);
}
if(window._cf_jsonprefix&&_399.indexOf(_cf_jsonprefix)==0){
_399=_399.slice(_cf_jsonprefix.length);
}
return _399;
};
$P.init=function(_39b){
$L.info("pod.init.creating","widget",[_39b]);
var _39c={};
_39c._cf_body=_39b+"_body";
$C.objectCache[_39b]=_39c;
};
$B.cfcBindHandler=function(e,_39e){
var _39f=(_39e.httpMethod)?_39e.httpMethod:"GET";
var _3a0={};
var _3a1=_39e.bindExpr;
for(var i=0;i<_3a1.length;i++){
var _3a3;
if(_3a1[i].length==2){
_3a3=_3a1[i][1];
}else{
_3a3=$B.getBindElementValue(_3a1[i][1],_3a1[i][2],_3a1[i][3],false);
}
_3a0[_3a1[i][0]]=_3a3;
}
var _3a4=function(_3a5,_3a6){
$B.assignValue(_3a6.bindTo,_3a6.bindToAttr,_3a5,_3a6.bindToParams);
};
var _3a7={"bindTo":_39e.bindTo,"bindToAttr":_39e.bindToAttr,"bindToParams":_39e.bindToParams};
var _3a8={"async":true,"cfcPath":_39e.cfc,"httpMethod":_39f,"callbackHandler":_3a4,"errorHandler":_39e.errorHandler};
if(_39e.proxyCallHandler){
_3a8.callHandler=_39e.proxyCallHandler;
_3a8.callHandlerParams=_39e;
}
$X.invoke(_3a8,_39e.cfcFunction,_39e._cf_ajaxproxytoken,_3a0,_3a7);
};
$B.cfcBindHandler._cf_bindhandler=true;
$U.extractReturnFormat=function(url){
var _3aa;
var _3ab=url.toUpperCase();
var _3ac=_3ab.indexOf("RETURNFORMAT");
if(_3ac>0){
var _3ad=_3ab.indexOf("&",_3ac+13);
if(_3ad<0){
_3ad=_3ab.length;
}
_3aa=_3ab.substring(_3ac+13,_3ad);
}
return _3aa;
};
$U.replaceAll=function(_3ae,_3af,_3b0){
var _3b1=_3ae.indexOf(_3af);
while(_3b1>-1){
_3ae=_3ae.replace(_3af,_3b0);
_3b1=_3ae.indexOf(_3af);
}
return _3ae;
};
$U.cloneObject=function(obj){
var _3b3={};
for(key in obj){
var _3b4=obj[key];
if(typeof _3b4=="object"){
_3b4=$U.cloneObject(_3b4);
}
_3b3.key=_3b4;
}
return _3b3;
};
$C.clone=function(obj,_3b6){
if(typeof (obj)!="object"){
return obj;
}
if(obj==null){
return obj;
}
var _3b7=new Object();
for(var i in obj){
if(_3b6===true){
_3b7[i]=$C.clone(obj[i]);
}else{
_3b7[i]=obj[i];
}
}
return _3b7;
};
$C.printObject=function(obj){
var str="";
for(key in obj){
str=str+"  "+key+"=";
value=obj[key];
if(typeof (value)=="object"){
value=$C.printObject(value);
}
str+=value;
}
return str;
};
}
}
cfinit();
