/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Tooltip){
ColdFusion.Tooltip={};
}
ColdFusion.Tooltip.setToolTipOut=function(_47a,_47b){
var _47c=_47b.tooltip;
_47c.tooltipout=true;
};
ColdFusion.Tooltip.getToolTip=function(_47d,_47e){
var _47f=ColdFusion.objectCache[_47e.context];
if(!_47f){
if(_47e.style){
_47e.styleObj=ColdFusion.Tooltip.parseStyle(_47e.style);
}
_47f=new YAHOO.widget.Tooltip(_47e.context+"_cf_tooltip",_47e);
ColdFusion.objectCache[_47e.context]=_47f;
_47f.doShow(_47d,_47e.context);
if(_47e._cf_url){
var _480=function(req,_482){
_482.tooltip.cfg.setProperty("text",req.responseText);
if(_482.tooltip.tooltipout==false){
_482.tooltip.doShow(_482.event,_482.id);
}
};
YAHOO.util.Event.addListener(_47e.context,"mouseout",ColdFusion.Tooltip.setToolTipOut,{"tooltip":_47f});
_47f.cfg.setProperty("text",_cf_loadingtexthtml);
_47f.doShow(_47d,_47e.context);
try{
ColdFusion.Log.info("tooltip.gettooltip.fetch","widget",[_47e.context]);
ColdFusion.Ajax.sendMessage(_47e._cf_url,"GET",_47e._cf_query,true,_480,{tooltip:_47f,event:_47d,id:_47e.context});
}
catch(e){
tooltipdiv=ColdFusion.DOM.getElement(_47e.context);
tooltipdiv.innerHTML="";
ColdFusion.globalErrorHandler(null,e,tooltipdiv);
}
}
}
_47f.tooltipout=false;
};
ColdFusion.Tooltip.parseStyle=function(_483){
var _484={};
if(_483&&typeof _483==="string"){
var _485=_483.split(";");
for(var i=0;i<_485.length;i++){
var temp=_485[i];
tempArray=temp.split(":");
if(tempArray.length===2){
var key=tempArray[0];
key=key.toLowerCase();
var _489=tempArray[1];
switch(key){
case "width":
_484.width=_489;
break;
case "color":
_484.color=_489;
break;
case "background-color":
_484[key]=_489;
break;
case "padding":
_484.padding=_489;
break;
default:
_484[key]=_489;
}
}
}
}
return _484;
};
