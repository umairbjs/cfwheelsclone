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
ColdFusion.Slider.init=function(_6c7,name,_6c9,_6ca,_6cb,_6cc,_6cd,_6ce,_6cf,_6d0,tip,_6d2,_6d3){
var _6d4={renderTo:_6c7,id:name};
if(_6cf!=null&&typeof (_6cf)!="undefined"){
_6d4.ClicktoChange=_6cf;
}else{
_6d4.ClicktoChange=false;
}
if(_6d0!=null&&typeof (_6d0)!="undefined"){
_6d4.increment=_6d0;
}else{
_6d4.increment=1;
}
if(_6cd!=null&&typeof (_6cd)!=undefined){
_6d4.minValue=_6cd;
}else{
_6d4.minValue=0;
}
if(_6cc!=null&&typeof (_6cc)!=undefined){
_6d4.value=_6cc;
}else{
_6d4.value=_6d4.minValue;
}
if(_6ca!=null&&typeof (_6ca)!=undefined){
_6d4.width=_6ca;
}else{
_6d4.width=200;
}
if(_6cb!=null&&typeof (_6cb)!="undefined"){
_6d4.height=_6cb;
}else{
_6d4.height=100;
}
if(_6ce!=null&&typeof (_6ce)!=undefined){
_6d4.maxValue=_6ce;
}else{
_6d4.maxValue=100;
}
if(_6c9!=null&&typeof (_6c9)!=undefined){
_6d4.vertical=_6c9;
}else{
_6d4.vertical=false;
}
if(_6d2!=null&&typeof (_6d2)=="function"){
_6d4.onChange=_6d2;
}
if(_6d3!=null&&typeof (_6d3)!="undefined"){
_6d4.onDrg=_6d3;
}
Ext.define("Ext.ux.ST",{extend:"Ext.slider.Tip",minWidth:25,minHeight:25,offsets:[0,-10],init:function(_6d5){
_6d5.on("dragstart",this.onSlide,this);
_6d5.on("drag",this.onSlide,this);
_6d5.on("dragend",this.hide,this);
_6d5.on("destroy",this.destroy,this);
},onSlide:function(_6d6,e,_6d8){
this.show();
this.body.update(this.getText(_6d6));
this.el.alignTo(_6d8.el,"b-t?",this.offsets);
this.doAutoRender();
},getText:function(_6d9){
return _6d9.getValue()==0?"0":_6d9.getValue();
}});
if(tip!=null&&typeof (tip)!="undefined"){
if(tip){
_6d4.plugins=new Ext.ux.ST();
}else{
_6d4.useTips=false;
}
}
var _6da=Ext.create("Ext.slider.Single",_6d4);
_6da.on("drag",$SL.onDragHandler,_6d4);
_6da.on("changecomplete",$SL.onChangeHandler,_6d4);
_6d4.sliderComp=_6da;
ColdFusion.objectCache[name]=_6d4;
ColdFusion.Log.info("slider.initialized","widget",[name]);
};
$SL.onDragHandler=function(_6db,_6dc){
var _6dd=this.onDrg;
if(_6dd!=null&&typeof (_6dd)=="function"){
_6dd.call(this,_6db,_6dc);
}
};
$SL.onChangeHandler=function(_6de,_6df){
var _6e0=this.onChange;
if(_6e0!=null&&typeof (_6e0)=="function"){
_6e0.call(this,_6de,_6df);
}
};
$SL.getValue=function(_6e1){
var _6e2=ColdFusion.objectCache[_6e1];
if(_6e2!=null||typeof (_6e2)!="undefined"){
var _6e3=_6e2.sliderComp;
if(_6e3){
return _6e3.getValue();
}
}else{
ColdFusion.handleError(null,"slider.getvalue.notfound","widget",[_6e1],null,null,true);
}
};
$SL.getSliderObject=function(_6e4){
var _6e5=ColdFusion.objectCache[_6e4];
if(_6e5!=null||typeof (_6e5)!="undefined"){
return _6e5.sliderComp;
}else{
return null;
}
};
$SL.setValue=function(_6e6,_6e7){
var _6e8=ColdFusion.objectCache[_6e6];
if(_6e8!=null||typeof (_6e8)!="undefined"){
var _6e9=_6e8.sliderComp;
if(_6e9){
return _6e9.setValue(_6e7,true);
}
}else{
ColdFusion.handleError(null,"slider.setvalue.notfound","widget",[_6e6],null,null,true);
}
};
$SL.show=function(_6ea){
var _6eb=ColdFusion.objectCache[_6ea];
if(_6eb!=null||typeof (_6eb)!="undefined"){
var _6ec=_6eb.sliderComp;
if(_6ec){
return _6ec.show();
}
}else{
ColdFusion.handleError(null,"slider.show.notfound","widget",[_6ea],null,null,true);
}
ColdFusion.Log.info("slider.show.shown","widget",[_6ea]);
};
$SL.hide=function(_6ed){
var _6ee=ColdFusion.objectCache[_6ed];
if(_6ee!=null||typeof (_6ee)!="undefined"){
var _6ef=_6ee.sliderComp;
if(_6ef){
return _6ef.hide();
}
}else{
ColdFusion.handleError(null,"slider.hide.notfound","widget",[_6ed],null,null,true);
}
ColdFusion.Log.info("slider.hide.hidden","widget",[_6ed]);
};
$SL.enable=function(_6f0){
var _6f1=ColdFusion.objectCache[_6f0];
if(_6f1!=null||typeof (_6f1)!="undefined"){
var _6f2=_6f1.sliderComp;
if(_6f2){
return _6f2.enable();
}
}else{
ColdFusion.handleError(null,"slider.enable.notfound","widget",[_6f0],null,null,true);
}
ColdFusion.Log.info("slider.enable.enabled","widget",[_6f0]);
};
$SL.disable=function(_6f3){
var _6f4=ColdFusion.objectCache[_6f3];
if(_6f4!=null||typeof (_6f4)!="undefined"){
var _6f5=_6f4.sliderComp;
if(_6f5){
return _6f5.disable();
}
}else{
ColdFusion.handleError(null,"slider.disable.notfound","widget",[_6f3],null,null,true);
}
ColdFusion.Log.info("slider.disable.disabled","widget",[_6f3]);
};
