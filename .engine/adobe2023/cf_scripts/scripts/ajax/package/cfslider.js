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
ColdFusion.Slider.init=function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d){
var _e={renderTo:_1,id:_2};
if(_9!=null&&typeof (_9)!="undefined"){
_e.ClicktoChange=_9;
}else{
_e.ClicktoChange=false;
}
if(_a!=null&&typeof (_a)!="undefined"){
_e.increment=_a;
}else{
_e.increment=1;
}
if(_7!=null&&typeof (_7)!=undefined){
_e.minValue=_7;
}else{
_e.minValue=0;
}
if(_6!=null&&typeof (_6)!=undefined){
_e.value=_6;
}else{
_e.value=_e.minValue;
}
if(_4!=null&&typeof (_4)!=undefined){
_e.width=_4;
}else{
_e.width=200;
}
if(_5!=null&&typeof (_5)!="undefined"){
_e.height=_5;
}else{
_e.height=100;
}
if(_8!=null&&typeof (_8)!=undefined){
_e.maxValue=_8;
}else{
_e.maxValue=100;
}
if(_3!=null&&typeof (_3)!=undefined){
_e.vertical=_3;
}else{
_e.vertical=false;
}
if(_c!=null&&typeof (_c)=="function"){
_e.onChange=_c;
}
if(_d!=null&&typeof (_d)!="undefined"){
_e.onDrg=_d;
}
Ext.define("Ext.ux.ST",{extend:"Ext.slider.Tip",minWidth:25,minHeight:25,offsets:[0,-10],init:function(_f){
_f.on("dragstart",this.onSlide,this);
_f.on("drag",this.onSlide,this);
_f.on("dragend",this.hide,this);
_f.on("destroy",this.destroy,this);
},onSlide:function(_10,e,_12){
this.show();
this.body.update(this.getText(_10));
this.el.alignTo(_12.el,"b-t?",this.offsets);
this.doAutoRender();
},getText:function(_13){
return _13.getValue()==0?"0":_13.getValue();
}});
if(_b!=null&&typeof (_b)!="undefined"){
if(_b){
_e.plugins=new Ext.ux.ST();
}else{
_e.useTips=false;
}
}
var _14=Ext.create("Ext.slider.Single",_e);
_14.on("drag",$SL.onDragHandler,_e);
_14.on("changecomplete",$SL.onChangeHandler,_e);
_e.sliderComp=_14;
ColdFusion.objectCache[_2]=_e;
ColdFusion.Log.info("slider.initialized","widget",[_2]);
};
$SL.onDragHandler=function(_15,_16){
var _17=this.onDrg;
if(_17!=null&&typeof (_17)=="function"){
_17.call(this,_15,_16);
}
};
$SL.onChangeHandler=function(_18,_19){
var _1a=this.onChange;
if(_1a!=null&&typeof (_1a)=="function"){
_1a.call(this,_18,_19);
}
};
$SL.getValue=function(_1b){
var _1c=ColdFusion.objectCache[_1b];
if(_1c!=null||typeof (_1c)!="undefined"){
var _1d=_1c.sliderComp;
if(_1d){
return _1d.getValue();
}
}else{
ColdFusion.handleError(null,"slider.getvalue.notfound","widget",[_1b],null,null,true);
}
};
$SL.getSliderObject=function(_1e){
var _1f=ColdFusion.objectCache[_1e];
if(_1f!=null||typeof (_1f)!="undefined"){
return _1f.sliderComp;
}else{
return null;
}
};
$SL.setValue=function(_20,_21){
var _22=ColdFusion.objectCache[_20];
if(_22!=null||typeof (_22)!="undefined"){
var _23=_22.sliderComp;
if(_23){
return _23.setValue(_21,true);
}
}else{
ColdFusion.handleError(null,"slider.setvalue.notfound","widget",[_20],null,null,true);
}
};
$SL.show=function(_24){
var _25=ColdFusion.objectCache[_24];
if(_25!=null||typeof (_25)!="undefined"){
var _26=_25.sliderComp;
if(_26){
return _26.show();
}
}else{
ColdFusion.handleError(null,"slider.show.notfound","widget",[_24],null,null,true);
}
ColdFusion.Log.info("slider.show.shown","widget",[_24]);
};
$SL.hide=function(_27){
var _28=ColdFusion.objectCache[_27];
if(_28!=null||typeof (_28)!="undefined"){
var _29=_28.sliderComp;
if(_29){
return _29.hide();
}
}else{
ColdFusion.handleError(null,"slider.hide.notfound","widget",[_27],null,null,true);
}
ColdFusion.Log.info("slider.hide.hidden","widget",[_27]);
};
$SL.enable=function(_2a){
var _2b=ColdFusion.objectCache[_2a];
if(_2b!=null||typeof (_2b)!="undefined"){
var _2c=_2b.sliderComp;
if(_2c){
return _2c.enable();
}
}else{
ColdFusion.handleError(null,"slider.enable.notfound","widget",[_2a],null,null,true);
}
ColdFusion.Log.info("slider.enable.enabled","widget",[_2a]);
};
$SL.disable=function(_2d){
var _2e=ColdFusion.objectCache[_2d];
if(_2e!=null||typeof (_2e)!="undefined"){
var _2f=_2e.sliderComp;
if(_2f){
return _2f.disable();
}
}else{
ColdFusion.handleError(null,"slider.disable.notfound","widget",[_2d],null,null,true);
}
ColdFusion.Log.info("slider.disable.disabled","widget",[_2d]);
};
