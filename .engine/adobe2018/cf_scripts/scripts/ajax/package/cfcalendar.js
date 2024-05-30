/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Calendar){
ColdFusion.Calendar={};
}
ColdFusion.Calendar.monthNamesShort=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
ColdFusion.Calendar.monthNamesLong=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
ColdFusion.Calendar.dayNamesShort=new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
ColdFusion.Calendar.dayNamesLong=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
ColdFusion.Calendar.calTableIdCounter=0;
if(navigator.userAgent.toLowerCase().indexOf("safari")>-1){
var set_month=Date.prototype.setMonth;
Date.prototype.setMonth=function(num){
if(num<=-1){
var n=Math.ceil(-num);
var _8b9=Math.ceil(n/12);
var _8ba=(n%12)?12-n%12:0;
this.setFullYear(this.getFullYear()-_8b9);
return set_month.call(this,_8ba);
}else{
return set_month.apply(this,arguments);
}
};
}
if(!String.escape){
String.escape=function(_8bb){
return _8bb.replace(/('|\\)/g,"\\$1");
};
}
ColdFusion.Calendar.setUpCalendar=function(_8bc,mask,_8be,_8bf,_8c0,_8c1,_8c2){
var _8c3=ColdFusion.DOM.getElement(_8bc+_8c1+"_cf_button",_8c1);
var _8c4=ColdFusion.DOM.getElement(_8bc,_8c1);
var _8c5=null;
var _8c6=null;
if(_8c4.value!=""){
_8c5=_8c4.value;
_8c6=_8c5.split("/");
}
var _8c7=_8bc+"_cf_calendar"+ColdFusion.Calendar.calTableIdCounter;
ColdFusion.Calendar.calTableIdCounter++;
var _8c8=ColdFusion.DOM.getElement(_8bc+_8c1+"_cf_container",_8c1);
var _8c9=_8c4.offsetLeft;
ColdFusion.DOM.getElement(_8bc+_8c1+"_cf_container",_8c1).style.left=_8c9;
YAHOO.widget.Calendar.IMG_ROOT=_cf_ajaxscriptsrc+"/resources/yui/";
var _8ca;
if(_8c6&&_8c6[0]&&_8c6[2]){
_8ca=new YAHOO.widget.Calendar(_8c7,_8bc+_8c1+"_cf_container",{close:true,pagedate:_8c6[0]+"/"+_8c6[2]});
}else{
_8ca=new YAHOO.widget.Calendar(_8c7,_8bc+_8c1+"_cf_container",{close:true});
}
_8ca.calendarinputid=_8bc;
_8ca.calendarinput=_8c4;
_8ca.mask=mask;
_8ca.formname=_8c1;
_8ca.cfg.setProperty("MONTHS_LONG",_8c0);
_8ca.cfg.setProperty("WEEKDAYS_SHORT",_8bf);
_8ca.cfg.setProperty("START_WEEKDAY",_8be);
ColdFusion.objectCache[_8c7+_8c1]=_8ca;
_8ca.select(_8c5);
_8ca.render();
_8ca.hide();
_8ca.selectEvent.subscribe(ColdFusion.Calendar.handleDateSelect,_8ca,true);
YAHOO.util.Event.addListener(_8bc+_8c1+"_cf_button","click",ColdFusion.Calendar.handleCalendarLinkClick,_8ca,true);
if(_8c2!=null){
var year=_8c2.year;
var _8cc=_8c2.month;
var day=_8c2.day;
var _8ce=new Date(year,_8cc.valueOf()-1,day);
_8c4.value=ColdFusion.Calendar.createFormattedOutput(_8bc,mask,year,_8cc,day,_8ce);
}
};
ColdFusion.Calendar.openedCalendarInstance=null;
ColdFusion.Calendar.handleCalendarLinkClick=function(type,args){
var _8d1=args;
if(ColdFusion.Calendar.openedCalendarInstance){
ColdFusion.Calendar.openedCalendarInstance.hide();
}
if(!_8d1.extMask){
var _8d2=ColdFusion.Calendar.convertToExtMask(_8d1.mask);
_8d1.extMask=_8d2;
}
var _8d3=ColdFusion.DOM.getElement(args.calendarinputid,_8d1.formname).value;
var _8d4=null;
if(typeof (_8d3)!="undefined"&&ColdFusion.trim(_8d3)!=""){
_8d4=Ext.Date.parse(_8d3,_8d1.extMask);
}
if(_8d4!=null){
_8d1.setMonth(_8d4.getMonth());
_8d1.setYear(_8d4.getFullYear());
_8d1.select(_8d4);
_8d1.render();
}
ColdFusion.Calendar.openedCalendarInstance=_8d1;
_8d1.show();
};
ColdFusion.Calendar.handleDateSelect=function(type,args,_8d7){
var _8d8=args[0];
var date=_8d8[0];
var year=date[0],month=date[1],day=date[2];
var _8db=new Date(year,month.valueOf()-1,day);
var _8dc=_8d7.calendarinput.value;
_8d7.calendarinput.value=ColdFusion.Calendar.createFormattedOutput(_8d7.calendarinputid,_8d7.mask,year,month,day,_8db);
ColdFusion.Event.callBindHandlers(_8d7.calendarinputid,null,"change");
_8d7.hide();
var node=document.getElementById(_8d7.calendarinputid);
if(node){
if(node.onchange){
if(node.value!=_8dc){
node.onchange();
}
}
}
};
ColdFusion.Calendar.convertToExtMask=function(mask){
mask=mask.toUpperCase();
if(mask.indexOf("DD")!=-1){
mask=mask.replace(/DD/g,"d");
}
if(mask.indexOf("D")!=-1){
mask=mask.replace(/D/g,"d");
}
if(mask.indexOf("MMMM")!=-1){
mask=mask.replace(/MMMM/g,"F");
}else{
if(mask.indexOf("MMM")!=-1){
mask=mask.replace(/MMM/g,"M");
}else{
if(mask.indexOf("MM")!=-1){
mask=mask.replace(/MM/g,"m");
}else{
if(mask.indexOf("M")!=-1){
mask=mask.replace(/M/g,"m");
}
}
}
}
if(mask.indexOf("YYYY")!=-1){
mask=mask.replace(/YYYY/g,"Y");
}
if(mask.indexOf("YY")!=-1){
mask=mask.replace(/YY/g,"y");
}
if(mask.indexOf("EEEE")!=-1){
mask=mask.replace(/EEEE/g,"l");
}
if(mask.indexOf("EEE")!=-1){
mask=mask.replace(/EEE/g,"D");
}
if(mask.indexOf("E")!=-1){
mask=mask.replace(/E/g,"w");
}
return mask;
};
ColdFusion.Calendar.createFormattedOutput=function(_8df,mask,year,_8e2,day,date){
mask=mask.toUpperCase();
year=new String(year);
_8e2=new String(_8e2);
day=new String(day);
var _8e5=date.getDay();
if(mask.indexOf("DD")!=-1){
if(day.length==1){
day="0"+day;
}
mask=mask.replace(/DD/g,day);
}
if(mask.indexOf("D"!=-1)){
if(day.length!=-1&&day.charAt(0)=="0"){
day=day.charAt(1);
}
mask=mask.replace(/D/g,day);
}
if(mask.indexOf("MMMM")!=-1){
_8e2=ColdFusion.Calendar.monthNamesLong[_8e2.valueOf()-1];
mask=mask.replace(/MMMM/g,_8e2);
}else{
if(mask.indexOf("MMM")!=-1){
_8e2=ColdFusion.Calendar.monthNamesShort[_8e2.valueOf()-1];
mask=mask.replace(/MMM/g,_8e2);
}else{
if(mask.indexOf("MM")!=-1){
if(_8e2.length==1){
_8e2="0"+_8e2;
}
mask=mask.replace(/MM/g,_8e2);
}else{
if(mask.indexOf("M")!=-1){
if(_8e2.length!=-1&&_8e2.charAt(0)=="0"){
_8e2=_8e2.charAt(1);
}
mask=mask.replace(/M/g,_8e2);
}
}
}
}
if(mask.indexOf("YYYY")!=-1){
mask=mask.replace(/YYYY/g,year);
}
if(mask.indexOf("YY")!=-1){
year=year.substring(2);
mask=mask.replace(/YY/g,year);
}
if(mask.indexOf("EEEE")!=-1){
_8e5=ColdFusion.Calendar.dayNamesLong[_8e5.valueOf()];
mask=mask.replace(/EEEE/g,_8e5);
}
if(mask.indexOf("EEE")!=-1){
_8e5=ColdFusion.Calendar.dayNamesShort[_8e5.valueOf()];
mask=mask.replace(/EEE/g,_8e5);
}
if(mask.indexOf("E")!=-1){
_8e5=_8e5.valueOf();
_8e5=new String(_8e5);
if(_8e5.length!=-1&&_8e5.charAt(0)=="0"&&_8e5.charAt(1)){
_8e5=_8e5.charAt(1);
}
mask=mask.replace(/E/g,_8e5);
}
return mask;
};
