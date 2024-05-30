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
var _612=Math.ceil(n/12);
var _613=(n%12)?12-n%12:0;
this.setFullYear(this.getFullYear()-_612);
return set_month.call(this,_613);
}else{
return set_month.apply(this,arguments);
}
};
}
if(!String.escape){
String.escape=function(_614){
return _614.replace(/('|\\)/g,"\\$1");
};
}
ColdFusion.Calendar.setUpCalendar=function(_615,mask,_617,_618,_619,_61a,_61b){
var _61c=ColdFusion.DOM.getElement(_615+_61a+"_cf_button",_61a);
var _61d=ColdFusion.DOM.getElement(_615,_61a);
var _61e=null;
var _61f=null;
if(_61d.value!=""){
_61e=_61d.value;
_61f=_61e.split("/");
}
var _620=_615+"_cf_calendar"+ColdFusion.Calendar.calTableIdCounter;
ColdFusion.Calendar.calTableIdCounter++;
var _621=ColdFusion.DOM.getElement(_615+_61a+"_cf_container",_61a);
var _622=_61d.offsetLeft;
ColdFusion.DOM.getElement(_615+_61a+"_cf_container",_61a).style.left=_622;
YAHOO.widget.Calendar.IMG_ROOT=_cf_ajaxscriptsrc+"/resources/yui/";
var _623;
if(_61f&&_61f[0]&&_61f[2]){
_623=new YAHOO.widget.Calendar(_620,_615+_61a+"_cf_container",{close:true,pagedate:_61f[0]+"/"+_61f[2]});
}else{
_623=new YAHOO.widget.Calendar(_620,_615+_61a+"_cf_container",{close:true});
}
_623.calendarinputid=_615;
_623.calendarinput=_61d;
_623.mask=mask;
_623.formname=_61a;
_623.cfg.setProperty("MONTHS_LONG",_619);
_623.cfg.setProperty("WEEKDAYS_SHORT",_618);
_623.cfg.setProperty("START_WEEKDAY",_617);
ColdFusion.objectCache[_620+_61a]=_623;
_623.select(_61e);
_623.render();
_623.hide();
_623.selectEvent.subscribe(ColdFusion.Calendar.handleDateSelect,_623,true);
YAHOO.util.Event.addListener(_615+_61a+"_cf_button","click",ColdFusion.Calendar.handleCalendarLinkClick,_623,true);
if(_61b!=null){
var year=_61b.year;
var _625=_61b.month;
var day=_61b.day;
var _627=new Date(year,_625.valueOf()-1,day);
_61d.value=ColdFusion.Calendar.createFormattedOutput(_615,mask,year,_625,day,_627);
}
};
ColdFusion.Calendar.openedCalendarInstance=null;
ColdFusion.Calendar.handleCalendarLinkClick=function(type,args){
var _62a=args;
if(ColdFusion.Calendar.openedCalendarInstance){
ColdFusion.Calendar.openedCalendarInstance.hide();
}
if(!_62a.extMask){
var _62b=ColdFusion.Calendar.convertToExtMask(_62a.mask);
_62a.extMask=_62b;
}
var _62c=ColdFusion.DOM.getElement(args.calendarinputid,_62a.formname).value;
var _62d=null;
if(typeof (_62c)!="undefined"&&ColdFusion.trim(_62c)!=""){
_62d=Ext.Date.parse(_62c,_62a.extMask);
}
if(_62d!=null){
_62a.setMonth(_62d.getMonth());
_62a.setYear(_62d.getFullYear());
_62a.select(_62d);
_62a.render();
}
ColdFusion.Calendar.openedCalendarInstance=_62a;
_62a.show();
};
ColdFusion.Calendar.handleDateSelect=function(type,args,_630){
var _631=args[0];
var date=_631[0];
var year=date[0],month=date[1],day=date[2];
var _634=new Date(year,month.valueOf()-1,day);
var _635=_630.calendarinput.value;
_630.calendarinput.value=ColdFusion.Calendar.createFormattedOutput(_630.calendarinputid,_630.mask,year,month,day,_634);
ColdFusion.Event.callBindHandlers(_630.calendarinputid,null,"change");
_630.hide();
var node=document.getElementById(_630.calendarinputid);
if(node){
if(node.onchange){
if(node.value!=_635){
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
ColdFusion.Calendar.createFormattedOutput=function(_638,mask,year,_63b,day,date){
mask=mask.toUpperCase();
year=new String(year);
_63b=new String(_63b);
day=new String(day);
var _63e=date.getDay();
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
_63b=ColdFusion.Calendar.monthNamesLong[_63b.valueOf()-1];
mask=mask.replace(/MMMM/g,_63b);
}else{
if(mask.indexOf("MMM")!=-1){
_63b=ColdFusion.Calendar.monthNamesShort[_63b.valueOf()-1];
mask=mask.replace(/MMM/g,_63b);
}else{
if(mask.indexOf("MM")!=-1){
if(_63b.length==1){
_63b="0"+_63b;
}
mask=mask.replace(/MM/g,_63b);
}else{
if(mask.indexOf("M")!=-1){
if(_63b.length!=-1&&_63b.charAt(0)=="0"){
_63b=_63b.charAt(1);
}
mask=mask.replace(/M/g,_63b);
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
_63e=ColdFusion.Calendar.dayNamesLong[_63e.valueOf()];
mask=mask.replace(/EEEE/g,_63e);
}
if(mask.indexOf("EEE")!=-1){
_63e=ColdFusion.Calendar.dayNamesShort[_63e.valueOf()];
mask=mask.replace(/EEE/g,_63e);
}
if(mask.indexOf("E")!=-1){
_63e=_63e.valueOf();
_63e=new String(_63e);
if(_63e.length!=-1&&_63e.charAt(0)=="0"&&_63e.charAt(1)){
_63e=_63e.charAt(1);
}
mask=mask.replace(/E/g,_63e);
}
return mask;
};
