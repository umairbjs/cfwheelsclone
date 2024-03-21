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
ColdFusion.Window.create=function(_1,_2,_3,_4){
if(_1==null){
ColdFusion.handleError(null,"window.create.nullname","widget",null,null,null,true);
return;
}
if(_1==""){
ColdFusion.handleError(null,"window.create.emptyname","widget",null,null,null,true);
return;
}
var _5=ColdFusion.objectCache[_1];
var _6=false;
if(typeof (_5)!="undefined"&&_5!=null){
if(_5.callfromtag){
ColdFusion.handleError(null,"window.create.duplicatename","widget",[_1]);
}
if(typeof (_5.isConfObj)!="undefined"&&_5.isConfObj==true){
_6=true;
if(_4!=null&&typeof (_4.initshow)!="undefined"){
if(_4.initshow==false){
return;
}
}
}else{
if(!_4||(_4&&_4.initshow!==false)){
ColdFusion.Window.show(_1);
}
return;
}
}
if(!_5){
ColdFusion.Log.info("window.create.creating","widget",[_1]);
}
var _7=ColdFusion.Window.createHTML(_1,_2,_3,_4,_6);
var _8=ColdFusion.objectCache[_1];
if(_8!=null&&typeof (_8.isConfObj)!="undefined"&&_8.isConfObj==true){
return;
}
return ColdFusion.Window.createJSObj(_1,_3,_7);
};
ColdFusion.Window.createHTML=function(_9,_a,_b,_c,_d){
var _e=null;
var _f=null;
if(_c&&_c.divid){
_e=document.getElementById(_c.divid);
}
if(_e==null){
_e=document.createElement("div");
_f="cf_window"+ColdFusion.Window.windowIdCounter;
ColdFusion.Window.windowIdCounter++;
_e.id=_f;
_e.className="x-hidden";
}
var _10=false;
var _11=null;
if(_c!=null&&typeof (_c.headerstyle)!="undefined"&&_c.headerstyle!=null){
var _12=new String(_c.headerstyle);
_12=_12.toLowerCase();
var _13=_12.indexOf("background-color");
if(_13>=0){
_10=true;
var _14=_12.indexOf(";",_13+17);
if(_14<0){
_14=_12.length;
}
_11=_12.substring(_13+17,_14);
}
}
var _15=document.getElementById(_9+"_title-html");
if(_10==true&&_11){
var _16="#"+_c.divid;
var _17="NAME_ID .x-window-tc , NAME_ID .x-window-tl, NAME_ID .x-window-tr, NAME_ID .x-window-bc, NAME_ID .x-window-br, NAME_ID .x-window-bl,NAME_ID .x-window-ml, NAME_ID .x-window-mr { background-image: none; background-color: COLOR_ID; }";
var _18=ColdFusion.Util.replaceAll(ColdFusion.Window.TITLE_BGCOLOR_TEMPLATE,"WINDOW_DIV_ID",_16);
var _18=ColdFusion.Util.replaceAll(_18,"COLOR_ID",_11);
Ext.util.CSS.createStyleSheet(_18);
}
if(_15==null){
_15=document.createElement("div");
_15.id=_9+"_title-html";
var _19="x-window-header";
_15.className=_19;
if(_a){
_15.innerHTML=_a;
}else{
_15.innerHTML="&nbsp;";
}
}
var _1a=document.getElementById(_9+"-body");
if(_1a==null){
_1a=document.createElement("div");
_1a.id=_9+"-body";
_e.appendChild(_1a);
}
var _1b;
_1b=ColdFusion.Window.getUpdatedConfigObj(_c,_9);
if(_c){
_1b.header={style:_c.headerstyle};
}
if(typeof (_1b)=="undefined"){
_e.innerHTML="";
return;
}
if(_f){
_1b.divid=_f;
}
_1b.title=_a;
if(typeof (_1b.initshow)!="undefined"&&_1b.initshow===false){
_1b.url=_b;
ColdFusion.objectCache[_9]=_1b;
ColdFusion.objectCache[_9+"-body"]=_1b;
}
_1b.items=[{html:_e.innerHTML}];
return _1b;
};
ColdFusion.Window.createJSObj=function(_1c,url,_1e){
var _1f;
var _20=false;
if(typeof (_1e.childlayoutid)&&_1e.childlayoutid!=null){
_20=true;
_1e.layout="border";
_1e.items=ColdFusion.objectCache[_1e.childlayoutid];
}else{
var _21=document.getElementById(_1c+"-body");
if(_21){
_21.parentNode.removeChild(_21);
}
_1e.layout="fit";
}
if(typeof (_1e.autoScroll)=="undefined"){
_1e.autoScroll=true;
}
if(_1e.onShow){
_1e._cf_onShow=_1e.onShow;
_1e.onShow=null;
}
if(_1e.onHide){
_1e._cf_onHide=_1e.onHide;
_1e.onHide=null;
}
_1f=new Ext.Window(_1e);
_1f.show();
_1f.hide();
_1f.cfwindowname=_1c;
_1f.tempx=_1e.tempx;
_1f.tempy=_1e.tempy;
_1f.divid=_1e.divid;
if(typeof (_1e.headerstyle)!="undefined"&&_1e.headerstyle!=null){
var _22=document.getElementById(_1c+"_title");
_22=_22||document.getElementById(_1f.id+"_header_hd-textEl");
if(_22!=null){
_22.style.cssText="background:none;"+_1e.headerstyle;
}
}
if(typeof (_1e.bodystyle)!="undefined"&&_1e.bodystyle!=null){
var _23=document.getElementById(_1c+"-body");
if(_23){
var _24=_23.parentNode;
}
if(_24!=null){
_24.style.cssText=_1e.bodystyle;
}
}
_1f.isConfObj=false;
_1f._cf_body=_1c+"-body";
ColdFusion.objectCache[_1c]=_1f;
if(_20){
var _25=_1f.getLayout();
var _26=ColdFusion.objectCache[_1e.childlayoutid];
}
_1f.addListener("beforeclose",ColdFusion.Window.beforeCloseHandler);
var _27=null;
if(typeof (url)!="undefined"&&url!=""){
_27=url;
}
if(_27==null){
if(typeof (_1e.initshow)=="undefined"||_1e.initshow==true){
_1f.addListener("beforeshow",ColdFusion.Window.beforeShowHandler);
ColdFusion.Window.showandhide(_1f,_1e);
}
return;
}
ColdFusion.objectCache[_1c+"-body"]=_1f;
if(typeof (_1e.callfromtag)=="undefined"){
var _28;
var _29;
_1f._cf_visible=false;
_1f._cf_dirtyview=true;
_1f.addListener("show",ColdFusion.Window.showHandler);
_1f.addListener("hide",ColdFusion.Window.hideHandler);
_1f.url=_27;
if(_1e){
if(typeof (_1e.initshow)=="undefined"||_1e.initshow==true){
ColdFusion.Window.showandhide(_1f,_1e);
}
_28=_1e.callbackHandler;
_29=_1e.errorHandler;
}
}else{
_1f.callfromtag=true;
_1f._cf_visible=false;
_1f._cf_dirtyview=true;
_1f.addListener("show",ColdFusion.Window.showHandler);
_1f.addListener("beforeshow",ColdFusion.Window.beforeShowHandler);
_1f.addListener("hide",ColdFusion.Window.hideHandler);
if(typeof (_1e.initshow)=="undefined"||_1e.initshow==true){
ColdFusion.Window.showandhide(_1f,_1e);
}
}
var _2a=document.getElementById(_1c+"-body");
if(_2a){
_2a.style.width="100%";
_2a.style.height="100%";
}
var _2b=_2a.parentNode.parentNode.parentNode;
if(_2b){
_2b.style.overflow="auto";
}
var _2c=document.getElementsByClassName("x-window-bodywrap");
if(typeof (_2c)!="undefined"){
for(var i=0;i<_2c.length;i++){
var _21=_2c[i].firstChild;
_21.style.overflow="hidden";
}
}
};
ColdFusion.Window.showandhide=function(_2e,_2f){
if(typeof (_2f.tempinitshow)!="undefined"&&_2f.tempinitshow==false){
var _30=Ext.Element.get(_2e.divid);
if(typeof _30!="undefined"&&_30){
_30.show();
_30.hide();
}
}else{
if(_2e){
_2e.show();
}
}
};
ColdFusion.Window.destroy=function(_31,_32){
if(_31){
var _33=ColdFusion.Window.getWindowObject(_31);
if(_33){
if(_32===true){
_33.destroy(true);
}else{
_33.destroy();
}
ColdFusion.objectCache[_31]=null;
}
}
};
ColdFusion.Window.resizeHandler=function(_34,_35,_36){
if(typeof (_34.fixedcenter)!="undefined"&&_34.fixedcenter==true){
_34.center();
}
};
ColdFusion.Window.beforeShowHandler=function(_37){
if(typeof (_37.fixedcenter)!="undefined"&&_37.fixedcenter==true){
_37.center();
}
};
ColdFusion.Window.beforeCloseHandler=function(_38){
if(_38.destroyonclose!="undefined"&&_38.destroyonclose==true){
ColdFusion.objectCache[_38.cfwindowname]=null;
return true;
}else{
_38.hide();
return false;
}
};
ColdFusion.Window.showHandler=function(_39){
_39._cf_visible=true;
if(_39._cf_dirtyview){
if(typeof (_39.callfromtag)=="undefined"){
ColdFusion.Ajax.replaceHTML(_39._cf_body,_39.url,"GET",null,_39.callbackHandler,_39.errorHandler);
}else{
var _3a=ColdFusion.bindHandlerCache[_39._cf_body];
if(_3a){
_3a();
}
}
_39._cf_dirtyview=false;
}
};
ColdFusion.Window.hideHandler=function(_3b){
_3b._cf_visible=false;
if(_3b._cf_refreshOnShow){
_3b._cf_dirtyview=true;
}
};
ColdFusion.Window.xPosition=50;
ColdFusion.Window.yPosition=50;
ColdFusion.Window.resetHTML=function(_3c){
var _3d=document.getElementById(_3c);
if(_3d){
_3d.innerHTML="";
}
};
ColdFusion.Window.getUpdatedConfigObj=function(_3e,_3f){
var _40={};
if(_3e!=null){
if(typeof (_3e)!="object"){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidconfig","widget",[_3f],null,null,true);
return;
}
for(var key in _3e){
if(key=="center"&&ColdFusion.Util.isBoolean(_3e["center"])){
_40["fixedcenter"]=_3e["center"];
}else{
_40[key]=_3e[key];
}
}
}
if(typeof (_40.initshow)!="undefined"){
if(ColdFusion.Util.isBoolean(_40.initshow)==false){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidinitshow","widget",[_3f],null,null,true);
return;
}else{
_40.initshow=ColdFusion.Util.castBoolean(_40.initshow);
_40._cf_visible=_40.initshow;
}
}
_40.tempcenter=null;
if(typeof (_40.fixedcenter)!="undefined"){
if(ColdFusion.Util.isBoolean(_40.fixedcenter)==false){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidcenter","widget",[_3f],null,null,true);
return;
}else{
_40.fixedcenter=ColdFusion.Util.castBoolean(_40.fixedcenter);
}
}
if(typeof (_40.resizable)!="undefined"){
if(ColdFusion.Util.isBoolean(_40.resizable)==false){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidresizable","widget",[_3f],null,null,true);
return;
}else{
_40.resizable=ColdFusion.Util.castBoolean(_40.resizable);
}
}
if(typeof (_40.draggable)!="undefined"){
if(ColdFusion.Util.isBoolean(_40.draggable)==false){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invaliddraggable","widget",[_3f],null,null,true);
return;
}else{
_40.draggable=ColdFusion.Util.castBoolean(_40.draggable);
}
}
if(typeof (_40.closable)!="undefined"){
if(ColdFusion.Util.isBoolean(_40.closable)==false){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidclosable","widget",[_3f],null,null,true);
return;
}else{
_40.closable=ColdFusion.Util.castBoolean(_40.closable);
}
}
if(typeof (_40.modal)!="undefined"){
if(ColdFusion.Util.isBoolean(_40.modal)==false){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidmodal","widget",[_3f],null,null,true);
return;
}else{
_40.modal=ColdFusion.Util.castBoolean(_40.modal);
}
}
if(typeof (_40.refreshonshow)!="undefined"){
if(ColdFusion.Util.isBoolean(_40.refreshonshow)==false){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidrefreshonshow","widget",[_3f],null,null,true);
return;
}else{
_40._cf_refreshOnShow=ColdFusion.Util.castBoolean(_40.refreshonshow);
}
}
_40.shadow=true;
if(!_40.height){
_40.height=300;
}else{
if(ColdFusion.Util.isInteger(_40.height)==false){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidheight","widget",[_3f],null,null,true);
return;
}
}
if(!_40.width){
_40.width=500;
}else{
if(ColdFusion.Util.isInteger(_40.width)==false){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidwidth","widget",[_3f],null,null,true);
return;
}
}
var _42=false;
if(_40.minwidth){
if(ColdFusion.Util.isInteger(_40.minwidth)==false){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidminwidth","widget",[_3f],null,null,true);
return;
}
var _43=_40.minwidth;
var _44=_40.width;
if(typeof (_43)!="number"){
_43=parseInt(_43);
}
if(typeof (_44)!="number"){
_44=parseInt(_44);
}
if(_43>_44){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidminwidth","widget",[_3f],null,null,true);
return;
}
_40.minWidth=_40.minwidth;
_42=true;
}
if(_40.minheight){
if(ColdFusion.Util.isInteger(_40.minheight)==false){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidminheight","widget",[_3f],null,null,true);
return;
}
var _45=_40.minheight;
var _46=_40.height;
if(typeof (_45)!="number"){
_45=parseInt(_45);
}
if(typeof (_46)!="number"){
_46=parseInt(_46);
}
if(_45>_46){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidheightvalue","widget",[_3f],null,null,true);
return;
}
_40.minHeight=_40.minheight;
_42=true;
}
if(_40.x){
if(ColdFusion.Util.isInteger(_40.x)==false){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidx","widget",[_3f],null,null,true);
return;
}
}
if(_40.y){
if(ColdFusion.Util.isInteger(_40.y)==false){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidy","widget",[_3f],null,null,true);
return;
}
}
if(typeof (_40.x)=="undefined"&&(typeof (_40.fixedcenter)=="undefined"||_40.fixedcenter==false)){
_40.x=ColdFusion.Window.xPosition;
ColdFusion.Window.xPosition+=15;
}
if(typeof (_40.y)=="undefined"&&(typeof (_40.fixedcenter)=="undefined"||_40.fixedcenter==false)){
_40.y=ColdFusion.Window.yPosition;
ColdFusion.Window.yPosition+=15;
}
if(typeof (_40.initshow)!="undefined"&&_40.initshow===false){
_40.tempinitshow=false;
if(typeof (_40.fixedcenter)!="undefined"&&_40.fixedcenter===true){
_40.tempcenter=_40.fixedcenter;
_40.fixedcenter=null;
}else{
_40.tempx=_40.x;
_40.tempy=_40.y;
}
_40.x=-10000;
_40.y=-10000;
}
_40.constraintoviewport=true;
_40.initshow=true;
if(_40.resizable!=null&&_40.resizable==false&&_42==true){
ColdFusion.Window.resetHTML(_3f);
ColdFusion.handleError(null,"window.getupdatedconfigobject.minhwnotallowed","widget",[_3f],null,null,true);
return;
}
_40.collapsible=false;
_40.shadow=true;
_40.isConfObj=true;
return _40;
};
ColdFusion.Window.show=function(_47){
var _48=ColdFusion.objectCache[_47];
if(typeof (_48)!="undefined"&&_48!=null){
if(typeof (_48.isConfObj)!="undefined"&&_48.isConfObj==true){
_48.initshow=true;
var _49=ColdFusion.Window.createHTML(_47,null,_48.url,_48,true);
ColdFusion.Window.createJSObj(_47,_48.url,_49);
}else{
if(_48.isVisible()==false){
_48.show();
ColdFusion.Log.info("window.show.shown","widget",[_47]);
}
if(_48.tempcenter!=null){
_48.center();
_48.tempcenter=null;
}else{
if(_48.getEl()&&_48.getEl().getX()>0&&_48.getEl().getY()>0){
_48.tempx=null;
_48.tempy=null;
}else{
if(_48.tempx!=null&&_48.tempy!=null){
_48.setPosition(_48.tempx,_48.tempy);
_48.tempx=null;
_48.tempy=null;
}else{
var x=_48.getEl().getX();
var y=_48.getEl().getY();
_48.setPosition(x+1,y+1);
_48.setPosition(x,y);
}
}
}
}
}else{
ColdFusion.handleError(null,"window.show.notfound","widget",[_47],null,null,true);
}
};
ColdFusion.Window.hide=function(_4c){
var _4d=ColdFusion.objectCache[_4c];
if(_4d){
if(_4d.isVisible&&_4d.isVisible()==true){
_4d.hide();
ColdFusion.Log.info("window.hide.hidden","widget",[_4c]);
}
}else{
ColdFusion.handleError(null,"window.hide.notfound","widget",[_4c],null,null,true);
}
};
ColdFusion.Window.onShow=function(_4e,_4f){
var _50=ColdFusion.objectCache[_4e];
if(typeof (_50)!="undefined"&&_50!=null){
_50._cf_onShow=_4f;
if(_50.addListener){
_50.addListener("show",ColdFusion.Window.onShowWrapper);
}
}else{
ColdFusion.handleError(null,"window.onshow.notfound","widget",[_4e],null,null,true);
}
};
ColdFusion.Window.onShowWrapper=function(_51){
_51._cf_onShow.call(null,_51.cfwindowname);
};
ColdFusion.Window.onHide=function(_52,_53){
var _54=ColdFusion.objectCache[_52];
if(typeof (_54)!="undefined"&&_54!=null){
_54._cf_onHide=_53;
if(_54.addListener){
_54.addListener("hide",ColdFusion.Window.onHideWrapper);
}
}else{
ColdFusion.handleError(null,"window.onhide.notfound","widget",[_52],null,null,true);
}
};
ColdFusion.Window.onHideWrapper=function(_55){
_55._cf_onHide.call(null,_55.cfwindowname);
};
ColdFusion.Window.getWindowObject=function(_56){
if(!_56){
ColdFusion.handleError(null,"window.getwindowobject.emptyname","widget",null,null,null,true);
return;
}
var _57=ColdFusion.objectCache[_56];
if(_57==null||(typeof (_57.isConfObj)=="undefined"&&Ext.Window.prototype.isPrototypeOf(_57)==false)){
ColdFusion.handleError(null,"window.getwindowobject.notfound","widget",[_56],null,null,true);
return;
}
if(typeof (_57.isConfObj)!="undefined"&&_57.isConfObj==true){
_57.initshow=true;
var _58=ColdFusion.Window.createHTML(_56,null,_57.url,_57,true);
ColdFusion.Window.createJSObj(_56,_57.url,_58);
ColdFusion.Window.hide(_56);
_57=ColdFusion.objectCache[_56];
}
return _57;
};
