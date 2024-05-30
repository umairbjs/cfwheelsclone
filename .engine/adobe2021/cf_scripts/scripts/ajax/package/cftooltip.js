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
ColdFusion.Tooltip.setToolTipOut=function(_14b,_14c){
var _14d=_14c.tooltip;
_14d.tooltipout=true;
};
ColdFusion.Tooltip.getToolTip=function(_14e,_14f){
var _150=ColdFusion.objectCache[_14f.context];
if(!_150){
if(_14f.style){
_14f.styleObj=ColdFusion.Tooltip.parseStyle(_14f.style);
}
_150=new YAHOO.widget.Tooltip(_14f.context+"_cf_tooltip",_14f);
ColdFusion.objectCache[_14f.context]=_150;
_150.doShow(_14e,_14f.context);
if(_14f._cf_url){
var _151=function(req,_153){
_153.tooltip.cfg.setProperty("text",req.responseText);
if(_153.tooltip.tooltipout==false){
_153.tooltip.doShow(_153.event,_153.id);
}
};
YAHOO.util.Event.addListener(_14f.context,"mouseout",ColdFusion.Tooltip.setToolTipOut,{"tooltip":_150});
_150.cfg.setProperty("text",_cf_loadingtexthtml);
_150.doShow(_14e,_14f.context);
try{
ColdFusion.Log.info("tooltip.gettooltip.fetch","widget",[_14f.context]);
ColdFusion.Ajax.sendMessage(_14f._cf_url,"GET",_14f._cf_query,true,_151,{tooltip:_150,event:_14e,id:_14f.context});
}
catch(e){
tooltipdiv=ColdFusion.DOM.getElement(_14f.context);
tooltipdiv.innerHTML="";
ColdFusion.globalErrorHandler(null,e,tooltipdiv);
}
}
}
_150.tooltipout=false;
};
ColdFusion.Tooltip.parseStyle=function(_154){
var _155={};
if(_154&&typeof _154==="string"){
var _156=_154.split(";");
for(var i=0;i<_156.length;i++){
var temp=_156[i];
tempArray=temp.split(":");
if(tempArray.length===2){
var key=tempArray[0];
key=key.toLowerCase();
var _15a=tempArray[1];
switch(key){
case "width":
_155.width=_15a;
break;
case "color":
_155.color=_15a;
break;
case "background-color":
_155[key]=_15a;
break;
case "padding":
_155.padding=_15a;
break;
default:
_155[key]=_15a;
}
}
}
}
return _155;
};
