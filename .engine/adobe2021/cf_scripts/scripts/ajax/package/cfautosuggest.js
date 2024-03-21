/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Autosuggest){
ColdFusion.Autosuggest={};
}
var staticgifpath=_cf_ajaxscriptsrc+"/resources/cf/images/static.gif";
var dynamicgifpath=_cf_ajaxscriptsrc+"/resources/cf/images/loading.gif";
ColdFusion.Autosuggest.loadAutoSuggest=function(_573,_574){
var _575=ColdFusion.objectCache[_574.autosuggestid];
if(typeof (_573)=="string"){
_573=_573.split(",");
}else{
var _576=false;
if(_573&&ColdFusion.Util.isArray(_573)){
_576=true;
if(_573.length>0&&(typeof (_573[0])!="string"&&typeof (_573[0])!="number")){
_576=false;
}
}
if(!_576){
ColdFusion.handleError(_575.onbinderror,"autosuggest.loadautosuggest.invalidvalue","widget",[_574.autosuggestid]);
return;
}
}
var _577=document.getElementById(_574.autosuggestid).value;
if(_577.length==1&&_573.length==0){
var _578=new Array();
_575.dataSource.flushCache();
_575.dataSource=new YAHOO.widget.DS_JSArray(_578);
_575.autosuggestitems=_578;
}
if(_573.length>0){
var i=0;
var _57a=false;
var _578=new Array();
for(i=0;i<_573.length;i++){
if(_573[i]){
if(typeof (_573[i])=="string"){
_578[i]=_573[i];
}else{
if(typeof (_573[i])=="number"){
_578[i]=_573[i]+"";
}else{
_578[i]=new String(_573[i]);
}
}
if(_578[i].indexOf(_577)==0){
_57a=true;
}
}
}
if(_57a==false&&_575.showloadingicon==true){
document.getElementById(_574.autosuggestid+"_cf_button").src=staticgifpath;
}
_575.dataSource.flushCache();
_575.dataSource=new YAHOO.widget.DS_JSArray(_578);
_575.autosuggestitems=_578;
if(_575.queryMatchContains){
_575.dataSource.queryMatchContains=_575.queryMatchContains;
}
_575._sendQuery(_577);
}else{
if(_575.showloadingicon==true){
document.getElementById(_574.autosuggestid+"_cf_button").src=staticgifpath;
_575.showloadingicon==false;
}
}
};
ColdFusion.Autosuggest.checkToMakeBindCall=function(arg,_57c,_57d,_57e,_57f){
var _57e=document.getElementById(_57c).value;
if(!_57d.isContainerOpen()&&_57e.length>0&&arg.keyCode!=39&&(arg.keyCode>31||(arg.keyCode==8&&_57d.valuePresent==true))){
_57d.valuePresent=false;
if(_57d.showloadingicon==true){
document.getElementById(_57c+"_cf_button").src=dynamicgifpath;
}
ColdFusion.Log.info("autosuggest.checktomakebindcall.fetching","widget",[_57c,_57e]);
if(_57d.cfqueryDelay>0){
var _580=setTimeout(_57f,_57d.cfqueryDelay*1000,this);
if(_57d._nDelayID!=-1){
clearTimeout(_57d._cf_nDelayID);
}
_57d._cf_nDelayID=_580;
}else{
_57f.call(this);
}
}
};
ColdFusion.Autosuggest.checkValueNotInAutosuggest=function(_581,_582){
if(_581.autosuggestitems){
for(var i=0;i<_581.autosuggestitems.length;i++){
if(_582==_581.autosuggestitems[i]){
return false;
}
}
}
return true;
};
ColdFusion.Autosuggest.triggerOnChange=function(type,args){
var _586=args[0];
var _587=document.getElementById(_586.id);
ColdFusion.Event.callBindHandlers(_586.id,null,"change");
};
ColdFusion.Autosuggest.init=function(_588,_589,_58a){
return new YAHOO.widget.AutoComplete(_588,_589,_58a);
};
ColdFusion.Autosuggest.getAutosuggestObject=function(_58b){
var _58c=ColdFusion.objectCache[_58b];
if(_58c==null||typeof (_58c)=="undefined"){
ColdFusion.handleError(null,"autosuggest.getAutosuggestObject.notfound","widget",[_58b],null,null,true);
}
return _58c;
};
ColdFusion.Autosuggest.initJS_ARRAY=function(_58d){
return new YAHOO.widget.DS_JSArray(_58d);
};
