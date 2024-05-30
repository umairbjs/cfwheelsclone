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
ColdFusion.Autosuggest.loadAutoSuggest=function(_4e,_4f){
var _50=ColdFusion.objectCache[_4f.autosuggestid];
if(typeof (_4e)=="string"){
_4e=_4e.split(",");
}else{
var _51=false;
if(_4e&&ColdFusion.Util.isArray(_4e)){
_51=true;
if(_4e.length>0&&(typeof (_4e[0])!="string"&&typeof (_4e[0])!="number")){
_51=false;
}
}
if(!_51){
ColdFusion.handleError(_50.onbinderror,"autosuggest.loadautosuggest.invalidvalue","widget",[_4f.autosuggestid]);
return;
}
}
var _52=document.getElementById(_4f.autosuggestid).value;
if(_52.length==1&&_4e.length==0){
var _53=new Array();
_50.dataSource.flushCache();
_50.dataSource=new YAHOO.widget.DS_JSArray(_53);
_50.autosuggestitems=_53;
}
if(_4e.length>0){
var i=0;
var _55=false;
var _53=new Array();
for(i=0;i<_4e.length;i++){
if(_4e[i]){
if(typeof (_4e[i])=="string"){
_53[i]=_4e[i];
}else{
if(typeof (_4e[i])=="number"){
_53[i]=_4e[i]+"";
}else{
_53[i]=new String(_4e[i]);
}
}
if(_53[i].indexOf(_52)==0){
_55=true;
}
}
}
if(_55==false&&_50.showloadingicon==true){
document.getElementById(_4f.autosuggestid+"_cf_button").src=staticgifpath;
}
_50.dataSource.flushCache();
_50.dataSource=new YAHOO.widget.DS_JSArray(_53);
_50.autosuggestitems=_53;
if(_50.queryMatchContains){
_50.dataSource.queryMatchContains=_50.queryMatchContains;
}
_50._sendQuery(_52);
}else{
if(_50.showloadingicon==true){
document.getElementById(_4f.autosuggestid+"_cf_button").src=staticgifpath;
_50.showloadingicon==false;
}
}
};
ColdFusion.Autosuggest.checkToMakeBindCall=function(arg,_57,_58,_59,_5a){
var _59=document.getElementById(_57).value;
if(!_58.isContainerOpen()&&_59.length>0&&arg.keyCode!=39&&(arg.keyCode>31||(arg.keyCode==8&&_58.valuePresent==true))){
_58.valuePresent=false;
if(_58.showloadingicon==true){
document.getElementById(_57+"_cf_button").src=dynamicgifpath;
}
ColdFusion.Log.info("autosuggest.checktomakebindcall.fetching","widget",[_57,_59]);
if(_58.cfqueryDelay>0){
var _5b=setTimeout(_5a,_58.cfqueryDelay*1000,this);
if(_58._nDelayID!=-1){
clearTimeout(_58._cf_nDelayID);
}
_58._cf_nDelayID=_5b;
}else{
_5a.call(this);
}
}
};
ColdFusion.Autosuggest.checkValueNotInAutosuggest=function(_5c,_5d){
if(_5c.autosuggestitems){
for(var i=0;i<_5c.autosuggestitems.length;i++){
if(_5d==_5c.autosuggestitems[i]){
return false;
}
}
}
return true;
};
ColdFusion.Autosuggest.triggerOnChange=function(_5f,_60){
var _61=_60[0];
var _62=document.getElementById(_61.id);
ColdFusion.Event.callBindHandlers(_61.id,null,"change");
};
ColdFusion.Autosuggest.init=function(_63,_64,_65){
return new YAHOO.widget.AutoComplete(_63,_64,_65);
};
ColdFusion.Autosuggest.getAutosuggestObject=function(_66){
var _67=ColdFusion.objectCache[_66];
if(_67==null||typeof (_67)=="undefined"){
ColdFusion.handleError(null,"autosuggest.getAutosuggestObject.notfound","widget",[_66],null,null,true);
}
return _67;
};
ColdFusion.Autosuggest.initJS_ARRAY=function(_68){
return new YAHOO.widget.DS_JSArray(_68);
};
