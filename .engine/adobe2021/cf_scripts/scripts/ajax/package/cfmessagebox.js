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
ColdFusion.MessageBox.init=function(_107,type,_109,_10a,_10b,_10c,_10d,_10e,_10f,_110,_111,icon,_113,x,y,_116,_117){
var _118={messageBoxId:_107,type:type,callBack_Fn:_111,multiline:_10f,modal:_110,width:_113,bodyStyle:_117};
if(_109==null||typeof (_109)=="undefined"){
_109="";
}
_109=ColdFusion.Util.replaceAll(_109,"\n","<br>");
_118.messageText=_109;
if(_10b!=null&&typeof (_10b)!="undefined"){
_118.label_OK=_10b;
}
if(_10c!=null&&typeof (_10c)!="undefined"){
_118.label_NO=_10c;
}
if(_10e!=null&&typeof (_10e)!="undefined"){
_118.label_YES=_10e;
}
if(_10d!=null&&typeof (_10d)!="undefined"){
_118.label_CANCEL=_10d;
}
if(_10a==null||typeof (_10a)=="undefined"){
type=type.toLowerCase();
if(type=="alert"){
_10a="Alert";
}else{
if(type=="confirm"){
_10a="Confirm";
}else{
if(type=="prompt"){
_10a="Prompt";
}
}
}
}
_118.title=_10a;
if(_116&&typeof (_116)=="string"){
_118.buttonType=_116;
}
if(icon&&typeof (icon)=="string"){
_118.icon=icon;
}
if(typeof x=="number"&&x>=0){
_118.x=x;
}
if(typeof y=="number"&&y>=0){
_118.y=y;
}
ColdFusion.objectCache[_107]=_118;
};
$MB.show=function(_119){
var _11a=$MB.getMessageBoxObject(_119);
var type=_11a.type;
type=(new String(type)).toLowerCase();
if(!CF_BEFORE_SHOW_HANDLER_ADDED){
var _11c=Ext.MessageBox;
_11c.addListener("show",$MB.beforeShowHandler,_11a);
CF_BEFORE_SHOW_HANDLER_ADDED=true;
}
CURRENT_MESSAGEBOX_ID=_119;
var _11d=_11a.buttonType;
var _11e={ok:DEFAULT_OK,no:DEFAULT_NO,cancel:DEFAULT_CANCEL,yes:DEFAULT_YES};
if(_11a.label_OK){
_11e.ok=_11a.label_OK;
}
if(_11a.label_YES){
_11e.yes=_11a.label_YES;
}
if(_11a.label_NO){
_11e.no=_11a.label_NO;
}
if(_11a.label_CANCEL){
_11e.cancel=_11a.label_CANCEL;
}
Ext.MessageBox.buttonText=_11e;
if(typeof _11d!="undefined"){
_11d=_11d.toUpperCase();
if(_11d&&_11d!=="OKCANCEL"&&_11d!=="OK"&&_11d!=="YESNOCANCEL"&&_11d!=="YESNO"){
ColdFusion.handleError(null,"messagebox.show.invalidbuttontype","widget",[messagebox,_11d],null,null,true);
}
switch(_11d){
case "OK":
_11d=$XB.OK;
break;
case "OKCANCEL":
_11d=$XB.OKCANCEL;
break;
case "YESNOCANCEL":
_11d=$XB.YESNOCANCEL;
break;
case "YESNO":
_11d=$XB.YESNO;
break;
}
}
var icon=_11a.icon;
var _120="";
if(icon&&typeof (icon)==="string"){
icon=icon.toUpperCase();
switch(icon){
case "ERROR":
_120=$XB.ERROR;
break;
case "INFO":
_120=$XB.INFO;
break;
case "QUESTION":
_120=$XB.QUESTION;
break;
case "WARNING":
_120=$XB.WARNING;
break;
}
}
var _121={title:_11a.title,msg:_11a.messageText,fn:_11a.callBack_Fn,modal:_11a.modal,icon:_120,scope:null};
if(_11a.width){
_121.width=_11a.width;
if(_121.width>600){
_121.maxWidth=_121.width;
}
if(_121.width<100){
_121.minWidth=_121.width;
}
}
if(type==="alert"){
if(!_11d){
_11d=DEFAULT_ALERT_BUTTON_TYPE;
}
_121.buttons=_11d;
$XB.show(_121);
}
if(type==="confirm"){
if(!_11d){
_11d=DEFAULT_CONFIRM_BUTTON_TYPE;
}
_121.buttons=_11d;
$XB.show(_121);
}
if(type==="prompt"){
if(!_11d){
_11d=DEFAULT_PROMPT_BUTTON_TYPE;
}
_121.buttons=_11d;
_121.prompt=true;
_121.multiline=_11a.multiline;
_121.value="",$XB.show(_121);
}
ColdFusion.Log.info("messagebox.show.shown","widget",[_119]);
};
$MB.create=function(_122,type,_124,_125,_126,_127){
if(_122&&typeof _122!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidname","widget",null,null,null,true);
return;
}
if(!_122||ColdFusion.trim(_122)==""){
ColdFusion.handleError(null,"messagebox.create.invalidname","widget",null,null,null,true);
return;
}
var _128=ColdFusion.objectCache[_122];
if(_128!=null||typeof _128!="undefined"){
ColdFusion.handleError(null,"messagebox.create.duplicatename","widget",[_122],null,null,true);
return;
}
if(_125&&typeof _125!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidmessage","widget",[_122],null,null,true);
return;
}
if(!_125||ColdFusion.trim(_125)==""){
ColdFusion.handleError(null,"messagebox.create.invalidmessage","widget",[_122],null,null,true);
return;
}
if(_124&&typeof _124!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidtitle","widget",[_122],null,null,true);
return;
}
if(type&&typeof type!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidtype","widget",[_122],null,null,true);
return;
}
if(!type||ColdFusion.trim(type)==""){
ColdFusion.handleError(null,"messagebox.create.emptytype","widget",[_122],null,null,true);
return;
}
if(_126&&typeof _126!=="function"){
ColdFusion.handleError(null,"messagebox.create.invalidcallback","widget",[_122],null,null,true);
return;
}
var _129=DEFAULT_CANCEL;
var _12a=DEFAULT_NO;
var _12b=DEFAULT_OK;
var _12c=DEFAULT_YES;
var _12d=true;
var _12e=null;
var _12f=false;
var icon;
var _131;
var x;
var y;
var _134;
if(_127&&_127.labelok){
_12b=_127.labelok;
}
if(_127&&_127.labelno){
_12a=_127.labelno;
}
if(_127&&_127.labelyes){
_12c=_127.labelyes;
}
if(_127&&_127.labelcancel){
_129=_127.labelcancel;
}
if(_127&&typeof _127.multiline==="boolean"){
_12f=_127.multiline;
}
if(_127&&typeof _127.modal==="boolean"){
_12d=_127.modal;
}
if(_127&&_127.buttontype){
_12e=_127.buttontype;
if(type.toUpperCase()!=="CONFIRM"){
ColdFusion.handleError(null,"messagebox.create.invalidtypeandbuttontypecombination","widget",[_122],null,null,true);
}else{
if(_12e.toUpperCase()!="YESNO"&&_12e.toUpperCase()!="YESNOCANCEL"){
ColdFusion.handleError(null,"messagebox.create.invalidbuttontype","widget",[_122,_12e],null,null,true);
}
}
}
if(_127&&_127.width){
_131=_127.width;
if(_131&&typeof _131!="number"){
ColdFusion.handleError(null,"messagebox.create.widthnotnumeric","widget",[_122,_131],null,null,true);
}
}
if(_127&&typeof _127.x!="undefined "){
if(_127.x&&typeof _127.x!="number"){
ColdFusion.handleError(null,"messagebox.create.xnotnumeric","widget",[_122,_127.x],null,null,true);
return;
}
x=_127.x;
}
if(_127&&typeof _127.y!="undefined"){
if(_127.y&&typeof _127.y!="number"){
ColdFusion.handleError(null,"messagebox.create.ynotnumeric","widget",[_122,_127.y],null,null,true);
return;
}
y=_127.y;
}
if(_127&&_127.icon){
icon=_127.icon;
if(icon){
icon=icon.toUpperCase();
if(icon!="ERROR"&&icon!="INFO"&&icon!="QUESTION"&&icon!="WARNING"){
ColdFusion.handleError(null,"messagebox.create.invalidicon","widget",[_122,icon],null,null,true);
}
}
}
if(_127&&_127.bodystyle){
_134=_127.bodystyle;
}
$MB.init(_122,type,_125,_124,_12b,_12a,_129,_12c,_12f,_12d,_126,icon,_131,x,y,_12e,_134);
ColdFusion.Log.info("messagebox.create.created","widget",[_122,type]);
};
$MB.updateMessage=function(_135,_136){
var _137=$MB.getMessageBoxObject(_135);
_137.messageText=_136;
ColdFusion.Log.info("messagebox.updatemessage.updated","widget",[_135]);
};
$MB.updateTitle=function(_138,_139){
var _13a=$MB.getMessageBoxObject(_138);
_13a.title=_139;
ColdFusion.Log.info("messagebox.updatetitle.updated","widget",[_138]);
};
$MB.update=function(_13b,_13c){
var _13d=$MB.getMessageBoxObject(_13b);
var _13e={};
if(!_13c||typeof _13c!="object"){
ColdFusion.handleError(null,"messagebox.update.invalidconfigobject","widget",[_13b],null,null,true);
return;
}
if(_13c.name&&typeof _13c.name=="string"){
ColdFusion.handleError(null,"messagebox.update.nameupdatenotallowed","widget",[_13b],null,null,true);
return;
}
if(_13c.type&&typeof _13c.type=="string"){
ColdFusion.handleError(null,"messagebox.update.typeupdatenotallowed","widget",[_13b],null,null,true);
return;
}
if(_13c.message){
if(typeof _13c.message==="string"||typeof _13c.message=="object"){
_13e.messageText=_13c.message;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidmessage","widget",[_13b],null,null,true);
return;
}
}
if(_13c.title){
if(typeof _13c.title==="string"||typeof _13c.title=="object"){
_13e.title=_13c.title;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidtitle","widget",[_13b],null,null,true);
return;
}
}
if(_13c.labelok!=null||typeof _13c.labelok!="undefined"){
if(typeof _13c.labelok==="string"||typeof _13c.labelok=="object"){
_13e.label_OK=_13c.labelok;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelok","widget",[_13b],null,null,true);
return;
}
}
if(_13c.labelno!=null||typeof _13c.labelno!="undefined"){
if(typeof _13c.labelno==="string"||typeof _13c.labelno=="object"){
_13e.label_NO=_13c.labelno;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelno","widget",[_13b],null,null,true);
return;
}
}
if(_13c.labelyes!=null||typeof _13c.labelyes!="undefined"){
if(typeof _13c.labelyes==="string"||typeof _13c.labelyes=="object"){
_13e.label_YES=_13c.labelyes;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelyes","widget",[_13b],null,null,true);
return;
}
}
if(_13c.labelcancel!=null||typeof _13c.labelcancel!="undefined"){
if(typeof _13c.labelcancel==="string"||typeof _13c.labelcancel=="object"){
_13e.label_CANCEL=_13c.labelcancel;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelcancel","widget",[_13b],null,null,true);
return;
}
}
if(typeof _13c.modal=="boolean"){
_13e.modal=_13c.modal;
}
if(typeof _13c.multiline==="boolean"){
if(_13d.type.toLowerCase()!="prompt"){
ColdFusion.handleError(null,"messagebox.update.invalidtypeformultiline","widget",[_13b],null,null,true);
return;
}
_13e.multiline=_13c.multiline;
}
if(_13c&&_13c.width){
if(typeof _13c.width==="number"||typeof _13c.width=="object"){
_13e.width=_13c.width;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidwidth","widget",[_13b],null,null,true);
return;
}
}
if(_13c.icon!=null||typeof _13c.icon!="undefined"){
if(typeof _13c.icon==="string"){
icon=_13c.icon.toUpperCase();
if(icon!="ERROR"&&icon!="INFO"&&icon!="QUESTION"&&icon!="WARNING"){
ColdFusion.handleError(null,"messagebox.update.invalidicon","widget",[_13b],null,null,true);
return;
}
_13e.icon=_13c.icon;
}else{
if(typeof _13c.icon=="object"&&_13c.icon==null){
_13e.icon=null;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidicon","widget",[_13b],null,null,true);
return;
}
}
}
if(_13c.callbackhandler!=null||typeof _13c.callbackhandler!="undefined"){
if(typeof _13c.callbackhandler==="function"||typeof _13c.callbackhandler==="object"){
_13e.callBack_Fn=_13c.callbackhandler;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidcallbackhandler","widget",[_13b],null,null,true);
return;
}
}
if(_13c.x!=null||typeof _13c.x!="undefined"){
if(typeof _13c.x==="number"||typeof _13c.x=="object"){
_13e.x=_13c.x;
}else{
ColdFusion.handleError(null,"messagebox.update.xnotnumeric","widget",[_13b,_13c.x],null,null,true);
return;
}
}
if(_13c.y!=null||typeof _13c.y!="undefined"){
if(typeof _13c.y==="number"||typeof _13c.y=="object"){
_13e.y=_13c.y;
}else{
ColdFusion.handleError(null,"messagebox.update.ynotnumeric","widget",[_13b,_13c.y],null,null,true);
return;
}
}
if(_13c.bodystyle!=null||typeof _13c.bodystyle!="undefined"){
if(typeof _13c.bodystyle==="string"||typeof _13c.bodystyle=="object"){
_13e.bodyStyle=_13c.bodystyle;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidbodystyle","widget",[_13b],null,null,true);
return;
}
}
if(_13c.buttontype!=null||typeof _13c.buttontype!="undefined"){
if(typeof _13c.buttontype==="string"||typeof _13c.buttontype==="object"){
buttonType=_13c.buttontype;
if(_13d.type.toUpperCase()!=="CONFIRM"){
ColdFusion.handleError(null,"messagebox.update.invalidtypeandbuttontypecombination","widget",[_13b],null,null,true);
return;
}else{
if(buttonType.toUpperCase()!="YESNO"&&buttonType.toUpperCase()!="YESNOCANCEL"){
ColdFusion.handleError(null,"messagebox.update.invalidbuttontype","widget",[_13b],null,null,true);
return;
}
}
_13e.buttonType=_13c.buttontype;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidbuttontype","widget",[_13b],null,null,true);
return;
}
}
for(key in _13e){
_13d[key]=_13e[key];
}
ColdFusion.Log.info("messagebox.update.updated","messagebox",[_13b]);
};
$MB.getMessageBoxObject=function(_13f){
var _140=ColdFusion.objectCache[_13f];
if(_140==null||typeof (_140)=="undefined"){
ColdFusion.handleError(null,"messagebox.getmessageboxobject.missingmessageboxid","widget",[_13f],null,null,true);
}
return _140;
};
$MB.isMessageBoxDefined=function(_141){
var _142=ColdFusion.objectCache[_141];
if(_142==null||typeof (_142)=="undefined"){
return false;
}else{
return true;
}
};
$MB.beforeShowHandler=function(_143){
var _144=$MB.getMessageBoxObject(CURRENT_MESSAGEBOX_ID);
var _145=_144.x;
var _146=_144.y;
var _147=_144.bodyStyle;
var _148=_143.body.parent();
var id=_148.id;
var ele=document.getElementById(id);
if(null!=_147){
ele.style.cssText=_147;
}
if(_145&&_146&&typeof _145=="number"&&typeof _146=="number"&&_145>=0&&_146>=0){
_143.setPosition(_145,_146);
}else{
_143.center();
}
};
