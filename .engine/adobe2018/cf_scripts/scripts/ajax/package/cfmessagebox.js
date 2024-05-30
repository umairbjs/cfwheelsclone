/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.MessageBox){
ColdFusion.MessageBox={};
}
var $MB=ColdFusion.MessageBox;
var DEFAULT_OK="Ok";
var DEFAULT_NO="No";
var DEFAULT_CANCEL="Cancel";
var DEFAULT_YES="Yes";
var DEFAULT_ALERT_BUTTON_TYPE=1;
var DEFAULT_CONFIRM_BUTTON_TYPE=6;
var DEFAULT_PROMPT_BUTTON_TYPE=9;
var CF_BEFORE_SHOW_HANDLER_ADDED=false;
var CURRENT_MESSAGEBOX_ID;
var $XB={};
Ext.onReady(function(){
$XB=Ext.MessageBox;
DEFAULT_OK=$XB.buttonText.ok;
DEFAULT_NO=$XB.buttonText.no;
DEFAULT_CANCEL=$XB.buttonText.cancel;
DEFAULT_YES=$XB.buttonText.yes;
DEFAULT_ALERT_BUTTON_TYPE=$XB.OK;
DEFAULT_CONFIRM_BUTTON_TYPE=$XB.YESNO;
DEFAULT_PROMPT_BUTTON_TYPE=$XB.OKCANCEL;
});
ColdFusion.MessageBox.init=function(_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,x,y,_19,_1a){
var _1b={messageBoxId:_a,type:_b,callBack_Fn:_14,multiline:_12,modal:_13,width:_16,bodyStyle:_1a};
if(_c==null||typeof (_c)=="undefined"){
_c="";
}
_c=ColdFusion.Util.replaceAll(_c,"\n","<br>");
_1b.messageText=_c;
if(_e!=null&&typeof (_e)!="undefined"){
_1b.label_OK=_e;
}
if(_f!=null&&typeof (_f)!="undefined"){
_1b.label_NO=_f;
}
if(_11!=null&&typeof (_11)!="undefined"){
_1b.label_YES=_11;
}
if(_10!=null&&typeof (_10)!="undefined"){
_1b.label_CANCEL=_10;
}
if(_d==null||typeof (_d)=="undefined"){
_b=_b.toLowerCase();
if(_b=="alert"){
_d="Alert";
}else{
if(_b=="confirm"){
_d="Confirm";
}else{
if(_b=="prompt"){
_d="Prompt";
}
}
}
}
_1b.title=_d;
if(_19&&typeof (_19)=="string"){
_1b.buttonType=_19;
}
if(_15&&typeof (_15)=="string"){
_1b.icon=_15;
}
if(typeof x=="number"&&x>=0){
_1b.x=x;
}
if(typeof y=="number"&&y>=0){
_1b.y=y;
}
ColdFusion.objectCache[_a]=_1b;
};
$MB.show=function(_1c){
var _1d=$MB.getMessageBoxObject(_1c);
var _1e=_1d.type;
_1e=(new String(_1e)).toLowerCase();
if(!CF_BEFORE_SHOW_HANDLER_ADDED){
var _1f=Ext.MessageBox;
_1f.addListener("show",$MB.beforeShowHandler,_1d);
CF_BEFORE_SHOW_HANDLER_ADDED=true;
}
CURRENT_MESSAGEBOX_ID=_1c;
var _20=_1d.buttonType;
var _21={ok:DEFAULT_OK,no:DEFAULT_NO,cancel:DEFAULT_CANCEL,yes:DEFAULT_YES};
if(_1d.label_OK){
_21.ok=_1d.label_OK;
}
if(_1d.label_YES){
_21.yes=_1d.label_YES;
}
if(_1d.label_NO){
_21.no=_1d.label_NO;
}
if(_1d.label_CANCEL){
_21.cancel=_1d.label_CANCEL;
}
Ext.MessageBox.buttonText=_21;
if(typeof _20!="undefined"){
_20=_20.toUpperCase();
if(_20&&_20!=="OKCANCEL"&&_20!=="OK"&&_20!=="YESNOCANCEL"&&_20!=="YESNO"){
ColdFusion.handleError(null,"messagebox.show.invalidbuttontype","widget",[messagebox,_20],null,null,true);
}
switch(_20){
case "OK":
_20=$XB.OK;
break;
case "OKCANCEL":
_20=$XB.OKCANCEL;
break;
case "YESNOCANCEL":
_20=$XB.YESNOCANCEL;
break;
case "YESNO":
_20=$XB.YESNO;
break;
}
}
var _22=_1d.icon;
var _23="";
if(_22&&typeof (_22)==="string"){
_22=_22.toUpperCase();
switch(_22){
case "ERROR":
_23=$XB.ERROR;
break;
case "INFO":
_23=$XB.INFO;
break;
case "QUESTION":
_23=$XB.QUESTION;
break;
case "WARNING":
_23=$XB.WARNING;
break;
}
}
var _24={title:_1d.title,msg:_1d.messageText,fn:_1d.callBack_Fn,modal:_1d.modal,icon:_23,scope:null};
if(_1d.width){
_24.width=_1d.width;
if(_24.width>600){
_24.maxWidth=_24.width;
}
if(_24.width<100){
_24.minWidth=_24.width;
}
}
if(_1e==="alert"){
if(!_20){
_20=DEFAULT_ALERT_BUTTON_TYPE;
}
_24.buttons=_20;
$XB.show(_24);
}
if(_1e==="confirm"){
if(!_20){
_20=DEFAULT_CONFIRM_BUTTON_TYPE;
}
_24.buttons=_20;
$XB.show(_24);
}
if(_1e==="prompt"){
if(!_20){
_20=DEFAULT_PROMPT_BUTTON_TYPE;
}
_24.buttons=_20;
_24.prompt=true;
_24.multiline=_1d.multiline;
_24.value="",$XB.show(_24);
}
ColdFusion.Log.info("messagebox.show.shown","widget",[_1c]);
};
$MB.create=function(_25,_26,_27,_28,_29,_2a){
if(_25&&typeof _25!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidname","widget",null,null,null,true);
return;
}
if(!_25||ColdFusion.trim(_25)==""){
ColdFusion.handleError(null,"messagebox.create.invalidname","widget",null,null,null,true);
return;
}
var _2b=ColdFusion.objectCache[_25];
if(_2b!=null||typeof _2b!="undefined"){
ColdFusion.handleError(null,"messagebox.create.duplicatename","widget",[_25],null,null,true);
return;
}
if(_28&&typeof _28!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidmessage","widget",[_25],null,null,true);
return;
}
if(!_28||ColdFusion.trim(_28)==""){
ColdFusion.handleError(null,"messagebox.create.invalidmessage","widget",[_25],null,null,true);
return;
}
if(_27&&typeof _27!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidtitle","widget",[_25],null,null,true);
return;
}
if(_26&&typeof _26!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidtype","widget",[_25],null,null,true);
return;
}
if(!_26||ColdFusion.trim(_26)==""){
ColdFusion.handleError(null,"messagebox.create.emptytype","widget",[_25],null,null,true);
return;
}
if(_29&&typeof _29!=="function"){
ColdFusion.handleError(null,"messagebox.create.invalidcallback","widget",[_25],null,null,true);
return;
}
var _2c=DEFAULT_CANCEL;
var _2d=DEFAULT_NO;
var _2e=DEFAULT_OK;
var _2f=DEFAULT_YES;
var _30=true;
var _31=null;
var _32=false;
var _33;
var _34;
var x;
var y;
var _37;
if(_2a&&_2a.labelok){
_2e=_2a.labelok;
}
if(_2a&&_2a.labelno){
_2d=_2a.labelno;
}
if(_2a&&_2a.labelyes){
_2f=_2a.labelyes;
}
if(_2a&&_2a.labelcancel){
_2c=_2a.labelcancel;
}
if(_2a&&typeof _2a.multiline==="boolean"){
_32=_2a.multiline;
}
if(_2a&&typeof _2a.modal==="boolean"){
_30=_2a.modal;
}
if(_2a&&_2a.buttontype){
_31=_2a.buttontype;
if(_26.toUpperCase()!=="CONFIRM"){
ColdFusion.handleError(null,"messagebox.create.invalidtypeandbuttontypecombination","widget",[_25],null,null,true);
}else{
if(_31.toUpperCase()!="YESNO"&&_31.toUpperCase()!="YESNOCANCEL"){
ColdFusion.handleError(null,"messagebox.create.invalidbuttontype","widget",[_25,_31],null,null,true);
}
}
}
if(_2a&&_2a.width){
_34=_2a.width;
if(_34&&typeof _34!="number"){
ColdFusion.handleError(null,"messagebox.create.widthnotnumeric","widget",[_25,_34],null,null,true);
}
}
if(_2a&&typeof _2a.x!="undefined "){
if(_2a.x&&typeof _2a.x!="number"){
ColdFusion.handleError(null,"messagebox.create.xnotnumeric","widget",[_25,_2a.x],null,null,true);
return;
}
x=_2a.x;
}
if(_2a&&typeof _2a.y!="undefined"){
if(_2a.y&&typeof _2a.y!="number"){
ColdFusion.handleError(null,"messagebox.create.ynotnumeric","widget",[_25,_2a.y],null,null,true);
return;
}
y=_2a.y;
}
if(_2a&&_2a.icon){
_33=_2a.icon;
if(_33){
_33=_33.toUpperCase();
if(_33!="ERROR"&&_33!="INFO"&&_33!="QUESTION"&&_33!="WARNING"){
ColdFusion.handleError(null,"messagebox.create.invalidicon","widget",[_25,_33],null,null,true);
}
}
}
if(_2a&&_2a.bodystyle){
_37=_2a.bodystyle;
}
$MB.init(_25,_26,_28,_27,_2e,_2d,_2c,_2f,_32,_30,_29,_33,_34,x,y,_31,_37);
ColdFusion.Log.info("messagebox.create.created","widget",[_25,_26]);
};
$MB.updateMessage=function(_38,_39){
var _3a=$MB.getMessageBoxObject(_38);
_3a.messageText=_39;
ColdFusion.Log.info("messagebox.updatemessage.updated","widget",[_38]);
};
$MB.updateTitle=function(_3b,_3c){
var _3d=$MB.getMessageBoxObject(_3b);
_3d.title=_3c;
ColdFusion.Log.info("messagebox.updatetitle.updated","widget",[_3b]);
};
$MB.update=function(_3e,_3f){
var _40=$MB.getMessageBoxObject(_3e);
var _41={};
if(!_3f||typeof _3f!="object"){
ColdFusion.handleError(null,"messagebox.update.invalidconfigobject","widget",[_3e],null,null,true);
return;
}
if(_3f.name&&typeof _3f.name=="string"){
ColdFusion.handleError(null,"messagebox.update.nameupdatenotallowed","widget",[_3e],null,null,true);
return;
}
if(_3f.type&&typeof _3f.type=="string"){
ColdFusion.handleError(null,"messagebox.update.typeupdatenotallowed","widget",[_3e],null,null,true);
return;
}
if(_3f.message){
if(typeof _3f.message==="string"||typeof _3f.message=="object"){
_41.messageText=_3f.message;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidmessage","widget",[_3e],null,null,true);
return;
}
}
if(_3f.title){
if(typeof _3f.title==="string"||typeof _3f.title=="object"){
_41.title=_3f.title;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidtitle","widget",[_3e],null,null,true);
return;
}
}
if(_3f.labelok!=null||typeof _3f.labelok!="undefined"){
if(typeof _3f.labelok==="string"||typeof _3f.labelok=="object"){
_41.label_OK=_3f.labelok;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelok","widget",[_3e],null,null,true);
return;
}
}
if(_3f.labelno!=null||typeof _3f.labelno!="undefined"){
if(typeof _3f.labelno==="string"||typeof _3f.labelno=="object"){
_41.label_NO=_3f.labelno;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelno","widget",[_3e],null,null,true);
return;
}
}
if(_3f.labelyes!=null||typeof _3f.labelyes!="undefined"){
if(typeof _3f.labelyes==="string"||typeof _3f.labelyes=="object"){
_41.label_YES=_3f.labelyes;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelyes","widget",[_3e],null,null,true);
return;
}
}
if(_3f.labelcancel!=null||typeof _3f.labelcancel!="undefined"){
if(typeof _3f.labelcancel==="string"||typeof _3f.labelcancel=="object"){
_41.label_CANCEL=_3f.labelcancel;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelcancel","widget",[_3e],null,null,true);
return;
}
}
if(typeof _3f.modal=="boolean"){
_41.modal=_3f.modal;
}
if(typeof _3f.multiline==="boolean"){
if(_40.type.toLowerCase()!="prompt"){
ColdFusion.handleError(null,"messagebox.update.invalidtypeformultiline","widget",[_3e],null,null,true);
return;
}
_41.multiline=_3f.multiline;
}
if(_3f&&_3f.width){
if(typeof _3f.width==="number"||typeof _3f.width=="object"){
_41.width=_3f.width;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidwidth","widget",[_3e],null,null,true);
return;
}
}
if(_3f.icon!=null||typeof _3f.icon!="undefined"){
if(typeof _3f.icon==="string"){
icon=_3f.icon.toUpperCase();
if(icon!="ERROR"&&icon!="INFO"&&icon!="QUESTION"&&icon!="WARNING"){
ColdFusion.handleError(null,"messagebox.update.invalidicon","widget",[_3e],null,null,true);
return;
}
_41.icon=_3f.icon;
}else{
if(typeof _3f.icon=="object"&&_3f.icon==null){
_41.icon=null;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidicon","widget",[_3e],null,null,true);
return;
}
}
}
if(_3f.callbackhandler!=null||typeof _3f.callbackhandler!="undefined"){
if(typeof _3f.callbackhandler==="function"||typeof _3f.callbackhandler==="object"){
_41.callBack_Fn=_3f.callbackhandler;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidcallbackhandler","widget",[_3e],null,null,true);
return;
}
}
if(_3f.x!=null||typeof _3f.x!="undefined"){
if(typeof _3f.x==="number"||typeof _3f.x=="object"){
_41.x=_3f.x;
}else{
ColdFusion.handleError(null,"messagebox.update.xnotnumeric","widget",[_3e,_3f.x],null,null,true);
return;
}
}
if(_3f.y!=null||typeof _3f.y!="undefined"){
if(typeof _3f.y==="number"||typeof _3f.y=="object"){
_41.y=_3f.y;
}else{
ColdFusion.handleError(null,"messagebox.update.ynotnumeric","widget",[_3e,_3f.y],null,null,true);
return;
}
}
if(_3f.bodystyle!=null||typeof _3f.bodystyle!="undefined"){
if(typeof _3f.bodystyle==="string"||typeof _3f.bodystyle=="object"){
_41.bodyStyle=_3f.bodystyle;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidbodystyle","widget",[_3e],null,null,true);
return;
}
}
if(_3f.buttontype!=null||typeof _3f.buttontype!="undefined"){
if(typeof _3f.buttontype==="string"||typeof _3f.buttontype==="object"){
buttonType=_3f.buttontype;
if(_40.type.toUpperCase()!=="CONFIRM"){
ColdFusion.handleError(null,"messagebox.update.invalidtypeandbuttontypecombination","widget",[_3e],null,null,true);
return;
}else{
if(buttonType.toUpperCase()!="YESNO"&&buttonType.toUpperCase()!="YESNOCANCEL"){
ColdFusion.handleError(null,"messagebox.update.invalidbuttontype","widget",[_3e],null,null,true);
return;
}
}
_41.buttonType=_3f.buttontype;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidbuttontype","widget",[_3e],null,null,true);
return;
}
}
for(key in _41){
_40[key]=_41[key];
}
ColdFusion.Log.info("messagebox.update.updated","messagebox",[_3e]);
};
$MB.getMessageBoxObject=function(_42){
var _43=ColdFusion.objectCache[_42];
if(_43==null||typeof (_43)=="undefined"){
ColdFusion.handleError(null,"messagebox.getmessageboxobject.missingmessageboxid","widget",[_42],null,null,true);
}
return _43;
};
$MB.isMessageBoxDefined=function(_44){
var _45=ColdFusion.objectCache[_44];
if(_45==null||typeof (_45)=="undefined"){
return false;
}else{
return true;
}
};
$MB.beforeShowHandler=function(_46){
var _47=$MB.getMessageBoxObject(CURRENT_MESSAGEBOX_ID);
var _48=_47.x;
var _49=_47.y;
var _4a=_47.bodyStyle;
var _4b=_46.body.parent();
var id=_4b.id;
var ele=document.getElementById(id);
if(null!=_4a){
ele.style.cssText=_4a;
}
if(_48&&_49&&typeof _48=="number"&&typeof _49=="number"&&_48>=0&&_49>=0){
_46.setPosition(_48,_49);
}else{
_46.center();
}
};
