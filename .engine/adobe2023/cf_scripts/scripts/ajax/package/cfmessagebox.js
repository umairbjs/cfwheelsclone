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
ColdFusion.MessageBox.init=function(_66e,type,_670,_671,_672,_673,_674,_675,_676,_677,_678,icon,_67a,x,y,_67d,_67e){
var _67f={messageBoxId:_66e,type:type,callBack_Fn:_678,multiline:_676,modal:_677,width:_67a,bodyStyle:_67e};
if(_670==null||typeof (_670)=="undefined"){
_670="";
}
_670=ColdFusion.Util.replaceAll(_670,"\n","<br>");
_67f.messageText=_670;
if(_672!=null&&typeof (_672)!="undefined"){
_67f.label_OK=_672;
}
if(_673!=null&&typeof (_673)!="undefined"){
_67f.label_NO=_673;
}
if(_675!=null&&typeof (_675)!="undefined"){
_67f.label_YES=_675;
}
if(_674!=null&&typeof (_674)!="undefined"){
_67f.label_CANCEL=_674;
}
if(_671==null||typeof (_671)=="undefined"){
type=type.toLowerCase();
if(type=="alert"){
_671="Alert";
}else{
if(type=="confirm"){
_671="Confirm";
}else{
if(type=="prompt"){
_671="Prompt";
}
}
}
}
_67f.title=_671;
if(_67d&&typeof (_67d)=="string"){
_67f.buttonType=_67d;
}
if(icon&&typeof (icon)=="string"){
_67f.icon=icon;
}
if(typeof x=="number"&&x>=0){
_67f.x=x;
}
if(typeof y=="number"&&y>=0){
_67f.y=y;
}
ColdFusion.objectCache[_66e]=_67f;
};
$MB.show=function(_680){
var _681=$MB.getMessageBoxObject(_680);
var type=_681.type;
type=(new String(type)).toLowerCase();
if(!CF_BEFORE_SHOW_HANDLER_ADDED){
var _683=Ext.MessageBox;
_683.addListener("show",$MB.beforeShowHandler,_681);
CF_BEFORE_SHOW_HANDLER_ADDED=true;
}
CURRENT_MESSAGEBOX_ID=_680;
var _684=_681.buttonType;
var _685={ok:DEFAULT_OK,no:DEFAULT_NO,cancel:DEFAULT_CANCEL,yes:DEFAULT_YES};
if(_681.label_OK){
_685.ok=_681.label_OK;
}
if(_681.label_YES){
_685.yes=_681.label_YES;
}
if(_681.label_NO){
_685.no=_681.label_NO;
}
if(_681.label_CANCEL){
_685.cancel=_681.label_CANCEL;
}
Ext.MessageBox.buttonText=_685;
if(typeof _684!="undefined"){
_684=_684.toUpperCase();
if(_684&&_684!=="OKCANCEL"&&_684!=="OK"&&_684!=="YESNOCANCEL"&&_684!=="YESNO"){
ColdFusion.handleError(null,"messagebox.show.invalidbuttontype","widget",[messagebox,_684],null,null,true);
}
switch(_684){
case "OK":
_684=$XB.OK;
break;
case "OKCANCEL":
_684=$XB.OKCANCEL;
break;
case "YESNOCANCEL":
_684=$XB.YESNOCANCEL;
break;
case "YESNO":
_684=$XB.YESNO;
break;
}
}
var icon=_681.icon;
var _687="";
if(icon&&typeof (icon)==="string"){
icon=icon.toUpperCase();
switch(icon){
case "ERROR":
_687=$XB.ERROR;
break;
case "INFO":
_687=$XB.INFO;
break;
case "QUESTION":
_687=$XB.QUESTION;
break;
case "WARNING":
_687=$XB.WARNING;
break;
}
}
var _688={title:_681.title,msg:_681.messageText,fn:_681.callBack_Fn,modal:_681.modal,icon:_687,scope:null};
if(_681.width){
_688.width=_681.width;
if(_688.width>600){
_688.maxWidth=_688.width;
}
if(_688.width<100){
_688.minWidth=_688.width;
}
}
if(type==="alert"){
if(!_684){
_684=DEFAULT_ALERT_BUTTON_TYPE;
}
_688.buttons=_684;
$XB.show(_688);
}
if(type==="confirm"){
if(!_684){
_684=DEFAULT_CONFIRM_BUTTON_TYPE;
}
_688.buttons=_684;
$XB.show(_688);
}
if(type==="prompt"){
if(!_684){
_684=DEFAULT_PROMPT_BUTTON_TYPE;
}
_688.buttons=_684;
_688.prompt=true;
_688.multiline=_681.multiline;
_688.value="",$XB.show(_688);
}
ColdFusion.Log.info("messagebox.show.shown","widget",[_680]);
};
$MB.create=function(_689,type,_68b,_68c,_68d,_68e){
if(_689&&typeof _689!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidname","widget",null,null,null,true);
return;
}
if(!_689||ColdFusion.trim(_689)==""){
ColdFusion.handleError(null,"messagebox.create.invalidname","widget",null,null,null,true);
return;
}
var _68f=ColdFusion.objectCache[_689];
if(_68f!=null||typeof _68f!="undefined"){
ColdFusion.handleError(null,"messagebox.create.duplicatename","widget",[_689],null,null,true);
return;
}
if(_68c&&typeof _68c!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidmessage","widget",[_689],null,null,true);
return;
}
if(!_68c||ColdFusion.trim(_68c)==""){
ColdFusion.handleError(null,"messagebox.create.invalidmessage","widget",[_689],null,null,true);
return;
}
if(_68b&&typeof _68b!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidtitle","widget",[_689],null,null,true);
return;
}
if(type&&typeof type!="string"){
ColdFusion.handleError(null,"messagebox.create.invalidtype","widget",[_689],null,null,true);
return;
}
if(!type||ColdFusion.trim(type)==""){
ColdFusion.handleError(null,"messagebox.create.emptytype","widget",[_689],null,null,true);
return;
}
if(_68d&&typeof _68d!=="function"){
ColdFusion.handleError(null,"messagebox.create.invalidcallback","widget",[_689],null,null,true);
return;
}
var _690=DEFAULT_CANCEL;
var _691=DEFAULT_NO;
var _692=DEFAULT_OK;
var _693=DEFAULT_YES;
var _694=true;
var _695=null;
var _696=false;
var icon;
var _698;
var x;
var y;
var _69b;
if(_68e&&_68e.labelok){
_692=_68e.labelok;
}
if(_68e&&_68e.labelno){
_691=_68e.labelno;
}
if(_68e&&_68e.labelyes){
_693=_68e.labelyes;
}
if(_68e&&_68e.labelcancel){
_690=_68e.labelcancel;
}
if(_68e&&typeof _68e.multiline==="boolean"){
_696=_68e.multiline;
}
if(_68e&&typeof _68e.modal==="boolean"){
_694=_68e.modal;
}
if(_68e&&_68e.buttontype){
_695=_68e.buttontype;
if(type.toUpperCase()!=="CONFIRM"){
ColdFusion.handleError(null,"messagebox.create.invalidtypeandbuttontypecombination","widget",[_689],null,null,true);
}else{
if(_695.toUpperCase()!="YESNO"&&_695.toUpperCase()!="YESNOCANCEL"){
ColdFusion.handleError(null,"messagebox.create.invalidbuttontype","widget",[_689,_695],null,null,true);
}
}
}
if(_68e&&_68e.width){
_698=_68e.width;
if(_698&&typeof _698!="number"){
ColdFusion.handleError(null,"messagebox.create.widthnotnumeric","widget",[_689,_698],null,null,true);
}
}
if(_68e&&typeof _68e.x!="undefined "){
if(_68e.x&&typeof _68e.x!="number"){
ColdFusion.handleError(null,"messagebox.create.xnotnumeric","widget",[_689,_68e.x],null,null,true);
return;
}
x=_68e.x;
}
if(_68e&&typeof _68e.y!="undefined"){
if(_68e.y&&typeof _68e.y!="number"){
ColdFusion.handleError(null,"messagebox.create.ynotnumeric","widget",[_689,_68e.y],null,null,true);
return;
}
y=_68e.y;
}
if(_68e&&_68e.icon){
icon=_68e.icon;
if(icon){
icon=icon.toUpperCase();
if(icon!="ERROR"&&icon!="INFO"&&icon!="QUESTION"&&icon!="WARNING"){
ColdFusion.handleError(null,"messagebox.create.invalidicon","widget",[_689,icon],null,null,true);
}
}
}
if(_68e&&_68e.bodystyle){
_69b=_68e.bodystyle;
}
$MB.init(_689,type,_68c,_68b,_692,_691,_690,_693,_696,_694,_68d,icon,_698,x,y,_695,_69b);
ColdFusion.Log.info("messagebox.create.created","widget",[_689,type]);
};
$MB.updateMessage=function(_69c,_69d){
var _69e=$MB.getMessageBoxObject(_69c);
_69e.messageText=_69d;
ColdFusion.Log.info("messagebox.updatemessage.updated","widget",[_69c]);
};
$MB.updateTitle=function(_69f,_6a0){
var _6a1=$MB.getMessageBoxObject(_69f);
_6a1.title=_6a0;
ColdFusion.Log.info("messagebox.updatetitle.updated","widget",[_69f]);
};
$MB.update=function(_6a2,_6a3){
var _6a4=$MB.getMessageBoxObject(_6a2);
var _6a5={};
if(!_6a3||typeof _6a3!="object"){
ColdFusion.handleError(null,"messagebox.update.invalidconfigobject","widget",[_6a2],null,null,true);
return;
}
if(_6a3.name&&typeof _6a3.name=="string"){
ColdFusion.handleError(null,"messagebox.update.nameupdatenotallowed","widget",[_6a2],null,null,true);
return;
}
if(_6a3.type&&typeof _6a3.type=="string"){
ColdFusion.handleError(null,"messagebox.update.typeupdatenotallowed","widget",[_6a2],null,null,true);
return;
}
if(_6a3.message){
if(typeof _6a3.message==="string"||typeof _6a3.message=="object"){
_6a5.messageText=_6a3.message;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidmessage","widget",[_6a2],null,null,true);
return;
}
}
if(_6a3.title){
if(typeof _6a3.title==="string"||typeof _6a3.title=="object"){
_6a5.title=_6a3.title;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidtitle","widget",[_6a2],null,null,true);
return;
}
}
if(_6a3.labelok!=null||typeof _6a3.labelok!="undefined"){
if(typeof _6a3.labelok==="string"||typeof _6a3.labelok=="object"){
_6a5.label_OK=_6a3.labelok;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelok","widget",[_6a2],null,null,true);
return;
}
}
if(_6a3.labelno!=null||typeof _6a3.labelno!="undefined"){
if(typeof _6a3.labelno==="string"||typeof _6a3.labelno=="object"){
_6a5.label_NO=_6a3.labelno;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelno","widget",[_6a2],null,null,true);
return;
}
}
if(_6a3.labelyes!=null||typeof _6a3.labelyes!="undefined"){
if(typeof _6a3.labelyes==="string"||typeof _6a3.labelyes=="object"){
_6a5.label_YES=_6a3.labelyes;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelyes","widget",[_6a2],null,null,true);
return;
}
}
if(_6a3.labelcancel!=null||typeof _6a3.labelcancel!="undefined"){
if(typeof _6a3.labelcancel==="string"||typeof _6a3.labelcancel=="object"){
_6a5.label_CANCEL=_6a3.labelcancel;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidlabelcancel","widget",[_6a2],null,null,true);
return;
}
}
if(typeof _6a3.modal=="boolean"){
_6a5.modal=_6a3.modal;
}
if(typeof _6a3.multiline==="boolean"){
if(_6a4.type.toLowerCase()!="prompt"){
ColdFusion.handleError(null,"messagebox.update.invalidtypeformultiline","widget",[_6a2],null,null,true);
return;
}
_6a5.multiline=_6a3.multiline;
}
if(_6a3&&_6a3.width){
if(typeof _6a3.width==="number"||typeof _6a3.width=="object"){
_6a5.width=_6a3.width;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidwidth","widget",[_6a2],null,null,true);
return;
}
}
if(_6a3.icon!=null||typeof _6a3.icon!="undefined"){
if(typeof _6a3.icon==="string"){
icon=_6a3.icon.toUpperCase();
if(icon!="ERROR"&&icon!="INFO"&&icon!="QUESTION"&&icon!="WARNING"){
ColdFusion.handleError(null,"messagebox.update.invalidicon","widget",[_6a2],null,null,true);
return;
}
_6a5.icon=_6a3.icon;
}else{
if(typeof _6a3.icon=="object"&&_6a3.icon==null){
_6a5.icon=null;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidicon","widget",[_6a2],null,null,true);
return;
}
}
}
if(_6a3.callbackhandler!=null||typeof _6a3.callbackhandler!="undefined"){
if(typeof _6a3.callbackhandler==="function"||typeof _6a3.callbackhandler==="object"){
_6a5.callBack_Fn=_6a3.callbackhandler;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidcallbackhandler","widget",[_6a2],null,null,true);
return;
}
}
if(_6a3.x!=null||typeof _6a3.x!="undefined"){
if(typeof _6a3.x==="number"||typeof _6a3.x=="object"){
_6a5.x=_6a3.x;
}else{
ColdFusion.handleError(null,"messagebox.update.xnotnumeric","widget",[_6a2,_6a3.x],null,null,true);
return;
}
}
if(_6a3.y!=null||typeof _6a3.y!="undefined"){
if(typeof _6a3.y==="number"||typeof _6a3.y=="object"){
_6a5.y=_6a3.y;
}else{
ColdFusion.handleError(null,"messagebox.update.ynotnumeric","widget",[_6a2,_6a3.y],null,null,true);
return;
}
}
if(_6a3.bodystyle!=null||typeof _6a3.bodystyle!="undefined"){
if(typeof _6a3.bodystyle==="string"||typeof _6a3.bodystyle=="object"){
_6a5.bodyStyle=_6a3.bodystyle;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidbodystyle","widget",[_6a2],null,null,true);
return;
}
}
if(_6a3.buttontype!=null||typeof _6a3.buttontype!="undefined"){
if(typeof _6a3.buttontype==="string"||typeof _6a3.buttontype==="object"){
buttonType=_6a3.buttontype;
if(_6a4.type.toUpperCase()!=="CONFIRM"){
ColdFusion.handleError(null,"messagebox.update.invalidtypeandbuttontypecombination","widget",[_6a2],null,null,true);
return;
}else{
if(buttonType.toUpperCase()!="YESNO"&&buttonType.toUpperCase()!="YESNOCANCEL"){
ColdFusion.handleError(null,"messagebox.update.invalidbuttontype","widget",[_6a2],null,null,true);
return;
}
}
_6a5.buttonType=_6a3.buttontype;
}else{
ColdFusion.handleError(null,"messagebox.update.invalidbuttontype","widget",[_6a2],null,null,true);
return;
}
}
for(key in _6a5){
_6a4[key]=_6a5[key];
}
ColdFusion.Log.info("messagebox.update.updated","messagebox",[_6a2]);
};
$MB.getMessageBoxObject=function(_6a6){
var _6a7=ColdFusion.objectCache[_6a6];
if(_6a7==null||typeof (_6a7)=="undefined"){
ColdFusion.handleError(null,"messagebox.getmessageboxobject.missingmessageboxid","widget",[_6a6],null,null,true);
}
return _6a7;
};
$MB.isMessageBoxDefined=function(_6a8){
var _6a9=ColdFusion.objectCache[_6a8];
if(_6a9==null||typeof (_6a9)=="undefined"){
return false;
}else{
return true;
}
};
$MB.beforeShowHandler=function(_6aa){
var _6ab=$MB.getMessageBoxObject(CURRENT_MESSAGEBOX_ID);
var _6ac=_6ab.x;
var _6ad=_6ab.y;
var _6ae=_6ab.bodyStyle;
var _6af=_6aa.body.parent();
var id=_6af.id;
var ele=document.getElementById(id);
if(null!=_6ae){
ele.style.cssText=_6ae;
}
if(_6ac&&_6ad&&typeof _6ac=="number"&&typeof _6ad=="number"&&_6ac>=0&&_6ad>=0){
_6aa.setPosition(_6ac,_6ad);
}else{
_6aa.center();
}
};
