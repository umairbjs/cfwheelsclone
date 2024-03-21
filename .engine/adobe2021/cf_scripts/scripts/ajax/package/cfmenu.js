/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Menu){
ColdFusion.Menu={};
}
ColdFusion.Menu.menuItemMouseOver=function(id,_ff){
var _100=document.getElementById(id);
_100.tempfontcolor=_100.firstChild.style.color;
if(_ff){
_100.firstChild.style.color=_ff;
}
};
ColdFusion.Menu.menuItemMouseOut=function(id){
var _102=document.getElementById(id);
if(_102.tempfontcolor){
_102.firstChild.style.color=_102.tempfontcolor;
}else{
_102.firstChild.style.color="black";
}
};
ColdFusion.Menu.initMenu=function(_103,_104){
return new YAHOO.widget.Menu(_103,_104);
};
ColdFusion.Menu.initMenuBar=function(_105,_106){
return new YAHOO.widget.MenuBar(_105,_106);
};
