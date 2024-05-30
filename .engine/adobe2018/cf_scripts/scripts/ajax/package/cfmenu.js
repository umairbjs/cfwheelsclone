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
ColdFusion.Menu.menuItemMouseOver=function(id,_2){
var _3=document.getElementById(id);
_3.tempfontcolor=_3.firstChild.style.color;
if(_2){
_3.firstChild.style.color=_2;
}
};
ColdFusion.Menu.menuItemMouseOut=function(id){
var _5=document.getElementById(id);
if(_5.tempfontcolor){
_5.firstChild.style.color=_5.tempfontcolor;
}else{
_5.firstChild.style.color="black";
}
};
ColdFusion.Menu.initMenu=function(_6,_7){
return new YAHOO.widget.Menu(_6,_7);
};
ColdFusion.Menu.initMenuBar=function(_8,_9){
return new YAHOO.widget.MenuBar(_8,_9);
};
