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
ColdFusion.ProgressBar.create=function(_5b5,_5b6,_5b7,_5b8,_5b9,_5ba,_5bb,_5bc,_5bd,_5be){
var _5bf={renderTo:_5b5,interval:_5b8,onComplete:_5bc,autodisplay:_5bb,onError:_5be};
var _5c0={renderTo:_5b5};
if(_5ba!=null&&typeof (_5ba)!=undefined){
_5bf.width=_5ba;
_5c0.width=_5ba;
}else{
_5c0.width=400;
}
if(_5b9!=null&&typeof (_5b9)!=undefined){
_5bf.height=_5b9;
_5c0.height=_5b9;
}else{
_5bf.autoHeight=true;
_5c0.autoHeight=true;
}
if(_5b6!=null){
_5bf.manual=true;
_5bf.status_retrieval_fn=_5b6;
}else{
_5bf.manual=false;
_5bf.duration=_5b7;
}
_5bf.hidden=!_5bb;
_5c0.hidden=_5bf.hidden;
if(_5bd!=null&&typeof _5bd!="undefined"){
_5bf.cls=_5bd;
_5c0.cls=_5bd;
}
var _5c1=new Ext.ProgressBar(_5c0);
_5bf.progressBarComp=_5c1;
ColdFusion.objectCache[_5b5]=_5bf;
ColdFusion.Log.info("progressbar.create.created","widget",[_5b5]);
};
$P.start=function(_5c2){
var _5c3=$P.getProgressBarObject(_5c2);
var _5c4=ColdFusion.objectCache[_5c2];
if(!_5c3.isVisible()){
_5c3=_5c3.show();
}
_5c4.started=true;
if(_5c4.manual==false){
var _5c5=_5c4.interval;
var _5c6=_5c4.duration;
var _5c7=_5c6/_5c5;
_5c3.wait({interval:_5c5,duration:_5c6,increment:_5c7,fn:$P.automaticPBCompleteHandler,scope:_5c4});
}else{
var _5c8=setInterval(_5c4.status_retrieval_fn,_5c4.interval);
_5c4.processId=_5c8;
}
ColdFusion.Log.info("progressbar.start.started","widget",[_5c2]);
};
$P.stop=function(_5c9,_5ca){
var pBar=$P.getProgressBarObject(_5c9);
var _5cc=ColdFusion.objectCache[_5c9];
var _5cd=_5cc.processId;
if(typeof _5cc.started!="undefined"&&_5cc.started==true){
_5cc.started=false;
}else{
ColdFusion.Log.info("progressbar.stop.nonrunning","widget",[_5c9]);
return;
}
if(_5cd!=null&&typeof (_5cd)!="undefined"){
clearInterval(_5cd);
}
if(typeof _5cc.manual!="undefined"&&_5cc.manual==false){
pBar.reset();
}
if(_5ca&&_5ca==true){
var _5ce=_5cc.onComplete;
if(_5ce!=null&&_5ce.call){
_5ce.call();
}
}
ColdFusion.Log.info("progressbar.stop.stopped","widget",[_5c9]);
};
$P.hide=function(_5cf){
var pBar=$P.getProgressBarObject(_5cf);
if(pBar.isVisible()){
pBar.hide();
}
ColdFusion.Log.info("progressbar.hide.hidden","widget",[_5cf]);
};
$P.show=function(_5d1){
var pBar=$P.getProgressBarObject(_5d1);
if(!pBar.isVisible()){
pBar.show();
}
ColdFusion.Log.info("progressbar.show.shown","widget",[_5d1]);
};
$P.reset=function(_5d3){
var pBar=$P.getProgressBarObject(_5d3);
if(typeof pBar!="undefined"){
pBar.reset();
}
ColdFusion.Log.info("progressbar.reset.reset","widget",[_5d3]);
};
$P.updateStatus=function(_5d5,_5d6,_5d7){
var pBar=$P.getProgressBarObject(_5d5);
if(typeof (_5d6)=="undefined"||typeof (_5d6)!="number"){
ColdFusion.handleError(null,"progressbar.updatestatus.invalidstatus","widget",[_5d5,_5d6],null,null,true);
return;
}
if(typeof pBar!="undefined"){
pBar.updateProgress(_5d6,_5d7);
}
ColdFusion.Log.info("progressbar.updatestatus.updated","widget",[_5d5]);
};
$P.update=function(_5d9,_5da){
var _5db={};
var _5dc=ColdFusion.objectCache[_5d9];
if(_5dc==null||typeof (_5dc)=="undefined"){
ColdFusion.handleError(null,"progressbar.update.notfound","widget",[_5d9],null,null,true);
return;
}
if(_5da.duration){
if(typeof _5da.duration==="number"||typeof _5da.duration=="object"){
_5db.duration=_5da.duration;
}else{
ColdFusion.handleError(null,"progressbar.update.invalidduration","widget",[_5d9],null,null,true);
return;
}
}
if(_5da.interval){
if(typeof _5da.interval==="number"||typeof _5da.interval=="object"){
_5db.interval=_5da.interval;
}else{
ColdFusion.handleError(null,"progressbar.update.invalidinterval","widget",[_5d9],null,null,true);
return;
}
}
if(_5da.oncomplete){
if(typeof _5da.oncomplete==="function"||typeof _5da.oncomplete=="object"){
_5db.onComplete=_5da.oncomplete;
}else{
ColdFusion.handleError(null,"progressbar.update.invalidoncomplete","widget",[_5d9],null,null,true);
return;
}
}
for(key in _5db){
_5dc[key]=_5db[key];
}
ColdFusion.Log.info("progressbar.update.updated","widget",[_5d9]);
};
$P.loadStatus=function(data,_5de){
var _5df=ColdFusion.AjaxProxy.JSON.decode(data);
var _5e0=_5df.MESSAGE;
var _5e1=_5df.STATUS;
var pBar=$P.getProgressBarObject(_5de._cf_progressbarid);
pBar.updateProgress(_5e1,_5e0);
if(_5e1&&(_5e1===1||_5e1==1||_5e1>1)){
$P.stop(_5de._cf_progressbarid,true);
}
};
$P.automaticPBCompleteHandler=function(){
var _5e3=this.progressBarComp;
_5e3.updateProgress(1);
if(this.onComplete&&typeof this.onComplete=="function"){
this.onComplete.call(_5e3,_5e3);
}
};
$P.errorHandler=function(_5e4,_5e5,_5e6){
var pbId=_5e6.bindToParams._cf_progressbarid;
var _5e8=ColdFusion.objectCache[pbId];
var _5e9=_5e8.onError;
if(_5e9!=null&&typeof _5e9==="function"){
_5e9.call(null,_5e4,_5e5);
}
$P.stop(pbId);
};
$P.getProgressBarObject=function(_5ea){
var _5eb=ColdFusion.objectCache[_5ea];
if(_5eb==null||typeof (_5eb)=="undefined"){
ColdFusion.handleError(null,"progressbar.getProgressBarObject.missingprogressbarid","widget",[_5ea],null,null,true);
return;
}
if(_5eb.progressBarComp&&typeof _5eb.progressBarComp!="undefined"){
return _5eb.progressBarComp;
}else{
ColdFusion.handleError(null,"progressbar.getProgressBarObject.missingprogressbarcomponent","widget",[_5ea],null,null,true);
return;
}
};
