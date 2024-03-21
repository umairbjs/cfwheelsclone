/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Layout){
ColdFusion.Layout={};
}
var ACCORDION_TITLE_ICON_CSS_TEMPLATE=".{0} { background-image:url({1}); }";
if(!ColdFusion.MapVsAccordion){
ColdFusion.MapVsAccordion={};
}
ColdFusion.Layout.initializeTabLayout=function(id,_4f3,_4f4,_4f5,_4f6){
Ext.QuickTips.init();
var _4f7;
if(_4f4){
_4f7={renderTo:id,height:_4f4};
}else{
_4f7={renderTo:id,autoHeight:true};
}
if(_4f5&&_4f5!="undefined"){
_4f7.width=_4f5;
}else{
_4f7.autoWidth=true;
}
if(_4f3){
_4f7.tabPosition="bottom";
}else{
_4f7.enableTabScroll=true;
}
_4f7.plain=!_4f6;
var _4f8=new Ext.tab.Panel(_4f7);
ColdFusion.objectCache[id]=_4f8;
return _4f8;
};
ColdFusion.Layout.getTabLayout=function(_4f9){
var _4fa=ColdFusion.objectCache[_4f9];
if(!_4fa||!(_4fa instanceof Ext.TabPanel)){
ColdFusion.handleError(null,"layout.gettablayout.notfound","widget",[_4f9],null,null,true);
}
return _4fa;
};
ColdFusion.Layout.onTabActivate=function(tab){
tab._cf_visible=true;
if(tab._cf_dirtyview){
var _4fc=ColdFusion.bindHandlerCache[tab._cf_body];
if(_4fc){
_4fc();
}
tab._cf_dirtyview=false;
}
};
ColdFusion.Layout.onTabDeactivate=function(tab){
tab._cf_visible=false;
if(tab._cf_refreshOnActivate){
tab._cf_dirtyview=true;
}
};
ColdFusion.Layout.onTabClose=function(tab){
tab._cf_visible=false;
};
ColdFusion.Layout.addTab=function(_4ff,_500,name,_502,_503,_504,_505,_506,_507){
if(_503!=null&&_503.length==0){
_503=null;
}
var _508=_4ff.initialConfig.autoHeight;
if(typeof _508=="undefined"){
_508=false;
}
var _509=Ext.getCmp(name);
if(_509){
alert("Component with the name "+name+" already exists. Please use unique names for all the components. Layout will not be rendered");
return;
}
_509=new Ext.Panel({title:_502,contentEl:_500,_cf_body:_500,id:name,closable:_504,tabTip:_503,autoScroll:_507,autoShow:true,autoHeight:_508});
var tab=_4ff.add(_509);
if(_506){
_509.setDisabled(true);
}
tab._cf_visible=false;
tab._cf_dirtyview=true;
tab._cf_refreshOnActivate=_505;
tab.addListener("activate",ColdFusion.Layout.onTabActivate);
tab.addListener("deactivate",ColdFusion.Layout.onTabDeactivate);
tab.addListener("close",ColdFusion.Layout.onTabClose);
ColdFusion.objectCache[name]=tab;
var _50b=tab.height;
if(_50b&&_50b>1){
var _50c=document.getElementById(_500);
_50c.style.height=_50b;
}
};
ColdFusion.Layout.enableTab=function(_50d,_50e){
var _50f=ColdFusion.objectCache[_50d];
var _510=ColdFusion.objectCache[_50e];
if(_50f&&(_50f instanceof Ext.TabPanel)&&_510){
_510.setDisabled(false);
ColdFusion.Log.info("layout.enabletab.enabled","widget",[_50e,_50d]);
}else{
ColdFusion.handleError(null,"layout.enabletab.notfound","widget",[_50d],null,null,true);
}
};
ColdFusion.Layout.disableTab=function(_511,_512){
var _513=ColdFusion.objectCache[_511];
var _514=ColdFusion.objectCache[_512];
if(_513&&(_513 instanceof Ext.TabPanel)&&_514){
_514.setDisabled(true);
ColdFusion.Log.info("layout.disabletab.disabled","widget",[_512,_511]);
}else{
ColdFusion.handleError(null,"layout.disabletab.notfound","widget",[_511],null,null,true);
}
};
ColdFusion.Layout.selectTab=function(_515,_516){
var _517=ColdFusion.objectCache[_515];
var tab=ColdFusion.objectCache[_516];
if(_517&&(_517 instanceof Ext.TabPanel)&&tab){
_517.setActiveTab(tab);
ColdFusion.Log.info("layout.selecttab.selected","widget",[_516,_515]);
}else{
ColdFusion.handleError(null,"layout.selecttab.notfound","widget",[_515],null,null,true);
}
};
ColdFusion.Layout.hideTab=function(_519,_51a){
var _51b=ColdFusion.objectCache[_519];
if(_51b&&(_51b instanceof Ext.TabPanel)){
var _51c=ColdFusion.objectCache[_51a];
var _51d=false;
if(_51c){
if(_51b.getActiveTab()&&_51b.getActiveTab().getId()==_51a){
var i;
for(i=0;i<_51b.items.length;i++){
var _51f=_51b.getComponent(i);
if(_51f.hidden==false){
_51d=true;
_51f.show();
break;
}
}
if(_51d==false){
document.getElementById(_51a).style.display="none";
}
}
_51c.tab.hide();
ColdFusion.Log.info("layout.hidetab.hide","widget",[_51a,_519]);
}
}else{
ColdFusion.handleError(null,"layout.hidetab.notfound","widget",[_519],null,null,true);
}
};
ColdFusion.Layout.showTab=function(_520,_521){
var _522=ColdFusion.objectCache[_520];
var _523=ColdFusion.objectCache[_521];
if(_522&&(_522 instanceof Ext.TabPanel)&&_523){
_523.tab.show();
ColdFusion.Log.info("layout.showtab.show","widget",[_521,_520]);
}else{
ColdFusion.handleError(null,"layout.showtab.notfound","widget",[_520],null,null,true);
}
};
ColdFusion.Layout.disableSourceBind=function(_524){
var _525=ColdFusion.objectCache[_524];
if(_525==null||_525=="undefined"){
ColdFusion.handleError(null,"layout.disableSourceBind.notfound","widget",[_524],null,null,true);
}
_525._cf_dirtyview=false;
};
ColdFusion.Layout.enableSourceBind=function(_526){
var _527=ColdFusion.objectCache[_526];
if(_527==null||_527=="undefined"){
ColdFusion.handleError(null,"layout.enableSourceBind.notfound","widget",[_526],null,null,true);
}
_527._cf_dirtyview=true;
};
ColdFusion.Layout.createTab=function(_528,_529,_52a,_52b,_52c){
var _52d=ColdFusion.objectCache[_528];
var _52e=_529;
if(_528&&typeof (_528)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidname","widget",null,null,null,true);
return;
}
if(!_528||ColdFusion.trim(_528)==""){
ColdFusion.handleError(null,"layout.createtab.emptyname","widget",null,null,null,true);
return;
}
if(_529&&typeof (_529)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidareaname","widget",null,null,null,true);
return;
}
if(!_529||ColdFusion.trim(_529)==""){
ColdFusion.handleError(null,"layout.createtab.emptyareaname","widget",null,null,null,true);
return;
}
if(_52a&&typeof (_52a)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidtitle","widget",null,null,null,true);
return;
}
if(!_52a||ColdFusion.trim(_52a)==""){
ColdFusion.handleError(null,"layout.createtab.emptytitle","widget",null,null,null,true);
return;
}
if(_52b&&typeof (_52b)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidurl","widget",null,null,null,true);
return;
}
if(!_52b||ColdFusion.trim(_52b)==""){
ColdFusion.handleError(null,"layout.createtab.emptyurl","widget",null,null,null,true);
return;
}
_529="cf_layoutarea"+_529;
if(_52d&&(_52d instanceof Ext.TabPanel)){
var _52f=null;
var ele=document.getElementById(_529);
if(ele!=null){
ColdFusion.handleError(null,"layout.createtab.duplicateel","widget",[_529],null,null,true);
return;
}
var _531=false;
var _532=false;
var _533=false;
var _534=false;
var _535=false;
var _536=null;
if((_52d.items.length<=0)){
_533=true;
}
if(_52c!=null){
if(typeof (_52c)!="object"){
ColdFusion.handleError(null,"layout.createtab.invalidconfig","widget",null,null,null,true);
return;
}
if(typeof (_52c.closable)!="undefined"&&_52c.closable==true){
_531=true;
}
if(typeof (_52c.disabled)!="undefined"&&_52c.disabled==true){
_532=true;
}
if(typeof (_52c.selected)!="undefined"&&_52c.selected==true){
_533=true;
}
if(typeof (_52c.inithide)!="undefined"&&_52c.inithide==true){
_534=true;
}
if(typeof (_52c.tabtip)!="undefined"&&_52c.tabtip!=null){
_536=_52c.tabtip;
}
}
var _537=document.getElementById(_528);
if(_537){
var _538=document.getElementById(_528);
var _539=document.createElement("div");
_539.id=_529;
_539.className="ytab";
if(_52c!=null&&typeof (_52c.align)!="undefined"){
_539.align=_52c.align;
}
var _53a="";
if(_52d.tabheight){
_53a="height:"+_52d.tabheight+";";
}
if(_52c!=null&&typeof (_52c.style)!="undefined"){
var _53b=new String(_52c.style);
_53b=_53b.toLowerCase();
_53a=_53a+_53b;
}
if(_52c!=null&&typeof (_52c.overflow)!="undefined"){
var _53c=new String(_52c.overflow);
_53c=_53c.toLowerCase();
if(_53c!="visible"&&_53c!="auto"&&_53c!="scroll"&&_53c!="hidden"){
ColdFusion.handleError(null,"layout.createtab.invalidoverflow","widget",null,null,null,true);
return;
}
if(_53c.toLocaleLowerCase()==="hidden"){
_535=false;
}
_53a=_53a+"overflow:"+_53c+";";
}else{
_53a=_53a+"; overflow:auto;";
}
_539.style.cssText=_53a;
_538.appendChild(_539);
}
ColdFusion.Layout.addTab(_52d,_529,_52e,_52a,_536,_531,false,_532,_535);
ColdFusion.Log.info("layout.createtab.success","http",[_529,_528]);
if(_533==true){
ColdFusion.Layout.selectTab(_528,_52e);
}
if(_534==true){
ColdFusion.Layout.hideTab(_528,_52e);
}
if(_52b!=null&&typeof (_52b)!="undefined"&&_52b!=""){
if(_52b.indexOf("?")!=-1){
_52b=_52b+"&";
}else{
_52b=_52b+"?";
}
var _53d;
var _53e;
if(_52c){
_53d=_52c.callbackHandler;
_53e=_52c.errorHandler;
}
ColdFusion.Ajax.replaceHTML(_529,_52b,"GET",null,_53d,_53e);
}
}else{
ColdFusion.handleError(null,"layout.createtab.notfound","widget",[_528],null,null,true);
}
};
ColdFusion.Layout.getBorderLayout=function(_53f){
var _540=ColdFusion.objectCache[_53f];
if(!_540){
ColdFusion.handleError(null,"layout.getborderlayout.notfound","widget",[_53f],null,null,true);
}
return _540;
};
ColdFusion.Layout.showArea=function(_541,_542){
var _543=ColdFusion.Layout.convertPositionToDirection(_542);
var _544=ColdFusion.objectCache[_541];
var _545;
if(_544){
var _546=_544.items;
for(var i=0;i<_546.getCount();i++){
var _548=_546.items[i];
if(_548 instanceof Ext.Panel&&_548.region==_543){
_545=_548;
break;
}
}
if(_545){
_545.show();
_545.expand();
ColdFusion.Log.info("layout.showarea.shown","widget",[_542,_541]);
}else{
ColdFusion.handleError(null,"layout.showarea.areanotfound","widget",[_542],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.showarea.notfound","widget",[_541],null,null,true);
}
};
ColdFusion.Layout.hideArea=function(_549,_54a){
var _54b=ColdFusion.Layout.convertPositionToDirection(_54a);
var _54c=ColdFusion.objectCache[_549];
var _54d;
if(_54c){
var _54e=_54c.items;
for(var i=0;i<_54e.getCount();i++){
var _550=_54e.items[i];
if(_550 instanceof Ext.Panel&&_550.region==_54b){
_54d=_550;
break;
}
}
if(_54d){
_54d.hide();
ColdFusion.Log.info("layout.hidearea.hidden","widget",[_54a,_549]);
}else{
ColdFusion.handleError(null,"layout.hidearea.areanotfound","widget",[_54a],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.hidearea.notfound","widget",[_549],null,null,true);
}
};
ColdFusion.Layout.collapseArea=function(_551,_552){
var _553=ColdFusion.Layout.convertPositionToDirection(_552);
var _554=ColdFusion.objectCache[_551];
var _555;
if(_554){
var _556=_554.items;
for(var i=0;i<_556.getCount();i++){
var _558=_556.items[i];
if(_558 instanceof Ext.Panel&&_558.region==_553){
_555=_558;
break;
}
}
if(_555){
_555.collapse();
ColdFusion.Log.info("layout.collpasearea.collapsed","widget",[_552,_551]);
}else{
ColdFusion.handleError(null,"layout.collpasearea.areanotfound","widget",[_552],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.collpasearea.notfound","widget",[_552],null,null,true);
}
};
ColdFusion.Layout.expandArea=function(_559,_55a){
var _55b=ColdFusion.Layout.convertPositionToDirection(_55a);
var _55c=ColdFusion.objectCache[_559];
var _55d;
if(_55c){
var _55e=_55c.items;
for(var i=0;i<_55e.getCount();i++){
var _560=_55e.items[i];
if(_560 instanceof Ext.Panel&&_560.region==_55b){
_55d=_560;
break;
}
}
if(_55d){
_55d.expand();
ColdFusion.Log.info("layout.expandarea.expanded","widget",[_55a,_559]);
}else{
ColdFusion.handleError(null,"layout.expandarea.areanotfound","widget",[_55a],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.expandarea.notfound","widget",[_55a],null,null,true);
}
};
ColdFusion.Layout.printObject=function(obj){
var str="";
for(key in obj){
str=str+"  "+key+"=";
value=obj[key];
if(typeof (value)==Object){
value=$G.printObject(value);
}
str+=value;
}
return str;
};
ColdFusion.Layout.InitAccordion=function(_563,_564,_565,_566,_567,_568,_569,_56a){
var _56b=false;
if(_565.toUpperCase()=="LEFT"){
_56b=true;
}
if(_568==null||typeof (_568)=="undefined"){
_567=false;
}
var _56c={activeOnTop:_564,collapseFirst:_56b,titleCollapse:_566,fill:_567};
var _56d={renderTo:_563,layoutConfig:_56c,items:_56a,layout:"accordion"};
if(_568==null||typeof (_568)=="undefined"){
_56d.autoHeight=true;
_56d.height=600;
}else{
_56d.height=_568;
}
_56d.flex=1;
if(_569==null||typeof (_569)=="undefined"){
_56d.autoWidth=true;
}else{
_56d.width=_569;
}
_56d.align="stretch";
_56d.preventRegister=true;
var _56e=new Ext.Panel(_56d);
ColdFusion.objectCache[_563]=_56e;
ColdFusion.Log.info("layout.accordion.initialized","widget",[_563]);
return _56e;
};
ColdFusion.Layout.InitAccordionChildPanel=function(_56f,_570,_571,_572,_573,_574,_575,_576){
if(_571==null||typeof (_571)==undefined||_571.length==0){
_571="  ";
}
var _577={contentEl:_56f,id:_570,title:_571,collapsible:_572,closable:_573,autoScroll:_574,_cf_body:_56f};
if(_575&&typeof _575=="string"){
_577.iconCls=_575;
}
_577.preventRegister=true;
var _578=new Ext.Panel(_577);
_578._cf_visible=false;
_578._cf_dirtyview=true;
_578._cf_refreshOnActivate=_576;
_578.on("expand",ColdFusion.Layout.onAccordionPanelExpand,this);
_578.on("collapse",ColdFusion.Layout.onAccordionPanelCollapse,this);
_578.on("hide",ColdFusion.Layout.onAccordionPanelHide,this);
_578.on("show",ColdFusion.Layout.onAccordionPanelExpand,this);
ColdFusion.objectCache[_570]=_578;
ColdFusion.Log.info("layout.accordion.childinitialized","widget",[_570]);
return _578;
};
ColdFusion.Layout.getAccordionLayout=function(_579){
var _57a=ColdFusion.objectCache[_579];
if(!_57a||!(_57a instanceof Ext.Panel)){
ColdFusion.handleError(null,"layout.getaccordionlayout.notfound","widget",[_579],null,null,true);
}
return _57a;
};
ColdFusion.Layout.onAccordionPanelExpand=function(_57b){
_57b._cf_visible=true;
if(_57b._cf_dirtyview){
var _57c=ColdFusion.bindHandlerCache[_57b._cf_body];
if(_57c){
_57c();
}
_57b._cf_dirtyview=false;
}
var el=Ext.get(_57b.contentEl);
el.move("left",1);
el.move("right",1);
var _57e=ColdFusion.MapVsAccordion[_57b._cf_body];
if(_57e!=undefined){
var _57f=$MAP.getMapPanelObject(_57e);
if(_57f!=undefined){
if(_57f.initShow===true){
$MAP.show(_57e);
}
}
}
};
ColdFusion.Layout.onAccordionPanelCollapse=function(_580){
_580._cf_visible=false;
if(_580._cf_refreshOnActivate){
_580._cf_dirtyview=true;
}
};
ColdFusion.Layout.onAccordionPanelHide=function(_581){
_581._cf_visible=false;
};
ColdFusion.Layout.hideAccordion=function(_582,_583){
var _584=ColdFusion.objectCache[_582];
var _585=ColdFusion.objectCache[_583];
if(!_584||!_584 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.hideaccordion.layoutnotfound","widget",[_582],null,null,true);
}
if(!_585||!_585 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.hideaccordion.panelnotfound","widget",[_583],null,null,true);
}
_585.hide();
ColdFusion.Log.info("layout.hideaccordion.hidden","widget",[_583,_582]);
};
ColdFusion.Layout.showAccordion=function(_586,_587){
var _588=ColdFusion.objectCache[_586];
var _589=ColdFusion.objectCache[_587];
if(!_588||!_588 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.showaccordion.layoutnotfound","widget",[_586],null,null,true);
}
if(!_589||!_589 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.showaccordion.panelnotfound","widget",[_587],null,null,true);
}
_589.show();
ColdFusion.Log.info("layout.showaccordion.shown","widget",[_587,_586]);
};
ColdFusion.Layout.expandAccordion=function(_58a,_58b){
var _58c=ColdFusion.objectCache[_58a];
var _58d=ColdFusion.objectCache[_58b];
if(!_58c||!_58c instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.expandaccordion.layoutnotfound","widget",[_58a],null,null,true);
}
if(!_58d||!_58d instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.expandaccordion.panelnotfound","widget",[_58b],null,null,true);
}
_58d.expand();
ColdFusion.Log.info("layout.expandaccordion.expanded","widget",[_58b,_58a]);
};
ColdFusion.Layout.selectAccordion=function(_58e,_58f){
return ColdFusion.Layout.expandAccordion(_58e,_58f);
};
ColdFusion.Layout.collapseAccordion=function(_590,_591){
var _592=ColdFusion.objectCache[_590];
var _593=ColdFusion.objectCache[_591];
if(!_592||!_592 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.collapseaccordion.layoutnotfound","widget",[_590],null,null,true);
}
if(!_593||!_593 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.collapseaccordion.panelnotfound","widget",[_591],null,null,true);
}
_593.collapse();
ColdFusion.Log.info("layout.collapseaccordion.collapsed","widget",[_591,_590]);
};
ColdFusion.Layout.createAccordionPanel=function(_594,_595,_596,url,_598){
var _599=ColdFusion.objectCache[_594];
var _59a=_595;
if(_594&&typeof (_594)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidname","widget",[_594],null,null,true);
return;
}
if(!_594||ColdFusion.trim(_594)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.emptyname","widget",[_594],null,null,true);
return;
}
if(_595&&typeof (_595)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidaccordionpanelname","widget",[_595],null,null,true);
return;
}
if(!_595||ColdFusion.trim(_595)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.emptyaccordionpanelname","widget",[_595],null,null,true);
return;
}
if(_596&&typeof (_596)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidtitle","widget",[_595],null,null,true);
return;
}
if(!_596||ColdFusion.trim(_596)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidtitle","widget",[_595],null,null,true);
return;
}
if(url&&typeof (url)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidurl","widget",[_595],null,null,true);
return;
}
if(!url||ColdFusion.trim(url)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidurl","widget",[_595],null,null,true);
return;
}
_595="cf_layoutarea"+_59a;
if(_599&&(_599 instanceof Ext.Panel)){
var _59b=null;
var ele=document.getElementById(_595);
if(ele!=null){
ColdFusion.handleError(null,"layout.createaccordionpanel.duplicateel","widget",[_595],null,null,true);
return;
}
var _59d=true;
var _59e;
var _59f=false;
var _5a0=null;
if(_598!=null){
if(typeof (_598)!="object"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidconfig","widget",[_595],null,null,true);
return;
}
}
if(_598&&typeof (_598.selected)!="undefined"&&_598.selected==true){
_59f=true;
}
if(_598&&_598.titleicon){
if(typeof _598.titleicon!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidtitleicon","widget",[_595],null,null,true);
return;
}
var _5a1=Ext.String.format(ACCORDION_TITLE_ICON_CSS_TEMPLATE,_595,_598.titleicon);
Ext.util.CSS.createStyleSheet(_5a1,_595+"_cf_icon");
_5a0=_595;
}
var _5a2=_599.layoutConfig;
var _5a3=true;
if(_5a2&&typeof _5a2.fill!="undefined"){
_5a3=_5a2.fill;
}
if(_598!=null&&typeof (_598.overflow)!="undefined"){
var _59e=new String(_598.overflow);
_59e=_59e.toLowerCase();
if(_59e!="visible"&&_59e!="auto"&&_59e!="scroll"&&_59e!="hidden"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidoverflow","widget",[_595],null,null,true);
return;
}
if(!_5a3&&(_59e=="auto"||_59e=="scroll")){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidoverflowforfillheight","widget",[_595],null,null,true);
return;
}
if(_59e=="hidden"){
_59d=false;
}
}else{
_59e="auto";
_59d=true;
}
var _5a4=document.getElementById(_594);
if(_5a4){
var _5a5=document.getElementById(_594);
var _5a6=document.createElement("div");
_5a6.id=_595;
if(_598!=null&&typeof (_598.align)!="undefined"){
_5a6.align=_598.align;
}
var _5a7="";
if(_599.height){
_5a7="height:"+_599.height+";";
}
if(_598!=null&&typeof (_598.style)!="undefined"){
var _5a8=new String(_598.style);
_5a8=_5a8.toLowerCase();
_5a7=_5a7+_5a8;
}
_5a7=_5a7+"overflow:"+_59e+";";
_5a6.style.cssText=_5a7;
_5a5.appendChild(_5a6);
}
var _5a9=true;
var _5aa=true;
itemobj=ColdFusion.Layout.InitAccordionChildPanel(_595,_59a,_596,_5aa,_5a9,_59d,_5a0,false);
_599.add(itemobj);
if(url!=null&&typeof (url)!="undefined"&&url!=""){
if(url.indexOf("?")!=-1){
url=url+"&";
}else{
url=url+"?";
}
var _5ab;
var _5ac;
if(_598){
_5ab=_598.callbackHandler;
_5ac=_598.errorHandler;
}
ColdFusion.Ajax.replaceHTML(_595,url,"GET",null,_5ab,_5ac);
}
_599.updateLayout();
if(_59f){
ColdFusion.Layout.expandAccordion(_594,_59a);
}
ColdFusion.Log.info("layout.createaccordionpanel.created","widget",[_595]);
}else{
ColdFusion.handleError(null,"layout.createaccordionpanel.layoutnotfound","widget",[_594],null,null,true);
}
};
ColdFusion.Layout.initViewport=function(_5ad,item){
var _5af=new Array();
_5af[0]=item;
var _5b0={items:_5af,layout:"fit",name:_5ad};
var _5b1=new Ext.Viewport(_5b0);
return _5b1;
};
ColdFusion.Layout.convertPositionToDirection=function(_5b2){
if(_5b2.toUpperCase()=="LEFT"){
return "west";
}else{
if(_5b2.toUpperCase()=="RIGHT"){
return "east";
}else{
if(_5b2.toUpperCase()=="CENTER"){
return "center";
}else{
if(_5b2.toUpperCase()=="BOTTOM"){
return "south";
}else{
if(_5b2.toUpperCase()=="TOP"){
return "north";
}
}
}
}
}
};
ColdFusion.Layout.addMapInAccordionMapping=function(_5b3,map){
ColdFusion.MapVsAccordion[_5b3]=map;
};
