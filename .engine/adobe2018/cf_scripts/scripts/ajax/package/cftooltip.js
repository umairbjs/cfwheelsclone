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
ColdFusion.Tooltip.setToolTipOut=function(_911,_912){
var _913=_912.tooltip;
_913.tooltipout=true;
};
ColdFusion.Tooltip.getToolTip=function(_914,_915){
var _916=ColdFusion.objectCache[_915.context];
if(!_916){
if(_915.style){
_915.styleObj=ColdFusion.Tooltip.parseStyle(_915.style);
}
_916=new YAHOO.widget.Tooltip(_915.context+"_cf_tooltip",_915);
ColdFusion.objectCache[_915.context]=_916;
_916.doShow(_914,_915.context);
if(_915._cf_url){
var _917=function(req,_919){
_919.tooltip.cfg.setProperty("text",req.responseText);
if(_919.tooltip.tooltipout==false){
_919.tooltip.doShow(_919.event,_919.id);
}
};
YAHOO.util.Event.addListener(_915.context,"mouseout",ColdFusion.Tooltip.setToolTipOut,{"tooltip":_916});
_916.cfg.setProperty("text",_cf_loadingtexthtml);
_916.doShow(_914,_915.context);
try{
ColdFusion.Log.info("tooltip.gettooltip.fetch","widget",[_915.context]);
ColdFusion.Ajax.sendMessage(_915._cf_url,"GET",_915._cf_query,true,_917,{tooltip:_916,event:_914,id:_915.context});
}
catch(e){
tooltipdiv=ColdFusion.DOM.getElement(_915.context);
tooltipdiv.innerHTML="";
ColdFusion.globalErrorHandler(null,e,tooltipdiv);
}
}
}
_916.tooltipout=false;
};
ColdFusion.Tooltip.parseStyle=function(_91a){
var _91b={};
if(_91a&&typeof _91a==="string"){
var _91c=_91a.split(";");
for(var i=0;i<_91c.length;i++){
var temp=_91c[i];
tempArray=temp.split(":");
if(tempArray.length===2){
var key=tempArray[0];
key=key.toLowerCase();
var _920=tempArray[1];
switch(key){
case "width":
_91b.width=_920;
break;
case "color":
_91b.color=_920;
break;
case "background-color":
_91b[key]=_920;
break;
case "padding":
_91b.padding=_920;
break;
default:
_91b[key]=_920;
}
}
}
}
return _91b;
};
