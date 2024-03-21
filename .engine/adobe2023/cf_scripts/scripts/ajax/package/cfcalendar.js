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
var _624=Math.ceil(n/12);
var _625=(n%12)?12-n%12:0;
this.setFullYear(this.getFullYear()-_624);
return set_month.call(this,_625);
}else{
return set_month.apply(this,arguments);
}
};
}
if(!String.escape){
String.escape=function(_626){
return _626.replace(/('|\\)/g,"\\$1");
};
}
ColdFusion.Calendar.setUpCalendar=function(_627,mask,_629,_62a,_62b,_62c,_62d){
var _62e=ColdFusion.DOM.getElement(_627+_62c+"_cf_button",_62c);
var _62f=ColdFusion.DOM.getElement(_627,_62c);
var _630=null;
var _631=null;
if(_62f.value!=""){
_630=_62f.value;
_631=_630.split("/");
}
var _632=_627+"_cf_calendar"+ColdFusion.Calendar.calTableIdCounter;
ColdFusion.Calendar.calTableIdCounter++;
var _633=ColdFusion.DOM.getElement(_627+_62c+"_cf_container",_62c);
var _634=_62f.offsetLeft;
ColdFusion.DOM.getElement(_627+_62c+"_cf_container",_62c).style.left=_634;
YAHOO.widget.Calendar.IMG_ROOT=_cf_ajaxscriptsrc+"/resources/yui/";
var _635;
if(_631&&_631[0]&&_631[2]){
_635=new YAHOO.widget.Calendar(_632,_627+_62c+"_cf_container",{close:true,pagedate:_631[0]+"/"+_631[2]});
}else{
_635=new YAHOO.widget.Calendar(_632,_627+_62c+"_cf_container",{close:true});
}
_635.calendarinputid=_627;
_635.calendarinput=_62f;
_635.mask=mask;
_635.formname=_62c;
_635.cfg.setProperty("MONTHS_LONG",_62b);
_635.cfg.setProperty("WEEKDAYS_SHORT",_62a);
_635.cfg.setProperty("START_WEEKDAY",_629);
ColdFusion.objectCache[_632+_62c]=_635;
_635.select(_630);
_635.render();
_635.hide();
_635.selectEvent.subscribe(ColdFusion.Calendar.handleDateSelect,_635,true);
YAHOO.util.Event.addListener(_627+_62c+"_cf_button","click",ColdFusion.Calendar.handleCalendarLinkClick,_635,true);
if(_62d!=null){
var year=_62d.year;
var _637=_62d.month;
var day=_62d.day;
var _639=new Date(year,_637.valueOf()-1,day);
_62f.value=ColdFusion.Calendar.createFormattedOutput(_627,mask,year,_637,day,_639);
}
};
ColdFusion.Calendar.openedCalendarInstance=null;
ColdFusion.Calendar.handleCalendarLinkClick=function(type,args){
var _63c=args;
if(ColdFusion.Calendar.openedCalendarInstance){
ColdFusion.Calendar.openedCalendarInstance.hide();
}
if(!_63c.extMask){
var _63d=ColdFusion.Calendar.convertToExtMask(_63c.mask);
_63c.extMask=_63d;
}
var _63e=ColdFusion.DOM.getElement(args.calendarinputid,_63c.formname).value;
var _63f=null;
if(typeof (_63e)!="undefined"&&ColdFusion.trim(_63e)!=""){
_63f=Ext.Date.parse(_63e,_63c.extMask);
}
if(_63f!=null){
_63c.setMonth(_63f.getMonth());
_63c.setYear(_63f.getFullYear());
_63c.select(_63f);
_63c.render();
}
ColdFusion.Calendar.openedCalendarInstance=_63c;
_63c.show();
};
ColdFusion.Calendar.handleDateSelect=function(type,args,_642){
var _643=args[0];
var date=_643[0];
var year=date[0],month=date[1],day=date[2];
var _646=new Date(year,month.valueOf()-1,day);
var _647=_642.calendarinput.value;
_642.calendarinput.value=ColdFusion.Calendar.createFormattedOutput(_642.calendarinputid,_642.mask,year,month,day,_646);
ColdFusion.Event.callBindHandlers(_642.calendarinputid,null,"change");
_642.hide();
var node=document.getElementById(_642.calendarinputid);
if(node){
if(node.onchange){
if(node.value!=_647){
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
ColdFusion.Calendar.createFormattedOutput=function(_64a,mask,year,_64d,day,date){
mask=mask.toUpperCase();
year=new String(year);
_64d=new String(_64d);
day=new String(day);
var _650=date.getDay();
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
_64d=ColdFusion.Calendar.monthNamesLong[_64d.valueOf()-1];
mask=mask.replace(/MMMM/g,_64d);
}else{
if(mask.indexOf("MMM")!=-1){
_64d=ColdFusion.Calendar.monthNamesShort[_64d.valueOf()-1];
mask=mask.replace(/MMM/g,_64d);
}else{
if(mask.indexOf("MM")!=-1){
if(_64d.length==1){
_64d="0"+_64d;
}
mask=mask.replace(/MM/g,_64d);
}else{
if(mask.indexOf("M")!=-1){
if(_64d.length!=-1&&_64d.charAt(0)=="0"){
_64d=_64d.charAt(1);
}
mask=mask.replace(/M/g,_64d);
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
_650=ColdFusion.Calendar.dayNamesLong[_650.valueOf()];
mask=mask.replace(/EEEE/g,_650);
}
if(mask.indexOf("EEE")!=-1){
_650=ColdFusion.Calendar.dayNamesShort[_650.valueOf()];
mask=mask.replace(/EEE/g,_650);
}
if(mask.indexOf("E")!=-1){
_650=_650.valueOf();
_650=new String(_650);
if(_650.length!=-1&&_650.charAt(0)=="0"&&_650.charAt(1)){
_650=_650.charAt(1);
}
mask=mask.replace(/E/g,_650);
}
return mask;
};
