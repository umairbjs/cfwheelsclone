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
ColdFusion.Button.init=function(_156,_157,icon,tips,_15a,_15b,_15c,_15d,_15e){
var _15f={renderTo:_156,enableToggle:_15e,text:_157,onClick:_15a,onToggle:_15b,onMouseOver:_15c,onMouseout:_15d,tooltip:tips,icon:icon};
var _160={renderTo:_156,enableToggle:_15e,text:_157};
if(tips!=null&&typeof tips!="undefined"){
_160.tooltip=tips;
Ext.QuickTips.init();
}
if(icon!=null&&typeof icon!="undefined"){
_160.icon=icon;
}
if(icon&&_157){
_160.iconCls="x-btn-text-icon";
}else{
if(icon&&!_157){
_160.iconCls="x-btn-icon";
}
}
var _161=new Ext.Button(_160);
if(_15a!=null&&typeof _15a=="function"){
_161.on("click",_15a,_15f);
}
if(_15b!=null&&typeof _15b=="function"){
_161.on("toggle",_15b,_15f);
}
if(_15c!=null&&typeof _15c=="function"){
_161.on("mouseover",_15c,_15f);
}
if(_15d!=null&&typeof _15d=="function"){
_161.on("mouseout",_15d,_15f);
}
_15f.buttonComp=_161;
ColdFusion.objectCache[_156]=_15f;
ColdFusion.Log.info("button.initialized","widget",[_156]);
};
$BT.show=function(_162){
var _163=$BT.getButtonObject(_162);
if(_163!=null){
_163.show();
}
ColdFusion.Log.info("button.show.shown","widget",[_162]);
};
$BT.hide=function(_164){
var _165=$BT.getButtonObject(_164);
if(_165!=null){
_165.hide();
}
ColdFusion.Log.info("button.hide.hidden","widget",[_164]);
};
$BT.disable=function(_166){
var _167=$BT.getButtonObject(_166);
if(_167!=null){
_167.disable();
}
ColdFusion.Log.info("button.disable.disabled","widget",[_166]);
};
$BT.enable=function(_168){
var _169=$BT.getButtonObject(_168);
if(_169!=null){
_169.enable();
}
ColdFusion.Log.info("button.enable.enabled","widget",[_168]);
};
$BT.getButtonObject=function(_16a){
var _16b=$BT.getButtonConfigObj(_16a);
if(_16b!=null){
return _16b.buttonComp;
}else{
ColdFusion.handleError(null,"button.component.notFound","widget",[_16a],null,null,true);
}
};
$BT.setLabel=function(_16c,_16d){
var _16e=$BT.getButtonObject(_16c);
if(_16e!=null){
_16e.text=_16d;
}
};
$BT.getButtonConfigObj=function(_16f){
var _170=ColdFusion.objectCache[_16f];
if(_170==null||typeof (_170)=="undefined"){
ColdFusion.handleError(null,"button.component.notFound","widget",[_16f],null,null,true);
}
return _170;
};
$BT.toggle=function(_171){
var _172=$BT.getButtonObject(_171);
if(_172!=null){
_172.toggle();
}
};
