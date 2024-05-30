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
ColdFusion.ProgressBar.create=function(_8ee,_8ef,_8f0,_8f1,_8f2,_8f3,_8f4,_8f5,_8f6,_8f7){
var _8f8={renderTo:_8ee,interval:_8f1,onComplete:_8f5,autodisplay:_8f4,onError:_8f7};
var _8f9={renderTo:_8ee};
if(_8f3!=null&&typeof (_8f3)!=undefined){
_8f8.width=_8f3;
_8f9.width=_8f3;
}else{
_8f9.width=400;
}
if(_8f2!=null&&typeof (_8f2)!=undefined){
_8f8.height=_8f2;
_8f9.height=_8f2;
}else{
_8f8.autoHeight=true;
_8f9.autoHeight=true;
}
if(_8ef!=null){
_8f8.manual=true;
_8f8.status_retrieval_fn=_8ef;
}else{
_8f8.manual=false;
_8f8.duration=_8f0;
}
_8f8.hidden=!_8f4;
_8f9.hidden=_8f8.hidden;
if(_8f6!=null&&typeof _8f6!="undefined"){
_8f8.cls=_8f6;
_8f9.cls=_8f6;
}
var _8fa=new Ext.ProgressBar(_8f9);
_8f8.progressBarComp=_8fa;
ColdFusion.objectCache[_8ee]=_8f8;
ColdFusion.Log.info("progressbar.create.created","widget",[_8ee]);
};
$P.start=function(_8fb){
var _8fc=$P.getProgressBarObject(_8fb);
var _8fd=ColdFusion.objectCache[_8fb];
if(!_8fc.isVisible()){
_8fc=_8fc.show();
}
_8fd.started=true;
if(_8fd.manual==false){
var _8fe=_8fd.interval;
var _8ff=_8fd.duration;
var _900=_8ff/_8fe;
_8fc.wait({interval:_8fe,duration:_8ff,increment:_900,fn:$P.automaticPBCompleteHandler,scope:_8fd});
}else{
var _901=setInterval(_8fd.status_retrieval_fn,_8fd.interval);
_8fd.processId=_901;
}
ColdFusion.Log.info("progressbar.start.started","widget",[_8fb]);
};
$P.stop=function(_902,_903){
var pBar=$P.getProgressBarObject(_902);
var _905=ColdFusion.objectCache[_902];
var _906=_905.processId;
if(typeof _905.started!="undefined"&&_905.started==true){
_905.started=false;
}else{
ColdFusion.Log.info("progressbar.stop.nonrunning","widget",[_902]);
return;
}
if(_906!=null&&typeof (_906)!="undefined"){
clearInterval(_906);
}
if(typeof _905.manual!="undefined"&&_905.manual==false){
pBar.reset();
}
if(_903&&_903==true){
var _907=_905.onComplete;
if(_907!=null&&_907.call){
_907.call();
}
}
ColdFusion.Log.info("progressbar.stop.stopped","widget",[_902]);
};
$P.hide=function(_908){
var pBar=$P.getProgressBarObject(_908);
if(pBar.isVisible()){
pBar.hide();
}
ColdFusion.Log.info("progressbar.hide.hidden","widget",[_908]);
};
$P.show=function(_90a){
var pBar=$P.getProgressBarObject(_90a);
if(!pBar.isVisible()){
pBar.show();
}
ColdFusion.Log.info("progressbar.show.shown","widget",[_90a]);
};
$P.reset=function(_90c){
var pBar=$P.getProgressBarObject(_90c);
if(typeof pBar!="undefined"){
pBar.reset();
}
ColdFusion.Log.info("progressbar.reset.reset","widget",[_90c]);
};
$P.updateStatus=function(_90e,_90f,_910){
var pBar=$P.getProgressBarObject(_90e);
if(typeof (_90f)=="undefined"||typeof (_90f)!="number"){
ColdFusion.handleError(null,"progressbar.updatestatus.invalidstatus","widget",[_90e,_90f],null,null,true);
return;
}
if(typeof pBar!="undefined"){
pBar.updateProgress(_90f,_910);
}
ColdFusion.Log.info("progressbar.updatestatus.updated","widget",[_90e]);
};
$P.update=function(_912,_913){
var _914={};
var _915=ColdFusion.objectCache[_912];
if(_915==null||typeof (_915)=="undefined"){
ColdFusion.handleError(null,"progressbar.update.notfound","widget",[_912],null,null,true);
return;
}
if(_913.duration){
if(typeof _913.duration==="number"||typeof _913.duration=="object"){
_914.duration=_913.duration;
}else{
ColdFusion.handleError(null,"progressbar.update.invalidduration","widget",[_912],null,null,true);
return;
}
}
if(_913.interval){
if(typeof _913.interval==="number"||typeof _913.interval=="object"){
_914.interval=_913.interval;
}else{
ColdFusion.handleError(null,"progressbar.update.invalidinterval","widget",[_912],null,null,true);
return;
}
}
if(_913.oncomplete){
if(typeof _913.oncomplete==="function"||typeof _913.oncomplete=="object"){
_914.onComplete=_913.oncomplete;
}else{
ColdFusion.handleError(null,"progressbar.update.invalidoncomplete","widget",[_912],null,null,true);
return;
}
}
for(key in _914){
_915[key]=_914[key];
}
ColdFusion.Log.info("progressbar.update.updated","widget",[_912]);
};
$P.loadStatus=function(data,_917){
var _918=ColdFusion.AjaxProxy.JSON.decode(data);
var _919=_918.MESSAGE;
var _91a=_918.STATUS;
var pBar=$P.getProgressBarObject(_917._cf_progressbarid);
pBar.updateProgress(_91a,_919);
if(_91a&&(_91a===1||_91a==1||_91a>1)){
$P.stop(_917._cf_progressbarid,true);
}
};
$P.automaticPBCompleteHandler=function(){
var _91c=this.progressBarComp;
_91c.updateProgress(1);
if(this.onComplete&&typeof this.onComplete=="function"){
this.onComplete.call(_91c,_91c);
}
};
$P.errorHandler=function(_91d,_91e,_91f){
var pbId=_91f.bindToParams._cf_progressbarid;
var _921=ColdFusion.objectCache[pbId];
var _922=_921.onError;
if(_922!=null&&typeof _922==="function"){
_922.call(null,_91d,_91e);
}
$P.stop(pbId);
};
$P.getProgressBarObject=function(_923){
var _924=ColdFusion.objectCache[_923];
if(_924==null||typeof (_924)=="undefined"){
ColdFusion.handleError(null,"progressbar.getProgressBarObject.missingprogressbarid","widget",[_923],null,null,true);
return;
}
if(_924.progressBarComp&&typeof _924.progressBarComp!="undefined"){
return _924.progressBarComp;
}else{
ColdFusion.handleError(null,"progressbar.getProgressBarObject.missingprogressbarcomponent","widget",[_923],null,null,true);
return;
}
};
