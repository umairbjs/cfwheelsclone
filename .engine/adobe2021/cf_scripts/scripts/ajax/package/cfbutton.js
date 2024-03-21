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
ColdFusion.Button.init=function(_e1,_e2,_e3,_e4,_e5,_e6,_e7,_e8,_e9){
var _ea={renderTo:_e1,enableToggle:_e9,text:_e2,onClick:_e5,onToggle:_e6,onMouseOver:_e7,onMouseout:_e8,tooltip:_e4,icon:_e3};
var _eb={renderTo:_e1,enableToggle:_e9,text:_e2};
if(_e4!=null&&typeof _e4!="undefined"){
_eb.tooltip=_e4;
Ext.QuickTips.init();
}
if(_e3!=null&&typeof _e3!="undefined"){
_eb.icon=_e3;
}
if(_e3&&_e2){
_eb.iconCls="x-btn-text-icon";
}else{
if(_e3&&!_e2){
_eb.iconCls="x-btn-icon";
}
}
var _ec=new Ext.Button(_eb);
if(_e5!=null&&typeof _e5=="function"){
_ec.on("click",_e5,_ea);
}
if(_e6!=null&&typeof _e6=="function"){
_ec.on("toggle",_e6,_ea);
}
if(_e7!=null&&typeof _e7=="function"){
_ec.on("mouseover",_e7,_ea);
}
if(_e8!=null&&typeof _e8=="function"){
_ec.on("mouseout",_e8,_ea);
}
_ea.buttonComp=_ec;
ColdFusion.objectCache[_e1]=_ea;
ColdFusion.Log.info("button.initialized","widget",[_e1]);
};
$BT.show=function(_ed){
var _ee=$BT.getButtonObject(_ed);
if(_ee!=null){
_ee.show();
}
ColdFusion.Log.info("button.show.shown","widget",[_ed]);
};
$BT.hide=function(_ef){
var _f0=$BT.getButtonObject(_ef);
if(_f0!=null){
_f0.hide();
}
ColdFusion.Log.info("button.hide.hidden","widget",[_ef]);
};
$BT.disable=function(_f1){
var _f2=$BT.getButtonObject(_f1);
if(_f2!=null){
_f2.disable();
}
ColdFusion.Log.info("button.disable.disabled","widget",[_f1]);
};
$BT.enable=function(_f3){
var _f4=$BT.getButtonObject(_f3);
if(_f4!=null){
_f4.enable();
}
ColdFusion.Log.info("button.enable.enabled","widget",[_f3]);
};
$BT.getButtonObject=function(_f5){
var _f6=$BT.getButtonConfigObj(_f5);
if(_f6!=null){
return _f6.buttonComp;
}else{
ColdFusion.handleError(null,"button.component.notFound","widget",[_f5],null,null,true);
}
};
$BT.setLabel=function(_f7,_f8){
var _f9=$BT.getButtonObject(_f7);
if(_f9!=null){
_f9.text=_f8;
}
};
$BT.getButtonConfigObj=function(_fa){
var _fb=ColdFusion.objectCache[_fa];
if(_fb==null||typeof (_fb)=="undefined"){
ColdFusion.handleError(null,"button.component.notFound","widget",[_fa],null,null,true);
}
return _fb;
};
$BT.toggle=function(_fc){
var _fd=$BT.getButtonObject(_fc);
if(_fd!=null){
_fd.toggle();
}
};
