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
$G.init=function(id,name,_461,_462,edit,_464,_465,_466,_467,_468,_469,_46a,_46b,_46c,_46d,_46e,_46f,_470,_471,_472,_473,_474,_475,_476,_477,_478,_479,_47a,_47b,_47c){
var grid;
var _47e;
var _47f=false;
if(_470&&typeof (_470)!="undefined"){
_47e=_470;
_47f=true;
}else{
_47e="rowmodel";
_47e=new Ext.selection.RowModel({mode:"SINGLE"});
}
var _480=_467;
var _481={store:_468,columns:_467,selModel:_47e,autoSizeColumns:_465,autoSizeHeaders:_465,stripeRows:_46b,autoExpandColumnId:_466};
if(_47a!=null&&typeof _47a!="undefined"){
_481.plugins=_47a;
}
var _482=ColdFusion.objectCache[id];
var _483=document.getElementById(_482.gridId);
if(_483!=null){
var _484=_483.style.cssText;
if(typeof _484=="undefined"){
_484="";
}
_484="width:"+_469+"px;"+_484;
_483.style.cssText=_484;
}
_481.width=_469;
if(_465===true){
_481.viewConfig={forceFit:true};
_481.forceFit=true;
}else{
if(_470&&typeof (_470)!="undefined"){
_481.autoExpandColumn=_466;
}else{
_481.autoExpandColumn=_466;
}
}
if(_46a){
_481.height=_46a;
}else{
_481.autoHeight=true;
var _485=".x-grid3-header {position: relative;}";
Ext.util.CSS.createStyleSheet(_485,"_cf_grid"+id);
}
if(_472&&typeof (_472)!="undefined"){
_481.features={ftype:"grouping",groupHeaderTpl:"{columnName}: {groupValue} ({rows.length} items)"};
}
_481.title=_473;
_481.collapsible=_471;
if(_471&&_473==null){
_481.title="  ";
}
var _486=ColdFusion.objectCache[id];
_486.bindOnLoad=_464;
_486.dynamic=_462;
_486.styles=_46c;
_486.grouping=_472;
_486.onLoadFunction=_479;
_486.multiRowSelection=_47f;
_481.renderTo=_486.gridId;
Ext.onReady(function(){
_481.dockedItems={xtype:"toolbar",dock:"top"};
_481.tbar=new Ext.Toolbar({hidden:true});
if(_462){
_481.bbar=new Ext.PagingToolbar({pageSize:_46d,store:_468});
if(_477&&(_474||_475)){
var _487=_481.bbar;
if(_474){
_487.add({xtype:"button",text:_474,handler:$G.insertRow,scope:_486});
_487.add({xtype:"button",text:" save ",handler:$G.saveNewRecord,scope:_486});
_487.add({xtype:"button",text:" cancel ",handler:$G.cancelNewRecord,scope:_486});
}
if(_475){
_487.add({xtype:"button",text:_475,handler:$G.deleteRow,scope:_486});
}
}
}
if(edit&&!_462){
var bbar=new Ext.Toolbar();
if(_474||_475){
if(_474){
bbar.add({xtype:"button",text:_474,handler:$G.insertRow,scope:_486});
}
if(_475){
bbar.add({xtype:"button",text:_475,handler:$G.deleteRow,scope:_486});
}
}else{
var bbar=new Ext.Toolbar({hidden:true});
}
_481.bbar=bbar;
}
_468.pageSize=_46d;
var fn=function(){
grid=Ext.create("Ext.grid.Panel",_481);
$G.Ext_caseInsensitive_sorting();
_468.addListener("load",$G.Actions.onLoad,_486,{delay:50});
grid.view.addListener("beforeshow",function(menu){
var _48b=_480.getColumnCount();
for(var i=0;i<_48b;i++){
if("CFGRIDROWINDEX"==_480.getDataIndex(i)){
menu.remove(menu.items["items"][i]);
break;
}
}
},this);
_486.grid=grid;
if(!_462){
_468.addListener("load",$G.Actions.onLoad,_486,{delay:50});
_468.load();
}
if(_462){
_468._cf_errorHandler=_478;
_468.proxy._cf_actions=_486;
if(_486.bindOnLoad){
_468.load({params:{start:0,limit:_46d}});
}else{
_486.bindOnLoad=true;
}
}else{
$G.applyStyles(_486);
}
if(_47b){
ColdFusion.Bind.register(_47b,{actions:_486},$G.bindHandler,false);
}
$L.info("grid.init.created","widget",[id]);
_486.init(id,name,_461,_476,_462,edit,_477,_478,_46f,_46d,_46e,_472);
};
if(_462&&_47c){
setTimeout(fn,0);
}else{
fn();
}
});
};
$G.applyStyles=function(_48d){
Ext.util.CSS.createStyleSheet(_48d.styles);
_48d.stylesApplied=true;
};
$G.bindHandler=function(e,_48f){
$G.refresh(_48f.actions.id,_48f.actions.preservePageOnSort);
};
$G.bindHandler._cf_bindhandler=true;
$G.refresh=function(_490,_491){
var _492=ColdFusion.objectCache[_490];
if(_492&&$G.Actions.prototype.isPrototypeOf(_492)==true){
var _493=_492.grid.getStore();
if(_492.dynamic){
_492.editOldValue=null;
_492.selectedRow=-1;
var bind=$G.GridBindelementsMap[_490];
if(bind){
var url=_493.proxy.url;
var _496=bind.split(";");
for(i=0;i<_496.length;i++){
var _497=_496[i].split(",");
indx=url.indexOf(_497[0]+"=");
url1=url.substring(0,indx);
nxtindx=url.indexOf("&",indx);
url2=url.substring(nxtindx);
var val=_497[2];
var eval="";
if(_497[2]&&_497[2].endsWith("()")){
val=_497[2].substring(0,val.length-2);
eval=window[val]();
}else{
eval=ColdFusion.Bind.getBindElementValue(_497[1],val,_497[3]);
}
url=url1+"&"+_497[0]+"="+eval+url2;
}
_493.proxy.url=url;
}
if(_491){
_493.lastOptions.page=1;
_493.currentPage=1;
_493.reload();
}else{
if(_493.lastOptions){
_493.lastOptions.page=1;
}
_493.currentPage=1;
_493.reload({params:{start:0,limit:_492.pageSize}});
}
}
}else{
ColdFusion.handleError(null,"grid.refresh.notfound","widget",[_490],null,null,true);
return;
}
if(_492.multiRowSelection){
}
$L.info("grid.refresh.success","widget",[_490]);
};
$G.Ext_caseInsensitive_sorting=function(){
Ext.data.Store.prototype.sortData=function(f,_49b){
_49b=_49b||"ASC";
var st=this.fields.get(f).sortType;
var fn=function(r1,r2){
var v1=st(r1.data[f]),v2=st(r2.data[f]);
if(v1.toLowerCase){
v1=v1.toLowerCase();
v2=v2.toLowerCase();
}
return v1>v2?1:(v1<v2?-1:0);
};
this.data.sort(_49b,fn);
if(this.snapshot&&this.snapshot!=this.data){
this.snapshot.sort(_49b,fn);
}
};
};
$G.getTopToolbar=function(_4a1){
var _4a2=ColdFusion.objectCache[_4a1];
if(!_4a2){
ColdFusion.handleError(null,"grid.getTopToolbar.notfound","widget",[_4a1],null,null,true);
return;
}
return _4a2.grid.getDockedItems()[1];
};
$G.showTopToolbar=function(_4a3){
var _4a4=ColdFusion.objectCache[_4a3];
if(!_4a4){
ColdFusion.handleError(null,"grid.showTopToolbar.notfound","widget",[_4a3],null,null,true);
return;
}
var tbar=_4a4.grid.getDockedItems()[1];
if(!tbar){
ColdFusion.handleError(null,"grid.showTopToolbar.toolbarNotDefined","widget",[_4a3],null,null,true);
return;
}
tbar.show();
};
$G.hideTopToolbar=function(_4a6){
var _4a7=ColdFusion.objectCache[_4a6];
if(!_4a7){
ColdFusion.handleError(null,"grid.hideTopToolbar.notfound","widget",[_4a6],null,null,true);
return;
}
var tbar=_4a7.grid.getDockedItems()[1];
if(!tbar){
ColdFusion.handleError(null,"grid.hideTopToolbar.toolbarNotDefined","widget",[_4a6],null,null,true);
return;
}
tbar.hide();
};
$G.refreshTopToolbar=function(_4a9){
var _4aa=ColdFusion.objectCache[_4a9];
if(!_4aa){
ColdFusion.handleError(null,"grid.refreshTopToolbar.notfound","widget",[_4a9],null,null,true);
return;
}
var tbar=_4aa.grid.getDockedItems()[1];
if(!tbar){
ColdFusion.handleError(null,"grid.refreshTopToolbar.toolbarNotDefined","widget",[_4a9],null,null,true);
return;
}
tbar.doLayout();
if(tbar.isVisible()==false){
tbar.show();
}
};
$G.getBottomToolbar=function(_4ac){
var _4ad=ColdFusion.objectCache[_4ac];
if(!_4ad){
ColdFusion.handleError(null,"grid.getBottomToolbar.notfound","widget",[_4ac],null,null,true);
return;
}
return _4ad.grid.getDockedItems()[_4ad.grid.getDockedItems().length-1];
};
$G.showBottomToolbar=function(_4ae){
var _4af=ColdFusion.objectCache[_4ae];
if(!_4af){
ColdFusion.handleError(null,"grid.showBottomToolbar.notfound","widget",[_4ae],null,null,true);
return;
}
var tbar=_4af.grid.getDockedItems()[_4af.grid.getDockedItems().length-1];
if(!tbar){
ColdFusion.handleError(null,"grid.showBottomToolbar.toolbarNotDefined","widget",[_4ae],null,null,true);
return;
}
tbar.show();
};
$G.hideBottomToolbar=function(_4b1){
var _4b2=ColdFusion.objectCache[_4b1];
if(!_4b2){
ColdFusion.handleError(null,"grid.hideBottomToolbar.notfound","widget",[_4b1],null,null,true);
return;
}
var tbar=_4b2.grid.getDockedItems()[_4b2.grid.getDockedItems().length-1];
if(!tbar){
ColdFusion.handleError(null,"grid.hideBottomToolbar.toolbarNotDefined","widget",[_4b1],null,null,true);
return;
}
tbar.hide();
};
$G.refreshBottomToolbar=function(_4b4){
var _4b5=ColdFusion.objectCache[_4b4];
if(!_4b5){
ColdFusion.handleError(null,"grid.refreshBottomToolbar.notfound","widget",[_4b4],null,null,true);
return;
}
var tbar=_4b5.grid.getDockedItems()[_4b5.grid.getDockedItems().length-1];
if(!tbar){
ColdFusion.handleError(null,"grid.refreshBottomToolbar.toolbarNotDefined","widget",[_4b4],null,null,true);
return;
}
tbar.doLayout();
if(tbar.isVisible()==false){
tbar.show();
}
};
$G.sort=function(_4b7,_4b8,_4b9){
var _4ba=ColdFusion.objectCache[_4b7];
if(!_4ba){
ColdFusion.handleError(null,"grid.sort.notfound","widget",[_4b7],null,null,true);
return;
}
_4b8=_4b8.toUpperCase();
var _4bb=-1;
var _4bc=_4ba.grid.columns;
for(var i=0;i<_4bc.length-1;i++){
if(_4b8==_4bc[i].colName){
_4bb=i;
break;
}
}
if(_4bb==-1){
ColdFusion.handleError(null,"grid.sort.colnotfound","widget",[_4b8,_4b7],null,null,true);
return;
}
if(!_4b9){
_4b9="ASC";
}
_4b9=_4b9.toUpperCase();
if(_4b9!="ASC"&&_4b9!="DESC"){
ColdFusion.handleError(null,"grid.sort.invalidsortdir","widget",[_4b9,_4b7],null,null,true);
return;
}
var _4be=_4ba.grid.getStore();
_4be.sort(_4b8,_4b9);
};
$G.getGridObject=function(_4bf){
if(!_4bf){
ColdFusion.handleError(null,"grid.getgridobject.missinggridname","widget",null,null,null,true);
return;
}
var _4c0=ColdFusion.objectCache[_4bf];
if(_4c0==null||$G.Actions.prototype.isPrototypeOf(_4c0)==false){
ColdFusion.handleError(null,"grid.getgridobject.notfound","widget",[_4bf],null,null,true);
return;
}
return _4c0.grid;
};
$G.getSelectedRows=function(_4c1){
if(!_4c1){
ColdFusion.handleError(null,"grid.getSelectedRowData.missinggridname","widget",null,null,null,true);
return;
}
var _4c2=ColdFusion.objectCache[_4c1];
var _4c3=new Array();
var _4c4=_4c2.grid.getSelectionModel();
var _4c5=_4c4.selected;
var _4c6=_4c2.grid.columns;
var _4c7=0;
if(_4c2.multiRowSelection===true&&_4c2.dynamic===false){
_4c7++;
}
for(i=0;i<_4c5.length;i++){
var _4c8=_4c5.items[i].data;
var _4c9={};
for(var _4ca=_4c7;_4ca<_4c6.length-1;_4ca++){
var key=_4c6[_4ca].dataIndex;
_4c9[key]=_4c8[key];
}
_4c3[i]=_4c9;
}
return _4c3;
};
$G.clearSelectedRows=function(_4cc){
if(!_4cc){
ColdFusion.handleError(null,"grid.getSelectedRowData.missinggridname","widget",null,null,null,true);
return;
}
var _4cd=ColdFusion.objectCache[_4cc];
var _4ce=_4cd.grid.getSelectionModel();
_4ce.deselectAll();
if(_4cd.multiRowSelection){
}
};
$G.Actions=function(_4cf){
this.gridId=_4cf;
this.init=$G.Actions.init;
this.onChangeHandler=$G.Actions.onChangeHandler;
this.onChangeHandler_MultiRowsDelete=$G.Actions.onChangeHandler_MultiRowsDelete;
this.selectionChangeEvent=new ColdFusion.Event.CustomEvent("cfGridSelectionChange",_4cf);
this.fireSelectionChangeEvent=$G.fireSelectionChangeEvent;
this._cf_getAttribute=$G.Actions._cf_getAttribute;
this._cf_register=$G.Actions._cf_register;
this.loaded=false;
};
$G.Actions.init=function(id,_4d1,_4d2,_4d3,_4d4,edit,_4d6,_4d7,_4d8,_4d9,_4da,_4db){
this.id=id;
this.gridName=_4d1;
this.formId=_4d2;
this.form=document.getElementById(_4d2);
this.cellClickInfo=_4d3;
this.edit=edit;
this.onChangeFunction=_4d6;
this.onErrorFunction=_4d7;
this.preservePageOnSort=_4d8;
this.pageSize=_4d9;
this.selectedRow=-1;
this.selectOnLoad=_4da;
this.grouping=_4db;
this.grid.addListener("cellclick",$G.cellClick,this,true);
this.editField=document.createElement("input");
this.editField.setAttribute("name",_4d1);
this.editField.setAttribute("type","hidden");
this.form.appendChild(this.editField);
if(edit){
if(!_4d4){
var _4dc=this.grid.columns;
this.editFieldPrefix="__CFGRID__EDIT__=";
var i=0;
var _4de=_4dc.length-1;
if(this.multiRowSelection===true&&this.dynamic===false){
i++;
_4de--;
}
this.editFieldPrefix+=_4de+$G.Actions.fieldSep;
var _4df=true;
for(i;i<_4dc.length-1;i++){
if(!_4df){
this.editFieldPrefix+=$G.Actions.fieldSep;
}
this.editFieldPrefix+=_4dc[i].colName;
this.editFieldPrefix+=$G.Actions.valueSep;
if(_4dc[i].getEditor()){
this.editFieldPrefix+="Y";
}else{
this.editFieldPrefix+="N";
}
_4df=false;
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
if(_4d4){
this.grid.getStore().addListener("beforeload",$G.Actions.beforeLoad,this,true);
}
this.grid.getSelectionModel().addListener("select",$G.rowSelect,this,true);
this.grid.getSelectionModel().addListener("beforerowselect",$G.beforeRowSelect,this,true);
};
$G.Actions.beforeLoad=function(_4e0,_4e1){
var _4e2=_4e0.sortInfo;
var _4e3=(_4e1.sorters&&_4e1.sorters[0]&&_4e1.sorters[0].property!=this.sortCol);
if(_4e3&&!this.preservePageOnSort){
_4e1.start=0;
_4e1.page=1;
_4e0.currentPage=1;
}
if(_4e1.sorters&&_4e1.sorters[0]){
this.sortCol=_4e1.sorters[0].property;
this.sortDir=_4e1.sorters[0].direction;
}
};
$G.Actions.onLoad=function(_4e4){
this.editOldValue=null;
this.selectedRow=-1;
this.insertInProgress=false;
var _4e5=0;
if((this.bindOnLoad||!this.dynamic)&&this.selectOnLoad&&!this.grouping){
this.grid.getSelectionModel().select(_4e5,false);
}
if(!this.gridRendered&&this.onLoadFunction&&typeof this.onLoadFunction=="function"){
this.gridRendered=true;
this.onLoadFunction.call(null,this.grid);
}
$G.applyStyles(_4e4);
try{
var _4e6=Ext.ComponentQuery.query("tabpanel");
if(_4e6&&this.grid&&this.loaded==false){
for(var i=0;i<_4e6.length;i++){
if(_4e6[i].body.dom.innerHTML.indexOf(this.grid.id)>0){
_4e6[i].updateLayout();
this.loaded=true;
}
}
}
}
catch(exception){
}
};
$G.Actions._cf_getAttribute=function(_4e8){
_4e8=_4e8.toUpperCase();
var _4e9=this.selectedRow;
var _4ea=null;
if(_4e9!=0&&(!_4e9||_4e9==-1)){
return _4ea;
}
var ds=this.grid.getStore();
var _4ec=(this.dynamic)?ds.getAt(_4e9):ds.getById(_4e9);
_4ea=_4ec.get(_4e8);
return _4ea;
};
$G.Actions._cf_register=function(_4ed,_4ee,_4ef){
this.selectionChangeEvent.subscribe(_4ee,_4ef);
};
$G.rowSelect=function(_4f0,_4f1,row){
var _4f3="";
var _4f4=_4f0.selected.items;
if(_4f4.length==0){
return;
}
var _4f5=_4f4[0].get("CFGRIDROWINDEX")||row;
if(_4f5&&(_4f5+"").indexOf("cf_gridmodel")==0){
_4f5=row;
}
if(this.selectedRow!=_4f5){
this.selectedRow=_4f5;
var _4f6=true;
for(col in _4f4[0].data){
if(col=="CFGRIDROWINDEX"){
continue;
}
if(typeof col=="undefined"||col=="undefined"){
continue;
}
if(!_4f6){
_4f3+="; ";
}
_4f3+="__CFGRID__COLUMN__="+col+"; ";
_4f3+="__CFGRID__DATA__="+_4f4[0].data[col];
_4f6=false;
}
this.fireSelectionChangeEvent();
this.insertInProgress=false;
}
};
$G.beforeRowSelect=function(_4f7,row){
var ds=this.grid.getStore();
var _4fa=ds.getAt(row);
return !$G.isNullRow(_4fa.data);
};
$G.isNullRow=function(data){
var _4fc=true;
for(col in data){
if(data[col]!=null){
_4fc=false;
break;
}
}
return _4fc;
};
$G.fireSelectionChangeEvent=function(){
$L.info("grid.fireselectionchangeevent.fire","widget",[this.id]);
this.selectionChangeEvent.fire();
};
$G.cellClick=function(grid,td,_4ff,_500,tr,_502,e,_504){
var _505=this.cellClickInfo.colInfo[_4ff];
if(_505){
var _506=grid.getSelectionModel().selected;
var url;
if(_506.items.length>0&&_506.items[0].data){
url=_506.items[0].data[_505.href.toUpperCase()];
}
if(!url){
url=_505.href;
}
var _508=_505.hrefKey;
var _509=_505.target;
var _50a=this.appendKey;
if(this.cellClickInfo.appendKey){
var _50b;
if(_508||_508==0){
var _50c=grid.getStore().getAt(_502);
var _50d=grid.panel.columns[_508].dataIndex;
_50b=_50c.get(_50d);
}else{
var _50e=this.grid.columns;
_50b=_506.items[0].get(_50e[0].dataIndex);
for(var i=1;i<_50e.length-1;i++){
_50b+=","+_506.items[0].get(_50e[i].dataIndex);
}
}
if(url.indexOf("?")!=-1){
url+="&CFGRIDKEY="+_50b;
}else{
url+="?CFGRIDKEY="+_50b;
}
}
if(_509){
_509=_509.toLowerCase();
if(_509=="_top"){
_509="top";
}else{
if(_509=="_parent"){
_509="parent";
}else{
if(_509=="_self"){
_509=window.name;
}else{
if(_509=="_blank"){
window.open(encodeURI(url));
return;
}
}
}
}
if(!parent[_509]){
ColdFusion.handleError(null,"grid.cellclick.targetnotfound","widget",[_509]);
return;
}
parent[_509].location=encodeURI(url);
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
var _510={action:"I",values:[]};
var _511=this.grid.columns;
var _512=this.grid.getStore();
var _513={};
var _514="{";
for(var i=0;i<_511.length-1;i++){
var _516="";
_510.values[i]=[_516,_516];
_513[_511[i].dataIndex]=_516;
_514=_514+"\""+_511[i].colName+"\":\""+_516+"\",";
}
_513["CFGRIDROWINDEX"]=_512.getCount()+1;
_514=_514+"\"CFGRIDROWINDEX\":\""+(_512.getCount()+1)+"\"}";
_512.add(JSON.parse(_514));
_512.getAt(_512.getCount()-1).data["CFGRIDROWINDEX"]=_512.getCount();
if(this.dynamic==true){
this.selectedRow=_512.getCount();
}
this.editFieldState.push(_510);
this.grid.getSelectionModel().select(_512.getCount()-1);
this.insertInProgress=true;
$G.Actions.computeEditField(this);
};
$G.saveNewRecord=function(){
if(!this.insertInProgress){
return;
}
var _517=this.selectedRow;
var _518=this.insertEvent;
if(_517==-1){
return;
}
if(this.onChangeFunction){
this.onChangeHandler("I",_517-1,_518,$G.insertRowCallback);
}else{
if(this.dynamic==false){
var _519=this.grid.getStore();
var _51a=_518.record;
var _51b=new Array(1);
_51b[0]=_51a;
var _51c=_519.getAt(this.selectedRow-1);
_519.remove(_51c);
_519.add(_51b);
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
var _51d=this.grid.getStore();
var _51e=_51d.getAt(this.selectedRow-1);
_51d.remove(_51e);
this.insertInProgress=false;
this.insertEvent=null;
this.selectedRow=this.selectedrow-1;
};
$G.deleteRow=function(){
var _51f=null;
var _520;
if(this.multiRowSelection===true){
var _521=this.grid.getSelectionModel();
_51f=_521.selected;
}
_51f=this.grid.getSelectionModel().getSelection();
if(_51f!=null&&_51f.length<2){
_51f=null;
}
if(_51f==null){
_520=this.selectedRow;
}
if(_520==-1&&_51f==null){
return;
}
if(this.onChangeFunction){
if(_51f!=null){
this.onChangeHandler_MultiRowsDelete("D",_51f,null,$G.deleteRowCallback);
}else{
this.onChangeHandler("D",_520,null,$G.deleteRowCallback);
}
}else{
if(!this.dynamic){
var _522=this.grid.getStore();
if(_51f!=null){
for(i=0;i<_51f.length;i++){
var _523=_522.indexOf(_51f[i]);
var _524=this.editFieldState[_523];
if(_524){
_524.action="D";
}else{
_524=$G.Actions.initEditState(this,"D",_51f[i],_523+1);
}
}
for(i=0;i<_51f.length;i++){
_522.remove(_51f[i]);
}
}else{
var _524=this.editFieldState[_520-1];
if(_524){
_524.action="D";
}else{
var _525=this.grid.getStore().getById(_520);
_524=$G.Actions.initEditState(this,"D",_525,_520);
}
_522.remove(this.grid.getSelectionModel().getSelection());
}
$G.Actions.computeEditField(this);
this.grid.editingPlugin.completeEdit();
this.selectedRow=-1;
}
}
};
$G.deleteRowCallback=function(_526,_527){
var _528=_527._cf_grid.getStore();
var _529=_527._cf_grid_properties;
var _527=_528.lastOptions;
var key="start";
if(_528.getCount()==1){
if(_527.start>=_527.limit){
_527.start=_527.start-_527.limit;
}
_527.page=_527.page-1;
_528.reload(_527);
}else{
_528.reload();
}
if(_529.multiRowSelection){
var _52b=_529.grid.getView().headerCt(0);
if(_52b!=null){
var _52c=Ext.Element.get(_52b).first();
if(_52c){
_52c.replaceClass("x-grid3-hd-checker-on");
}
}
}
};
$G.insertRowCallback=function(_52d,_52e){
var _52f=_52e._cf_grid.getStore();
var _530=_52e._cf_grid.actions;
_52f.reload();
};
$G.Actions.beforeEdit=function(_531,e,_533){
if($G.isNullRow(e.record.data)){
return false;
}
this.editColumn=e.column;
this.editOldValue=e.value;
};
$G.Actions.afterEdit=function(_534,_535,_536){
var _537=_535.value;
if(_537==this.editOldValue){
return;
}
if(this.insertInProgress==false&&this.onChangeFunction){
this.onChangeHandler("U",this.selectedRow,_535);
}else{
if(!this.dynamic){
rowidx=_535.rowIdx;
if(!rowidx&&rowidx!=0){
rowidx=_535.row;
}
var _538=$G.computeActualRow_editField(this.editFieldState,_535.record.data.CFGRIDROWINDEX);
var _539=this.editFieldState[_538-1];
var _53a=_535.colIdx;
if(!_53a&&_53a!=0){
_53a=_535.column;
}
var cols=_534.grid.columns;
var _53c=_535.field;
for(i=0;i<cols.length;i++){
var col=cols[i];
if(_53c==col.colName){
_53a=i;
}
}
if(_539){
if(this.multiRowSelection===true&&this.insertInProgress==true){
_53a=_53a-1;
}
_539.values[_53a][1]=_537;
}else{
var _53e=this.grid.getStore().getById(_535.record.data.CFGRIDROWINDEX);
_539=$G.Actions.initEditState(this,"U",_53e,_538);
var _53f=this.editOldValue+"";
if(_535.column.type=="date"){
if(_53f&&typeof _53f=="string"){
_53f=new Date(_53f);
}
var _540="F, j Y H:i:s";
if(_535.column&&_535.column.format){
_540=_535.column.format;
}
_539.values[_53a][1]=Ext.Date.format(_537,_540);
_539.values[_53a][0]=_53f?Ext.Date.format(_53f,_540):_53f;
}else{
_539.values[_53a][0]=_53f;
_539.values[_53a][1]=_537;
}
}
$G.Actions.computeEditField(this);
}
}
this.editOldValue=null;
this.fireSelectionChangeEvent();
};
$G.computeActualRow_editField=function(_541,_542){
if(_541.length==_542){
return _542;
}
var _543=0;
var _544=0;
for(;_544<_541.length&&_543<_542;_544++){
var _545=_541[_544];
if(!_545||_545.action!="D"){
_543++;
}
}
return _544;
};
$G.Actions.onChangeHandler=function(_546,_547,_548,_549){
var _54a={};
var _54b={};
var data="";
if(null==_548){
data=this.grid.getStore().getAt(_547).data;
}else{
data=_548?_548.record.data:this.grid.getStore().getAt(_547).data;
}
for(col in data){
_54a[col]=data[col];
}
if(_546=="U"){
if((_548.value==null||_548.value=="")&&(_548.originalValue==null||_548.originalValue=="")){
return;
}
if(_548.value&&_548.column.type=="date"){
if(typeof _548.originalValue=="string"){
var _54d=new Date(_548.originalValue);
}
if(_54d!=null&&_54d.getElapsed(_548.value)==0){
return;
}else{
_54a[_548.field]=_548.originalValue;
var _54e="F, j Y H:i:s";
if(_548.column.format){
_54e=_548.column.format;
}
_54b[_548.field]=Ext.Date.format(_548.value,_54e);
}
}else{
_54a[_548.field]=_548.originalValue;
_54b[_548.field]=_548.value;
}
}
this.onChangeFunction(_546,_54a,_54b,_549,this.grid,this.onErrorFunction,this);
};
$G.Actions.onChangeHandler_MultiRowsDelete=function(_54f,_550,_551,_552){
var _553=new Array();
var _554={};
for(i=0;i<_550.length;i++){
_553[i]=_550.items[i].data;
}
this.onChangeFunction(_54f,_553,_554,_552,this.grid,this.onErrorFunction,this);
};
$G.Actions.initEditState=function(_555,_556,_557,_558){
var _559={action:_556,values:[]};
var _55a=_555.grid.columns;
var _55b=_55a.length-1;
_559.values.length=_55b;
var i=0;
if(_555.multiRowSelection===true&&_555.dynamic===false){
i=i++;
}
for(i;i<_55b;i++){
var _55d=_557.get(_55a[i].colName);
_559.values[i]=[_55d,_55d];
}
_555.editFieldState[_558-1]=_559;
return _559;
};
$G.Actions.fieldSep=eval("'\\u0001'");
$G.Actions.valueSep=eval("'\\u0002'");
$G.Actions.nullValue=eval("'\\u0003'");
$G.Actions.computeEditField=function(_55e){
if(_55e.dynamic){
return;
}
var _55f=_55e.editFieldPrefix;
var _560=_55e.editFieldState;
var _561=_55e.grid.columns;
var _562=0;
var _563="";
for(var i=0;i<_560.length;i++){
var _565=_560[i];
if(_565){
_562++;
_563+=$G.Actions.fieldSep;
_563+=_565.action+$G.Actions.valueSep;
var _566=_565.values;
if(_55e.multiRowSelection===true&&_55e.dynamic===false&&_565.action!="I"){
_566=_566.slice(1,_566.length);
}
for(var j=0;j<_566.length;j++){
if(j>0){
_563+=$G.Actions.valueSep;
}
var _568=($G.Actions.isNull(_566[j][0]))?$G.Actions.nullValue:_566[j][0];
var _569=($G.Actions.isNull(_566[j][1]))?$G.Actions.nullValue:_566[j][1];
var _56a=j;
if(_55e.multiRowSelection===true){
_56a++;
}
if(_561[_56a].getEditor()&&_569==$G.Actions.nullValue&&_561[_56a].getEditor().xtype=="checkbox"){
_569="0";
}
if(_565.action!="I"||(_565.action=="I"&&_561[_56a].getEditor())){
_563+=_569;
if(_565.action=="U"&&_561[_56a].getEditor()){
_563+=$G.Actions.valueSep+_568;
}
}
}
}
}
_55f+=_562+_563;
_55e.editField.setAttribute("value",_55f);
};
$G.Actions.isNull=function(val){
var ret=(val==null||typeof (val)=="undefined"||val.length==0);
return ret;
};
$G.loadData=function(data,_56e){
_56e._cf_gridDataProxy.loadResponse(data,_56e);
var _56f=ColdFusion.objectCache[_56e._cf_gridname];
$G.applyStyles(_56f);
$L.info("grid.loaddata.loaded","widget",[_56e._cf_gridname]);
if($G.Actions.isNull(data.TOTALROWCOUNT)==false&&data.TOTALROWCOUNT==0){
_56f.fireSelectionChangeEvent();
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
$G.formatBoolean=function(v,p,_574){
return "<div class=\"x-grid3-check-col"+(v?"-on":"")+" x-grid3-cc-"+this.id+"\">&#160;</div>";
};
$G.formatDate=function(_575,p,_577){
if(_575&&!_575.dateFormat){
_575=new Date(_575);
}
var _578=this.dateFormat?this.dateFormat:"m/d/y";
return _575?Ext.Date.dateFormat(_575,_578):"";
};
$G.convertDate=function(_579,p,_57b){
if(_579&&!_579.dateFormat){
_579=new Date(_579);
}
var _57c=this.dateFormat?this.dateFormat:"m/d/y";
return _579;
};
$G.ExtProxy=function(_57d,_57e){
this.api={load:true,create:undefined,save:undefined,destroy:undefined};
$G.ExtProxy.superclass.constructor.call(this);
this.bindHandler=_57d;
this.errorHandler=_57e;
};
Ext.extend($G.ExtProxy,Ext.data.DataProxy,{_cf_firstLoad:true,load:function(_57f,_580,_581,_582,arg){
if(!this._cf_actions.bindOnLoad){
var _584={"_cf_reader":_580,"_cf_grid_errorhandler":this.errorHandler,"_cf_scope":_582,"_cf_gridDataProxy":this,"_cf_gridname":this._cf_gridName,"_cf_arg":arg,"_cf_callback":_581,"ignoreData":true};
var data=[];
for(i=0;i<_57f.limit;i++){
data.push(new Ext.data.Record({}));
}
this.loadResponse(data,_584);
this._cf_actions.bindOnLoad=true;
}else{
var _586=(_57f.start/_57f.limit)+1;
if(!_57f.sort){
_57f.sort="";
}
if(!_57f.dir){
_57f.dir="";
}
this.bindHandler(this,_586,_57f.limit,_57f.sort,_57f.dir,this.errorHandler,_581,_582,arg,_580);
}
},loadResponse:function(data,_588){
var _589=null;
if(_588.ignoreData){
_589={success:true,records:data,totalRecords:data.length};
}else{
var _58a;
if(!data){
_58a="grid.extproxy.loadresponse.emptyresponse";
}else{
if(!data.TOTALROWCOUNT&&data.TOTALROWCOUNT!=0){
_58a="grid.extproxy.loadresponse.totalrowcountmissing";
}else{
if(!ColdFusion.Util.isInteger(data.TOTALROWCOUNT)){
_58a="grid.extproxy.loadresponse.totalrowcountinvalid";
}else{
if(!data.QUERY){
_58a="grid.extproxy.loadresponse.querymissing";
}else{
if(!data.QUERY.COLUMNS||!ColdFusion.Util.isArray(data.QUERY.COLUMNS)||!data.QUERY.DATA||!ColdFusion.Util.isArray(data.QUERY.DATA)||(data.QUERY.DATA.length>0&&!ColdFusion.Util.isArray(data.QUERY.DATA[0]))){
_58a="grid.extproxy.loadresponse.queryinvalid";
}
}
}
}
}
if(_58a){
ColdFusion.handleError(_588._cf_grid_errorHandler,_58a,"widget");
this.fireEvent("loadexception",this,_588,data,e);
return;
}
_589=_588._cf_reader.readRecords(data);
}
this.fireEvent("load",this,_588,_588._cf_arg);
_588._cf_callback.call(_588._cf_scope,_589,_588._cf_arg,true);
},update:function(_58b){
},updateResponse:function(_58c){
}});
$G.ExtReader=function(_58d){
this.recordType=Ext.data.Record.create(_58d);
};
Ext.extend($G.ExtReader,Ext.data.DataReader,{readRecords:function(_58e){
var _58f=[];
var cols=_58e.QUERY.COLUMNS;
var data=_58e.QUERY.DATA;
for(var i=0;i<data.length;i++){
var _593={};
for(var j=0;j<cols.length;j++){
_593[cols[j]]=data[i][j];
}
_58f.push(new Ext.data.Record(_593));
}
return {success:true,records:_58f,totalRecords:_58e.TOTALROWCOUNT};
}});
$G.CheckColumn=function(_595){
Ext.apply(this,_595);
if(!this.id){
this.id=Ext.id();
}
this.renderer=this.renderer.bind(this);
};
$G.findColumnIndex=function(grid,_597){
var _598=grid.headerCt.getGridColumns();
for(var i=0;i<_598.length;i++){
if(_598[i].dataIndex==_597){
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
},onMouseDown:function(thi,_59d,item,_59f,e,_5a1){
var t=e.target;
if(t.className&&t.className.indexOf("x-grid-cc-"+this.id)!=-1){
e.stopEvent();
var _5a3=ColdFusion.clone(_59d);
_5a3.data=ColdFusion.clone(_59d.data);
this.grid.getSelectionModel().select(_59f);
this.grid.getSelectionModel().fireEvent("rowselect",this.grid.getSelectionModel(),_59f);
this.grid.fireEvent("beforeedit",this,{grid:this.grid,row:_59f,record:_59d,column:this.columnIndex,field:this.dataIndex,value:_59d.data[this.dataIndex]});
_59d.set(this.dataIndex,this.toggleBooleanValue(_59d.data[this.dataIndex]));
this.grid.fireEvent("edit",this,{grid:this.grid,row:_59f,record:_5a3,column:this.columnIndex,field:this.dataIndex,value:_59d.data[this.dataIndex],originalValue:_5a3.data[this.dataIndex]});
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
},renderer:function(v,p,_5a7){
p.css+=" x-grid-check-col-td";
var _5a8=false;
v=(typeof v=="string")?v.toUpperCase():v;
if(typeof v!="undefined"&&(v==1||v=="1"||v=="Y"||v=="YES"||v=="TRUE"||v===true||v==="T")){
_5a8=true;
}
return "<div style=\"background-repeat: no-repeat;background-position:center center;width:auto\" class=\"x-grid-cell-checker"+(_5a8!=true?"-off":"")+" x-grid-cc-"+this.id+"\">&#160;</div>";
}};
$G.convertBoolean=function(v,_5aa){
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
Ext.define("MyReader",{extend:"Ext.data.reader.Json",alias:"reader.my-json",read:function(_5ab){
var _5ac;
if(_5ab.request){
_5ac=_5ab.request.proxy;
}
var _5ad=_5ab.responseText;
if(!_5ad){
_5ad=_5ab.responseJson;
}
if(!_5ad){
_5ad=_5ab;
}
var _5ae="";
if(_5ac&&!_5ac._cf_actions.bindOnLoad){
_5ae="{  totalrows:0, data :[] }";
_5ac._cf_actions.bindOnLoad=true;
}else{
_5ae=$G.queryToJson(_5ad);
}
if(_5ac){
$G.applyStyles(_5ac._cf_actions);
}
Ext.USE_NATIVE_JSON=false;
return this.callParent([Ext.decode(_5ae)]);
}});
Ext.define("customcfajax",{extend:"Ext.data.proxy.Ajax",alias:"proxy.customcfajax",getParams:function(_5af){
params=this.callParent(arguments);
if(!(this.sortParam&&_5af.config.sorters&&_5af.config.sorters.length>0)){
params[this.sortParam]="";
params[this.directionParam]="ASC";
}
return params;
}});
Ext.define("Ext.data.proxy.JsProxy",{requires:["Ext.util.MixedCollection","Ext.Ajax"],extend:"Ext.data.proxy.Server",alias:"proxy.jsajax",alternateClassName:["Ext.data.HttpProxy","Ext.data.JsProxy"],actionMethods:{create:"POST",read:"GET",update:"POST",destroy:"POST"},binary:false,jsfunction:"",extraparams:[],getParams:function(_5b0){
params=this.callParent(arguments);
if(_5b0.config&&_5b0.config.sorters){
_5b0.sorters=_5b0.config.sorters;
}
if(!(this.sortParam&&_5b0.sorters&&_5b0.sorters.length>0)){
params[this.sortParam]="";
params[this.directionParam]="ASC";
}
return params;
},processResponse:function(_5b1,_5b2,_5b3,_5b4){
var me=this,exception,reader,resultSet,meta,destroyOp;
if(me.destroying||me.destroyed){
return;
}
me.fireEvent("beginprocessresponse",me,_5b4,_5b2);
if(_5b1===true){
reader=me.getReader();
if(_5b4.status===204){
resultSet=reader.getNullResultSet();
}else{
resultSet=reader.read(me.extractResponseData(_5b4),{recordCreator:_5b2.getRecordCreator()||reader.defaultRecordCreatorFromServer});
}
if(!_5b2.$destroyOwner){
_5b2.$destroyOwner=me;
destroyOp=true;
}
_5b2.process(resultSet,_5b3,_5b4);
exception=!_5b2.wasSuccessful();
}else{
me.setException(_5b2,_5b4);
exception=true;
}
if(me.destroyed){
if(!_5b2.destroyed&&destroyOp&&_5b2.$destroyOwner===me){
_5b2.destroy();
}
return;
}
if(exception){
me.fireEvent("exception",me,_5b4,_5b2);
}else{
meta=resultSet.getMetadata();
if(meta){
me.onMetaChange(meta);
}
}
if(me.destroyed){
if(!_5b2.destroyed&&destroyOp&&_5b2.$destroyOwner===me){
_5b2.destroy();
}
return;
}
me.fireEvent("endprocessresponse",me,_5b4,_5b2);
if(!_5b2.destroyed&&destroyOp&&_5b2.$destroyOwner===me){
_5b2.destroy();
}
},doRequest:function(_5b6,_5b7,_5b8){
var me=this;
op=_5b6;
if(!op.page){
op.page=op._page;
}
sorters=_5b6.sorters;
sortcol="";
sortdir="ASC";
if(sorters&&sorters.length>0){
sortcol=sorters[0].property;
sortdir=sorters[0].direction;
}
if(this._cf_actions.bindOnLoad){
result=eval(this.jsfunction);
}else{
var _5ba=[];
for(i=0;i<this._cf_actions.grid.columns.length;i++){
var _5bb=this._cf_actions.grid.columns[i];
_5ba[i]=_5bb.colName;
}
result="{  totalrows:0, QUERY : { COLUMNS : "+_5ba+" data :[] }}";
}
me.processResponse(true,_5b6,"",result,_5b7,_5b8);
return null;
},getMethod:function(_5bc){
return this.actionMethods[_5bc.action];
},createRequestCallback:function(_5bd,_5be,_5bf,_5c0){
var me=this;
return function(_5c2,_5c3,_5c4){
me.processResponse(_5c3,_5be,_5bd,_5c4,_5bf,_5c0);
};
}},function(){
Ext.data.HttpProxy=this;
});
$G.queryToJson=function(data){
var _5c6=[];
jsondata=ColdFusion.AjaxProxy.JSON.decode(data);
var cols=jsondata.QUERY.COLUMNS;
var data=jsondata.QUERY.DATA;
var _5c8="{  totalrows:"+jsondata.TOTALROWCOUNT+", data :[";
for(var i=0;i<data.length;i++){
var _5ca={};
_5c8=_5c8+"{";
for(var j=0;j<cols.length;j++){
if(data[i][j]==null){
data[i][j]="";
}
_5ca[cols[j]]=data[i][j];
encodedata=ColdFusion.AjaxProxy.JSON.encode(data[i][j]);
_5c8=_5c8+cols[j]+":"+encodedata;
if(j!=cols.length-1){
_5c8=_5c8+",";
}
}
_5c8=_5c8+"}";
if(i!=data.length-1){
_5c8=_5c8+",";
}
}
_5c8=_5c8+"]}";
return _5c8;
};
$G.queryToArray=function(data){
var _5cd=[];
jsondata=ColdFusion.AjaxProxy.JSON.decode(data);
var cols=jsondata.QUERY.COLUMNS;
var data=jsondata.QUERY.DATA;
var _5cf=new Array();
for(var i=0;i<data.length;i++){
var _5d1=new Array(1);
for(var j=0;j<cols.length;j++){
_5d1[j]=data[i][j];
}
_5cf[i]=_5d1;
}
return _5cf;
};
};
cfinitgrid();
