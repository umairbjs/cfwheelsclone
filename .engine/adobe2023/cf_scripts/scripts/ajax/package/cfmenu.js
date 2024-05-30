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
ColdFusion.Menu.menuItemMouseOver=function(id,_6ea){
var _6eb=document.getElementById(id);
_6eb.tempfontcolor=_6eb.firstChild.style.color;
if(_6ea){
_6eb.firstChild.style.color=_6ea;
}
};
ColdFusion.Menu.menuItemMouseOut=function(id){
var _6ed=document.getElementById(id);
if(_6ed.tempfontcolor){
_6ed.firstChild.style.color=_6ed.tempfontcolor;
}else{
_6ed.firstChild.style.color="black";
}
};
ColdFusion.Menu.initMenu=function(_6ee,_6ef){
return new YAHOO.widget.Menu(_6ee,_6ef);
};
ColdFusion.Menu.initMenuBar=function(_6f0,_6f1){
return new YAHOO.widget.MenuBar(_6f0,_6f1);
};
