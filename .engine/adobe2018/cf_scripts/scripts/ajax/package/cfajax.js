/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!String.prototype.startsWith){
Object.defineProperty(String.prototype,"startsWith",{value:function(_6f6,pos){
pos=!pos||pos<0?0:+pos;
return this.substring(pos,pos+_6f6.length)===_6f6;
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
$C.globalErrorHandler=function(_702,_703){
if($L.isAvailable){
$L.error(_702,_703);
}
if($C.userGlobalErrorHandler){
$C.userGlobalErrorHandler(_702);
}
if(!$L.isAvailable&&!$C.userGlobalErrorHandler){
alert(_702+CFMessage["globalErrorHandler.alert"]);
}
};
$C.handleError=function(_704,_705,_706,_707,_708,_709,_70a,_70b){
var msg=$L.format(_705,_707);
if(_704){
$L.error(msg,"http");
if(!_708){
_708=-1;
}
if(!_709){
_709=msg;
}
_704(_708,_709,_70b);
}else{
if(_70a){
$L.error(msg,"http");
throw msg;
}else{
$C.globalErrorHandler(msg,_706);
}
}
};
$C.setGlobalErrorHandler=function(_70d){
$C.userGlobalErrorHandler=_70d;
};
$A.createXMLHttpRequest=function(){
try{
return new XMLHttpRequest();
}
catch(e){
}
var _70e=["Microsoft.XMLHTTP","MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"];
for(var i=0;i<_70e.length;i++){
try{
return new ActiveXObject(_70e[i]);
}
catch(e){
}
}
return false;
};
$A.isRequestError=function(req){
return ((req.status!=0&&req.status!=200)||req.getResponseHeader("server-error"));
};
$A.sendMessage=function(url,_712,_713,_714,_715,_716,_717){
var req=$A.createXMLHttpRequest();
if(!_712){
_712="GET";
}
if(_714&&_715){
req.onreadystatechange=function(){
$A.callback(req,_715,_716);
};
}
if(_713){
_713+="&_cf_nodebug=true&_cf_nocache=true";
}else{
_713="_cf_nodebug=true&_cf_nocache=true";
}
if(window._cf_clientid){
_713+="&_cf_clientid="+_cf_clientid;
}
if(_712=="GET"){
if(_713){
_713+="&_cf_rc="+($C.requestCounter++);
if(url.indexOf("?")==-1){
url+="?"+_713;
}else{
url+="&"+_713;
}
}
$L.info("ajax.sendmessage.get","http",[url]);
req.open(_712,url,_714);
req.send(null);
}else{
$L.info("ajax.sendmessage.post","http",[url,_713]);
req.open(_712,url,_714);
req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if(_713){
req.send(_713);
}else{
req.send(null);
}
}
if(!_714){
while(req.readyState!=4){
}
if($A.isRequestError(req)){
$C.handleError(null,"ajax.sendmessage.error","http",[req.status,req.statusText],req.status,req.statusText,_717);
}else{
return req;
}
}
};
$A.callback=function(req,_71a,_71b){
if(req.readyState!=4){
return;
}
req.onreadystatechange=new Function;
_71a(req,_71b);
};
$A.submitForm=function(_71c,url,_71e,_71f,_720,_721){
var _722=$C.getFormQueryString(_71c);
if(_722==-1){
$C.handleError(_71f,"ajax.submitform.formnotfound","http",[_71c],-1,null,true);
return;
}
if(!_720){
_720="POST";
}
_721=!(_721===false);
var _723=function(req){
$A.submitForm.callback(req,_71c,_71e,_71f);
};
$L.info("ajax.submitform.submitting","http",[_71c]);
var _725=$A.sendMessage(url,_720,_722,_721,_723);
if(!_721){
$L.info("ajax.submitform.success","http",[_71c]);
return _725.responseText;
}
};
$A.submitForm.callback=function(req,_727,_728,_729){
if($A.isRequestError(req)){
$C.handleError(_729,"ajax.submitform.error","http",[req.status,_727,req.statusText],req.status,req.statusText);
}else{
$L.info("ajax.submitform.success","http",[_727]);
if(_728){
_728(req.responseText);
}
}
};
$C.empty=function(){
};
$C.setSubmitClicked=function(_72a,_72b){
var el=$D.getElement(_72b,_72a);
el.cfinputbutton=true;
$C.setClickedProperty=function(){
el.clicked=true;
};
$E.addListener(el,"click",$C.setClickedProperty);
};
$C.getFormQueryString=function(_72d,_72e){
var _72f;
if(typeof _72d=="string"){
_72f=(document.getElementById(_72d)||document.forms[_72d]);
}else{
if(typeof _72d=="object"){
_72f=_72d;
}
}
if(!_72f||null==_72f.elements){
return -1;
}
var _730,elementName,elementValue,elementDisabled;
var _731=false;
var _732=(_72e)?{}:"";
for(var i=0;i<_72f.elements.length;i++){
_730=_72f.elements[i];
elementDisabled=_730.disabled;
elementName=_730.name;
elementValue=_730.value;
if(_730.id&&_730.id.startsWith("cf_textarea")){
var _734=CKEDITOR.instances;
if(_734){
for(ta in _734){
if(_734[ta].getData){
elementValue=_734[ta].getData();
break;
}
}
}
}
if(!elementDisabled&&elementName){
switch(_730.type){
case "select-one":
case "select-multiple":
for(var j=0;j<_730.options.length;j++){
if(_730.options[j].selected){
if(window.ActiveXObject){
_732=$C.getFormQueryString.processFormData(_732,_72e,elementName,_730.options[j].attributes["value"].specified?_730.options[j].value:_730.options[j].text);
}else{
_732=$C.getFormQueryString.processFormData(_732,_72e,elementName,_730.options[j].hasAttribute("value")?_730.options[j].value:_730.options[j].text);
}
}
}
break;
case "radio":
case "checkbox":
if(_730.checked){
_732=$C.getFormQueryString.processFormData(_732,_72e,elementName,elementValue);
}
break;
case "file":
case undefined:
case "reset":
break;
case "button":
_732=$C.getFormQueryString.processFormData(_732,_72e,elementName,elementValue);
break;
case "submit":
if(_730.cfinputbutton){
if(_731==false&&_730.clicked){
_732=$C.getFormQueryString.processFormData(_732,_72e,elementName,elementValue);
_731=true;
}
}else{
_732=$C.getFormQueryString.processFormData(_732,_72e,elementName,elementValue);
}
break;
case "textarea":
var _736;
if(window.FCKeditorAPI&&(_736=$C.objectCache[elementName])&&_736.richtextid){
var _737=FCKeditorAPI.GetInstance(_736.richtextid);
if(_737){
elementValue=_737.GetXHTML();
}
}
_732=$C.getFormQueryString.processFormData(_732,_72e,elementName,elementValue);
break;
default:
_732=$C.getFormQueryString.processFormData(_732,_72e,elementName,elementValue);
break;
}
}
}
if(!_72e){
_732=_732.substr(0,_732.length-1);
}
return _732;
};
$C.getFormQueryString.processFormData=function(_738,_739,_73a,_73b){
if(_739){
if(_738[_73a]){
_738[_73a]+=","+_73b;
}else{
_738[_73a]=_73b;
}
}else{
_738+=encodeURIComponent(_73a)+"="+encodeURIComponent(_73b)+"&";
}
return _738;
};
$A.importTag=function(_73c){
$C.importedTags.push(_73c);
};
$A.checkImportedTag=function(_73d){
var _73e=false;
for(var i=0;i<$C.importedTags.length;i++){
if($C.importedTags[i]==_73d){
_73e=true;
break;
}
}
if(!_73e){
$C.handleError(null,"ajax.checkimportedtag.error","widget",[_73d]);
}
};
$C.getElementValue=function(_740,_741,_742){
if(!_740){
$C.handleError(null,"getelementvalue.noelementname","bind",null,null,null,true);
return;
}
if(!_742){
_742="value";
}
var _743=$B.getBindElementValue(_740,_741,_742);
if(typeof (_743)=="undefined"){
_743=null;
}
if(_743==null){
$C.handleError(null,"getelementvalue.elnotfound","bind",[_740,_742],null,null,true);
return;
}
return _743;
};
$B.getBindElementValue=function(_744,_745,_746,_747,_748){
var _749="";
if(window[_744]){
var _74a=eval(_744);
if(_74a&&_74a._cf_getAttribute){
_749=_74a._cf_getAttribute(_746);
return _749;
}
}
var _74b=$C.objectCache[_744];
if(_74b&&_74b._cf_getAttribute){
_749=_74b._cf_getAttribute(_746);
return _749;
}
var el=$D.getElement(_744,_745);
var _74d=(el&&((!el.length&&el.length!=0)||(el.length&&el.length>0)||el.tagName=="SELECT"));
if(!_74d&&!_748){
$C.handleError(null,"bind.getbindelementvalue.elnotfound","bind",[_744]);
return null;
}
if(el.tagName!="SELECT"){
if(el.length>1){
var _74e=true;
for(var i=0;i<el.length;i++){
var _750=(el[i].getAttribute("type")=="radio"||el[i].getAttribute("type")=="checkbox");
if(!_750||(_750&&el[i].checked)){
if(!_74e){
_749+=",";
}
_749+=$B.getBindElementValue.extract(el[i],_746);
_74e=false;
}
}
}else{
_749=$B.getBindElementValue.extract(el,_746);
}
}else{
var _74e=true;
for(var i=0;i<el.options.length;i++){
if(el.options[i].selected){
if(!_74e){
_749+=",";
}
_749+=$B.getBindElementValue.extract(el.options[i],_746);
_74e=false;
}
}
}
if(typeof (_749)=="object"){
$C.handleError(null,"bind.getbindelementvalue.simplevalrequired","bind",[_744,_746]);
return null;
}
if(_747&&$C.required[_744]&&_749.length==0){
return null;
}
return _749;
};
$B.getBindElementValue.extract=function(el,_752){
var _753=el[_752];
if((_753==null||typeof (_753)=="undefined")&&el.getAttribute){
_753=el.getAttribute(_752);
}
return _753;
};
$L.init=function(){
if(window.YAHOO&&YAHOO.widget&&YAHOO.widget.Logger){
YAHOO.widget.Logger.categories=[CFMessage["debug"],CFMessage["info"],CFMessage["error"],CFMessage["window"]];
YAHOO.widget.LogReader.prototype.formatMsg=function(_754){
var _755=_754.category;
return "<p>"+"<span class='"+_755+"'>"+_755+"</span>:<i>"+_754.source+"</i>: "+_754.msg+"</p>";
};
var _756=new YAHOO.widget.LogReader(null,{width:"30em",fontSize:"100%"});
_756.setTitle(CFMessage["log.title"]||"ColdFusion AJAX Logger");
_756._btnCollapse.value=CFMessage["log.collapse"]||"Collapse";
_756._btnPause.value=CFMessage["log.pause"]||"Pause";
_756._btnClear.value=CFMessage["log.clear"]||"Clear";
$L.isAvailable=true;
}
};
$L.log=function(_757,_758,_759,_75a){
if(!$L.isAvailable){
return;
}
if(!_759){
_759="global";
}
_759=CFMessage[_759]||_759;
_758=CFMessage[_758]||_758;
_757=$L.format(_757,_75a);
YAHOO.log(_757,_758,_759);
};
$L.format=function(code,_75c){
var msg=CFMessage[code]||code;
if(_75c){
for(i=0;i<_75c.length;i++){
if(!_75c[i].length){
_75c[i]="";
}
var _75e="{"+i+"}";
msg=msg.replace(_75e,_75c[i]);
}
}
return msg;
};
$L.debug=function(_75f,_760,_761){
$L.log(_75f,"debug",_760,_761);
};
$L.info=function(_762,_763,_764){
$L.log(_762,"info",_763,_764);
};
$L.error=function(_765,_766,_767){
$L.log(_765,"error",_766,_767);
};
$L.dump=function(_768,_769){
if($L.isAvailable){
var dump=(/string|number|undefined|boolean/.test(typeof (_768))||_768==null)?_768:recurse(_768,typeof _768,true);
$L.debug(dump,_769);
}
};
$X.invoke=function(_76b,_76c,_76d,_76e,_76f){
return $X.invokeInternal(_76b,_76c,_76d,_76e,_76f,false,null,null);
};
$X.invokeInternal=function(_770,_771,_772,_773,_774,_775,_776,_777){
var _778="method="+_771+"&_cf_ajaxproxytoken="+_772;
if(_775){
_778+="&_cfclient="+"true";
var _779=$X.JSON.encodeInternal(_770._variables,_775);
_778+="&_variables="+encodeURIComponent(_779);
var _77a=$X.JSON.encodeInternal(_770._metadata,_775);
_778+="&_metadata="+encodeURIComponent(_77a);
}
var _77b=_770.returnFormat||"json";
_778+="&returnFormat="+_77b;
if(_770.queryFormat){
_778+="&queryFormat="+_770.queryFormat;
}
if(_770.formId){
var _77c=$C.getFormQueryString(_770.formId,true);
if(_773!=null){
for(prop in _77c){
_773[prop]=_77c[prop];
}
}else{
_773=_77c;
}
_770.formId=null;
}
var _77d="";
if(_773!=null){
_77d=$X.JSON.encodeInternal(_773,_775);
_778+="&argumentCollection="+encodeURIComponent(_77d);
}
$L.info("ajaxproxy.invoke.invoking","http",[_770.cfcPath,_771,_77d]);
if(_770.callHandler){
_770.callHandler.call(null,_770.callHandlerParams,_770.cfcPath,_778);
return;
}
var _77e;
var _77f=_770.async;
if(_776!=null){
_77f=true;
_77e=function(req){
$X.callbackOp(req,_770,_774,_776,_777);
};
}else{
if(_770.async){
_77e=function(req){
$X.callback(req,_770,_774);
};
}
}
var req=$A.sendMessage(_770.cfcPath,_770.httpMethod,_778,_77f,_77e,null,true);
if(!_77f){
return $X.processResponse(req,_770);
}
};
$X.callback=function(req,_784,_785){
if($A.isRequestError(req)){
$C.handleError(_784.errorHandler,"ajaxproxy.invoke.error","http",[req.status,_784.cfcPath,req.statusText],req.status,req.statusText,false,_785);
}else{
if(_784.callbackHandler){
var _786=$X.processResponse(req,_784);
_784.callbackHandler(_786,_785);
}
}
};
$X.callbackOp=function(req,_788,_789,_78a,_78b){
if($A.isRequestError(req)){
var _78c=_788.errorHandler;
if(_78b!=null){
_78c=_78b;
}
$C.handleError(_78c,"ajaxproxy.invoke.error","http",[req.status,_788.cfcPath,req.statusText],req.status,req.statusText,false,_789);
}else{
if(_78a){
var _78d=$X.processResponse(req,_788);
_78a(_78d,_789);
}
}
};
$X.processResponse=function(req,_78f){
var _790=true;
for(var i=0;i<req.responseText.length;i++){
var c=req.responseText.charAt(i);
_790=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_790){
break;
}
}
var _793=(req.responseXML&&req.responseXML.childNodes.length>0);
var _794=_793?"[XML Document]":req.responseText;
$L.info("ajaxproxy.invoke.response","http",[_794]);
var _795;
var _796=_78f.returnFormat||"json";
if(_796=="json"){
try{
_795=_790?null:$X.JSON.decode(req.responseText);
}
catch(e){
if(typeof _78f._metadata!=="undefined"&&_78f._metadata.servercfc&&typeof req.responseText==="string"){
_795=req.responseText;
}else{
throw e;
}
}
}else{
_795=_793?req.responseXML:(_790?null:req.responseText);
}
return _795;
};
$X.init=function(_797,_798,_799){
if(typeof _799==="undefined"){
_799=false;
}
var _79a=_798;
if(!_799){
var _79b=_798.split(".");
var ns=self;
for(i=0;i<_79b.length-1;i++){
if(_79b[i].length){
ns[_79b[i]]=ns[_79b[i]]||{};
ns=ns[_79b[i]];
}
}
var _79d=_79b[_79b.length-1];
if(ns[_79d]){
return ns[_79d];
}
ns[_79d]=function(){
this.httpMethod="GET";
this.async=false;
this.callbackHandler=null;
this.errorHandler=null;
this.formId=null;
};
_79a=ns[_79d].prototype;
}else{
_79a.httpMethod="GET";
_79a.async=false;
_79a.callbackHandler=null;
_79a.errorHandler=null;
_79a.formId=null;
}
_79a.cfcPath=_797;
_79a.setHTTPMethod=function(_79e){
if(_79e){
_79e=_79e.toUpperCase();
}
if(_79e!="GET"&&_79e!="POST"){
$C.handleError(null,"ajaxproxy.sethttpmethod.invalidmethod","http",[_79e],null,null,true);
}
this.httpMethod=_79e;
};
_79a.setSyncMode=function(){
this.async=false;
};
_79a.setAsyncMode=function(){
this.async=true;
};
_79a.setCallbackHandler=function(fn){
this.callbackHandler=fn;
this.setAsyncMode();
};
_79a.setErrorHandler=function(fn){
this.errorHandler=fn;
this.setAsyncMode();
};
_79a.setForm=function(fn){
this.formId=fn;
};
_79a.setQueryFormat=function(_7a2){
if(_7a2){
_7a2=_7a2.toLowerCase();
}
if(!_7a2||(_7a2!="column"&&_7a2!="row"&&_7a2!="struct")){
$C.handleError(null,"ajaxproxy.setqueryformat.invalidformat","http",[_7a2],null,null,true);
}
this.queryFormat=_7a2;
};
_79a.setReturnFormat=function(_7a3){
if(_7a3){
_7a3=_7a3.toLowerCase();
}
if(!_7a3||(_7a3!="plain"&&_7a3!="json"&&_7a3!="wddx")){
$C.handleError(null,"ajaxproxy.setreturnformat.invalidformat","http",[_7a3],null,null,true);
}
this.returnFormat=_7a3;
};
$L.info("ajaxproxy.init.created","http",[_797]);
if(_799){
return _79a;
}else{
return ns[_79d];
}
};
$U.isWhitespace=function(s){
var _7a5=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_7a5=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_7a5){
break;
}
}
return _7a5;
};
$U.getFirstNonWhitespaceIndex=function(s){
var _7a9=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_7a9=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_7a9){
break;
}
}
return i;
};
$C.trim=function(_7ac){
return _7ac.replace(/^\s+|\s+$/g,"");
};
$U.isInteger=function(n){
var _7ae=true;
if(typeof (n)=="number"){
_7ae=(n>=0);
}else{
for(i=0;i<n.length;i++){
if($U.isInteger.numberChars.indexOf(n.charAt(i))==-1){
_7ae=false;
break;
}
}
}
return _7ae;
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
var _7b3=null;
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.DATA&&$U.isArray(o.DATA)&&(o.DATA.length==0||(o.DATA.length>0&&$U.isArray(o.DATA[0])))){
_7b3="row";
}else{
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.ROWCOUNT&&$U.isInteger(o.ROWCOUNT)&&o.DATA){
_7b3="col";
for(var i=0;i<o.COLUMNS.length;i++){
var _7b5=o.DATA[o.COLUMNS[i]];
if(!_7b5||!$U.isArray(_7b5)){
_7b3=null;
break;
}
}
}
}
return _7b3;
};
$X.JSON=new function(){
var _7b6={}.hasOwnProperty?true:false;
var _7b7=/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/;
var pad=function(n){
return n<10?"0"+n:n;
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};
var _7bb=function(s){
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
var _7c0=function(o){
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
var _7c3=function(o){
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
return _7c0(o);
}else{
if(o instanceof Date){
if(cfc){
return this.encodeInternal({_date_:o.getTime()},cfc);
}
return _7c3(o);
}else{
if(typeof o=="string"){
return _7bb(o);
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
if(!_7b6||o.hasOwnProperty(i)){
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
var _7cb=$U.getFirstNonWhitespaceIndex(json);
if(_7cb>0){
json=json.slice(_7cb);
}
if(window._cf_jsonprefix&&json.indexOf(_cf_jsonprefix)==0){
json=json.slice(_cf_jsonprefix.length);
}
try{
if(_7b7.test(json)){
return eval("("+json+")");
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
$C.navigate=function(url,_7cd,_7ce,_7cf,_7d0,_7d1){
if(url==null){
$C.handleError(_7cf,"navigate.urlrequired","widget");
return;
}
if(_7d0){
_7d0=_7d0.toUpperCase();
if(_7d0!="GET"&&_7d0!="POST"){
$C.handleError(null,"navigate.invalidhttpmethod","http",[_7d0],null,null,true);
}
}else{
_7d0="GET";
}
var _7d2;
if(_7d1){
_7d2=$C.getFormQueryString(_7d1);
if(_7d2==-1){
$C.handleError(null,"navigate.formnotfound","http",[_7d1],null,null,true);
}
}
if(_7cd==null){
if(_7d2){
if(url.indexOf("?")==-1){
url+="?"+_7d2;
}else{
url+="&"+_7d2;
}
}
$L.info("navigate.towindow","widget",[url]);
window.location.replace(url);
return;
}
$L.info("navigate.tocontainer","widget",[url,_7cd]);
var obj=$C.objectCache[_7cd];
if(obj!=null){
if(typeof (obj._cf_body)!="undefined"&&obj._cf_body!=null){
_7cd=obj._cf_body;
}
}
$A.replaceHTML(_7cd,url,_7d0,_7d2,_7ce,_7cf);
};
$A.checkForm=function(_7d4,_7d5,_7d6,_7d7,_7d8){
var _7d9=_7d5.call(null,_7d4);
if(_7d9==false){
return false;
}
var _7da=$C.getFormQueryString(_7d4);
$L.info("ajax.submitform.submitting","http",[_7d4.name]);
$A.replaceHTML(_7d6,_7d4.action,_7d4.method,_7da,_7d7,_7d8);
return false;
};
$A.replaceHTML=function(_7db,url,_7dd,_7de,_7df,_7e0){
var _7e1=document.getElementById(_7db);
if(!_7e1){
$C.handleError(_7e0,"ajax.replacehtml.elnotfound","http",[_7db]);
return;
}
var _7e2="_cf_containerId="+encodeURIComponent(_7db);
_7de=(_7de)?_7de+"&"+_7e2:_7e2;
$L.info("ajax.replacehtml.replacing","http",[_7db,url,_7de]);
if(_cf_loadingtexthtml){
try{
_7e1.innerHTML=_cf_loadingtexthtml;
}
catch(e){
}
}
var _7e3=function(req,_7e5){
var _7e6=false;
if($A.isRequestError(req)){
$C.handleError(_7e0,"ajax.replacehtml.error","http",[req.status,_7e5.id,req.statusText],req.status,req.statusText);
_7e6=true;
}
var _7e7=new $E.CustomEvent("onReplaceHTML",_7e5);
var _7e8=new $E.CustomEvent("onReplaceHTMLUser",_7e5);
$E.loadEvents[_7e5.id]={system:_7e7,user:_7e8};
if(req.responseText.search(/<script/i)!=-1){
try{
_7e5.innerHTML="";
}
catch(e){
}
$A.replaceHTML.processResponseText(req.responseText,_7e5,_7e0);
}else{
try{
_7e5.innerHTML=req.responseText;
$A.updateLayouttab(_7e5);
if(_7de.indexOf("window-id")>-1){
var q=_7de.substring(_7de.indexOf("window-id")+10,_7de.indexOf("&"));
var cmp=Ext.getCmp(q);
if(cmp){
cmp.update(_7e5.innerHTML);
}
}
}
catch(e){
}
}
$E.loadEvents[_7e5.id]=null;
_7e7.fire();
_7e7.unsubscribe();
_7e8.fire();
_7e8.unsubscribe();
$L.info("ajax.replacehtml.success","http",[_7e5.id]);
if(_7df&&!_7e6){
_7df();
}
};
try{
$A.sendMessage(url,_7dd,_7de,true,_7e3,_7e1);
}
catch(e){
try{
_7e1.innerHTML=$L.format(CFMessage["ajax.replacehtml.connectionerrordisplay"],[url,e]);
}
catch(e){
}
$C.handleError(_7e0,"ajax.replacehtml.connectionerror","http",[_7db,url,e]);
}
};
$A.replaceHTML.processResponseText=function(text,_7ec,_7ed){
var pos=0;
var _7ef=0;
var _7f0=0;
_7ec._cf_innerHTML="";
while(pos<text.length){
var _7f1=text.indexOf("<s",pos);
if(_7f1==-1){
_7f1=text.indexOf("<S",pos);
}
if(_7f1==-1){
break;
}
pos=_7f1;
var _7f2=true;
var _7f3=$A.replaceHTML.processResponseText.scriptTagChars;
for(var i=1;i<_7f3.length;i++){
var _7f5=pos+i+1;
if(_7f5>text.length){
break;
}
var _7f6=text.charAt(_7f5);
if(_7f3[i][0]!=_7f6&&_7f3[i][1]!=_7f6){
pos+=i+1;
_7f2=false;
break;
}
}
if(!_7f2){
continue;
}
var _7f7=text.substring(_7ef,pos);
if(_7f7){
_7ec._cf_innerHTML+=_7f7;
}
var _7f8=text.indexOf(">",pos)+1;
if(_7f8==0){
pos++;
continue;
}else{
pos+=7;
}
var _7f9=_7f8;
while(_7f9<text.length&&_7f9!=-1){
_7f9=text.indexOf("</s",_7f9);
if(_7f9==-1){
_7f9=text.indexOf("</S",_7f9);
}
if(_7f9!=-1){
_7f2=true;
for(var i=1;i<_7f3.length;i++){
var _7f5=_7f9+2+i;
if(_7f5>text.length){
break;
}
var _7f6=text.charAt(_7f5);
if(_7f3[i][0]!=_7f6&&_7f3[i][1]!=_7f6){
_7f9=_7f5;
_7f2=false;
break;
}
}
if(_7f2){
break;
}
}
}
if(_7f9!=-1){
var _7fa=text.substring(_7f8,_7f9);
var _7fb=_7fa.indexOf("<!--");
if(_7fb!=-1){
_7fa=_7fa.substring(_7fb+4);
}
var _7fc=_7fa.lastIndexOf("//-->");
if(_7fc!=-1){
_7fa=_7fa.substring(0,_7fc-1);
}
if(_7fa.indexOf("document.write")!=-1||_7fa.indexOf("CF_RunContent")!=-1){
if(_7fa.indexOf("CF_RunContent")!=-1){
_7fa=_7fa.replace("CF_RunContent","document.write");
}
_7fa="var _cfDomNode = document.getElementById('"+_7ec.id+"'); var _cfBuffer='';"+"if (!document._cf_write)"+"{document._cf_write = document.write;"+"document.write = function(str){if (_cfBuffer!=null){_cfBuffer+=str;}else{document._cf_write(str);}};};"+_7fa+";_cfDomNode._cf_innerHTML += _cfBuffer; _cfBuffer=null;";
}
try{
eval(_7fa);
}
catch(ex){
$C.handleError(_7ed,"ajax.replacehtml.jserror","http",[_7ec.id,ex]);
}
}
_7f1=text.indexOf(">",_7f9)+1;
if(_7f1==0){
_7f0=_7f9+1;
break;
}
_7f0=_7f1;
pos=_7f1;
_7ef=_7f1;
}
if(_7f0<text.length-1){
var _7f7=text.substring(_7f0,text.length);
if(_7f7){
_7ec._cf_innerHTML+=_7f7;
}
}
try{
_7ec.innerHTML=_7ec._cf_innerHTML;
$A.updateLayouttab(_7ec);
}
catch(e){
}
_7ec._cf_innerHTML="";
};
$A.updateLayouttab=function(_7fd){
var _7fe=_7fd.id;
var s=_7fe.substr(13,_7fe.length);
var cmp=Ext.getCmp(s);
var _801=_7fd.innerHTML;
var _802=document.getElementById(_7fe);
var html=_802.innerHTML;
if(cmp){
cmp.update("<div id="+_7fd.id+">"+html+"</div>");
}
var _802=document.getElementById(_7fe);
if(_802){
}
};
$A.replaceHTML.processResponseText.scriptTagChars=[["s","S"],["c","C"],["r","R"],["i","I"],["p","P"],["t","T"]];
$D.getElement=function(_804,_805){
var _806=function(_807){
return (_807.name==_804||_807.id==_804);
};
var _808=$D.getElementsBy(_806,null,_805);
if(_808.length==1){
return _808[0];
}else{
return _808;
}
};
$D.getElementsBy=function(_809,tag,root){
tag=tag||"*";
var _80c=[];
if(root){
root=$D.get(root);
if(!root){
return _80c;
}
}else{
root=document;
}
var _80d=root.getElementsByTagName(tag);
if(!_80d.length&&(tag=="*"&&root.all)){
_80d=root.all;
}
for(var i=0,len=_80d.length;i<len;++i){
if(_809(_80d[i])){
_80c[_80c.length]=_80d[i];
}
}
return _80c;
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
var _810=[];
for(var i=0,len=el.length;i<len;++i){
_810[_810.length]=$D.get(el[i]);
}
return _810;
}
return null;
};
$E.loadEvents={};
$E.CustomEvent=function(_812,_813){
return {name:_812,domNode:_813,subs:[],subscribe:function(func,_815){
var dup=false;
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
if(sub.f==func&&sub.p==_815){
dup=true;
break;
}
}
if(!dup){
this.subs.push({f:func,p:_815});
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
$E.addListener=function(el,ev,fn,_81e){
var l={el:el,ev:ev,fn:fn,params:_81e};
$E.listeners.push(l);
var _820=function(e){
if(!e){
var e=window.event;
}
fn.call(null,e,_81e);
};
if(el.addEventListener){
window.addEventListener("load",function(){
el.addEventListener(ev,_820,false);
});
el.addEventListener(ev,_820,false);
return true;
}else{
if(el.attachEvent){
el.attachEvent("on"+ev,_820);
return true;
}else{
return false;
}
}
};
$E.isListener=function(el,ev,fn,_825){
var _826=false;
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn==fn&&ls[i].params==_825){
_826=true;
break;
}
}
return _826;
};
$E.callBindHandlers=function(id,_82a,ev){
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
$E.registerOnLoad=function(func,_830,_831,user){
if($E.registerOnLoad.windowLoaded){
if(_830&&_830._cf_containerId&&$E.loadEvents[_830._cf_containerId]){
if(user){
$E.loadEvents[_830._cf_containerId].user.subscribe(func,_830);
}else{
$E.loadEvents[_830._cf_containerId].system.subscribe(func,_830);
}
}else{
func.call(null,null,_830);
}
}else{
if(user){
$E.windowLoadUserEvent.subscribe(func,_830);
}else{
if(_831){
$E.windowLoadImpEvent.subscribe(func,_830);
}else{
$E.windowLoadEvent.subscribe(func,_830);
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
var _834=document.createElement("span");
document.body.insertBefore(_834,document.body.firstChild);
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
$B.register=function(_836,_837,_838,_839){
for(var i=0;i<_836.length;i++){
var _83b=_836[i][0];
var _83c=_836[i][1];
var _83d=_836[i][2];
if(window[_83b]){
var _83e=eval(_83b);
if(_83e&&_83e._cf_register){
_83e._cf_register(_83d,_838,_837);
continue;
}
}
var _83f=$C.objectCache[_83b];
if(_83f&&_83f._cf_register){
_83f._cf_register(_83d,_838,_837);
continue;
}
var _840=$D.getElement(_83b,_83c);
var _841=(_840&&((!_840.length&&_840.length!=0)||(_840.length&&_840.length>0)||_840.tagName=="SELECT"));
if(!_841){
$C.handleError(null,"bind.register.elnotfound","bind",[_83b]);
}
if(_840.length>1&&!_840.options){
for(var j=0;j<_840.length;j++){
$B.register.addListener(_840[j],_83d,_838,_837);
}
}else{
$B.register.addListener(_840,_83d,_838,_837);
}
}
if(!$C.bindHandlerCache[_837.bindTo]&&typeof (_837.bindTo)=="string"){
$C.bindHandlerCache[_837.bindTo]=function(){
_838.call(null,null,_837);
};
}
if(_839){
_838.call(null,null,_837);
}
};
$B.register.addListener=function(_843,_844,_845,_846){
if(!$E.isListener(_843,_844,_845,_846)){
$E.addListener(_843,_844,_845,_846);
}
};
$B.assignValue=function(_847,_848,_849,_84a){
if(!_847){
return;
}
if(_847.call){
_847.call(null,_849,_84a);
return;
}
var _84b=$C.objectCache[_847];
if(_84b&&_84b._cf_setValue){
_84b._cf_setValue(_849);
return;
}
var _84c=document.getElementById(_847);
if(!_84c){
$C.handleError(null,"bind.assignvalue.elnotfound","bind",[_847]);
}
if(_84c.tagName=="SELECT"){
var _84d=$U.checkQuery(_849);
var _84e=$C.objectCache[_847];
if(_84d){
if(!_84e||(_84e&&(!_84e.valueCol||!_84e.displayCol))){
$C.handleError(null,"bind.assignvalue.selboxmissingvaldisplay","bind",[_847]);
return;
}
}else{
if(typeof (_849.length)=="number"&&!_849.toUpperCase){
if(_849.length>0&&(typeof (_849[0].length)!="number"||_849[0].toUpperCase)){
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_847]);
return;
}
}else{
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_847]);
return;
}
}
_84c.options.length=0;
var _84f;
var _850=false;
if(_84e){
_84f=_84e.selected;
if(_84f&&_84f.length>0){
_850=true;
}
}
if(!_84d){
for(var i=0;i<_849.length;i++){
var opt=new Option(_849[i][1],_849[i][0]);
_84c.options[i]=opt;
if(_850){
for(var j=0;j<_84f.length;j++){
if(_84f[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_84d=="col"){
var _854=_849.DATA[_84e.valueCol];
var _855=_849.DATA[_84e.displayCol];
if(!_854||!_855){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_847]);
return;
}
for(var i=0;i<_854.length;i++){
var opt=new Option(_855[i],_854[i]);
_84c.options[i]=opt;
if(_850){
for(var j=0;j<_84f.length;j++){
if(_84f[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_84d=="row"){
var _856=-1;
var _857=-1;
for(var i=0;i<_849.COLUMNS.length;i++){
var col=_849.COLUMNS[i];
if(col==_84e.valueCol){
_856=i;
}
if(col==_84e.displayCol){
_857=i;
}
if(_856!=-1&&_857!=-1){
break;
}
}
if(_856==-1||_857==-1){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_847]);
return;
}
for(var i=0;i<_849.DATA.length;i++){
var opt=new Option(_849.DATA[i][_857],_849.DATA[i][_856]);
_84c.options[i]=opt;
if(_850){
for(var j=0;j<_84f.length;j++){
if(_84f[j]==opt.value){
opt.selected=true;
}
}
}
}
}
}
}
}else{
_84c[_848]=_849;
}
$E.callBindHandlers(_847,null,"change");
$L.info("bind.assignvalue.success","bind",[_849,_847,_848]);
};
$B.localBindHandler=function(e,_85a){
var _85b=document.getElementById(_85a.bindTo);
var _85c=$B.evaluateBindTemplate(_85a,true);
$B.assignValue(_85a.bindTo,_85a.bindToAttr,_85c);
};
$B.localBindHandler._cf_bindhandler=true;
$B.evaluateBindTemplate=function(_85d,_85e,_85f,_860,_861){
var _862=_85d.bindExpr;
var _863="";
if(typeof _861=="undefined"){
_861=false;
}
for(var i=0;i<_862.length;i++){
if(typeof (_862[i])=="object"){
var _865=null;
if(!_862[i].length||typeof _862[i][0]=="object"){
_865=$X.JSON.encode(_862[i]);
}else{
var _865=$B.getBindElementValue(_862[i][0],_862[i][1],_862[i][2],_85e,_860);
if(_865==null){
if(_85e){
_863="";
break;
}else{
_865="";
}
}
}
if(_85f){
_865=encodeURIComponent(_865);
}
_863+=_865;
}else{
var _866=_862[i];
if(_861==true&&i>0){
if(typeof (_866)=="string"&&_866.indexOf("&")!=0){
_866=encodeURIComponent(_866);
}
}
_863+=_866;
}
}
return _863;
};
$B.jsBindHandler=function(e,_868){
var _869=_868.bindExpr;
var _86a=new Array();
var _86b=_868.callFunction+"(";
for(var i=0;i<_869.length;i++){
var _86d;
if(typeof (_869[i])=="object"){
if(_869[i].length){
if(typeof _869[i][0]=="object"){
_86d=_869[i];
}else{
_86d=$B.getBindElementValue(_869[i][0],_869[i][1],_869[i][2],false);
}
}else{
_86d=_869[i];
}
}else{
_86d=_869[i];
}
if(i!=0){
_86b+=",";
}
_86a[i]=_86d;
_86b+="'"+_86d+"'";
}
_86b+=")";
var _86e=_868.callFunction.apply(null,_86a);
$B.assignValue(_868.bindTo,_868.bindToAttr,_86e,_868.bindToParams);
};
$B.jsBindHandler._cf_bindhandler=true;
$B.urlBindHandler=function(e,_870){
var _871=_870.bindTo;
if($C.objectCache[_871]&&$C.objectCache[_871]._cf_visible===false){
$C.objectCache[_871]._cf_dirtyview=true;
return;
}
var url=$B.evaluateBindTemplate(_870,false,true,false,true);
var _873=$U.extractReturnFormat(url);
if(_873==null||typeof _873=="undefined"){
_873="JSON";
}
if(_870.bindToAttr||typeof _870.bindTo=="undefined"||typeof _870.bindTo=="function"){
var _870={"bindTo":_870.bindTo,"bindToAttr":_870.bindToAttr,"bindToParams":_870.bindToParams,"errorHandler":_870.errorHandler,"url":url,returnFormat:_873};
try{
$A.sendMessage(url,"GET",null,true,$B.urlBindHandler.callback,_870);
}
catch(e){
$C.handleError(_870.errorHandler,"ajax.urlbindhandler.connectionerror","http",[url,e]);
}
}else{
$A.replaceHTML(_871,url,null,null,_870.callback,_870.errorHandler);
}
};
$B.urlBindHandler._cf_bindhandler=true;
$B.urlBindHandler.callback=function(req,_875){
if($A.isRequestError(req)){
$C.handleError(_875.errorHandler,"bind.urlbindhandler.httperror","http",[req.status,_875.url,req.statusText],req.status,req.statusText);
}else{
$L.info("bind.urlbindhandler.response","http",[req.responseText]);
var _876;
try{
if(_875.returnFormat==null||_875.returnFormat==="JSON"){
_876=$X.JSON.decode(req.responseText);
}else{
_876=req.responseText;
}
}
catch(e){
if(req.responseText!=null&&typeof req.responseText=="string"){
_876=req.responseText;
}else{
$C.handleError(_875.errorHandler,"bind.urlbindhandler.jsonerror","http",[req.responseText]);
}
}
$B.assignValue(_875.bindTo,_875.bindToAttr,_876,_875.bindToParams);
}
};
$A.initSelect=function(_877,_878,_879,_87a){
$C.objectCache[_877]={"valueCol":_878,"displayCol":_879,selected:_87a};
};
$S.setupSpry=function(){
if(typeof (Spry)!="undefined"&&Spry.Data){
Spry.Data.DataSet.prototype._cf_getAttribute=function(_87b){
var val;
var row=this.getCurrentRow();
if(row){
val=row[_87b];
}
return val;
};
Spry.Data.DataSet.prototype._cf_register=function(_87e,_87f,_880){
var obs={bindParams:_880};
obs.onCurrentRowChanged=function(){
_87f.call(null,null,this.bindParams);
};
obs.onDataChanged=function(){
_87f.call(null,null,this.bindParams);
};
this.addObserver(obs);
};
if(Spry.Debug.trace){
var _882=Spry.Debug.trace;
Spry.Debug.trace=function(str){
$L.info(str,"spry");
_882(str);
};
}
if(Spry.Debug.reportError){
var _884=Spry.Debug.reportError;
Spry.Debug.reportError=function(str){
$L.error(str,"spry");
_884(str);
};
}
$L.info("spry.setupcomplete","bind");
}
};
$E.registerOnLoad($S.setupSpry,null,true);
$S.bindHandler=function(_886,_887){
var url;
var _889="_cf_nodebug=true&_cf_nocache=true";
if(window._cf_clientid){
_889+="&_cf_clientid="+_cf_clientid;
}
var _88a=window[_887.bindTo];
var _88b=(typeof (_88a)=="undefined");
if(_887.cfc){
var _88c={};
var _88d=_887.bindExpr;
for(var i=0;i<_88d.length;i++){
var _88f;
if(_88d[i].length==2){
_88f=_88d[i][1];
}else{
_88f=$B.getBindElementValue(_88d[i][1],_88d[i][2],_88d[i][3],false,_88b);
}
_88c[_88d[i][0]]=_88f;
}
_88c=$X.JSON.encode(_88c);
_889+="&method="+_887.cfcFunction;
_889+="&argumentCollection="+encodeURIComponent(_88c);
$L.info("spry.bindhandler.loadingcfc","http",[_887.bindTo,_887.cfc,_887.cfcFunction,_88c]);
url=_887.cfc;
}else{
url=$B.evaluateBindTemplate(_887,false,true,_88b);
$L.info("spry.bindhandler.loadingurl","http",[_887.bindTo,url]);
}
var _890=_887.options||{};
if((_88a&&_88a._cf_type=="json")||_887.dsType=="json"){
_889+="&returnformat=json";
}
if(_88a){
if(_88a.requestInfo.method=="GET"){
_890.method="GET";
if(url.indexOf("?")==-1){
url+="?"+_889;
}else{
url+="&"+_889;
}
}else{
_890.postData=_889;
_890.method="POST";
_88a.setURL("");
}
_88a.setURL(url,_890);
_88a.loadData();
}else{
if(!_890.method||_890.method=="GET"){
if(url.indexOf("?")==-1){
url+="?"+_889;
}else{
url+="&"+_889;
}
}else{
_890.postData=_889;
_890.useCache=false;
}
var ds;
if(_887.dsType=="xml"){
ds=new Spry.Data.XMLDataSet(url,_887.xpath,_890);
}else{
ds=new Spry.Data.JSONDataSet(url,_890);
ds.preparseFunc=$S.preparseData;
}
ds._cf_type=_887.dsType;
var _892={onLoadError:function(req){
$C.handleError(_887.errorHandler,"spry.bindhandler.error","http",[_887.bindTo,req.url,req.requestInfo.postData]);
}};
ds.addObserver(_892);
window[_887.bindTo]=ds;
}
};
$S.bindHandler._cf_bindhandler=true;
$S.preparseData=function(ds,_895){
var _896=$U.getFirstNonWhitespaceIndex(_895);
if(_896>0){
_895=_895.slice(_896);
}
if(window._cf_jsonprefix&&_895.indexOf(_cf_jsonprefix)==0){
_895=_895.slice(_cf_jsonprefix.length);
}
return _895;
};
$P.init=function(_897){
$L.info("pod.init.creating","widget",[_897]);
var _898={};
_898._cf_body=_897+"_body";
$C.objectCache[_897]=_898;
};
$B.cfcBindHandler=function(e,_89a){
var _89b=(_89a.httpMethod)?_89a.httpMethod:"GET";
var _89c={};
var _89d=_89a.bindExpr;
for(var i=0;i<_89d.length;i++){
var _89f;
if(_89d[i].length==2){
_89f=_89d[i][1];
}else{
_89f=$B.getBindElementValue(_89d[i][1],_89d[i][2],_89d[i][3],false);
}
_89c[_89d[i][0]]=_89f;
}
var _8a0=function(_8a1,_8a2){
$B.assignValue(_8a2.bindTo,_8a2.bindToAttr,_8a1,_8a2.bindToParams);
};
var _8a3={"bindTo":_89a.bindTo,"bindToAttr":_89a.bindToAttr,"bindToParams":_89a.bindToParams};
var _8a4={"async":true,"cfcPath":_89a.cfc,"httpMethod":_89b,"callbackHandler":_8a0,"errorHandler":_89a.errorHandler};
if(_89a.proxyCallHandler){
_8a4.callHandler=_89a.proxyCallHandler;
_8a4.callHandlerParams=_89a;
}
$X.invoke(_8a4,_89a.cfcFunction,_89a._cf_ajaxproxytoken,_89c,_8a3);
};
$B.cfcBindHandler._cf_bindhandler=true;
$U.extractReturnFormat=function(url){
var _8a6;
var _8a7=url.toUpperCase();
var _8a8=_8a7.indexOf("RETURNFORMAT");
if(_8a8>0){
var _8a9=_8a7.indexOf("&",_8a8+13);
if(_8a9<0){
_8a9=_8a7.length;
}
_8a6=_8a7.substring(_8a8+13,_8a9);
}
return _8a6;
};
$U.replaceAll=function(_8aa,_8ab,_8ac){
var _8ad=_8aa.indexOf(_8ab);
while(_8ad>-1){
_8aa=_8aa.replace(_8ab,_8ac);
_8ad=_8aa.indexOf(_8ab);
}
return _8aa;
};
$U.cloneObject=function(obj){
var _8af={};
for(key in obj){
var _8b0=obj[key];
if(typeof _8b0=="object"){
_8b0=$U.cloneObject(_8b0);
}
_8af.key=_8b0;
}
return _8af;
};
$C.clone=function(obj,_8b2){
if(typeof (obj)!="object"){
return obj;
}
if(obj==null){
return obj;
}
var _8b3=new Object();
for(var i in obj){
if(_8b2===true){
_8b3[i]=$C.clone(obj[i]);
}else{
_8b3[i]=obj[i];
}
}
return _8b3;
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
