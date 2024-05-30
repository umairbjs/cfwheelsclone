/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Slider){
ColdFusion.Slider={};
}
var $SL=ColdFusion.Slider;
ColdFusion.Slider.init=function(_5e1,name,_5e3,_5e4,_5e5,_5e6,_5e7,_5e8,_5e9,_5ea,tip,_5ec,_5ed){
var _5ee={renderTo:_5e1,id:name};
if(_5e9!=null&&typeof (_5e9)!="undefined"){
_5ee.ClicktoChange=_5e9;
}else{
_5ee.ClicktoChange=false;
}
if(_5ea!=null&&typeof (_5ea)!="undefined"){
_5ee.increment=_5ea;
}else{
_5ee.increment=1;
}
if(_5e7!=null&&typeof (_5e7)!=undefined){
_5ee.minValue=_5e7;
}else{
_5ee.minValue=0;
}
if(_5e6!=null&&typeof (_5e6)!=undefined){
_5ee.value=_5e6;
}else{
_5ee.value=_5ee.minValue;
}
if(_5e4!=null&&typeof (_5e4)!=undefined){
_5ee.width=_5e4;
}else{
_5ee.width=200;
}
if(_5e5!=null&&typeof (_5e5)!="undefined"){
_5ee.height=_5e5;
}else{
_5ee.height=100;
}
if(_5e8!=null&&typeof (_5e8)!=undefined){
_5ee.maxValue=_5e8;
}else{
_5ee.maxValue=100;
}
if(_5e3!=null&&typeof (_5e3)!=undefined){
_5ee.vertical=_5e3;
}else{
_5ee.vertical=false;
}
if(_5ec!=null&&typeof (_5ec)=="function"){
_5ee.onChange=_5ec;
}
if(_5ed!=null&&typeof (_5ed)!="undefined"){
_5ee.onDrg=_5ed;
}
Ext.define("Ext.ux.ST",{extend:"Ext.slider.Tip",minWidth:25,minHeight:25,offsets:[0,-10],init:function(_5ef){
_5ef.on("dragstart",this.onSlide,this);
_5ef.on("drag",this.onSlide,this);
_5ef.on("dragend",this.hide,this);
_5ef.on("destroy",this.destroy,this);
},onSlide:function(_5f0,e,_5f2){
this.show();
this.body.update(this.getText(_5f0));
this.el.alignTo(_5f2.el,"b-t?",this.offsets);
this.doAutoRender();
},getText:function(_5f3){
return _5f3.getValue()==0?"0":_5f3.getValue();
}});
if(tip!=null&&typeof (tip)!="undefined"){
if(tip){
_5ee.plugins=new Ext.ux.ST();
}else{
_5ee.useTips=false;
}
}
var _5f4=Ext.create("Ext.slider.Single",_5ee);
_5f4.on("drag",$SL.onDragHandler,_5ee);
_5f4.on("changecomplete",$SL.onChangeHandler,_5ee);
_5ee.sliderComp=_5f4;
ColdFusion.objectCache[name]=_5ee;
ColdFusion.Log.info("slider.initialized","widget",[name]);
};
$SL.onDragHandler=function(_5f5,_5f6){
var _5f7=this.onDrg;
if(_5f7!=null&&typeof (_5f7)=="function"){
_5f7.call(this,_5f5,_5f6);
}
};
$SL.onChangeHandler=function(_5f8,_5f9){
var _5fa=this.onChange;
if(_5fa!=null&&typeof (_5fa)=="function"){
_5fa.call(this,_5f8,_5f9);
}
};
$SL.getValue=function(_5fb){
var _5fc=ColdFusion.objectCache[_5fb];
if(_5fc!=null||typeof (_5fc)!="undefined"){
var _5fd=_5fc.sliderComp;
if(_5fd){
return _5fd.getValue();
}
}else{
ColdFusion.handleError(null,"slider.getvalue.notfound","widget",[_5fb],null,null,true);
}
};
$SL.getSliderObject=function(_5fe){
var _5ff=ColdFusion.objectCache[_5fe];
if(_5ff!=null||typeof (_5ff)!="undefined"){
return _5ff.sliderComp;
}else{
return null;
}
};
$SL.setValue=function(_600,_601){
var _602=ColdFusion.objectCache[_600];
if(_602!=null||typeof (_602)!="undefined"){
var _603=_602.sliderComp;
if(_603){
return _603.setValue(_601,true);
}
}else{
ColdFusion.handleError(null,"slider.setvalue.notfound","widget",[_600],null,null,true);
}
};
$SL.show=function(_604){
var _605=ColdFusion.objectCache[_604];
if(_605!=null||typeof (_605)!="undefined"){
var _606=_605.sliderComp;
if(_606){
return _606.show();
}
}else{
ColdFusion.handleError(null,"slider.show.notfound","widget",[_604],null,null,true);
}
ColdFusion.Log.info("slider.show.shown","widget",[_604]);
};
$SL.hide=function(_607){
var _608=ColdFusion.objectCache[_607];
if(_608!=null||typeof (_608)!="undefined"){
var _609=_608.sliderComp;
if(_609){
return _609.hide();
}
}else{
ColdFusion.handleError(null,"slider.hide.notfound","widget",[_607],null,null,true);
}
ColdFusion.Log.info("slider.hide.hidden","widget",[_607]);
};
$SL.enable=function(_60a){
var _60b=ColdFusion.objectCache[_60a];
if(_60b!=null||typeof (_60b)!="undefined"){
var _60c=_60b.sliderComp;
if(_60c){
return _60c.enable();
}
}else{
ColdFusion.handleError(null,"slider.enable.notfound","widget",[_60a],null,null,true);
}
ColdFusion.Log.info("slider.enable.enabled","widget",[_60a]);
};
$SL.disable=function(_60d){
var _60e=ColdFusion.objectCache[_60d];
if(_60e!=null||typeof (_60e)!="undefined"){
var _60f=_60e.sliderComp;
if(_60f){
return _60f.disable();
}
}else{
ColdFusion.handleError(null,"slider.disable.notfound","widget",[_60d],null,null,true);
}
ColdFusion.Log.info("slider.disable.disabled","widget",[_60d]);
};
