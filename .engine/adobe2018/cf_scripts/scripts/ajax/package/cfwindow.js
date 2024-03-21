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
ColdFusion.Window.create=function(_1fd,_1fe,url,_200){
if(_1fd==null){
ColdFusion.handleError(null,"window.create.nullname","widget",null,null,null,true);
return;
}
if(_1fd==""){
ColdFusion.handleError(null,"window.create.emptyname","widget",null,null,null,true);
return;
}
var _201=ColdFusion.objectCache[_1fd];
var _202=false;
if(typeof (_201)!="undefined"&&_201!=null){
if(_201.callfromtag){
ColdFusion.handleError(null,"window.create.duplicatename","widget",[_1fd]);
}
if(typeof (_201.isConfObj)!="undefined"&&_201.isConfObj==true){
_202=true;
if(_200!=null&&typeof (_200.initshow)!="undefined"){
if(_200.initshow==false){
return;
}
}
}else{
if(!_200||(_200&&_200.initshow!==false)){
ColdFusion.Window.show(_1fd);
}
return;
}
}
if(!_201){
ColdFusion.Log.info("window.create.creating","widget",[_1fd]);
}
var _203=ColdFusion.Window.createHTML(_1fd,_1fe,url,_200,_202);
var _204=ColdFusion.objectCache[_1fd];
if(_204!=null&&typeof (_204.isConfObj)!="undefined"&&_204.isConfObj==true){
return;
}
return ColdFusion.Window.createJSObj(_1fd,url,_203);
};
ColdFusion.Window.createHTML=function(_205,_206,url,_208,_209){
var _20a=null;
var _20b=null;
if(_208&&_208.divid){
_20a=document.getElementById(_208.divid);
}
if(_20a==null){
_20a=document.createElement("div");
_20b="cf_window"+ColdFusion.Window.windowIdCounter;
ColdFusion.Window.windowIdCounter++;
_20a.id=_20b;
_20a.className="x-hidden";
}
var _20c=false;
var _20d=null;
if(_208!=null&&typeof (_208.headerstyle)!="undefined"&&_208.headerstyle!=null){
var _20e=new String(_208.headerstyle);
_20e=_20e.toLowerCase();
var _20f=_20e.indexOf("background-color");
if(_20f>=0){
_20c=true;
var _210=_20e.indexOf(";",_20f+17);
if(_210<0){
_210=_20e.length;
}
_20d=_20e.substring(_20f+17,_210);
}
}
var _211=document.getElementById(_205+"_title-html");
if(_20c==true&&_20d){
var _212="#"+_208.divid;
var _213="NAME_ID .x-window-tc , NAME_ID .x-window-tl, NAME_ID .x-window-tr, NAME_ID .x-window-bc, NAME_ID .x-window-br, NAME_ID .x-window-bl,NAME_ID .x-window-ml, NAME_ID .x-window-mr { background-image: none; background-color: COLOR_ID; }";
var _214=ColdFusion.Util.replaceAll(ColdFusion.Window.TITLE_BGCOLOR_TEMPLATE,"WINDOW_DIV_ID",_212);
var _214=ColdFusion.Util.replaceAll(_214,"COLOR_ID",_20d);
Ext.util.CSS.createStyleSheet(_214);
}
if(_211==null){
_211=document.createElement("div");
_211.id=_205+"_title-html";
var _215="x-window-header";
_211.className=_215;
if(_206){
_211.innerHTML=_206;
}else{
_211.innerHTML="&nbsp;";
}
}
var _216=document.getElementById(_205+"-body");
if(_216==null){
_216=document.createElement("div");
_216.id=_205+"-body";
_20a.appendChild(_216);
}
_216.style.overflow="auto";
_216.style.height="100%";
var _217;
_217=ColdFusion.Window.getUpdatedConfigObj(_208,_205);
if(_208){
_217.header={style:_208.headerstyle};
}
if(typeof (_217)=="undefined"){
_20a.innerHTML="";
return;
}
if(_20b){
_217.divid=_20b;
}
_217.title=_206;
if(typeof (_217.initshow)!="undefined"&&_217.initshow===false){
_217.url=url;
ColdFusion.objectCache[_205]=_217;
ColdFusion.objectCache[_205+"-body"]=_217;
}
_217.items=[{html:_20a.innerHTML}];
return _217;
};
ColdFusion.Window.createJSObj=function(_218,url,_21a){
var _21b;
var _21c=false;
if(typeof (_21a.childlayoutid)&&_21a.childlayoutid!=null){
_21c=true;
_21a.layout="border";
_21a.items=ColdFusion.objectCache[_21a.childlayoutid];
}else{
var elem=document.getElementById(_218+"-body");
if(elem){
elem.parentNode.removeChild(elem);
}
_21a.layout="fit";
}
if(typeof (_21a.autoScroll)=="undefined"){
_21a.autoScroll=true;
}
if(_21a.onShow){
_21a._cf_onShow=_21a.onShow;
_21a.onShow=null;
}
if(_21a.onHide){
_21a._cf_onHide=_21a.onHide;
_21a.onHide=null;
}
_21b=new Ext.Window(_21a);
_21b.show();
_21b.hide();
_21b.cfwindowname=_218;
_21b.tempx=_21a.tempx;
_21b.tempy=_21a.tempy;
_21b.divid=_21a.divid;
if(typeof (_21a.headerstyle)!="undefined"&&_21a.headerstyle!=null){
var _21e=document.getElementById(_218+"_title");
_21e=_21e||document.getElementById(_21b.id+"_header_hd-textEl");
if(_21e!=null){
_21e.style.cssText="background:none;"+_21a.headerstyle;
}
}
if(typeof (_21a.bodystyle)!="undefined"&&_21a.bodystyle!=null){
var _21f=document.getElementById(_218+"-body");
if(_21f){
var _220=_21f.parentNode;
}
if(_220!=null){
_220.style.cssText=_21a.bodystyle;
}
}
_21b.isConfObj=false;
_21b._cf_body=_218+"-body";
ColdFusion.objectCache[_218]=_21b;
if(_21c){
var _221=_21b.getLayout();
var _222=ColdFusion.objectCache[_21a.childlayoutid];
}
_21b.addListener("beforeclose",ColdFusion.Window.beforeCloseHandler);
var _223=null;
if(typeof (url)!="undefined"&&url!=""){
_223=url;
}
if(_223==null){
if(typeof (_21a.initshow)=="undefined"||_21a.initshow==true){
_21b.addListener("beforeshow",ColdFusion.Window.beforeShowHandler);
ColdFusion.Window.showandhide(_21b,_21a);
}
return;
}
ColdFusion.objectCache[_218+"-body"]=_21b;
if(typeof (_21a.callfromtag)=="undefined"){
var _224;
var _225;
_21b._cf_visible=false;
_21b._cf_dirtyview=true;
_21b.addListener("show",ColdFusion.Window.showHandler);
_21b.addListener("hide",ColdFusion.Window.hideHandler);
_21b.url=_223;
if(_21a){
if(typeof (_21a.initshow)=="undefined"||_21a.initshow==true){
ColdFusion.Window.showandhide(_21b,_21a);
}
_224=_21a.callbackHandler;
_225=_21a.errorHandler;
}
}else{
_21b.callfromtag=true;
_21b._cf_visible=false;
_21b._cf_dirtyview=true;
_21b.addListener("show",ColdFusion.Window.showHandler);
_21b.addListener("beforeshow",ColdFusion.Window.beforeShowHandler);
_21b.addListener("hide",ColdFusion.Window.hideHandler);
if(typeof (_21a.initshow)=="undefined"||_21a.initshow==true){
ColdFusion.Window.showandhide(_21b,_21a);
}
}
};
ColdFusion.Window.showandhide=function(_226,_227){
if(typeof (_227.tempinitshow)!="undefined"&&_227.tempinitshow==false){
var _228=Ext.Element.get(_226.divid);
if(typeof _228!="undefined"){
_228.show();
}
_228.hide();
}else{
_226.show();
}
};
ColdFusion.Window.destroy=function(_229,_22a){
if(_229){
var _22b=ColdFusion.Window.getWindowObject(_229);
if(_22b){
if(_22a===true){
_22b.destroy(true);
}else{
_22b.destroy();
}
ColdFusion.objectCache[_229]=null;
}
}
};
ColdFusion.Window.resizeHandler=function(_22c,_22d,_22e){
if(typeof (_22c.fixedcenter)!="undefined"&&_22c.fixedcenter==true){
_22c.center();
}
};
ColdFusion.Window.beforeShowHandler=function(_22f){
if(typeof (_22f.fixedcenter)!="undefined"&&_22f.fixedcenter==true){
_22f.center();
}
};
ColdFusion.Window.beforeCloseHandler=function(_230){
if(_230.destroyonclose!="undefined"&&_230.destroyonclose==true){
ColdFusion.objectCache[_230.cfwindowname]=null;
return true;
}else{
_230.hide();
return false;
}
};
ColdFusion.Window.showHandler=function(_231){
_231._cf_visible=true;
if(_231._cf_dirtyview){
if(typeof (_231.callfromtag)=="undefined"){
ColdFusion.Ajax.replaceHTML(_231._cf_body,_231.url,"GET",null,_231.callbackHandler,_231.errorHandler);
}else{
var _232=ColdFusion.bindHandlerCache[_231._cf_body];
if(_232){
_232();
}
}
_231._cf_dirtyview=false;
}
};
ColdFusion.Window.hideHandler=function(_233){
_233._cf_visible=false;
if(_233._cf_refreshOnShow){
_233._cf_dirtyview=true;
}
};
ColdFusion.Window.xPosition=50;
ColdFusion.Window.yPosition=50;
ColdFusion.Window.resetHTML=function(_234){
var _235=document.getElementById(_234);
if(_235){
_235.innerHTML="";
}
};
ColdFusion.Window.getUpdatedConfigObj=function(_236,_237){
var _238={};
if(_236!=null){
if(typeof (_236)!="object"){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidconfig","widget",[_237],null,null,true);
return;
}
for(var key in _236){
if(key=="center"&&ColdFusion.Util.isBoolean(_236["center"])){
_238["fixedcenter"]=_236["center"];
}else{
_238[key]=_236[key];
}
}
}
if(typeof (_238.initshow)!="undefined"){
if(ColdFusion.Util.isBoolean(_238.initshow)==false){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidinitshow","widget",[_237],null,null,true);
return;
}else{
_238.initshow=ColdFusion.Util.castBoolean(_238.initshow);
_238._cf_visible=_238.initshow;
}
}
_238.tempcenter=null;
if(typeof (_238.fixedcenter)!="undefined"){
if(ColdFusion.Util.isBoolean(_238.fixedcenter)==false){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidcenter","widget",[_237],null,null,true);
return;
}else{
_238.fixedcenter=ColdFusion.Util.castBoolean(_238.fixedcenter);
}
}
if(typeof (_238.resizable)!="undefined"){
if(ColdFusion.Util.isBoolean(_238.resizable)==false){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidresizable","widget",[_237],null,null,true);
return;
}else{
_238.resizable=ColdFusion.Util.castBoolean(_238.resizable);
}
}
if(typeof (_238.draggable)!="undefined"){
if(ColdFusion.Util.isBoolean(_238.draggable)==false){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invaliddraggable","widget",[_237],null,null,true);
return;
}else{
_238.draggable=ColdFusion.Util.castBoolean(_238.draggable);
}
}
if(typeof (_238.closable)!="undefined"){
if(ColdFusion.Util.isBoolean(_238.closable)==false){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidclosable","widget",[_237],null,null,true);
return;
}else{
_238.closable=ColdFusion.Util.castBoolean(_238.closable);
}
}
if(typeof (_238.modal)!="undefined"){
if(ColdFusion.Util.isBoolean(_238.modal)==false){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidmodal","widget",[_237],null,null,true);
return;
}else{
_238.modal=ColdFusion.Util.castBoolean(_238.modal);
}
}
if(typeof (_238.refreshonshow)!="undefined"){
if(ColdFusion.Util.isBoolean(_238.refreshonshow)==false){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidrefreshonshow","widget",[_237],null,null,true);
return;
}else{
_238._cf_refreshOnShow=ColdFusion.Util.castBoolean(_238.refreshonshow);
}
}
_238.shadow=true;
if(!_238.height){
_238.height=300;
}else{
if(ColdFusion.Util.isInteger(_238.height)==false){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidheight","widget",[_237],null,null,true);
return;
}
}
if(!_238.width){
_238.width=500;
}else{
if(ColdFusion.Util.isInteger(_238.width)==false){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidwidth","widget",[_237],null,null,true);
return;
}
}
var _23a=false;
if(_238.minwidth){
if(ColdFusion.Util.isInteger(_238.minwidth)==false){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidminwidth","widget",[_237],null,null,true);
return;
}
var _23b=_238.minwidth;
var _23c=_238.width;
if(typeof (_23b)!="number"){
_23b=parseInt(_23b);
}
if(typeof (_23c)!="number"){
_23c=parseInt(_23c);
}
if(_23b>_23c){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidminwidth","widget",[_237],null,null,true);
return;
}
_238.minWidth=_238.minwidth;
_23a=true;
}
if(_238.minheight){
if(ColdFusion.Util.isInteger(_238.minheight)==false){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidminheight","widget",[_237],null,null,true);
return;
}
var _23d=_238.minheight;
var _23e=_238.height;
if(typeof (_23d)!="number"){
_23d=parseInt(_23d);
}
if(typeof (_23e)!="number"){
_23e=parseInt(_23e);
}
if(_23d>_23e){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidheightvalue","widget",[_237],null,null,true);
return;
}
_238.minHeight=_238.minheight;
_23a=true;
}
if(_238.x){
if(ColdFusion.Util.isInteger(_238.x)==false){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidx","widget",[_237],null,null,true);
return;
}
}
if(_238.y){
if(ColdFusion.Util.isInteger(_238.y)==false){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.invalidy","widget",[_237],null,null,true);
return;
}
}
if(typeof (_238.x)=="undefined"&&(typeof (_238.fixedcenter)=="undefined"||_238.fixedcenter==false)){
_238.x=ColdFusion.Window.xPosition;
ColdFusion.Window.xPosition+=15;
}
if(typeof (_238.y)=="undefined"&&(typeof (_238.fixedcenter)=="undefined"||_238.fixedcenter==false)){
_238.y=ColdFusion.Window.yPosition;
ColdFusion.Window.yPosition+=15;
}
if(typeof (_238.initshow)!="undefined"&&_238.initshow===false){
_238.tempinitshow=false;
if(typeof (_238.fixedcenter)!="undefined"&&_238.fixedcenter===true){
_238.tempcenter=_238.fixedcenter;
_238.fixedcenter=null;
}else{
_238.tempx=_238.x;
_238.tempy=_238.y;
}
_238.x=-10000;
_238.y=-10000;
}
_238.constraintoviewport=true;
_238.initshow=true;
if(_238.resizable!=null&&_238.resizable==false&&_23a==true){
ColdFusion.Window.resetHTML(_237);
ColdFusion.handleError(null,"window.getupdatedconfigobject.minhwnotallowed","widget",[_237],null,null,true);
return;
}
_238.collapsible=false;
_238.shadow=true;
_238.isConfObj=true;
return _238;
};
ColdFusion.Window.show=function(_23f){
var _240=ColdFusion.objectCache[_23f];
if(typeof (_240)!="undefined"&&_240!=null){
if(typeof (_240.isConfObj)!="undefined"&&_240.isConfObj==true){
_240.initshow=true;
var _241=ColdFusion.Window.createHTML(_23f,null,_240.url,_240,true);
ColdFusion.Window.createJSObj(_23f,_240.url,_241);
}else{
if(_240.isVisible()==false){
_240.show();
ColdFusion.Log.info("window.show.shown","widget",[_23f]);
}
if(_240.tempcenter!=null){
_240.center();
_240.tempcenter=null;
}else{
if(_240.getEl()&&_240.getEl().getX()>0&&_240.getEl().getY()>0){
_240.tempx=null;
_240.tempy=null;
}else{
if(_240.tempx!=null&&_240.tempy!=null){
_240.setPosition(_240.tempx,_240.tempy);
_240.tempx=null;
_240.tempy=null;
}else{
var x=_240.getEl().getX();
var y=_240.getEl().getY();
_240.setPosition(x+1,y+1);
_240.setPosition(x,y);
}
}
}
}
}else{
ColdFusion.handleError(null,"window.show.notfound","widget",[_23f],null,null,true);
}
};
ColdFusion.Window.hide=function(_244){
var _245=ColdFusion.objectCache[_244];
if(_245){
if(_245.isVisible&&_245.isVisible()==true){
_245.hide();
ColdFusion.Log.info("window.hide.hidden","widget",[_244]);
}
}else{
ColdFusion.handleError(null,"window.hide.notfound","widget",[_244],null,null,true);
}
};
ColdFusion.Window.onShow=function(_246,_247){
var _248=ColdFusion.objectCache[_246];
if(typeof (_248)!="undefined"&&_248!=null){
_248._cf_onShow=_247;
if(_248.addListener){
_248.addListener("show",ColdFusion.Window.onShowWrapper);
}
}else{
ColdFusion.handleError(null,"window.onshow.notfound","widget",[_246],null,null,true);
}
};
ColdFusion.Window.onShowWrapper=function(_249){
_249._cf_onShow.call(null,_249.cfwindowname);
};
ColdFusion.Window.onHide=function(_24a,_24b){
var _24c=ColdFusion.objectCache[_24a];
if(typeof (_24c)!="undefined"&&_24c!=null){
_24c._cf_onHide=_24b;
if(_24c.addListener){
_24c.addListener("hide",ColdFusion.Window.onHideWrapper);
}
}else{
ColdFusion.handleError(null,"window.onhide.notfound","widget",[_24a],null,null,true);
}
};
ColdFusion.Window.onHideWrapper=function(_24d){
_24d._cf_onHide.call(null,_24d.cfwindowname);
};
ColdFusion.Window.getWindowObject=function(_24e){
if(!_24e){
ColdFusion.handleError(null,"window.getwindowobject.emptyname","widget",null,null,null,true);
return;
}
var _24f=ColdFusion.objectCache[_24e];
if(_24f==null||(typeof (_24f.isConfObj)=="undefined"&&Ext.Window.prototype.isPrototypeOf(_24f)==false)){
ColdFusion.handleError(null,"window.getwindowobject.notfound","widget",[_24e],null,null,true);
return;
}
if(typeof (_24f.isConfObj)!="undefined"&&_24f.isConfObj==true){
_24f.initshow=true;
var _250=ColdFusion.Window.createHTML(_24e,null,_24f.url,_24f,true);
ColdFusion.Window.createJSObj(_24e,_24f.url,_250);
ColdFusion.Window.hide(_24e);
_24f=ColdFusion.objectCache[_24e];
}
return _24f;
};
