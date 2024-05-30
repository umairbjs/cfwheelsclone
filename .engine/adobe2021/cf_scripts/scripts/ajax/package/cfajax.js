/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!String.prototype.startsWith){
Object.defineProperty(String.prototype,"startsWith",{value:function(_1,_2){
_2=!_2||_2<0?0:+_2;
return this.substring(_2,_2+_1.length)===_1;
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
$C.globalErrorHandler=function(_d,_e){
if($L.isAvailable){
$L.error(_d,_e);
}
if($C.userGlobalErrorHandler){
$C.userGlobalErrorHandler(_d);
}
if(!$L.isAvailable&&!$C.userGlobalErrorHandler){
alert(_d+CFMessage["globalErrorHandler.alert"]);
}
};
$C.handleError=function(_f,_10,_11,_12,_13,_14,_15,_16){
var msg=$L.format(_10,_12);
if(_f){
$L.error(msg,"http");
if(!_13){
_13=-1;
}
if(!_14){
_14=msg;
}
_f(_13,_14,_16);
}else{
if(_15){
$L.error(msg,"http");
throw msg;
}else{
$C.globalErrorHandler(msg,_11);
}
}
};
$C.setGlobalErrorHandler=function(_18){
$C.userGlobalErrorHandler=_18;
};
$A.createXMLHttpRequest=function(){
try{
return new XMLHttpRequest();
}
catch(e){
}
var _19=["Microsoft.XMLHTTP","MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"];
for(var i=0;i<_19.length;i++){
try{
return new ActiveXObject(_19[i]);
}
catch(e){
}
}
return false;
};
$A.isRequestError=function(req){
return ((req.status!=0&&req.status!=200)||req.getResponseHeader("server-error"));
};
$A.sendMessage=function(url,_1d,_1e,_1f,_20,_21,_22){
var req=$A.createXMLHttpRequest();
if(!_1d){
_1d="GET";
}
if(_1f&&_20){
req.onreadystatechange=function(){
$A.callback(req,_20,_21);
};
}
if(_1e){
_1e+="&_cf_nodebug=true&_cf_nocache=true";
}else{
_1e="_cf_nodebug=true&_cf_nocache=true";
}
if(window._cf_clientid){
_1e+="&_cf_clientid="+_cf_clientid;
}
if(_1d=="GET"){
if(_1e){
_1e+="&_cf_rc="+($C.requestCounter++);
if(url.indexOf("?")==-1){
url+="?"+_1e;
}else{
url+="&"+_1e;
}
}
$L.info("ajax.sendmessage.get","http",[url]);
req.open(_1d,url,_1f);
req.send(null);
}else{
$L.info("ajax.sendmessage.post","http",[url,_1e]);
req.open(_1d,url,_1f);
req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if(_1e){
req.send(_1e);
}else{
req.send(null);
}
}
if(!_1f){
while(req.readyState!=4){
}
if($A.isRequestError(req)){
$C.handleError(null,"ajax.sendmessage.error","http",[req.status,req.statusText],req.status,req.statusText,_22);
}else{
return req;
}
}
};
$A.callback=function(req,_25,_26){
if(req.readyState!=4){
return;
}
req.onreadystatechange=new Function;
_25(req,_26);
};
$A.submitForm=function(_27,url,_29,_2a,_2b,_2c){
var _2d=$C.getFormQueryString(_27);
if(_2d==-1){
$C.handleError(_2a,"ajax.submitform.formnotfound","http",[_27],-1,null,true);
return;
}
if(!_2b){
_2b="POST";
}
_2c=!(_2c===false);
var _2e=function(req){
$A.submitForm.callback(req,_27,_29,_2a);
};
$L.info("ajax.submitform.submitting","http",[_27]);
var _30=$A.sendMessage(url,_2b,_2d,_2c,_2e);
if(!_2c){
$L.info("ajax.submitform.success","http",[_27]);
return _30.responseText;
}
};
$A.submitForm.callback=function(req,_32,_33,_34){
if($A.isRequestError(req)){
$C.handleError(_34,"ajax.submitform.error","http",[req.status,_32,req.statusText],req.status,req.statusText);
}else{
$L.info("ajax.submitform.success","http",[_32]);
if(_33){
_33(req.responseText);
}
}
};
$C.empty=function(){
};
$C.setSubmitClicked=function(_35,_36){
var el=$D.getElement(_36,_35);
el.cfinputbutton=true;
$C.setClickedProperty=function(){
el.clicked=true;
};
$E.addListener(el,"click",$C.setClickedProperty);
};
$C.getFormQueryString=function(_38,_39){
var _3a;
if(typeof _38=="string"){
_3a=(document.getElementById(_38)||document.forms[_38]);
}else{
if(typeof _38=="object"){
_3a=_38;
}
}
if(!_3a||null==_3a.elements){
return -1;
}
var _3b,elementName,elementValue,elementDisabled;
var _3c=false;
var _3d=(_39)?{}:"";
for(var i=0;i<_3a.elements.length;i++){
_3b=_3a.elements[i];
elementDisabled=_3b.disabled;
elementName=_3b.name;
elementValue=_3b.value;
if(_3b.id&&_3b.id.startsWith("cf_textarea")){
var _3f=CKEDITOR.instances;
if(_3f){
for(ta in _3f){
if(_3f[ta].getData){
elementValue=_3f[ta].getData();
break;
}
}
}
}
if(!elementDisabled&&elementName){
switch(_3b.type){
case "select-one":
case "select-multiple":
for(var j=0;j<_3b.options.length;j++){
if(_3b.options[j].selected){
if(window.ActiveXObject){
_3d=$C.getFormQueryString.processFormData(_3d,_39,elementName,_3b.options[j].attributes["value"].specified?_3b.options[j].value:_3b.options[j].text);
}else{
_3d=$C.getFormQueryString.processFormData(_3d,_39,elementName,_3b.options[j].hasAttribute("value")?_3b.options[j].value:_3b.options[j].text);
}
}
}
break;
case "radio":
case "checkbox":
if(_3b.checked){
_3d=$C.getFormQueryString.processFormData(_3d,_39,elementName,elementValue);
}
break;
case "file":
case undefined:
case "reset":
break;
case "button":
_3d=$C.getFormQueryString.processFormData(_3d,_39,elementName,elementValue);
break;
case "submit":
if(_3b.cfinputbutton){
if(_3c==false&&_3b.clicked){
_3d=$C.getFormQueryString.processFormData(_3d,_39,elementName,elementValue);
_3c=true;
}
}else{
_3d=$C.getFormQueryString.processFormData(_3d,_39,elementName,elementValue);
}
break;
case "textarea":
var _41;
if(window.FCKeditorAPI&&(_41=$C.objectCache[elementName])&&_41.richtextid){
var _42=FCKeditorAPI.GetInstance(_41.richtextid);
if(_42){
elementValue=_42.GetXHTML();
}
}
_3d=$C.getFormQueryString.processFormData(_3d,_39,elementName,elementValue);
break;
default:
_3d=$C.getFormQueryString.processFormData(_3d,_39,elementName,elementValue);
break;
}
}
}
if(!_39){
_3d=_3d.substr(0,_3d.length-1);
}
return _3d;
};
$C.getFormQueryString.processFormData=function(_43,_44,_45,_46){
if(_44){
if(_43[_45]){
_43[_45]+=","+_46;
}else{
_43[_45]=_46;
}
}else{
_43+=encodeURIComponent(_45)+"="+encodeURIComponent(_46)+"&";
}
return _43;
};
$A.importTag=function(_47){
$C.importedTags.push(_47);
};
$A.checkImportedTag=function(_48){
var _49=false;
for(var i=0;i<$C.importedTags.length;i++){
if($C.importedTags[i]==_48){
_49=true;
break;
}
}
if(!_49){
$C.handleError(null,"ajax.checkimportedtag.error","widget",[_48]);
}
};
$C.getElementValue=function(_4b,_4c,_4d){
if(!_4b){
$C.handleError(null,"getelementvalue.noelementname","bind",null,null,null,true);
return;
}
if(!_4d){
_4d="value";
}
var _4e=$B.getBindElementValue(_4b,_4c,_4d);
if(typeof (_4e)=="undefined"){
_4e=null;
}
if(_4e==null){
$C.handleError(null,"getelementvalue.elnotfound","bind",[_4b,_4d],null,null,true);
return;
}
return _4e;
};
$B.getBindElementValue=function(_4f,_50,_51,_52,_53){
var _54="";
if(window[_4f]){
var _55=eval(_4f);
if(_55&&_55._cf_getAttribute){
_54=_55._cf_getAttribute(_51);
return _54;
}
}
var _56=$C.objectCache[_4f];
if(_56&&_56._cf_getAttribute){
_54=_56._cf_getAttribute(_51);
return _54;
}
var el=$D.getElement(_4f,_50);
var _58=(el&&((!el.length&&el.length!=0)||(el.length&&el.length>0)||el.tagName=="SELECT"));
if(!_58&&!_53){
$C.handleError(null,"bind.getbindelementvalue.elnotfound","bind",[_4f]);
return null;
}
if(el.tagName!="SELECT"){
if(el.length>1){
var _59=true;
for(var i=0;i<el.length;i++){
var _5b=(el[i].getAttribute("type")=="radio"||el[i].getAttribute("type")=="checkbox");
if(!_5b||(_5b&&el[i].checked)){
if(!_59){
_54+=",";
}
_54+=$B.getBindElementValue.extract(el[i],_51);
_59=false;
}
}
}else{
_54=$B.getBindElementValue.extract(el,_51);
}
}else{
var _59=true;
for(var i=0;i<el.options.length;i++){
if(el.options[i].selected){
if(!_59){
_54+=",";
}
_54+=$B.getBindElementValue.extract(el.options[i],_51);
_59=false;
}
}
}
if(typeof (_54)=="object"){
$C.handleError(null,"bind.getbindelementvalue.simplevalrequired","bind",[_4f,_51]);
return null;
}
if(_52&&$C.required[_4f]&&_54.length==0){
return null;
}
return _54;
};
$B.getBindElementValue.extract=function(el,_5d){
var _5e=el[_5d];
if((_5e==null||typeof (_5e)=="undefined")&&el.getAttribute){
_5e=el.getAttribute(_5d);
}
return _5e;
};
$L.init=function(){
if(window.YAHOO&&YAHOO.widget&&YAHOO.widget.Logger){
YAHOO.widget.Logger.categories=[CFMessage["debug"],CFMessage["info"],CFMessage["error"],CFMessage["window"]];
YAHOO.widget.LogReader.prototype.formatMsg=function(_5f){
var _60=_5f.category;
return "<p>"+"<span class='"+_60+"'>"+_60+"</span>:<i>"+_5f.source+"</i>: "+_5f.msg+"</p>";
};
var _61=new YAHOO.widget.LogReader(null,{width:"30em",fontSize:"100%"});
_61.setTitle(CFMessage["log.title"]||"ColdFusion AJAX Logger");
_61._btnCollapse.value=CFMessage["log.collapse"]||"Collapse";
_61._btnPause.value=CFMessage["log.pause"]||"Pause";
_61._btnClear.value=CFMessage["log.clear"]||"Clear";
$L.isAvailable=true;
}
};
$L.log=function(_62,_63,_64,_65){
if(!$L.isAvailable){
return;
}
if(!_64){
_64="global";
}
_64=CFMessage[_64]||_64;
_63=CFMessage[_63]||_63;
_62=$L.format(_62,_65);
YAHOO.log(_62,_63,_64);
};
$L.format=function(_66,_67){
var msg=CFMessage[_66]||_66;
if(_67){
for(i=0;i<_67.length;i++){
if(!_67[i].length){
_67[i]="";
}
var _69="{"+i+"}";
msg=msg.replace(_69,_67[i]);
}
}
return msg;
};
$L.debug=function(_6a,_6b,_6c){
$L.log(_6a,"debug",_6b,_6c);
};
$L.info=function(_6d,_6e,_6f){
$L.log(_6d,"info",_6e,_6f);
};
$L.error=function(_70,_71,_72){
$L.log(_70,"error",_71,_72);
};
$L.dump=function(_73,_74){
if($L.isAvailable){
var _75=(/string|number|undefined|boolean/.test(typeof (_73))||_73==null)?_73:recurse(_73,typeof _73,true);
$L.debug(_75,_74);
}
};
$X.invoke=function(_76,_77,_78,_79,_7a){
return $X.invokeInternal(_76,_77,_78,_79,_7a,false,null,null);
};
$X.invokeInternal=function(_7b,_7c,_7d,_7e,_7f,_80,_81,_82){
var _83="method="+_7c+"&_cf_ajaxproxytoken="+_7d;
if(_80){
_83+="&_cfclient="+"true";
var _84=$X.JSON.encodeInternal(_7b._variables,_80);
_83+="&_variables="+encodeURIComponent(_84);
var _85=$X.JSON.encodeInternal(_7b._metadata,_80);
_83+="&_metadata="+encodeURIComponent(_85);
}
var _86=_7b.returnFormat||"json";
_83+="&returnFormat="+_86;
if(_7b.queryFormat){
_83+="&queryFormat="+_7b.queryFormat;
}
if(_7b.formId){
var _87=$C.getFormQueryString(_7b.formId,true);
if(_7e!=null){
for(prop in _87){
_7e[prop]=_87[prop];
}
}else{
_7e=_87;
}
_7b.formId=null;
}
var _88="";
if(_7e!=null){
_88=$X.JSON.encodeInternal(_7e,_80);
_83+="&argumentCollection="+encodeURIComponent(_88);
}
$L.info("ajaxproxy.invoke.invoking","http",[_7b.cfcPath,_7c,_88]);
if(_7b.callHandler){
_7b.callHandler.call(null,_7b.callHandlerParams,_7b.cfcPath,_83);
return;
}
var _89;
var _8a=_7b.async;
if(_81!=null){
_8a=true;
_89=function(req){
$X.callbackOp(req,_7b,_7f,_81,_82);
};
}else{
if(_7b.async){
_89=function(req){
$X.callback(req,_7b,_7f);
};
}
}
var req=$A.sendMessage(_7b.cfcPath,_7b.httpMethod,_83,_8a,_89,null,true);
if(!_8a){
return $X.processResponse(req,_7b);
}
};
$X.callback=function(req,_8f,_90){
if($A.isRequestError(req)){
$C.handleError(_8f.errorHandler,"ajaxproxy.invoke.error","http",[req.status,_8f.cfcPath,req.statusText],req.status,req.statusText,false,_90);
}else{
if(_8f.callbackHandler){
var _91=$X.processResponse(req,_8f);
_8f.callbackHandler(_91,_90);
}
}
};
$X.callbackOp=function(req,_93,_94,_95,_96){
if($A.isRequestError(req)){
var _97=_93.errorHandler;
if(_96!=null){
_97=_96;
}
$C.handleError(_97,"ajaxproxy.invoke.error","http",[req.status,_93.cfcPath,req.statusText],req.status,req.statusText,false,_94);
}else{
if(_95){
var _98=$X.processResponse(req,_93);
_95(_98,_94);
}
}
};
$X.processResponse=function(req,_9a){
var _9b=true;
for(var i=0;i<req.responseText.length;i++){
var c=req.responseText.charAt(i);
_9b=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_9b){
break;
}
}
var _9e=(req.responseXML&&req.responseXML.childNodes.length>0);
var _9f=_9e?"[XML Document]":req.responseText;
$L.info("ajaxproxy.invoke.response","http",[_9f]);
var _a0;
var _a1=_9a.returnFormat||"json";
if(_a1=="json"){
try{
_a0=_9b?null:$X.JSON.decode(req.responseText);
}
catch(e){
if(typeof _9a._metadata!=="undefined"&&_9a._metadata.servercfc&&typeof req.responseText==="string"){
_a0=req.responseText;
}else{
throw e;
}
}
}else{
_a0=_9e?req.responseXML:(_9b?null:req.responseText);
}
return _a0;
};
$X.init=function(_a2,_a3,_a4){
if(typeof _a4==="undefined"){
_a4=false;
}
var _a5=_a3;
if(!_a4){
var _a6=_a3.split(".");
var ns=self;
for(i=0;i<_a6.length-1;i++){
if(_a6[i].length){
ns[_a6[i]]=ns[_a6[i]]||{};
ns=ns[_a6[i]];
}
}
var _a8=_a6[_a6.length-1];
if(ns[_a8]){
return ns[_a8];
}
ns[_a8]=function(){
this.httpMethod="GET";
this.async=false;
this.callbackHandler=null;
this.errorHandler=null;
this.formId=null;
};
_a5=ns[_a8].prototype;
}else{
_a5.httpMethod="GET";
_a5.async=false;
_a5.callbackHandler=null;
_a5.errorHandler=null;
_a5.formId=null;
}
_a5.cfcPath=_a2;
_a5.setHTTPMethod=function(_a9){
if(_a9){
_a9=_a9.toUpperCase();
}
if(_a9!="GET"&&_a9!="POST"){
$C.handleError(null,"ajaxproxy.sethttpmethod.invalidmethod","http",[_a9],null,null,true);
}
this.httpMethod=_a9;
};
_a5.setSyncMode=function(){
this.async=false;
};
_a5.setAsyncMode=function(){
this.async=true;
};
_a5.setCallbackHandler=function(fn){
this.callbackHandler=fn;
this.setAsyncMode();
};
_a5.setErrorHandler=function(fn){
this.errorHandler=fn;
this.setAsyncMode();
};
_a5.setForm=function(fn){
this.formId=fn;
};
_a5.setQueryFormat=function(_ad){
if(_ad){
_ad=_ad.toLowerCase();
}
if(!_ad||(_ad!="column"&&_ad!="row"&&_ad!="struct")){
$C.handleError(null,"ajaxproxy.setqueryformat.invalidformat","http",[_ad],null,null,true);
}
this.queryFormat=_ad;
};
_a5.setReturnFormat=function(_ae){
if(_ae){
_ae=_ae.toLowerCase();
}
if(!_ae||(_ae!="plain"&&_ae!="json"&&_ae!="wddx")){
$C.handleError(null,"ajaxproxy.setreturnformat.invalidformat","http",[_ae],null,null,true);
}
this.returnFormat=_ae;
};
$L.info("ajaxproxy.init.created","http",[_a2]);
if(_a4){
return _a5;
}else{
return ns[_a8];
}
};
$U.isWhitespace=function(s){
var _b0=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_b0=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_b0){
break;
}
}
return _b0;
};
$U.getFirstNonWhitespaceIndex=function(s){
var _b4=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_b4=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_b4){
break;
}
}
return i;
};
$C.trim=function(_b7){
return _b7.replace(/^\s+|\s+$/g,"");
};
$U.isInteger=function(n){
var _b9=true;
if(typeof (n)=="number"){
_b9=(n>=0);
}else{
for(i=0;i<n.length;i++){
if($U.isInteger.numberChars.indexOf(n.charAt(i))==-1){
_b9=false;
break;
}
}
}
return _b9;
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
var _be=null;
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.DATA&&$U.isArray(o.DATA)&&(o.DATA.length==0||(o.DATA.length>0&&$U.isArray(o.DATA[0])))){
_be="row";
}else{
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.ROWCOUNT&&$U.isInteger(o.ROWCOUNT)&&o.DATA){
_be="col";
for(var i=0;i<o.COLUMNS.length;i++){
var _c0=o.DATA[o.COLUMNS[i]];
if(!_c0||!$U.isArray(_c0)){
_be=null;
break;
}
}
}
}
return _be;
};
$X.JSON=new function(){
var _c1={}.hasOwnProperty?true:false;
var _c2=/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/;
var pad=function(n){
return n<10?"0"+n:n;
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};
var _c6=function(s){
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
var _cb=function(o){
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
var _ce=function(o){
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
return _cb(o);
}else{
if(o instanceof Date){
if(cfc){
return this.encodeInternal({_date_:o.getTime()},cfc);
}
return _ce(o);
}else{
if(typeof o=="string"){
return _c6(o);
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
if(!_c1||o.hasOwnProperty(i)){
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
this.decode=function(_d5){
if(typeof _d5=="object"){
return _d5;
}
if($U.isWhitespace(_d5)){
return null;
}
var _d6=$U.getFirstNonWhitespaceIndex(_d5);
if(_d6>0){
_d5=_d5.slice(_d6);
}
if(window._cf_jsonprefix&&_d5.indexOf(_cf_jsonprefix)==0){
_d5=_d5.slice(_cf_jsonprefix.length);
}
try{
if(_c2.test(_d5)){
return JSON.parse(_d5);
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
$C.navigate=function(url,_d8,_d9,_da,_db,_dc){
if(url==null){
$C.handleError(_da,"navigate.urlrequired","widget");
return;
}
if(_db){
_db=_db.toUpperCase();
if(_db!="GET"&&_db!="POST"){
$C.handleError(null,"navigate.invalidhttpmethod","http",[_db],null,null,true);
}
}else{
_db="GET";
}
var _dd;
if(_dc){
_dd=$C.getFormQueryString(_dc);
if(_dd==-1){
$C.handleError(null,"navigate.formnotfound","http",[_dc],null,null,true);
}
}
if(_d8==null){
if(_dd){
if(url.indexOf("?")==-1){
url+="?"+_dd;
}else{
url+="&"+_dd;
}
}
$L.info("navigate.towindow","widget",[url]);
window.location.replace(url);
return;
}
$L.info("navigate.tocontainer","widget",[url,_d8]);
var obj=$C.objectCache[_d8];
if(obj!=null){
if(typeof (obj._cf_body)!="undefined"&&obj._cf_body!=null){
_d8=obj._cf_body;
}
}
$A.replaceHTML(_d8,url,_db,_dd,_d9,_da);
};
$A.checkForm=function(_df,_e0,_e1,_e2,_e3){
var _e4=_e0.call(null,_df);
if(_e4==false){
return false;
}
var _e5=$C.getFormQueryString(_df);
$L.info("ajax.submitform.submitting","http",[_df.name]);
$A.replaceHTML(_e1,_df.action,_df.method,_e5,_e2,_e3);
return false;
};
$A.replaceHTML=function(_e6,url,_e8,_e9,_ea,_eb){
var _ec=document.getElementById(_e6);
if(!_ec){
$C.handleError(_eb,"ajax.replacehtml.elnotfound","http",[_e6]);
return;
}
var _ed="_cf_containerId="+encodeURIComponent(_e6);
_e9=(_e9)?_e9+"&"+_ed:_ed;
$L.info("ajax.replacehtml.replacing","http",[_e6,url,_e9]);
if(_cf_loadingtexthtml){
try{
_ec.innerHTML=_cf_loadingtexthtml;
}
catch(e){
}
}
var _ee=function(req,_f0){
var _f1=false;
if($A.isRequestError(req)){
$C.handleError(_eb,"ajax.replacehtml.error","http",[req.status,_f0.id,req.statusText],req.status,req.statusText);
_f1=true;
}
var _f2=new $E.CustomEvent("onReplaceHTML",_f0);
var _f3=new $E.CustomEvent("onReplaceHTMLUser",_f0);
$E.loadEvents[_f0.id]={system:_f2,user:_f3};
if(req.responseText.search(/<script/i)!=-1){
try{
_f0.innerHTML="";
}
catch(e){
}
$A.replaceHTML.processResponseText(req.responseText,_f0,_eb);
}else{
try{
_f0.innerHTML=req.responseText;
$A.updateLayouttab(_f0);
if(_e9.indexOf("window-id")>-1){
var q=_e9.substring(_e9.indexOf("window-id")+10,_e9.indexOf("&"));
var cmp=Ext.getCmp(q);
if(cmp){
cmp.update(_f0.innerHTML);
}
}
}
catch(e){
}
}
$E.loadEvents[_f0.id]=null;
_f2.fire();
_f2.unsubscribe();
_f3.fire();
_f3.unsubscribe();
$L.info("ajax.replacehtml.success","http",[_f0.id]);
if(_ea&&!_f1){
_ea();
}
};
try{
$A.sendMessage(url,_e8,_e9,true,_ee,_ec);
}
catch(e){
try{
_ec.innerHTML=$L.format(CFMessage["ajax.replacehtml.connectionerrordisplay"],[url,e]);
}
catch(e){
}
$C.handleError(_eb,"ajax.replacehtml.connectionerror","http",[_e6,url,e]);
}
};
$A.replaceHTML.processResponseText=function(_f6,_f7,_f8){
var pos=0;
var _fa=0;
var _fb=0;
_f7._cf_innerHTML="";
while(pos<_f6.length){
var _fc=_f6.indexOf("<s",pos);
if(_fc==-1){
_fc=_f6.indexOf("<S",pos);
}
if(_fc==-1){
break;
}
pos=_fc;
var _fd=true;
var _fe=$A.replaceHTML.processResponseText.scriptTagChars;
for(var i=1;i<_fe.length;i++){
var _100=pos+i+1;
if(_100>_f6.length){
break;
}
var _101=_f6.charAt(_100);
if(_fe[i][0]!=_101&&_fe[i][1]!=_101){
pos+=i+1;
_fd=false;
break;
}
}
if(!_fd){
continue;
}
var _102=_f6.substring(_fa,pos);
if(_102){
_f7._cf_innerHTML+=_102;
}
var _103=_f6.indexOf(">",pos)+1;
if(_103==0){
pos++;
continue;
}else{
pos+=7;
}
var _104=_103;
while(_104<_f6.length&&_104!=-1){
_104=_f6.indexOf("</s",_104);
if(_104==-1){
_104=_f6.indexOf("</S",_104);
}
if(_104!=-1){
_fd=true;
for(var i=1;i<_fe.length;i++){
var _100=_104+2+i;
if(_100>_f6.length){
break;
}
var _101=_f6.charAt(_100);
if(_fe[i][0]!=_101&&_fe[i][1]!=_101){
_104=_100;
_fd=false;
break;
}
}
if(_fd){
break;
}
}
}
if(_104!=-1){
var _105=_f6.substring(_103,_104);
var _106=_105.indexOf("<!--");
if(_106!=-1){
_105=_105.substring(_106+4);
}
var _107=_105.lastIndexOf("//-->");
if(_107!=-1){
_105=_105.substring(0,_107-1);
}
if(_105.indexOf("document.write")!=-1||_105.indexOf("CF_RunContent")!=-1){
if(_105.indexOf("CF_RunContent")!=-1){
_105=_105.replace("CF_RunContent","document.write");
}
_105="var _cfDomNode = document.getElementById('"+_f7.id+"'); var _cfBuffer='';"+"if (!document._cf_write)"+"{document._cf_write = document.write;"+"document.write = function(str){if (_cfBuffer!=null){_cfBuffer+=str;}else{document._cf_write(str);}};};"+_105+";_cfDomNode._cf_innerHTML += _cfBuffer; _cfBuffer=null;";
}
try{
eval(_105);
}
catch(ex){
$C.handleError(_f8,"ajax.replacehtml.jserror","http",[_f7.id,ex]);
}
}
_fc=_f6.indexOf(">",_104)+1;
if(_fc==0){
_fb=_104+1;
break;
}
_fb=_fc;
pos=_fc;
_fa=_fc;
}
if(_fb<_f6.length-1){
var _102=_f6.substring(_fb,_f6.length);
if(_102){
_f7._cf_innerHTML+=_102;
}
}
try{
_f7.innerHTML=_f7._cf_innerHTML;
$A.updateLayouttab(_f7);
}
catch(e){
}
_f7._cf_innerHTML="";
};
$A.updateLayouttab=function(_108){
var _109=_108.id;
var s=_109.substr(13,_109.length);
var cmp=Ext.getCmp(s);
var _10c=_108.innerHTML;
var _10d=document.getElementById(_109);
var html=_10d.innerHTML;
if(cmp){
cmp.update("<div id="+_108.id+">"+html+"</div>");
}
var _10d=document.getElementById(_109);
if(_10d){
}
};
$A.replaceHTML.processResponseText.scriptTagChars=[["s","S"],["c","C"],["r","R"],["i","I"],["p","P"],["t","T"]];
$D.getElement=function(_10f,_110){
var _111=function(_112){
return (_112.name==_10f||_112.id==_10f);
};
var _113=$D.getElementsBy(_111,null,_110);
if(_113.length==1){
return _113[0];
}else{
return _113;
}
};
$D.getElementsBy=function(_114,tag,root){
tag=tag||"*";
var _117=[];
if(root){
root=$D.get(root);
if(!root){
return _117;
}
}else{
root=document;
}
var _118=root.getElementsByTagName(tag);
if(!_118.length&&(tag=="*"&&root.all)){
_118=root.all;
}
for(var i=0,len=_118.length;i<len;++i){
if(_114(_118[i])){
_117[_117.length]=_118[i];
}
}
return _117;
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
var _11b=[];
for(var i=0,len=el.length;i<len;++i){
_11b[_11b.length]=$D.get(el[i]);
}
return _11b;
}
return null;
};
$E.loadEvents={};
$E.CustomEvent=function(_11d,_11e){
return {name:_11d,domNode:_11e,subs:[],subscribe:function(func,_120){
var dup=false;
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
if(sub.f==func&&sub.p==_120){
dup=true;
break;
}
}
if(!dup){
this.subs.push({f:func,p:_120});
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
$E.addListener=function(el,ev,fn,_129){
var l={el:el,ev:ev,fn:fn,params:_129};
$E.listeners.push(l);
var _12b=function(e){
if(!e){
var e=window.event;
}
fn.call(null,e,_129);
};
if(el.addEventListener){
window.addEventListener("load",function(){
el.addEventListener(ev,_12b,false);
});
el.addEventListener(ev,_12b,false);
return true;
}else{
if(el.attachEvent){
el.attachEvent("on"+ev,_12b);
return true;
}else{
return false;
}
}
};
$E.isListener=function(el,ev,fn,_130){
var _131=false;
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn==fn&&ls[i].params==_130){
_131=true;
break;
}
}
return _131;
};
$E.callBindHandlers=function(id,_135,ev){
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
$E.registerOnLoad=function(func,_13b,_13c,user){
if($E.registerOnLoad.windowLoaded){
if(_13b&&_13b._cf_containerId&&$E.loadEvents[_13b._cf_containerId]){
if(user){
$E.loadEvents[_13b._cf_containerId].user.subscribe(func,_13b);
}else{
$E.loadEvents[_13b._cf_containerId].system.subscribe(func,_13b);
}
}else{
func.call(null,null,_13b);
}
}else{
if(user){
$E.windowLoadUserEvent.subscribe(func,_13b);
}else{
if(_13c){
$E.windowLoadImpEvent.subscribe(func,_13b);
}else{
$E.windowLoadEvent.subscribe(func,_13b);
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
var _13f=document.createElement("span");
document.body.insertBefore(_13f,document.body.firstChild);
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
$B.register=function(_141,_142,_143,_144){
for(var i=0;i<_141.length;i++){
var _146=_141[i][0];
var _147=_141[i][1];
var _148=_141[i][2];
if(window[_146]){
var _149=eval(_146);
if(_149&&_149._cf_register){
_149._cf_register(_148,_143,_142);
continue;
}
}
var _14a=$C.objectCache[_146];
if(_14a&&_14a._cf_register){
_14a._cf_register(_148,_143,_142);
continue;
}
var _14b=$D.getElement(_146,_147);
var _14c=(_14b&&((!_14b.length&&_14b.length!=0)||(_14b.length&&_14b.length>0)||_14b.tagName=="SELECT"));
if(!_14c){
$C.handleError(null,"bind.register.elnotfound","bind",[_146]);
}
if(_14b.length>1&&!_14b.options){
for(var j=0;j<_14b.length;j++){
$B.register.addListener(_14b[j],_148,_143,_142);
}
}else{
$B.register.addListener(_14b,_148,_143,_142);
}
}
if(!$C.bindHandlerCache[_142.bindTo]&&typeof (_142.bindTo)=="string"){
$C.bindHandlerCache[_142.bindTo]=function(){
_143.call(null,null,_142);
};
}
if(_144){
_143.call(null,null,_142);
}
};
$B.register.addListener=function(_14e,_14f,_150,_151){
if(!$E.isListener(_14e,_14f,_150,_151)){
$E.addListener(_14e,_14f,_150,_151);
}
};
$B.assignValue=function(_152,_153,_154,_155){
if(!_152){
return;
}
if(_152.call){
_152.call(null,_154,_155);
return;
}
var _156=$C.objectCache[_152];
if(_156&&_156._cf_setValue){
_156._cf_setValue(_154);
return;
}
var _157=document.getElementById(_152);
if(!_157){
$C.handleError(null,"bind.assignvalue.elnotfound","bind",[_152]);
}
if(_157.tagName=="SELECT"){
var _158=$U.checkQuery(_154);
var _159=$C.objectCache[_152];
if(_158){
if(!_159||(_159&&(!_159.valueCol||!_159.displayCol))){
$C.handleError(null,"bind.assignvalue.selboxmissingvaldisplay","bind",[_152]);
return;
}
}else{
if(typeof (_154.length)=="number"&&!_154.toUpperCase){
if(_154.length>0&&(typeof (_154[0].length)!="number"||_154[0].toUpperCase)){
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_152]);
return;
}
}else{
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_152]);
return;
}
}
_157.options.length=0;
var _15a;
var _15b=false;
if(_159){
_15a=_159.selected;
if(_15a&&_15a.length>0){
_15b=true;
}
}
if(!_158){
for(var i=0;i<_154.length;i++){
var opt=new Option(_154[i][1],_154[i][0]);
_157.options[i]=opt;
if(_15b){
for(var j=0;j<_15a.length;j++){
if(_15a[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_158=="col"){
var _15f=_154.DATA[_159.valueCol];
var _160=_154.DATA[_159.displayCol];
if(!_15f||!_160){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_152]);
return;
}
for(var i=0;i<_15f.length;i++){
var opt=new Option(_160[i],_15f[i]);
_157.options[i]=opt;
if(_15b){
for(var j=0;j<_15a.length;j++){
if(_15a[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_158=="row"){
var _161=-1;
var _162=-1;
for(var i=0;i<_154.COLUMNS.length;i++){
var col=_154.COLUMNS[i];
if(col==_159.valueCol){
_161=i;
}
if(col==_159.displayCol){
_162=i;
}
if(_161!=-1&&_162!=-1){
break;
}
}
if(_161==-1||_162==-1){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_152]);
return;
}
for(var i=0;i<_154.DATA.length;i++){
var opt=new Option(_154.DATA[i][_162],_154.DATA[i][_161]);
_157.options[i]=opt;
if(_15b){
for(var j=0;j<_15a.length;j++){
if(_15a[j]==opt.value){
opt.selected=true;
}
}
}
}
}
}
}
}else{
_157[_153]=_154;
}
$E.callBindHandlers(_152,null,"change");
$L.info("bind.assignvalue.success","bind",[_154,_152,_153]);
};
$B.localBindHandler=function(e,_165){
var _166=document.getElementById(_165.bindTo);
var _167=$B.evaluateBindTemplate(_165,true);
$B.assignValue(_165.bindTo,_165.bindToAttr,_167);
};
$B.localBindHandler._cf_bindhandler=true;
$B.evaluateBindTemplate=function(_168,_169,_16a,_16b,_16c){
var _16d=_168.bindExpr;
var _16e="";
if(typeof _16c=="undefined"){
_16c=false;
}
for(var i=0;i<_16d.length;i++){
if(typeof (_16d[i])=="object"){
var _170=null;
if(!_16d[i].length||typeof _16d[i][0]=="object"){
_170=$X.JSON.encode(_16d[i]);
}else{
var _170=$B.getBindElementValue(_16d[i][0],_16d[i][1],_16d[i][2],_169,_16b);
if(_170==null){
if(_169){
_16e="";
break;
}else{
_170="";
}
}
}
if(_16a){
_170=encodeURIComponent(_170);
}
_16e+=_170;
}else{
var _171=_16d[i];
if(_16c==true&&i>0){
if(typeof (_171)=="string"&&_171.indexOf("&")!=0){
_171=encodeURIComponent(_171);
}
}
_16e+=_171;
}
}
return _16e;
};
$B.jsBindHandler=function(e,_173){
var _174=_173.bindExpr;
var _175=new Array();
var _176=_173.callFunction+"(";
for(var i=0;i<_174.length;i++){
var _178;
if(typeof (_174[i])=="object"){
if(_174[i].length){
if(typeof _174[i][0]=="object"){
_178=_174[i];
}else{
_178=$B.getBindElementValue(_174[i][0],_174[i][1],_174[i][2],false);
}
}else{
_178=_174[i];
}
}else{
_178=_174[i];
}
if(i!=0){
_176+=",";
}
_175[i]=_178;
_176+="'"+_178+"'";
}
_176+=")";
var _179=_173.callFunction.apply(null,_175);
$B.assignValue(_173.bindTo,_173.bindToAttr,_179,_173.bindToParams);
};
$B.jsBindHandler._cf_bindhandler=true;
$B.urlBindHandler=function(e,_17b){
var _17c=_17b.bindTo;
if($C.objectCache[_17c]&&$C.objectCache[_17c]._cf_visible===false){
$C.objectCache[_17c]._cf_dirtyview=true;
return;
}
var url=$B.evaluateBindTemplate(_17b,false,true,false,true);
var _17e=$U.extractReturnFormat(url);
if(_17e==null||typeof _17e=="undefined"){
_17e="JSON";
}
if(_17b.bindToAttr||typeof _17b.bindTo=="undefined"||typeof _17b.bindTo=="function"){
var _17b={"bindTo":_17b.bindTo,"bindToAttr":_17b.bindToAttr,"bindToParams":_17b.bindToParams,"errorHandler":_17b.errorHandler,"url":url,returnFormat:_17e};
try{
$A.sendMessage(url,"GET",null,true,$B.urlBindHandler.callback,_17b);
}
catch(e){
$C.handleError(_17b.errorHandler,"ajax.urlbindhandler.connectionerror","http",[url,e]);
}
}else{
$A.replaceHTML(_17c,url,null,null,_17b.callback,_17b.errorHandler);
}
};
$B.urlBindHandler._cf_bindhandler=true;
$B.urlBindHandler.callback=function(req,_180){
if($A.isRequestError(req)){
$C.handleError(_180.errorHandler,"bind.urlbindhandler.httperror","http",[req.status,_180.url,req.statusText],req.status,req.statusText);
}else{
$L.info("bind.urlbindhandler.response","http",[req.responseText]);
var _181;
try{
if(_180.returnFormat==null||_180.returnFormat==="JSON"){
_181=$X.JSON.decode(req.responseText);
}else{
_181=req.responseText;
}
}
catch(e){
if(req.responseText!=null&&typeof req.responseText=="string"){
_181=req.responseText;
}else{
$C.handleError(_180.errorHandler,"bind.urlbindhandler.jsonerror","http",[req.responseText]);
}
}
$B.assignValue(_180.bindTo,_180.bindToAttr,_181,_180.bindToParams);
}
};
$A.initSelect=function(_182,_183,_184,_185){
$C.objectCache[_182]={"valueCol":_183,"displayCol":_184,selected:_185};
};
$S.setupSpry=function(){
if(typeof (Spry)!="undefined"&&Spry.Data){
Spry.Data.DataSet.prototype._cf_getAttribute=function(_186){
var val;
var row=this.getCurrentRow();
if(row){
val=row[_186];
}
return val;
};
Spry.Data.DataSet.prototype._cf_register=function(_189,_18a,_18b){
var obs={bindParams:_18b};
obs.onCurrentRowChanged=function(){
_18a.call(null,null,this.bindParams);
};
obs.onDataChanged=function(){
_18a.call(null,null,this.bindParams);
};
this.addObserver(obs);
};
if(Spry.Debug.trace){
var _18d=Spry.Debug.trace;
Spry.Debug.trace=function(str){
$L.info(str,"spry");
_18d(str);
};
}
if(Spry.Debug.reportError){
var _18f=Spry.Debug.reportError;
Spry.Debug.reportError=function(str){
$L.error(str,"spry");
_18f(str);
};
}
$L.info("spry.setupcomplete","bind");
}
};
$E.registerOnLoad($S.setupSpry,null,true);
$S.bindHandler=function(_191,_192){
var url;
var _194="_cf_nodebug=true&_cf_nocache=true";
if(window._cf_clientid){
_194+="&_cf_clientid="+_cf_clientid;
}
var _195=window[_192.bindTo];
var _196=(typeof (_195)=="undefined");
if(_192.cfc){
var _197={};
var _198=_192.bindExpr;
for(var i=0;i<_198.length;i++){
var _19a;
if(_198[i].length==2){
_19a=_198[i][1];
}else{
_19a=$B.getBindElementValue(_198[i][1],_198[i][2],_198[i][3],false,_196);
}
_197[_198[i][0]]=_19a;
}
_197=$X.JSON.encode(_197);
_194+="&method="+_192.cfcFunction;
_194+="&argumentCollection="+encodeURIComponent(_197);
$L.info("spry.bindhandler.loadingcfc","http",[_192.bindTo,_192.cfc,_192.cfcFunction,_197]);
url=_192.cfc;
}else{
url=$B.evaluateBindTemplate(_192,false,true,_196);
$L.info("spry.bindhandler.loadingurl","http",[_192.bindTo,url]);
}
var _19b=_192.options||{};
if((_195&&_195._cf_type=="json")||_192.dsType=="json"){
_194+="&returnformat=json";
}
if(_195){
if(_195.requestInfo.method=="GET"){
_19b.method="GET";
if(url.indexOf("?")==-1){
url+="?"+_194;
}else{
url+="&"+_194;
}
}else{
_19b.postData=_194;
_19b.method="POST";
_195.setURL("");
}
_195.setURL(url,_19b);
_195.loadData();
}else{
if(!_19b.method||_19b.method=="GET"){
if(url.indexOf("?")==-1){
url+="?"+_194;
}else{
url+="&"+_194;
}
}else{
_19b.postData=_194;
_19b.useCache=false;
}
var ds;
if(_192.dsType=="xml"){
ds=new Spry.Data.XMLDataSet(url,_192.xpath,_19b);
}else{
ds=new Spry.Data.JSONDataSet(url,_19b);
ds.preparseFunc=$S.preparseData;
}
ds._cf_type=_192.dsType;
var _19d={onLoadError:function(req){
$C.handleError(_192.errorHandler,"spry.bindhandler.error","http",[_192.bindTo,req.url,req.requestInfo.postData]);
}};
ds.addObserver(_19d);
window[_192.bindTo]=ds;
}
};
$S.bindHandler._cf_bindhandler=true;
$S.preparseData=function(ds,_1a0){
var _1a1=$U.getFirstNonWhitespaceIndex(_1a0);
if(_1a1>0){
_1a0=_1a0.slice(_1a1);
}
if(window._cf_jsonprefix&&_1a0.indexOf(_cf_jsonprefix)==0){
_1a0=_1a0.slice(_cf_jsonprefix.length);
}
return _1a0;
};
$P.init=function(_1a2){
$L.info("pod.init.creating","widget",[_1a2]);
var _1a3={};
_1a3._cf_body=_1a2+"_body";
$C.objectCache[_1a2]=_1a3;
};
$B.cfcBindHandler=function(e,_1a5){
var _1a6=(_1a5.httpMethod)?_1a5.httpMethod:"GET";
var _1a7={};
var _1a8=_1a5.bindExpr;
for(var i=0;i<_1a8.length;i++){
var _1aa;
if(_1a8[i].length==2){
_1aa=_1a8[i][1];
}else{
_1aa=$B.getBindElementValue(_1a8[i][1],_1a8[i][2],_1a8[i][3],false);
}
_1a7[_1a8[i][0]]=_1aa;
}
var _1ab=function(_1ac,_1ad){
$B.assignValue(_1ad.bindTo,_1ad.bindToAttr,_1ac,_1ad.bindToParams);
};
var _1ae={"bindTo":_1a5.bindTo,"bindToAttr":_1a5.bindToAttr,"bindToParams":_1a5.bindToParams};
var _1af={"async":true,"cfcPath":_1a5.cfc,"httpMethod":_1a6,"callbackHandler":_1ab,"errorHandler":_1a5.errorHandler};
if(_1a5.proxyCallHandler){
_1af.callHandler=_1a5.proxyCallHandler;
_1af.callHandlerParams=_1a5;
}
$X.invoke(_1af,_1a5.cfcFunction,_1a5._cf_ajaxproxytoken,_1a7,_1ae);
};
$B.cfcBindHandler._cf_bindhandler=true;
$U.extractReturnFormat=function(url){
var _1b1;
var _1b2=url.toUpperCase();
var _1b3=_1b2.indexOf("RETURNFORMAT");
if(_1b3>0){
var _1b4=_1b2.indexOf("&",_1b3+13);
if(_1b4<0){
_1b4=_1b2.length;
}
_1b1=_1b2.substring(_1b3+13,_1b4);
}
return _1b1;
};
$U.replaceAll=function(_1b5,_1b6,_1b7){
var _1b8=_1b5.indexOf(_1b6);
while(_1b8>-1){
_1b5=_1b5.replace(_1b6,_1b7);
_1b8=_1b5.indexOf(_1b6);
}
return _1b5;
};
$U.cloneObject=function(obj){
var _1ba={};
for(key in obj){
var _1bb=obj[key];
if(typeof _1bb=="object"){
_1bb=$U.cloneObject(_1bb);
}
_1ba.key=_1bb;
}
return _1ba;
};
$C.clone=function(obj,_1bd){
if(typeof (obj)!="object"){
return obj;
}
if(obj==null){
return obj;
}
var _1be=new Object();
for(var i in obj){
if(_1bd===true){
_1be[i]=$C.clone(obj[i]);
}else{
_1be[i]=obj[i];
}
}
return _1be;
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
