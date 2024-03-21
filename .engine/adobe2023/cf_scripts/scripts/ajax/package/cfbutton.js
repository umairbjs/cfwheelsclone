/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Button){
ColdFusion.Button={};
}
var $BT=ColdFusion.Button;
ColdFusion.Button.init=function(_651,_652,icon,tips,_655,_656,_657,_658,_659){
var _65a={renderTo:_651,enableToggle:_659,text:_652,onClick:_655,onToggle:_656,onMouseOver:_657,onMouseout:_658,tooltip:tips,icon:icon};
var _65b={renderTo:_651,enableToggle:_659,text:_652};
if(tips!=null&&typeof tips!="undefined"){
_65b.tooltip=tips;
Ext.QuickTips.init();
}
if(icon!=null&&typeof icon!="undefined"){
_65b.icon=icon;
}
if(icon&&_652){
_65b.iconCls="x-btn-text-icon";
}else{
if(icon&&!_652){
_65b.iconCls="x-btn-icon";
}
}
var _65c=new Ext.Button(_65b);
if(_655!=null&&typeof _655=="function"){
_65c.on("click",_655,_65a);
}
if(_656!=null&&typeof _656=="function"){
_65c.on("toggle",_656,_65a);
}
if(_657!=null&&typeof _657=="function"){
_65c.on("mouseover",_657,_65a);
}
if(_658!=null&&typeof _658=="function"){
_65c.on("mouseout",_658,_65a);
}
_65a.buttonComp=_65c;
ColdFusion.objectCache[_651]=_65a;
ColdFusion.Log.info("button.initialized","widget",[_651]);
};
$BT.show=function(_65d){
var _65e=$BT.getButtonObject(_65d);
if(_65e!=null){
_65e.show();
}
ColdFusion.Log.info("button.show.shown","widget",[_65d]);
};
$BT.hide=function(_65f){
var _660=$BT.getButtonObject(_65f);
if(_660!=null){
_660.hide();
}
ColdFusion.Log.info("button.hide.hidden","widget",[_65f]);
};
$BT.disable=function(_661){
var _662=$BT.getButtonObject(_661);
if(_662!=null){
_662.disable();
}
ColdFusion.Log.info("button.disable.disabled","widget",[_661]);
};
$BT.enable=function(_663){
var _664=$BT.getButtonObject(_663);
if(_664!=null){
_664.enable();
}
ColdFusion.Log.info("button.enable.enabled","widget",[_663]);
};
$BT.getButtonObject=function(_665){
var _666=$BT.getButtonConfigObj(_665);
if(_666!=null){
return _666.buttonComp;
}else{
ColdFusion.handleError(null,"button.component.notFound","widget",[_665],null,null,true);
}
};
$BT.setLabel=function(_667,_668){
var _669=$BT.getButtonObject(_667);
if(_669!=null){
_669.text=_668;
}
};
$BT.getButtonConfigObj=function(_66a){
var _66b=ColdFusion.objectCache[_66a];
if(_66b==null||typeof (_66b)=="undefined"){
ColdFusion.handleError(null,"button.component.notFound","widget",[_66a],null,null,true);
}
return _66b;
};
$BT.toggle=function(_66c){
var _66d=$BT.getButtonObject(_66c);
if(_66d!=null){
_66d.toggle();
}
};
