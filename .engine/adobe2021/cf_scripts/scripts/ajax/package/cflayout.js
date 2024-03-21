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
ColdFusion.Layout.initializeTabLayout=function(id,_82c,_82d,_82e,_82f){
Ext.QuickTips.init();
var _830;
if(_82d){
_830={renderTo:id,height:_82d};
}else{
_830={renderTo:id,autoHeight:true};
}
if(_82e&&_82e!="undefined"){
_830.width=_82e;
}else{
_830.autoWidth=true;
}
if(_82c){
_830.tabPosition="bottom";
}else{
_830.enableTabScroll=true;
}
_830.plain=!_82f;
var _831=new Ext.tab.Panel(_830);
ColdFusion.objectCache[id]=_831;
return _831;
};
ColdFusion.Layout.getTabLayout=function(_832){
var _833=ColdFusion.objectCache[_832];
if(!_833||!(_833 instanceof Ext.TabPanel)){
ColdFusion.handleError(null,"layout.gettablayout.notfound","widget",[_832],null,null,true);
}
return _833;
};
ColdFusion.Layout.onTabActivate=function(tab){
tab._cf_visible=true;
if(tab._cf_dirtyview){
var _835=ColdFusion.bindHandlerCache[tab._cf_body];
if(_835){
_835();
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
ColdFusion.Layout.addTab=function(_838,_839,name,_83b,_83c,_83d,_83e,_83f,_840){
if(_83c!=null&&_83c.length==0){
_83c=null;
}
var _841=_838.initialConfig.autoHeight;
if(typeof _841=="undefined"){
_841=false;
}
var _842=Ext.getCmp(name);
if(_842){
alert("Component with the name "+name+" already exists. Please use unique names for all the components. Layout will not be rendered");
return;
}
_842=new Ext.Panel({title:_83b,contentEl:_839,_cf_body:_839,id:name,closable:_83d,tabTip:_83c,autoScroll:_840,autoShow:true,autoHeight:_841});
var tab=_838.add(_842);
if(_83f){
_842.setDisabled(true);
}
tab._cf_visible=false;
tab._cf_dirtyview=true;
tab._cf_refreshOnActivate=_83e;
tab.addListener("activate",ColdFusion.Layout.onTabActivate);
tab.addListener("deactivate",ColdFusion.Layout.onTabDeactivate);
tab.addListener("close",ColdFusion.Layout.onTabClose);
ColdFusion.objectCache[name]=tab;
var _844=tab.height;
if(_844&&_844>1){
var _845=document.getElementById(_839);
_845.style.height=_844;
}
};
ColdFusion.Layout.enableTab=function(_846,_847){
var _848=ColdFusion.objectCache[_846];
var _849=ColdFusion.objectCache[_847];
if(_848&&(_848 instanceof Ext.TabPanel)&&_849){
_849.setDisabled(false);
ColdFusion.Log.info("layout.enabletab.enabled","widget",[_847,_846]);
}else{
ColdFusion.handleError(null,"layout.enabletab.notfound","widget",[_846],null,null,true);
}
};
ColdFusion.Layout.disableTab=function(_84a,_84b){
var _84c=ColdFusion.objectCache[_84a];
var _84d=ColdFusion.objectCache[_84b];
if(_84c&&(_84c instanceof Ext.TabPanel)&&_84d){
_84d.setDisabled(true);
ColdFusion.Log.info("layout.disabletab.disabled","widget",[_84b,_84a]);
}else{
ColdFusion.handleError(null,"layout.disabletab.notfound","widget",[_84a],null,null,true);
}
};
ColdFusion.Layout.selectTab=function(_84e,_84f){
var _850=ColdFusion.objectCache[_84e];
var tab=ColdFusion.objectCache[_84f];
if(_850&&(_850 instanceof Ext.TabPanel)&&tab){
_850.setActiveTab(tab);
ColdFusion.Log.info("layout.selecttab.selected","widget",[_84f,_84e]);
}else{
ColdFusion.handleError(null,"layout.selecttab.notfound","widget",[_84e],null,null,true);
}
};
ColdFusion.Layout.hideTab=function(_852,_853){
var _854=ColdFusion.objectCache[_852];
if(_854&&(_854 instanceof Ext.TabPanel)){
var _855=ColdFusion.objectCache[_853];
var _856=false;
if(_855){
if(_854.getActiveTab()&&_854.getActiveTab().getId()==_853){
var i;
for(i=0;i<_854.items.length;i++){
var _858=_854.getComponent(i);
if(_858.hidden==false){
_856=true;
_858.show();
break;
}
}
if(_856==false){
document.getElementById(_853).style.display="none";
}
}
_855.tab.hide();
ColdFusion.Log.info("layout.hidetab.hide","widget",[_853,_852]);
}
}else{
ColdFusion.handleError(null,"layout.hidetab.notfound","widget",[_852],null,null,true);
}
};
ColdFusion.Layout.showTab=function(_859,_85a){
var _85b=ColdFusion.objectCache[_859];
var _85c=ColdFusion.objectCache[_85a];
if(_85b&&(_85b instanceof Ext.TabPanel)&&_85c){
_85c.tab.show();
ColdFusion.Log.info("layout.showtab.show","widget",[_85a,_859]);
}else{
ColdFusion.handleError(null,"layout.showtab.notfound","widget",[_859],null,null,true);
}
};
ColdFusion.Layout.disableSourceBind=function(_85d){
var _85e=ColdFusion.objectCache[_85d];
if(_85e==null||_85e=="undefined"){
ColdFusion.handleError(null,"layout.disableSourceBind.notfound","widget",[_85d],null,null,true);
}
_85e._cf_dirtyview=false;
};
ColdFusion.Layout.enableSourceBind=function(_85f){
var _860=ColdFusion.objectCache[_85f];
if(_860==null||_860=="undefined"){
ColdFusion.handleError(null,"layout.enableSourceBind.notfound","widget",[_85f],null,null,true);
}
_860._cf_dirtyview=true;
};
ColdFusion.Layout.createTab=function(_861,_862,_863,_864,_865){
var _866=ColdFusion.objectCache[_861];
var _867=_862;
if(_861&&typeof (_861)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidname","widget",null,null,null,true);
return;
}
if(!_861||ColdFusion.trim(_861)==""){
ColdFusion.handleError(null,"layout.createtab.emptyname","widget",null,null,null,true);
return;
}
if(_862&&typeof (_862)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidareaname","widget",null,null,null,true);
return;
}
if(!_862||ColdFusion.trim(_862)==""){
ColdFusion.handleError(null,"layout.createtab.emptyareaname","widget",null,null,null,true);
return;
}
if(_863&&typeof (_863)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidtitle","widget",null,null,null,true);
return;
}
if(!_863||ColdFusion.trim(_863)==""){
ColdFusion.handleError(null,"layout.createtab.emptytitle","widget",null,null,null,true);
return;
}
if(_864&&typeof (_864)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidurl","widget",null,null,null,true);
return;
}
if(!_864||ColdFusion.trim(_864)==""){
ColdFusion.handleError(null,"layout.createtab.emptyurl","widget",null,null,null,true);
return;
}
_862="cf_layoutarea"+_862;
if(_866&&(_866 instanceof Ext.TabPanel)){
var _868=null;
var ele=document.getElementById(_862);
if(ele!=null){
ColdFusion.handleError(null,"layout.createtab.duplicateel","widget",[_862],null,null,true);
return;
}
var _86a=false;
var _86b=false;
var _86c=false;
var _86d=false;
var _86e=false;
var _86f=null;
if((_866.items.length<=0)){
_86c=true;
}
if(_865!=null){
if(typeof (_865)!="object"){
ColdFusion.handleError(null,"layout.createtab.invalidconfig","widget",null,null,null,true);
return;
}
if(typeof (_865.closable)!="undefined"&&_865.closable==true){
_86a=true;
}
if(typeof (_865.disabled)!="undefined"&&_865.disabled==true){
_86b=true;
}
if(typeof (_865.selected)!="undefined"&&_865.selected==true){
_86c=true;
}
if(typeof (_865.inithide)!="undefined"&&_865.inithide==true){
_86d=true;
}
if(typeof (_865.tabtip)!="undefined"&&_865.tabtip!=null){
_86f=_865.tabtip;
}
}
var _870=document.getElementById(_861);
if(_870){
var _871=document.getElementById(_861);
var _872=document.createElement("div");
_872.id=_862;
_872.className="ytab";
if(_865!=null&&typeof (_865.align)!="undefined"){
_872.align=_865.align;
}
var _873="display:none";
if(_866.tabheight){
_873="height:"+_866.tabheight+";";
}
if(_865!=null&&typeof (_865.style)!="undefined"){
var _874=new String(_865.style);
_874=_874.toLowerCase();
_873=_873+_874;
}
if(_865!=null&&typeof (_865.overflow)!="undefined"){
var _875=new String(_865.overflow);
_875=_875.toLowerCase();
if(_875!="visible"&&_875!="auto"&&_875!="scroll"&&_875!="hidden"){
ColdFusion.handleError(null,"layout.createtab.invalidoverflow","widget",null,null,null,true);
return;
}
if(_875.toLocaleLowerCase()==="hidden"){
_86e=false;
}
_873=_873+"overflow:"+_875+";";
}else{
_873=_873+"; overflow:auto;";
}
_872.style.cssText=_873;
_871.appendChild(_872);
}
ColdFusion.Layout.addTab(_866,_862,_867,_863,_86f,_86a,false,_86b,_86e);
ColdFusion.Log.info("layout.createtab.success","http",[_862,_861]);
if(_86c==true){
ColdFusion.Layout.selectTab(_861,_867);
}
if(_86d==true){
ColdFusion.Layout.hideTab(_861,_867);
}
if(_864!=null&&typeof (_864)!="undefined"&&_864!=""){
if(_864.indexOf("?")!=-1){
_864=_864+"&";
}else{
_864=_864+"?";
}
var _876;
var _877;
if(_865){
_876=_865.callbackHandler;
_877=_865.errorHandler;
}
ColdFusion.Ajax.replaceHTML(_862,_864,"GET",null,_876,_877);
}
}else{
ColdFusion.handleError(null,"layout.createtab.notfound","widget",[_861],null,null,true);
}
};
ColdFusion.Layout.getBorderLayout=function(_878){
var _879=ColdFusion.objectCache[_878];
if(!_879){
ColdFusion.handleError(null,"layout.getborderlayout.notfound","widget",[_878],null,null,true);
}
return _879;
};
ColdFusion.Layout.showArea=function(_87a,_87b){
var _87c=ColdFusion.Layout.convertPositionToDirection(_87b);
var _87d=ColdFusion.objectCache[_87a];
var _87e;
if(_87d){
var _87f=_87d.items;
for(var i=0;i<_87f.getCount();i++){
var _881=_87f.items[i];
if(_881 instanceof Ext.Panel&&_881.region==_87c){
_87e=_881;
break;
}
}
if(_87e){
_87e.show();
_87e.expand();
ColdFusion.Log.info("layout.showarea.shown","widget",[_87b,_87a]);
}else{
ColdFusion.handleError(null,"layout.showarea.areanotfound","widget",[_87b],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.showarea.notfound","widget",[_87a],null,null,true);
}
};
ColdFusion.Layout.hideArea=function(_882,_883){
var _884=ColdFusion.Layout.convertPositionToDirection(_883);
var _885=ColdFusion.objectCache[_882];
var _886;
if(_885){
var _887=_885.items;
for(var i=0;i<_887.getCount();i++){
var _889=_887.items[i];
if(_889 instanceof Ext.Panel&&_889.region==_884){
_886=_889;
break;
}
}
if(_886){
_886.hide();
ColdFusion.Log.info("layout.hidearea.hidden","widget",[_883,_882]);
}else{
ColdFusion.handleError(null,"layout.hidearea.areanotfound","widget",[_883],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.hidearea.notfound","widget",[_882],null,null,true);
}
};
ColdFusion.Layout.collapseArea=function(_88a,_88b){
var _88c=ColdFusion.Layout.convertPositionToDirection(_88b);
var _88d=ColdFusion.objectCache[_88a];
var _88e;
if(_88d){
var _88f=_88d.items;
for(var i=0;i<_88f.getCount();i++){
var _891=_88f.items[i];
if(_891 instanceof Ext.Panel&&_891.region==_88c){
_88e=_891;
break;
}
}
if(_88e){
_88e.collapse();
ColdFusion.Log.info("layout.collpasearea.collapsed","widget",[_88b,_88a]);
}else{
ColdFusion.handleError(null,"layout.collpasearea.areanotfound","widget",[_88b],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.collpasearea.notfound","widget",[_88b],null,null,true);
}
};
ColdFusion.Layout.expandArea=function(_892,_893){
var _894=ColdFusion.Layout.convertPositionToDirection(_893);
var _895=ColdFusion.objectCache[_892];
var _896;
if(_895){
var _897=_895.items;
for(var i=0;i<_897.getCount();i++){
var _899=_897.items[i];
if(_899 instanceof Ext.Panel&&_899.region==_894){
_896=_899;
break;
}
}
if(_896){
_896.expand();
ColdFusion.Log.info("layout.expandarea.expanded","widget",[_893,_892]);
}else{
ColdFusion.handleError(null,"layout.expandarea.areanotfound","widget",[_893],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.expandarea.notfound","widget",[_893],null,null,true);
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
ColdFusion.Layout.InitAccordion=function(_89c,_89d,_89e,_89f,_8a0,_8a1,_8a2,_8a3){
var _8a4=false;
if(_89e.toUpperCase()=="LEFT"){
_8a4=true;
}
if(_8a1==null||typeof (_8a1)=="undefined"){
_8a0=false;
}
var _8a5={activeOnTop:_89d,collapseFirst:_8a4,titleCollapse:_89f,fill:_8a0};
var _8a6={renderTo:_89c,layoutConfig:_8a5,items:_8a3,layout:"accordion"};
if(_8a1==null||typeof (_8a1)=="undefined"){
_8a6.autoHeight=true;
_8a6.height=600;
}else{
_8a6.height=_8a1;
}
_8a6.flex=1;
if(_8a2==null||typeof (_8a2)=="undefined"){
_8a6.autoWidth=true;
}else{
_8a6.width=_8a2;
}
_8a6.align="stretch";
_8a6.preventRegister=true;
var _8a7=new Ext.Panel(_8a6);
ColdFusion.objectCache[_89c]=_8a7;
ColdFusion.Log.info("layout.accordion.initialized","widget",[_89c]);
return _8a7;
};
ColdFusion.Layout.InitAccordionChildPanel=function(_8a8,_8a9,_8aa,_8ab,_8ac,_8ad,_8ae,_8af){
if(_8aa==null||typeof (_8aa)==undefined||_8aa.length==0){
_8aa="  ";
}
var _8b0={contentEl:_8a8,id:_8a9,title:_8aa,collapsible:_8ab,closable:_8ac,autoScroll:_8ad,_cf_body:_8a8};
if(_8ae&&typeof _8ae=="string"){
_8b0.iconCls=_8ae;
}
_8b0.preventRegister=true;
var _8b1=new Ext.Panel(_8b0);
_8b1._cf_visible=false;
_8b1._cf_dirtyview=true;
_8b1._cf_refreshOnActivate=_8af;
_8b1.on("expand",ColdFusion.Layout.onAccordionPanelExpand,this);
_8b1.on("collapse",ColdFusion.Layout.onAccordionPanelCollapse,this);
_8b1.on("hide",ColdFusion.Layout.onAccordionPanelHide,this);
_8b1.on("show",ColdFusion.Layout.onAccordionPanelExpand,this);
ColdFusion.objectCache[_8a9]=_8b1;
ColdFusion.Log.info("layout.accordion.childinitialized","widget",[_8a9]);
return _8b1;
};
ColdFusion.Layout.getAccordionLayout=function(_8b2){
var _8b3=ColdFusion.objectCache[_8b2];
if(!_8b3||!(_8b3 instanceof Ext.Panel)){
ColdFusion.handleError(null,"layout.getaccordionlayout.notfound","widget",[_8b2],null,null,true);
}
return _8b3;
};
ColdFusion.Layout.onAccordionPanelExpand=function(_8b4){
_8b4._cf_visible=true;
if(_8b4._cf_dirtyview){
var _8b5=ColdFusion.bindHandlerCache[_8b4._cf_body];
if(_8b5){
_8b5();
}
_8b4._cf_dirtyview=false;
}
var el=Ext.get(_8b4.contentEl);
el.move("left",1);
el.move("right",1);
var _8b7=ColdFusion.MapVsAccordion[_8b4._cf_body];
if(_8b7!=undefined){
var _8b8=$MAP.getMapPanelObject(_8b7);
if(_8b8!=undefined){
if(_8b8.initShow===true){
$MAP.show(_8b7);
}
}
}
};
ColdFusion.Layout.onAccordionPanelCollapse=function(_8b9){
_8b9._cf_visible=false;
if(_8b9._cf_refreshOnActivate){
_8b9._cf_dirtyview=true;
}
};
ColdFusion.Layout.onAccordionPanelHide=function(_8ba){
_8ba._cf_visible=false;
};
ColdFusion.Layout.hideAccordion=function(_8bb,_8bc){
var _8bd=ColdFusion.objectCache[_8bb];
var _8be=ColdFusion.objectCache[_8bc];
if(!_8bd||!_8bd instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.hideaccordion.layoutnotfound","widget",[_8bb],null,null,true);
}
if(!_8be||!_8be instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.hideaccordion.panelnotfound","widget",[_8bc],null,null,true);
}
_8be.hide();
ColdFusion.Log.info("layout.hideaccordion.hidden","widget",[_8bc,_8bb]);
};
ColdFusion.Layout.showAccordion=function(_8bf,_8c0){
var _8c1=ColdFusion.objectCache[_8bf];
var _8c2=ColdFusion.objectCache[_8c0];
if(!_8c1||!_8c1 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.showaccordion.layoutnotfound","widget",[_8bf],null,null,true);
}
if(!_8c2||!_8c2 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.showaccordion.panelnotfound","widget",[_8c0],null,null,true);
}
_8c2.show();
ColdFusion.Log.info("layout.showaccordion.shown","widget",[_8c0,_8bf]);
};
ColdFusion.Layout.expandAccordion=function(_8c3,_8c4){
var _8c5=ColdFusion.objectCache[_8c3];
var _8c6=ColdFusion.objectCache[_8c4];
if(!_8c5||!_8c5 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.expandaccordion.layoutnotfound","widget",[_8c3],null,null,true);
}
if(!_8c6||!_8c6 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.expandaccordion.panelnotfound","widget",[_8c4],null,null,true);
}
_8c6.expand();
ColdFusion.Log.info("layout.expandaccordion.expanded","widget",[_8c4,_8c3]);
};
ColdFusion.Layout.selectAccordion=function(_8c7,_8c8){
return ColdFusion.Layout.expandAccordion(_8c7,_8c8);
};
ColdFusion.Layout.collapseAccordion=function(_8c9,_8ca){
var _8cb=ColdFusion.objectCache[_8c9];
var _8cc=ColdFusion.objectCache[_8ca];
if(!_8cb||!_8cb instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.collapseaccordion.layoutnotfound","widget",[_8c9],null,null,true);
}
if(!_8cc||!_8cc instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.collapseaccordion.panelnotfound","widget",[_8ca],null,null,true);
}
_8cc.collapse();
ColdFusion.Log.info("layout.collapseaccordion.collapsed","widget",[_8ca,_8c9]);
};
ColdFusion.Layout.createAccordionPanel=function(_8cd,_8ce,_8cf,url,_8d1){
var _8d2=ColdFusion.objectCache[_8cd];
var _8d3=_8ce;
if(_8cd&&typeof (_8cd)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidname","widget",[_8cd],null,null,true);
return;
}
if(!_8cd||ColdFusion.trim(_8cd)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.emptyname","widget",[_8cd],null,null,true);
return;
}
if(_8ce&&typeof (_8ce)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidaccordionpanelname","widget",[_8ce],null,null,true);
return;
}
if(!_8ce||ColdFusion.trim(_8ce)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.emptyaccordionpanelname","widget",[_8ce],null,null,true);
return;
}
if(_8cf&&typeof (_8cf)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidtitle","widget",[_8ce],null,null,true);
return;
}
if(!_8cf||ColdFusion.trim(_8cf)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidtitle","widget",[_8ce],null,null,true);
return;
}
if(url&&typeof (url)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidurl","widget",[_8ce],null,null,true);
return;
}
if(!url||ColdFusion.trim(url)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidurl","widget",[_8ce],null,null,true);
return;
}
_8ce="cf_layoutarea"+_8d3;
if(_8d2&&(_8d2 instanceof Ext.Panel)){
var _8d4=null;
var ele=document.getElementById(_8ce);
if(ele!=null){
ColdFusion.handleError(null,"layout.createaccordionpanel.duplicateel","widget",[_8ce],null,null,true);
return;
}
var _8d6=true;
var _8d7;
var _8d8=false;
var _8d9=null;
if(_8d1!=null){
if(typeof (_8d1)!="object"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidconfig","widget",[_8ce],null,null,true);
return;
}
}
if(_8d1&&typeof (_8d1.selected)!="undefined"&&_8d1.selected==true){
_8d8=true;
}
if(_8d1&&_8d1.titleicon){
if(typeof _8d1.titleicon!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidtitleicon","widget",[_8ce],null,null,true);
return;
}
var _8da=Ext.String.format(ACCORDION_TITLE_ICON_CSS_TEMPLATE,_8ce,_8d1.titleicon);
Ext.util.CSS.createStyleSheet(_8da,_8ce+"_cf_icon");
_8d9=_8ce;
}
var _8db=_8d2.layoutConfig;
var _8dc=true;
if(_8db&&typeof _8db.fill!="undefined"){
_8dc=_8db.fill;
}
if(_8d1!=null&&typeof (_8d1.overflow)!="undefined"){
var _8d7=new String(_8d1.overflow);
_8d7=_8d7.toLowerCase();
if(_8d7!="visible"&&_8d7!="auto"&&_8d7!="scroll"&&_8d7!="hidden"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidoverflow","widget",[_8ce],null,null,true);
return;
}
if(!_8dc&&(_8d7=="auto"||_8d7=="scroll")){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidoverflowforfillheight","widget",[_8ce],null,null,true);
return;
}
if(_8d7=="hidden"){
_8d6=false;
}
}else{
_8d7="auto";
_8d6=true;
}
var _8dd=document.getElementById(_8cd);
if(_8dd){
var _8de=document.getElementById(_8cd);
var _8df=document.createElement("div");
_8df.id=_8ce;
if(_8d1!=null&&typeof (_8d1.align)!="undefined"){
_8df.align=_8d1.align;
}
var _8e0="";
if(_8d2.height){
_8e0="height:"+_8d2.height+";";
}
if(_8d1!=null&&typeof (_8d1.style)!="undefined"){
var _8e1=new String(_8d1.style);
_8e1=_8e1.toLowerCase();
_8e0=_8e0+_8e1;
}
_8e0=_8e0+"overflow:"+_8d7+";";
_8df.style.cssText=_8e0;
_8de.appendChild(_8df);
}
var _8e2=true;
var _8e3=true;
itemobj=ColdFusion.Layout.InitAccordionChildPanel(_8ce,_8d3,_8cf,_8e3,_8e2,_8d6,_8d9,false);
_8d2.add(itemobj);
if(url!=null&&typeof (url)!="undefined"&&url!=""){
if(url.indexOf("?")!=-1){
url=url+"&";
}else{
url=url+"?";
}
var _8e4;
var _8e5;
if(_8d1){
_8e4=_8d1.callbackHandler;
_8e5=_8d1.errorHandler;
}
ColdFusion.Ajax.replaceHTML(_8ce,url,"GET",null,_8e4,_8e5);
}
_8d2.updateLayout();
if(_8d8){
ColdFusion.Layout.expandAccordion(_8cd,_8d3);
}
ColdFusion.Log.info("layout.createaccordionpanel.created","widget",[_8ce]);
}else{
ColdFusion.handleError(null,"layout.createaccordionpanel.layoutnotfound","widget",[_8cd],null,null,true);
}
};
ColdFusion.Layout.initViewport=function(_8e6,item){
var _8e8=new Array();
_8e8[0]=item;
var _8e9={items:_8e8,layout:"fit",name:_8e6};
var _8ea=new Ext.Viewport(_8e9);
return _8ea;
};
ColdFusion.Layout.convertPositionToDirection=function(_8eb){
if(_8eb.toUpperCase()=="LEFT"){
return "west";
}else{
if(_8eb.toUpperCase()=="RIGHT"){
return "east";
}else{
if(_8eb.toUpperCase()=="CENTER"){
return "center";
}else{
if(_8eb.toUpperCase()=="BOTTOM"){
return "south";
}else{
if(_8eb.toUpperCase()=="TOP"){
return "north";
}
}
}
}
}
};
ColdFusion.Layout.addMapInAccordionMapping=function(_8ec,map){
ColdFusion.MapVsAccordion[_8ec]=map;
};
