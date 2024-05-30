/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.ProgressBar){
ColdFusion.ProgressBar={};
}
var $P=ColdFusion.ProgressBar;
ColdFusion.ProgressBar.create=function(_443,_444,_445,_446,_447,_448,_449,_44a,_44b,_44c){
var _44d={renderTo:_443,interval:_446,onComplete:_44a,autodisplay:_449,onError:_44c};
var _44e={renderTo:_443};
if(_448!=null&&typeof (_448)!=undefined){
_44d.width=_448;
_44e.width=_448;
}else{
_44e.width=400;
}
if(_447!=null&&typeof (_447)!=undefined){
_44d.height=_447;
_44e.height=_447;
}else{
_44d.autoHeight=true;
_44e.autoHeight=true;
}
if(_444!=null){
_44d.manual=true;
_44d.status_retrieval_fn=_444;
}else{
_44d.manual=false;
_44d.duration=_445;
}
_44d.hidden=!_449;
_44e.hidden=_44d.hidden;
if(_44b!=null&&typeof _44b!="undefined"){
_44d.cls=_44b;
_44e.cls=_44b;
}
var _44f=new Ext.ProgressBar(_44e);
_44d.progressBarComp=_44f;
ColdFusion.objectCache[_443]=_44d;
ColdFusion.Log.info("progressbar.create.created","widget",[_443]);
};
$P.start=function(_450){
var _451=$P.getProgressBarObject(_450);
var _452=ColdFusion.objectCache[_450];
if(!_451.isVisible()){
_451=_451.show();
}
_452.started=true;
if(_452.manual==false){
var _453=_452.interval;
var _454=_452.duration;
var _455=_454/_453;
_451.wait({interval:_453,duration:_454,increment:_455,fn:$P.automaticPBCompleteHandler,scope:_452});
}else{
var _456=setInterval(_452.status_retrieval_fn,_452.interval);
_452.processId=_456;
}
ColdFusion.Log.info("progressbar.start.started","widget",[_450]);
};
$P.stop=function(_457,_458){
var pBar=$P.getProgressBarObject(_457);
var _45a=ColdFusion.objectCache[_457];
var _45b=_45a.processId;
if(typeof _45a.started!="undefined"&&_45a.started==true){
_45a.started=false;
}else{
ColdFusion.Log.info("progressbar.stop.nonrunning","widget",[_457]);
return;
}
if(_45b!=null&&typeof (_45b)!="undefined"){
clearInterval(_45b);
}
if(typeof _45a.manual!="undefined"&&_45a.manual==false){
pBar.reset();
}
if(_458&&_458==true){
var _45c=_45a.onComplete;
if(_45c!=null&&_45c.call){
_45c.call();
}
}
ColdFusion.Log.info("progressbar.stop.stopped","widget",[_457]);
};
$P.hide=function(_45d){
var pBar=$P.getProgressBarObject(_45d);
if(pBar.isVisible()){
pBar.hide();
}
ColdFusion.Log.info("progressbar.hide.hidden","widget",[_45d]);
};
$P.show=function(_45f){
var pBar=$P.getProgressBarObject(_45f);
if(!pBar.isVisible()){
pBar.show();
}
ColdFusion.Log.info("progressbar.show.shown","widget",[_45f]);
};
$P.reset=function(_461){
var pBar=$P.getProgressBarObject(_461);
if(typeof pBar!="undefined"){
pBar.reset();
}
ColdFusion.Log.info("progressbar.reset.reset","widget",[_461]);
};
$P.updateStatus=function(_463,_464,_465){
var pBar=$P.getProgressBarObject(_463);
if(typeof (_464)=="undefined"||typeof (_464)!="number"){
ColdFusion.handleError(null,"progressbar.updatestatus.invalidstatus","widget",[_463,_464],null,null,true);
return;
}
if(typeof pBar!="undefined"){
pBar.updateProgress(_464,_465);
}
ColdFusion.Log.info("progressbar.updatestatus.updated","widget",[_463]);
};
$P.update=function(_467,_468){
var _469={};
var _46a=ColdFusion.objectCache[_467];
if(_46a==null||typeof (_46a)=="undefined"){
ColdFusion.handleError(null,"progressbar.update.notfound","widget",[_467],null,null,true);
return;
}
if(_468.duration){
if(typeof _468.duration==="number"||typeof _468.duration=="object"){
_469.duration=_468.duration;
}else{
ColdFusion.handleError(null,"progressbar.update.invalidduration","widget",[_467],null,null,true);
return;
}
}
if(_468.interval){
if(typeof _468.interval==="number"||typeof _468.interval=="object"){
_469.interval=_468.interval;
}else{
ColdFusion.handleError(null,"progressbar.update.invalidinterval","widget",[_467],null,null,true);
return;
}
}
if(_468.oncomplete){
if(typeof _468.oncomplete==="function"||typeof _468.oncomplete=="object"){
_469.onComplete=_468.oncomplete;
}else{
ColdFusion.handleError(null,"progressbar.update.invalidoncomplete","widget",[_467],null,null,true);
return;
}
}
for(key in _469){
_46a[key]=_469[key];
}
ColdFusion.Log.info("progressbar.update.updated","widget",[_467]);
};
$P.loadStatus=function(data,_46c){
var _46d=ColdFusion.AjaxProxy.JSON.decode(data);
var _46e=_46d.MESSAGE;
var _46f=_46d.STATUS;
var pBar=$P.getProgressBarObject(_46c._cf_progressbarid);
pBar.updateProgress(_46f,_46e);
if(_46f&&(_46f===1||_46f==1||_46f>1)){
$P.stop(_46c._cf_progressbarid,true);
}
};
$P.automaticPBCompleteHandler=function(){
var _471=this.progressBarComp;
_471.updateProgress(1);
if(this.onComplete&&typeof this.onComplete=="function"){
this.onComplete.call(_471,_471);
}
};
$P.errorHandler=function(_472,_473,_474){
var pbId=_474.bindToParams._cf_progressbarid;
var _476=ColdFusion.objectCache[pbId];
var _477=_476.onError;
if(_477!=null&&typeof _477==="function"){
_477.call(null,_472,_473);
}
$P.stop(pbId);
};
$P.getProgressBarObject=function(_478){
var _479=ColdFusion.objectCache[_478];
if(_479==null||typeof (_479)=="undefined"){
ColdFusion.handleError(null,"progressbar.getProgressBarObject.missingprogressbarid","widget",[_478],null,null,true);
return;
}
if(_479.progressBarComp&&typeof _479.progressBarComp!="undefined"){
return _479.progressBarComp;
}else{
ColdFusion.handleError(null,"progressbar.getProgressBarObject.missingprogressbarcomponent","widget",[_478],null,null,true);
return;
}
};
