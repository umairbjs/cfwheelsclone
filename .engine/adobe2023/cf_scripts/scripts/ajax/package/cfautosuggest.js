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
ColdFusion.Autosuggest.loadAutoSuggest=function(_90e,_90f){
var _910=ColdFusion.objectCache[_90f.autosuggestid];
if(typeof (_90e)=="string"){
_90e=_90e.split(",");
}else{
var _911=false;
if(_90e&&ColdFusion.Util.isArray(_90e)){
_911=true;
if(_90e.length>0&&(typeof (_90e[0])!="string"&&typeof (_90e[0])!="number")){
_911=false;
}
}
if(!_911){
ColdFusion.handleError(_910.onbinderror,"autosuggest.loadautosuggest.invalidvalue","widget",[_90f.autosuggestid]);
return;
}
}
var _912=document.getElementById(_90f.autosuggestid).value;
if(_912.length==1&&_90e.length==0){
var _913=new Array();
_910.dataSource.flushCache();
_910.dataSource=new YAHOO.widget.DS_JSArray(_913);
_910.autosuggestitems=_913;
}
if(_90e.length>0){
var i=0;
var _915=false;
var _913=new Array();
for(i=0;i<_90e.length;i++){
if(_90e[i]){
if(typeof (_90e[i])=="string"){
_913[i]=_90e[i];
}else{
if(typeof (_90e[i])=="number"){
_913[i]=_90e[i]+"";
}else{
_913[i]=new String(_90e[i]);
}
}
if(_913[i].indexOf(_912)==0){
_915=true;
}
}
}
if(_915==false&&_910.showloadingicon==true){
document.getElementById(_90f.autosuggestid+"_cf_button").src=staticgifpath;
}
_910.dataSource.flushCache();
_910.dataSource=new YAHOO.widget.DS_JSArray(_913);
_910.autosuggestitems=_913;
if(_910.queryMatchContains){
_910.dataSource.queryMatchContains=_910.queryMatchContains;
}
_910._sendQuery(_912);
}else{
if(_910.showloadingicon==true){
document.getElementById(_90f.autosuggestid+"_cf_button").src=staticgifpath;
_910.showloadingicon==false;
}
}
};
ColdFusion.Autosuggest.checkToMakeBindCall=function(arg,_917,_918,_919,_91a){
var _919=document.getElementById(_917).value;
if(!_918.isContainerOpen()&&_919.length>0&&arg.keyCode!=39&&(arg.keyCode>31||(arg.keyCode==8&&_918.valuePresent==true))){
_918.valuePresent=false;
if(_918.showloadingicon==true){
document.getElementById(_917+"_cf_button").src=dynamicgifpath;
}
ColdFusion.Log.info("autosuggest.checktomakebindcall.fetching","widget",[_917,_919]);
if(_918.cfqueryDelay>0){
var _91b=setTimeout(_91a,_918.cfqueryDelay*1000,this);
if(_918._nDelayID!=-1){
clearTimeout(_918._cf_nDelayID);
}
_918._cf_nDelayID=_91b;
}else{
_91a.call(this);
}
}
};
ColdFusion.Autosuggest.checkValueNotInAutosuggest=function(_91c,_91d){
if(_91c.autosuggestitems){
for(var i=0;i<_91c.autosuggestitems.length;i++){
if(_91d==_91c.autosuggestitems[i]){
return false;
}
}
}
return true;
};
ColdFusion.Autosuggest.triggerOnChange=function(type,args){
var _921=args[0];
var _922=document.getElementById(_921.id);
ColdFusion.Event.callBindHandlers(_921.id,null,"change");
};
ColdFusion.Autosuggest.init=function(_923,_924,_925){
return new YAHOO.widget.AutoComplete(_923,_924,_925);
};
ColdFusion.Autosuggest.getAutosuggestObject=function(_926){
var _927=ColdFusion.objectCache[_926];
if(_927==null||typeof (_927)=="undefined"){
ColdFusion.handleError(null,"autosuggest.getAutosuggestObject.notfound","widget",[_926],null,null,true);
}
return _927;
};
ColdFusion.Autosuggest.initJS_ARRAY=function(_928){
return new YAHOO.widget.DS_JSArray(_928);
};
