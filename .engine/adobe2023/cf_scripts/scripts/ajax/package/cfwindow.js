/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Window){
ColdFusion.Window={};
}
ColdFusion.Window.windowIdCounter=1;
ColdFusion.Window.TITLE_BGCOLOR_TEMPLATE="WINDOW_DIV_ID .x-window-tc , WINDOW_DIV_ID .x-window-tl, WINDOW_DIV_ID .x-window-tr, WINDOW_DIV_ID .x-window-bc, WINDOW_DIV_ID .x-window-br, WINDOW_DIV_ID"+" .x-window-bl, WINDOW_DIV_ID  .x-window-ml, WINDOW_DIV_ID .x-window-mr { background-image: none; background-color: COLOR_ID; }";
ColdFusion.Window.create=function(_5ca,_5cb,url,_5cd){
if(_5ca==null){
ColdFusion.handleError(null,"window.create.nullname","widget",null,null,null,true);
return;
}
if(_5ca==""){
ColdFusion.handleError(null,"window.create.emptyname","widget",null,null,null,true);
return;
}
var _5ce=ColdFusion.objectCache[_5ca];
var _5cf=false;
if(typeof (_5ce)!="undefined"&&_5ce!=null){
if(_5ce.callfromtag){
ColdFusion.handleError(null,"window.create.duplicatename","widget",[_5ca]);
}
if(typeof (_5ce.isConfObj)!="undefined"&&_5ce.isConfObj==true){
_5cf=true;
if(_5cd!=null&&typeof (_5cd.initshow)!="undefined"){
if(_5cd.initshow==false){
return;
}
}
}else{
if(!_5cd||(_5cd&&_5cd.initshow!==false)){
ColdFusion.Window.show(_5ca);
}
return;
}
}
if(!_5ce){
ColdFusion.Log.info("window.create.creating","widget",[_5ca]);
}
var _5d0=ColdFusion.Window.createHTML(_5ca,_5cb,url,_5cd,_5cf);
var _5d1=ColdFusion.objectCache[_5ca];
if(_5d1!=null&&typeof (_5d1.isConfObj)!="undefined"&&_5d1.isConfObj==true){
return;
}
return ColdFusion.Window.createJSObj(_5ca,url,_5d0);
};
ColdFusion.Window.createHTML=function(_5d2,_5d3,url,_5d5,_5d6){
var _5d7=null;
var _5d8=null;
if(_5d5&&_5d5.divid){
_5d7=document.getElementById(_5d5.divid);
}
if(_5d7==null){
_5d7=document.createElement("div");
_5d8="cf_window"+ColdFusion.Window.windowIdCounter;
ColdFusion.Window.windowIdCounter++;
_5d7.id=_5d8;
_5d7.className="x-hidden";
}
var _5d9=false;
var _5da=null;
if(_5d5!=null&&typeof (_5d5.headerstyle)!="undefined"&&_5d5.headerstyle!=null){
var _5db=new String(_5d5.headerstyle);
_5db=_5db.toLowerCase();
var _5dc=_5db.indexOf("background-color");
if(_5dc>=0){
_5d9=true;
var _5dd=_5db.indexOf(";",_5dc+17);
if(_5dd<0){
_5dd=_5db.length;
}
_5da=_5db.substring(_5dc+17,_5dd);
}
}
var _5de=document.getElementById(_5d2+"_title-html");
if(_5d9==true&&_5da){
var _5df="#"+_5d5.divid;
var _5e0="NAME_ID .x-window-tc , NAME_ID .x-window-tl, NAME_ID .x-window-tr, NAME_ID .x-window-bc, NAME_ID .x-window-br, NAME_ID .x-window-bl,NAME_ID .x-window-ml, NAME_ID .x-window-mr { background-image: none; background-color: COLOR_ID; }";
var _5e1=ColdFusion.Util.replaceAll(ColdFusion.Window.TITLE_BGCOLOR_TEMPLATE,"WINDOW_DIV_ID",_5df);
var _5e1=ColdFusion.Util.replaceAll(_5e1,"COLOR_ID",_5da);
Ext.util.CSS.createStyleSheet(_5e1);
}
if(_5de==null){
_5de=document.createElement("div");
_5de.id=_5d2+"_title-html";
var _5e2="x-window-header";
_5de.className=_5e2;
if(_5d3){
_5de.innerHTML=_5d3;
}else{
_5de.innerHTML="&nbsp;";
}
}
var _5e3=document.getElementById(_5d2+"-body");
if(_5e3==null){
_5e3=document.createElement("div");
_5e3.id=_5d2+"-body";
_5d7.appendChild(_5e3);
}
var _5e4;
_5e4=ColdFusion.Window.getUpdatedConfigObj(_5d5,_5d2);
if(_5d5){
_5e4.header={style:_5d5.headerstyle};
}
if(typeof (_5e4)=="undefined"){
_5d7.innerHTML="";
return;
}
if(_5d8){
_5e4.divid=_5d8;
}
_5e4.title=_5d3;
if(typeof (_5e4.initshow)!="undefined"&&_5e4.initshow===false){
_5e4.url=url;
ColdFusion.objectCache[_5d2]=_5e4;
ColdFusion.objectCache[_5d2+"-body"]=_5e4;
}
_5e4.items=[{html:_5d7.innerHTML}];
return _5e4;
};
ColdFusion.Window.createJSObj=function(_5e5,url,_5e7){
var _5e8;
var _5e9=false;
if(typeof (_5e7.childlayoutid)&&_5e7.childlayoutid!=null){
_5e9=true;
_5e7.layout="border";
_5e7.items=ColdFusion.objectCache[_5e7.childlayoutid];
}else{
var elem=document.getElementById(_5e5+"-body");
if(elem){
elem.parentNode.removeChild(elem);
}
_5e7.layout="fit";
}
if(typeof (_5e7.autoScroll)=="undefined"){
_5e7.autoScroll=true;
}
if(_5e7.onShow){
_5e7._cf_onShow=_5e7.onShow;
_5e7.onShow=null;
}
if(_5e7.onHide){
_5e7._cf_onHide=_5e7.onHide;
_5e7.onHide=null;
}
_5e8=new Ext.Window(_5e7);
_5e8.show();
_5e8.hide();
_5e8.cfwindowname=_5e5;
_5e8.tempx=_5e7.tempx;
_5e8.tempy=_5e7.tempy;
_5e8.divid=_5e7.divid;
if(typeof (_5e7.headerstyle)!="undefined"&&_5e7.headerstyle!=null){
var _5eb=document.getElementById(_5e5+"_title");
_5eb=_5eb||document.getElementById(_5e8.id+"_header_hd-textEl");
if(_5eb!=null){
_5eb.style.cssText="background:none;"+_5e7.headerstyle;
}
}
if(typeof (_5e7.bodystyle)!="undefined"&&_5e7.bodystyle!=null){
var _5ec=document.getElementById(_5e5+"-body");
if(_5ec){
var _5ed=_5ec.parentNode;
}
if(_5ed!=null){
_5ed.style.cssText=_5e7.bodystyle;
}
}
_5e8.isConfObj=false;
_5e8._cf_body=_5e5+"-body";
ColdFusion.objectCache[_5e5]=_5e8;
if(_5e9){
var _5ee=_5e8.getLayout();
var _5ef=ColdFusion.objectCache[_5e7.childlayoutid];
}
_5e8.addListener("beforeclose",ColdFusion.Window.beforeCloseHandler);
var _5f0=null;
if(typeof (url)!="undefined"&&url!=""){
_5f0=url;
}
if(_5f0==null){
if(typeof (_5e7.initshow)=="undefined"||_5e7.initshow==true){
_5e8.addListener("beforeshow",ColdFusion.Window.beforeShowHandler);
ColdFusion.Window.showandhide(_5e8,_5e7);
}
return;
}
ColdFusion.objectCache[_5e5+"-body"]=_5e8;
if(typeof (_5e7.callfromtag)=="undefined"){
var _5f1;
var _5f2;
_5e8._cf_visible=false;
_5e8._cf_dirtyview=true;
_5e8.addListener("show",ColdFusion.Window.showHandler);
_5e8.addListener("hide",ColdFusion.Window.hideHandler);
_5e8.url=_5f0;
if(_5e7){
if(typeof (_5e7.initshow)=="undefined"||_5e7.initshow==true){
ColdFusion.Window.showandhide(_5e8,_5e7);
}
_5f1=_5e7.callbackHandler;
_5f2=_5e7.errorHandler;
}
}else{
_5e8.callfromtag=true;
_5e8._cf_visible=false;
_5e8._cf_dirtyview=true;
_5e8.addListener("show",ColdFusion.Window.showHandler);
_5e8.addListener("beforeshow",ColdFusion.Window.beforeShowHandler);
_5e8.addListener("hide",ColdFusion.Window.hideHandler);
if(typeof (_5e7.initshow)=="undefined"||_5e7.initshow==true){
ColdFusion.Window.showandhide(_5e8,_5e7);
}
}
var body=document.getElementById(_5e5+"-body");
if(body){
body.style.width="100%";
body.style.height="100%";
}
var _5f4=body.parentNode.parentNode.parentNode;
if(_5f4){
_5f4.style.overflow="auto";
}
var _5f5=document.getElementsByClassName("x-window-bodywrap");
if(typeof (_5f5)!="undefined"){
for(var i=0;i<_5f5.length;i++){
var elem=_5f5[i].firstChild;
elem.style.overflow="hidden";
}
}
};
ColdFusion.Window.showandhide=function(_5f7,_5f8){
if(typeof (_5f8.tempinitshow)!="undefined"&&_5f8.tempinitshow==false){
var _5f9=Ext.Element.get(_5f7.divid);
if(typeof _5f9!="undefined"&&_5f9){
_5f9.show();
_5f9.hide();
}
}else{
if(_5f7){
_5f7.show();
}
}
};
ColdFusion.Window.destroy=function(_5fa,_5fb){
if(_5fa){
var _5fc=ColdFusion.Window.getWindowObject(_5fa);
if(_5fc){
if(_5fb===true){
_5fc.destroy(true);
}else{
_5fc.destroy();
}
ColdFusion.objectCache[_5fa]=null;
}
}
};
ColdFusion.Window.resizeHandler=function(_5fd,_5fe,_5ff){
if(typeof (_5fd.fixedcenter)!="undefined"&&_5fd.fixedcenter==true){
_5fd.center();
}
};
ColdFusion.Window.beforeShowHandler=function(_600){
if(typeof (_600.fixedcenter)!="undefined"&&_600.fixedcenter==true){
_600.center();
}
};
ColdFusion.Window.beforeCloseHandler=function(_601){
if(_601.destroyonclose!="undefined"&&_601.destroyonclose==true){
ColdFusion.objectCache[_601.cfwindowname]=null;
return true;
}else{
_601.hide();
return false;
}
};
ColdFusion.Window.showHandler=function(_602){
_602._cf_visible=true;
if(_602._cf_dirtyview){
if(typeof (_602.callfromtag)=="undefined"){
ColdFusion.Ajax.replaceHTML(_602._cf_body,_602.url,"GET",null,_602.callbackHandler,_602.errorHandler);
}else{
var _603=ColdFusion.bindHandlerCache[_602._cf_body];
if(_603){
_603();
}
}
_602._cf_dirtyview=false;
}
};
ColdFusion.Window.hideHandler=function(_604){
_604._cf_visible=false;
if(_604._cf_refreshOnShow){
_604._cf_dirtyview=true;
}
};
ColdFusion.Window.xPosition=50;
ColdFusion.Window.yPosition=50;
ColdFusion.Window.resetHTML=function(_605){
var _606=document.getElementById(_605);
if(_606){
_606.innerHTML="";
}
};
ColdFusion.Window.getUpdatedConfigObj=function(_607,_608){
var _609={};
if(_607!=null){
if(typeof (_607)!="object"){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidconfig","widget",[_608],null,null,true);
return;
}
for(var key in _607){
if(key=="center"&&ColdFusion.Util.isBoolean(_607["center"])){
_609["fixedcenter"]=_607["center"];
}else{
_609[key]=_607[key];
}
}
}
if(typeof (_609.initshow)!="undefined"){
if(ColdFusion.Util.isBoolean(_609.initshow)==false){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidinitshow","widget",[_608],null,null,true);
return;
}else{
_609.initshow=ColdFusion.Util.castBoolean(_609.initshow);
_609._cf_visible=_609.initshow;
}
}
_609.tempcenter=null;
if(typeof (_609.fixedcenter)!="undefined"){
if(ColdFusion.Util.isBoolean(_609.fixedcenter)==false){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidcenter","widget",[_608],null,null,true);
return;
}else{
_609.fixedcenter=ColdFusion.Util.castBoolean(_609.fixedcenter);
}
}
if(typeof (_609.resizable)!="undefined"){
if(ColdFusion.Util.isBoolean(_609.resizable)==false){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidresizable","widget",[_608],null,null,true);
return;
}else{
_609.resizable=ColdFusion.Util.castBoolean(_609.resizable);
}
}
if(typeof (_609.draggable)!="undefined"){
if(ColdFusion.Util.isBoolean(_609.draggable)==false){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invaliddraggable","widget",[_608],null,null,true);
return;
}else{
_609.draggable=ColdFusion.Util.castBoolean(_609.draggable);
}
}
if(typeof (_609.closable)!="undefined"){
if(ColdFusion.Util.isBoolean(_609.closable)==false){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidclosable","widget",[_608],null,null,true);
return;
}else{
_609.closable=ColdFusion.Util.castBoolean(_609.closable);
}
}
if(typeof (_609.modal)!="undefined"){
if(ColdFusion.Util.isBoolean(_609.modal)==false){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidmodal","widget",[_608],null,null,true);
return;
}else{
_609.modal=ColdFusion.Util.castBoolean(_609.modal);
}
}
if(typeof (_609.refreshonshow)!="undefined"){
if(ColdFusion.Util.isBoolean(_609.refreshonshow)==false){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidrefreshonshow","widget",[_608],null,null,true);
return;
}else{
_609._cf_refreshOnShow=ColdFusion.Util.castBoolean(_609.refreshonshow);
}
}
_609.shadow=true;
if(!_609.height){
_609.height=300;
}else{
if(ColdFusion.Util.isInteger(_609.height)==false){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidheight","widget",[_608],null,null,true);
return;
}
}
if(!_609.width){
_609.width=500;
}else{
if(ColdFusion.Util.isInteger(_609.width)==false){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidwidth","widget",[_608],null,null,true);
return;
}
}
var _60b=false;
if(_609.minwidth){
if(ColdFusion.Util.isInteger(_609.minwidth)==false){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidminwidth","widget",[_608],null,null,true);
return;
}
var _60c=_609.minwidth;
var _60d=_609.width;
if(typeof (_60c)!="number"){
_60c=parseInt(_60c);
}
if(typeof (_60d)!="number"){
_60d=parseInt(_60d);
}
if(_60c>_60d){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidminwidth","widget",[_608],null,null,true);
return;
}
_609.minWidth=_609.minwidth;
_60b=true;
}
if(_609.minheight){
if(ColdFusion.Util.isInteger(_609.minheight)==false){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidminheight","widget",[_608],null,null,true);
return;
}
var _60e=_609.minheight;
var _60f=_609.height;
if(typeof (_60e)!="number"){
_60e=parseInt(_60e);
}
if(typeof (_60f)!="number"){
_60f=parseInt(_60f);
}
if(_60e>_60f){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidheightvalue","widget",[_608],null,null,true);
return;
}
_609.minHeight=_609.minheight;
_60b=true;
}
if(_609.x){
if(ColdFusion.Util.isInteger(_609.x)==false){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidx","widget",[_608],null,null,true);
return;
}
}
if(_609.y){
if(ColdFusion.Util.isInteger(_609.y)==false){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidy","widget",[_608],null,null,true);
return;
}
}
if(typeof (_609.x)=="undefined"&&(typeof (_609.fixedcenter)=="undefined"||_609.fixedcenter==false)){
_609.x=ColdFusion.Window.xPosition;
ColdFusion.Window.xPosition+=15;
}
if(typeof (_609.y)=="undefined"&&(typeof (_609.fixedcenter)=="undefined"||_609.fixedcenter==false)){
_609.y=ColdFusion.Window.yPosition;
ColdFusion.Window.yPosition+=15;
}
if(typeof (_609.initshow)!="undefined"&&_609.initshow===false){
_609.tempinitshow=false;
if(typeof (_609.fixedcenter)!="undefined"&&_609.fixedcenter===true){
_609.tempcenter=_609.fixedcenter;
_609.fixedcenter=null;
}else{
_609.tempx=_609.x;
_609.tempy=_609.y;
}
_609.x=-10000;
_609.y=-10000;
}
_609.constraintoviewport=true;
_609.initshow=true;
if(_609.resizable!=null&&_609.resizable==false&&_60b==true){
ColdFusion.Window.resetHTML(_608);
ColdFusion.handleError(null,"window.getupdatedconfigobject.minhwnotallowed","widget",[_608],null,null,true);
return;
}
_609.collapsible=false;
_609.shadow=true;
_609.isConfObj=true;
return _609;
};
ColdFusion.Window.show=function(_610){
var _611=ColdFusion.objectCache[_610];
if(typeof (_611)!="undefined"&&_611!=null){
if(typeof (_611.isConfObj)!="undefined"&&_611.isConfObj==true){
_611.initshow=true;
var _612=ColdFusion.Window.createHTML(_610,null,_611.url,_611,true);
ColdFusion.Window.createJSObj(_610,_611.url,_612);
}else{
if(_611.isVisible()==false){
_611.show();
ColdFusion.Log.info("window.show.shown","widget",[_610]);
}
if(_611.tempcenter!=null){
_611.center();
_611.tempcenter=null;
}else{
if(_611.getEl()&&_611.getEl().getX()>0&&_611.getEl().getY()>0){
_611.tempx=null;
_611.tempy=null;
}else{
if(_611.tempx!=null&&_611.tempy!=null){
_611.setPosition(_611.tempx,_611.tempy);
_611.tempx=null;
_611.tempy=null;
}else{
var x=_611.getEl().getX();
var y=_611.getEl().getY();
_611.setPosition(x+1,y+1);
_611.setPosition(x,y);
}
}
}
}
}else{
ColdFusion.handleError(null,"window.show.notfound","widget",[_610],null,null,true);
}
};
ColdFusion.Window.hide=function(_615){
var _616=ColdFusion.objectCache[_615];
if(_616){
if(_616.isVisible&&_616.isVisible()==true){
_616.hide();
ColdFusion.Log.info("window.hide.hidden","widget",[_615]);
}
}else{
ColdFusion.handleError(null,"window.hide.notfound","widget",[_615],null,null,true);
}
};
ColdFusion.Window.onShow=function(_617,_618){
var _619=ColdFusion.objectCache[_617];
if(typeof (_619)!="undefined"&&_619!=null){
_619._cf_onShow=_618;
if(_619.addListener){
_619.addListener("show",ColdFusion.Window.onShowWrapper);
}
}else{
ColdFusion.handleError(null,"window.onshow.notfound","widget",[_617],null,null,true);
}
};
ColdFusion.Window.onShowWrapper=function(_61a){
_61a._cf_onShow.call(null,_61a.cfwindowname);
};
ColdFusion.Window.onHide=function(_61b,_61c){
var _61d=ColdFusion.objectCache[_61b];
if(typeof (_61d)!="undefined"&&_61d!=null){
_61d._cf_onHide=_61c;
if(_61d.addListener){
_61d.addListener("hide",ColdFusion.Window.onHideWrapper);
}
}else{
ColdFusion.handleError(null,"window.onhide.notfound","widget",[_61b],null,null,true);
}
};
ColdFusion.Window.onHideWrapper=function(_61e){
_61e._cf_onHide.call(null,_61e.cfwindowname);
};
ColdFusion.Window.getWindowObject=function(_61f){
if(!_61f){
ColdFusion.handleError(null,"window.getwindowobject.emptyname","widget",null,null,null,true);
return;
}
var _620=ColdFusion.objectCache[_61f];
if(_620==null||(typeof (_620.isConfObj)=="undefined"&&Ext.Window.prototype.isPrototypeOf(_620)==false)){
ColdFusion.handleError(null,"window.getwindowobject.notfound","widget",[_61f],null,null,true);
return;
}
if(typeof (_620.isConfObj)!="undefined"&&_620.isConfObj==true){
_620.initshow=true;
var _621=ColdFusion.Window.createHTML(_61f,null,_620.url,_620,true);
ColdFusion.Window.createJSObj(_61f,_620.url,_621);
ColdFusion.Window.hide(_61f);
_620=ColdFusion.objectCache[_61f];
}
return _620;
};
