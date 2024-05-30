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
ColdFusion.Layout.initializeTabLayout=function(id,_71e,_71f,_720,_721){
Ext.QuickTips.init();
var _722;
if(_71f){
_722={renderTo:id,height:_71f};
}else{
_722={renderTo:id,autoHeight:true};
}
if(_720&&_720!="undefined"){
_722.width=_720;
}else{
_722.autoWidth=true;
}
if(_71e){
_722.tabPosition="bottom";
}else{
_722.enableTabScroll=true;
}
_722.plain=!_721;
var _723=new Ext.tab.Panel(_722);
ColdFusion.objectCache[id]=_723;
return _723;
};
ColdFusion.Layout.getTabLayout=function(_724){
var _725=ColdFusion.objectCache[_724];
if(!_725||!(_725 instanceof Ext.TabPanel)){
ColdFusion.handleError(null,"layout.gettablayout.notfound","widget",[_724],null,null,true);
}
return _725;
};
ColdFusion.Layout.onTabActivate=function(tab){
tab._cf_visible=true;
if(tab._cf_dirtyview){
var _727=ColdFusion.bindHandlerCache[tab._cf_body];
if(_727){
_727();
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
ColdFusion.Layout.addTab=function(_72a,_72b,name,_72d,_72e,_72f,_730,_731,_732){
if(_72e!=null&&_72e.length==0){
_72e=null;
}
var _733=_72a.initialConfig.autoHeight;
if(typeof _733=="undefined"){
_733=false;
}
var _734=Ext.getCmp(name);
if(_734){
alert("Component with the name "+name+" already exists. Please use unique names for all the components. Layout will not be rendered");
return;
}
_734=new Ext.Panel({title:_72d,contentEl:_72b,_cf_body:_72b,id:name,closable:_72f,tabTip:_72e,autoScroll:_732,autoShow:true,autoHeight:_733});
var tab=_72a.add(_734);
if(_731){
_734.setDisabled(true);
}
tab._cf_visible=false;
tab._cf_dirtyview=true;
tab._cf_refreshOnActivate=_730;
tab.addListener("activate",ColdFusion.Layout.onTabActivate);
tab.addListener("deactivate",ColdFusion.Layout.onTabDeactivate);
tab.addListener("close",ColdFusion.Layout.onTabClose);
ColdFusion.objectCache[name]=tab;
var _736=tab.height;
if(_736&&_736>1){
var _737=document.getElementById(_72b);
_737.style.height=_736;
}
};
ColdFusion.Layout.enableTab=function(_738,_739){
var _73a=ColdFusion.objectCache[_738];
var _73b=ColdFusion.objectCache[_739];
if(_73a&&(_73a instanceof Ext.TabPanel)&&_73b){
_73b.setDisabled(false);
ColdFusion.Log.info("layout.enabletab.enabled","widget",[_739,_738]);
}else{
ColdFusion.handleError(null,"layout.enabletab.notfound","widget",[_738],null,null,true);
}
};
ColdFusion.Layout.disableTab=function(_73c,_73d){
var _73e=ColdFusion.objectCache[_73c];
var _73f=ColdFusion.objectCache[_73d];
if(_73e&&(_73e instanceof Ext.TabPanel)&&_73f){
_73f.setDisabled(true);
ColdFusion.Log.info("layout.disabletab.disabled","widget",[_73d,_73c]);
}else{
ColdFusion.handleError(null,"layout.disabletab.notfound","widget",[_73c],null,null,true);
}
};
ColdFusion.Layout.selectTab=function(_740,_741){
var _742=ColdFusion.objectCache[_740];
var tab=ColdFusion.objectCache[_741];
if(_742&&(_742 instanceof Ext.TabPanel)&&tab){
_742.setActiveTab(tab);
ColdFusion.Log.info("layout.selecttab.selected","widget",[_741,_740]);
}else{
ColdFusion.handleError(null,"layout.selecttab.notfound","widget",[_740],null,null,true);
}
};
ColdFusion.Layout.hideTab=function(_744,_745){
var _746=ColdFusion.objectCache[_744];
if(_746&&(_746 instanceof Ext.TabPanel)){
var _747=ColdFusion.objectCache[_745];
var _748=false;
if(_747){
if(_746.getActiveTab()&&_746.getActiveTab().getId()==_745){
var i;
for(i=0;i<_746.items.length;i++){
var _74a=_746.getComponent(i);
if(_74a.hidden==false){
_748=true;
_74a.show();
break;
}
}
if(_748==false){
document.getElementById(_745).style.display="none";
}
}
_747.tab.hide();
ColdFusion.Log.info("layout.hidetab.hide","widget",[_745,_744]);
}
}else{
ColdFusion.handleError(null,"layout.hidetab.notfound","widget",[_744],null,null,true);
}
};
ColdFusion.Layout.showTab=function(_74b,_74c){
var _74d=ColdFusion.objectCache[_74b];
var _74e=ColdFusion.objectCache[_74c];
if(_74d&&(_74d instanceof Ext.TabPanel)&&_74e){
_74e.tab.show();
ColdFusion.Log.info("layout.showtab.show","widget",[_74c,_74b]);
}else{
ColdFusion.handleError(null,"layout.showtab.notfound","widget",[_74b],null,null,true);
}
};
ColdFusion.Layout.disableSourceBind=function(_74f){
var _750=ColdFusion.objectCache[_74f];
if(_750==null||_750=="undefined"){
ColdFusion.handleError(null,"layout.disableSourceBind.notfound","widget",[_74f],null,null,true);
}
_750._cf_dirtyview=false;
};
ColdFusion.Layout.enableSourceBind=function(_751){
var _752=ColdFusion.objectCache[_751];
if(_752==null||_752=="undefined"){
ColdFusion.handleError(null,"layout.enableSourceBind.notfound","widget",[_751],null,null,true);
}
_752._cf_dirtyview=true;
};
ColdFusion.Layout.createTab=function(_753,_754,_755,_756,_757){
var _758=ColdFusion.objectCache[_753];
var _759=_754;
if(_753&&typeof (_753)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidname","widget",null,null,null,true);
return;
}
if(!_753||ColdFusion.trim(_753)==""){
ColdFusion.handleError(null,"layout.createtab.emptyname","widget",null,null,null,true);
return;
}
if(_754&&typeof (_754)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidareaname","widget",null,null,null,true);
return;
}
if(!_754||ColdFusion.trim(_754)==""){
ColdFusion.handleError(null,"layout.createtab.emptyareaname","widget",null,null,null,true);
return;
}
if(_755&&typeof (_755)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidtitle","widget",null,null,null,true);
return;
}
if(!_755||ColdFusion.trim(_755)==""){
ColdFusion.handleError(null,"layout.createtab.emptytitle","widget",null,null,null,true);
return;
}
if(_756&&typeof (_756)!="string"){
ColdFusion.handleError(null,"layout.createtab.invalidurl","widget",null,null,null,true);
return;
}
if(!_756||ColdFusion.trim(_756)==""){
ColdFusion.handleError(null,"layout.createtab.emptyurl","widget",null,null,null,true);
return;
}
_754="cf_layoutarea"+_754;
if(_758&&(_758 instanceof Ext.TabPanel)){
var _75a=null;
var ele=document.getElementById(_754);
if(ele!=null){
ColdFusion.handleError(null,"layout.createtab.duplicateel","widget",[_754],null,null,true);
return;
}
var _75c=false;
var _75d=false;
var _75e=false;
var _75f=false;
var _760=false;
var _761=null;
if((_758.items.length<=0)){
_75e=true;
}
if(_757!=null){
if(typeof (_757)!="object"){
ColdFusion.handleError(null,"layout.createtab.invalidconfig","widget",null,null,null,true);
return;
}
if(typeof (_757.closable)!="undefined"&&_757.closable==true){
_75c=true;
}
if(typeof (_757.disabled)!="undefined"&&_757.disabled==true){
_75d=true;
}
if(typeof (_757.selected)!="undefined"&&_757.selected==true){
_75e=true;
}
if(typeof (_757.inithide)!="undefined"&&_757.inithide==true){
_75f=true;
}
if(typeof (_757.tabtip)!="undefined"&&_757.tabtip!=null){
_761=_757.tabtip;
}
}
var _762=document.getElementById(_753);
if(_762){
var _763=document.getElementById(_753);
var _764=document.createElement("div");
_764.id=_754;
_764.className="ytab";
if(_757!=null&&typeof (_757.align)!="undefined"){
_764.align=_757.align;
}
var _765="display:none";
if(_758.tabheight){
_765="height:"+_758.tabheight+";";
}
if(_757!=null&&typeof (_757.style)!="undefined"){
var _766=new String(_757.style);
_766=_766.toLowerCase();
_765=_765+_766;
}
if(_757!=null&&typeof (_757.overflow)!="undefined"){
var _767=new String(_757.overflow);
_767=_767.toLowerCase();
if(_767!="visible"&&_767!="auto"&&_767!="scroll"&&_767!="hidden"){
ColdFusion.handleError(null,"layout.createtab.invalidoverflow","widget",null,null,null,true);
return;
}
if(_767.toLocaleLowerCase()==="hidden"){
_760=false;
}
_765=_765+"overflow:"+_767+";";
}else{
_765=_765+"; overflow:auto;";
}
_764.style.cssText=_765;
_763.appendChild(_764);
}
ColdFusion.Layout.addTab(_758,_754,_759,_755,_761,_75c,false,_75d,_760);
ColdFusion.Log.info("layout.createtab.success","http",[_754,_753]);
if(_75e==true){
ColdFusion.Layout.selectTab(_753,_759);
}
if(_75f==true){
ColdFusion.Layout.hideTab(_753,_759);
}
if(_756!=null&&typeof (_756)!="undefined"&&_756!=""){
if(_756.indexOf("?")!=-1){
_756=_756+"&";
}else{
_756=_756+"?";
}
var _768;
var _769;
if(_757){
_768=_757.callbackHandler;
_769=_757.errorHandler;
}
ColdFusion.Ajax.replaceHTML(_754,_756,"GET",null,_768,_769);
}
}else{
ColdFusion.handleError(null,"layout.createtab.notfound","widget",[_753],null,null,true);
}
};
ColdFusion.Layout.getBorderLayout=function(_76a){
var _76b=ColdFusion.objectCache[_76a];
if(!_76b){
ColdFusion.handleError(null,"layout.getborderlayout.notfound","widget",[_76a],null,null,true);
}
return _76b;
};
ColdFusion.Layout.showArea=function(_76c,_76d){
var _76e=ColdFusion.Layout.convertPositionToDirection(_76d);
var _76f=ColdFusion.objectCache[_76c];
var _770;
if(_76f){
var _771=_76f.items;
for(var i=0;i<_771.getCount();i++){
var _773=_771.items[i];
if(_773 instanceof Ext.Panel&&_773.region==_76e){
_770=_773;
break;
}
}
if(_770){
_770.show();
_770.expand();
ColdFusion.Log.info("layout.showarea.shown","widget",[_76d,_76c]);
}else{
ColdFusion.handleError(null,"layout.showarea.areanotfound","widget",[_76d],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.showarea.notfound","widget",[_76c],null,null,true);
}
};
ColdFusion.Layout.hideArea=function(_774,_775){
var _776=ColdFusion.Layout.convertPositionToDirection(_775);
var _777=ColdFusion.objectCache[_774];
var _778;
if(_777){
var _779=_777.items;
for(var i=0;i<_779.getCount();i++){
var _77b=_779.items[i];
if(_77b instanceof Ext.Panel&&_77b.region==_776){
_778=_77b;
break;
}
}
if(_778){
_778.hide();
ColdFusion.Log.info("layout.hidearea.hidden","widget",[_775,_774]);
}else{
ColdFusion.handleError(null,"layout.hidearea.areanotfound","widget",[_775],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.hidearea.notfound","widget",[_774],null,null,true);
}
};
ColdFusion.Layout.collapseArea=function(_77c,_77d){
var _77e=ColdFusion.Layout.convertPositionToDirection(_77d);
var _77f=ColdFusion.objectCache[_77c];
var _780;
if(_77f){
var _781=_77f.items;
for(var i=0;i<_781.getCount();i++){
var _783=_781.items[i];
if(_783 instanceof Ext.Panel&&_783.region==_77e){
_780=_783;
break;
}
}
if(_780){
_780.collapse();
ColdFusion.Log.info("layout.collpasearea.collapsed","widget",[_77d,_77c]);
}else{
ColdFusion.handleError(null,"layout.collpasearea.areanotfound","widget",[_77d],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.collpasearea.notfound","widget",[_77d],null,null,true);
}
};
ColdFusion.Layout.expandArea=function(_784,_785){
var _786=ColdFusion.Layout.convertPositionToDirection(_785);
var _787=ColdFusion.objectCache[_784];
var _788;
if(_787){
var _789=_787.items;
for(var i=0;i<_789.getCount();i++){
var _78b=_789.items[i];
if(_78b instanceof Ext.Panel&&_78b.region==_786){
_788=_78b;
break;
}
}
if(_788){
_788.expand();
ColdFusion.Log.info("layout.expandarea.expanded","widget",[_785,_784]);
}else{
ColdFusion.handleError(null,"layout.expandarea.areanotfound","widget",[_785],null,null,true);
}
}else{
ColdFusion.handleError(null,"layout.expandarea.notfound","widget",[_785],null,null,true);
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
ColdFusion.Layout.InitAccordion=function(_78e,_78f,_790,_791,_792,_793,_794,_795){
var _796=false;
if(_790.toUpperCase()=="LEFT"){
_796=true;
}
if(_793==null||typeof (_793)=="undefined"){
_792=false;
}
var _797={activeOnTop:_78f,collapseFirst:_796,titleCollapse:_791,fill:_792};
var _798={renderTo:_78e,layoutConfig:_797,items:_795,layout:"accordion"};
if(_793==null||typeof (_793)=="undefined"){
_798.autoHeight=true;
_798.height=600;
}else{
_798.height=_793;
}
_798.flex=1;
if(_794==null||typeof (_794)=="undefined"){
_798.autoWidth=true;
}else{
_798.width=_794;
}
_798.align="stretch";
_798.preventRegister=true;
var _799=new Ext.Panel(_798);
ColdFusion.objectCache[_78e]=_799;
ColdFusion.Log.info("layout.accordion.initialized","widget",[_78e]);
return _799;
};
ColdFusion.Layout.InitAccordionChildPanel=function(_79a,_79b,_79c,_79d,_79e,_79f,_7a0,_7a1){
if(_79c==null||typeof (_79c)==undefined||_79c.length==0){
_79c="  ";
}
var _7a2={contentEl:_79a,id:_79b,title:_79c,collapsible:_79d,closable:_79e,autoScroll:_79f,_cf_body:_79a};
if(_7a0&&typeof _7a0=="string"){
_7a2.iconCls=_7a0;
}
_7a2.preventRegister=true;
var _7a3=new Ext.Panel(_7a2);
_7a3._cf_visible=false;
_7a3._cf_dirtyview=true;
_7a3._cf_refreshOnActivate=_7a1;
_7a3.on("expand",ColdFusion.Layout.onAccordionPanelExpand,this);
_7a3.on("collapse",ColdFusion.Layout.onAccordionPanelCollapse,this);
_7a3.on("hide",ColdFusion.Layout.onAccordionPanelHide,this);
_7a3.on("show",ColdFusion.Layout.onAccordionPanelExpand,this);
ColdFusion.objectCache[_79b]=_7a3;
ColdFusion.Log.info("layout.accordion.childinitialized","widget",[_79b]);
return _7a3;
};
ColdFusion.Layout.getAccordionLayout=function(_7a4){
var _7a5=ColdFusion.objectCache[_7a4];
if(!_7a5||!(_7a5 instanceof Ext.Panel)){
ColdFusion.handleError(null,"layout.getaccordionlayout.notfound","widget",[_7a4],null,null,true);
}
return _7a5;
};
ColdFusion.Layout.onAccordionPanelExpand=function(_7a6){
_7a6._cf_visible=true;
if(_7a6._cf_dirtyview){
var _7a7=ColdFusion.bindHandlerCache[_7a6._cf_body];
if(_7a7){
_7a7();
}
_7a6._cf_dirtyview=false;
}
var el=Ext.get(_7a6.contentEl);
el.move("left",1);
el.move("right",1);
var _7a9=ColdFusion.MapVsAccordion[_7a6._cf_body];
if(_7a9!=undefined){
var _7aa=$MAP.getMapPanelObject(_7a9);
if(_7aa!=undefined){
if(_7aa.initShow===true){
$MAP.show(_7a9);
}
}
}
};
ColdFusion.Layout.onAccordionPanelCollapse=function(_7ab){
_7ab._cf_visible=false;
if(_7ab._cf_refreshOnActivate){
_7ab._cf_dirtyview=true;
}
};
ColdFusion.Layout.onAccordionPanelHide=function(_7ac){
_7ac._cf_visible=false;
};
ColdFusion.Layout.hideAccordion=function(_7ad,_7ae){
var _7af=ColdFusion.objectCache[_7ad];
var _7b0=ColdFusion.objectCache[_7ae];
if(!_7af||!_7af instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.hideaccordion.layoutnotfound","widget",[_7ad],null,null,true);
}
if(!_7b0||!_7b0 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.hideaccordion.panelnotfound","widget",[_7ae],null,null,true);
}
_7b0.hide();
ColdFusion.Log.info("layout.hideaccordion.hidden","widget",[_7ae,_7ad]);
};
ColdFusion.Layout.showAccordion=function(_7b1,_7b2){
var _7b3=ColdFusion.objectCache[_7b1];
var _7b4=ColdFusion.objectCache[_7b2];
if(!_7b3||!_7b3 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.showaccordion.layoutnotfound","widget",[_7b1],null,null,true);
}
if(!_7b4||!_7b4 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.showaccordion.panelnotfound","widget",[_7b2],null,null,true);
}
_7b4.show();
ColdFusion.Log.info("layout.showaccordion.shown","widget",[_7b2,_7b1]);
};
ColdFusion.Layout.expandAccordion=function(_7b5,_7b6){
var _7b7=ColdFusion.objectCache[_7b5];
var _7b8=ColdFusion.objectCache[_7b6];
if(!_7b7||!_7b7 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.expandaccordion.layoutnotfound","widget",[_7b5],null,null,true);
}
if(!_7b8||!_7b8 instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.expandaccordion.panelnotfound","widget",[_7b6],null,null,true);
}
_7b8.expand();
ColdFusion.Log.info("layout.expandaccordion.expanded","widget",[_7b6,_7b5]);
};
ColdFusion.Layout.selectAccordion=function(_7b9,_7ba){
return ColdFusion.Layout.expandAccordion(_7b9,_7ba);
};
ColdFusion.Layout.collapseAccordion=function(_7bb,_7bc){
var _7bd=ColdFusion.objectCache[_7bb];
var _7be=ColdFusion.objectCache[_7bc];
if(!_7bd||!_7bd instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.collapseaccordion.layoutnotfound","widget",[_7bb],null,null,true);
}
if(!_7be||!_7be instanceof Ext.Panel){
ColdFusion.handleError(null,"layout.collapseaccordion.panelnotfound","widget",[_7bc],null,null,true);
}
_7be.collapse();
ColdFusion.Log.info("layout.collapseaccordion.collapsed","widget",[_7bc,_7bb]);
};
ColdFusion.Layout.createAccordionPanel=function(_7bf,_7c0,_7c1,url,_7c3){
var _7c4=ColdFusion.objectCache[_7bf];
var _7c5=_7c0;
if(_7bf&&typeof (_7bf)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidname","widget",[_7bf],null,null,true);
return;
}
if(!_7bf||ColdFusion.trim(_7bf)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.emptyname","widget",[_7bf],null,null,true);
return;
}
if(_7c0&&typeof (_7c0)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidaccordionpanelname","widget",[_7c0],null,null,true);
return;
}
if(!_7c0||ColdFusion.trim(_7c0)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.emptyaccordionpanelname","widget",[_7c0],null,null,true);
return;
}
if(_7c1&&typeof (_7c1)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidtitle","widget",[_7c0],null,null,true);
return;
}
if(!_7c1||ColdFusion.trim(_7c1)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidtitle","widget",[_7c0],null,null,true);
return;
}
if(url&&typeof (url)!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidurl","widget",[_7c0],null,null,true);
return;
}
if(!url||ColdFusion.trim(url)==""){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidurl","widget",[_7c0],null,null,true);
return;
}
_7c0="cf_layoutarea"+_7c5;
if(_7c4&&(_7c4 instanceof Ext.Panel)){
var _7c6=null;
var ele=document.getElementById(_7c0);
if(ele!=null){
ColdFusion.handleError(null,"layout.createaccordionpanel.duplicateel","widget",[_7c0],null,null,true);
return;
}
var _7c8=true;
var _7c9;
var _7ca=false;
var _7cb=null;
if(_7c3!=null){
if(typeof (_7c3)!="object"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidconfig","widget",[_7c0],null,null,true);
return;
}
}
if(_7c3&&typeof (_7c3.selected)!="undefined"&&_7c3.selected==true){
_7ca=true;
}
if(_7c3&&_7c3.titleicon){
if(typeof _7c3.titleicon!="string"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidtitleicon","widget",[_7c0],null,null,true);
return;
}
var _7cc=Ext.String.format(ACCORDION_TITLE_ICON_CSS_TEMPLATE,_7c0,_7c3.titleicon);
Ext.util.CSS.createStyleSheet(_7cc,_7c0+"_cf_icon");
_7cb=_7c0;
}
var _7cd=_7c4.layoutConfig;
var _7ce=true;
if(_7cd&&typeof _7cd.fill!="undefined"){
_7ce=_7cd.fill;
}
if(_7c3!=null&&typeof (_7c3.overflow)!="undefined"){
var _7c9=new String(_7c3.overflow);
_7c9=_7c9.toLowerCase();
if(_7c9!="visible"&&_7c9!="auto"&&_7c9!="scroll"&&_7c9!="hidden"){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidoverflow","widget",[_7c0],null,null,true);
return;
}
if(!_7ce&&(_7c9=="auto"||_7c9=="scroll")){
ColdFusion.handleError(null,"layout.createaccordionpanel.invalidoverflowforfillheight","widget",[_7c0],null,null,true);
return;
}
if(_7c9=="hidden"){
_7c8=false;
}
}else{
_7c9="auto";
_7c8=true;
}
var _7cf=document.getElementById(_7bf);
if(_7cf){
var _7d0=document.getElementById(_7bf);
var _7d1=document.createElement("div");
_7d1.id=_7c0;
if(_7c3!=null&&typeof (_7c3.align)!="undefined"){
_7d1.align=_7c3.align;
}
var _7d2="";
if(_7c4.height){
_7d2="height:"+_7c4.height+";";
}
if(_7c3!=null&&typeof (_7c3.style)!="undefined"){
var _7d3=new String(_7c3.style);
_7d3=_7d3.toLowerCase();
_7d2=_7d2+_7d3;
}
_7d2=_7d2+"overflow:"+_7c9+";";
_7d1.style.cssText=_7d2;
_7d0.appendChild(_7d1);
}
var _7d4=true;
var _7d5=true;
itemobj=ColdFusion.Layout.InitAccordionChildPanel(_7c0,_7c5,_7c1,_7d5,_7d4,_7c8,_7cb,false);
_7c4.add(itemobj);
if(url!=null&&typeof (url)!="undefined"&&url!=""){
if(url.indexOf("?")!=-1){
url=url+"&";
}else{
url=url+"?";
}
var _7d6;
var _7d7;
if(_7c3){
_7d6=_7c3.callbackHandler;
_7d7=_7c3.errorHandler;
}
ColdFusion.Ajax.replaceHTML(_7c0,url,"GET",null,_7d6,_7d7);
}
_7c4.updateLayout();
if(_7ca){
ColdFusion.Layout.expandAccordion(_7bf,_7c5);
}
ColdFusion.Log.info("layout.createaccordionpanel.created","widget",[_7c0]);
}else{
ColdFusion.handleError(null,"layout.createaccordionpanel.layoutnotfound","widget",[_7bf],null,null,true);
}
};
ColdFusion.Layout.initViewport=function(_7d8,item){
var _7da=new Array();
_7da[0]=item;
var _7db={items:_7da,layout:"fit",name:_7d8};
var _7dc=new Ext.Viewport(_7db);
return _7dc;
};
ColdFusion.Layout.convertPositionToDirection=function(_7dd){
if(_7dd.toUpperCase()=="LEFT"){
return "west";
}else{
if(_7dd.toUpperCase()=="RIGHT"){
return "east";
}else{
if(_7dd.toUpperCase()=="CENTER"){
return "center";
}else{
if(_7dd.toUpperCase()=="BOTTOM"){
return "south";
}else{
if(_7dd.toUpperCase()=="TOP"){
return "north";
}
}
}
}
}
};
ColdFusion.Layout.addMapInAccordionMapping=function(_7de,map){
ColdFusion.MapVsAccordion[_7de]=map;
};
