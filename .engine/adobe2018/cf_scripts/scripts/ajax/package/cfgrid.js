/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
cfinitgrid=function(){
Ext.override(Ext.form.field.Number,{decimalPrecision:6});
if(!ColdFusion.Grid){
ColdFusion.Grid={};
}
var $G=ColdFusion.Grid;
if(!$G.GridBindelementsMap){
$G.GridBindelementsMap={};
}
var $L=ColdFusion.Log;
$G.init=function(id,name,_255,_256,edit,_258,_259,_25a,_25b,_25c,_25d,_25e,_25f,_260,_261,_262,_263,_264,_265,_266,_267,_268,_269,_26a,_26b,_26c,_26d,_26e,_26f,_270){
var grid;
var _272;
var _273=false;
if(_264&&typeof (_264)!="undefined"){
_272=_264;
_273=true;
}else{
_272="rowmodel";
_272=new Ext.selection.RowModel({mode:"SINGLE"});
}
var _274=_25b;
var _275={store:_25c,columns:_25b,selModel:_272,autoSizeColumns:_259,autoSizeHeaders:_259,stripeRows:_25f,autoExpandColumnId:_25a};
if(_26e!=null&&typeof _26e!="undefined"){
_275.plugins=_26e;
}
var _276=ColdFusion.objectCache[id];
var _277=document.getElementById(_276.gridId);
if(_277!=null){
var _278=_277.style.cssText;
if(typeof _278=="undefined"){
_278="";
}
_278="width:"+_25d+"px;"+_278;
_277.style.cssText=_278;
}
_275.width=_25d;
if(_259===true){
_275.viewConfig={forceFit:true};
_275.forceFit=true;
}else{
if(_264&&typeof (_264)!="undefined"){
_275.autoExpandColumn=_25a;
}else{
_275.autoExpandColumn=_25a;
}
}
if(_25e){
_275.height=_25e;
}else{
_275.autoHeight=true;
var _279=".x-grid3-header {position: relative;}";
Ext.util.CSS.createStyleSheet(_279,"_cf_grid"+id);
}
if(_266&&typeof (_266)!="undefined"){
_275.features={ftype:"grouping",groupHeaderTpl:"{columnName}: {groupValue} ({rows.length} items)"};
}
_275.title=_267;
_275.collapsible=_265;
if(_265&&_267==null){
_275.title="  ";
}
var _27a=ColdFusion.objectCache[id];
_27a.bindOnLoad=_258;
_27a.dynamic=_256;
_27a.styles=_260;
_27a.grouping=_266;
_27a.onLoadFunction=_26d;
_27a.multiRowSelection=_273;
_275.renderTo=_27a.gridId;
Ext.onReady(function(){
_275.dockedItems={xtype:"toolbar",dock:"top"};
_275.tbar=new Ext.Toolbar({hidden:true});
if(_256){
_275.bbar=new Ext.PagingToolbar({pageSize:_261,store:_25c});
if(_26b&&(_268||_269)){
var _27b=_275.bbar;
if(_268){
_27b.add({xtype:"button",text:_268,handler:$G.insertRow,scope:_27a});
_27b.add({xtype:"button",text:" save ",handler:$G.saveNewRecord,scope:_27a});
_27b.add({xtype:"button",text:" cancel ",handler:$G.cancelNewRecord,scope:_27a});
}
if(_269){
_27b.add({xtype:"button",text:_269,handler:$G.deleteRow,scope:_27a});
}
}
}
if(edit&&!_256){
var bbar=new Ext.Toolbar();
if(_268||_269){
if(_268){
bbar.add({xtype:"button",text:_268,handler:$G.insertRow,scope:_27a});
}
if(_269){
bbar.add({xtype:"button",text:_269,handler:$G.deleteRow,scope:_27a});
}
}else{
var bbar=new Ext.Toolbar({hidden:true});
}
_275.bbar=bbar;
}
_25c.pageSize=_261;
var fn=function(){
grid=Ext.create("Ext.grid.Panel",_275);
$G.Ext_caseInsensitive_sorting();
_25c.addListener("load",$G.Actions.onLoad,_27a,{delay:50});
grid.view.addListener("beforeshow",function(menu){
var _27f=_274.getColumnCount();
for(var i=0;i<_27f;i++){
if("CFGRIDROWINDEX"==_274.getDataIndex(i)){
menu.remove(menu.items["items"][i]);
break;
}
}
},this);
_27a.grid=grid;
if(!_256){
_25c.addListener("load",$G.Actions.onLoad,_27a,{delay:50});
_25c.load();
}
if(_256){
_25c._cf_errorHandler=_26c;
_25c.proxy._cf_actions=_27a;
if(_27a.bindOnLoad){
_25c.load({params:{start:0,limit:_261}});
}else{
_27a.bindOnLoad=true;
}
}else{
$G.applyStyles(_27a);
}
if(_26f){
ColdFusion.Bind.register(_26f,{actions:_27a},$G.bindHandler,false);
}
$L.info("grid.init.created","widget",[id]);
_27a.init(id,name,_255,_26a,_256,edit,_26b,_26c,_263,_261,_262,_266);
};
if(_256&&_270){
setTimeout(fn,0);
}else{
fn();
}
});
};
$G.applyStyles=function(_281){
Ext.util.CSS.createStyleSheet(_281.styles);
_281.stylesApplied=true;
};
$G.bindHandler=function(e,_283){
$G.refresh(_283.actions.id,_283.actions.preservePageOnSort);
};
$G.bindHandler._cf_bindhandler=true;
$G.refresh=function(_284,_285){
var _286=ColdFusion.objectCache[_284];
if(_286&&$G.Actions.prototype.isPrototypeOf(_286)==true){
var _287=_286.grid.getStore();
if(_286.dynamic){
_286.editOldValue=null;
_286.selectedRow=-1;
var bind=$G.GridBindelementsMap[_284];
if(bind){
var url=_287.proxy.url;
var _28a=bind.split(";");
for(i=0;i<_28a.length;i++){
var _28b=_28a[i].split(",");
indx=url.indexOf(_28b[0]+"=");
url1=url.substring(0,indx);
nxtindx=url.indexOf("&",indx);
url2=url.substring(nxtindx);
var val=_28b[2];
var eval="";
if(_28b[2]&&_28b[2].endsWith("()")){
val=_28b[2].substring(0,val.length-2);
eval=window[val]();
}else{
eval=ColdFusion.Bind.getBindElementValue(_28b[1],val,_28b[3]);
}
url=url1+"&"+_28b[0]+"="+eval+url2;
}
_287.proxy.url=url;
}
if(_285){
_287.lastOptions.page=1;
_287.currentPage=1;
_287.reload();
}else{
if(_287.lastOptions){
_287.lastOptions.page=1;
}
_287.currentPage=1;
_287.reload({params:{start:0,limit:_286.pageSize}});
}
}
}else{
ColdFusion.handleError(null,"grid.refresh.notfound","widget",[_284],null,null,true);
return;
}
if(_286.multiRowSelection){
}
$L.info("grid.refresh.success","widget",[_284]);
};
$G.Ext_caseInsensitive_sorting=function(){
Ext.data.Store.prototype.sortData=function(f,_28f){
_28f=_28f||"ASC";
var st=this.fields.get(f).sortType;
var fn=function(r1,r2){
var v1=st(r1.data[f]),v2=st(r2.data[f]);
if(v1.toLowerCase){
v1=v1.toLowerCase();
v2=v2.toLowerCase();
}
return v1>v2?1:(v1<v2?-1:0);
};
this.data.sort(_28f,fn);
if(this.snapshot&&this.snapshot!=this.data){
this.snapshot.sort(_28f,fn);
}
};
};
$G.getTopToolbar=function(_295){
var _296=ColdFusion.objectCache[_295];
if(!_296){
ColdFusion.handleError(null,"grid.getTopToolbar.notfound","widget",[_295],null,null,true);
return;
}
return _296.grid.getDockedItems()[1];
};
$G.showTopToolbar=function(_297){
var _298=ColdFusion.objectCache[_297];
if(!_298){
ColdFusion.handleError(null,"grid.showTopToolbar.notfound","widget",[_297],null,null,true);
return;
}
var tbar=_298.grid.getDockedItems()[1];
if(!tbar){
ColdFusion.handleError(null,"grid.showTopToolbar.toolbarNotDefined","widget",[_297],null,null,true);
return;
}
tbar.show();
};
$G.hideTopToolbar=function(_29a){
var _29b=ColdFusion.objectCache[_29a];
if(!_29b){
ColdFusion.handleError(null,"grid.hideTopToolbar.notfound","widget",[_29a],null,null,true);
return;
}
var tbar=_29b.grid.getDockedItems()[1];
if(!tbar){
ColdFusion.handleError(null,"grid.hideTopToolbar.toolbarNotDefined","widget",[_29a],null,null,true);
return;
}
tbar.hide();
};
$G.refreshTopToolbar=function(_29d){
var _29e=ColdFusion.objectCache[_29d];
if(!_29e){
ColdFusion.handleError(null,"grid.refreshTopToolbar.notfound","widget",[_29d],null,null,true);
return;
}
var tbar=_29e.grid.getDockedItems()[1];
if(!tbar){
ColdFusion.handleError(null,"grid.refreshTopToolbar.toolbarNotDefined","widget",[_29d],null,null,true);
return;
}
tbar.doLayout();
if(tbar.isVisible()==false){
tbar.show();
}
};
$G.getBottomToolbar=function(_2a0){
var _2a1=ColdFusion.objectCache[_2a0];
if(!_2a1){
ColdFusion.handleError(null,"grid.getBottomToolbar.notfound","widget",[_2a0],null,null,true);
return;
}
return _2a1.grid.getDockedItems()[_2a1.grid.getDockedItems().length-1];
};
$G.showBottomToolbar=function(_2a2){
var _2a3=ColdFusion.objectCache[_2a2];
if(!_2a3){
ColdFusion.handleError(null,"grid.showBottomToolbar.notfound","widget",[_2a2],null,null,true);
return;
}
var tbar=_2a3.grid.getDockedItems()[_2a3.grid.getDockedItems().length-1];
if(!tbar){
ColdFusion.handleError(null,"grid.showBottomToolbar.toolbarNotDefined","widget",[_2a2],null,null,true);
return;
}
tbar.show();
};
$G.hideBottomToolbar=function(_2a5){
var _2a6=ColdFusion.objectCache[_2a5];
if(!_2a6){
ColdFusion.handleError(null,"grid.hideBottomToolbar.notfound","widget",[_2a5],null,null,true);
return;
}
var tbar=_2a6.grid.getDockedItems()[_2a6.grid.getDockedItems().length-1];
if(!tbar){
ColdFusion.handleError(null,"grid.hideBottomToolbar.toolbarNotDefined","widget",[_2a5],null,null,true);
return;
}
tbar.hide();
};
$G.refreshBottomToolbar=function(_2a8){
var _2a9=ColdFusion.objectCache[_2a8];
if(!_2a9){
ColdFusion.handleError(null,"grid.refreshBottomToolbar.notfound","widget",[_2a8],null,null,true);
return;
}
var tbar=_2a9.grid.getDockedItems()[_2a9.grid.getDockedItems().length-1];
if(!tbar){
ColdFusion.handleError(null,"grid.refreshBottomToolbar.toolbarNotDefined","widget",[_2a8],null,null,true);
return;
}
tbar.doLayout();
if(tbar.isVisible()==false){
tbar.show();
}
};
$G.sort=function(_2ab,_2ac,_2ad){
var _2ae=ColdFusion.objectCache[_2ab];
if(!_2ae){
ColdFusion.handleError(null,"grid.sort.notfound","widget",[_2ab],null,null,true);
return;
}
_2ac=_2ac.toUpperCase();
var _2af=-1;
var _2b0=_2ae.grid.columns;
for(var i=0;i<_2b0.length-1;i++){
if(_2ac==_2b0[i].colName){
_2af=i;
break;
}
}
if(_2af==-1){
ColdFusion.handleError(null,"grid.sort.colnotfound","widget",[_2ac,_2ab],null,null,true);
return;
}
if(!_2ad){
_2ad="ASC";
}
_2ad=_2ad.toUpperCase();
if(_2ad!="ASC"&&_2ad!="DESC"){
ColdFusion.handleError(null,"grid.sort.invalidsortdir","widget",[_2ad,_2ab],null,null,true);
return;
}
var _2b2=_2ae.grid.getStore();
_2b2.sort(_2ac,_2ad);
};
$G.getGridObject=function(_2b3){
if(!_2b3){
ColdFusion.handleError(null,"grid.getgridobject.missinggridname","widget",null,null,null,true);
return;
}
var _2b4=ColdFusion.objectCache[_2b3];
if(_2b4==null||$G.Actions.prototype.isPrototypeOf(_2b4)==false){
ColdFusion.handleError(null,"grid.getgridobject.notfound","widget",[_2b3],null,null,true);
return;
}
return _2b4.grid;
};
$G.getSelectedRows=function(_2b5){
if(!_2b5){
ColdFusion.handleError(null,"grid.getSelectedRowData.missinggridname","widget",null,null,null,true);
return;
}
var _2b6=ColdFusion.objectCache[_2b5];
var _2b7=new Array();
var _2b8=_2b6.grid.getSelectionModel();
var _2b9=_2b8.selected;
var _2ba=_2b6.grid.columns;
var _2bb=0;
if(_2b6.multiRowSelection===true&&_2b6.dynamic===false){
_2bb++;
}
for(i=0;i<_2b9.length;i++){
var _2bc=_2b9.items[i].data;
var _2bd={};
for(var _2be=_2bb;_2be<_2ba.length-1;_2be++){
var key=_2ba[_2be].dataIndex;
_2bd[key]=_2bc[key];
}
_2b7[i]=_2bd;
}
return _2b7;
};
$G.clearSelectedRows=function(_2c0){
if(!_2c0){
ColdFusion.handleError(null,"grid.getSelectedRowData.missinggridname","widget",null,null,null,true);
return;
}
var _2c1=ColdFusion.objectCache[_2c0];
var _2c2=_2c1.grid.getSelectionModel();
_2c2.deselectAll();
if(_2c1.multiRowSelection){
}
};
$G.Actions=function(_2c3){
this.gridId=_2c3;
this.init=$G.Actions.init;
this.onChangeHandler=$G.Actions.onChangeHandler;
this.onChangeHandler_MultiRowsDelete=$G.Actions.onChangeHandler_MultiRowsDelete;
this.selectionChangeEvent=new ColdFusion.Event.CustomEvent("cfGridSelectionChange",_2c3);
this.fireSelectionChangeEvent=$G.fireSelectionChangeEvent;
this._cf_getAttribute=$G.Actions._cf_getAttribute;
this._cf_register=$G.Actions._cf_register;
this.loaded=false;
};
$G.Actions.init=function(id,_2c5,_2c6,_2c7,_2c8,edit,_2ca,_2cb,_2cc,_2cd,_2ce,_2cf){
this.id=id;
this.gridName=_2c5;
this.formId=_2c6;
this.form=document.getElementById(_2c6);
this.cellClickInfo=_2c7;
this.edit=edit;
this.onChangeFunction=_2ca;
this.onErrorFunction=_2cb;
this.preservePageOnSort=_2cc;
this.pageSize=_2cd;
this.selectedRow=-1;
this.selectOnLoad=_2ce;
this.grouping=_2cf;
this.grid.addListener("cellclick",$G.cellClick,this,true);
this.editField=document.createElement("input");
this.editField.setAttribute("name",_2c5);
this.editField.setAttribute("type","hidden");
this.form.appendChild(this.editField);
if(edit){
if(!_2c8){
var _2d0=this.grid.columns;
this.editFieldPrefix="__CFGRID__EDIT__=";
var i=0;
var _2d2=_2d0.length-1;
if(this.multiRowSelection===true&&this.dynamic===false){
i++;
_2d2--;
}
this.editFieldPrefix+=_2d2+$G.Actions.fieldSep;
var _2d3=true;
for(i;i<_2d0.length-1;i++){
if(!_2d3){
this.editFieldPrefix+=$G.Actions.fieldSep;
}
this.editFieldPrefix+=_2d0[i].colName;
this.editFieldPrefix+=$G.Actions.valueSep;
if(_2d0[i].getEditor()){
this.editFieldPrefix+="Y";
}else{
this.editFieldPrefix+="N";
}
_2d3=false;
}
this.editFieldPrefix+=$G.Actions.fieldSep;
}
this.editFieldState=[];
this.editFieldState.length=this.grid.getStore().getTotalCount();
$G.Actions.computeEditField(this);
this.insertInProgress=false;
this.insertEvent=null;
this.grid.addListener("beforeedit",$G.Actions.beforeEdit,this);
this.grid.addListener("edit",$G.Actions.afterEdit,this,true);
}
if(_2c8){
this.grid.getStore().addListener("beforeload",$G.Actions.beforeLoad,this,true);
}
this.grid.getSelectionModel().addListener("select",$G.rowSelect,this,true);
this.grid.getSelectionModel().addListener("beforerowselect",$G.beforeRowSelect,this,true);
};
$G.Actions.beforeLoad=function(_2d4,_2d5){
var _2d6=_2d4.sortInfo;
var _2d7=(_2d5.sorters&&_2d5.sorters[0]&&_2d5.sorters[0].property!=this.sortCol);
if(_2d7&&!this.preservePageOnSort){
_2d5.start=0;
_2d5.page=1;
_2d4.currentPage=1;
}
if(_2d5.sorters&&_2d5.sorters[0]){
this.sortCol=_2d5.sorters[0].property;
this.sortDir=_2d5.sorters[0].direction;
}
};
$G.Actions.onLoad=function(_2d8){
this.editOldValue=null;
this.selectedRow=-1;
this.insertInProgress=false;
var _2d9=0;
if((this.bindOnLoad||!this.dynamic)&&this.selectOnLoad&&!this.grouping){
this.grid.getSelectionModel().select(_2d9,false);
}
if(!this.gridRendered&&this.onLoadFunction&&typeof this.onLoadFunction=="function"){
this.gridRendered=true;
this.onLoadFunction.call(null,this.grid);
}
$G.applyStyles(_2d8);
try{
var _2da=Ext.ComponentQuery.query("tabpanel");
if(_2da&&this.grid&&this.loaded==false){
for(var i=0;i<_2da.length;i++){
if(_2da[i].body.dom.innerHTML.indexOf(this.grid.id)>0){
_2da[i].updateLayout();
this.loaded=true;
}
}
}
}
catch(exception){
}
};
$G.Actions._cf_getAttribute=function(_2dc){
_2dc=_2dc.toUpperCase();
var _2dd=this.selectedRow;
var _2de=null;
if(_2dd!=0&&(!_2dd||_2dd==-1)){
return _2de;
}
var ds=this.grid.getStore();
var _2e0=(this.dynamic)?ds.getAt(_2dd):ds.getById(_2dd);
_2de=_2e0.get(_2dc);
return _2de;
};
$G.Actions._cf_register=function(_2e1,_2e2,_2e3){
this.selectionChangeEvent.subscribe(_2e2,_2e3);
};
$G.rowSelect=function(_2e4,_2e5,row){
var _2e7="";
var _2e8=_2e4.selected.items;
if(_2e8.length==0){
return;
}
var _2e9=_2e8[0].get("CFGRIDROWINDEX")||row;
if(_2e9&&(_2e9+"").indexOf("cf_gridmodel")==0){
_2e9=row;
}
if(this.selectedRow!=_2e9){
this.selectedRow=_2e9;
var _2ea=true;
for(col in _2e8[0].data){
if(col=="CFGRIDROWINDEX"){
continue;
}
if(typeof col=="undefined"||col=="undefined"){
continue;
}
if(!_2ea){
_2e7+="; ";
}
_2e7+="__CFGRID__COLUMN__="+col+"; ";
_2e7+="__CFGRID__DATA__="+_2e8[0].data[col];
_2ea=false;
}
this.fireSelectionChangeEvent();
this.insertInProgress=false;
}
};
$G.beforeRowSelect=function(_2eb,row){
var ds=this.grid.getStore();
var _2ee=ds.getAt(row);
return !$G.isNullRow(_2ee.data);
};
$G.isNullRow=function(data){
var _2f0=true;
for(col in data){
if(data[col]!=null){
_2f0=false;
break;
}
}
return _2f0;
};
$G.fireSelectionChangeEvent=function(){
$L.info("grid.fireselectionchangeevent.fire","widget",[this.id]);
this.selectionChangeEvent.fire();
};
$G.cellClick=function(grid,td,_2f3,_2f4,tr,_2f6,e,_2f8){
var _2f9=this.cellClickInfo.colInfo[_2f3];
if(_2f9){
var _2fa=grid.getSelectionModel().selected;
var url;
if(_2fa.items.length>0&&_2fa.items[0].data){
url=_2fa.items[0].data[_2f9.href.toUpperCase()];
}
if(!url){
url=_2f9.href;
}
var _2fc=_2f9.hrefKey;
var _2fd=_2f9.target;
var _2fe=this.appendKey;
if(this.cellClickInfo.appendKey){
var _2ff;
if(_2fc||_2fc==0){
var _300=grid.getStore().getAt(_2f6);
var _301=grid.panel.columns[_2fc].dataIndex;
_2ff=_300.get(_301);
}else{
var _302=this.grid.columns;
_2ff=_2fa.items[0].get(_302[0].dataIndex);
for(var i=1;i<_302.length-1;i++){
_2ff+=","+_2fa.items[0].get(_302[i].dataIndex);
}
}
if(url.indexOf("?")!=-1){
url+="&CFGRIDKEY="+_2ff;
}else{
url+="?CFGRIDKEY="+_2ff;
}
}
if(_2fd){
_2fd=_2fd.toLowerCase();
if(_2fd=="_top"){
_2fd="top";
}else{
if(_2fd=="_parent"){
_2fd="parent";
}else{
if(_2fd=="_self"){
_2fd=window.name;
}else{
if(_2fd=="_blank"){
window.open(encodeURI(url));
return;
}
}
}
}
if(!parent[_2fd]){
ColdFusion.handleError(null,"grid.cellclick.targetnotfound","widget",[_2fd]);
return;
}
parent[_2fd].location=encodeURI(url);
}else{
window.location=encodeURI(url);
}
}
};
$G.insertRow=function(){
if(this.insertInProgress&&this.dynamic){
ColdFusion.handleError(null,"Multiple row insert is not supported","Grid",[this.gridId],null,null,true);
return;
}
var _304={action:"I",values:[]};
var _305=this.grid.columns;
var _306=this.grid.getStore();
var _307={};
var _308="{";
for(var i=0;i<_305.length-1;i++){
var _30a="";
_304.values[i]=[_30a,_30a];
_307[_305[i].dataIndex]=_30a;
_308=_308+"\""+_305[i].colName+"\":\""+_30a+"\",";
}
_307["CFGRIDROWINDEX"]=_306.getCount()+1;
_308=_308+"\"CFGRIDROWINDEX\":\""+(_306.getCount()+1)+"\"}";
_306.add(JSON.parse(_308));
_306.getAt(_306.getCount()-1).data["CFGRIDROWINDEX"]=_306.getCount();
if(this.dynamic==true){
this.selectedRow=_306.getCount();
}
this.editFieldState.push(_304);
this.grid.getSelectionModel().select(_306.getCount()-1);
this.insertInProgress=true;
$G.Actions.computeEditField(this);
};
$G.saveNewRecord=function(){
if(!this.insertInProgress){
return;
}
var _30b=this.selectedRow;
var _30c=this.insertEvent;
if(_30b==-1){
return;
}
if(this.onChangeFunction){
this.onChangeHandler("I",_30b-1,_30c,$G.insertRowCallback);
}else{
if(this.dynamic==false){
var _30d=this.grid.getStore();
var _30e=_30c.record;
var _30f=new Array(1);
_30f[0]=_30e;
var _310=_30d.getAt(this.selectedRow-1);
_30d.remove(_310);
_30d.add(_30f);
}
}
this.insertInProgress=false;
this.insertEvent=null;
};
$G.cancelNewRecord=function(){
if(!this.insertInProgress){
return;
}
this.editFieldState.pop();
var _311=this.grid.getStore();
var _312=_311.getAt(this.selectedRow-1);
_311.remove(_312);
this.insertInProgress=false;
this.insertEvent=null;
this.selectedRow=this.selectedrow-1;
};
$G.deleteRow=function(){
var _313=null;
var _314;
if(this.multiRowSelection===true){
var _315=this.grid.getSelectionModel();
_313=_315.selected;
}
_313=this.grid.getSelectionModel().getSelection();
if(_313!=null&&_313.length<2){
_313=null;
}
if(_313==null){
_314=this.selectedRow;
}
if(_314==-1&&_313==null){
return;
}
if(this.onChangeFunction){
if(_313!=null){
this.onChangeHandler_MultiRowsDelete("D",_313,null,$G.deleteRowCallback);
}else{
this.onChangeHandler("D",_314,null,$G.deleteRowCallback);
}
}else{
if(!this.dynamic){
var _316=this.grid.getStore();
if(_313!=null){
for(i=0;i<_313.length;i++){
var _317=_316.indexOf(_313[i]);
var _318=this.editFieldState[_317];
if(_318){
_318.action="D";
}else{
_318=$G.Actions.initEditState(this,"D",_313[i],_317+1);
}
}
for(i=0;i<_313.length;i++){
_316.remove(_313[i]);
}
}else{
var _318=this.editFieldState[_314-1];
if(_318){
_318.action="D";
}else{
var _319=this.grid.getStore().getById(_314);
_318=$G.Actions.initEditState(this,"D",_319,_314);
}
_316.remove(this.grid.getSelectionModel().getSelection());
}
$G.Actions.computeEditField(this);
this.grid.editingPlugin.completeEdit();
this.selectedRow=-1;
}
}
};
$G.deleteRowCallback=function(_31a,_31b){
var _31c=_31b._cf_grid.getStore();
var _31d=_31b._cf_grid_properties;
var _31b=_31c.lastOptions;
var key="start";
if(_31c.getCount()==1){
if(_31b.start>=_31b.limit){
_31b.start=_31b.start-_31b.limit;
}
_31b.page=_31b.page-1;
_31c.reload(_31b);
}else{
_31c.reload();
}
if(_31d.multiRowSelection){
var _31f=_31d.grid.getView().headerCt(0);
if(_31f!=null){
var _320=Ext.Element.get(_31f).first();
if(_320){
_320.replaceClass("x-grid3-hd-checker-on");
}
}
}
};
$G.insertRowCallback=function(_321,_322){
var _323=_322._cf_grid.getStore();
var _324=_322._cf_grid.actions;
_323.reload();
};
$G.Actions.beforeEdit=function(_325,e,_327){
if($G.isNullRow(e.record.data)){
return false;
}
this.editColumn=e.column;
this.editOldValue=e.value;
};
$G.Actions.afterEdit=function(_328,_329,_32a){
var _32b=_329.value;
if(_32b==this.editOldValue){
return;
}
if(this.insertInProgress==false&&this.onChangeFunction){
this.onChangeHandler("U",this.selectedRow,_329);
}else{
if(!this.dynamic){
rowidx=_329.rowIdx;
if(!rowidx&&rowidx!=0){
rowidx=_329.row;
}
var _32c=$G.computeActualRow_editField(this.editFieldState,_329.record.data.CFGRIDROWINDEX);
var _32d=this.editFieldState[_32c-1];
var _32e=_329.colIdx;
if(!_32e&&_32e!=0){
_32e=_329.column;
}
_32e=_32e+1;
if(_32d){
if(this.multiRowSelection===true&&this.insertInProgress==true){
_32e=_32e-1;
}
_32d.values[_32e-1][1]=_32b;
}else{
var _32f=this.grid.getStore().getById(_329.record.data.CFGRIDROWINDEX);
_32d=$G.Actions.initEditState(this,"U",_32f,_32c);
var _330=this.editOldValue+"";
if(_329.column.type=="date"){
if(_330&&typeof _330=="string"){
_330=new Date(_330);
}
var _331="F, j Y H:i:s";
if(_329.column&&_329.column.format){
_331=_329.column.format;
}
_32d.values[_32e-1][1]=Ext.Date.format(_32b,_331);
_32d.values[_32e-1][0]=_330?Ext.Date.format(_330,_331):_330;
}else{
_32d.values[_32e-1][0]=_330;
_32d.values[_32e-1][1]=_32b;
}
}
$G.Actions.computeEditField(this);
}
}
this.editOldValue=null;
this.fireSelectionChangeEvent();
};
$G.computeActualRow_editField=function(_332,_333){
if(_332.length==_333){
return _333;
}
var _334=0;
var _335=0;
for(;_335<_332.length&&_334<_333;_335++){
var _336=_332[_335];
if(!_336||_336.action!="D"){
_334++;
}
}
return _335;
};
$G.Actions.onChangeHandler=function(_337,_338,_339,_33a){
var _33b={};
var _33c={};
var data="";
if(null==_339){
data=this.grid.getStore().getAt(_338).data;
}else{
data=_339?_339.record.data:this.grid.getStore().getAt(_338).data;
}
for(col in data){
_33b[col]=data[col];
}
if(_337=="U"){
if((_339.value==null||_339.value=="")&&(_339.originalValue==null||_339.originalValue=="")){
return;
}
if(_339.value&&_339.column.type=="date"){
if(typeof _339.originalValue=="string"){
var _33e=new Date(_339.originalValue);
}
if(_33e!=null&&_33e.getElapsed(_339.value)==0){
return;
}else{
_33b[_339.field]=_339.originalValue;
var _33f="F, j Y H:i:s";
if(_339.column.format){
_33f=_339.column.format;
}
_33c[_339.field]=Ext.Date.format(_339.value,_33f);
}
}else{
_33b[_339.field]=_339.originalValue;
_33c[_339.field]=_339.value;
}
}
this.onChangeFunction(_337,_33b,_33c,_33a,this.grid,this.onErrorFunction,this);
};
$G.Actions.onChangeHandler_MultiRowsDelete=function(_340,_341,_342,_343){
var _344=new Array();
var _345={};
for(i=0;i<_341.length;i++){
_344[i]=_341.items[i].data;
}
this.onChangeFunction(_340,_344,_345,_343,this.grid,this.onErrorFunction,this);
};
$G.Actions.initEditState=function(_346,_347,_348,_349){
var _34a={action:_347,values:[]};
var _34b=_346.grid.columns;
var _34c=_34b.length-1;
_34a.values.length=_34c;
var i=0;
if(_346.multiRowSelection===true&&_346.dynamic===false){
i=i++;
}
for(i;i<_34c;i++){
var _34e=_348.get(_34b[i].colName);
_34a.values[i]=[_34e,_34e];
}
_346.editFieldState[_349-1]=_34a;
return _34a;
};
$G.Actions.fieldSep=eval("'\\u0001'");
$G.Actions.valueSep=eval("'\\u0002'");
$G.Actions.nullValue=eval("'\\u0003'");
$G.Actions.computeEditField=function(_34f){
if(_34f.dynamic){
return;
}
var _350=_34f.editFieldPrefix;
var _351=_34f.editFieldState;
var _352=_34f.grid.columns;
var _353=0;
var _354="";
for(var i=0;i<_351.length;i++){
var _356=_351[i];
if(_356){
_353++;
_354+=$G.Actions.fieldSep;
_354+=_356.action+$G.Actions.valueSep;
var _357=_356.values;
if(_34f.multiRowSelection===true&&_34f.dynamic===false&&_356.action!="I"){
_357=_357.slice(1,_357.length);
}
for(var j=0;j<_357.length;j++){
if(j>0){
_354+=$G.Actions.valueSep;
}
var _359=($G.Actions.isNull(_357[j][0]))?$G.Actions.nullValue:_357[j][0];
var _35a=($G.Actions.isNull(_357[j][1]))?$G.Actions.nullValue:_357[j][1];
var _35b=j;
if(_34f.multiRowSelection===true){
_35b++;
}
if(_352[_35b].getEditor()&&_35a==$G.Actions.nullValue&&_352[_35b].getEditor().xtype=="checkbox"){
_35a="0";
}
if(_356.action!="I"||(_356.action=="I"&&_352[_35b].getEditor())){
_354+=_35a;
if(_356.action=="U"&&_352[_35b].getEditor()){
_354+=$G.Actions.valueSep+_359;
}
}
}
}
}
_350+=_353+_354;
_34f.editField.setAttribute("value",_350);
};
$G.Actions.isNull=function(val){
var ret=(val==null||typeof (val)=="undefined"||val.length==0);
return ret;
};
$G.loadData=function(data,_35f){
_35f._cf_gridDataProxy.loadResponse(data,_35f);
var _360=ColdFusion.objectCache[_35f._cf_gridname];
$G.applyStyles(_360);
$L.info("grid.loaddata.loaded","widget",[_35f._cf_gridname]);
if($G.Actions.isNull(data.TOTALROWCOUNT)==false&&data.TOTALROWCOUNT==0){
_360.fireSelectionChangeEvent();
}
};
$G.printObject=function(obj){
var str="";
for(key in obj){
str=str+"  "+key+"=";
value=obj[key];
str+=value;
}
return str;
};
$G.formatBoolean=function(v,p,_365){
return "<div class=\"x-grid3-check-col"+(v?"-on":"")+" x-grid3-cc-"+this.id+"\">&#160;</div>";
};
$G.formatDate=function(_366,p,_368){
if(_366&&!_366.dateFormat){
_366=new Date(_366);
}
var _369=this.dateFormat?this.dateFormat:"m/d/y";
return _366?Ext.Date.dateFormat(_366,_369):"";
};
$G.convertDate=function(_36a,p,_36c){
if(_36a&&!_36a.dateFormat){
_36a=new Date(_36a);
}
var _36d=this.dateFormat?this.dateFormat:"m/d/y";
return _36a;
};
$G.ExtProxy=function(_36e,_36f){
this.api={load:true,create:undefined,save:undefined,destroy:undefined};
$G.ExtProxy.superclass.constructor.call(this);
this.bindHandler=_36e;
this.errorHandler=_36f;
};
Ext.extend($G.ExtProxy,Ext.data.DataProxy,{_cf_firstLoad:true,load:function(_370,_371,_372,_373,arg){
if(!this._cf_actions.bindOnLoad){
var _375={"_cf_reader":_371,"_cf_grid_errorhandler":this.errorHandler,"_cf_scope":_373,"_cf_gridDataProxy":this,"_cf_gridname":this._cf_gridName,"_cf_arg":arg,"_cf_callback":_372,"ignoreData":true};
var data=[];
for(i=0;i<_370.limit;i++){
data.push(new Ext.data.Record({}));
}
this.loadResponse(data,_375);
this._cf_actions.bindOnLoad=true;
}else{
var _377=(_370.start/_370.limit)+1;
if(!_370.sort){
_370.sort="";
}
if(!_370.dir){
_370.dir="";
}
this.bindHandler(this,_377,_370.limit,_370.sort,_370.dir,this.errorHandler,_372,_373,arg,_371);
}
},loadResponse:function(data,_379){
var _37a=null;
if(_379.ignoreData){
_37a={success:true,records:data,totalRecords:data.length};
}else{
var _37b;
if(!data){
_37b="grid.extproxy.loadresponse.emptyresponse";
}else{
if(!data.TOTALROWCOUNT&&data.TOTALROWCOUNT!=0){
_37b="grid.extproxy.loadresponse.totalrowcountmissing";
}else{
if(!ColdFusion.Util.isInteger(data.TOTALROWCOUNT)){
_37b="grid.extproxy.loadresponse.totalrowcountinvalid";
}else{
if(!data.QUERY){
_37b="grid.extproxy.loadresponse.querymissing";
}else{
if(!data.QUERY.COLUMNS||!ColdFusion.Util.isArray(data.QUERY.COLUMNS)||!data.QUERY.DATA||!ColdFusion.Util.isArray(data.QUERY.DATA)||(data.QUERY.DATA.length>0&&!ColdFusion.Util.isArray(data.QUERY.DATA[0]))){
_37b="grid.extproxy.loadresponse.queryinvalid";
}
}
}
}
}
if(_37b){
ColdFusion.handleError(_379._cf_grid_errorHandler,_37b,"widget");
this.fireEvent("loadexception",this,_379,data,e);
return;
}
_37a=_379._cf_reader.readRecords(data);
}
this.fireEvent("load",this,_379,_379._cf_arg);
_379._cf_callback.call(_379._cf_scope,_37a,_379._cf_arg,true);
},update:function(_37c){
},updateResponse:function(_37d){
}});
$G.ExtReader=function(_37e){
this.recordType=Ext.data.Record.create(_37e);
};
Ext.extend($G.ExtReader,Ext.data.DataReader,{readRecords:function(_37f){
var _380=[];
var cols=_37f.QUERY.COLUMNS;
var data=_37f.QUERY.DATA;
for(var i=0;i<data.length;i++){
var _384={};
for(var j=0;j<cols.length;j++){
_384[cols[j]]=data[i][j];
}
_380.push(new Ext.data.Record(_384));
}
return {success:true,records:_380,totalRecords:_37f.TOTALROWCOUNT};
}});
$G.CheckColumn=function(_386){
Ext.apply(this,_386);
if(!this.id){
this.id=Ext.id();
}
this.renderer=this.renderer.bind(this);
};
$G.findColumnIndex=function(grid,_388){
var _389=grid.headerCt.getGridColumns();
for(var i=0;i<_389.length;i++){
if(_389[i].dataIndex==_388){
return i;
}
}
};
$G.CheckColumn.prototype={init:function(grid){
this.grid=grid;
this.count=0;
this.columnIndex=$G.findColumnIndex(this.grid,this.dataIndex);
this.grid.on("render",function(){
var view=this.grid.getView();
if(this.editable==true){
this.grid.addListener("itemmousedown",this.onMouseDown,this);
}
},this);
},onMouseDown:function(thi,_38e,item,_390,e,_392){
var t=e.target;
if(t.className&&t.className.indexOf("x-grid-cc-"+this.id)!=-1){
e.stopEvent();
var _394=ColdFusion.clone(_38e);
_394.data=ColdFusion.clone(_38e.data);
this.grid.getSelectionModel().select(_390);
this.grid.getSelectionModel().fireEvent("rowselect",this.grid.getSelectionModel(),_390);
this.grid.fireEvent("beforeedit",this,{grid:this.grid,row:_390,record:_38e,column:this.columnIndex,field:this.dataIndex,value:_38e.data[this.dataIndex]});
_38e.set(this.dataIndex,this.toggleBooleanValue(_38e.data[this.dataIndex]));
this.grid.fireEvent("edit",this,{grid:this.grid,row:_390,record:_394,column:this.columnIndex,field:this.dataIndex,value:_38e.data[this.dataIndex],originalValue:_394.data[this.dataIndex]});
}
},toggleBooleanValue:function(v){
v=typeof v=="undefined"?"N":(typeof v=="string"?v.toUpperCase():v);
if(v==="Y"){
return "N";
}
if(v==="N"){
return "Y";
}
if(v===true){
return false;
}
if(v===false){
return true;
}
if(v===0){
return 1;
}
if(v===1){
return 0;
}
if(v==="YES"){
return "NO";
}
if(v==="NO"){
return "YES";
}
if(v==="T"){
return "F";
}
if(v==="F"){
return "T";
}
return "Y";
},renderer:function(v,p,_398){
p.css+=" x-grid-check-col-td";
var _399=false;
v=(typeof v=="string")?v.toUpperCase():v;
if(typeof v!="undefined"&&(v==1||v=="1"||v=="Y"||v=="YES"||v=="TRUE"||v===true||v==="T")){
_399=true;
}
return "<div style=\"background-repeat: no-repeat;background-position:center center;width:auto\" class=\"x-grid-cell-checker"+(_399!=true?"-off":"")+" x-grid-cc-"+this.id+"\">&#160;</div>";
}};
$G.convertBoolean=function(v,_39b){
v=typeof v=="undefined"?"N":(typeof v=="string"?v.toUpperCase():v);
if(v==="Y"){
return "YES";
}
if(v==="N"){
return "NO";
}
if(v===true){
return "YES";
}
if(v===false){
return "NO";
}
if(v===0){
return "NO";
}
if(v===1){
return "YES";
}
if(v==="YES"){
return "YES";
}
if(v==="NO"){
return "NO";
}
if(v==="T"){
return "YES";
}
if(v==="F"){
return "NO";
}
if(v==="FALSE"){
return "NO";
}
if(v==""){
return "NO";
}
if(v.toUpperCase()=="NULL"){
return "NO";
}
return "YES";
};
Ext.define("MyReader",{extend:"Ext.data.reader.Json",alias:"reader.my-json",read:function(_39c){
var _39d;
if(_39c.request){
_39d=_39c.request.proxy;
}
var _39e=_39c.responseText;
if(!_39e){
_39e=_39c.responseJson;
}
if(!_39e){
_39e=_39c;
}
var _39f="";
if(_39d&&!_39d._cf_actions.bindOnLoad){
_39f="{  totalrows:0, data :[] }";
_39d._cf_actions.bindOnLoad=true;
}else{
_39f=$G.queryToJson(_39e);
}
if(_39d){
$G.applyStyles(_39d._cf_actions);
}
Ext.USE_NATIVE_JSON=false;
return this.callParent([Ext.decode(_39f)]);
}});
Ext.define("customcfajax",{extend:"Ext.data.proxy.Ajax",alias:"proxy.customcfajax",getParams:function(_3a0){
params=this.callParent(arguments);
if(!(this.sortParam&&_3a0.config.sorters&&_3a0.config.sorters.length>0)){
params[this.sortParam]="";
params[this.directionParam]="ASC";
}
return params;
}});
Ext.define("Ext.data.proxy.JsProxy",{requires:["Ext.util.MixedCollection","Ext.Ajax"],extend:"Ext.data.proxy.Server",alias:"proxy.jsajax",alternateClassName:["Ext.data.HttpProxy","Ext.data.JsProxy"],actionMethods:{create:"POST",read:"GET",update:"POST",destroy:"POST"},binary:false,jsfunction:"",extraparams:[],getParams:function(_3a1){
params=this.callParent(arguments);
if(_3a1.config&&_3a1.config.sorters){
_3a1.sorters=_3a1.config.sorters;
}
if(!(this.sortParam&&_3a1.sorters&&_3a1.sorters.length>0)){
params[this.sortParam]="";
params[this.directionParam]="ASC";
}
return params;
},processResponse:function(_3a2,_3a3,_3a4,_3a5){
var me=this,exception,reader,resultSet,meta,destroyOp;
if(me.destroying||me.destroyed){
return;
}
me.fireEvent("beginprocessresponse",me,_3a5,_3a3);
if(_3a2===true){
reader=me.getReader();
if(_3a5.status===204){
resultSet=reader.getNullResultSet();
}else{
resultSet=reader.read(me.extractResponseData(_3a5),{recordCreator:_3a3.getRecordCreator()||reader.defaultRecordCreatorFromServer});
}
if(!_3a3.$destroyOwner){
_3a3.$destroyOwner=me;
destroyOp=true;
}
_3a3.process(resultSet,_3a4,_3a5);
exception=!_3a3.wasSuccessful();
}else{
me.setException(_3a3,_3a5);
exception=true;
}
if(me.destroyed){
if(!_3a3.destroyed&&destroyOp&&_3a3.$destroyOwner===me){
_3a3.destroy();
}
return;
}
if(exception){
me.fireEvent("exception",me,_3a5,_3a3);
}else{
meta=resultSet.getMetadata();
if(meta){
me.onMetaChange(meta);
}
}
if(me.destroyed){
if(!_3a3.destroyed&&destroyOp&&_3a3.$destroyOwner===me){
_3a3.destroy();
}
return;
}
me.fireEvent("endprocessresponse",me,_3a5,_3a3);
if(!_3a3.destroyed&&destroyOp&&_3a3.$destroyOwner===me){
_3a3.destroy();
}
},doRequest:function(_3a7,_3a8,_3a9){
var me=this;
op=_3a7;
if(!op.page){
op.page=op._page;
}
sorters=_3a7.sorters;
sortcol="";
sortdir="ASC";
if(sorters&&sorters.length>0){
sortcol=sorters[0].property;
sortdir=sorters[0].direction;
}
if(this._cf_actions.bindOnLoad){
result=eval(this.jsfunction);
}else{
var _3ab=[];
for(i=0;i<this._cf_actions.grid.columns.length;i++){
var _3ac=this._cf_actions.grid.columns[i];
_3ab[i]=_3ac.colName;
}
result="{  totalrows:0, QUERY : { COLUMNS : "+_3ab+" data :[] }}";
}
me.processResponse(true,_3a7,"",result,_3a8,_3a9);
return null;
},getMethod:function(_3ad){
return this.actionMethods[_3ad.action];
},createRequestCallback:function(_3ae,_3af,_3b0,_3b1){
var me=this;
return function(_3b3,_3b4,_3b5){
me.processResponse(_3b4,_3af,_3ae,_3b5,_3b0,_3b1);
};
}},function(){
Ext.data.HttpProxy=this;
});
$G.queryToJson=function(data){
var _3b7=[];
jsondata=ColdFusion.AjaxProxy.JSON.decode(data);
var cols=jsondata.QUERY.COLUMNS;
var data=jsondata.QUERY.DATA;
var _3b9="{  totalrows:"+jsondata.TOTALROWCOUNT+", data :[";
for(var i=0;i<data.length;i++){
var _3bb={};
_3b9=_3b9+"{";
for(var j=0;j<cols.length;j++){
if(data[i][j]==null){
data[i][j]="";
}
_3bb[cols[j]]=data[i][j];
encodedata=ColdFusion.AjaxProxy.JSON.encode(data[i][j]);
_3b9=_3b9+cols[j]+":"+encodedata;
if(j!=cols.length-1){
_3b9=_3b9+",";
}
}
_3b9=_3b9+"}";
if(i!=data.length-1){
_3b9=_3b9+",";
}
}
_3b9=_3b9+"]}";
return _3b9;
};
$G.queryToArray=function(data){
var _3be=[];
jsondata=ColdFusion.AjaxProxy.JSON.decode(data);
var cols=jsondata.QUERY.COLUMNS;
var data=jsondata.QUERY.DATA;
var _3c0=new Array();
for(var i=0;i<data.length;i++){
var _3c2=new Array(1);
for(var j=0;j<cols.length;j++){
_3c2[j]=data[i][j];
}
_3c0[i]=_3c2;
}
return _3c0;
};
};
cfinitgrid();
